import { BookModel, PlainBookModel } from 'library-api/src/models';
import {
  CreateBookRepositoryInput,
  UpdateBookRepositoryInput,
} from 'library-api/src/repositories';

export type PlainBookUseCasesOutput = PlainBookModel;
export type BookUseCasesOutput = BookModel;
export type CreateBookUseCasesInput = CreateBookRepositoryInput;
export type UpdateBookUseCasesInput = UpdateBookRepositoryInput;
