import { FC, ReactNode } from 'react';

type AuthorItemProps = {
  children: ReactNode;
};

export const AuthorItem: FC<AuthorItemProps> = ({ children }) => (
  <div>{children}</div>
);

type AuthorFilterProps = {
  search: string;
  setSearch: (input: string) => void;
};

export const AuthorFilter: FC<AuthorFilterProps> = ({ search, setSearch }) => (
  <div>
    <input
      type="text"
      value={search}
      onChange={(e): void => {
        e.preventDefault();
        setSearch(e.target.value);
      }}
    />
    <br />
  </div>
);
