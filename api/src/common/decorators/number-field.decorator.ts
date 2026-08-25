import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

export interface NumberFieldOptions {
  optional?: boolean;
  min?: number;
  max?: number;
}

export function NumberField(options: NumberFieldOptions = {}) {
  const decorators = [Type(() => Number), IsInt()];

  if (options.optional !== false) {
    decorators.push(IsOptional());
  }

  if (options.min !== undefined) {
    decorators.push(Min(options.min));
  }

  if (options.max !== undefined) {
    decorators.push(Max(options.max));
  }

  return applyDecorators(...decorators);
}
