import { Book, BookId } from '../entities';
import { CommentId } from '../entities/Comment';

export type PlainCommentModel = {
  id: CommentId;
  user: string;
  comment: string;
  book?: BookId;
};

export type CommentModel = {
  id: CommentId;
  user: string;
  comment: string;
  book?: Book;
};
