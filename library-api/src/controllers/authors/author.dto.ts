import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;
}
