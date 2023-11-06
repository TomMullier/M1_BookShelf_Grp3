'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();

  const openItemPage = (id: number): void => {
    window.location.href = `/books/${id}`;
  };

  function handleKeyPress(id: number): void {
    openItemPage(id);
  }

  return (
    <section className="layout_book">
      <section className="left_side_book">
        <section className="top_container flex justify-center">
          <div className="book_number_container number_container shadow-md">
            <div className="image_ bg-people bg-contain bg-right bg-no-repeat w-64 h-64 flex" />
            <div className="flex flex-row m-0">
              <h1>bwa</h1>
            </div>
          </div>
        </section>
        <div className="books_container shadow-md">
          <div className="books_list">
            <div
              className="book_item"
              id="{book.id}"
              onClick={(): void => {
                handleKeyPress(0);
              }}
              onKeyDown={(): void => {
                handleKeyPress(0);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="book_image bg-book_cover bg-cover bg-center bg-no-repeat" />

              <div className="book_info">
                <div className="book_title">
                  <p>Nom Livre</p>
                </div>
                <div className="book_author">
                  <p>Prenom Nom</p>
                </div>
                <div className="book_category flex">
                  <p>genre 1 / genre 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AuthorDetailsPage;
