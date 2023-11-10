import axios, { all } from 'axios';
import { useState, useEffect } from 'react';
import { PlainBookModel, GenreModel } from '@/models';
import { Sort } from '@/models/sort.model';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

type UseListBooksProviderInput = {
  search?: string;
  genre?: GenreModel[];
  sort?: Sort;
};

export const useListBooks = (
  input?: UseListBooksProviderInput,
): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);
  const [originbooks, setoriginBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((response) => {
        setBooks(response.data);
        setoriginBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let allbooks = books;

  useEffect(() => {
    const sort = input?.sort ?? { field: 'Title' };
    console.log(books);
    if (input?.search === '' && input?.genre?.length === 0) {
      const sorted = originbooks.sort((a, b) => {
        console.log('sorting');
        if (sort.field === 'Title') {
          return a.name.localeCompare(b.name);
        }
        return a.author.lastName.localeCompare(b.author.lastName);
      });
      setBooks(sorted);
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      allbooks = originbooks; // Disable car warning pas important
      const inputgenres = input?.genre?.map((genre) => genre.name);
      console.log(input);
      // eslint-disable-next-line max-len, prettier/prettier
      const filteredbooks = allbooks.filter((book) => (
        input?.search ? book.name.toLowerCase().includes(input.search.toLowerCase()) : true
        ),
          // eslint-disable-next-line function-paren-newline
        ).filter((book) => (
        inputgenres?.length ? book.genres.some((genre) => inputgenres.includes(genre)!) : true
        ),
          // eslint-disable-next-line function-paren-newline
        ).sort((a, b) => {
          console.log('sorting');
          if (sort.field === 'Title') {
            return a.name.localeCompare(b.name);
          }
          return a.author.lastName.localeCompare(b.author.lastName);
        },
        );
      console.log(filteredbooks);
      setBooks(filteredbooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input?.sort, input?.search, input?.genre]);
  return { books, load: fetchBooks };
};

type BookProviders = {
  useListBooks: (input?: UseListBooksProviderInput) => UseListBooksProvider;
};

export const useBooksProviders = (
  input?: UseListBooksProviderInput,
): BookProviders => ({
  useListBooks: () => useListBooks(input),
});
