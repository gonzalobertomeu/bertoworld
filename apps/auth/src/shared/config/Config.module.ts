import { Module } from '@nestjs/common';
import { DatabaseConfig, DatabaseConfigPostgres } from './Database.config';

@Module({
  providers: [
    {
      provide: DatabaseConfig,
      useFactory: () => DatabaseConfigPostgres.create(),
    },
  ],
  exports: [DatabaseConfig],
})
export class ConfigModule {}
