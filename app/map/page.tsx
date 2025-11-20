'use client';

import { useApp } from '@/context/AppContext';
import dynamic from 'next/dynamic';
import MarkerLegend from '@/components/MarkerLegend';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const { places } = useApp();

  return (
    <div className="relative w-full h-[calc(100vh-72px)]">
      <MapView places={places} />
      <MarkerLegend />
    </div>
  );
}
