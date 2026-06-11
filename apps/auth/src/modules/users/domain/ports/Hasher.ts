export abstract class Hasher {
  abstract hash(value: string): string | Promise<string>;
  abstract compare(value: string, hashed: string): boolean | Promise<boolean>;
}
