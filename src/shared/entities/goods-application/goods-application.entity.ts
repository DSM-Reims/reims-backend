import {
  Column,
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
  club!: number;

  @Column({ length: 30 })
  goodsName!: string;

  @Column({ length: 100 })
  description!: string;

  @Column({ length: 100, nullable: true })
  url!: string;
}
