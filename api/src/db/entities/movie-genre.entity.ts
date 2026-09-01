import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from './genre.entity';

@Entity('movie_genres')
export class MovieGenre {
  @PrimaryColumn({ name: 'movie_id', type: 'integer' })
  movieId!: number;

  @PrimaryColumn({ name: 'genre_id', type: 'integer' })
  genre_id!: number;

  @ManyToOne(() => Movie, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'movie_id',
    foreignKeyConstraintName: 'movie_genres_movie_id_fkey',
  })
  movie!: Movie;

  @ManyToOne(() => Genre, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'genre_id',
    foreignKeyConstraintName: 'movie_genres_genre_id_fkey',
  })
  genre!: Genre;

  constructor() {}
}
