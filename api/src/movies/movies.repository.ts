import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from 'db/entities/movie.entity';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';

@Injectable()
export class MoviesRepository extends Repository<Movie> {
  constructor(private dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }

  async findAndCountPaginated(query: MoviePaginationQueryDto): Promise<{
    movies: Movie[];
    total: number;
    pageSize: number;
    page: number;
  }> {
    const page = query.page;
    const pageSize = query.pageSize;

    const [movies, total] = await this.findAndCount({
      select: {
        uuid: true,
        title: true,
        posterUrl: true,
        releaseYear: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { releaseYear: 'DESC', id: 'ASC' },
    });

    return {
      movies,
      total,
      pageSize,
      page,
    };
  }
}
