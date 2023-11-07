import React, { FC, ReactElement } from 'react';
import styles from './comment.module.css';

type CommentProps = {
  children: ReactElement | string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  date: string;
};

const Comment: FC<CommentProps> = ({ children, author, date }) => (
  <span>
    <div className={styles.comment}>
      <div className={styles.commentAuthor}>
        <p>{`${author.firstName} ${author.lastName}`}</p>
      </div>
      <div className={styles.commentContent}>
        <p>{children}</p>
        <div className={styles.commentDate}>{date}</div>
      </div>
    </div>
    <div className={styles.separator} />
  </span>
);

export default Comment;
