import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  isActive: boolean;
  @Column()
  isValidated: boolean;
  @Column({ type: 'timestamp' })
  createdAt: Date;
}
