'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

type BreadcrumProps = {
  url: string;
};
const returnBCHtml = (url: string): string => {
  const urlArray = url.split('/');
  let html = '';
  html += '<div class = "breadcrum"><ol>';
  console.log(url);
  urlArray.forEach((element, index) => {
    if (index === 0) {
      html += "<li className='breadcrum_home breadcrum_item'>";
      if (url !== '/') html += "<a href='/'>Home</a>";
      else html += 'Home';
      html += '</li>';
    } else {
      const path = urlArray.slice(0, index + 1).join('/');
      const actual = urlArray[urlArray.length - 1];
      if (element !== '') {
        if (element === actual) {
          html += "<li className='breadcrum_separator'>/</li>";
          html += `<li className='breadcrum_item active'>${element}</li>`;
        } else {
          html += "<li className='breadcrum_separator'>/</li>";
          html += "<li className='breadcrum_item'>";
          html += `<a href='${path}'>${element}</a>`;
          html += '</li>';
        }
      }
    }
  });
  html += '</ol></div>';
  return html;
};
const Breadcrum: FC<BreadcrumProps> = ({ url }) => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    setHtml(returnBCHtml(url));
  }, [html]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Breadcrum;
