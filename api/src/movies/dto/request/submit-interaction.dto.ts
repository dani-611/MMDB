//needs work
import { IsOptional, IsString, Length } from 'class-validator';
import { NumberField } from '../../../common/decorators/number-field.decorator';

export class SubmitInteractionDto {
  @NumberField({ optional: true, min: 1, max: 10 })
  rating?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  body?: string;
}
