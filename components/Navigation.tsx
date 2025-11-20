'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

export default function Navigation() {
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between">
            <Link href="/map" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:scale-105 transition-transform">
              <span>Sound Scan</span>
            </Link>
            <div className="flex items-center gap-2">
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

              {/* 설정 버튼 */}
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all hover:scale-105"
                title="설정"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
}
