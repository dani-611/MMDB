import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text', unique: true })
  name!: string;

  constructor() {}
}
