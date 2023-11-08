import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommentUseCases } from 'library-api/src/useCases/comments/comment.useCases';
import { CommentId } from 'library-api/src/entities';
import { CommentPresenter } from './comment.presenter';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentUseCases: CommentUseCases) {}

  @Get('/')
  public async getAll(): Promise<CommentPresenter[]> {
    const comments = await this.commentUseCases.getAllPlain();

    return comments.map(CommentPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: CommentId): Promise<CommentPresenter> {
    const comment = await this.commentUseCases.getById(id);
    return CommentPresenter.from(comment);
  }

  @Post('/')
  public async createComment(
    @Body() input: CreateCommentDto,
  ): Promise<CommentPresenter> {
    const comment = await this.commentUseCases.createComment(input);

    return CommentPresenter.from(comment);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: CommentId,
    @Body() input: UpdateCommentDto,
  ): Promise<CommentPresenter> {
    const comment = await this.commentUseCases.updateById(id, input);

    return CommentPresenter.from(comment);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: CommentId): Promise<void> {
    await this.commentUseCases.deleteById(id);
  }
}
