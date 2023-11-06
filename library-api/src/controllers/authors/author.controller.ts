import { Controller, Get } from '@nestjs/common';
import { AuthorUseCases } from 'library-api/src/useCases';
import { PlainAuthorPresenter } from './author.presenter';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const genres = await this.authorUseCases.getAll();
    return genres.map(PlainAuthorPresenter.from);
  }
}
