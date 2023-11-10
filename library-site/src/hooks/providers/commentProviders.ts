import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlainCommentModel } from '@/models';

export const useGetComment = (id: string): object => {
  const [comment, setComment] = useState<PlainCommentModel | undefined>(
    undefined,
  );

  useEffect(() => {
    axios
      .get<PlainCommentModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
      )
      .then((data) => {
        setComment(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
        setComment(undefined);
      });
  }, [id]);

  const updateComment = (commentToUpdate: PlainCommentModel): void => {
    axios
      .patch<PlainCommentModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
        commentToUpdate,
      )
      .then((data) => {
        setComment(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const createComment = (commentToCreate: PlainCommentModel): void => {
    axios
      .post<PlainCommentModel>(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/`,
        commentToCreate,
      )
      .then((data) => {
        setComment(data.data);
      })
      .catch((err) => {
        // Besoin du console.log pour afficher l'erreur dans la console
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };
  return { comment, updateComment, createComment };
};
