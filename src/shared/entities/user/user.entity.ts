import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 36 })
  uuid!: string;

  @Column({ length: 60 })
  code!: string;

  @Column({ length: 4 })
  name!: string;

  @Column({ length: 4, nullable: true })
  chargeName!: string;

  @Column({ enum: ['CLUB', 'TEACHER'] })
  userType!: string;
}
