'use client';
import { useRouter } from 'next/navigation';
import { useNetwork } from '@/hooks/useNetwork';
import MovieCard from '@/components/MovieCard';
import Spinner from './Spinner';
import { Alert, Input, Pagination } from 'antd';
import { useMemo, useTransition, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppContext } from '@/context/AppContext';
import { rateMovie } from '@/server/api';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

interface Props {
  movies: Movie[];
  total: number;
  currentPage: number;
  searchQuery: string;
}

export default function SearchTab({
  movies,
  total,
  currentPage,
  searchQuery,
}: Props) {
  const router = useRouter();
  const isOnline = useNetwork();
  const [isPending, startTransition] = useTransition();
  const [ratedMap, setRatedMap] = useState<Record<number, number>>({});
  const { guestSessionId, genres, updateRatedMovie } = useAppContext();

  const handleSearch = useMemo(() => {
    return debounce((value: string) => {
      startTransition(() => {
        router.push(`/?query=${value}&page=1`);
      });
    }, 500);
  }, [router]);

  const handlePageChange = (page: number) => {
    startTransition(() => {
      router.push(`/?query=${searchQuery}&page=${page}`);
    });
  };

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
      ) : movies.length === 0 && searchQuery !== '' ? (
        <Alert
          type="info"
          message="The movie with that name was not found"
          style={{ marginTop: 30 }}
        />
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
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
      {movies.length > 0 && (
        <Pagination
          current={currentPage}
          total={total}
          pageSize={20}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ marginTop: 30, textAlign: 'center' }}
          align="center"
        />
      )}
    </div>
  );
}
