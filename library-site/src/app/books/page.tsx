'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import { useBooksProviders } from '@/hooks';
import Modal from '../../components/modal/modal';

// type bookfilter = {
//  search: string;
//  setSearch: (input: string) => void;
// };

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
      if ((input as HTMLInputElement).value === '') {
        valid = false;
      }
    });
    const genresList = document.querySelectorAll('.genresList input');
    const genreChecked: string[] = [];
    genresList.forEach((genre) => {
      if ((genre as HTMLInputElement).checked) {
        genreChecked.push(genre.id);
      }
    });
    if (genreChecked.length === 0) {
      valid = false;
    }
    if (valid) {
      const book = {
        name: (document.getElementById('title') as HTMLInputElement).value,
        author: {
          firstName:
            authors[
              parseInt(
                (document.getElementById('author') as HTMLInputElement).value,
                10,
              ) - 1
            ].firstName,
          lastName:
            authors[
              parseInt(
                (document.getElementById('author') as HTMLInputElement).value,
                10,
              ) - 1
            ].lastName,
        },
        genres: genreChecked,
        writtenOn: (document.getElementById('date') as HTMLInputElement).value,
      };
      setIsModalOpen(false);
      console.log('Book Created');
      console.log(book);
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

  const fBooks = books.filter((b) => b.name.toLowerCase().includes(searchInput.toLowerCase())); {/* eslint-disable-line */}
  // Disable Line -> Il veut que je passe une ligne, mais quand je le fais
  // il veut que je revienne en arrière, donc je laisse comme ça
  return (
    <section className="layout_book">
      <section className="left_side_book">
        <section className="top_container">
          <div className="books_top_section top_section shadow-md">
            <div className="text">
              <h1 className="welcome">Hello !</h1>
              <p>Selection of the best books, just for you</p>
              <a href="/" className="latest">
                Show latest
              </a>
            </div>
            <div className="image_ bg-book_fly bg-contain bg-right bg-no-repeat" />
          </div>
          <div className="number_container book_number_container shadow-md">
            <h1>
              There
              {books.length > 1 ? ' are ' : ' is '}
              currently
            </h1>
            <h2>{books.length}</h2>
            <p>{books.length > 1 ? 'books' : 'book'}</p>
          </div>
        </section>
        <div className="books_container shadow-md">
          <div className="books_option_container">
            <div className="search_container">
              <i aria-hidden className="fa-solid fa-search" />
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
                  <a
                    href={`/authors/${book.author.id}`}
                    className="book_author"
                  >
                    {`${book.author.firstName}${book.author.lastName}`}
                  </a>
                  <div className="book_category flex">
                    {book.genres.map((genre) => (
                      <p className="pr-1">{genre}</p>
                    ))}
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
                {/* Ne prend pas en compte mon htmlFor */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="title">Title</label>
                <input
                  name="create_book_title"
                  type="text"
                  id="title"
                  placeholder="Title"
                />
              </div>
              <div className="author_group">
                {/* Ne prend pas en compte mon htmlFor */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="create_book_author">Author</label>
                <select name="create_book_author" id="author">
                  {authors.map((author) => (
                    <option value={author.id}>
                      {`${author.firstName} ${author.lastName}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="date_group">
                {/* Ne prend pas en compte mon htmlFor */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="create_book_date">Genres</label>
                <input name="create_book_date" type="date" id="date" />
              </div>
              <div className="genres_group">
                {/* Ne prend pas en compte mon htmlFor */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
  );
};

export default BooksPage;
