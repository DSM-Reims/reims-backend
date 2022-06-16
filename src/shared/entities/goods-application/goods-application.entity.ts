import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class GoodsApplication {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  club!: User;

  @Column({ length: 36 })
  uuid!: string;

  @Column({ length: 30 })
  goodsName!: string;

  @Column({ length: 100 })
  description!: string;

  @Column({ length: 100, nullable: true })
  url!: string;

  @Column({ default: false })
  isReturned!: boolean;

  @Column({ nullable: true })
  returnedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
