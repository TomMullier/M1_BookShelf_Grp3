import { Book, BookId, CommentId } from 'library-api/src/entities';
import { CommentModel, PlainCommentModel } from 'library-api/src/models';

export class PlainCommentPresenter {
  id: CommentId;

  user: string;

  comment: string;

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
  id: CommentId;

  user: string;

  comment: string;

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
