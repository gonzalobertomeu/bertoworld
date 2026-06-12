import { User } from '../entities/User';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract get(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
