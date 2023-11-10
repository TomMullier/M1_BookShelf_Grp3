import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { AuthorModel } from '@/models';

type UseAuthorProviderInput = {
  search?: string;
  sort?: string;
};

type UseAuthorProvider = {
  authors: AuthorModel[];
  loadauthor: () => void;
};

export const useGetAuthor = (
  input?: UseAuthorProviderInput,
): {
  authors: AuthorModel[];
  loadauthor: () => void;
} => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [originauthors, setoriginAuthors] = useReducer();

  const fetchAuthors = (): void => {
    axios
      .get('http://localhost:3001/authors')
      .then((data) => {
        setAuthors(data.data);
        setoriginAuthors(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
        setAuthors([]);
      });
  };

  useEffect(() => {
    if (input?.search === '' && input?.sort === '0') {
      setAuthors(originauthors);
    } else {
      const filteredauthors = originauthors
        .filter((author) => {
          if (input?.search) {
            return author.lastName
              .toLowerCase()
              .includes(input.search.toLowerCase());
          }
          return true;
        })
        .filter((author) => {
          if (input?.sort) {
            return author.books.length === parseInt(input.sort, 10);
          }
          return true;
        });
      setAuthors(filteredauthors);
    }
    // ici il nous est inutile d'exporter originAuthors car on ne l'utilisera pas ailleurs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input?.search, input?.sort]);

  return { authors, loadauthor: fetchAuthors };
};

type AuthorProviders = {
  useGetAuthor: (input?: UseAuthorProviderInput) => UseAuthorProvider;
};

export const useAuthorProviders = (
  input?: UseAuthorProviderInput,
): AuthorProviders => ({
  useGetAuthor: () => useGetAuthor(input),
});
