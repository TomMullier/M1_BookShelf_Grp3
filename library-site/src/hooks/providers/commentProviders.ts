import axios from 'axios';
import { useEffect, useState } from 'react';
import { log } from 'console';
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
        log(err);
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
        log(err);
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
        log(err);
      });
  };
  return { comment, updateComment, createComment };
};
