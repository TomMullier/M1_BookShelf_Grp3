'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import 'flowbite';

const BooksDetailsPage: FC = () => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();
  const { id } = useParams();
  useEffect(() => load(), []);
  console.log(id[0]); // use with id
  return (
    <section className="layout_book">
      <section className="left_side_book">
        <section className="top_container">
          <div className="book_top_section top_section shadow-md">
            <div className="w-80 h-72 flex bg-book_cover bg-contain bg-right bg-no-repeat" />
            <div className="flex flex-col ">
              {books.length > 0 && books[id] && <h1 className="text-6xl">{books[id].name}</h1>}
              {books.length > 0 && books[id] && <h1>{books[id].genres.map((genre)=><h1>{genre}</h1>)}</h1>}
            </div>
          </div>
          <div className="book_number_container number_container shadow-md">
            <div className="image_ bg-people bg-contain bg-right bg-no-repeat w-64 h-64 flex" />
            <div className="flex flex-row m-0">
              {books.length > 0 && books[id] && (
                <h1 className="pr-1">{books[id].author.firstName}</h1>
              )}
              {books.length > 0 && books[id] && (
                <h1>{books[id].author.lastName}</h1>
              )}
            </div>
          </div>
        </section>
        <div className="flex flex-row items-center justify-center flex-wrap bg-white_1 w-full rounded-md p-20 shadow-md mt-10">
          <h1>Personnes posssédant le livre :</h1>
          <div className="people_container"></div>
        </div>
        <div className="flex flex-row items-center justify-center flex-wrap bg-white_1 w-full rounded-md mt-10 p-20 shadow-md">
          <h1>Commentaires</h1>
        </div>
      </section>
    </section>
  );
};

export default BooksDetailsPage;
