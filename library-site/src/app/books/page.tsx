'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import 'flowbite';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, []);

  return (
    <>
      <section className="layout_book">
        <section className="left_side_book">
          <div className="top_section">
            <div className="text">
              <h1 className="welcome">Hello Xavier!</h1>
              <p>Selection of the best books, just for you</p>
              <a href="/" className="latest">
                Show latest
              </a>
            </div>
            <div className="image_ bg-book_fly bg-contain bg-right bg-no-repeat" />
          </div>
          <div className="books_container">
            <div className="filter_container">
              <div className="filter_title">Filter by :</div>
              <div className="filter_item active">Title</div>
              <div className="filter_item">Author</div>
              <div className="filter_item">Category</div>
              <div className="filter_item">Rating</div>
            </div>
            <div className="books_list">
              {books.map((book) => (
                <div className="book_item">
                  <div className="book_image bg-book_cover bg-cover bg-center bg-no-repeat" />
                  <div className="book_info">
                    <div className="book_title">Titre du Livre</div>
                    <div className="book_author">Tom Mullier</div>
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
        <section className="right_side_book">
          <h1>Your library</h1>
        </section>
      </section>
      {/* BOOKS */}

      <div className="flex" style={{ width: 'auto', height: 'auto' }}>
        {/* {books.map((book) => (
          <div
            key={book.id}
            className="flex rounded-xl flex-col m-10 book_card rounded overflow-hidden shadow-lg h-24 bg-back_card bg-cover from-orange-400 via-red-500 to-pink-500"
            style={{ width: '300px', height: '424px' }}
          >
            <div className="book_card__title font-bold text-xl mb-2">
              {book.name}
            </div>
            <div className="book_card__author">
              {book.id}
              {book.id}
            </div>
            <div className="book_card__actions flex justify-end w-m bg-none bottom-0 content-end h-full items-end ">
              <button
                data-modal-toggle="modalBookDesc"
                data-modal-target="modalBookDesc"
                type="button"
                className="book_card__action text-blue_1"
              >
                <i className="fa-solid fa-file-lines" />
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default BooksPage;
