import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { PlainBookPresenter } from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import {
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './books.dto';

@ApiTags('books')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get all books',
    type: PlainBookPresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get a book by its ID',
    type: PlainBookPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  public async getById(@Param('id') id: BookId): Promise<PlainBookPresenter> {
    const book = await this.bookUseCases.getById(id);
    return PlainBookPresenter.from(book);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Create a book',
    type: PlainBookPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Author or genre not found',
  })
  @ApiConflictResponse({
    description: 'Book already exists',
  })
  public async createBook(
    @Body() input: CreateBookDto,
  ): Promise<PlainBookPresenter> {
    const book = await this.bookUseCases.createBook(input);

    return PlainBookPresenter.from(book);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Book updated by its ID',
    type: PlainBookPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  public async updateById(
    @Param('id') id: BookId,
    @Body() input: UpdateBookDto,
  ): Promise<PlainBookPresenter> {
    const book = await this.bookUseCases.updateById(id, input);

    return PlainBookPresenter.from(book);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Book deleted by its ID',
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  public async deleteById(@Param('id') id: BookId): Promise<void> {
    await this.bookUseCases.deleteById(id);
  }
}
