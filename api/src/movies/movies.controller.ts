import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';
import { PaginationResponseDto } from 'dto/response/pagination-response.dto';
import { MovieItemDto } from './dto/response/movie-item.dto';
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(
    @Query() query: MoviePaginationQueryDto,
  ): Promise<PaginationResponseDto<MovieItemDto>> {
    return this.moviesService.findAll(query);
  }
}
