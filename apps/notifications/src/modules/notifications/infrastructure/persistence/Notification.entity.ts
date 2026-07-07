import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  recipientId: string;
  @Column()
  type: string;
  @Column()
  channel: string;
  @Column()
  status: string;
  @Column({ type: 'jsonb' })
  payload: Record<string, any>;
  @Column()
  sentAt: Date;
  @Column()
  createdAt: Date;
  @Column()
  readAt: Date | null;
}
