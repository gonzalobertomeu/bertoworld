import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class InvalidNotificationStatus extends DomainError {
  constructor(status: string) {
    super(`${status} is not valid`);
    this.name = 'InvalidNotificationStatus';
  }
}
