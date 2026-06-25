import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class MissingReceiver extends DomainError {
  constructor() {
    super('Missing receiver in notification');
    this.name = 'MissingReceiver';
  }
}
