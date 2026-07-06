import { Notification } from '../../entities/Notification';
import { Sender } from '../Sender.port';
import { mock } from 'bun:test';

export class SenderMock extends Sender {
  send = mock((notification: Notification) => {
    if (notification.recipientId == 'failed') {
      throw new Error(`Couldn't send notification`);
    }
    return Promise.resolve();
  });
}
