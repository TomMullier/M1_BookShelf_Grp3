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
          <section className="top_container">
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
            <div className="book_number_container">
              <h1>You currently have</h1>
              <h2>2</h2>
              <p>books</p>
            </div>
          </section>
          <div className="books_container">
            <div className="filter_container">
              <div className="filter_title">Filter by :</div>
              <div className="filter_item active">Title</div>
              <div className="filter_item">Author</div>
              <div className="filter_item">Category</div>
              <div className="filter_item">Rating</div>
            </div>
            <div className="books_list">
              {books.map(() => (
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
      </section>
      {/* BOOKS */}
    </>
  );
};

export default BooksPage;
