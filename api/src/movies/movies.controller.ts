import {
  Controller,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviePaginationQueryDto } from './dto/request/movie-pagination-query.dto';
import { MovieDetailsResponseDto } from './dto/response/movie-details-response.dto';
import { PaginationResponseDto } from 'dto/response/pagination-response.dto';
import { MovieItemDto } from './dto/response/movie-item.dto';
import { PaginationQueryDto } from 'dto/request/pagination-query.dto';
import { UserReviewDto } from './dto/response/movie-details-response.dto';
import { ReviewsService } from './services/reviews.service';
import { SubmitInteractionDto } from './dto/request/submit-interaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface CustomJwtPayload {
  id?: number;
  sub?: number;
}

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Get()
  async findAll(
    @Query() query: MoviePaginationQueryDto,
  ): Promise<PaginationResponseDto<MovieItemDto>> {
    return await this.moviesService.findAll(query);
  }

  @Get(':uuid/reviews')
  async getReviews(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponseDto<UserReviewDto>> {
    return await this.reviewsService.getPaginatedReviews(uuid, query);
  }

  @Post(':uuid/interaction')
  @UseGuards(JwtAuthGuard)
  async saveInteraction(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Req() req: Record<string, any>,
    @Body() dto: SubmitInteractionDto,
  ): Promise<{ message: string }> {
    const user = req.user as { id: number };
    return await this.reviewsService.upsertInteraction(uuid, user.id, dto);
  }

  @Get(':uuid')
  async getDetails(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Req() req: Record<string, unknown>,
  ): Promise<MovieDetailsResponseDto> {
    const headers = req.headers as
      Record<string, string | undefined> | undefined;
    const authHeader = headers?.authorization;
    let userId: number | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const tokenParts = authHeader.split(' ');
        const jwtToken = tokenParts[1];

        if (jwtToken) {
          const tokenPayloadSegs = jwtToken.split('.');
          const payloadBase64String = tokenPayloadSegs[1];

          if (payloadBase64String) {
            const decodedPayload = JSON.parse(
              Buffer.from(payloadBase64String, 'base64').toString(),
            ) as unknown as CustomJwtPayload;

            userId = decodedPayload.id ?? decodedPayload.sub;
          }
        }
      } catch {
        // Fall back gracefully to public view if token processing throws
      }
    }

    return await this.moviesService.getMovieDetails(uuid, userId);
  }
}
