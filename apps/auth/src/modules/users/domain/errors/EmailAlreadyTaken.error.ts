import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class EmailAlreadyTaken extends DomainError {
  constructor(email: string) {
    super(`Email ${email} is already taken`);
    this.name = 'EmailAlreadyTaken';
  }
}
