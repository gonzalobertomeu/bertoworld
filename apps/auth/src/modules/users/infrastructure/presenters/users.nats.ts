import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserCommand } from './dtos/createUser.command';
import { CreateUserUseCase } from '../../application/usecases/CreateUser.usecase';

@UsePipes(new ValidationPipe())
@Controller()
export class UserNatsController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @MessagePattern('auth.createUser')
  async createUser(@Payload() props: CreateUserCommand) {
    const result = await this.createUserUseCase.execute(props);
    console.log({ result });
    return result;
  }
}
