import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/User.repository';
import { UserEntity } from './User.entity';
import { UserMapper } from './User.mapper';
import { UserAlreadyExists } from '../../domain/errors/UserAlreadyExists.error';
import { EmailAlreadyTaken } from '../../domain/errors/EmailAlreadyTaken.error';
import { UserNotFound } from '../../domain/errors/UserNotFound.error';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async save(user: User): Promise<void> {
    const existingId = await this.userRepo.findOneBy({ id: user.id });
    if (existingId) {
      throw new UserAlreadyExists(user.id);
    }
    const existingEmail = await this.userRepo.findOneBy({ email: user.email });
    if (existingEmail) {
      throw new EmailAlreadyTaken(user.email);
    }
    const userOrm = UserMapper.toEntity(user);
    await this.userRepo.save(userOrm);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }

  async get(id: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new UserNotFound(id);
    return UserMapper.toDomain(user);
  }
}
