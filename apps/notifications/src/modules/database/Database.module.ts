import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  database: process.env.DB_NAME ?? 'notifications',
  host: process.env.DB_HOST ?? 'database',
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASS ?? '',
  port: Number(process.env.DB_PORT ?? 5432),
  autoLoadEntities: true,
  synchronize: true,
});
