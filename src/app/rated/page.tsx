import RatedList from '@/app/rated/RatedList';
import RatedPagination from './RatedPagination';

export default function RatedPage() {
  return (
    <div className="search-wrapper">
      <RatedList />
      <RatedPagination />
    </div>
  );
}
