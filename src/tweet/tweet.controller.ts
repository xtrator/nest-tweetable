import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('tweets')
export class TweetController {
  constructor(private prisma: PrismaService) {}

  @Get()
  listAll() {
    return this.prisma.tweet.findMany();
  }

  @Post()
  createTweet() {
    return this.prisma.tweet.create({
      data: {
        body: 'LoremIpsum.js is a Node.js and Component.js module for generating passages of lorem ipsum text',
      },
    });
  }
}
