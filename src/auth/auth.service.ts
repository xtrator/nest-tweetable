import { Injectable } from '@nestjs/common';
// with prisma/client, it generate types for User and Tweet models

@Injectable({})
export class AuthService {
  test(): string {
    return 'test service';
  }

  login(): object {
    return { message: "I'm logged in" };
  }

  signup(): object {
    return { message: "I'm signed in" };
  }
}
