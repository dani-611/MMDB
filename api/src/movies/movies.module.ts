import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'db/entities/movie.entity';
import { MoviesRepository } from './movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
