import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { User } from './user.entity';

@Entity('reviews')
@Unique('reviews_one_per_user_per_movie', ['movieId', 'userId'])
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', nullable: true })
  rating?: number | null;

  @Column({ type: 'text', nullable: true })
  body?: string | null;

  @Column({ name: 'movie_id' })
  movieId!: number;

  @ManyToOne(() => Movie, (movie) => movie.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
