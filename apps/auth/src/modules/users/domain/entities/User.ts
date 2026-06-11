import { Hasher } from '../ports/Hasher';
export interface UserProps {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  isValidated: boolean;
  createdAt: Date;
}
export class User {
  private constructor(
    private _id: string,
    private _email: string,
    private _password: string,
    private _isActive: boolean,
    private _isValidated: boolean,
    private _createdAt: Date,
  ) {}

  static async create(email: string, password: string, hasher: Hasher) {
    const hashedPass = await hasher.hash(password);
    return new User(
      crypto.randomUUID(),
      email,
      hashedPass,
      true,
      false,
      new Date(),
    );
  }
  static reconstitute(props: UserProps) {
    return new User(
      props.id,
      props.email,
      props.password,
      props.isActive,
      props.isValidated,
      props.createdAt,
    );
  }

  get id() {
    return this._id;
  }
  get email() {
    return this._email;
  }
  get isActive() {
    return this._isActive;
  }
  get isValidated() {
    return this._isValidated;
  }
  get createdAt() {
    return this._createdAt;
  }

  async checkPassword(pass: string, hasher: Hasher) {
    return await hasher.compare(pass, this._password);
  }
}
