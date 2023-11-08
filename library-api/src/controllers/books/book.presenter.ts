import { PlainAuthorPresenterForBook } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';
import { CommentPresenter } from '../comments/comment.presenter';

export class PlainBookPresenter {
  @ApiProperty({
    description: 'Book ID',
    example: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
  })
  id: BookId;

  @ApiProperty({
    description: 'Book name',
    example: 'The Lord of the Rings',
  })
  name: string;

  @ApiProperty({
    description: 'Book written on',
    example: '1954-07-29T00:00:00.000Z',
  })
  writtenOn: Date;

  @ApiProperty({
    description: 'Book author',
    example: {
      id: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
    },
  })
  author: PlainAuthorPresenterForBook;

  @ApiProperty({
    description: 'Book genres',
    example: ['Fantasy', 'Adventure'],
  })
  genres: string[];

  @ApiProperty({
    description: 'Book comments',
    example: [
      {
        id: '0d3e2940-cd5b-4dce-b80b-d94c48d5ebdc',
        user: 'Albert',
        comment: 'Super !',
      },
    ],
  })
  comments: CommentPresenter[];

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      genres: data.genres,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenterForBook.from(data.author),
      comments: data.comments.map(CommentPresenter.from),
    });
  }
}

export class BookPresenter {
  @ApiProperty({
    description: 'Book ID',
    example: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
  })
  id: string;

  @ApiProperty({
    description: 'Book name',
    example: 'The Lord of the Rings',
  })
  name: string;

  @ApiProperty({
    description: 'Book author',
    example: {
      id: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
    },
  })
  author: PlainAuthorPresenterForBook;

  @ApiProperty({
    description: 'Book written on',
    example: '1954-07-29T00:00:00.000Z',
  })
  writtenOn: Date;

  @ApiProperty({
    description: 'Book genres',
    example: [
      {
        id: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
        name: 'Fantasy',
      },
      {
        id: 'b9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
        name: 'Adventure',
      },
    ],
  })
  genres: GenrePresenter[];

  @ApiProperty({
    description: 'Book comments',
    example: [
      {
        id: '0d3e2940-cd5b-4dce-b80b-d94c48d5ebdc',
        user: 'Albert',
        comment: 'Super !',
      },
    ],
  })
  comments: CommentPresenter[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenterForBook.from(data.author),
      genres: data.genres.map(GenrePresenter.from),
      comments: data.comments.map(CommentPresenter.from),
    });
  }
}
