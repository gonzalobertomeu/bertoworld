import { describe, it, mock, expect, beforeEach } from 'bun:test';
import { User, UserProps } from './User';
import { Hasher } from '../ports/Hasher';

describe('User', () => {
  let hasher: Hasher;
  beforeEach(() => {
    hasher = {
      hash: mock(() => Promise.resolve('hashedPass')),
      compare: mock(() => Promise.resolve(true)),
    };
  });
  it('should be created by factory method', async () => {
    const user = await User.create('usuario@test.com', 'test1', hasher);
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe('usuario@test.com');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.id).toBeString();
  });
  it('should be created with password hash', async () => {
    const user = await User.create('usuario_randome@test.com', 'kinga', hasher);
    expect(await user.checkPassword('kinga', hasher)).toBe(true);
  });
  it('should be created with isValidated in false', async () => {
    const user = await User.create('usuario_randome@test.com', 'kinga', hasher);
    expect(user.isValidated).toBe(false);
  });
  it('should be created with isActive in true', async () => {
    const user = await User.create('usuario_randome@test.com', 'kinga', hasher);
    expect(user.isActive).toBe(true);
  });
  it('should be reconstitued from ORM data', () => {
    const ormUser: UserProps = {
      id: 'asdf3123123',
      email: 'user_test@test.com',
      password: 'fdslkjlkjdfhglkdsjfg',
      isActive: false,
      isValidated: true,
      createdAt: new Date(),
    };
    const user = User.reconstitute(ormUser);
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(ormUser.email);
    expect(user.id).toBe(ormUser.id);
  });
});
