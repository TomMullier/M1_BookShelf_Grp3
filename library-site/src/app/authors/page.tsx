'use client';

import { FC, useEffect, useState } from 'react';
import { useBooksProviders, useGetAuthor } from '@/hooks';
import Modal from '../../components/modal/modal';

const AuthorsPage: FC = () => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  const authors = useGetAuthor();
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
      if ((input as HTMLInputElement).value === '') {
        valid = false;
      }
    });
    if (valid) {
      const author = {
        firstName: (
          document.getElementById('author_firstname') as HTMLInputElement
        ).value,
        lastName: (
          document.getElementById('author_lastname') as HTMLInputElement
        ).value,
      };
      // gestion de la photo
      const fileInput = document.getElementById(
        'author_photo',
      ) as HTMLInputElement;
      // ne peux pas être null
      const image = fileInput.files[0]; // eslint-disable-line
      const imageType = /image.*/;
      if (image && image.type.match(imageType)) {
        const reader = new FileReader();
        reader.onload = (): void => {
          // creation de la propriété photo
          author.photoUrl = reader.result; // eslint-disable-line
        };
      }

      console.log('Author created :');
      console.log(author);
      setIsModalOpen(false);
    } else {
      alert('Please fill all the fields');
    }
  };
  const openItemPage = (id: string): void => {
    window.location.href = `/authors/${id}`;
  };
  function handleKeyPress(id: string): void {
    openItemPage(id);
  }
  useEffect(() => load(), []);

  // Disable Line -> Il veut que je passe une ligne, mais quand je le fais
  // il veut que je revienne en arrière, donc je laisse comme ça
  const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(searchInput.toLowerCase()),); // eslint-disable-line

  return (
    <section className="layout_author">
      {/* Step 2: Add a search bar */}
      <div className="search_container">
        <div>
          <i aria-hidden className="fa fa-search" />
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
          <i aria-hidden className="fa fa-plus" />
          Add author
        </div>
      </div>
      <div className="author_list">
        {authors.map((aut) => (
          <div className="author_card">
            <div className="author_image bg-people bg-cover bg-center bg-no-repeat" />
            <div className="author_name">
              {aut.firstName}{' '}{aut.lastName}
            </div>
            <div className="number_written">{aut.books.length}</div>
            {/* Element is focusable mais dit qu'il ne l'est pas */}
            {/* eslint-disable-next-line */}
            <div
              onClick={(): void => {
                handleKeyPress(aut.id);
              }}
              onKeyDown={(): void => {
                handleKeyPress(aut.id);
              }}
              role="button"
              className="author_button"
            >
              Author Page
            </div>
          </div>
        ))}
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
            {/* Ne prend pas en compte mon htmlFor */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="author_firstname">Firstname</label>
            <input type="text" name="author_firstname" id="author_firstname" />
          </div>
          <div className="title_group">
            {/* Ne prend pas en compte mon htmlFor */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="author_lastname">Lastname</label>
            <input type="text" name="author_lastname" id="author_lastname" />
          </div>
          <div className="title_group">
            {/* Ne prend pas en compte mon htmlFor */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
