import { CommentUseCases } from 'library-api/src/useCases';
import { commentFixture } from 'library-api/src/fixtures';
import { CommentId } from 'library-api/src/entities';
import { CommentController } from './comment.controller';
import { CreateCommentDto } from './comment.dto';

describe('CommentController', () => {
  const commentService = {
    getAllPlain: jest.fn(),
    getById: jest.fn(),
    createComment: jest.fn(),
    deleteById: jest.fn(),
  } as unknown as CommentUseCases;

  const commentController = new CommentController(commentService);

  describe('getAll', () => {
    it('should return a list of comments', async () => {
      const comments = [commentFixture(), commentFixture()];
      const getAllSpy = jest
        .spyOn(commentService, 'getAllPlain')
        .mockResolvedValue(comments);

      const result = await commentController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual(comments);
    });
    it('should return an empty array if no comments are in DB', async () => {
      const getAllSpy = jest
        .spyOn(commentService, 'getAllPlain')
        .mockResolvedValue([]);

      const result = await commentController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('getById', () => {
    it('should return the comment if found', async () => {
      const comment = commentFixture();
      const getByIdSpy = jest
        .spyOn(commentService, 'getById')
        .mockResolvedValue(comment);

      const result = await commentController.getById(comment.id);

      expect(getByIdSpy).toHaveBeenCalledWith(comment.id);
      expect(result).toEqual(comment);
    });
    it('should throw a 404 error if comment is not found', async () => {
      const getByIdSpy = jest
        .spyOn(commentService, 'getById')
        .mockRejectedValue(new Error('Comment not found'));

      await expect(
        commentController.getById('1' as CommentId),
      ).rejects.toThrowError('Comment not found');
      expect(getByIdSpy).toHaveBeenCalledWith('1');
    });
  });
  describe('createComment', () => {
    it('should return the created comment', async () => {
      const comment = commentFixture();
      const createCommentSpy = jest
        .spyOn(commentService, 'createComment')
        .mockResolvedValue(comment);

      const result = await commentController.createComment(
        comment as unknown as CreateCommentDto,
      );

      expect(createCommentSpy).toHaveBeenCalledWith(comment);
      expect(result).toEqual(comment);
    });
  });
  describe('deleteById', () => {
    it('should delete the comment', async () => {
      const comment = commentFixture();
      const deleteByIdSpy = jest
        .spyOn(commentService, 'deleteById')
        .mockResolvedValue();

      await commentController.deleteById(comment.id);
      expect(deleteByIdSpy).toHaveBeenCalledWith(comment.id);
    });
    it('should throw a 404 error if comment is not found', async () => {
      const deleteByIdSpy = jest
        .spyOn(commentService, 'deleteById')
        .mockRejectedValue(new Error('Comment not found'));

      await expect(
        commentController.deleteById('1' as CommentId),
      ).rejects.toThrowError('Comment not found');
      expect(deleteByIdSpy).toHaveBeenCalledWith('1');
    });
  });
});
