import { Controller, Get, Inject } from '@nestjs/common';
import { AuthRemote } from './auth.remote';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(@Inject(AuthRemote) private authRemote: ClientProxy) {}

  @Get('/auth/create')
  createUser() {
    console.log('looking in the other service');
    return this.authRemote.send('auth.createUser', '');
  }
}
