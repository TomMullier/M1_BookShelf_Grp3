import { FC, ReactElement } from 'react';

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

const Home: FC = (): ReactElement => (
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
        <div className="opened_button">See on map</div>
      </div>
    </div>
    <div className="home_discover">
      <div className="discover_title">Discover</div>
      <div className="discover_text">Book recommendations</div>
      <div className="home_books_elements">
        <div className="book_item bg-book_cover bg-cover bg-center bg-no-repeat" />
        <div className="book_item bg-book_cover bg-cover bg-center bg-no-repeat" />
        <div className="book_item bg-book_cover bg-cover bg-center bg-no-repeat" />
        <div className="book_item bg-book_cover bg-cover bg-center bg-no-repeat" />
        <div className="book_item bg-book_cover bg-cover bg-center bg-no-repeat" />
      </div>
    </div>
  </section>
);

export default Home;
