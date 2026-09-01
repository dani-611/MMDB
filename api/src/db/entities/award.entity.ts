import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { Person } from './person.entity';
import { Movie } from './movie.entity';

@Entity('awards')
export class Award {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ name: 'person_id', type: 'integer' })
  personId!: number;

  @Column({ name: 'movie_id', type: 'integer', nullable: true })
  movieId?: number | null;

  @Column({ type: 'integer' })
  year!: number;

  @Column({ type: 'text' })
  body!: string;

  @Column({ type: 'text' })
  category!: string;

  @Column({ type: 'text' })
  result!: string;

  @ManyToOne(() => Person, (person) => person.awards, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'person_id',
    foreignKeyConstraintName: 'awards_person_id_fkey',
  })
  person!: Person;

  @ManyToOne(() => Movie, (movie) => movie.awards, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'movie_id',
    foreignKeyConstraintName: 'awards_movie_id_fkey',
  })
  movie?: Movie | null;

  constructor() {}
}
