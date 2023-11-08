import { AuthorId } from 'library-api/src/entities';

export type PlainAuthorModel = {
  id?: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};
