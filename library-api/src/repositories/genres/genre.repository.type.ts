import { GenreModel } from 'library-api/src/models';

export type GenreRepositoryOutput = GenreModel;
export type CreateGenreRepositoryInput = Omit<GenreModel, 'id'>;
