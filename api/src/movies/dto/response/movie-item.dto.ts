import { Expose } from 'class-transformer';

export class MovieItemDto {
  @Expose() id!: number;
  @Expose() title!: string;
  @Expose() posterUrl!: string | null;
  @Expose() releaseYear!: number;
}
