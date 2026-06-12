export interface DatabaseConfig {
  host: string;
  port: number | string;
  dbname: string;
  user: string;
  pass: string;
  driver: 'postgres' | 'sqlite' | 'mongo';
}

export const getDatabaseConfig = (): DatabaseConfig => {
  return {
    host: process.env.DB_HOST ?? '',
    port: process.env.DB_PORT ?? 5432,
    user: process.env.DB_USER ?? '',
    pass: process.env.DB_PASS ?? '',
    dbname: (process.env.DB_DBNAME ?? 'brtm_auth') + '.sqlite3',
    driver: (process.env.DB_DRIVER as DatabaseConfig['driver']) ?? 'sqlite',
  };
};
