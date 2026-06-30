import { describe, it, expect } from 'bun:test';
import { NotificationType } from './NotificationType';
import { InvalidNotificationType } from '../errors/InvalidNotificationType.error';

describe('NotificationType', () => {
  [
    {
      success: true,
      events: ['VALIDATE_USER', 'PASSWORD_RESET', 'password_reset'],
    },
    { success: false, events: ['TEST_FAILED', 'passwordReset'] },
  ].forEach(({ success, events }) => {
    if (success) {
      events.forEach((event) => {
        it(`should be created from ${event}`, () => {
          const type = NotificationType.from(event);
          expect(type).toBeInstanceOf(NotificationType);
          expect(type.type).toBe(event.toUpperCase());
        });
      });
    } else {
      events.forEach((event) => {
        it(`should throw error with invalid type: ${event}`, () => {
          expect(() => {
            NotificationType.from(event);
          }).toThrow(InvalidNotificationType);
        });
      });
    }
  });
});
