import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class MissingSender extends DomainError {
  constructor() {
    super('Missing sender in notification');
    this.name = 'MissingSender';
  }
}
