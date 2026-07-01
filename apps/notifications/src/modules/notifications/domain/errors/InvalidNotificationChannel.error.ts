import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class InvalidNotificationChannel extends DomainError {
  constructor(channel: string) {
    super(`${channel} is not valid`);
    this.name = 'InvalidNotificationChannel';
  }
}
