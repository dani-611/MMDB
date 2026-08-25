import { Expose } from 'class-transformer';

export class MovieItemDto {
  @Expose() uuid!: string;
  @Expose() title!: string;
  @Expose() posterUrl!: string | null;
  @Expose() releaseYear!: number;
}
