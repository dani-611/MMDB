import { type MovieItem } from './movie-item.type';
import { type PaginationResponseDto } from '../../../types/pagination-response.type';

export type MoviesResponse = PaginationResponseDto<MovieItem>;
