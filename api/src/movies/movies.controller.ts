import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query() query: MoviePaginationQueryDto) {
    return this.moviesService.findAll(query);
  }
}
