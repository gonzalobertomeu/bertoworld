import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
