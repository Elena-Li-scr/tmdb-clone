import { fetchMoviesByKeyword } from '@/server/api';
import SearchTab from '@/components/SearchTab';
import RatedTab from '@/components/RatedTab';
import { Tabs } from 'antd';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;

  const pageNumber = parseInt(page, 10);
  const { data: movies, total } = await fetchMoviesByKeyword(query, pageNumber);

  return (
    <main>
      <div className="container">
        <Tabs
          defaultActiveKey="search"
          items={[
            {
              key: 'search',
              label: 'Search',
              children: (
                <SearchTab
                  movies={movies}
                  total={total}
                  currentPage={pageNumber}
                  searchQuery={query}
                />
              ),
            },
            {
              key: 'rated',
              label: 'Rated',
              children: <RatedTab />,
            },
          ]}
        />
      </div>
    </main>
  );
}
