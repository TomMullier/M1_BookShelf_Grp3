'use client';

import { FC, useState } from 'react';
import { usePathname } from 'next/navigation';
import Modal from '../../../components/modal/modal';

import { useGetAuthorSpecific } from '@/hooks';

const AuthorDetailsPage: FC = () => {
  const openItemPage = (id: number): void => {
    window.location.href = `/books/${id}`;
  };
  const [isModalOpenDeleteAuthor, setIsModalOpenDeleteAuthor] = useState(false);
  const idAuth = usePathname().split('/')[2];
  const { author, deleteAuthor } = useGetAuthorSpecific(idAuth);

  function handleKeyPress(id: number): void {
    openItemPage(id);
  }

  const closeModalDeleteAuthor = (): void => {
    setIsModalOpenDeleteAuthor(false);
  };
  const openModalDeleteAuthor = (): void => {
    setIsModalOpenDeleteAuthor(true);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsModalOpenDeleteAuthor(false);
        document.removeEventListener('keydown', () => {});
      }
    });
  };

  const confirmDeleteAuthor = (): void => {
    setIsModalOpenDeleteAuthor(false);
    deleteAuthor();
    window.location.href = '/authors';
  };

  return (
    <section className="layout_book">
      <section className="left_book_author">
        {/* Book List */}
        <h1>Book List</h1>
        <div className="book_list_author">
          {/* Element est focusable */}
          {/* eslint-disable-next-line */}
          {author?.books.map((book) => (
            // eslint-disable-next-line
            <div
              className="book_list_author_item"
              key={book.id}
              onClick={(): void => {
                handleKeyPress(book.id);
              }}
              onKeyDown={(): void => {
                handleKeyPress(book.id);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="book_list_author_item_image bg-book_cover bg-center bg-no-repeat bg-cover" />
              <div className="book_list_author_item_name">{book.name}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="right_book">
        {/* Author informations */}
        <div className="author_informations">
          <div className="author_informations_title">Informations</div>
          <div className="author_informations_list">
            <div className="author_informations_item">
              <div className="bg-people bg-cover bg-center bg-no-repeat" />
            </div>
            <div className="author_informations_item">
              <span>Firstname :</span>
              <p>{author?.firstName}</p>
            </div>
            <div className="author_informations_item">
              <span>Lastname :</span>
              <p>{author?.lastName}</p>
            </div>
          </div>
          <div className="actions_container">
            {/* No need for keyboard listener */}
            {/* eslint-disable-next-line */}
            <div
              className="button_author_delete"
              onClick={openModalDeleteAuthor}
            >
              Delete
            </div>
          </div>
        </div>
      </section>
      {/* modal confirm delete */}
      <Modal
        isOpen={isModalOpenDeleteAuthor}
        onCancel={closeModalDeleteAuthor}
        onSubmit={confirmDeleteAuthor}
        title="Delete a book"
      >
        <h2 className="delete_text">
          Are you sure you want to delete this book ?
        </h2>
      </Modal>
    </section>
  );
};

export default AuthorDetailsPage;
