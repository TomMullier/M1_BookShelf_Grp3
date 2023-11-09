import { Injectable } from '@nestjs/common';
import { CommentId } from 'library-api/src/entities';
import { CommentRepository } from 'library-api/src/repositories/comments/comment.repository';
import {
  CommentUseCasesOutput,
  CreateCommentUseCasesInput,
  UpdateCommentUseCasesInput,
} from './comment.useCases.type';

@Injectable()
export class CommentUseCases {
  constructor(private readonly commentRepository: CommentRepository) {}

  /**
   * Get all plain comments
   * @returns Array of plain comments
   */
  public async getAllPlain(): Promise<CommentUseCasesOutput[]> {
    return this.commentRepository.getAllPlain();
  }

  /**
   * Get a comment by its ID
   * @param id Comment's ID
   * @returns Comment if found
   * @throws 404: comment with this ID was not found
   */
  public async getById(id: CommentId): Promise<CommentUseCasesOutput> {
    return this.commentRepository.getById(id);
  }

  /**
   * Create a comment, need an already existing book
   * @param input Data for the comment to be created
   * @returns Created comment
   * @throws 404: Book was not found
   * @throws 409: Comment with this userName already exists
   */
  public async createComment(
    input: CreateCommentUseCasesInput,
  ): Promise<CommentUseCasesOutput> {
    return this.commentRepository.createComment(input);
  }

  /**
   * Update a comment by its ID
   * @param id Comment's ID
   * @param input Data for the update
   * @returns The updated comment
   * @throws 404: Comment with this ID was not found
   */
  public async updateById(
    id: CommentId,
    input: UpdateCommentUseCasesInput,
  ): Promise<CommentUseCasesOutput> {
    return this.commentRepository.updateById(id, input);
  }

  /**
   * Delete a book by its ID
   * @param id Book's ID
   * @throws 404: Book with this ID was not found
   */
  public async deleteById(id: CommentId): Promise<void> {
    const comment = await this.commentRepository.getById(id);
    await this.commentRepository.deleteById(comment.id);
  }
}
