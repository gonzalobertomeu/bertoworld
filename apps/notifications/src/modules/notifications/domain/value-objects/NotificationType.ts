import { InvalidNotificationType } from '../errors/InvalidNotificationType.error';

export type NotificationTypeString = (typeof NotificationType)['ENUM'];
export class NotificationType {
  private static ENUM = ['VALIDATE_USER', 'PASSWORD_RESET'] as const;
  private constructor(private readonly value: string) {}

  public static from(type: string) {
    if (
      !(NotificationType.ENUM as readonly string[]).includes(type.toUpperCase())
    ) {
      throw new InvalidNotificationType(type);
    }
    return new NotificationType(type.toUpperCase());
  }
  public get type() {
    return this.value;
  }
}
