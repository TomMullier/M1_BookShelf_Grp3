import { Module } from '@nestjs/common';
import { RepositoryModule } from 'library-api/src/repositories/repository.module';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';
import { BookUseCases } from 'library-api/src/useCases/books/book.useCases';
import { GenreUseCases } from 'library-api/src/useCases/genres/genre.useCases';
import { CommentUseCases } from './comments/comment.useCases';

const useCases = [AuthorUseCases, BookUseCases, CommentUseCases, GenreUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
