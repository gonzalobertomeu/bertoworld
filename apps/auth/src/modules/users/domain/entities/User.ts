import { UserNotActive } from '../errors/UserNotActive.error';
import { Hasher } from '../ports/Hasher';
export interface UserProps {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  isValidated: boolean;
  createdAt: Date;
}

export interface PublicUser {
  id: string;
  email: string;
  isValidated: boolean;
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

  get password() {
    return this._password;
  }

  public(): PublicUser {
    if (!this.isActive) {
      throw new UserNotActive(this.id);
    }
    return {
      id: this.id,
      email: this.email,
      isValidated: this.isValidated,
    };
  }

  async checkPassword(pass: string, hasher: Hasher) {
    return await hasher.compare(pass, this._password);
  }
}
