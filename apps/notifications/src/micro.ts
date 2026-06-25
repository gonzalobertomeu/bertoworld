import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './infrastructure/notifications.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://broker:4222'],
      },
    },
  );
  await app.listen();
}
bootstrap().catch(console.error);
