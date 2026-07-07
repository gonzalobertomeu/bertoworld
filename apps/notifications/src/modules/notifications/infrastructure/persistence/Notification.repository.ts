import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../../domain/entities/Notification';
import { NotificationRepository } from '../../domain/repositories/NotificationRepository';
import { Repository } from 'typeorm';
import { NotificationEntity } from './Notification.entity';
import { NotificationMapper } from './Notification.mapper';
import { IdAlreadyTaken } from '../../domain/errors/IdAlreadyTaken.error';

export class NotificationRepositoryTypeOrm extends NotificationRepository {
  public constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
  ) {
    super();
  }
  async save(domain: Notification) {
    const orm = NotificationMapper.toOrm(domain);
    const existing = await this.notificationRepo.findBy({ id: orm.id });
    if (existing) {
      throw new IdAlreadyTaken(orm.id);
    }
    await this.notificationRepo.save(orm);
  }

  get(id: string): Promise<Notification> {
    console.log(id);
    return Promise.resolve({} as Notification);
  }
  findByRecipient(recipientId: string): Promise<Notification[]> {
    console.log(recipientId);
    return Promise.resolve([] as Notification[]);
  }
  markAsRead(obj: Notification): Promise<Notification> {
    console.log(obj);
    return Promise.resolve({} as Notification);
  }
}
