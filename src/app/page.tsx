import { fetchMoviesByKeyword } from '@/server/api';
import MovieList from '@/components/MovieList';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;

  const pageNumber = parseInt(page, 10);
  const { data: movies, total } = await fetchMoviesByKeyword(query, pageNumber);

  return (
    <MovieList
      movies={movies}
      total={total}
      currentPage={pageNumber}
      searchQuery={query}
    />
  );
}
