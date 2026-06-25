import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User.repository';
import { UserNotFound } from '../../domain/errors/UserNotFound.error';

export interface GetUserQuery {
  email?: string;
  id?: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(props: GetUserQuery) {
    if (props.id) {
      const user = await this.userRepo.get(props.id);
      if (!user) throw new UserNotFound(props.id);
      return user;
    }
    if (props.email) {
      const user = await this.userRepo.findByEmail(props.email);
      if (!user) throw new UserNotFound(props.email);
      return user;
    }
    throw new BadRequestException('Email or Id must be passed');
  }
}
