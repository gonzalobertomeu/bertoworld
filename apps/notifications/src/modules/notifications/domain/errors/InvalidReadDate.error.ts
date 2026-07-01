import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class InvalidReadDate extends DomainError {
  constructor(date: Date) {
    super(`Date provided is not valid: ${date.getTime()}`);
    this.name = 'InvalidReadDate';
  }
}
