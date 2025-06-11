'use client';

import { Tabs } from 'antd';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TabNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const activeKey = pathname.startsWith('/rated') ? 'rated' : 'search';

  const items = [
    {
      key: 'search',
      label: <Link href={`/search?${queryString}`}>Search</Link>,
    },
    {
      key: 'rated',
      label: <Link href={`/rated?${queryString}`}>Rated</Link>,
    },
  ];

  return <Tabs activeKey={activeKey} items={items} />;
}
