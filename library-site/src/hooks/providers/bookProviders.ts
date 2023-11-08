// import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlainBookModel } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

type UseListBooksProviderInput = {
  search?: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useListBooks = (input?: UseListBooksProviderInput) => {
  console.log('in uslistbooks', input?.search);
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
  useEffect(() => {
    const allbooks = [bookTest, bookTest2];
    const filteredbooks = allbooks.filter((book) =>
      (input?.search ? book.name.toLowerCase().includes(input.search.toLowerCase()): true),
    );
    setBooks(filteredbooks);
  }, [books, input?.search]);
  return { books, load: fetchBooks };
  // return { books, load: (): void => {} };
};

type BookProviders = {
  useListBooks: (input?: UseListBooksProviderInput) => UseListBooksProvider;
};

export const useBooksProviders = (
  input?: UseListBooksProviderInput,
): BookProviders => ({
  useListBooks: () => useListBooks(input),
});
