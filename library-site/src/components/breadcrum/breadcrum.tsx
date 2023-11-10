'use client';

import React, { FC, useEffect, useState } from 'react';

type BreadcrumProps = {
  url: string;
};
const returnBCHtml = (url: string): string => {
  const urlArray = url.split('/');
  let html = '';
  html += '<div class="breadcrum"><ol>';
  urlArray.forEach((element, index) => {
    if (index === 0) {
      html += "<li class='breadcrum_home breadcrum_item'>";
      if (url !== '/') html += "<a href='/'>Home</a>";
      else html += 'Home';
      html += '</li>';
    } else {
      const path = urlArray.slice(0, index + 1).join('/');
      const actual = urlArray[urlArray.length - 1];
      if (element !== '') {
        if (element === actual) {
          html += "<li class='breadcrum_separator'>/</li>";
          html += `<li class='breadcrum_item active'>${element}</li>`;
        } else {
          html += "<li class='breadcrum_separator'>/</li>";
          html += "<li class='breadcrum_item'>";
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
  }, [html, url]);
  // on a desactive l'erreur car on veut que le html soit interpreté
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Breadcrum;
