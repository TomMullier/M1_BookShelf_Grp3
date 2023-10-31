import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto, UpdateBookDto } from './books.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);
    return BookPresenter.from(book);
  }

  @Post('/')
  public async createBook(
    @Body() input: CreateBookDto,
  ): Promise<PlainBookPresenter> {
    const book = await this.bookUseCases.createBook(input);

    return PlainBookPresenter.from(book);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: BookId,
    @Body() input: UpdateBookDto,
  ): Promise<PlainBookPresenter> {
    const book = await this.bookUseCases.updateById(id, input);

    return PlainBookPresenter.from(book);
  }
}
