'use client';

import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import Modal from '../../../components/modal/modal';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();

  const openItemPage = (id: number): void => {
    window.location.href = `/books/${id}`;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleKeyPress(id: number): void {
    openItemPage(id);
  }
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
        photo: (document.getElementById('author_photo') as HTMLInputElement)
          .value,
      };
      alert('Author created');
      console.log(author);
      setIsModalOpen(false);
    } else {
      alert('Please fill all the fields');
    }
  };
  return (
    <section className="layout_book">
      <section className="left_book_author">
        {/* Book List */}
        <h1>Book List</h1>
        <div className="book_list_author">
          <div className="book_list_author_item" onClick={(): void => {
                handleKeyPress(0);
              }}
              onKeyDown={(): void => {
                handleKeyPress(0);
              }}
              role="button">
            <div className="book_list_author_item_image bg-book_cover bg-center bg-no-repeat bg-cover" />
            <div className="book_list_author_item_name">Book</div>
          </div>
        </div>
      </section>
      <section className="right_book">
        {/* Author informations */}
        <div className="author_informations">
          <div className="author_informations_title">Informations</div>
          <div className="author_informations_list">
            <div className="author_informations_item">
              <div className="bg-people bg-cover bg-center bg-no-repeat" />
            </div>
            <div className="author_informations_item">
              <span>Firstname :</span>
              <p>Author</p>
            </div>
            <div className="author_informations_item">
              <span>Lastname :</span>
              <p>Author</p>
            </div>
          </div>
          <div className="actions_container">
            <div className="button_author_edit" onClick={openModal}>
              Edit
            </div>
            <div className="button_author_delete">Delete</div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onSubmit={CheckAuthorCreation}
        title="Edit author informations"
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
      {/* confirm delete modal
      <Modal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onSubmit={CheckAuthorCreation}
        title="Delete author"
      >
        <form className="create_author_form" action="">
          <div className="title_group">
            <p>Are you sure you want to delete this author ?</p>
          </div>
        </form>
      </Modal> */}
    </section>
  );
};

export default AuthorDetailsPage;
