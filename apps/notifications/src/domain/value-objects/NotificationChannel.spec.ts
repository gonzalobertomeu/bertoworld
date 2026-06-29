import { describe, it, expect } from 'bun:test';
import { NotificationChannel } from './NotificationChannel';
import { InvalidNotificationChannel } from '../errors/InvalidNotificationChannel.error';

describe('NotificationChannel', () => {
  it('should be created with valid string', () => {
    const channel = NotificationChannel.from('EMAIL');
    expect(channel).toBeInstanceOf(NotificationChannel);
  });
  it('should not be created with invalid string', () => {
    expect(() => {
      NotificationChannel.from('TESTCHANNELFAIL');
    }).toThrow(InvalidNotificationChannel);
  });
  it('should return a coherent value', () => {
    const channel = NotificationChannel.from('EMAIL');
    expect(channel.channel).toBe('EMAIL');
  });
});
