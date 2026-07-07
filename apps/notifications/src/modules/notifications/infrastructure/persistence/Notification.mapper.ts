import { Notification } from '../../domain/entities/Notification';
import { NotificationEntity } from './Notification.entity';

export class NotificationMapper {
  toDomain(entity: NotificationEntity): Notification {
    const domain = Notification.reconstitute({
      id: entity.id,
      recipientId: entity.recipientId,
      type: entity.type,
      channel: entity.channel,
      status: entity.status,
      payload: entity.payload,
      sentAt: entity.sentAt,
      createdAt: entity.createdAt,
      readAt: entity.readAt,
    });
    return domain;
  }
  toOrm(domain: Notification): NotificationEntity {
    const orm = new NotificationEntity();
    orm.id = domain.id;
    orm.recipientId = domain.recipientId;
    orm.type = domain.type;
    orm.channel = domain.channel;
    orm.status = domain.status;
    orm.payload = domain.payload;
    orm.sentAt = domain.sentAt;
    orm.createdAt = domain.createdAt;
    orm.readAt = domain.readAt;
    return orm;
  }
}
