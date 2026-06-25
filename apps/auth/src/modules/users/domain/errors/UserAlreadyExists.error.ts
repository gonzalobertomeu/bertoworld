import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class UserAlreadyExists extends DomainError {
  constructor(userId: string) {
    super(`User ${userId} already exists`);
    this.name = 'UserAlreadyExists';
  }
}
