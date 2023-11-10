import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthorModel } from '@/models';

// Definition des types
type UseAuthorProviderInput = {
  search?: string;
  sort?: string;
};

type UseAuthorProvider = {
  authors: AuthorModel[];
  loadauthor: () => void;
};

// Fonction pour récupérer les auteurs et les trier
export const useGetAuthor = (
  input?: UseAuthorProviderInput,
): UseAuthorProvider => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [originauthors, setoriginAuthors] = useState<AuthorModel[]>([]);

  // Fonction pour récupérer les auteurs
  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
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
  // Fonction pour trier les auteurs
  useEffect(() => {
    if (input?.search === '' && input?.sort === '') {
      setAuthors(originauthors);
    } else {
      const allauthors = originauthors;
      const filteredauthors = allauthors
        .filter((author: AuthorModel) => {
          if (input?.search) {
            return author.lastName
              .toLowerCase()
              .includes(input.search.toLowerCase());
          }
          return true;
        })
        .filter((author: AuthorModel) => {
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
