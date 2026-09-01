import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Generated,
} from 'typeorm';
import { MovieGenre } from './movie-genre.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text', unique: true })
  name!: string;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre)
  movieGenres!: MovieGenre[];

  constructor() {}
}
