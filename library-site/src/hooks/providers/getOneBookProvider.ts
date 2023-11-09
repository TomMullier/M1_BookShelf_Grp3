import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlainBookModel } from '@/models';

export const useGetOneBook = (id: string) => {
  const [book, setBook] = useState<PlainBookModel | undefined>(undefined);

  useEffect(() => {
    axios
      .get<PlainBookModel>(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => {
        setBook(data.data);
      })
      .catch((err) => {
        console.log(err);
        setBook(undefined);
      });
  }, [id]);

  const updateBook = (bookToUpdate: PlainBookModel): void => {
    axios
      .patch<PlainBookModel>(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, bookToUpdate)
      .then((data) => {
        setBook(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBook = (): void => {
    axios
      .delete<PlainBookModel>(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then(() => {
        setBook(undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { book, updateBook, deleteBook };
};
