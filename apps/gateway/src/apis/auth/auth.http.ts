import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthRemote } from './auth.remote';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserCommandHTTP } from './dtos/CreateUserCommand';

@UsePipes(new ValidationPipe())
@Controller()
export class AuthController {
  constructor(@Inject(AuthRemote) private authRemote: ClientProxy) {}

  @Post('/auth/create')
  createUser(@Body() body: CreateUserCommandHTTP) {
    return this.authRemote.send('auth.createUser', body);
  }
}
