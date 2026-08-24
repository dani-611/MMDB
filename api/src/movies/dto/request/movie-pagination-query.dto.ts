import { Max } from 'class-validator';
import { PaginationQueryDto } from '../../../dto/request/pagination-query.dto';

export class MoviePaginationQueryDto extends PaginationQueryDto {
  @Max(40)
  limit: number = 8;
}
