'use client';

import { useAppContext } from '@/context/AppContext';
import { Pagination } from 'antd';

export default function RatedPagination() {
  const { currentRatedPage, setCurrentRatedPage, totalRated } = useAppContext();
  return (
    <Pagination
      current={currentRatedPage}
      total={totalRated}
      pageSize={20}
      onChange={(page) => setCurrentRatedPage(page)}
      showSizeChanger={false}
      style={{ marginTop: 30 }}
      align="center"
    />
  );
}
