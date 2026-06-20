import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { CreateUserUseCase } from '../../application/CreateUser.usecase';

@Controller()
export class UserNatsController {
  // constructor(private createUserUseCase: CreateUserUseCase) {}
  @MessagePattern('auth.createUser')
  createUser() {
    return 'user created!';
  }
}
