import { GenreModel } from 'library-api/src/models';
import { CreateGenreRepositoryInput } from 'library-api/src/repositories/genres/genre.repository.type';

export type GenreUseCasesOutput = GenreModel;
export type CreateGenreUseCasesInput = CreateGenreRepositoryInput;
