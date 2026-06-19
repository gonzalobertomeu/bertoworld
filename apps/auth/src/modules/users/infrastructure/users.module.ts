import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistence/User.entity';
import { useCases } from '../application/usecases.barrel';
import { UserRepository } from '../domain/repositories/User.repository';
import { UserRepositoryOrm } from './persistence/User.repository-orm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryOrm,
    },
    ...useCases,
  ],
  exports: [...useCases],
})
export class UsersModule {}
