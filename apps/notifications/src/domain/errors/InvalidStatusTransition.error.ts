import { DomainError } from '@bertoworld/shared/errors/DomainError.error';

export class InvalidStatusTransition extends DomainError {
  constructor(before: string, after: string) {
    super(`Invalid transition from ${before} to ${after}`);
    this.name = 'InvalidStatusTransition';
  }
}
