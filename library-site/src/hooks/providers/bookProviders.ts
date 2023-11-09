/* eslint-disable prettier/prettier */
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlainBookModel, Genres } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

type UseListBooksProviderInput = {
  search?: string;
  genre?: Genres[];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useListBooks = (input?: UseListBooksProviderInput) => {
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
    genres: [
      { id: '1', name: 'Thriller' },
      { id: '2', name: 'Fantasy' },
    ],
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
    genres: [
      { id: '3', name: 'Romance' },
      { id: '5', name: 'Historical' },
    ],
  };

  const fetchBooks = (): void => {
    // axios
    //   .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
    //   .then(() => setBooks(allbooks))
    //   .catch((err) => console.error(err));
    setBooks([bookTest, bookTest2]);
  };
  useEffect(() => {
    if (input?.search === '' && input?.genre?.length === 0) {
      setBooks([bookTest, bookTest2]);
    } else {
      const allbooks = [bookTest, bookTest2];
      const inputgenres = input?.genre?.map((genre) => genre.name);
      console.log(input);
      // eslint-disable-next-line max-len, prettier/prettier
      const filteredbooks = allbooks.filter((book) => (
        input?.search ? book.name.toLowerCase().includes(input.search.toLowerCase()) : true
        ),
          // eslint-disable-next-line function-paren-newline
        ).filter((book) => (
        inputgenres?.length ? book.genres.some((genre) => inputgenres.includes(genre.name)!) : true

        ),
      // eslint-disable-next-line function-paren-newline
      );
      setBooks(filteredbooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input?.search, input?.genre]);
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
