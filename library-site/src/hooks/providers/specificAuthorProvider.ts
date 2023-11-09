import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthorModel } from '@/models';

export const useGetAuthorSpecific = (id: string) => {
  const [author, setAuthor] = useState<AuthorModel | undefined>(undefined);
  useEffect(() => {
    axios
      .get<AuthorModel>(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => {
        setAuthor(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
        setAuthor(undefined);
      });
  }, [id]);

  const updateAuthor = (authorToUpdate: AuthorModel): void => {
    axios
      .patch<AuthorModel>(`${process.env.NEXT_PUBLIC_API_URL}/author/${id}`, authorToUpdate)
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAuthor = (): void => {
    axios
      .delete<AuthorModel>(`${process.env.NEXT_PUBLIC_API_URL}/author/${id}`)
      .then(() => {
        setAuthor(undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAuthor = (authorToCreate: AuthorModel): void => {
    axios
      .post<AuthorModel>(`${process.env.NEXT_PUBLIC_API_URL}/author/`, authorToCreate)
      .then((data) => {
        setAuthor(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { author, updateAuthor, deleteAuthor, createAuthor };
};
