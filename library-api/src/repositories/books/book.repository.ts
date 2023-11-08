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
  UpdateBookRepositoryInput,
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
      relations: { bookGenres: { genre: true }, author: true, comments: true },
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
      relations: { bookGenres: { genre: true }, author: true, comments: true },
    });

    if (!book) {
      throw new NotFoundException(`Book - '${id}'`);
    }
    return adaptBookEntityToBookModel(book);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getPlainById(id: BookId): Promise<PlainBookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true, comments: true },
    });

    if (!book) {
      throw new NotFoundException(`Book - '${id}'`);
    }
    return adaptBookEntityToPlainBookModel(book);
  }

  /**
   * Create a book
   * @param input Data for the book to be created
   * @returns Created book
   * @throws 404: Author or genre was not found
   * @throws 409: Book with this title and author already exists
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
          author: undefined,
          comments: undefined,
        }),
      );

      if (input.genres && input.genres.length > 0) {
        // Suppression des genres de livre pour éviter les doublons
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
          // eslint-disable-next-line prettier/prettier
          newGenres.map((genre) => manager.create<BookGenre>(BookGenre, {
                id: v4(),
                book: { id: book.id },
                genre,
              }),
            // eslint-disable-next-line function-paren-newline
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

  /**
   * Update a book data by its ID
   * @param id Book's ID
   * @param input Data for the update
   * @returns The updated book
   * @throws 404: Book with this ID was not found
   */
  public async updateById(
    id: BookId,
    input: UpdateBookRepositoryInput,
  ): Promise<PlainBookRepositoryOutput> {
    // Vérification que le livre existe déjà
    await this.getById(id);

    await this.dataSource.transaction(async (manager) => {
      if (input.genres) {
        // Suppression des genres de livre pour éviter les doublons
        await manager.delete<BookGenre>(BookGenre, { book: { id } });
        // Recherche des genres dans la base de données
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.genres),
          },
        });
        // Vérification que tous les genres ont été trouvés
        if (newGenres.length !== input.genres.length) {
          throw new NotFoundException(
            `Genre - '${input.genres.filter(
              (genre) => !newGenres.find((newGenre) => newGenre.name === genre),
            )}'`,
          );
        }

        // Création des relations entre le livre et les genres
        await manager.save<BookGenre>(
          // eslint-disable-next-line prettier/prettier
          newGenres.map((genre) => manager.create<BookGenre>(BookGenre, {
                id: v4(),
                book: { id },
                genre,
              }),
            // eslint-disable-next-line function-paren-newline
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
          throw new NotFoundException(
            `Author - '${input.author.firstName} ${input.author.lastName}'`,
          );
        }
        await manager.update<Book>(Book, { id }, { author });
      }
      const obj = {
        ...input,
        bookGenres: undefined,
        author: undefined,
        comments: undefined,
      };
      delete obj.genres;
      // update si au moins une propriété de l'objet est définie
      if (Object.values(obj).some((value) => value !== undefined)) {
        await manager.update<Book>(Book, { id }, obj);
      }
    });

    return this.getPlainById(id);
  }

  /**
   * Delete a book by its ID
   * @param id Book's ID
   * @throws 404: Book with this ID was not found
   */
  public async deleteById(id: BookId): Promise<void> {
    const book = await this.getById(id);
    await this.delete(book.id);
  }
}
