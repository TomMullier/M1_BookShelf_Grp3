import { CommentModel } from 'library-api/src/models';
import {
  CreateCommentRepositoryInput,
  UpdateCommentRepositoryInput,
} from 'library-api/src/repositories/comments/comment.repository.type';

export type CommentUseCasesOutput = CommentModel;
export type CreateCommentUseCasesInput = CreateCommentRepositoryInput;
export type UpdateCommentUseCasesInput = UpdateCommentRepositoryInput;
