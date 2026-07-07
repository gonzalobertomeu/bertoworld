import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class NotFound extends DomainError {
  constructor(id: string, model?: string) {
    super(`${model ? `Entity ${model}: ` : ''}${id} not found`);
    this.name = 'NotFound';
  }
}
