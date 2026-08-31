import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreItemDto } from './dto/response/genre-item.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(): Promise<GenreItemDto[]> {
    return this.genresService.findAll();
  }
}
