'use client';

import { FC, useEffect, useState } from 'react';
import { useBooksProviders } from '@/hooks';
import Modal from '../../components/modal/modal';

const AuthorsPage: FC = () => {
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

  const CheckAuthorCreation = (): void => {
    let valid = true;
    const checkForm = document.querySelectorAll('.create_author_form input');
    checkForm.forEach((input) => {
      if (input.value === '') {
        valid = false;
      }
    });
    if (valid) {
      const author = {
        firstname: (
          document.getElementById('author_firstname') as HTMLInputElement
        ).value,
        lastname: (
          document.getElementById('author_lastname') as HTMLInputElement
        ).value,
        photo: (
          document.getElementById('author_photo') as HTMLInputElement
        ).value,
      };
      alert('Author created');
      console.log(author);
      setIsModalOpen(false);
    } else {
      alert('Please fill all the fields');
    }
  };
  const openItemPage = (id: number): void => {
    window.location.href = `/authors/${id}`;
  };
  function handleKeyPress(id: number): void {
    openItemPage(id);
  }
  useEffect(() => load(), []);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <section className="layout_author">
      {/* Step 2: Add a search bar */}
      <div className="search_container">
        <div>
          <i className="fa fa-search" />
          <input
            type="text"
            placeholder="Search by author"
            value={searchInput}
            onChange={(e): void => setSearchInput(e.target.value)}
          />
        </div>
        <div
          className="add_author_container"
          onClick={openModal}
          onKeyDown={openModal}
          role="button"
          tabIndex={0}
        >
          <i className="fa fa-plus" />
          Add author
        </div>
      </div>
      <div className="author_list">
        <div className="author_card">
          <div className="author_image bg-people bg-cover bg-center bg-no-repeat" />
          <div className="author_name">Author</div>
          <div className="number_written">4</div>
          <div
            onClick={(): void => {
              handleKeyPress(0);
            }}
            onKeyDown={(): void => {
              handleKeyPress(0);
            }}
            role="button"
            className="author_button"
          >
            Author Page
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onSubmit={CheckAuthorCreation}
        title="Add author"
      >
        <form className="create_author_form" action="">
          {/* Firstname, Lastname, Photo */}
          <div className="title_group">
            <label htmlFor="author_firstname">Firstname</label>
            <input type="text" name="author_firstname" id="author_firstname" />
          </div>
          <div className="title_group">
            <label htmlFor="author_lastname">Lastname</label>
            <input type="text" name="author_lastname" id="author_lastname" />
          </div>
          <div className="title_group">
            <label htmlFor="author_photo">Photo</label>
            <input
              type="file"
              name="author_photo"
              id="author_photo"
              className="inputfile"
            />
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default AuthorsPage;
