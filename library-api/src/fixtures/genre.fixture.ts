import { faker } from '@faker-js/faker';
import { Genre, GenreId } from 'library-api/src/entities';

export function genreFixture(): Genre {
  return {
    id: faker.string.uuid() as GenreId,
    name: faker.word.adjective(),
  } as Genre;
}
