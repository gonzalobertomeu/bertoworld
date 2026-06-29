import { NotificationChannel } from '../value-objects/NotificationChannel';
import { NotificationStatus } from '../value-objects/NotificationStatus';
import { NotificationType } from '../value-objects/NotificationType';

export interface NotificationCreateProp {
  recipientId: string;
  type: string;
  channel: string;
  payload: Record<string, any>;
  sentAt: Date;
}

export class Notification {
  private constructor(
    private _id: string,
    private _recipientId: string,
    private _type: NotificationType, //Value Object: Enum Type
    private _channel: NotificationChannel, //Value Object: Enum Channel
    private _status: NotificationStatus, //Value Object: Status Machine
    private _payload: Record<string, any>,
    private _sentAt: Date,
    private _createdAt: Date,
    private _readAt: Date | null,
  ) {}

  static create(create: NotificationCreateProp) {
    const now = new Date();
    return new Notification(
      crypto.randomUUID(),
      create.recipientId,
      NotificationType.from(create.type),
      NotificationChannel.from(create.channel),
      NotificationStatus.from('PENDING'),
      create.payload,
      create.sentAt ?? now,
      now,
      null,
    );
  }

  primitive() {
    return {
      id: this._id,
      recipientId: this._recipientId,
      type: this._type.type,
      channel: this._channel.channel,
      status: this._status.status,
      payload: this._payload,
      sentAt: this._sentAt,
      createdAt: this._createdAt,
      readAt: this._readAt,
    };
  }
}
