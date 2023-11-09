import { CommentModel, PlainCommentModel } from 'library-api/src/models';

export type CommentRepositoryOutput = CommentModel;
export type CreateCommentRepositoryInput = Omit<PlainCommentModel, 'id'>;
export type UpdateCommentRepositoryInput = Partial<
  Omit<PlainCommentModel, 'id'>
>;
