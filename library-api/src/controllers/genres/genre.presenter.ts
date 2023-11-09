import { ApiProperty } from '@nestjs/swagger';
import { GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';

export class GenrePresenter {
  @ApiProperty({
    description: 'Genre ID',
    example: 'e0a642a7-1802-419a-9a14-2e5056787ca0',
  })
  id: GenreId;

  @ApiProperty({
    description: 'Genre name',
    example: 'Fantasy',
  })
  name: string;

  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}
