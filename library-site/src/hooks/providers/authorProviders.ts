import axios, { all } from 'axios';
import { useEffect, useState } from 'react';
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
): UseAuthorProvider[] => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [originauthors, setoriginAuthors] = useState<AuthorModel[]>([]);

  const fetchAuthors = (): void => {
    axios
      .get('http://localhost:3001/authors')
      .then((data) => {
        setAuthors(data.data);
        setoriginAuthors(data.data);
      })
      .catch((err) => {
        console.log(err);
        setAuthors([]);
      });
  };
  useEffect(() => {
    console.log(input);
    if (input?.search === '' && input?.sort  === '0') {
      setAuthors(originauthors);
    } else {
      const allauthors = originauthors;
      const filteredauthors = allauthors.filter((author) => (
        input?.search ? author.lastName.toLowerCase().includes(input.search.toLowerCase()): true
      ),
      ).filter((author) => (
          input?.sort ? author.books.length === parseInt(input.sort, 10) : true,
      ),
      );
      setAuthors(filteredauthors);
    }
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
