import { type MovieItem } from './movie-item.types';

export interface MoviesResponse<T = MovieItem> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
