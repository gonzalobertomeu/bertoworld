import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../domain/repositories/NotificationRepository';
import { Sender } from '../domain/ports/Sender.port';
import { NotificationTypeString } from '../domain/value-objects/NotificationType';
import { Notification } from '../domain/entities/Notification';

export interface CreateAndSendNotificationCommand {
  recipientId: string;
  payload: Record<string, any>;
  sentAt?: Date;
  type: NotificationTypeString;
}

@Injectable()
export class CreateAndSendNotificationUseCase {
  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly senderService: Sender,
  ) {}
  public async execute(command: CreateAndSendNotificationCommand) {
    const notification = Notification.create({
      recipientId: command.recipientId,
      type: String(command.type),
      channel: 'EMAIL',
      payload: command.payload,
      sentAt: command.sentAt ?? new Date(),
    });
    await this.notificationRepo.save(notification);
    await this.senderService.send(notification);
    return notification;
  }
}
