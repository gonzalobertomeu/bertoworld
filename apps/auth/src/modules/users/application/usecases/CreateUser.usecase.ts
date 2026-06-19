import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/User';
import { EmailAlreadyTaken } from '../domain/errors/EmailAlreadyTaken.error';
import { Hasher } from '../domain/ports/Hasher';
import { UserRepository } from '../domain/repositories/User.repository';

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
    const existingUser = await this.userRepo.findByEmail(props.email);
    if (!existingUser) throw new EmailAlreadyTaken(props.email);
    const user = await User.create(props.email, props.password, this.hasher);
    return user;
  }
}
