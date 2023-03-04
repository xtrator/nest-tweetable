import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  test(): string {
    return 'test service';
  }

  login(): string {
    return "I'm logged in";
  }

  signup(): string {
    return "I'm signed up";
  }
}
