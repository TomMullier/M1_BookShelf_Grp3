// import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const bookTest = {
    id: '1',
    name: 'test',
    writtenOn: new Date(),
    author: {
      id: '1',
      firstName: 'test',
      lastName: 'test2',
    },
    genres: ['test', 'test2'],
  };

  const fetchBooks = (): void => {
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
    //   .then(() => setBooks([bookTest]))
    //   .catch((err) => console.error(err));
    setBooks([bookTest, bookTest]);
  };

  return { books, load: fetchBooks };
  // return { books, load: (): void => {} };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});
