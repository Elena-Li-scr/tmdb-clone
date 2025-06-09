'use client';
import { useRouter } from 'next/navigation';
import { useNetwork } from '@/hooks/useNetwork';
import MovieCard from '@/components/MovieCard';
import { Alert, Input, Pagination, Spin } from 'antd';
import { useMemo, useTransition } from 'react';
import { debounce } from '@/utils/debounce';

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

export default function MovieList({
  movies,
  total,
  currentPage,
  searchQuery,
}: Props) {
  const router = useRouter();
  const isOnline = useNetwork();
  const [isPending, startTransition] = useTransition();

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

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        startTransition(() => {
          router.push(`/?query=${value}&page=1`);
        });
      }, 500),
    [router],
  );

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
    <main>
      <div className="container">
        <Input
          defaultValue={searchQuery}
          placeholder="Type to search..."
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
        {isPending ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : movies.length === 0 && searchQuery !== '' ? (
          <Alert
            type="info"
            message="The movie with that name was not found"
            style={{ marginTop: 30 }}
          />
        ) : searchQuery === '' ? (
          <Alert
            type="info"
            message="Type movie name to search"
            style={{ marginTop: 30 }}
          />
        ) : (
          <div className="movie-list">
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
        )}
        {movies.length > 0 && (
          <Pagination
            current={currentPage}
            total={total}
            pageSize={20}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{ marginTop: 30 }}
            align="center"
          />
        )}
      </div>
    </main>
  );
}
