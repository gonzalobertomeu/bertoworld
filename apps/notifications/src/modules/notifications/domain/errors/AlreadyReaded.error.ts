import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class AlreadyReaded extends DomainError {
  constructor() {
    super(`Notification already readed`);
    this.name = 'AlreadyReaded';
  }
}
