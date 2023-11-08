import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreId } from 'library-api/src/entities';
import {
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenrePresenter } from './genre.presenter';
import { CreateGenreDto } from './genre.dto';

@ApiTags('genres')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get all books',
    type: GenrePresenter,
    isArray: true,
  })
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAll();
    return genres.map(GenrePresenter.from);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get a genre by its ID',
    type: GenrePresenter,
  })
  @ApiNotFoundResponse({
    description: 'Genre not found',
  })
  public async getById(@Param('id') id: GenreId): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.getById(id);
    return GenrePresenter.from(genre);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Create a genre',
    type: GenrePresenter,
  })
  @ApiConflictResponse({
    description: 'Genre already exists',
  })
  public async createGenre(
    @Body() input: CreateGenreDto,
  ): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.createGenre(input);
    return GenrePresenter.from(genre);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Genre deleted by its ID',
  })
  @ApiNotFoundResponse({
    description: 'Genre not found',
  })
  public async deleteById(@Param('id') id: GenreId): Promise<void> {
    await this.genreUseCases.deleteById(id);
  }
}
