import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Book } from './Book';

export type CommentId = string & { __brand: 'Comment' };

@Entity('Comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CommentId;

  @Column()
  user: string;

  @Column()
  comment: string;

  @ManyToOne(() => Book, (book) => book.id, {
    onDelete: 'CASCADE',
  })
  book: Book;
}
