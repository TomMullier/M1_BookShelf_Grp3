'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useBooksProviders } from '@/hooks';
import Modal from '../../components/modal';
import 'flowbite';

// type bookfilter = {
//  search: string;
//  setSearch: (input: string) => void;
// };
const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  const [searchInput, setSearchInput] = useState<string>(''); // Step 1: Create search input state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const createBook = (): void => {
    const valid = true;
    if (valid) {
      setIsModalOpen(false);
    } else {
      alert('Please fill all the fields');
    }
  };

  const openItemPage = (id: number): void => {
    window.location.href = `/books/${id}`;
  };

  function handleKeyPress(id: number): void {
    openItemPage(id);
  }

  useEffect(() => load(), [load]);

  const fBooks = books.filter((b) =>
    b.name.toLowerCase().includes(searchInput.toLowerCase()),
  );
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
            <div className="number_container book_number_container shadow-md">
              <h1>You currently have</h1>
              <h2>{books.length}</h2>
              <p>books</p>
            </div>
          </section>
          <div className="books_container shadow-md">
            <div className="books_option_container">
              <div className="search_container">
                <i className="fa-solid fa-search" />
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchInput}
                  onChange={(e): void => setSearchInput(e.target.value)}
                />
              </div>
              <div className="filter_container">
                <div className="filter_title">Filter by :</div>
                <div className="filter_item active">Title</div>
                <div className="filter_item">Author</div>
                <div className="filter_item">Category</div>
                <div className="filter_item">Rating</div>
              </div>
            </div>
            <div className="books_list">
              {fBooks.map((book) => (
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
                    <div className="book_title">{book.name}</div>
                    <div className="book_author">
                      {`${book.author.firstName}${book.author.lastName}`}
                    </div>
                    <div className="book_category flex">
                      {book.genres.map((genre) => (
                        <p className="pr-1">{genre}</p>
                      ))}
                    </div>
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
            <button
              type="button"
              className="create_book_button"
              onClick={openModal}
            >
              Create Book
            </button>
          </div>
          <div>
            <Modal
              isOpen={isModalOpen}
              onCancel={closeModal}
              onSubmit={createBook}
              title="Create a Book"
            >
              <p>Modal Content</p>
            </Modal>
          </div>
        </section>
      </section>
      {/* BOOKS */}
    </>
  );
};

export default BooksPage;
