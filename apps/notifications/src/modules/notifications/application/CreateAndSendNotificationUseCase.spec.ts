import { describe, it, expect, beforeEach } from 'bun:test';
import {
  CreateAndSendNotificationCommand,
  CreateAndSendNotificationUseCase,
} from './CreateAndSendNotification.usecase';
import { Notification } from '../domain/entities/Notification';
import { NotificationRepository } from '../domain/repositories/NotificationRepository';
import { Sender } from '../domain/ports/Sender.port';
import { NotificationRepositoryMock } from '../domain/repositories/__mocks__/NotificationRepository.mock';
import { SenderMock } from '../domain/ports/__mocks__/Sender.mock';
import { IdAlreadyTaken } from '../domain/errors/IdAlreadyTaken.error';

describe('CreateAndSendNotification usecase', () => {
  let notificationRepo: NotificationRepository;
  let senderService: Sender;
  let useCase: CreateAndSendNotificationUseCase;
  beforeEach(() => {
    notificationRepo = new NotificationRepositoryMock();
    senderService = new SenderMock();
    useCase = new CreateAndSendNotificationUseCase(
      notificationRepo,
      senderService,
    );
  });
  it('should send a notification', () => {
    const command: CreateAndSendNotificationCommand = {
      recipientId: 'successUser',
      type: 'PASSWORD_RESET',
      payload: {},
      sentAt: new Date(),
    };
    expect(useCase.execute(command)).resolves.toBeInstanceOf(Notification);
  });
  it('should not create a notification with same id', () => {
    const command: CreateAndSendNotificationCommand = {
      recipientId: 'repeated',
      type: 'PASSWORD_RESET',
      payload: {},
      sentAt: new Date(),
    };
    expect(useCase.execute(command)).rejects.toThrow(IdAlreadyTaken);
  });
});
