export type Genres = {
  id: string;
  name: string;
};

export type PlainBookModel = {
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  id: string;
  name: string;
  genres: Genres[];
};
