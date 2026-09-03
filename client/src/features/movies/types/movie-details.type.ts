export interface CastMember {
  uuid: string;
  name: string;
  photoUrl: string | null;
  characterName: string;
}

export interface UserReview {
  uuid: string;
  displayName: string;
  rating: number | null;
  title: string | null;
  body: string | null;
  createdAt: string;
}

export interface MovieDetails {
  uuid: string;
  title: string;
  posterUrl: string | null;
  trailerUrl: string | null;
  releaseYear: number;
  runtimeMinutes: number | null;
  rating: number | null;
  overview: string | null;
  language: string | null;
  reviewsCount: number;
  genres: string[];
  directors: string[];
  writers: string[];
  cast: CastMember[];
  userReviews: UserReview[];
  myRating: number | null;
}
