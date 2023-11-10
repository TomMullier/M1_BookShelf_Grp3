import React, { FC, ReactNode, useState } from 'react';
import { GenreModel } from '@/models';
import { useGetGenre } from '@/hooks';
import { Sort } from '../../models/sort.model';

type ListItemProps = {
  children: ReactNode;
};

export const ListItem: FC<ListItemProps> = ({ children }) => (
  <div>{children}</div>
);

type BooksFilterProps = {
  sort: Sort;
  setSort: (input: Sort) => void;
  search: string;
  setSearch: (input: string) => void;
  filterTypes: GenreModel[];
  setFilterTypes: (input: GenreModel[]) => void;
};

export const BooksFilter: FC<BooksFilterProps> = ({
  sort,
  setSort,
  search,
  setSearch,
  filterTypes,
  setFilterTypes,
}) => {
  const genres = useGetGenre();

  const sorts: Sort[] = [{ field: 'Title' }, { field: 'Author' }];

  const [typeSelect, setTypeSelect] = useState<GenreModel>(genres[0]);

  const onSelectType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const selectedGenre = genres.find((genre) => genre.name === e.target.value);
    if (selectedGenre) {
      setTypeSelect(selectedGenre);
    }
  };

  const addType = (): void => {
    if (typeSelect) {
      setFilterTypes([...filterTypes, typeSelect]);
    }
  };

  const removeType = (type: (typeof genres)[0]): void => {
    setFilterTypes(filterTypes.filter((filterType) => filterType !== type));
  };

  // console.log(typeSelect);
  return (
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
      <select onChange={onSelectType}>
        {genres.map((genre) => (
          <option value={genre.name}>{genre.name}</option>
        ))}
      </select>
      <button type="button" onClick={addType}>
        <p>Add filter</p>
      </button>
      <br />
      {filterTypes.map((type) => (
        <button type="button" onClick={(): void => removeType(type)}>
          {type.name}
          {' X'}
        </button>
      ))}
      <br />
      {sorts.map((currentSort) => (
        <button
          type="button"
          onClick={(): void => setSort(currentSort)}
          disabled={sort.field === currentSort.field}
        >
          {currentSort.field}
        </button>
      ))}
    </div>
  );
};
