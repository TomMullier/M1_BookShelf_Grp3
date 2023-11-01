'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import 'flowbite';

const BooksDetailsPage: FC = () => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  const { id } = useParams();
  useEffect(() => load(), [load]);
  console.log(id[0]); // use with id
  return (
    <section className="layout_book">
      <section className="left_side_book">
        <section className="top_container">
          <div className="book_top_section top_section shadow-md">
            <div className="image_ bg-book_cover bg-contain bg-right bg-no-repeat" />
            <div className="text">
              {books.length > 0 && books[0] && <h1>{books[0].name}</h1>}
              {books.length > 0 && books[0] && <h1>{books[0].genres}</h1>}
            </div>
          </div>
          <div className="book_number_container number_container shadow-md">
            <div className="pp bg-people bg-cover bg-center" />
            {books.length > 0 && books[0] && (
              <h1>{books[0].author.firstName}</h1>
            )}
            {books.length > 0 && books[0] && (
              <h1>{books[0].author.lastName}</h1>
            )}
          </div>
        </section>
        <div className="flex flex-row items-center justify-center flex-wrap bg-white_1 w-full rounded-md p-20 shadow-md mt-10">
          <h1>Personnes posssédant le livre</h1>
        </div>
        <div className="flex flex-row items-center justify-center flex-wrap bg-white_1 w-full rounded-md mt-10 p-20 shadow-md">
          <h1>Commentaires</h1>
        </div>
      </section>
    </section>
  );
};

export default BooksDetailsPage;
