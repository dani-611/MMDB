import { Expose, Type } from 'class-transformer';

export class CastMemberDto {
  @Expose() uuid!: string;
  @Expose() name!: string;
  @Expose() photoUrl?: string | null;
  @Expose() characterName!: string;
}

export class UserReviewDto {
  @Expose() uuid!: string;
  @Expose() displayName!: string;
  @Expose() rating?: number | null;
  @Expose() title?: string | null;
  @Expose() body?: string | null;
  @Expose() createdAt!: Date;
}

export class MovieDetailsResponseDto {
  @Expose() uuid!: string;
  @Expose() title!: string;
  @Expose() posterUrl?: string | null;
  @Expose() runtimeMinutes?: number | null;
  @Expose() trailerUrl?: string | null;
  @Expose() releaseYear?: number;
  @Expose() rating?: number | null;
  @Expose() overview?: string | null;
  @Expose() language?: string | null;
  @Expose() reviewsCount!: number;
  @Expose() genres?: string[];
  @Expose() directors?: string[];
  @Expose() writers?: string[];

  @Expose() myRating?: number | null;

  @Expose()
  @Type(() => CastMemberDto)
  cast!: CastMemberDto[];

  @Expose()
  @Type(() => UserReviewDto)
  userReviews!: UserReviewDto[];
}
