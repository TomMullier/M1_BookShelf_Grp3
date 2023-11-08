import { ApiProperty } from '@nestjs/swagger';
import { Book, BookId, CommentId } from 'library-api/src/entities';
import { CommentModel, PlainCommentModel } from 'library-api/src/models';

export class PlainCommentPresenter {
  @ApiProperty({
    description: 'Comment ID',
    example: '0d3e2940-cd5b-4dce-b80b-d94c48d5ebdc',
  })
  id: CommentId;

  @ApiProperty({
    description: 'User who writes the comment',
    example: 'Albert',
  })
  user: string;

  @ApiProperty({
    description: 'Comment',
    example: 'Super !',
  })
  comment: string;

  @ApiProperty({
    description: 'Book commented',
    example: '7b6bf72e-e42b-49e8-8f19-3c50dac38ede',
  })
  book: BookId;

  private constructor(data: PlainCommentPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainCommentModel): PlainCommentPresenter {
    return new PlainCommentPresenter({
      id: data.id,
      user: data.user,
      comment: data.comment,
      book: data.book,
    });
  }
}

export class CommentPresenter {
  @ApiProperty({
    description: 'Comment ID',
    example: '0d3e2940-cd5b-4dce-b80b-d94c48d5ebdc',
  })
  id: CommentId;

  @ApiProperty({
    description: 'User who writes the comment',
    example: 'Albert',
  })
  user: string;

  @ApiProperty({
    description: 'Comment',
    example: 'Super !',
  })
  comment: string;

  @ApiProperty({
    description: 'Book commented',
    type: Object,
    example: {
      id: '93809316-da66-4a0b-a886-4411bb43d90a',
      name: 'The perfect story',
      writtenOn: '2021-06-23T21:25:12.000Z',
      author: {
        id: '7b6bf72e-e42b-49e8-8f19-3c50dac38ede',
        firstName: 'John',
        lastName: 'Doe',
        photoUrl: 'Doe-John',
      },
    },
  })
  book: Book;

  private constructor(data: CommentPresenter) {
    Object.assign(this, data);
  }

  public static from(data: CommentModel): CommentPresenter {
    return new CommentPresenter({
      id: data.id,
      user: data.user,
      comment: data.comment,
      book: data.book,
    });
  }
}
