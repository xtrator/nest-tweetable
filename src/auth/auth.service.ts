import { Injectable } from '@nestjs/common';

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
