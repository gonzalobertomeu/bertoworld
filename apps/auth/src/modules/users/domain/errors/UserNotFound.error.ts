export class UserNotFound extends Error {
  constructor(id: string) {
    super(`Userl ${id} not found`);
    this.name = 'UserNotFound';
  }
}
