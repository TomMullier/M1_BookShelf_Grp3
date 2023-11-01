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
    id: '0',
    name: 'Cest Marquant',
    writtenOn: new Date(),
    author: {
      id: '0',
      firstName: 'Jean',
      lastName: 'MichMuch',
    },
    genres: ['Quoi', 'Fantasy'],
  };
  const bookTest2 = {
    id: '1',
    name: 'Moi aussi je suis marquant',
    writtenOn: new Date(),
    author: {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Croche',
    },
    genres: ['Roman', 'Policier'],
  };
  const fetchBooks = (): void => {
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
    //   .then(() => setBooks(allbooks))
    //   .catch((err) => console.error(err));
    setBooks([bookTest, bookTest2]);
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
