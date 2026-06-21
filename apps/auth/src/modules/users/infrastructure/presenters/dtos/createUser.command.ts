import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserCommand {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
