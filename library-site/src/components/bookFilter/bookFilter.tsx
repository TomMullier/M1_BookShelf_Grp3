import React, { FC, ReactNode, useState } from 'react';
import { GenreModel, Sort } from '@/models';
import { useGetGenre } from '@/hooks';

// declaration types
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

// Composant de filtre pour les livres
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

  // ajoute le type sélectionné dans le tableau des filtres
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

  // retire le type sélectionné du tableau des filtres
  const removeType = (type: (typeof genres)[0]): void => {
    setFilterTypes(filterTypes.filter((filterType) => filterType !== type));
  };

  // console.log(typeSelect);
  return (
    <div>
      <div>
        <i aria-hidden className="fa-solid fa-search" />
        <input
          type="text"
          value={search}
          onChange={(e): void => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
      </div>
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
        <button
          className="filter_item active"
          type="button"
          onClick={(): void => removeType(type)}
        >
          {type.name}
          {' X'}
        </button>
      ))}
      <br />
      <div className="filter_container">
        <div className="filter_title">Filter by :</div>
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
