// export interface NotifcationProps {
//   from: string;
//   to: string;
//   subject?: string;
//   body?: string;
// }

export class Notification {
  private constructor(
    id: string,
    recipientId: string,
    type: string, //Value Object: Enum Type
    channel: string, //Value Object: Enum Channel
    status: string, //Value Object: Status Machine
    payload: Record<string, any>,
    sentAt: Date,
    createdAt: Date,
    readAt: Date,
  ) {}

  // static create(props: NotifcationProps) {
  //   if (!props.from) throw new MissingSender();
  //   if (!props.to) throw new MissingReceiver();
  //   return new Notification(
  //     props.from,
  //     props.to,
  //     props.subject ?? '',
  //     props.body ?? '',
  //   );
  // }
  //
  // get from() {
  //   return this._from;
  // }
  // get to() {
  //   return this._to;
  // }
  // get subject() {
  //   return this._subject;
  // }
  // get body() {
  //   return this._body;
  // }
  //
  // toPrimitive(): NotifcationProps {
  //   return {
  //     from: this.from,
  //     to: this.to,
  //     subject: this.subject,
  //     body: this.body,
  //   };
  // }
}
