'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import {
  useBooksProviders,
  useGetOneBook,
  useGetAuthor,
  useGetGenre,
  useAuthorProviders,
} from '@/hooks';

import { GenreModel } from '@/models';
import { Sort } from '../../models/sort.model';
import Modal from '../../components/modal/modal';
import { BooksList } from '../../components/ListItem/ListItem';
import { BooksFilter } from '../../components/bookFilter/bookFilter';

const BooksPage: FC = (): ReactElement => {
  const { createBook } = useGetOneBook('id');
  const genres = useGetGenre();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearchInput] = useState('');
  const [filterTypes, setFilterTypes] = useState<GenreModel[]>([]);
  const [sort, setSort] = useState<Sort>({ field: 'Title' });

  const { useGetAuthor } = useAuthorProviders({ search, sort });
  const { authors, loadauthor } = useGetAuthor();

  const { useListBooks } = useBooksProviders({ sort, search, genre: filterTypes });
  const { books, load } = useListBooks();

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

  const checkCreateBook = (): void => {
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
          firstName: (
            document.getElementById('author') as HTMLSelectElement
          ).value.split(' ')[0],
          lastName: (
            document.getElementById('author') as HTMLSelectElement
          ).value.split(' ')[1],
        },
        genres: genreChecked,
        writtenOn: (document.getElementById('date') as HTMLInputElement).value,
        id: 'id',
        comments: [],
      };
      setIsModalOpen(false);
      console.log('Book Created');
      console.log(book);
      createBook(book);
    } else {
      alert('Please fill all the fields');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => load(), []); // if [load] reload element infinite loop

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
              <BooksFilter
                sort={sort}
                setSort={setSort}
                search={search}
                setSearch={setSearchInput}
                filterTypes={filterTypes}
                setFilterTypes={setFilterTypes}
              />
            </div>
          </div>
          <div className="books_list">
            {books.map((book) => (
              <BooksList key={book.id} book={book} />
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
            onSubmit={checkCreateBook}
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
                    <option value={`${author.firstName} ${author.lastName}`}>
                      {`${author.firstName} ${author.lastName}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="date_group">
                {/* Ne prend pas en compte mon htmlFor */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="create_book_date">Date</label>
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
