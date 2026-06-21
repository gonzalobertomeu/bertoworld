import { Hasher } from '../../domain/ports/Hasher';

@Injectable()
export class HasherArgon extends Hasher {
  async hash(value: string): Promise<string> {
    const pass = await Bun.password.hash(value, {
      algorithm: 'argon2id',
      timeCost: 2,
      memoryCost: 19456,
    });
    return pass;
  }
  async compare(value: string, hashed: string): Promise<boolean> {
    return await Bun.password.verify(value, hashed);
  }
}
