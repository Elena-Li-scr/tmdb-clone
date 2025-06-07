'use client';
import { useNetwork } from '@/hooks/useNetwork';
import MovieCard from '@/components/MovieCard';
import { Alert } from 'antd';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

export default function HomePage({ movies }: { movies: Movie[] }) {
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

  const isOnline = useNetwork();

  if (!isOnline) {
    return (
      <Alert
        message="You're offline"
        description="Please check your internet connection"
        type="warning"
        showIcon
      />
    );
  }

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
