import axios from 'axios';
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
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  let allbooks = books;

  useEffect(() => {
    const sort = input?.sort ?? { field: 'Title' };
    if (input?.search === '' && input?.genre?.length === 0) {
      const sorted = originbooks.sort((a, b) => {
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
      const filteredbooks = allbooks
        .filter((book) => {
          if (input?.search) {
            return book.name.toLowerCase().includes(input.search.toLowerCase());
          }
          return true;
        })
        .filter((book) => {
          if (inputgenres?.length) {
            return book.genres.some((genre) => inputgenres.includes(genre)!);
          }
          return true;
        })
        .sort((a, b) => {
          if (sort.field === 'Title') {
            return a.name.localeCompare(b.name);
          }
          return a.author.lastName.localeCompare(b.author.lastName);
        });
      setBooks(filteredbooks);
    }
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
