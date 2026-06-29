import { InvalidNotificationStatus } from '../errors/InvalidNotificationStatus.error';
import { InvalidStatusTransition } from '../errors/InvalidStatusTransition.error';

export type NotificationStatusString =
  (typeof NotificationStatus)['ENUM'][number];

export class NotificationStatus {
  private constructor(private readonly value: string) {}

  private static ENUM = ['PENDING', 'SENT', 'FAILED'] as const;

  private static readonly TRANSITIONS: Record<string, string[]> = {
    PENDING: ['SENT', 'FAILED'],
    FAILED: ['PENDING'],
    SENT: [],
  };

  public static from(status: string) {
    if (
      !(NotificationStatus.ENUM as readonly string[]).includes(
        status.toUpperCase(),
      )
    ) {
      throw new InvalidNotificationStatus(status);
    }
    return new NotificationStatus(status.toUpperCase());
  }

  public to(next: NotificationStatusString): NotificationStatus {
    const allowed = NotificationStatus.TRANSITIONS[this.value];
    if (!allowed.includes(next)) {
      throw new InvalidStatusTransition(this.value, next);
    }
    return new NotificationStatus(next);
  }

  public equals(compare: NotificationStatus): boolean {
    return this.value === compare.value;
  }

  public get status() {
    return this.value;
  }
}
