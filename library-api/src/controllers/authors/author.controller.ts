import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorUseCases } from 'library-api/src/useCases';
import { AuthorId } from 'library-api/src/entities';
import {
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlainAuthorPresenter } from './author.presenter';
import { CreateAuthorDto } from './author.dto';

@ApiTags('authors')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get all authors',
    type: PlainAuthorPresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const author = await this.authorUseCases.getAll();
    return author.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get an author by its ID',
    type: PlainAuthorPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Author not found',
  })
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);
    return PlainAuthorPresenter.from(author);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Create an author',
    type: PlainAuthorPresenter,
  })
  @ApiConflictResponse({
    description: 'Author already exists',
  })
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.createAuthor(input);
    return PlainAuthorPresenter.from(author);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Author deleted by its ID',
  })
  @ApiNotFoundResponse({
    description: 'Author not found',
  })
  public async deleteById(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deleteById(id);
  }
}
