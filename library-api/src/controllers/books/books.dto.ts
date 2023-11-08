import { IsString, IsDate, IsOptional } from 'class-validator';
import { PlainAuthorModelForBook } from 'library-api/src/models';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  @IsString()
  author: PlainAuthorModelForBook;

  @IsString({ each: true })
  genres: string[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  writtenOn?: Date;

  @IsOptional()
  @IsString()
  author?: PlainAuthorModelForBook;

  @IsOptional()
  @IsString({ each: true })
  genres?: string[];
}
