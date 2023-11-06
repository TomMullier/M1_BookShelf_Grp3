import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import {
  AuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
} from './author.repository.type';

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

  /**
   * Create an author
   * @param input Data for the author to be created
   * @returns Created author
   * @throws 409: Author with this name already exists
   */
  public async createAuthor(
    input: CreateAuthorRepositoryInput,
  ): Promise<AuthorRepositoryOutput> {
    const existingAuthor = await this.findOne({
      where: {
        lastName: input.lastName,
        firstName: input.firstName,
      },
    });

    // Vérification que le genre n'existe pas déjà
    if (existingAuthor) {
      throw new ConflictException(
        `Author - '${input.lastName}' '${input.firstName}' already exists`,
      );
    }
    const photoUrl = `${input.lastName}-${input.firstName}`;
    const id = await this.dataSource.transaction(async (manager) => {
      const author = await manager.save<Author>(
        manager.create<Author>(Author, {
          ...input,
          id: v4(),
          photoUrl,
        }),
      );
      return author.id;
    });

    return this.getById(id);
  }

  /**
   * Delete an author by its ID
   * @param id Author's ID
   * @throws 404: Author with this ID was not found
   */
  public async deleteById(id: AuthorId): Promise<void> {
    const author = await this.getById(id);
    await this.delete(author.id);
  }
}
