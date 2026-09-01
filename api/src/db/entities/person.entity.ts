import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Generated,
} from 'typeorm';
import { MovieCast } from './movie-cast.entity';
import { MovieCrew } from './movie-crew.entity';
import { Award } from './award.entity';

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  biography?: string | null;

  @Column({ type: 'text', nullable: true })
  gender?: string | null;

  @Column({ type: 'date', nullable: true })
  birthdate?: string | null;

  @Column({ name: 'place_of_birth', type: 'text', nullable: true })
  placeOfBirth?: string | null;

  @Column({ name: 'known_for', type: 'text', nullable: true })
  knownFor?: string | null;

  @OneToMany(() => MovieCast, (cast) => cast.person)
  castCredits!: MovieCast[];

  @OneToMany(() => MovieCrew, (crew) => crew.person)
  crewCredits!: MovieCrew[];

  @OneToMany(() => Award, (award) => award.person)
  awards!: Award[];

  constructor() {}
}
