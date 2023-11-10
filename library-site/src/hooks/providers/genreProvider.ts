import axios from 'axios';
import { useEffect, useState } from 'react';
import { GenreModel } from '@/models';

export const useGetGenre = (): GenreModel[] => {
  const [genres, setGenres] = useState<GenreModel[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/genres')
      .then((data) => {
        setGenres(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
        setGenres([]);
      });
  }, []);

  return genres;
};
