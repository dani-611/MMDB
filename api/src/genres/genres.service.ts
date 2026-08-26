import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'db/entities/genre.entity';
import { Repository } from 'typeorm';
import { GenreItemDto } from './dto/response/genre-item.dto';
import { mapToDto } from '../../common/utils/mapper.util';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private readonly repo: Repository<Genre>,
  ) {}

  async findAll(): Promise<GenreItemDto[]> {
    const genres = await this.repo.find({
      select: { uuid: true, name: true },
      order: { name: 'ASC' },
    });
    const transformedGenres = mapToDto(GenreItemDto, genres);

    return transformedGenres;
  }
}
