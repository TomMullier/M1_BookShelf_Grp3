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

  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  const openModal = (): void => {
    setIsModalOpen(true);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        document.removeEventListener('keydown', () => {});
      }
    });
  };

  const createBook = (): void => {
    let valid = true;
    const checkForm = document.querySelectorAll('.create_book_form input');
    checkForm.forEach((input) => {
      if (input.value === '') {
        valid = false;
      }
    });
    const genresList = document.querySelectorAll('.genresList input');
    const genreChecked = [];
    genresList.forEach((genre) => {
      if (genre.checked) {
        genreChecked.push(genre.id);
      }
    });
    if (genreChecked.length === 0) {
      valid = false;
    }
    if (valid) {
      const book = {
        name: (document.getElementById('title') as HTMLInputElement).value,
        author: (document.getElementById('author') as HTMLInputElement).value,
        genres: genreChecked,
      };
      alert('Book created');
      console.log(book);
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

  useEffect(() => load(), []);

  const authors = [
    {
      id: '1',
      firstName: 'Tom',
      lastName: 'Clancy',
    },
    {
      id: '2',
      firstName: 'Maxime',
      lastName: 'Decoster',
    },
    {
      id: '3',
      firstName: 'Paul',
      lastName: 'de Vries',
    },
  ];

  const genres = [
    {
      id: '1',
      name: 'Thriller',
    },
    {
      id: '2',
      name: 'Fantasy',
    },
    {
      id: '3',
      name: 'Romance',
    },
    {
      id: '4',
      name: 'Science-fiction',
    },
    {
      id: '5',
      name: 'Historical',
    },
    {
      id: '6',
      name: 'Biography',
    },
  ];

  const fBooks = books.filter((b) => b.name.toLowerCase().includes(searchInput.toLowerCase()),);
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
                  onKeyDown={(): void => {
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
              <form className="create_book_form" action="">
                <div className="title_group">
                  <label htmlFor="create_book_title">Title</label>
                  <input
                    name="create_book_title"
                    type="text"
                    id="title"
                    placeholder="Title"
                  />
                </div>
                <div className="author_group">
                  <label htmlFor="create_book_author">Author</label>
                  <select name="create_book_author" id="author">
                    {authors.map((author) => (
                      <option value={author.id}>
                        {author.firstName + ' ' + author.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="genres_group">
                  <label htmlFor="create_book_genres">Genres</label>
                  <div className="genresList">
                    {genres.map((genre) => (
                      <div className="genre_item">
                        <input type="checkbox" id={genre.name} />
                        <label htmlFor={genre.name}>{genre.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </section>
      </section>
      {/* BOOKS */}
    </>
  );
};

export default BooksPage;
