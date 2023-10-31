/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

export type AuthorId = string & { __brand: 'Author' };

@Entity('Authors')
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
