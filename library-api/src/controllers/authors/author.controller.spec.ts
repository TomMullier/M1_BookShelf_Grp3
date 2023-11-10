import { AuthorUseCases } from 'library-api/src/useCases';
import { authorFixture } from 'library-api/src/fixtures';
import { AuthorId } from 'library-api/src/entities';
import { AuthorController } from './author.controller';
import { CreateAuthorDto } from './author.dto';

describe('AuthorController', () => {
  const authorService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    createAuthor: jest.fn(),
    deleteById: jest.fn(),
  } as unknown as AuthorUseCases;

  const authorController = new AuthorController(authorService);

  describe('getAll', () => {
    it('should return a list of authors', async () => {
      const authors = [authorFixture(), authorFixture()];
      const getAllSpy = jest
        .spyOn(authorService, 'getAll')
        .mockResolvedValue(authors);

      const result = await authorController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual(authors);
    });
    it('should return an empty array if no authors are in DB', async () => {
      const getAllSpy = jest
        .spyOn(authorService, 'getAll')
        .mockResolvedValue([]);

      const result = await authorController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('getById', () => {
    it('should return the author if found', async () => {
      const author = authorFixture();
      const getByIdSpy = jest
        .spyOn(authorService, 'getById')
        .mockResolvedValue(author);

      const result = await authorController.getById(author.id);

      expect(getByIdSpy).toHaveBeenCalledWith(author.id);
      expect(result).toEqual(author);
    });
    it('should throw a 404 error if author is not found', async () => {
      const getByIdSpy = jest
        .spyOn(authorService, 'getById')
        .mockRejectedValue(new Error('Author not found'));

      await expect(
        authorController.getById('1' as AuthorId),
      ).rejects.toThrowError('Author not found');
      expect(getByIdSpy).toHaveBeenCalledWith('1');
    });
  });
  describe('createAuthor', () => {
    it('should create an author', async () => {
      const author = authorFixture();
      const createAuthorSpy = jest
        .spyOn(authorService, 'createAuthor')
        .mockResolvedValue(author);

      const result = await authorController.createAuthor(author);

      expect(createAuthorSpy).toHaveBeenCalledWith(author);
      expect(result).toEqual(author);
    });
    it('should throw a 404 error if author is not found', async () => {
      const author = authorFixture() as CreateAuthorDto;
      const createAuthorSpy = jest
        .spyOn(authorService, 'createAuthor')
        .mockRejectedValue(new Error('Author not found'));

      await expect(authorController.createAuthor(author)).rejects.toThrowError(
        'Author not found',
      );
      expect(createAuthorSpy).toHaveBeenCalledWith(author);
    });
    it('should throw a 409 error if author already exists', async () => {
      const author = authorFixture() as CreateAuthorDto;
      const createAuthorSpy = jest
        .spyOn(authorService, 'createAuthor')
        .mockRejectedValue(new Error('Author already exists'));

      await expect(authorController.createAuthor(author)).rejects.toThrowError(
        'Author already exists',
      );
      expect(createAuthorSpy).toHaveBeenCalledWith(author);
    });
  });
  describe('deleteById', () => {
    it('should delete an author if found', async () => {
      const author = authorFixture();
      const deleteByIdSpy = jest
        .spyOn(authorService, 'deleteById')
        .mockResolvedValue();

      await authorController.deleteById(author.id);

      expect(deleteByIdSpy).toHaveBeenCalledWith(author.id);
    });
    it('should throw a 404 error if author is not found', async () => {
      const deleteByIdSpy = jest
        .spyOn(authorService, 'deleteById')
        .mockRejectedValue(new Error('Author not found'));

      await expect(
        authorController.deleteById('1' as AuthorId),
      ).rejects.toThrowError('Author not found');
      expect(deleteByIdSpy).toHaveBeenCalledWith('1');
    });
  });
});
