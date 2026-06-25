export type NotificationChannelString =
  (typeof NotificationChannel)['TYPES'][number];

export class NotificationChannel {
  private constructor(readonly value: string) {}
  static TYPES = ['EMAIL'] as const;
  static EMAIL = new NotificationChannel('EMAIL');
}
