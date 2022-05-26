import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Vote {
  @PrimaryColumn()
  votedId!: number;

  @PrimaryColumn()
  userId!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  voted!: User;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;
}
