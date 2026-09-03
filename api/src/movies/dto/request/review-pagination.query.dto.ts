//needs work
import { NumberField } from 'common/decorators/number-field.decorator';
import { PaginationQueryDto } from '../../../dto/request/pagination-query.dto';
import {
  REVIEWS_MIN_PAGE,
  REVIEWS_MAX_PAGE_SIZE,
  REVIEWS_DEFAULT_PAGE,
  REVIEWS_DEFAULT_PAGE_SIZE,
} from 'common/constants/constants';

export class ReviewPaginationQueryDto extends PaginationQueryDto {
  @NumberField({ min: REVIEWS_MIN_PAGE, optional: true })
  page: number = REVIEWS_DEFAULT_PAGE;

  @NumberField({ max: REVIEWS_MAX_PAGE_SIZE, optional: true })
  pageSize: number = REVIEWS_DEFAULT_PAGE_SIZE;
}
