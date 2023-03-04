import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// cannot use validatoins in interface, must change to class
// but interface and class is same
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  // we now need to tell nestjs to use validations pipes globally
}
