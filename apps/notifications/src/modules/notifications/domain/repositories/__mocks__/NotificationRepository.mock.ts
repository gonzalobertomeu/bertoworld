import { mock } from 'bun:test';
import { NotificationRepository } from '../NotificationRepository';
import { Notification } from '../../entities/Notification';
import { IdAlreadyTaken } from '../../errors/IdAlreadyTaken.error';

export class NotificationRepositoryMock extends NotificationRepository {
  save = mock((obj: Notification) => {
    if (obj.id === 'repeated') {
      return Promise.reject(new IdAlreadyTaken('faked error'));
    }
    return Promise.resolve();
  });
  get = mock((id: string) => {
    const noti = Notification.reconstitute({
      id,
      recipientId: crypto.randomUUID(),
      payload: {},
      sentAt: new Date(),
      type: 'PASSWORD_RESET',
      status: 'PENDING',
      channel: 'EMAIL',
      readAt: null,
      createdAt: new Date(),
    });
    return Promise.resolve(noti);
  });
  findByRecipient = mock((recipientId: string) => {
    const notifs = ['ejemplo1', 'ejemplo2'].map((payloadString: string) => {
      return Notification.create({
        recipientId,
        payload: { msg: payloadString },
        channel: 'EMAIL',
        type: 'VALIDATE_USER',
        sentAt: new Date(),
      });
    });
    return Promise.resolve(notifs);
  });
  markAsRead = mock((obj: Notification) => {
    obj.read(new Date());
    return Promise.resolve(obj);
  });
}
