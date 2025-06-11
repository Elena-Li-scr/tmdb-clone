'use client';
import { useRouter } from 'next/navigation';
import { Pagination } from 'antd';
import { Movie } from '@/types';

interface Props {
  movies: Movie[];
  moviesStart: Movie[];
  total: number;
  currentPage: number;
  searchQuery: string;
}

export default function MovieSearchPagination({
  movies,
  moviesStart,
  total,
  currentPage,
  searchQuery,
}: Props) {
  const router = useRouter();
  const visibleMovies = searchQuery.trim() === '' ? moviesStart : movies;

  const handlePageChange = (page: number) => {
    router.push(`/search?query=${searchQuery}&page=${page}`);
  };
  return (
    <div className="pagination">
      {visibleMovies.length > 0 && (
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
