'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();

  return (
    <>
      Author details &apos;
      {id}
      &apos; not implemented
    </>
  );
};

export default AuthorDetailsPage;
