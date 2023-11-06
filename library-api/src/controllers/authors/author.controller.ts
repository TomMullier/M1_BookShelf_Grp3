import { Controller, Get, Param } from '@nestjs/common';
import { AuthorUseCases } from 'library-api/src/useCases';
import { AuthorId } from 'library-api/src/entities';
import { PlainAuthorPresenter } from './author.presenter';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const genres = await this.authorUseCases.getAll();
    return genres.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const genre = await this.authorUseCases.getById(id);
    return PlainAuthorPresenter.from(genre);
  }
}
