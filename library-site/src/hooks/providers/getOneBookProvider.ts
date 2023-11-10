import axios from 'axios';
import { useEffect, useState } from 'react';
import { log } from 'console';
import { PlainBookModel } from '@/models';

export const useGetOneBook = (id: string): object => {
  const [book, setBook] = useState<PlainBookModel | undefined>(undefined);

  useEffect(() => {
    axios
      .get<PlainBookModel>(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => {
        setBook(data.data);
      })
      .catch((err) => {
        log(err);
        setBook(undefined);
      });
  }, [id]);

  const updateBook = (bookToUpdate: PlainBookModel): void => {
    axios
      .patch<PlainBookModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        bookToUpdate,
      )
      .then((data) => {
        setBook(data.data);
      })
      .catch((err) => {
        log(err);
      });
  };

  const deleteBook = (): void => {
    axios
      .delete<PlainBookModel>(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then(() => {
        setBook(undefined);
      })
      .catch((err) => {
        log(err);
      });
  };

  const createBook = (bookToCreate: PlainBookModel): void => {
    axios
      .post<PlainBookModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/books/`,
        bookToCreate,
      )
      .then((data) => {
        setBook(data.data);
      })
      .catch((err) => {
        log(err);
      });
  };

  return { book, updateBook, deleteBook, createBook };
};
