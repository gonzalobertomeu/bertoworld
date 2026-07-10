import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  CreateAndSendNotificationCommand,
  CreateAndSendNotificationUseCase,
} from '../../application/CreateAndSendNotification.usecase';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dtos/CreateNotification.dto';

@UsePipes(new ValidationPipe())
@Controller()
export class NotificationsPresenter {
  constructor(
    private readonly createAndSendUC: CreateAndSendNotificationUseCase,
  ) {}

  @EventPattern('notifications.create')
  async createNotification(@Payload() payload: CreateNotificationDto) {
    const command: CreateAndSendNotificationCommand = {
      recipientId: payload.recipientId,
      type: payload.type,
      sentAt: new Date(payload.sentAt),
      payload: payload.payload,
    };
    await this.createAndSendUC.execute(command);
  }
}
