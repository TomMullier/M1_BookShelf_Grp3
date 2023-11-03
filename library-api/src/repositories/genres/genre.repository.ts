import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { GenreRepositoryOutput } from './genre.repository.type';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  /**
   * Get all genres
   * @returns Array of all genres
   */
  public async getAll(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find({
      order: { name: 'ASC' },
    });
    return genres;
  }
}
