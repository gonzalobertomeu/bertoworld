import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserCommandHTTP {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}
