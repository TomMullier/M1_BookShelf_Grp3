import { commentFixture } from 'library-api/src/fixtures/comment.fixture';
import { DataSource } from 'typeorm';
import { Book, CommentId, Comment } from 'library-api/src/entities';
import { CommentRepository } from './comment.repository';

describe('CommentRepository', () => {
  describe('getAllPlain', () => {
    it('should return all comments', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new CommentRepository(dataSource);

      const comments = [commentFixture(), commentFixture(), commentFixture()];

      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(comments);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { user: 'ASC' },
        relations: { book: { author: true } },
      });
      expect(result).toStrictEqual(comments);
    });
    it('should return an empty array if no comments are found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new CommentRepository(dataSource);

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { user: 'ASC' },
        relations: { book: { author: true } },
      });
      expect(result).toStrictEqual([]);
    });
  });
  describe('getById', () => {
    it('should return a specific comment', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(comment);

      const result = await repository.getById(comment.id);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: comment.id },
        relations: { book: { author: true } },
      });
      expect(result).toStrictEqual(comment);
    });
    it('should throw a NotFoundException if no comment is found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new CommentRepository(dataSource);

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      const id = 'invalid id' as CommentId;
      await expect(repository.getById(id)).rejects.toThrowError(
        `Comment - '${id}'`,
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id },
        relations: { book: { author: true } },
      });
    });
  });
  describe('createComment', () => {
    it('should create a comment', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();
      const input = {
        user: comment.user,
        comment: comment.comment,
        date: comment.date,
        book: comment.book.id,
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);
      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(comment.id)
        .mockImplementation(transactionFn);
      const findOneBookSpy = jest
        .spyOn(dataSource.manager, 'findOne')
        .mockResolvedValue(comment.book);
      const saveSpy = jest
        .spyOn(dataSource.manager, 'save')
        .mockResolvedValue(comment);
      const createSpy = jest
        .spyOn(dataSource.manager, 'create')
        .mockReturnValue([comment]);
      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(comment);

      const result = await repository.createComment(input);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          user: comment.user,
          book: { id: input.book },
        },
        relations: { book: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
      expect(findOneBookSpy).toHaveBeenCalledTimes(1);
      expect(findOneBookSpy).toHaveBeenCalledWith(Book, {
        where: {
          id: comment.book.id,
        },
      });
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith([comment]);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(Comment, {
        ...input,
        id: expect.any(String),
        book: comment.book,
      });
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(comment.id);
      expect(result).toStrictEqual(comment);
    });
    it('should throw a ConflictException if a user has already commented this book', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();
      const input = {
        user: comment.user,
        comment: comment.comment,
        date: comment.date,
        book: comment.book.id,
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(comment);
      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(comment.id)
        .mockImplementation(transactionFn);

      await expect(repository.createComment(input)).rejects.toThrowError(
        `Comment - '${input.book}' from '${input.user}' already exists`,
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          user: comment.user,
          book: { id: input.book },
        },
        relations: { book: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(0);
    });
    it('should throw a NotFoundException if the book does not exist', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();
      const input = {
        user: comment.user,
        comment: comment.comment,
        date: comment.date,
        book: comment.book.id,
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);
      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(comment.id)
        .mockImplementation(transactionFn);
      const findOneBookSpy = jest
        .spyOn(dataSource.manager, 'findOne')
        .mockResolvedValue(undefined);

      await expect(repository.createComment(input)).rejects.toThrowError(
        `Book - '${input.book}'`,
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          user: comment.user,
          book: { id: input.book },
        },
        relations: { book: true },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
      expect(findOneBookSpy).toHaveBeenCalledTimes(1);
      expect(findOneBookSpy).toHaveBeenCalledWith(Book, {
        where: {
          id: comment.book.id,
        },
      });
    });
  });
  describe('updateById', () => {
    it('should update a comment', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();
      const input = {
        comment: comment.comment,
        date: comment.date,
        book: comment.book.id,
      };

      const findOneSpy = jest
        .spyOn(dataSource.manager, 'findOne')
        .mockResolvedValue(comment);
      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(comment.id)
        .mockImplementation(transactionFn);
      const updateSpy = jest
        .spyOn(dataSource.manager, 'update')
        .mockResolvedValue(undefined);
      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(comment);

      const result = await repository.updateById(comment.id, input);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(Book, {
        where: {
          id: input.book,
        },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(1);
      expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
      expect(updateSpy).toHaveBeenCalledTimes(2);
      expect(getByIdSpy).toHaveBeenCalledTimes(2);
      expect(getByIdSpy).toHaveBeenCalledWith(comment.id);
      expect(result).toStrictEqual(comment);
    });
    it('should throw a NotFoundException if no comment is found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        transaction: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
        },
      } as unknown as DataSource;
      const transactionFn = jest.fn().mockImplementation(async (callback) => {
        const result = await callback(dataSource.manager);
        return result;
      });
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();
      const input = {
        comment: comment.comment,
        date: comment.date,
        book: comment.book.id,
      };

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);
      const transactionSpy = jest
        .spyOn(dataSource, 'transaction')
        .mockResolvedValue(comment.id)
        .mockImplementation(transactionFn);

      await expect(
        repository.updateById(comment.id, input),
      ).rejects.toThrowError(`Comment - '${comment.id}'`);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: comment.id },
        relations: { book: { author: true } },
      });
      expect(transactionSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('deleteById', () => {
    it('should delete a comment', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
        delete: jest.fn(),
      } as unknown as DataSource;
      const repository = new CommentRepository(dataSource);

      const comment = commentFixture();
      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(comment);
      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(undefined);

      await repository.deleteById(comment.id);
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(comment.id);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(comment.id);
    });
    it('should throw a NotFoundException if no comment is found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new CommentRepository(dataSource);
      const getByIdSpy = jest
        .spyOn(repository, 'getById')
        .mockResolvedValue(undefined);
      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(undefined);

      const id = 'invalid id' as CommentId;

      await expect(repository.deleteById(id)).rejects.toThrowError(
        `Comment - '${id}'`,
      );
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(id);
      expect(deleteSpy).toHaveBeenCalledTimes(0);
    });
  });
});
