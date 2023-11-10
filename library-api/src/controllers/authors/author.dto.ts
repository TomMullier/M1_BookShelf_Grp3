import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'Author lastname',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Author firstname',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Author photo url',
    example: 'data:image/png;base64,dVBORw0KGgoAAAANSUhEUgAgAZoAAAAuCAYAAAARKt',
  })
  @IsString()
  photoUrl?: string;
}
