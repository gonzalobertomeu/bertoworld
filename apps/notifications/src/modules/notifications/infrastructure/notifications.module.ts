import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/Database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './persistence/Notification.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [],
  providers: [],
})
export class NotificationsModule {}
