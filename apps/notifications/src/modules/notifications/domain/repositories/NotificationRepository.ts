export abstract class NotificationRepository {
  abstract save(obj: Notification): Promise<void>;
  abstract get(id: string): Promise<Notification>;
  abstract findByRecipient(recipientId: string): Promise<Notification[]>;
  abstract markAsRead(obj: Notification): Promise<Notification>;
}
