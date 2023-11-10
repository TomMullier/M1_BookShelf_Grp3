'use client';

// On désactive eslint globalement car les résoudre reviendrait à supprimer ce fichier
// Nous n'avons pas eu le temps de gérer les users mais nous le gardons tout de même
/* eslint-disable */
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
          <div className="filter_container">
            <div className="filter_title">Filter by :</div>
            <div className="filter_item active">Books</div>
            <div className="filter_item">Author</div>
            <div className="filter_item">Category</div>
            <div className="filter_item">Rating</div>
          </div>
          <div className="books_list">
            <p>all author</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AuthorsPage;
