import axios from 'axios';
import { useEffect, useState } from 'react';
import { GenreModel } from '@/models';
import { log } from 'console';

export const useGetGenre = (): GenreModel[] => {
  const [genres, setGenres] = useState<GenreModel[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/genres')
      .then((data) => {
        setGenres(data.data);
      })
      .catch((err) => {
        log(err);
        setGenres([]);
      });
  }, []);

  return genres;
};
