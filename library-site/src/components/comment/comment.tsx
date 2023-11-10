import React, { FC, ReactElement, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './comment.module.css';
import Modal from '../modal/modal';
import { useGetComment } from '@/hooks';

type CommentProps = {
  children: ReactElement | string;
  author: string;
  date: string;
  name: string;
};

const Comment: FC<CommentProps> = ({ children, author, date, name }) => {
  const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);
  const { updateComment } = useGetComment(name);

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
    setTimeout(() => {
      const comment2 = document.getElementById(
        'post_comment',
      ) as HTMLInputElement;
      comment2.value = children as string;
      const author2 = document.getElementById(
        'post_author',
      ) as HTMLInputElement;
      author2.value = document.getElementById(`auth${name}`)
        ?.innerText as string;
    }, 100);
  };

  document.getElementById(name)?.addEventListener('click', () => {
    openModalEditComment();
  });
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
      const Modcomment = {
        comment: (document.getElementById('post_comment') as HTMLInputElement)
          .value,
        date: new Date().toLocaleDateString(),
        user: author2.value,
        book: bookId,
        id: name,
      };
      console.log('Comment posted');
      console.log(Modcomment);
      updateComment(Modcomment);
      closeModalEditComment();
      window.location.reload();
    } else {
      alert('Please fill all the fields');
    }
  };
  return (
    <div>
      <div className={styles.comment}>
        <div id={`auth${name}`} className={styles.commentAuthor}>
          <p>{author}</p>
        </div>
        <div className={styles.commentContent}>
          <p>{children}</p>
          <div className={styles.commentDate}>{date}</div>
          <div className={styles.commentActions}>
            <button type="button" id={name}>
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
                id="post_author"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Comment;
