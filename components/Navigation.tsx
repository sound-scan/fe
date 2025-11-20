'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/map" className="text-2xl font-bold tracking-tight">
            Sound Scan
          </Link>
          <div className="flex gap-4">
            <Link
              href="/map"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === '/map'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              Map
            </Link>
            <Link
              href="/measure"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === '/measure'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              Measure
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
