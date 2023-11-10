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

let setzero = true;
export const AuthorFilter: FC<AuthorFilterProps> = ({ setSort, setSearch }) => (
  <div className="flex flex-row">
    <div className="flex flex-row items-center">
      <i aria-hidden className="fa-solid fa-search flex" />
      <input
        type="text"
        className="w-12"
        onChange={(e): void => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
    </div>
    <input
      type="number"
      min="-1"
      max="100"
      className="w-12"
      onChange={(e): void => {
        e.preventDefault();
        if (e.target.value === '-1') {
          e.target.value = '';
          setzero = true;
        }
        if (setzero && e.target.value === '1') {
          e.target.value = '0';
          setzero = false;
        }
        setSort(e.target.value);
      }}
    />
  </div>
);
