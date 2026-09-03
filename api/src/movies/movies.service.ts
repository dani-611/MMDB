import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';
import { MovieItemDto } from './dto/response/movie-item.dto';
import { MoviesRepository } from './movies.repository';
import { mapToDto } from 'common/utils/mapper.util';
import { PaginationResponseDto } from 'dto/response/pagination-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'db/entities/review.entity';
import { Repository, DataSource } from 'typeorm';
import { MovieDetailsResponseDto } from './dto/response/movie-details-response.dto';

interface RawGenreRow {
  name: string;
}

interface RawCrewRow {
  name: string;
  job: string;
}

interface RawCastRow {
  uuid: string;
  name: string;
  photoUrl: string | null;
  characterName: string;
}

interface RawReviewRow {
  uuid: string;
  rating: number | null;
  rawBody: string | null;
  displayName: string;
  createdAt: Date;
}

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    query: MoviePaginationQueryDto,
  ): Promise<PaginationResponseDto<MovieItemDto>> {
    const { movies, total, pageSize, page } =
      await this.moviesRepository.findAndCountPaginated(query);

    const transformedMovies = mapToDto(MovieItemDto, movies);

    return new PaginationResponseDto(transformedMovies, total, page, pageSize);
  }

  private isValidReviewPayload(
    obj: unknown,
  ): obj is { title?: string; body?: string } {
    return obj !== null && typeof obj === 'object';
  }

  public parseReviewBody(rawBody: string | null): {
    title: string | null;
    body: string | null;
  } {
    if (!rawBody) return { title: null, body: null };
    try {
      const parsed: unknown = JSON.parse(rawBody);
      if (this.isValidReviewPayload(parsed)) {
        return {
          title: parsed.title ?? null,
          body: parsed.body ?? null,
        };
      }
    } catch {
      // Gracefully ignore malformed JSON review text payloads
    }
    return { title: null, body: rawBody };
  }

  async getMovieDetails(
    uuid: string,
    userId?: number,
  ): Promise<MovieDetailsResponseDto> {
    const movie = await this.moviesRepository.findOne({ where: { uuid } });
    if (!movie) throw new NotFoundException('Movie not found');

    const reviewsCount = await this.reviewRepository.count({
      where: { movieId: movie.id },
    });

    let myRating: number | null = null;
    if (userId) {
      const personalInteraction = await this.reviewRepository.findOne({
        where: { movieId: movie.id, userId },
      });
      if (personalInteraction) {
        myRating = personalInteraction.rating ?? null;
      }
    }

    const genreRows = await this.dataSource.query<RawGenreRow[]>(
      `SELECT g.name FROM movie_genres mg JOIN genres g ON mg.genre_id = g.id WHERE mg.movie_id = $1`,
      [movie.id],
    );

    const crewRows = await this.dataSource.query<RawCrewRow[]>(
      `SELECT p.name, mc.job FROM movie_crew mc JOIN people p ON mc.person_id = p.id WHERE mc.movie_id = $1`,
      [movie.id],
    );

    const castRows = await this.dataSource.query<RawCastRow[]>(
      `SELECT p.uuid, p.name, p.photo_url as "photoUrl", mc.character_name as "characterName" 
       FROM movie_cast mc JOIN people p ON mc.person_id = p.id WHERE mc.movie_id = $1 ORDER BY mc.billing_order ASC`,
      [movie.id],
    );

    const reviewRows = await this.dataSource.query<RawReviewRow[]>(
      `SELECT r.uuid, r.rating, r.body as "rawBody", u.display_name as "displayName", r.created_at as "createdAt"
       FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = $1 AND r.body IS NOT NULL ORDER BY r.created_at DESC LIMIT 3`,
      [movie.id],
    );

    const parsedReviews = reviewRows.map((row: RawReviewRow) => {
      const { title, body } = this.parseReviewBody(row.rawBody);
      return {
        uuid: row.uuid,
        rating: row.rating,
        displayName: row.displayName,
        createdAt: row.createdAt,
        title,
        body,
      };
    });

    const plainMovieData: Record<string, unknown> = {
      ...movie,
      rating: movie.rating ?? null,
      reviewsCount,
      myRating: myRating ?? null,
      runtimeMinutes: movie.runtimeMinutes ?? null,
      genres: genreRows.map((g: RawGenreRow) => g.name),
      directors: crewRows
        .filter((c: RawCrewRow) => c.job.toLowerCase() === 'director')
        .map((c: RawCrewRow) => c.name),
      writers: crewRows
        .filter((c: RawCrewRow) => c.job.toLowerCase() === 'writer')
        .map((c: RawCrewRow) => c.name),
      cast: castRows,
      userReviews: parsedReviews,
    };

    return mapToDto(MovieDetailsResponseDto, plainMovieData);
  }
}
