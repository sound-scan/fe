import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sound Scan - 소리로 찾는 완벽한 공간',
  description: '지도 기반 소음 리뷰 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AppProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
