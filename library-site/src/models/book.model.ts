import { PlainCommentModel } from './comment.model';

export type PlainBookModel = {
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  id: string;
  name: string;
  genres: string[];
  writtenOn: string;
  comments: PlainCommentModel[];
};
