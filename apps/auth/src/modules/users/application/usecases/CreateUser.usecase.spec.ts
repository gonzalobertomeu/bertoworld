import { describe, it, expect, beforeEach, mock } from 'bun:test';
import { UserRepository } from '../../domain/repositories/User.repository';
import { Hasher } from '../../domain/ports/Hasher';
import { User } from '../../domain/entities/User';
import { CreateUserUseCase } from './CreateUser.usecase';
import { EmailAlreadyTaken } from '../../domain/errors/EmailAlreadyTaken.error';

describe('CreateUser', () => {
  let hasherMock: Hasher;
  let userRepoMock: UserRepository;
  let usecase: CreateUserUseCase;
  beforeEach(() => {
    hasherMock = {
      hash: mock(() => Promise.resolve('hashedpass')),
      compare: mock(() => Promise.resolve(true)),
    };
    userRepoMock = {
      findByEmail: mock((email: string) => {
        if (email == 'fail@test.com') {
          return Promise.resolve(null);
        }
        const user = User.reconstitute({
          id: 'user_id_1',
          email: email,
          password: 'userpass',
          isActive: true,
          isValidated: true,
          createdAt: new Date(),
        });
        return Promise.resolve(user);
      }),
      get: mock((id: string) => {
        const user = User.reconstitute({
          id: id,
          email: 'user@test.com',
          password: 'userpass',
          isActive: true,
          isValidated: true,
          createdAt: new Date(),
        });
        return Promise.resolve(user);
      }),
      save: mock((user: User) => {
        if (user.email == 'fail@test.com') {
          throw new EmailAlreadyTaken(user.email);
        }
        return Promise.resolve();
      }),
    };
    usecase = new CreateUserUseCase(userRepoMock, hasherMock);
  });
  it('should not create existing user', () => {
    expect(
      usecase.execute({ email: 'fail@test.com', password: '123' }),
    ).rejects.toThrow(EmailAlreadyTaken);
  });
  it('should create user', () => {
    expect(
      usecase.execute({ email: 'user@test.com', password: '1234' }),
    ).resolves.toBeInstanceOf(User);
  });
});
