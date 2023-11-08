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
          <a href="/" className="website_title">
            <i className="fas fa-book" />
            <h1>Library</h1>
          </a>
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
            {/* <div className="menu_item">
              <i className="fas fa-users" />
              <a href="/users">Utilisateurs</a>
            </div> */}
          </div>
        </div>
        <div className="right_side">
          <div className="top_bar" />
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
