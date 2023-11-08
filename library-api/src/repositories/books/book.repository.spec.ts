import { DataSource, EntityManager, In } from 'typeorm';
import {
  authorFixture,
  bookFixture,
  genreFixture,
} from 'library-api/src/fixtures/';
import {
  adaptBookEntityToPlainBookModel,
  adaptBookEntityToBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { BookRepository } from 'library-api/src/repositories/books/book.repository';
import { NotFoundException, ConflictException } from '@nestjs/common';
import {
  Author,
  Book,
  BookGenre,
  BookId,
  Genre,
} from 'library-api/src/entities';
import { v4 } from 'uuid';
import { CreateBookRepositoryInput } from 'library-api/src/repositories/books/book.repository.type';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import exp from 'constants';

describe('BookRepository', () => {
  describe('getAllPlain', () => {
    it('should return all books', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const books = [bookFixture(), bookFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(books);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { bookGenres: { genre: true }, author: true },
      });

      expect(result).toStrictEqual(books.map(adaptBookEntityToPlainBookModel));
    });
    it('should return an empty array, if no books are stored', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const books = [];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(books);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { bookGenres: { genre: true }, author: true },
      });

      expect(result).toStrictEqual(books);
    });
  });

  describe('getById', () => {
    it('should return a book, if a good ID is provided', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const book = bookFixture();

      const findSpy = jest.spyOn(repository, 'findOne').mockResolvedValue(book);

      const result = await repository.getById(book.id);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id: book.id },
        relations: { bookGenres: { genre: true }, author: true },
      });
      expect(result).toStrictEqual(adaptBookEntityToBookModel(book));
    });

    it('should throw a NotFoundException, if a wrong ID is provided', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const id: BookId = v4();

      const findSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(repository.getById(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id },
        relations: { bookGenres: { genre: true }, author: true },
      });
    });
  });

  describe('getPlainById', () => {
    it('should return a book, if a good ID is provided', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const book = bookFixture();

      const findSpy = jest.spyOn(repository, 'findOne').mockResolvedValue(book);

      const result = await repository.getPlainById(book.id);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id: book.id },
        relations: { bookGenres: { genre: true }, author: true },
      });
      expect(result).toStrictEqual(adaptBookEntityToPlainBookModel(book));
    });

    it('should throw a NotFoundException, if a wrong ID is provided', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const id: BookId = v4();

      const findSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(repository.getPlainById(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id },
        relations: { bookGenres: { genre: true }, author: true },
      });
    });
  });

  describe('createBook', () => {
    it('should create a book and return the created book', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const author = authorFixture();
      const genre = genreFixture();
      const input: CreateBookRepositoryInput = {
        name: bookFixture().name,
        writtenOn: bookFixture().writtenOn,
        author: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
        genres: [genre.name],
      };

      const id = v4();
      const mockPlainBookModel: PlainBookModel = {
        id,
        name: input.name,
        writtenOn: input.writtenOn,
        author,
        genres: [genre.name],
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(id)
        .mockImplementation(transactionFn);

      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([{ ...input, id, bookGenres: undefined }]);

      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue({ ...input, id, bookGenres: undefined });

      const deleteSpy = jest
        .spyOn(dataSource.manager, 'delete')
        .mockResolvedValue(undefined);

      const findSpy = jest
        .spyOn(dataSource.manager, 'find')
        .mockResolvedValue([genre]);

      const getPlainByIdSpy = jest
        .spyOn(repository, 'getPlainById')
        .mockResolvedValue(mockPlainBookModel);

      // Mocks for finding an author and a genre
      const authorMock: Promise<Author> = Promise.resolve(author);
      const genreMock: Promise<Genre[]> = Promise.resolve([genre]);
      jest.spyOn(dataSource.manager, 'find').mockReturnValue(genreMock);
      jest.spyOn(dataSource.manager, 'findOne').mockReturnValue(authorMock);

      const finalPlainBookModel = await repository.createBook(input);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          name: input.name,
          writtenOn: input.writtenOn,
        },
        relations: { author: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
      expect(createSpy).toHaveBeenCalledTimes(1 + input.genres.length);

      expect(saveSpy).toHaveBeenCalledTimes(1 + input.genres.length);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(Genre, {
        where: {
          name: In(input.genres),
        },
      });

      expect(getPlainByIdSpy).toHaveBeenCalledTimes(1);
      expect(getPlainByIdSpy).toHaveBeenCalledWith(id);

      expect(finalPlainBookModel).toStrictEqual(mockPlainBookModel);
    });

    it('should throw a ConflictException, if a book with the same name and author already exists', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();
      const input: CreateBookRepositoryInput = {
        name: existingBook.name,
        writtenOn: existingBook.writtenOn,
        author: {
          firstName: existingBook.author.firstName,
          lastName: existingBook.author.lastName,
        },
        genres: [existingBook.bookGenres[0].genre.name],
      };

      const mockPlainBookModel: PlainBookModel = {
        id: existingBook.id,
        name: input.name,
        writtenOn: input.writtenOn,
        author: existingBook.author,
        genres: [existingBook.bookGenres[0].genre.name],
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(existingBook);

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(existingBook.id)
        .mockImplementation(transactionFn);

      const getPlainByIdSpy = jest
        .spyOn(repository, 'getPlainById')
        .mockResolvedValue(mockPlainBookModel);

      // Mocks for finding an author and a genre
      const authorMock: Promise<Author> = Promise.resolve(existingBook.author);
      const genreMock: Promise<Genre[]> = Promise.resolve([
        existingBook.bookGenres[0].genre,
      ]);
      jest.spyOn(dataSource.manager, 'find').mockReturnValue(genreMock);
      jest.spyOn(dataSource.manager, 'findOne').mockReturnValue(authorMock);

      await expect(repository.createBook(input)).rejects.toThrowError(
        ConflictException,
      );

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          name: input.name,
          writtenOn: input.writtenOn,
        },
        relations: { author: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(0);
      expect(getPlainByIdSpy).toHaveBeenCalledTimes(0);
    });
    it('should throw a NotFoundException, if the author is not found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const author = authorFixture();
      const genre = genreFixture();
      const input: CreateBookRepositoryInput = {
        name: bookFixture().name,
        writtenOn: bookFixture().writtenOn,
        author: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
        genres: [genre.name],
      };

      const id = v4();
      const mockPlainBookModel: PlainBookModel = {
        id,
        name: input.name,
        writtenOn: input.writtenOn,
        author,
        genres: [genre.name],
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(id)
        .mockImplementation(transactionFn);

      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([{ ...input, id, bookGenres: undefined }]);

      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue({ ...input, id, bookGenres: undefined });

      const deleteSpy = jest
        .spyOn(dataSource.manager, 'delete')
        .mockResolvedValue(undefined);

      const findSpy = jest
        .spyOn(dataSource.manager, 'find')
        .mockResolvedValue([genre]);

      const getPlainByIdSpy = jest
        .spyOn(repository, 'getPlainById')
        .mockResolvedValue(mockPlainBookModel);

      // Mocks for finding an author and a genre
      const authorMock: Promise<Author> = Promise.resolve(undefined);
      const genreMock: Promise<Genre[]> = Promise.resolve([genre]);
      jest.spyOn(dataSource.manager, 'find').mockReturnValue(genreMock);
      jest.spyOn(dataSource.manager, 'findOne').mockReturnValue(authorMock);

      await expect(repository.createBook(input)).rejects.toThrowError(
        NotFoundException,
      );

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          name: input.name,
          writtenOn: input.writtenOn,
        },
        relations: { author: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(0);
      expect(deleteSpy).toHaveBeenCalledTimes(0);
      expect(findSpy).toHaveBeenCalledTimes(0);
      expect(getPlainByIdSpy).toHaveBeenCalledTimes(0);
    });
    it('should throw a NotFoundException, if the genre is not found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const author = authorFixture();
      const genre = genreFixture();
      const input: CreateBookRepositoryInput = {
        name: bookFixture().name,
        writtenOn: bookFixture().writtenOn,
        author: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
        genres: [genre.name],
      };

      const id = v4();
      const mockPlainBookModel: PlainBookModel = {
        id,
        name: input.name,
        writtenOn: input.writtenOn,
        author,
        genres: [genre.name],
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(id)
        .mockImplementation(transactionFn);

      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([{ ...input, id, bookGenres: undefined }]);

      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue({ ...input, id, bookGenres: undefined });

      const deleteSpy = jest
        .spyOn(dataSource.manager, 'delete')
        .mockResolvedValue(undefined);

      const findSpy = jest
        .spyOn(dataSource.manager, 'find')
        .mockResolvedValue([genre]);

      const getPlainByIdSpy = jest
        .spyOn(repository, 'getPlainById')
        .mockResolvedValue(mockPlainBookModel);

      // Mocks for finding an author and a genre
      const authorMock: Promise<Author> = Promise.resolve(author);
      const genreMock: Promise<Genre[]> = Promise.resolve([]);
      jest.spyOn(dataSource.manager, 'find').mockReturnValue(genreMock);
      jest.spyOn(dataSource.manager, 'findOne').mockReturnValue(authorMock);

      await expect(repository.createBook(input)).rejects.toThrowError(
        NotFoundException,
      );

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          name: input.name,
          writtenOn: input.writtenOn,
        },
        relations: { author: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(getPlainByIdSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('updateBook', () => {
    it('should update a book and return the updated book', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();
      const mockExistingBook = adaptBookEntityToBookModel(existingBook);

      const input: CreateBookRepositoryInput = {
        name: existingBook.name,
        writtenOn: existingBook.writtenOn,
        author: {
          firstName: existingBook.author.firstName,
          lastName: existingBook.author.lastName,
        },
        genres: [existingBook.bookGenres[0].genre.name],
      };

      const mockPlainBookModel: PlainBookModel = {
        id: existingBook.id,
        name: input.name,
        writtenOn: input.writtenOn,
        author: existingBook.author,
        genres: [existingBook.bookGenres[0].genre.name],
      };

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(mockExistingBook);

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(existingBook.id)
        .mockImplementation(transactionFn);

      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue({ ...input, id: existingBook.id });

      const deleteSpy = jest.spyOn(dataSource.manager, 'delete');

      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([{ ...input, id: existingBook.id }]);

      const findSpy = jest
        .spyOn(dataSource.manager, 'find')
        .mockResolvedValue([existingBook.bookGenres[0].genre]);

      const findOneSpy = jest
        .spyOn(dataSource.manager, 'findOne')
        .mockResolvedValue(existingBook.author);

      const updateSpy = jest
        .spyOn(dataSource.manager, 'update')
        .mockResolvedValue(undefined);

      const getPlainByIdSpy = jest
        .spyOn(repository, 'getPlainById')
        .mockResolvedValue(mockPlainBookModel);

      // Mocks for finding an author and a genre
      const authorMock: Promise<Author> = Promise.resolve(existingBook.author);
      const genreMock: Promise<Genre[]> = Promise.resolve([
        existingBook.bookGenres[0].genre,
      ]);
      jest.spyOn(dataSource.manager, 'find').mockReturnValue(genreMock);
      jest.spyOn(dataSource.manager, 'findOne').mockReturnValue(authorMock);

      const finalPlainBookModel = await repository.updateById(
        existingBook.id,
        input,
      );

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith([
        [
          {
            ...input,
            id: existingBook.id,
          },
        ],
      ]);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(BookGenre, {
        book: { id: existingBook.id },
      });
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(BookGenre, {
        id: expect.any(String),
        book: { id: existingBook.id },
        genre: existingBook.bookGenres[0].genre,
      });
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(Genre, {
        where: {
          name: In(input.genres),
        },
      });
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(Author, {
        where: {
          firstName: input.author.firstName,
          lastName: input.author.lastName,
        },
      });
      expect(updateSpy).toHaveBeenCalledTimes(2);
      expect(updateSpy).toHaveBeenCalledWith(
        Book,
        { id: existingBook.id },
        {
          name: input.name,
          writtenOn: input.writtenOn,
        },
      );
      expect(getPlainByIdSpy).toHaveBeenCalledTimes(1);
      expect(getPlainByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(finalPlainBookModel).toStrictEqual(mockPlainBookModel);
    });
    it('should throw a NotFoundException, if the book is not found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        findOne: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();

      const input: CreateBookRepositoryInput = {
        name: existingBook.name,
        writtenOn: existingBook.writtenOn,
        author: {
          firstName: existingBook.author.firstName,
          lastName: existingBook.author.lastName,
        },
        genres: [existingBook.bookGenres[0].genre.name],
      };
      existingBook.id = 'wrong_id' as BookId;

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(undefined);

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(existingBook.id)
        .mockImplementation(transactionFn);

      await expect(
        repository.updateById(existingBook.id, input),
      ).rejects.toThrowError(NotFoundException);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(transactionSpy).toHaveBeenCalledTimes(0);
    });
    it('should throw a NotFoundException, if the author is not found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        findOne: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();

      const input: CreateBookRepositoryInput = {
        name: existingBook.name,
        writtenOn: existingBook.writtenOn,
        author: {
          firstName: existingBook.author.firstName,
          lastName: existingBook.author.lastName,
        },
        genres: [existingBook.bookGenres[0].genre.name],
      };

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(adaptBookEntityToBookModel(existingBook));

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(existingBook.id)
        .mockImplementation(transactionFn);

      const findOneSpy = jest
        .spyOn(dataSource.manager, 'findOne')
        .mockResolvedValue(undefined);

      const findSpy = jest
        .spyOn(dataSource.manager, 'find')
        .mockResolvedValue([existingBook.bookGenres[0].genre]);
      await expect(
        repository.updateById(existingBook.id, input),
      ).rejects.toThrowError(NotFoundException);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(Genre, {
        where: {
          name: In(input.genres),
        },
      });
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(Author, {
        where: {
          firstName: input.author.firstName,
          lastName: input.author.lastName,
        },
      });
    });
    it('should throw a NotFoundException, if the genre is not found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        findOne: jest.fn(),
        manager: {
          save: jest.fn(),
          create: jest.fn(),
          find: jest.fn(),
          findOne: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        } as unknown as EntityManager,
      } as unknown as DataSource;

      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();

      const input: CreateBookRepositoryInput = {
        name: existingBook.name,
        writtenOn: existingBook.writtenOn,
        author: {
          firstName: existingBook.author.firstName,
          lastName: existingBook.author.lastName,
        },
        genres: [existingBook.bookGenres[0].genre.name],
      };

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(adaptBookEntityToBookModel(existingBook));

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(existingBook.id)
        .mockImplementation(transactionFn);

      const findOneSpy = jest
        .spyOn(dataSource.manager, 'findOne')
        .mockResolvedValue(existingBook.author);

      const findSpy = jest
        .spyOn(dataSource.manager, 'find')
        .mockResolvedValue([]);

      await expect(
        repository.updateById(existingBook.id, input),
      ).rejects.toThrowError(NotFoundException);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(Genre, {
        where: {
          name: In(input.genres),
        },
      });
      expect(findOneSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('deleteById', () => {
    it('should delete a book and not return anything', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;

      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();
      const mockExistingBook = adaptBookEntityToBookModel(existingBook);

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(mockExistingBook);

      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(undefined);

      await expect(
        repository.deleteById(existingBook.id),
      ).resolves.not.toThrow();

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(existingBook.id);
    });
    it('should throw a NotFoundException, if the book is not found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;

      const repository = new BookRepository(dataSource);

      const existingBook: Book = bookFixture();

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(undefined);

      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(undefined);

      await expect(repository.deleteById(existingBook.id)).rejects.toThrowError(
        NotFoundException,
      );

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(existingBook.id);
      expect(deleteSpy).toHaveBeenCalledTimes(0);
    });
  });
});
