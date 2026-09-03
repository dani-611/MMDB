import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Review } from '../../db/entities/review.entity';
import { SubmitInteractionDto } from '../dto/request/submit-interaction.dto';
import { PaginationQueryDto } from '../../dto/request/pagination-query.dto';
import { PaginationResponseDto } from '../../dto/response/pagination-response.dto';
import { UserReviewDto } from '../dto/response/movie-details-response.dto';
import { mapToDto } from '../../common/utils/mapper.util';
import { MoviesRepository } from 'movies/movies.repository';

interface RawReviewRow {
  uuid: string;
  rating: number | null;
  rawBody: string | null;
  displayName: string;
  createdAt: Date;
}

interface ParsedReviewJson {
  title?: string;
  body?: string;
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly movieRepository: MoviesRepository,
    private readonly dataSource: DataSource,
  ) {}

  async upsertInteraction(
    movieUuid: string,
    userId: number,
    dto: SubmitInteractionDto,
  ): Promise<{ message: string }> {
    if (!dto.rating && !dto.body && !dto.title) {
      throw new BadRequestException(
        'Provide at least a rating score or review content components.',
      );
    }

    const movie = await this.movieRepository.findOne({
      where: { uuid: movieUuid },
    });
    if (!movie) throw new NotFoundException('Movie not found');

    const existing = await this.reviewRepository.findOne({
      where: { movieId: movie.id, userId },
    });

    if (existing && existing.body && (dto.body || dto.title)) {
      throw new BadRequestException(
        'You have already shared a text review for this movie file. You can only rate or modify aggregate scores.',
      );
    }

    let dbBodyString: string | null = null;
    if (dto.title || dto.body) {
      dbBodyString = JSON.stringify({
        title: dto.title || '',
        body: dto.body || '',
      });
    } else if (existing && existing.body) {
      dbBodyString = existing.body;
    }

    const finalRating =
      dto.rating !== undefined ? dto.rating : (existing?.rating ?? null);

    await this.dataSource.query(
      `INSERT INTO "reviews" ("movie_id", "user_id", "rating", "body", "created_at")
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT ("movie_id", "user_id") DO UPDATE
       SET 
         "rating" = COALESCE($3, "reviews"."rating"),
         "body" = COALESCE($4, "reviews"."body"),
         "created_at" = NOW()`,
      [movie.id, userId, finalRating, dbBodyString],
    );

    const rawResult = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .where('review.movie_id = :movieId AND review.rating IS NOT NULL', {
        movieId: movie.id,
      })
      .getRawOne<{ avgRating: string | null }>();

    const avgRating = rawResult?.avgRating;

    await this.movieRepository.update(movie.id, {
      rating: avgRating ? parseFloat(parseFloat(avgRating).toFixed(1)) : null,
    });
    return { message: 'Interaction processed successfully.' };
  }

  private parseReviewBody(rawBody: string | null): {
    title: string | null;
    body: string | null;
  } {
    if (!rawBody) return { title: null, body: null };
    try {
      const parsed = JSON.parse(rawBody) as unknown;
      if (parsed && typeof parsed === 'object') {
        const reviewData = parsed as ParsedReviewJson;
        return {
          title: reviewData.title ?? null,
          body: reviewData.body ?? null,
        };
      }
    } catch {
      // Gracefully continue parsing execution logic paths
    }
    return { title: null, body: rawBody };
  }

  async getPaginatedReviews(
    uuid: string,
    query: PaginationQueryDto,
  ): Promise<PaginationResponseDto<UserReviewDto>> {
    const movie = await this.movieRepository.findOne({ where: { uuid } });
    if (!movie) throw new NotFoundException('Movie not found');

    const offset = (query.page - 1) * query.pageSize;
    const totalRows = await this.reviewRepository.count({
      where: { movieId: movie.id },
    });

    const reviews = await this.dataSource.query<RawReviewRow[]>(
      `SELECT r.uuid, r.rating, r.body as "rawBody", u.display_name as "displayName", r.created_at as "createdAt"
       FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = $1 AND r.body IS NOT NULL ORDER BY r.created_at DESC LIMIT $2 OFFSET $3`,
      [movie.id, query.pageSize, offset],
    );

    const parsedResults = reviews.map((row: RawReviewRow) => {
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

    const transformedReviews = mapToDto(UserReviewDto, parsedResults);

    return new PaginationResponseDto<UserReviewDto>(
      transformedReviews,
      totalRows,
      query.page,
      query.pageSize,
    );
  }
}
