'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import dynamic from 'next/dynamic';
import FilterBar from '@/components/FilterBar';
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
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlaces = useMemo(() => {
    let filtered = places;

    // 필터 적용
    if (filter !== 'all') {
      filtered = filtered.filter((place) => {
        if (filter === 'quiet') return place.soundLevel <= 30;
        if (filter === 'moderate') return place.soundLevel > 30 && place.soundLevel <= 70;
        if (filter === 'lively') return place.soundLevel > 70;
        return true;
      });
    }

    // 검색어 적용
    if (searchTerm.trim()) {
      filtered = filtered.filter((place) =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [places, filter, searchTerm]);

  return (
    <div className="relative w-full h-[calc(100vh-72px)]">
      <FilterBar onFilterChange={setFilter} onSearchChange={setSearchTerm} />
      <div className="relative w-full h-[calc(100vh-144px)]">
        <MapView places={filteredPlaces} />
        <MarkerLegend />
      </div>
    </div>
  );
}
