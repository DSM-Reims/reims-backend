import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Result {
  @PrimaryColumn()
  clubId!: number;

  @Column({ length: 20 })
  name!: string;

  @Column({ length: 100 })
  description!: string;

  @OneToOne(() => User)
  @JoinColumn()
  club!: number;
}
