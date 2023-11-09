import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsDate } from 'class-validator';
import { BookId } from 'library-api/src/entities';

export class CreateCommentDto {
  @ApiProperty({
    description: 'User who writes the comment',
    example: 'Albert',
  })
  @IsString()
  user: string;

  @ApiProperty({
    description: 'Comment',
    example: 'Super !',
  })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Book written on',
    example: '1954-07-29T00:00:00.000Z',
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Book commented',
    example: '7b6bf72e-e42b-49e8-8f19-3c50dac38ede',
  })
  @IsUUID()
  book: BookId;
}

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'User who writes the comment',
    example: 'Albert',
  })
  @IsOptional()
  @IsString()
  user?: string;

  @ApiPropertyOptional({
    description: 'Comment',
    example: 'Super !',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
