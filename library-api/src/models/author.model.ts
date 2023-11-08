import { AuthorId, Book } from 'library-api/src/entities';

export type PlainAuthorModelForBook = {
  id: AuthorId;
  firstName: string;
  lastName: string;
};

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  books?: Book[];
};
