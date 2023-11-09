import { genreFixture } from 'library-api/src/fixtures';
import { DataSource } from 'typeorm';
import { Genre, GenreId } from 'library-api/src/entities';
import { GenreRepository } from './genre.repository';

describe.only('GenreRepository', () => {
  describe('getAll', () => {
    it('should return all genres', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new GenreRepository(dataSource);

      const genres = [genreFixture(), genreFixture(), genreFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(genres);

      const result = await repository.getAll();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { name: 'ASC' },
      });
      expect(result).toStrictEqual(genres);
    });
    it('should return an empty array if no genres are found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new GenreRepository(dataSource);

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await repository.getAll();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { name: 'ASC' },
      });
      expect(result).toStrictEqual([]);
    });
  });

  describe('getById', () => {
    it('should return a specific genre', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new GenreRepository(dataSource);

      const genre = genreFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(genre);

      const result = await repository.getById(genre.id);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: genre.id },
      });
      expect(result).toStrictEqual(genre);
    });
    it('should throw a NotFoundException if no genre is found', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new GenreRepository(dataSource);

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(undefined);

      const id = 'invalid-id' as GenreId;

      await expect(repository.getById(id)).rejects.toThrowError(
        `Genre - '${id}'`,
      );
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id },
      });
    });
    describe('createGenre', () => {
      it('should create a genre', async () => {
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
        const repository = new GenreRepository(dataSource);

        const genre = genreFixture();
        const input = {
          name: genre.name,
        };

        const transactionSpy = jest
          .spyOn(dataSource, 'transaction')
          .mockResolvedValue(genre.id)
          .mockImplementation(transactionFn);

        const findOneSpy = jest
          .spyOn(repository, 'findOne')
          .mockResolvedValue(undefined);

        const getByIdSpy = jest
          .spyOn(repository, 'getById')
          .mockResolvedValue(genre);

        const saveSpy = jest
          .spyOn(dataSource.manager, 'save')
          .mockResolvedValue(genre);

        const createSpy = jest
          .spyOn(dataSource.manager, 'create')
          .mockReturnValue([genre]);

        const result = await repository.createGenre(input);

        expect(transactionSpy).toHaveBeenCalledTimes(1);
        expect(transactionSpy).toHaveBeenCalledWith(expect.any(Function));
        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: {
            name: input.name,
          },
        });
        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(createSpy).toHaveBeenCalledWith(Genre, {
          ...input,
          id: expect.any(String),
        });
        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(saveSpy).toHaveBeenCalledWith([genre]);
        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(genre.id);
        expect(result).toStrictEqual({
          ...input,
          id: expect.any(String),
        });
      });
      it('should throw a ConflictException if the genre already exists', async () => {
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
        const repository = new GenreRepository(dataSource);

        const genre = genreFixture();
        const input = {
          name: genre.name,
        };

        const transactionSpy = jest
          .spyOn(dataSource, 'transaction')
          .mockResolvedValue(genre.id)
          .mockImplementation(transactionFn);

        const findOneSpy = jest
          .spyOn(repository, 'findOne')
          .mockResolvedValue(genre);

        const getByIdSpy = jest
          .spyOn(repository, 'getById')
          .mockResolvedValue(genre);

        const saveSpy = jest
          .spyOn(dataSource.manager, 'save')
          .mockResolvedValue(genre);

        const createSpy = jest
          .spyOn(dataSource.manager, 'create')
          .mockReturnValue([genre]);

        await expect(repository.createGenre(input)).rejects.toThrowError(
          `Genre - '${input.name}' already exists`,
        );

        expect(transactionSpy).toHaveBeenCalledTimes(0);
        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: {
            name: input.name,
          },
        });
        expect(createSpy).toHaveBeenCalledTimes(0);
        expect(saveSpy).toHaveBeenCalledTimes(0);
        expect(getByIdSpy).toHaveBeenCalledTimes(0);
      });
    });
    describe('deleteById', () => {
      it('should delete a genre', async () => {
        const dataSource = {
          createEntityManager: jest.fn(),
        } as unknown as DataSource;
        const repository = new GenreRepository(dataSource);

        const genre = genreFixture();

        const getByIdSpy = jest
          .spyOn(repository, 'getById')
          .mockResolvedValue(genre);

        const deleteSpy = jest
          .spyOn(repository, 'delete')
          .mockResolvedValue(undefined);

        await repository.deleteById(genre.id);

        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(genre.id);
        expect(deleteSpy).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith(genre.id);
      });
      it('should throw a NotFoundException if no genre is found', async () => {
        const dataSource = {
          createEntityManager: jest.fn(),
        } as unknown as DataSource;
        const repository = new GenreRepository(dataSource);

        const genre = genreFixture();

        const getByIdSpy = jest
          .spyOn(repository, 'getById')
          .mockResolvedValue(undefined);

        const deleteSpy = jest
          .spyOn(repository, 'delete')
          .mockResolvedValue(undefined);

        await expect(repository.deleteById(genre.id)).rejects.toThrowError(
          `Genre - '${genre.id}'`,
        );

        expect(getByIdSpy).toHaveBeenCalledTimes(1);
        expect(getByIdSpy).toHaveBeenCalledWith(genre.id);
        expect(deleteSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
