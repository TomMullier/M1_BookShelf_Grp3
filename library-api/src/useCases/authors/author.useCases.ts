import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import { AuthorId } from 'library-api/src/entities';
import {
  CreateAuthorUseCasesInput,
  PlainAuthorUseCasesOutput,
} from './author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all authors
   * @returns Array of authors
   */
  public async getAll(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  /**
   * Create an author
   * @param input Data for the author to be created
   * @returns Created author
   * @throws 409: Author with this name already exists
   */
  public async createAuthor(
    input: CreateAuthorUseCasesInput,
  ): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.createAuthor(input);
  }

  /**
   * Delete an author by its ID
   * @param id Author's ID
   * @throws 404: Author with this ID was not found
   */
  public async deleteById(id: AuthorId): Promise<void> {
    const book = await this.authorRepository.getById(id);
    await this.authorRepository.deleteById(book.id);
  }
}
