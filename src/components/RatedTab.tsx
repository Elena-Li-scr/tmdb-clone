'use client';
import { useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Alert, Pagination } from 'antd';
import MovieCard from './MovieCard';
import Spinner from './Spinner';

export default function RatedTab() {
  const {
    genres,
    loading: appLoading,
    ratedMovies,
    currentRatedPage,
    updateRatedMovie,
    setCurrentRatedPage,
    totalRated,
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
    <div className="search-wrapper">
      <div className="movie-list">
        {ratedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
            genres={movie.genre_ids.map((id) => genres[id] || 'Unknown')}
            userRating={movie.rating}
          />
        ))}
      </div>
      <Pagination
        current={currentRatedPage}
        total={totalRated}
        pageSize={20}
        onChange={(page) => setCurrentRatedPage(page)}
        showSizeChanger={false}
        style={{ marginTop: 30 }}
        align="center"
      />
    </div>
  );
}
