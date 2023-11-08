import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book, Comment, CommentId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import {
  CommentRepositoryOutput,
  CreateCommentRepositoryInput,
  UpdateCommentRepositoryInput,
} from './comment.repository.type';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(public readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  /**
   * Get all plain comments
   * @returns Array of plain comments
   */
  public async getAllPlain(): Promise<CommentRepositoryOutput[]> {
    const comments = await this.find({
      order: { user: 'ASC' },
      relations: { book: { author: true } },
    });
    return comments;
  }

  /**
   * Get a comment by its ID
   * @param id Comment's ID
   * @returns Comment if found
   * @throws 404: comment with this ID was not found
   */
  public async getById(id: CommentId): Promise<CommentRepositoryOutput> {
    const comment = await this.findOne({
      where: { id },
      relations: { book: { author: true } },
    });

    if (!comment) {
      throw new NotFoundException(`Comment - '${id}'`);
    }
    return comment;
  }

  /**
   * Create a comment
   * @param input Data for the comment to be created
   * @returns Created comment
   * @throws 409: User has already commented this book
   */
  public async createComment(
    input: CreateCommentRepositoryInput,
  ): Promise<CommentRepositoryOutput> {
    const existingComment = await this.findOne({
      where: {
        user: input.user,
      },
      relations: { book: true },
    });

    // Vérification que le commentaire n'existe pas déjà
    if (existingComment) {
      throw new ConflictException(
        `Comment - '${input.book}' from '${input.user}' already exists`,
      );
    }
    const id = await this.dataSource.transaction(async (manager) => {
      const book = await manager.findOne<Book>(Book, {
        where: {
          id: input.book,
        },
      });
      if (!book) {
        throw new NotFoundException(`Book - '${input.book}'`);
      }

      const comment = await manager.save<Comment>(
        manager.create<Comment>(Comment, {
          ...input,
          id: v4(),
          book,
        }),
      );
      return comment.id;
    });

    return this.getById(id);
  }

  /**
   * Update a comment data by its ID
   * @param id Comment's ID
   * @param input Data for the update
   * @returns The updated comment
   * @throws 404: Comment with this ID was not found
   */
  public async updateById(
    id: CommentId,
    input: UpdateCommentRepositoryInput,
  ): Promise<CommentRepositoryOutput> {
    // Vérification que le commentaire existe déjà
    const comment = await this.getById(id);

    await this.dataSource.transaction(async (manager) => {
      const book = await manager.findOne<Book>(Book, {
        where: {
          id: comment.book.id,
        },
      });
      if (!book) {
        throw new NotFoundException(`Book - '${input.book}'`);
      }
      await manager.update<Comment>(Comment, { id }, { book });

      const obj = {
        ...input,
        book: undefined,
      };
      // update si au moins une propriété de l'objet est définie
      if (Object.values(obj).some((value) => value !== undefined)) {
        await manager.update<Comment>(Comment, { id }, obj);
      }
    });

    return this.getById(id);
  }

  /**
   * Delete a comment by its ID
   * @param id Comment's ID
   * @throws 404: Comment with this ID was not found
   */
  public async deleteById(id: CommentId): Promise<void> {
    const comment = await this.getById(id);
    if (!comment) {
      throw new NotFoundException(`Comment - '${id}'`);
    }
    await this.delete(comment.id);
  }
}
