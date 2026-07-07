import { describe, it, expect, beforeEach } from 'bun:test';
import { NotificationRepository } from '../domain/repositories/NotificationRepository';
import {
  ReadNotificationCommand,
  ReadNotificationUseCase,
} from './ReadNotification.usecase';
import { NotificationRepositoryMock } from '../domain/repositories/__mocks__/NotificationRepository.mock';
import { Notification } from '../domain/entities/Notification';
import { NotFound } from '../domain/errors/NotFound.error';

describe('ReadNotification usecase', () => {
  let notificationRepo: NotificationRepository;
  let useCase: ReadNotificationUseCase;

  beforeEach(() => {
    notificationRepo = new NotificationRepositoryMock();
    useCase = new ReadNotificationUseCase(notificationRepo);
  });

  it('should read notification', async () => {
    const command: ReadNotificationCommand = {
      notificationId: 'some',
      recipientId: 'user',
    };
    const result = await useCase.execute(command);
    expect(result).toBeInstanceOf(Notification);
    expect(result.readAt).not.toBeNull();
    expect(result.readAt).toBeDate();
  });
  it('should not get inexistent notification', () => {
    const command: ReadNotificationCommand = {
      notificationId: 'failed',
      recipientId: 'user',
    };
    expect(useCase.execute(command)).rejects.toThrowError(NotFound);
  });
});
