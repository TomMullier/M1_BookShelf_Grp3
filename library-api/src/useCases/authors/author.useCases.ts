import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import { PlainAuthorUseCasesOutput } from './author.useCases.type';

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
}
