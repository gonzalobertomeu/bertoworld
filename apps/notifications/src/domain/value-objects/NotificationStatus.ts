import { InvalidStatusTransition } from '../errors/InvalidStatusTransition.error';

export type NotificationStatusString =
  (typeof NotificationStatus.TYPES)[number];

export class NotificationStatus {
  private constructor(readonly value: string) {}

  static TYPES = ['PENDING', 'SENT', 'FAILED'] as const;
  static PENDING = new NotificationStatus('PENDING');
  static SENT = new NotificationStatus('SENT');
  static FAILED = new NotificationStatus('FAILED');

  private static readonly TRANSITIONS: Record<string, string[]> = {
    PENDING: ['SENT', 'FAILED'],
    FAILED: ['PENDING'],
    SENT: [],
  };

  to(next: NotificationStatus): NotificationStatus {
    const allowed = NotificationStatus.TRANSITIONS[this.value];
    if (!allowed.includes(next.value)) {
      throw new InvalidStatusTransition(this.value, next.value);
    }
    return next;
  }

  equals(compare: NotificationStatus): boolean {
    return this.value === compare.value;
  }
}
