import 'antd/dist/reset.css';
import './globals.css';
import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'TMDB Clone',
  description: 'Movie search app with TMDB API',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
