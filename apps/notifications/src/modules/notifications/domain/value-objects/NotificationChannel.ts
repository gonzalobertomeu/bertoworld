import { InvalidNotificationChannel } from '../errors/InvalidNotificationChannel.error';

export type NotificationChannelString =
  (typeof NotificationChannel)['ENUM'][number];

export class NotificationChannel {
  private constructor(private readonly value: string) {}
  private static ENUM = ['EMAIL'] as const;

  public static from(channel: string) {
    if (
      !(NotificationChannel.ENUM as readonly string[]).includes(
        channel.toUpperCase(),
      )
    ) {
      throw new InvalidNotificationChannel(channel);
    }
    return new NotificationChannel(channel.toUpperCase());
  }

  public get channel() {
    return this.value;
  }
}
