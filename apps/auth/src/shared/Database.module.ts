import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ConfigModule, DATABASE_CONFIG } from './config/Config.module';
import { DatabaseConfig } from './config/Database.config';

export const DatabaseModule = MikroOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [DATABASE_CONFIG],
  useFactory: (dbconf: DatabaseConfig) => {
    if (dbconf.driver == 'sqlite') {
      return {
        driver: SqliteDriver,
        dbName: dbconf.dbname,
        entities: ['src/modules/*/infrastructure/**/*.entity.ts'],
      };
    }
    return {};
  },
});
