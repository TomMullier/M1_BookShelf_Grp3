'use client';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useBooksProviders } from '@/hooks';
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

const checkCommentPost = (): void => {
  let valid = true;
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
    const comment = {
      comment: (document.getElementById('post_comment') as HTMLInputElement)
        .value,
      date: new Date().toLocaleDateString(),
      author: author.value,
    };
    alert('Comment posted');
    console.log(comment);
  } else {
    alert('Please fill all the fields');
  }
};

const BooksDetailsPage: FC = () => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  const { id } = useParams();
  useEffect(() => load(), []);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  const handleDrawerClose = (): void => {
    setOpen(false);
  };

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

  return (
    <section className="layout_book">
      <section className="left_book">
        {/* Book owners */}
        <div className="book_owners">
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
        </div>
        {/* Book comments using drawers */}
        <Box
          sx={{
            display: 'flex',
            height: 'auto',
            width: '100%',
            backgroundColor: 'white',
            marginTop: '20px',
            borderRadius: '10px',
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
                <div
                  onClick={openModal}
                  className="book_comments_button"
                  title="Post a comment"
                >
                  <i className="fas fa-plus" />
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
              <Comment
                author={{
                  id: '1',
                  firstName: 'Author',
                  lastName: 'Author',
                }}
                date="Date"
              >
                ieohfbvozeih
              </Comment>
            </div>
          </Drawer>
        </Box>
      </section>
      <section className="right_book">
        {/* Books infos */}
        <div className="book_infos">
          <div className="book_image bg-book_cover bg-cover bg-center bg-no-repeat" />
          <div className="book_title">Titre</div>
          <div className="book_author">
            <div className="bg-people bg-cover bg-center bg-no-repeat" />
            <p>Auteur</p>
          </div>
          <ul className="book_genres">
            <li>Genre</li>
            <li>Genre</li>
            <li>Genre</li>
          </ul>
        </div>
        {/* Books actions */}
        <div className="book_actions">
          <div className="book_actions_title">Actions</div>
          <div className="book_actions_buttons">
            <div className="book_actions_button">Edit</div>
            <div className="book_actions_button">Delete</div>
            <div className="book_actions_button">Go to author page</div>
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
            <label htmlFor="post_comment">Comment</label>
            <textarea
              name="post_comment"
              id="post_comment"
              placeholder="Write your comment..."
            />
            {/* Selkect author */}
            <div className="select_author_container">
              <label htmlFor="post_author">Author</label>
              <select name="post_author" id="post_author">
                <option value="0">Select author</option>
                <option value="1">Author</option>
                <option value="2">Author</option>
                <option value="3">Author</option>
              </select>
            </div>

          </div>
        </form>
      </Modal>
    </section>
  );
};

export default BooksDetailsPage;
