import { IsString, IsDate } from 'class-validator';
import { PlainAuthorModel } from 'library-api/src/models';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  @IsString()
  author: PlainAuthorModel;

  @IsString({ each: true })
  genres: string[];
}
