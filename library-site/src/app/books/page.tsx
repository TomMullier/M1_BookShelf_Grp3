'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import 'flowbite';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  const openItemPage = (id: number): void => {
    window.location.href = `/books/${id}`;
  };

  function handleKeyPress(id: number): void {
    openItemPage(id);
  }

  useEffect(() => load, [load]);
  return (
    <>
      <section className="layout_book">
        <section className="left_side_book">
          <section className="top_container">
            <div className="books_top_section top_section shadow-md">
              <div className="text">
                <h1 className="welcome">Hello Xavier!</h1>
                <p>Selection of the best books, just for you</p>
                <a href="/" className="latest">
                  Show latest
                </a>
              </div>
              <div className="image_ bg-book_fly bg-contain bg-right bg-no-repeat" />
            </div>
            <div className="number_container books_number_container shadow-md">
              <h1>You currently have</h1>
              <h2>2</h2>
              <p>books</p>
            </div>
          </section>
          <div className="books_container shadow-md">
            <div className="filter_container">
              <div className="filter_title">Filter by :</div>
              <div className="filter_item active">Title</div>
              <div className="filter_item">Author</div>
              <div className="filter_item">Category</div>
              <div className="filter_item">Rating</div>
            </div>
            <div className="books_list">
              {books.map((book) => (
                <div
                  className="book_item"
                  id={book.id}
                  onClick={(): void => {
                    handleKeyPress(parseInt(book.id, 10));
                  }}
                  onKeyPress={(): void => {
                    handleKeyPress(parseInt(book.id, 10));
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="book_image bg-book_cover bg-cover bg-center bg-no-repeat" />

                  <div className="book_info">
                    <div className="book_title">{books[0].name}</div>
                    <div className="book_author">JEAN</div>
                    <div className="book_category">Thriller, Policier</div>
                    <div className="book_rating">
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                      <i className="fa-solid fa-star" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      {/* BOOKS */}
    </>
  );
};

export default BooksPage;
