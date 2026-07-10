import { IsDateString, IsObject, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  recipientId: string;

  @IsString()
  type: string;

  @IsString()
  @IsDateString()
  sentAt: string;

  @IsObject()
  payload: Record<string, any>;
}
