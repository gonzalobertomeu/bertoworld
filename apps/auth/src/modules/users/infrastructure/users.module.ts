import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistence/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
