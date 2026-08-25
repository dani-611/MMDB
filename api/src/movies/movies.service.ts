import { Injectable } from '@nestjs/common';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';
import { MovieItemDto } from './dto/response/movie-item.dto';
import { MoviesRepository } from './movies.repository';
import { mapToDto } from 'common/utils/mapper.util';
import { PaginationResponseDto } from 'dto/response/pagination-response.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async findAll(
    query: MoviePaginationQueryDto,
  ): Promise<PaginationResponseDto<MovieItemDto>> {
    const { movies, total, pageSize, page } =
      await this.moviesRepository.findAndCountPaginated(query);

    const transformedMovies = mapToDto(MovieItemDto, movies);

    return new PaginationResponseDto(transformedMovies, total, page, pageSize);
  }
}
