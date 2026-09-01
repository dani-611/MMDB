import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Movie } from './movie.entity';
import { Person } from './person.entity';

@Entity('movie_crew')
@Index('movie_crew_movie_idx', ['movieId'])
export class MovieCrew {
  @PrimaryColumn({ name: 'movie_id', type: 'integer' })
  movieId!: number;

  @PrimaryColumn({ name: 'person_id', type: 'integer' })
  personId!: number;

  @PrimaryColumn({ type: 'text' })
  job!: string;

  @ManyToOne(() => Movie, (movie) => movie.crew, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'movie_id',
    foreignKeyConstraintName: 'movie_crew_movie_id_fkey',
  })
  movie!: Movie;

  @ManyToOne(() => Person, (person) => person.crewCredits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'person_id',
    foreignKeyConstraintName: 'movie_crew_person_id_fkey',
  })
  person!: Person;
}
