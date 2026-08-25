import { NumberField } from 'common/decorators/number-field.decorator';

export class PaginationQueryDto {
  @NumberField({ min: 1, optional: true })
  page?: number = 1;

  @NumberField({ min: 1, optional: true })
  pageSize?: number = 10;
}
