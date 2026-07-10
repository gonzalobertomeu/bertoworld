import { Sender } from '../../domain/ports/Sender.port';
import { Notification } from '../../domain/entities/Notification';

export class SenderAdapter extends Sender {
  send(notification: Notification) {
    console.log(notification);
    return Promise.resolve();
  }
}
