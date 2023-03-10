import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginAuthDto } from './dto';

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

  // dto is like an object which is copy of the request body
  // used mostly for validations and such
  // to use just do @Body() dto: any (or AuthDto if you created that type)
  @Post('login')
  login(
    @Body()
    dto: LoginAuthDto,
  ) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(
    @Body()
    dto: AuthDto,
  ) {
    return this.authService.signup(dto);
  }

  // in nestjs, PIPES are functions that transform your data
}
