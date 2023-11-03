import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { GenreId } from 'library-api/src/entities';
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
   * Get a genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */
  public async getById(id: GenreId): Promise<GenreUseCasesOutput> {
    return this.genreRepository.getById(id);
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
