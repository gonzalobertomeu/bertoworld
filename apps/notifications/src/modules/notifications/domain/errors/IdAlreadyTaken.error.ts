import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class IdAlreadyTaken extends DomainError {
  constructor(id: string) {
    super(`${id} is already taken`);
    this.name = 'IdAlreadyTaken';
  }
}
