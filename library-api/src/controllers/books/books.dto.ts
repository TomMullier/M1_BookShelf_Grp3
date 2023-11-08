import { IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlainAuthorModelForBook } from 'library-api/src/models';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book name',
    example: 'The Lord of the Rings',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Book written on',
    example: '1954-07-29T00:00:00.000Z',
  })
  @IsDate()
  writtenOn: Date;

  @ApiProperty({
    description: 'Book author',
    example: {
      id: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
    },
  })
  @IsString()
  author: PlainAuthorModelForBook;

  @ApiProperty({
    description: 'Book genres',
    example: ['Fantasy', 'Adventure'],
  })
  @IsString({ each: true })
  genres: string[];
}

export class UpdateBookDto {
  @ApiProperty({
    description: 'Book name',
    example: 'The Lord of the Rings',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Book written on',
    example: '1954-07-29T00:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  writtenOn?: Date;

  @ApiProperty({
    description: 'Book author',
    example: {
      id: 'a9f8c7d6-b5a4-4a3b-9f0e-1b0b1b1b1b1b',
      firstName: 'J.R.R.',
      lastName: 'Tolkien',
    },
  })
  @IsOptional()
  @IsString()
  author?: PlainAuthorModelForBook;

  @ApiProperty({
    description: 'Book genres',
    example: ['Fantasy', 'Adventure'],
  })
  @IsOptional()
  @IsString({ each: true })
  genres?: string[];
}
