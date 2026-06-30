import { describe, it, expect } from 'bun:test';
import { NotificationStatus } from './NotificationStatus';
import { InvalidStatusTransition } from '../errors/InvalidStatusTransition.error';

describe('NotificationStatus', () => {
  ['pending', 'sent', 'failed'].forEach((statusName: string) => {
    it(`should accept status ${statusName}`, () => {
      const status = NotificationStatus.from(statusName);
      expect(status).toBeInstanceOf(NotificationStatus);
      expect(status.status).toBe(statusName.toUpperCase());
    });
  });

  [
    {
      success: true,
      events: [
        ['pending', 'sent'],
        ['pending', 'failed'],
        ['failed', 'pending'],
      ],
    },
    {
      success: false,
      events: [
        ['sent', 'pending'],
        ['sent', 'failed'],
        ['failed', 'sent'],
        ['sent', 'sent'],
        ['failed', 'failed'],
        ['pending', 'pending'],
      ],
    },
  ].forEach((testCase) => {
    if (testCase.success) {
      testCase.events.forEach(([origin, destiny]) => {
        it(`should transition from ${origin} to ${destiny}`, () => {
          const from = NotificationStatus.from(origin);
          const to = from.to(destiny);
          expect(to).toBeInstanceOf(NotificationStatus);
        });
      });
    } else {
      testCase.events.forEach(([origin, destiny]) => {
        it(`should not tranisition from ${origin} to ${destiny}`, () => {
          const from = NotificationStatus.from(origin);
          expect(() => {
            from.to(destiny);
          }).toThrow(InvalidStatusTransition);
        });
      });
    }
  });
});
