import { Max, Min } from 'class-validator';
import { PaginationQueryDto } from '../../../dto/request/pagination-query.dto';

export class MoviePaginationQueryDto extends PaginationQueryDto {
  @Min(1)
  page: number = 1;

  @Max(40)
  pageSize: number = 8;
}
