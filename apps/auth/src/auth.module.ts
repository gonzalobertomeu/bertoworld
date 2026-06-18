import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/Database.module';
import { UsersModule } from './modules/users/infrastructure/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
