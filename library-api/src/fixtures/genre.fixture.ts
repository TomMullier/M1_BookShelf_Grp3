import { faker } from '@faker-js/faker';
import { Genre, GenreId } from '../entities';

export const genreFixture = (): Genre =>
  ({
    id: faker.string.uuid() as GenreId,
    name: faker.string.sample(8),
  }) as Genre;
