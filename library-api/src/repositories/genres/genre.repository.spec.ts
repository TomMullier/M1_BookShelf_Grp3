import { genreFixture } from 'library-api/src/fixtures';
import { DataSource } from 'typeorm';
import { GenreRepository } from './genre.repository';

describe.skip('GenreRepository', () => {
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
        order: { identifier: 'ASC' },
      });

      expect(result).toStrictEqual(genres);
      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });

  describe('getById', () => {
    it('should return a specific genre', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new GenreRepository(dataSource);

      const genres = [genreFixture(), genreFixture(), genreFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(genres);

      const result = await repository.getAll();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        order: { identifier: 'ASC' },
      });

      expect(result).toStrictEqual(genres);
      expect(true).toBeTruthy();
      expect(null).toBeNull();
    });
  });
});
