import { ClientsModule, Transport } from '@nestjs/microservices';

export const AuthRemote = Symbol('auth_remote_module');
export const AuthRemoteModule = ClientsModule.register([
  {
    name: AuthRemote,
    transport: Transport.NATS,
    options: {
      servers: ['nats://broker:4222'],
    },
  },
]);
