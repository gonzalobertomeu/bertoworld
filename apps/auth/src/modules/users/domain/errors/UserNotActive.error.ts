import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class UserNotActive extends DomainError {
  constructor(id: string) {
    super(`User ${id} is not active`);
    this.name = 'UserNotActive';
  }
}
