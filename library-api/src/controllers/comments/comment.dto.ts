import { IsString, IsOptional, IsUUID } from 'class-validator';
import { BookId } from 'library-api/src/entities';

export class CreateCommentDto {
  @IsString()
  user: string;

  @IsString()
  comment: string;

  @IsUUID()
  book: BookId;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
