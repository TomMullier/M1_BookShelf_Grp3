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
import {
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentPresenter } from './comment.presenter';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@ApiTags('comments')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('comments')
export class CommentController {
  constructor(private readonly commentUseCases: CommentUseCases) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get all comments',
    type: CommentPresenter,
    isArray: true,
  })
  public async getAll(): Promise<CommentPresenter[]> {
    const comments = await this.commentUseCases.getAllPlain();

    return comments.map(CommentPresenter.from);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get a comment by its ID',
    type: CommentPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Comment not found',
  })
  @Get('/:id')
  public async getById(@Param('id') id: CommentId): Promise<CommentPresenter> {
    const comment = await this.commentUseCases.getById(id);
    return CommentPresenter.from(comment);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Create a book',
    type: CommentPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Book not found',
  })
  @ApiConflictResponse({
    description: 'Comment with this user for this book already exists',
  })
  public async createComment(
    @Body() input: CreateCommentDto,
  ): Promise<CommentPresenter> {
    const comment = await this.commentUseCases.createComment(input);

    return CommentPresenter.from(comment);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Comment updated by its ID',
    type: CommentPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Comment not found',
  })
  public async updateById(
    @Param('id') id: CommentId,
    @Body() input: UpdateCommentDto,
  ): Promise<CommentPresenter> {
    const comment = await this.commentUseCases.updateById(id, input);

    return CommentPresenter.from(comment);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Comment deleted by its ID',
  })
  @ApiNotFoundResponse({
    description: 'Comment not found',
  })
  public async deleteById(@Param('id') id: CommentId): Promise<void> {
    await this.commentUseCases.deleteById(id);
  }
}
