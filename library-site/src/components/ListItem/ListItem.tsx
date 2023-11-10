import { FC, ReactNode } from 'react';
import { GenreModel, PlainBookModel } from '@/models';

type ListItemProps = {
  children: ReactNode;
};

export const ListItem: FC<ListItemProps> = ({ children }) => (
  <div>{children}</div>
);

const openItemPage = (id: number): void => {
  window.location.href = `/books/${id}`;
};

function handleKeyPress(id: number): void {
  openItemPage(id);
}

type BooksProps = {
  book: PlainBookModel;
};

export const BooksList: FC<BooksProps> = ({ book }) => (
  <ListItem>
    <div
      className="book_item"
      key="book.id"
      id={book.id}
      onClick={(): void => {
        handleKeyPress(book.id);
      }}
      onKeyDown={(): void => {
        handleKeyPress(book.id);
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
          {book.genres.map((genre: GenreModel) => (
            <p key={genre.name} className="pr-1">
              {genre.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  </ListItem>
);
