import { GenreItemDto } from './genre-item.dto';

export class GenreResponseDto {
  data!: GenreItemDto[];
  totalGenres!: number;
}
