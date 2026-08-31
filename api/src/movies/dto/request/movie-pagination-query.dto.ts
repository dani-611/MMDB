import { NumberField } from 'common/decorators/number-field.decorator';
import { PaginationQueryDto } from '../../../dto/request/pagination-query.dto';
import {
  MOVIES_DEFAULT_PAGE_SIZE,
  MOVIES_DEFAULT_PAGE,
  MOVIES_MAX_PAGE_SIZE,
  MOVIES_MIN_PAGE,
} from 'common/constants/constants';

export class MoviePaginationQueryDto extends PaginationQueryDto {
  @NumberField({ min: MOVIES_MIN_PAGE, optional: true })
  page: number = MOVIES_DEFAULT_PAGE;

  @NumberField({ max: MOVIES_MAX_PAGE_SIZE, optional: true })
  pageSize: number = MOVIES_DEFAULT_PAGE_SIZE;
}
