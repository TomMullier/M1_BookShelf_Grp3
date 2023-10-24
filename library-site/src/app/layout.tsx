import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <title>Library</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script src="https://kit.fontawesome.com/b89837f3ad.js" /> {/*eslint-disable-line*/}
      <body className={inter.className}>
        <div className="left_side">
          <div className="website_title">
            <i className="fas fa-book" />
            <h1>Library</h1>
          </div>
          <div className="menu">
            <div className="menu_item">
              <i className="fas fa-home" />
              <a href="/">Home</a>
            </div>
            <div className="menu_item">
              <i className="fas fa-book" />
              <a href="/books">Books</a>
            </div>
            <div className="menu_item">
              <i className="fas fa-user" />
              <a href="/authors">Authors</a>
            </div>
            <div className="menu_item">
              <i className="fas fa-users" />
              <a href="/users">Utilisateurs</a>
            </div>
          </div>
        </div>
        <div className="right_side">
          <div className="top_bar">
            <input
              type="text"
              name="search"
              id="search_book"
              placeholder="Search"
            />
            <div className="right_pp">
              <div className="pp bg-people bg-cover bg-center" />
              <div className="pp_name">
                <h3>Xavier Dupont</h3>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
