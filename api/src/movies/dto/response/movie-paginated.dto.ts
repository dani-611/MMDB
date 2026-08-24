import { PaginationResponseDto } from '../../../dto/response/pagination-response.dto';
import { MovieItemDto } from './movie-item.dto';

export class MoviePaginatedDto extends PaginationResponseDto {
  data!: MovieItemDto[];
}
