import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Author,
  Book,
  BookGenre,
  BookId,
  Genre,
} from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
  CreateBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository, In } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });
    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundException(`Book - '${id}'`);
    }
    return adaptBookEntityToBookModel(book);
  }

  public async getPlainById(id: BookId): Promise<PlainBookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundException(`Book - '${id}'`);
    }
    return adaptBookEntityToPlainBookModel(book);
  }

  /**
   * Create a book
   * @returns Created book
   */
  public async createBook(
    input: CreateBookRepositoryInput,
  ): Promise<PlainBookRepositoryOutput> {
    const existingBook = await this.findOne({
      where: {
        name: input.name,
        writtenOn: input.writtenOn,
      },
      relations: { author: true },
    });

    // Vérification que le livre n'existe pas déjà
    if (existingBook) {
      if (input.author.firstName === existingBook.author.firstName) {
        if (input.author.lastName === existingBook.author.lastName) {
          throw new ConflictException(
            `Book - '${input.name}' by '${input.author.firstName} ${input.author.lastName}' already exists`,
          );
        }
      }
    }

    const id = await this.dataSource.transaction(async (manager) => {
      const book = await manager.save<Book>(
        manager.create<Book>(Book, {
          ...input,
          id: v4(),
          bookGenres: undefined, // Réinitialisation des genres de livre
        }),
      );

      if (input.genres && input.genres.length > 0) {
        await manager.delete<BookGenre>(BookGenre, { book: { id: book.id } });
        // Recherche des genres dans la base de données
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.genres),
          },
        });
        // Vérification que tous les genres ont été trouvés
        if (newGenres.length !== input.genres.length) {
          await manager.delete<Book>(Book, { id: book.id });
          throw new NotFoundException(
            `Genre - '${input.genres.filter(
              (genre) => !newGenres.find((newGenre) => newGenre.name === genre),
            )}'`,
          );
        }

        // Création des relations entre le livre et les genres
        await manager.save<BookGenre>(
          newGenres.map((genre) =>
            manager.create<BookGenre>(BookGenre, {
              id: v4(),
              book: { id: book.id },
              genre,
            }),
          ),
        );
      }

      if (input.author) {
        const author = await manager.findOne<Author>(Author, {
          where: {
            firstName: input.author.firstName,
            lastName: input.author.lastName,
          },
        });
        if (!author) {
          await manager.delete<Book>(Book, { id: book.id });
          throw new NotFoundException(
            `Author - '${input.author.firstName} ${input.author.lastName}'`,
          );
        }
        await manager.update<Book>(Book, { id: book.id }, { author });
      }
      return book.id;
    });

    return this.getPlainById(id);
  }
}
