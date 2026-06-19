import { DomainError } from './DomainError.error';

export class UserAlreadyExists extends DomainError {
  constructor(userId: string) {
    super(`User ${userId} already exists`);
    this.name = 'UserAlreadyExists';
  }
}
