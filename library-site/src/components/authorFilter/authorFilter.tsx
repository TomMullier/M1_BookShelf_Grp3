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
  sort: string;
  setSort: (input: string) => void;
};

export const AuthorFilter: FC<AuthorFilterProps> = ({
  sort,
  setSort,
  search,
  setSearch,
}) => (
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
    <input
      type="number"
      min="0"
      max="100"
      value={sort}
      onChange={(e): void => {
        e.preventDefault();
        setSort(e.target.value);
      }}
    />
  </div>
);
