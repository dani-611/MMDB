import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Person } from './person.entity';

@Entity('movie_cast')
@Index('movie_cast_person_idx', ['personId'])
export class MovieCast {
  @PrimaryColumn({ name: 'movie_id', type: 'integer' })
  movieId!: number;

  @PrimaryColumn({ name: 'person_id', type: 'integer' })
  personId!: number;

  @PrimaryColumn({ name: 'character_name', type: 'text' })
  characterName!: string;

  @Column({ name: 'billing_order', type: 'integer', default: 0 })
  billingOrder!: number;

  @ManyToOne(() => Movie, (movie) => movie.cast, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'movie_id',
    foreignKeyConstraintName: 'movie_cast_movie_id_fkey',
  })
  movie!: Movie;

  @ManyToOne(() => Person, (person) => person.castCredits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'person_id',
    foreignKeyConstraintName: 'movie_cast_person_id_fkey',
  })
  person!: Person;

  constructor() {}
}
