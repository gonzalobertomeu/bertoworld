import { describe, it, expect, beforeEach } from 'bun:test';
import { Notification, NotificationCreateProp } from './Notification';
import { InvalidStatusTransition } from '../errors/InvalidStatusTransition.error';

describe('Notification', () => {
  let now: Date;
  let props: NotificationCreateProp;
  let notification: Notification;
  beforeEach(() => {
    now = new Date();
    props = {
      recipientId: 'randomUUID',
      type: 'VALIDATE_USER',
      channel: 'EMAIL',
      payload: {},
      sentAt: now,
    };
    notification = Notification.create(props);
  });
  it('should be created', () => {
    expect(notification.status).toBe('PENDING');
    expect(notification.channel).toBe(props.channel);
    expect(notification.type).toBe(props.type);
    expect(notification.sentAt.getTime()).toBe(now.getTime());
    expect(notification.createdAt).toBeInstanceOf(Date);
    expect(notification.id).toBeString();
  });

  [
    {
      success: true,
      events: [['FAILED'], ['FAILED', 'PENDING', 'SENT'], ['SENT']],
    },
    {
      success: false,
      events: [
        ['PENDING'],
        ['SENT', 'SENT'],
        ['SENT', 'FAILED'],
        ['SENT', 'PENDING'],
      ],
    },
  ].forEach(({ success, events }) => {
    if (success) {
      events.forEach((chain) => {
        it(`should change status in chain: ${chain.join(' - ')}`, () => {
          chain.forEach((status) => {
            notification.toStatus(status);
          });
          expect(notification.status).toBe(chain.pop() as string);
        });
      });
    } else {
      events.forEach((chain) => {
        it(`should throws when status changes in chain: ${chain.join(' - ')}`, () => {
          const fn = () => {
            chain.forEach((status) => {
              notification.toStatus(status);
            });
          };
          expect(fn).toThrow(InvalidStatusTransition);
        });
      });
    }
  });
});
