import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorUseCases } from 'library-api/src/useCases';
import { AuthorId } from 'library-api/src/entities';
import { PlainAuthorPresenter } from './author.presenter';
import { CreateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const author = await this.authorUseCases.getAll();
    return author.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);
    return PlainAuthorPresenter.from(author);
  }

  @Post('/')
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.createAuthor(input);
    return PlainAuthorPresenter.from(author);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deleteById(id);
  }
}
