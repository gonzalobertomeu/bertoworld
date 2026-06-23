import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { Hasher } from '../../domain/ports/Hasher';
import { UserRepository } from '../../domain/repositories/User.repository';

export interface CreateUserCommand {
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute(props: CreateUserCommand) {
    const user = await User.create(props.email, props.password, this.hasher);
    await this.userRepo.save(user);
    return user.public();
  }
}
