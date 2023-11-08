import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { BookGenre } from 'library-api/src/entities/BookGenre';
import { Genre } from 'library-api/src/entities/Genre';
import { Comment } from './Comment';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './Comment';

export const entities = [Author, Book, BookGenre, Comment, Genre];
