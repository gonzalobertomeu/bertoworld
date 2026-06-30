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

  toStatus(next: string) {
    this._status = this._status.to(next);
  }

  public get id() {
    return this._id;
  }
  public get recipientId() {
    return this._recipientId;
  }
  public get type() {
    return this._type.type;
  }
  public get status() {
    return this._status.status;
  }
  public get channel() {
    return this._channel.channel;
  }
  public get payload() {
    return this._payload;
  }
  public get sentAt() {
    return this._sentAt;
  }
  public get createdAt() {
    return this._createdAt;
  }
  public get readAt() {
    return this._readAt;
  }

  public primitive() {
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
