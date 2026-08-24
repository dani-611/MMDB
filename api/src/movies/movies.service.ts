import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from 'db/entities/movie.entity';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';
import { MoviePaginatedDto } from './dto/response/movie-paginated.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { MovieItemDto } from './dto/response/movie-item.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly repo: Repository<Movie>,
  ) {}

  async findAll(query: MoviePaginationQueryDto): Promise<MoviePaginatedDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 8;

    const [movies, total] = await this.repo.findAndCount({
      select: { id: true, title: true, posterUrl: true, releaseYear: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { releaseYear: 'DESC' },
    });

    const transformedMovies = plainToInstance(MovieItemDto, movies, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformedMovies,
      totalItems: total,
      itemCount: transformedMovies.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }
}
