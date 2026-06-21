import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistence/User.entity';
import { useCases } from '../application/usecases.barrel';
import { UserRepository } from '../domain/repositories/User.repository';
import { UserRepositoryOrm } from './persistence/User.repository-orm';
import { UserNatsController } from './presenters/users.nats';
import { Hasher } from '../domain/ports/Hasher';
import { HasherArgon } from './adapters/Hasher.argon';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryOrm,
    },
    {
      provide: Hasher,
      useClass: HasherArgon,
    },
    ...useCases,
  ],
  controllers: [UserNatsController],
  exports: [...useCases],
})
export class UsersModule {}
