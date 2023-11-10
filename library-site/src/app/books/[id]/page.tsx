'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { usePathname } from 'next/navigation';

// import { useParams } from 'next/navigation';
import { FC, ReactElement, useState } from 'react';
import { useGetOneBook, useGetGenre, useGetComment } from '@/hooks';
// import { useBooksProviders } from '@/hooks';
import Comment from '../../../components/comment/comment';
import Modal from '../../../components/modal/modal';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const BooksDetailsPage: FC = (): ReactElement => {
  // get id from url
  const url = usePathname();
  const id = url.split('/')[2];

  const { book, updateBook, deleteBook } = useGetOneBook(id);
  const genres = useGetGenre();
  const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false); // eslint-disable-line
  const { createComment } = useGetComment(id);
  const authorUrl = `/authors/${book?.author.id}`;
  const [open, setOpen] = useState(false);

  let drawerCont: HTMLElement | null;
  const handleDrawerOpen = (): void => {
    setOpen(true);
    drawerCont = document.querySelector('.MuiToolbar-root');
    setTimeout(() => {
      if (drawerCont) drawerCont.style.borderRadius = '0';
    }, 400);
  };
  const handleDrawerClose = (): void => {
    setOpen(false);
    if (document.querySelector('.MuiToolbar-root')) {
      document.querySelector('.MuiToolbar-root').style.borderRadius = '10px'; // eslint-disable-line
      // say that could be null, but made verification before
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEditBook, setIsModalOpenEditBook] = useState(false);
  const [isModalOpenDeleteBook, setIsModalOpenDeleteBook] = useState(false);

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
  const pathname = usePathname();
  const checkCommentPost = (): void => {
    let valid = true;
    const pathnameArray = pathname.split('/');
    const bookId = pathnameArray[pathnameArray.length - 1];
    const checkForm = document.querySelectorAll('.create_post_form textarea');
    checkForm.forEach((input) => {
      const h = input as HTMLInputElement;
      if (h.value === '') {
        valid = false;
      }
    });
    const author = document.getElementById('post_author') as HTMLInputElement;
    if (author.value === '0') {
      valid = false;
    }
    if (valid) {
      const Checomment = {
        comment: (document.getElementById('post_comment') as HTMLInputElement)
          .value,
        date: new Date().toLocaleDateString(),
        user: author.value,
        book: bookId,
        id: '1',
      };
      createComment(Checomment);
      setIsModalOpen(false);
      window.location.href = `/books/${bookId}`;
    } else {
      alert('Please fill all the fields'); // eslint-disable-line no-alert
    }
  };

  const closeModalEditBook = (): void => {
    setIsModalOpenEditBook(false);
  };

  const OpenModalEdit = (): void => {
    setIsModalOpenEditBook(true);
    // set Values
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsModalOpenEditBook(false);
        document.removeEventListener('keydown', () => {});
      }
    });
    setTimeout(() => {
      (document.getElementById('title') as HTMLInputElement).value = book?.name; 
      (document.getElementById('date') as HTMLInputElement).value =
        book?.writtenOn;
      const genresList = document.querySelectorAll('.genresList input');
      book?.genres.forEach((genre) => {
        genresList.forEach((genre2) => {
          if (genre === genre2.id) {
            genre2.checked = true; // eslint-disable-line
          }
        });
      });
    }, 100);
  };

  const closeModalDeleteBook = (): void => {
    setIsModalOpenDeleteBook(false);
  };

  const confirmDeleteBook = (): void => {
    setIsModalOpenDeleteBook(false);
    deleteBook();
    window.location.href = '/books';
  };

  const OpenModalDelete = (): void => {
    setIsModalOpenDeleteBook(true);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsModalOpenDeleteBook(false);
        document.removeEventListener('keydown', () => {});
      }
    });
  };

  const checkEditBook = (): void => {
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
      const Modbook = {
        name: (document.getElementById('title') as HTMLInputElement).value,
        author: book?.author,
        genres: genreChecked,
        writtenOn: (document.getElementById('date') as HTMLInputElement).value,
        id: book?.id,
        comments: book?.comments,
      };
      setIsModalOpenEditBook(false);
      updateBook(Modbook);
    } else {
      alert('Please fill all the fields'); // eslint-disable-line no-alert
    }
  };

  return (
    <section className="layout_book">
      <section className="left_book">
        {/* Book owners */}
        {/* We begun book owerns but didn't manage to finish it in time */}
        {/* <div className="book_owners">
          <div className="book_owners_title">Owners</div>
          <div className="book_owners_list">
            <div className="book_owners_item">
              <div className="bg-people bg-cover bg-center bg-no-repeat" />
              <p>Owner</p>
            </div>
            <div className="book_owners_item">
              <div className="bg-people bg-cover bg-center bg-no-repeat" />
              <p>Owner</p>
            </div>
            <div className="book_owners_item">
              <div className="bg-people bg-cover bg-center bg-no-repeat" />
              <p>Owner</p>
            </div>
          </div>
        </div> */}
        {/* Book comments using drawers */}
        <Box
          sx={{
            display: 'flex',
            height: 'auto',
            width: '100%',
            backgroundColor: 'white',
            marginTop: '20px',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          <CssBaseline />
          <AppBar position="relative" open={open} className="book_comments_bar">
            <Toolbar
              sx={{
                ...(open && {
                  backgroundColor: 'white',
                  transition: 'background 0s',
                  transitionDelay: '400ms',
                }),
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
                sx={{ mr: 2, ...(!open && { display: 'none' }) }}
              >
                <KeyboardArrowDownIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                component="div"
                className="drawer_header_title"
              >
                <p>Comments</p>
                {/* Add button */}
                {/* Pas besoin de keyboard listener */}
                {/* eslint-disable-next-line */}
                <div
                  onClick={openModal}
                  className="book_comments_button"
                  title="Post a comment"
                >
                  <i aria-hidden className="fas fa-plus" />
                </div>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor="top"
            open={open}
            className="book_comments_wrapper"
            transitionDuration={{ enter: 500, exit: 1000 }}
          >
            <div className="comments">
              {book?.comments.map((commentOne) => (
                <Comment
                  name={commentOne.id}
                  author={commentOne.user}
                  date={commentOne.date}
                >
                  {commentOne.comment}
                </Comment>
              ))}
            </div>
          </Drawer>
        </Box>
      </section>
      <section className="right_book">
        {/* Books infos */}
        <div className="book_infos">
          <div className="book_image bg-book_cover bg-cover bg-center bg-no-repeat" />
          <div className="book_title">{book?.name}</div>
          <div className="book_author">
            <div className="bg-people bg-cover bg-center bg-no-repeat" />
            <p>
              {/* eslint-disable-next-line */}
              {book?.author.firstName}
              {' '}
              {book?.author.lastName}
            </p>
          </div>
          <ul className="book_genres">
            {book?.genres.map((genre) => <li id={genre}>{genre}</li>)}
          </ul>
        </div>
        {/* Books actions */}
        <div className="book_actions">
          <div className="book_actions_title">Actions</div>
          <div className="book_actions_buttons">
            {/* Pas besoin de keyboard listener */}
            {/* eslint-disable-next-line */}
            <div className="book_actions_button" onClick={OpenModalEdit}>
              Edit
            </div>
            {/* Pas besoin de keyboard listener */}
            {/* eslint-disable-next-line */}
            <div className="book_actions_button" onClick={OpenModalDelete}>
              Delete
            </div>
            <a className="book_actions_button" href={authorUrl}>
              {' '}
              Go to author page
            </a>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onSubmit={checkCommentPost}
        title="Post a comment"
      >
        <form className="create_post_form" action="">
          <div className="title_group">
            {/* Ne prend pas en compte le htmlFor */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="post_comment">Comment</label>
            <textarea
              name="post_comment"
              id="post_comment"
              placeholder="Write your comment..."
            />
            {/* Selkect author */}
            <div className="select_author_container">
              {/* Ne prend pas en compte le htmlFor */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="post_author">User</label>
              <input
                type="text"
                className="post_author"
                placeholder="User name"
                id="post_author"
              />
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isModalOpenEditBook}
        onCancel={closeModalEditBook}
        onSubmit={checkEditBook}
        title="Edit a book"
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
          {/* <div className="author_group">
            /* Ne prend pas en compte mon htmlFor
            /* eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label htmlFor="create_book_author">Author</label>
            <select name="create_book_author" id="author">
              {authors.map((author) => (
                <option value={author.id}>
                  {`${author.firstName} ${author.lastName}`}
                </option>
              ))}
            </select>
          </div> */}
          <div className="date_group">
            {/* Ne prend pas en compte mon htmlFor */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="create_book_date">Written on </label>
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
      <Modal
        isOpen={isModalOpenDeleteBook}
        onCancel={closeModalDeleteBook}
        onSubmit={confirmDeleteBook}
        title="Delete a book"
      >
        <h2 className="delete_text">
          Are you sure you want to delete this book ?
        </h2>
      </Modal>
    </section>
  );
};

export default BooksDetailsPage;
