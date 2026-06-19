import { User } from '../../domain/entities/User';
import { UserEntity } from './User.entity';

export class UserMapper {
  static toDomain(orm: UserEntity): User {
    return User.reconstitute(orm);
  }
  static toEntity(domain: User): UserEntity {
    const orm = new UserEntity();
    orm.id = domain.id;
    orm.email = domain.email;
    orm.password = domain.password;
    orm.isActive = domain.isActive;
    orm.isValidated = domain.isValidated;
    orm.createdAt = domain.createdAt;
    return orm;
  }
}
