/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from 'class-transformer';

export class GenreItemDto {
  @Expose() uuid!: string;
  @Expose() name!: string;
}
