import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from './config/Config.module';
import { DatabaseConfig } from './config/Database.config';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [DatabaseConfig],
  useFactory: (config: DatabaseConfig): TypeOrmModuleOptions => ({
    host: config.host,
    database: config.dbname,
    username: config.user,
    password: config.pass,
    port: Number(config.port),
    type: config.driver,
    synchronize: true,
    autoLoadEntities: true,
  }),
});
