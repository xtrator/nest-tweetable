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

  login(dto: AuthDto): object {
    return { message: "I'm logged in" };
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
