import { Injectable } from '@nestjs/common';
import { Author } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { AuthorRepositoryOutput } from './author.repository.type';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all authors
   * @returns Array of all authors
   */
  public async getAllPlain(): Promise<AuthorRepositoryOutput[]> {
    const authors = await this.find({
      order: { lastName: 'ASC' },
      relations: { books: true },
    });
    return authors;
  }
}
