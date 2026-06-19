import { DomainError } from './DomainError.error';

export class EmailAlreadyTaken extends DomainError {
  constructor(email: string) {
    super(`Email ${email} is already taken`);
    this.name = 'EmailAlreadyTaken';
  }
}
