import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
// with prisma/client, it generate types for User and Tweet models

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  test(): string {
    return 'test service';
  }

  async login(dto: AuthDto) {
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

    // finally send back user
    delete user.hash;
    return user;
  }

  async signup(dto: AuthDto) {
    // generate password hash
    // save the user in db
    // return saved user
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
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken.');
        }
      }
      throw error;
    }
  }
}
