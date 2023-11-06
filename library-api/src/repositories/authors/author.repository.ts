import { Injectable, NotFoundException } from '@nestjs/common';
import { Author, AuthorId } from 'library-api/src/entities';
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

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<AuthorRepositoryOutput> {
    const author = await this.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!author) {
      throw new NotFoundException(`Author - '${id}'`);
    }
    return author;
  }
}
