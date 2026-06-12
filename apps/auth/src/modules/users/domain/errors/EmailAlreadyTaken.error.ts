export class EmailAlreadyTaken extends Error {
  constructor(email: string) {
    super(`Email ${email} is already taken`);
    this.name = 'EmailAlreadyTaken';
  }
}
