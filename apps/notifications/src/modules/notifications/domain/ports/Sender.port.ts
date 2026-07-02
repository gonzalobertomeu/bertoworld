import { Notification } from '../entities/Notification';

export abstract class Sender {
  abstract send(notification: Notification): Promise<void>;
}
