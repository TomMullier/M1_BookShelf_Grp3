import { Injectable } from '@nestjs/common';
import { GenreModel } from 'library-api/src/models';
import { GenreRepository } from 'library-api/src/repositories';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAll(): Promise<GenreModel[]> {
    return this.genreRepository.getAll();
  }
}
