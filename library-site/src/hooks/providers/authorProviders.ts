import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthorModel } from '@/models';

export const useGetAuthor = (): AuthorModel[] => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/authors')
      .then((data) => {
        setAuthors(data.data);
      })
      .catch((err) => {
        console.log(err);
        setAuthors([]);
      });
  }, []);

  return authors;
};
