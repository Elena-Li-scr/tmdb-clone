import { fetchMoviesByKeyword } from '@/server/api';
import MovieList from '@/components/MovieList';

export default async function HomePage() {
  const movies = await fetchMoviesByKeyword('return');
  return <MovieList movies={movies} />;
}
