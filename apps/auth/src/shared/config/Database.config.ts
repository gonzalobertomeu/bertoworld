export abstract class DatabaseConfig {
  host: string;
  port: number | string;
  dbname: string;
  user: string;
  pass: string;
  driver: 'postgres';
}

export class DatabaseConfigPostgres extends DatabaseConfig {
  private constructor() {
    super();
  }
  public static create() {
    const factory = new DatabaseConfigPostgres();
    factory.host = process.env.DB_HOST ?? '';
    factory.port = process.env.DB_PORT ?? 5432;
    factory.user = process.env.DB_USER ?? 'auth_service';
    factory.pass = process.env.DB_PASS ?? '';
    factory.dbname = process.env.DB_NAME ?? 'auth';
    factory.driver = 'postgres';
    return factory;
  }
}
