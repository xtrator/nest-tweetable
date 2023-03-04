import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Without global, all modules that need Prisma service will need to import it manually
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //allow other modules to use prisma
})
export class PrismaModule {}
