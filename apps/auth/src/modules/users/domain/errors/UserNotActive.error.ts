import { DomainError } from './DomainError.error';

export class UserNotActive extends DomainError {
  constructor(id: string) {
    super(`User ${id} is not active`);
    this.name = 'UserNotActive';
  }
}
