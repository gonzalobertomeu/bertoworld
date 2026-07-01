import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class InvalidNotificationType extends DomainError {
  constructor(type: string) {
    super(`${type} is not valid`);
    this.name = 'InvalidNotificationType';
  }
}
