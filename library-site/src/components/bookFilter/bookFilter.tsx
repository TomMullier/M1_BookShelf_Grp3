import React, { FC, ReactNode, useState } from 'react';
import { GenreModel, Sort } from '@/models';
import { useGetGenre } from '@/hooks';

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
      if (
        // si on fait un retour à la ligne, il demande de le retirer
        // et inversement
        // eslint-disable-next-line prettier/prettier
        filterTypes.find((filterType) => filterType === typeSelect) === undefined
      ) {
        setFilterTypes([...filterTypes, typeSelect]);
      }
    }
  };

  const removeType = (type: (typeof genres)[0]): void => {
    setFilterTypes(filterTypes.filter((filterType) => filterType !== type));
  };

  // console.log(typeSelect);
  return (
    <div>
      <div className="searchBook">
        <i aria-hidden className="fa-solid fa-search" />
        <input
          type="text"
          value={search}
          placeholder="Search by title"
          onChange={(e): void => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="select_filter_container">
        <select className="selectFilter" onChange={onSelectType}>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <button className="labelSelect" type="button" onClick={addType}>
          <p>Add filter</p>
        </button>
      </div>

      <div className="filter_buttons_container">
        {filterTypes.map((type) => (
          <button
            className="filter_item active"
            type="button"
            onClick={(): void => removeType(type)}
          >
            {type.name}
            <i aria-hidden className="fa-solid fa-xmark" />
          </button>
        ))}
      </div>
      <div className="filter_container">
        <div className="filter_title">Order by :</div>
        {sorts.map((currentSort) => (
          <button
            type="button"
            className="filter_item active"
            onClick={(): void => setSort(currentSort)}
            disabled={sort.field === currentSort.field}
          >
            {currentSort.field}
          </button>
        ))}
      </div>
    </div>
  );
};
