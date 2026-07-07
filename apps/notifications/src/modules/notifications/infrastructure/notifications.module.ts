import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/Database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './persistence/Notification.entity';
import { NotificationRepository } from '../domain/repositories/NotificationRepository';
import { NotificationRepositoryTypeOrm } from './persistence/Notification.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [],
  providers: [
    {
      provide: NotificationRepository,
      useClass: NotificationRepositoryTypeOrm,
    },
  ],
})
export class NotificationsModule {}
