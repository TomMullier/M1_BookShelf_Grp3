import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenrePresenter } from './genre.presenter';
import { CreateGenreDto } from './genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAll();

    return genres.map(GenrePresenter.from);
  }

  @Post('/')
  public async createBook(
    @Body() input: CreateGenreDto,
  ): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.createGenre(input);

    return GenrePresenter.from(genre);
  }
}
