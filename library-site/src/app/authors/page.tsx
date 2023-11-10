'use client';

import { FC, useEffect, useState } from 'react';
import { useAuthorProviders, useGetAuthorSpecific } from '@/hooks';
import Modal from '../../components/modal/modal';
import { AuthorFilter } from '../../components/authorFilter/authorFilter';

const AuthorsPage: FC = () => {
  // const { useListBooks } = useBooksProviders();
  const { createAuthor } = useGetAuthorSpecific('id');
  const [search, setSearchInput] = useState('');
  const [sort, setSort] = useState('');

  const { useGetAuthor } = useAuthorProviders({ search, sort });
  const { authors, loadauthor } = useGetAuthor();

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
      const Addauthor = {
        firstName: (
          document.getElementById('author_firstname') as HTMLInputElement
        ).value,
        lastName: (
          document.getElementById('author_lastname') as HTMLInputElement
        ).value,
        books: [],
        id: '1',
        photoUrl: '',
      };
      // gestion de la photo
      // const fileInput = document.getElementById(
      //   'author_photo',
      // ) as HTMLInputElement;

      // const image = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (): void => {
        Addauthor.photoUrl = reader.result as string;
      };

      setIsModalOpen(false);
      createAuthor(Addauthor);
      window.location.reload();
    } else {
      // on a besoin du alert pour indiquer de manière visuelle que le formulaire n'est pas rempli
      // eslint-disable-next-line no-alert
      alert('Please fill all the fields');
    }
  };

  const openItemPage = (id: string): void => {
    window.location.href = `/authors/${id}`;
  };
  function handleKeyPress(id: string): void {
    openItemPage(id);
  }

  useEffect(() => loadauthor(), [loadauthor]);

  return (
    <section className="layout_author">
      {/* Step 2: Add a search bar */}
      <div className="search_container">
        <div>
          <AuthorFilter
            search={search}
            setSearch={setSearchInput}
            sort={sort}
            setSort={setSort}
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
          <div key={aut.firstName} className="author_card">
            <div className="author_image bg-people bg-cover bg-center bg-no-repeat" />
            <div className="author_name">
              {aut.firstName}
              {aut.lastName}
            </div>
            <div className="number_written">{aut.books.length}</div>
            <div
              onClick={(): void => {
                handleKeyPress(aut.id);
              }}
              onKeyDown={(): void => {
                handleKeyPress(aut.id);
              }}
              role="button"
              tabIndex={0}
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
