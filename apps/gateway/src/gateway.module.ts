import { Module } from '@nestjs/common';
import { AuthController } from './apis/auth/auth.http';
import { AuthRemoteModule } from './apis/auth/auth.remote';

@Module({
  imports: [AuthRemoteModule],
  controllers: [AuthController],
  providers: [],
})
export class GatewayModule {}
