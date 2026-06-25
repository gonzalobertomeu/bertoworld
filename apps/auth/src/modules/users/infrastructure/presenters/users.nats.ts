import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserCommand } from './dtos/createUser.command';
import { CreateUserUseCase } from '../../application/usecases/CreateUser.usecase';
import { GetUserUseCase } from '../../application/usecases/GetUser.usecase';

@UsePipes(new ValidationPipe())
@Controller()
export class UserNatsController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}
  @MessagePattern('auth.createUser')
  async createUser(@Payload() props: CreateUserCommand) {
    const user = await this.createUserUseCase.execute(props);
    return user.public();
  }

  @MessagePattern('auth.getUser')
  async getUser(@Payload() props: { id: string }) {
    const user = await this.getUserUseCase.execute({ id: props.id });
    return user.public();
  }
}
