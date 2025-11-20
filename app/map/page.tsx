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

function getCurrentTimeSlot() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return { label: '오전 (6-9시)', emoji: '🌅', color: 'from-orange-400 to-yellow-400' };
  if (hour >= 9 && hour < 12) return { label: '낮 (9-12시)', emoji: '☀️', color: 'from-yellow-400 to-amber-400' };
  if (hour >= 12 && hour < 14) return { label: '점심 (12-14시)', emoji: '🍽️', color: 'from-amber-400 to-orange-500' };
  if (hour >= 14 && hour < 18) return { label: '오후 (14-18시)', emoji: '🌤️', color: 'from-blue-400 to-cyan-400' };
  if (hour >= 18 && hour < 21) return { label: '저녁 (18-21시)', emoji: '🌆', color: 'from-purple-400 to-pink-400' };
  return { label: '밤 (21-24시)', emoji: '🌙', color: 'from-indigo-500 to-purple-600' };
}

export default function MapPage() {
  const { places } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const currentTime = getCurrentTimeSlot();

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

      {/* 현재 시간대 배너 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
        <div className={`flex items-center justify-between bg-gradient-to-r ${currentTime.color} rounded-xl px-4 py-2.5 shadow-md`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentTime.emoji}</span>
            <div>
              <p className="text-xs font-medium text-white/90">현재 시간대</p>
              <p className="text-sm font-bold text-white">{currentTime.label}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/90">📊 시간대별 분위기</p>
            <p className="text-xs font-semibold text-white">장소 클릭 시 확인!</p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[calc(100vh-198px)]">
        <MapView places={filteredPlaces} />
        <MarkerLegend />
      </div>
    </div>
  );
}
