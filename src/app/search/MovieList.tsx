'use client';
import { useRouter } from 'next/navigation';
import { useNetwork } from '@/hooks/useNetwork';
import MovieCard from '@/components/MovieCard';
import Spinner from '@/components/Spinner';

import { Alert, Input } from 'antd';
import { useMemo, useTransition, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppContext } from '@/context/AppContext';
import { rateMovie } from '@/server/api';
import { Movie } from '@/types';

interface Props {
  movies: Movie[];
  moviesStart: Movie[];
  searchQuery: string;
}

export default function MovieList({ movies, searchQuery, moviesStart }: Props) {
  const router = useRouter();
  const isOnline = useNetwork();
  const [isPending, startTransition] = useTransition();
  const [ratedMap, setRatedMap] = useState<Record<number, number>>({});
  const { guestSessionId, genres, updateRatedMovie } = useAppContext();
  const visibleMovies = searchQuery.trim() === '' ? moviesStart : movies;

  const handleSearch = useMemo(() => {
    return debounce((value: string) => {
      startTransition(() => {
        router.push(`/search?query=${value}&page=1`);
      });
    }, 500);
  }, [router]);

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
    <div className="search-wrapper">
      <Input
        defaultValue={searchQuery}
        placeholder="Type to search..."
        onChange={(e) => handleSearch(e.target.value)}
        allowClear
      />
      {isPending ? (
        <Spinner />
      ) : visibleMovies.length === 0 && searchQuery !== '' ? (
        <Alert
          type="info"
          message="The movie with that name was not found"
          style={{ marginTop: 30 }}
        />
      ) : (
        <div className="movie-list">
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={movie.genre_ids.map((id) => genres[id] || 'Unknown')}
              userRating={ratedMap[movie.id]}
              onRate={
                guestSessionId
                  ? async (value) => {
                      const rating = value * 2;
                      await rateMovie(movie.id, rating, guestSessionId);
                      setRatedMap((prev) => ({ ...prev, [movie.id]: rating }));
                      setTimeout(() => {
                        updateRatedMovie();
                      }, 1000);
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
