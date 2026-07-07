import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../domain/repositories/NotificationRepository';

export interface ReadNotificationCommand {
  notificationId: string;
  recipientId: string;
}

@Injectable()
export class ReadNotificationUseCase {
  constructor(private readonly notificationRepo: NotificationRepository) {}

  public async execute(command: ReadNotificationCommand) {
    const notification = await this.notificationRepo.get(
      command.notificationId,
    );
    const readed = await this.notificationRepo.markAsRead(notification);
    return readed;
  }
}
