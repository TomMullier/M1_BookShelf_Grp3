import { GenreUseCases } from 'library-api/src/useCases';
import { genreFixture } from 'library-api/src/fixtures';
import { GenreId } from 'library-api/src/entities';
import { GenreController } from './genre.controller';

describe('GenreController', () => {
  const genreService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    createGenre: jest.fn(),
    deleteById: jest.fn(),
  } as unknown as GenreUseCases;

  const genreController = new GenreController(genreService);

  describe('getAll', () => {
    it('should return a list of genres', async () => {
      const genres = [genreFixture(), genreFixture()];
      const getAllSpy = jest
        .spyOn(genreService, 'getAll')
        .mockResolvedValue(genres);

      const result = await genreController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual(genres);
    });
    it('should return an empty array if no genres are in DB', async () => {
      const getAllSpy = jest
        .spyOn(genreService, 'getAll')
        .mockResolvedValue([]);

      const result = await genreController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('getById', () => {
    it('should return the genre if found', async () => {
      const genre = genreFixture();
      const getByIdSpy = jest
        .spyOn(genreService, 'getById')
        .mockResolvedValue(genre);

      const result = await genreController.getById(genre.id);

      expect(getByIdSpy).toHaveBeenCalledWith(genre.id);
      expect(result).toEqual(genre);
    });
    it('should throw a 404 error if genre is not found', async () => {
      const getByIdSpy = jest
        .spyOn(genreService, 'getById')
        .mockRejectedValue(new Error('Genre not found'));

      await expect(
        genreController.getById('1' as GenreId),
      ).rejects.toThrowError('Genre not found');
      expect(getByIdSpy).toHaveBeenCalledWith('1');
    });
  });
  describe('createGenre', () => {
    it('should return the created genre', async () => {
      const genre = genreFixture();
      const createGenreSpy = jest
        .spyOn(genreService, 'createGenre')
        .mockResolvedValue(genre);

      const result = await genreController.createGenre(genre);

      expect(createGenreSpy).toHaveBeenCalledWith(genre);
      expect(result).toEqual(genre);
    });
  });
  describe('deleteById', () => {
    it('should delete the genre', async () => {
      const genre = genreFixture();
      const deleteByIdSpy = jest
        .spyOn(genreService, 'deleteById')
        .mockResolvedValue();

      await genreController.deleteById(genre.id);

      expect(deleteByIdSpy).toHaveBeenCalledWith(genre.id);
    });
  });
});
