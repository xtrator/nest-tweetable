import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // this way nest js takes care of instantiating AuthService instead
  // of instantiating it yourself like const _ = new AuthService()
  //
  // 'private' makes this.authService = authService
  // for you, be thankful
  constructor(private authService: AuthService) {}

  @Get('test')
  getTest() {
    return this.authService.test();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
