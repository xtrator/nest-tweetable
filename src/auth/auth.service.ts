import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, LoginAuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// with prisma/client, it generate types for User and Tweet models

// for jwt... a STRATEGY takes care of the logic when receiving a token

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  test(): string {
    return 'test service';
  }

  async login(dto: LoginAuthDto) {
    // find user by email
    // throw exception if not found
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials Incorrect');

    // compare passwords
    // throw exception if not match
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // finally send back user || token
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    // generate password hash
    // save the user in db
    // return saved user || token
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          username: dto.username,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken.');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
