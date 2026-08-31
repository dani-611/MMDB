import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Generated,
} from 'typeorm';

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

  constructor() {}
}
