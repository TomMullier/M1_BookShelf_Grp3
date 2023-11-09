import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre name',
    example: 'Fantasy',
  })
  @IsString()
  name: string;
}
