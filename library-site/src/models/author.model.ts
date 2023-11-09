import { PlainBookModel } from './book.model';

export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  books: PlainBookModel[];
};
