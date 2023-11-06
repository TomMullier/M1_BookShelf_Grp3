import { PlainAuthorModel } from 'library-api/src/models';

export type AuthorRepositoryOutput = PlainAuthorModel;
export type CreateAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;
