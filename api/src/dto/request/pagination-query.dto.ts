import {
  DEFAULT_MIN_PAGE,
  DEFAULT_MIN_PAGE_SIZE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from 'common/constants/constants';
import { NumberField } from 'common/decorators/number-field.decorator';

export class PaginationQueryDto {
  @NumberField({ min: DEFAULT_MIN_PAGE, optional: true })
  page: number = DEFAULT_PAGE;

  @NumberField({ min: DEFAULT_MIN_PAGE_SIZE, optional: true })
  pageSize: number = DEFAULT_PAGE_SIZE;
}
