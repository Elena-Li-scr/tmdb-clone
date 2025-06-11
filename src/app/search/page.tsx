import { fetchMoviesByKeyword, fetchMovies } from '@/server/api';
import MovieList from './MovieList';
import MovieSearchPagination from './MovieSearchPagination';

export default async function MoviePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;

  const pageNumber = parseInt(page, 10);
  const { data: movies, total } = await fetchMoviesByKeyword(query, pageNumber);
  const moviesStart = await fetchMovies();

  return (
    <>
      <MovieList
        movies={movies}
        searchQuery={query}
        moviesStart={moviesStart}
      />
      <MovieSearchPagination
        movies={movies}
        total={total}
        currentPage={pageNumber}
        searchQuery={query}
      />
    </>
  );
}
