'use client';

import { FC, useEffect, useState } from 'react';
import { useBooksProviders } from '@/hooks';

const AuthorsPage: FC = () => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  const [searchInput, setSearchInput] = useState<string>(''); // Step 1: Create search input state

  const openItemPage = (id: number): void => {
    window.location.href = `/authors/${id}`;
  };
  function handleKeyPress(id: number): void {
    openItemPage(id);
  }
  useEffect(() => load(), []);

  const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(searchInput.toLowerCase()),);

  return (
    <section className="layout_book">
      <section className="left_side_book">
        <div className="books_container shadow-md">
          {/* Step 2: Add a search bar */}
          <div className="search_container">
            <input
              type="text"
              placeholder="Search by title"
              value={searchInput}
              onChange={(e): void => setSearchInput(e.target.value)}
            />
          </div>
          <div className="books_list">
            <div
              className="author border rounded-lg border-blue_1 mr-10"
              onClick={(): void => {
                handleKeyPress(0);
              }}
              onKeyDown={(): void => {
                handleKeyPress(0);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="image_ bg-people bg-contain bg-right bg-no-repeat w-64 h-64 flex" />
              <div className="author_name flex flex-row justify-center">
                <h1>Author name </h1>
                <h1>Author name</h1>
              </div>
              <div className="author_books_number flex flex-row justify-center">
                <h1>4 </h1>
                <h1>books</h1>
              </div>
            </div>
            <div
              className="author border rounded-lg border-blue_1 mr-10"
              onClick={(): void => {
                handleKeyPress(1);
              }}
              onKeyDown={(): void => {
                handleKeyPress(1);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="image_ bg-people bg-contain bg-right bg-no-repeat w-64 h-64 flex" />
              <div className="author_name flex flex-row justify-center">
                <h1>Author name </h1>
                <h1>Author name</h1>
              </div>
              <div className="author_books_number flex flex-row justify-center">
                <h1>4 </h1>
                <h1>books</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AuthorsPage;
