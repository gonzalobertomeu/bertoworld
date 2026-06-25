import { InvalidNotificationType } from '../errors/InvalidNotificationType.error';

export type NotificationTypeString = (typeof NotificationType.TYPES)[number];

export class NotificationType {
  readonly value: string;
  private constructor(value: string) {
    if (!(NotificationType.TYPES as readonly string[]).includes(value)) {
      throw new InvalidNotificationType(value);
    }
    this.value = value;
  }

  static TYPES = ['VALIDATE_USER', 'PASSWORD_RESET'] as const;

  static VALIDATE_USER = new NotificationType('VALIDATE_USER');
  static PASSWORD_RESET = new NotificationType('PASSWORD_RESET');
}
