import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { UserRepository } from '../../domain/repositories/User.repository';
import { GetUserUseCase } from './GetUser.usecase';
import { User } from '../../domain/entities/User';
import { UserNotFound } from '../../domain/errors/UserNotFound.error';

describe('GetUser', () => {
  let userRepoMock: UserRepository;

  beforeEach(() => {
    userRepoMock = {
      findByEmail: mock((email: string) => {
        if (email !== 'user@test.com') {
          return Promise.resolve(null);
        }
        return Promise.resolve(
          User.reconstitute({
            id: 'id-test',
            email: email,
            password: '123',
            isActive: true,
            isValidated: false,
            createdAt: new Date(),
          }),
        );
      }),
      get: mock((id: string) => {
        if (id !== '123') {
          return Promise.resolve(null);
        }
        return Promise.resolve(
          User.reconstitute({
            id: id,
            email: 'user@test.com',
            password: '123',
            isActive: true,
            isValidated: false,
            createdAt: new Date(),
          }),
        );
      }),
      save: mock(),
    };
  });

  it('shoud return User by id', () => {
    const usecase = new GetUserUseCase(userRepoMock);
    expect(usecase.execute({ id: '123' })).resolves.toBeInstanceOf(User);
  });
  it('shoud not return non-existing User by id', () => {
    const usecase = new GetUserUseCase(userRepoMock);
    expect(usecase.execute({ id: '321' })).rejects.toThrowError(UserNotFound);
  });
  it('shoud return User by email', () => {
    const usecase = new GetUserUseCase(userRepoMock);
    expect(usecase.execute({ email: 'user@test.com' })).resolves.toBeInstanceOf(
      User,
    );
  });
  it('shoud not return non-existing User by email', () => {
    const usecase = new GetUserUseCase(userRepoMock);
    expect(
      usecase.execute({ email: 'fakeuser@test.com' }),
    ).rejects.toThrowError(UserNotFound);
  });
});
