import { faker } from '@faker-js/faker';
import { Comment, CommentId } from 'library-api/src/entities';
import { bookFixture } from './book.fixture';

export function commentFixture(): Comment {
  return {
    id: faker.string.uuid() as CommentId,
    user: faker.internet.userName(),
    comment: faker.lorem.paragraph(),
    date: faker.date.past(),
    book: bookFixture(),
  } as Comment;
}
