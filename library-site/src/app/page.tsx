'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';

const getOpening = (): string => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDay();
  if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0) || day === 0) {
    return 'Currently closed';
  }
  return 'Currently opened';
};

/**
 * Home Page of the application
 * @returns
 */
const Home: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  useEffect(() => load());

  const openItemPage = (id: string): void => {
    window.location.href = `/books/${id}`;
  };

  function handleKeyPress(id: string): void {
    openItemPage(id);
  }

  return (
    <section>
      <div className="home_container_top">
        <div className="your_library_card">
          <div className="text">
            <h1>Your library</h1>
            <h2>41 Vauban Street, 59000 Lille</h2>
            <h3>Phone : 01 23 45 67 89</h3>
            <div className="opening">
              <h3>Opening hours :</h3>
              <p>Monday : 9:00 - 18:00</p>
              <p>Tuesday : 9:00 - 18:00</p>
              <p>Wednesday : 9:00 - 18:00</p>
              <p>Thursday : 9:00 - 18:00</p>
              <p>Friday : 9:00 - 18:00</p>
              <p>Saturday : 10:00 - 18:00</p>
              <p>Sunday : Closed</p>
            </div>
          </div>
          <div className="image_ bg-library bg-contain bg-right bg-no-repeat" />
        </div>
        <div className="opened">
          <div id="opened_title" className="opened_title">
            {getOpening()}
          </div>

          <div className="opened_text">Come and visit us !</div>
          <a
            target="_blank"
            href="https://www.google.fr/maps/place/41+Bd+Vauban,+59000+Lille/@50.6340373,3.0461707,17z/data=!3m1!4b1!4m6!3m5!1s0x47c2d578c8d161ab:0x23fd816717322432!8m2!3d50.6340339!4d3.0487456!16s%2Fg%2F11b8v808d8?entry=ttu"
            className="opened_button"
            rel="noreferrer"
          >
            See on map
          </a>
        </div>
      </div>
      <div className="home_discover">
        <div className="discover_title">Discover</div>
        <div className="discover_text">Book recommendations</div>
        <div className="home_books_elements">
          {books.slice(0, 5).map((book) => (
            <div
              className="book_item"
              id={book.id}
              onClick={(): void => {
                handleKeyPress(book.id);
              }}
              role="button"
              tabIndex={0}
              key={book.id}
              onKeyDown={(): void => {
                handleKeyPress(book.id);
              }}
            >
              <div className=" bg-book_cover bg-cover bg-center bg-no-repeat" />

              <div className="book_item_title">{book.name}</div>
              <div className="book_item_author">
                {`${book.author.firstName} ${book.author.lastName}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
