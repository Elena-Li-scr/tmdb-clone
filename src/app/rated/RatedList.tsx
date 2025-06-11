'use client';
import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Alert } from 'antd';
import MovieCard from '@/components/MovieCard';
import Spinner from '@/components/Spinner';

export default function RatedList() {
  const {
    genres,
    loading: appLoading,
    ratedMovies,
    currentRatedPage,
    updateRatedMovie,
  } = useAppContext();

  useEffect(() => {
    updateRatedMovie(currentRatedPage);
  }, [currentRatedPage, updateRatedMovie]);

  if (appLoading) {
    return <Spinner />;
  }

  if (!ratedMovies.length) {
    return (
      <Alert
        message="You haven't rated any movies yet."
        type="info"
        style={{ marginTop: 32 }}
      />
    );
  }

  return (
    <div className="movie-list">
      {ratedMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genres={movie.genre_ids.map((id) => genres[id] || 'Unknown')}
          userRating={movie.rating}
        />
      ))}
    </div>
  );
}
