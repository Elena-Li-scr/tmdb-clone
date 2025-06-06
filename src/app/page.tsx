import MovieCard from '@/components/MovieCard';
import { fetchMoviesByKeyword } from '@/server/api';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

export default async function HomePage() {
  const movies: Movie[] = await fetchMoviesByKeyword('return');
  console.log(movies);
  const getGenres = (genreIds: number[]): string[] => {
    const genreMap: Record<number, string> = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      18: 'Drama',
      99: 'Documentary',
    };

    return genreIds.map((id) => genreMap[id] || 'Unknown');
  };

  return (
    <main>
      <div className="container">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              genres={getGenres(movie.genre_ids)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
