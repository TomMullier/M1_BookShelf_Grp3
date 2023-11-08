import { faker } from '@faker-js/faker';
import { Genre, GenreId } from 'library-api/src/entities';
// import { bookGenreFixture } from './bookGenre.fixture';

export function genreFixture(): Genre {
  return {
    id: faker.string.uuid() as GenreId,
    name: faker.word.adjective(),
    // bookGenres: [bookGenreFixture(), bookGenreFixture()],
  } as Genre;
}
