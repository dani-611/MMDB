import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  Generated,
} from 'typeorm';
import { MovieGenre } from './movie-genre.entity';
import { MovieCast } from './movie-cast.entity';
import { MovieCrew } from './movie-crew.entity';
import { Award } from './award.entity';
import { Review } from './review.entity';

@Entity('movies')
@Index('movies_title_lower_idx', { synchronize: false })
@Index('movies_year_idx', ['releaseYear'])
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ name: 'release_year', type: 'integer' })
  releaseYear!: number;

  @Column({ name: 'runtime_minutes', type: 'integer', nullable: true })
  runtimeMinutes?: number | null;

  @Column({ type: 'text', nullable: true })
  overview?: string | null;

  @Column({ name: 'poster_url', type: 'text', nullable: true })
  posterUrl?: string | null;

  @Column({ name: 'trailer_url', type: 'text', nullable: true })
  trailerUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  language?: string | null;

  @Column({ type: 'numeric', precision: 3, scale: 1, nullable: true })
  rating?: number | null;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.movie)
  movieGenres!: MovieGenre[];

  @OneToMany(() => MovieCast, (cast) => cast.movie)
  cast!: MovieCast[];

  @OneToMany(() => MovieCrew, (crew) => crew.movie)
  crew!: MovieCrew[];

  @OneToMany(() => Award, (award) => award.movie)
  awards!: Award[];

  @OneToMany(() => Review, (review) => review.movie)
  reviews!: Review[];

  constructor() {}
}
