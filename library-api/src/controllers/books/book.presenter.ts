import { PlainAuthorPresenterForBook } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import { CommentPresenter } from '../comments/comment.presenter';

export class PlainBookPresenter {
  id: BookId;

  name: string;

  writtenOn: Date;

  author: PlainAuthorPresenterForBook;

  genres: string[];

  comments: CommentPresenter[];

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    // console.log(data);
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
  id: string;

  name: string;

  author: PlainAuthorPresenterForBook;

  writtenOn: Date;

  genres: GenrePresenter[];

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
