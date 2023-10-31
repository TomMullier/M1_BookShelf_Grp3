import { Injectable } from '@nestjs/common';
import { BookId } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
  CreateBookUseCasesInput,
  UpdateBookUseCasesInput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a book, need an already existing author and genre
   * @param input Data for the book to be created
   * @returns Created book
   * @throws 404: Author or genre was not found
   * @throws 409: Book with this title and author already exists
   */
  public async createBook(
    input: CreateBookUseCasesInput,
  ): Promise<PlainBookUseCasesOutput> {
    return this.bookRepository.createBook(input);
  }

  /**
   * Update a book by its ID
   * @param id Book's ID
   * @param input Data for the update
   * @returns The updated book
   * @throws 404: Book with this ID was not found
   */
  public async updateById(
    id: BookId,
    input: UpdateBookUseCasesInput,
  ): Promise<PlainBookUseCasesOutput> {
    return this.bookRepository.updateById(id, input);
  }

  /**
   * Delete a book by its ID
   * @param id Book's ID
   * @throws 404: Book with this ID was not found
   */
  public async deleteById(id: BookId): Promise<void> {
    const book = await this.bookRepository.getById(id);
    await this.bookRepository.deleteById(book.id);
  }
}
