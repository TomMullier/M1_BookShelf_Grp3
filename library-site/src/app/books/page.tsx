'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, []);

  return (
    <>
      <h1>Books</h1>
      <div className="flex" style={{ width: 'auto', height: 'auto' }}>
        {books.map((book) => (
          <div
            key={book.id}
            className="flex  flex-col m-10 book_card rounded shadow-lg h-24 bg-back_card bg-cover"
            style={{ width: '300px', height: '424px' }}
          >
            <div className="book_card__title font-bold text-xl mb-4 p-4">
              {book.name}
            </div>
            <div className="book_card__author p-4">
              {book.author.firstName}
              {book.author.lastName}
              (author)
            </div>
            {/* Bottom right tailwind */}
            <div className="book_card__actions flex justify-end w-m bg-none bottom-0 content-end h-full items-end">
              <button type="button" className="book_card__action text-blue_1">
                R
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksPage;
