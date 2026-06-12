import { Module } from '@nestjs/common';
import { getDatabaseConfig } from './Database.config';

export const DATABASE_CONFIG = Symbol('DatabaseConfig');
@Module({
  providers: [{ provide: DATABASE_CONFIG, useFactory: getDatabaseConfig }],
  exports: [DATABASE_CONFIG],
})
export class ConfigModule {}
