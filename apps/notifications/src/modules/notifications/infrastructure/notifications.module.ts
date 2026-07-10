import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/Database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './persistence/Notification.entity';
import { NotificationRepository } from '../domain/repositories/NotificationRepository';
import { NotificationRepositoryTypeOrm } from './persistence/Notification.repository';
import { Sender } from '../domain/ports/Sender.port';
import { SenderAdapter } from './external/Sender.adapter';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [],
  providers: [
    {
      provide: NotificationRepository,
      useClass: NotificationRepositoryTypeOrm,
    },
    {
      provide: Sender,
      useClass: SenderAdapter,
    },
  ],
})
export class NotificationsModule {}
