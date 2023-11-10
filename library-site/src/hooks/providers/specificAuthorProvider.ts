import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthorModel } from '@/models';

export const useGetAuthorSpecific = (id: string): object => {
  const [author, setAuthor] = useState<AuthorModel | undefined>(undefined);
  useEffect(() => {
    axios
      .get<AuthorModel>(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [id]);

  const updateAuthor = (authorToUpdate: AuthorModel): void => {
    axios
      .patch<AuthorModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
        authorToUpdate,
      )
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const deleteAuthor = (): void => {
    axios
      .delete<AuthorModel>(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then(() => {
        setAuthor(undefined);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const createAuthor = (authorToCreate: AuthorModel): void => {
    axios
      .post<AuthorModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/authors/`,
        authorToCreate,
      )
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return { author, updateAuthor, deleteAuthor, createAuthor };
};
