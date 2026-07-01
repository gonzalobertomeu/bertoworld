import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class NotificationsModule {}
