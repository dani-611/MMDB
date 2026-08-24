import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'db/entities/genre.entity';
import { Repository } from 'typeorm';
import { GenreItemDto } from './dto/response/genre-item.dto';
import { GenreResponseDto } from './dto/response/genre-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private readonly repo: Repository<Genre>,
  ) {}

  async findAll(): Promise<GenreResponseDto> {
    const [genres, total] = await this.repo.findAndCount({
      select: { uuid: true, name: true },
    });
    const transformedGenres = plainToInstance(GenreItemDto, genres, {
      excludeExtraneousValues: true,
    });

    return {
      data: transformedGenres,
      totalGenres: total,
    };
  }
}
