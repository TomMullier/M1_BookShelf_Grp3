import { ApiProperty } from '@nestjs/swagger';
import { AuthorId, Book } from 'library-api/src/entities';
import {
  PlainAuthorModelForBook,
  PlainAuthorModel,
} from 'library-api/src/models';

export class PlainAuthorPresenterForBook {
  @ApiProperty({
    description: 'Author ID',
    example: '7b6bf72e-e42b-49e8-8f19-3c50dac38ede',
  })
  id: AuthorId;

  @ApiProperty({
    description: 'Author firstname',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Author lastname',
    example: 'Doe',
  })
  lastName: string;

  private constructor(data: PlainAuthorPresenterForBook) {
    Object.assign(this, data);
  }

  public static from(
    data: PlainAuthorModelForBook,
  ): PlainAuthorPresenterForBook {
    return new PlainAuthorPresenterForBook({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}

export class PlainAuthorPresenter {
  @ApiProperty({
    description: 'Author ID',
    example: '7b6bf72e-e42b-49e8-8f19-3c50dac38ede',
  })
  id: AuthorId;

  @ApiProperty({
    description: 'Author firstname',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Book name',
    example: 'John',
  })
  lastName: string;

  @ApiProperty({
    description: 'Author photo url',
    example: 'Doe-John',
  })
  photoUrl: string;

  @ApiProperty({
    description: 'Author books',
    example: [
      {
        id: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
        name: 'The Lord of the Rings',
        writtenOn: '1954-07-29T00:00:00.000Z',
        bookGenres: [
          {
            id: '1fccd092-226b-4e8a-b98c-3c5122bbc232',
            genre: {
              id: 'e97c1644-b935-4204-83aa-60874ac57efa',
              name: 'Comique',
            },
          },
        ],
      },
    ],
  })
  books: Book[];

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      books: data.books,
    });
  }
}
