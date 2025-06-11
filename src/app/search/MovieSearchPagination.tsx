'use client';
import { useRouter } from 'next/navigation';
import { Pagination } from 'antd';
import { Movie } from '@/types';

interface Props {
  movies: Movie[];
  total: number;
  currentPage: number;
  searchQuery: string;
}

export default function MovieSearchPagination({
  movies,
  total,
  currentPage,
  searchQuery,
}: Props) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/search?query=${searchQuery}&page=${page}`);
  };
  return (
    <div className="pagination">
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
