import { authorFixture } from 'library-api/src/fixtures';
import { DataSource } from 'typeorm';
import { Author, AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from './author.repository';

describe('AuthorRepository', () => {
  describe('getAllPlain', () => {
    it('should return all authors', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const authors = [authorFixture(), authorFixture(), authorFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(authors);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { lastName: 'ASC' },
        relations: {
          books: { bookGenres: { genre: true } },
        },
      });
      expect(result).toStrictEqual(authors);
    });
    it('should return an empty array if no authors are found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { lastName: 'ASC' },
        relations: {
          books: { bookGenres: { genre: true } },
        },
      });
      expect(result).toStrictEqual([]);
    });
  });
  describe('getById', () => {
    it('should return a specific author', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const author = authorFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(author);

      const result = await repository.getById(author.id);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: author.id },
        relations: { books: true },
      });
      expect(result).toStrictEqual(author);
    });
    it('should throw a NotFoundException if no author is found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      const id = 'invalid id' as AuthorId;

      await expect(repository.getById(id)).rejects.toThrowError(
        `Author - '${id}'`,
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id },
        relations: { books: true },
      });
    });
  });
  describe('createAuthor', () => {
    it('should create an author', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new AuthorRepository(dataSource);

      const author = authorFixture();
      const input = {
        firstName: author.firstName,
        lastName: author.lastName,
      };

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(author.id)
        .mockImplementationOnce(transactionFn);
      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([author]);
      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue(author);
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);
      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(author);

      const result = await repository.createAuthor(input);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          lastName: input.lastName,
          firstName: input.firstName,
        },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(Author, {
        ...input,
        id: expect.any(String),
        photoUrl: `${input.lastName}-${input.firstName}`,
      });
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith([author]);
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(author.id);
      expect(result).toStrictEqual(author);
    });
    it('should throw a ConflictException if an author with this name already exists', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new AuthorRepository(dataSource);

      const author = authorFixture();
      const input = {
        firstName: author.firstName,
        lastName: author.lastName,
      };

      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(author.id)
        .mockImplementationOnce(transactionFn);
      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([author]);
      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue(author);
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(author);

      await expect(repository.createAuthor(input)).rejects.toThrowError(
        `Author - '${input.lastName}' '${input.firstName}' already exists`,
      );

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          lastName: input.lastName,
          firstName: input.firstName,
        },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(0);
      expect(createSpy).toHaveBeenCalledTimes(0);
      expect(saveSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('deleteAuthor', () => {
    it('should delete an author', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const author = authorFixture();

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(author);
      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(undefined);

      await repository.deleteById(author.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(author.id);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(author.id);
    });
    it('should throw a NotFoundException if no author is found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const author = authorFixture();

      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(undefined);

      await expect(repository.deleteById(author.id)).rejects.toThrowError(
        `Author - '${author.id}'`,
      );
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(author.id);
    });
  });
});
