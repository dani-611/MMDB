import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../db/entities/movie.entity';
import { Review } from 'db/entities/review.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { ReviewsService } from './services/reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository, ReviewsService],
  exports: [MoviesService, ReviewsService],
})
export class MoviesModule {}
