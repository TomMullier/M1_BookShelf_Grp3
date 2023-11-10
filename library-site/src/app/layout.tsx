'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Breadcrumb from '../components/breadcrum/breadcrum';

const inter = Inter({ subsets: ['latin'] });
/**
 * Root layer of the application
 * @param children
 * @returns
 */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Library</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://kit.fontawesome.com/b89837f3ad.js" />
      </head>
      <body className={inter.className}>
        <div className="left_side">
          <a href="/" className="website_title">
            <i aria-hidden className="fas fa-book" />
            <h1>Library</h1>
          </a>
          <div className="menu">
            <div className="menu_item">
              <i aria-hidden className="fas fa-home" />
              <a href="/">Home</a>
            </div>
            <div className="menu_item">
              <i aria-hidden className="fas fa-book" />
              <a href="/books">Books</a>
            </div>
            <div className="menu_item">
              <i aria-hidden className="fas fa-user" />
              <a href="/authors">Authors</a>
            </div>
          </div>
        </div>
        <div className="right_side">
          <div className="top_bar">
            {/* Breadcrum */}
            <Breadcrumb url={pathname} />
          </div>
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
