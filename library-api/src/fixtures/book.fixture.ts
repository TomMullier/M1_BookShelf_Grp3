import { faker } from '@faker-js/faker';
import { Book, BookId } from 'library-api/src/entities';
import { authorFixture } from './author.fixture';
// import { bookGenreFixture } from './bookGenre.fixture';
import { genreFixture } from './genre.fixture';

export function bookFixture(): Book {
  return {
    id: faker.string.uuid() as BookId,
    name: faker.word.noun(),
    writtenOn: faker.date.past(),
    author: authorFixture(),
    bookGenres: [{ genre: genreFixture() }, { genre: genreFixture() }],
  } as Book;
}
