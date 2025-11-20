'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage } = useApp();

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between">
          <Link href="/map" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:scale-105 transition-transform">
            <span>Sound Scan</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* 언어 토글 */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
              title={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            >
              <span>{language === 'ko' ? '🇰🇷' : '🇬🇧'}</span>
              <span>{language === 'ko' ? 'KOR' : 'ENG'}</span>
            </button>

            <Link
              href="/map"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                pathname === '/map'
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'bg-white/20 hover:bg-white/30 hover:scale-105'
              }`}
            >
              <span>Map</span>
            </Link>
            <Link
              href="/measure"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                pathname === '/measure'
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/20 hover:bg-white/30 hover:scale-105'
              }`}
            >
              <span>Measure</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
