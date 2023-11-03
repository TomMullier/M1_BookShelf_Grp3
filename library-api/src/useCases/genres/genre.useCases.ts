import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import {
  CreateGenreUseCasesInput,
  GenreUseCasesOutput,
} from './genre.useCases.type';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAll(): Promise<GenreUseCasesOutput[]> {
    return this.genreRepository.getAll();
  }

  /**
   * Create a genre
   * @param input Data for the genre to be created
   * @returns Created genre
   * @throws 409: Genre with this name already exists
   */
  public async createGenre(
    input: CreateGenreUseCasesInput,
  ): Promise<GenreUseCasesOutput> {
    return this.genreRepository.createGenre(input);
  }
}
