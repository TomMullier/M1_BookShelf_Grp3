import { faker } from '@faker-js/faker';
import { Author, AuthorId } from 'library-api/src/entities';
// import { bookFixture } from './book.fixture';

export function authorFixture(): Author {
  return {
    id: faker.string.uuid() as AuthorId,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    photoUrl: faker.image.url(),
    // books: [bookFixture(), bookFixture()],
  } as Author;
}
