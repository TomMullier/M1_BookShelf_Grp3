import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Genre, GenreId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import {
  CreateGenreRepositoryInput,
  GenreRepositoryOutput,
} from './genre.repository.type';

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

  /**
   * Get a genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */
  public async getById(id: GenreId): Promise<GenreRepositoryOutput> {
    const genre = await this.findOne({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException(`Book - '${id}'`);
    }
    return genre;
  }

  /**
   * Create a genre
   * @param input Data for the genre to be created
   * @returns Created genre
   * @throws 409: Genre with this name already exists
   */
  public async createGenre(
    input: CreateGenreRepositoryInput,
  ): Promise<GenreRepositoryOutput> {
    const existingGenre = await this.findOne({
      where: {
        name: input.name,
      },
    });

    // Vérification que le genre n'existe pas déjà
    if (existingGenre) {
      throw new ConflictException(`Genre - '${input.name}' already exists`);
    }

    const id = await this.dataSource.transaction(async (manager) => {
      const genre = await manager.save<Genre>(
        manager.create<Genre>(Genre, {
          ...input,
          id: v4(),
        }),
      );
      return genre.id;
    });

    return this.getById(id);
  }

  /**
   * Delete a genre by its ID
   * @param id Genre's ID
   * @throws 404: Genre with this ID was not found
   */
  public async deleteById(id: GenreId): Promise<void> {
    const genre = await this.getById(id);
    await this.delete(genre.id);
  }
}
