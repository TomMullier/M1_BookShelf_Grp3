import React, { FC, ReactElement, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './comment.module.css';
import Modal from '../modal/modal';

type CommentProps = {
  children: ReactElement | string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  date: string;
};

const Comment: FC<CommentProps> = ({ children, author, date }) => {
  const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);
  const closeModalEditComment = (): void => {
    setIsModalOpenEditComment(false);
    const trucToRemove = document.querySelector(
      '.MuiToolbar-root',
    ) as HTMLElement;
    if (trucToRemove) {
      trucToRemove.style.zIndex = '5';
    }
  };
  const openModalEditComment = (): void => {
    setIsModalOpenEditComment(true);
    const trucToRemove = document.querySelector(
      '.MuiToolbar-root',
    ) as HTMLElement;
    if (trucToRemove) {
      trucToRemove.style.zIndex = 'unset';
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsModalOpenEditComment(false);
        document.removeEventListener('keydown', () => {});
      }
    });
  };

  const pathname = usePathname();
  const checkCommentEdit = (): void => {
    let valid = true;
    const pathnameArray = pathname.split('/');
    const bookId = pathnameArray[pathnameArray.length - 1];
    const checkForm = document.querySelectorAll('.create_post_form textarea');
    checkForm.forEach((input) => {
      const h = input as HTMLInputElement;
      if (h.value === '') {
        valid = false;
      }
    });
    const author2 = document.getElementById('post_author') as HTMLInputElement;
    if (author2.value === '0') {
      valid = false;
    }
    if (valid) {
      const comment = {
        comment: (document.getElementById('post_comment') as HTMLInputElement)
          .value,
        date: new Date().toLocaleDateString(),
        user: author2.value,
        book: bookId,
      };
      console.log('Comment posted');
      console.log(comment);
    } else {
      alert('Please fill all the fields');
    }
  };
  return (
    <span>
      <div className={styles.comment}>
        <div className={styles.commentAuthor}>
          <p>{`${author.firstName} ${author.lastName}`}</p>
        </div>
        <div className={styles.commentContent}>
          <p>{children}</p>
          <div className={styles.commentDate}>{date}</div>
          <div className={styles.commentActions}>
            <button type="button" onClick={openModalEditComment}>
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className={styles.separator} />
      <Modal
        isOpen={isModalOpenEditComment}
        onCancel={closeModalEditComment}
        onSubmit={checkCommentEdit}
        title="Edit Comment"
      >
        <form className="create_post_form edit_post_form" action="">
          <div className="title_group">
            {/* Ne prend pas en compte le htmlFor */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="post_comment">Comment</label>
            <textarea
              name="post_comment"
              id="post_comment"
              placeholder="Write your comment..."
            />
            {/* Selkect author */}
            <div className="select_author_container">
              {/* Ne prend pas en compte le htmlFor */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="post_author">User</label>
              <input
                type="text"
                className="post_author"
                placeholder="User name"
              />
            </div>
          </div>
        </form>
      </Modal>
    </span>
  );
};

export default Comment;
