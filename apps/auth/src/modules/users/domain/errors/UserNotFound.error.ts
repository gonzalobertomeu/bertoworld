import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class UserNotFound extends DomainError {
  constructor(id: string) {
    super(`User ${id} not found`);
    this.name = 'UserNotFound';
  }
}
