'use client';

import { useState, useMemo, useEffect } from 'react';
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

function getCurrentTimeSlot(language: 'ko' | 'en') {
  let hour: number;
  if (language === 'en') {
    // UK 시간 (Europe/London) - Intl.DateTimeFormat 사용
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: 'numeric',
      hour12: false,
    });
    hour = parseInt(formatter.format(new Date()));
  } else {
    hour = new Date().getHours();
  }

  if (language === 'ko') {
    if (hour < 6) return { label: '새벽 (0-6시)', emoji: '🌙', color: 'from-indigo-600 to-purple-700' };
    if (hour >= 6 && hour < 9) return { label: '오전 (6-9시)', emoji: '🌅', color: 'from-orange-400 to-yellow-400' };
    if (hour >= 9 && hour < 12) return { label: '낮 (9-12시)', emoji: '☀️', color: 'from-yellow-400 to-amber-400' };
    if (hour >= 12 && hour < 14) return { label: '점심 (12-14시)', emoji: '🍽️', color: 'from-amber-400 to-orange-500' };
    if (hour >= 14 && hour < 18) return { label: '오후 (14-18시)', emoji: '🌤️', color: 'from-blue-400 to-cyan-400' };
    if (hour >= 18 && hour < 21) return { label: '저녁 (18-21시)', emoji: '🌆', color: 'from-purple-400 to-pink-400' };
    return { label: '밤 (21-24시)', emoji: '🌃', color: 'from-indigo-500 to-purple-600' };
  } else {
    if (hour < 6) return { label: 'Late Night (0-6)', emoji: '🌙', color: 'from-indigo-600 to-purple-700' };
    if (hour >= 6 && hour < 9) return { label: 'Morning (6-9)', emoji: '🌅', color: 'from-orange-400 to-yellow-400' };
    if (hour >= 9 && hour < 12) return { label: 'Late Morning (9-12)', emoji: '☀️', color: 'from-yellow-400 to-amber-400' };
    if (hour >= 12 && hour < 14) return { label: 'Lunch (12-14)', emoji: '🍽️', color: 'from-amber-400 to-orange-500' };
    if (hour >= 14 && hour < 18) return { label: 'Afternoon (14-18)', emoji: '🌤️', color: 'from-blue-400 to-cyan-400' };
    if (hour >= 18 && hour < 21) return { label: 'Evening (18-21)', emoji: '🌆', color: 'from-purple-400 to-pink-400' };
    return { label: 'Night (21-24)', emoji: '🌃', color: 'from-indigo-500 to-purple-600' };
  }
}

export default function MapPage() {
  const { places, language } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  const currentTime = getCurrentTimeSlot(language);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

      {/* 배너 캐러셀 */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
          >
            {/* 시간대 배너 */}
            <div className={`flex-shrink-0 w-full flex items-center justify-between bg-gradient-to-r ${currentTime.color} rounded-xl px-4 py-2.5 shadow-md`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentTime.emoji}</span>
                <div>
                  <p className="text-xs font-medium text-white/90">
                    {language === 'ko' ? '현재 시간대' : 'Current Time (UK)'}
                  </p>
                  <p className="text-sm font-bold text-white">{currentTime.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/90">
                  {language === 'ko' ? '시간대별 분위기' : 'Time-based Atmosphere'}
                </p>
                <p className="text-xs font-semibold text-white">
                  {language === 'ko' ? '장소 클릭 시 확인!' : 'Click to see details!'}
                </p>
              </div>
            </div>
            {/* 광고 배너 */}
            <div className="flex-shrink-0 w-full flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl px-4 py-2.5 shadow-md">
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {language === 'ko' ? '📢 배너 광고 삽입 예정' : '📢 Ad Banner Coming Soon'}
                </p>
                <p className="text-xs text-white/80">
                  {language === 'ko' ? '광고 문의: hjnee222@gmail.com' : 'Contact: hjnee222@gmail.com'}
                </p>
              </div>
            </div>
          </div>
          {/* 인디케이터 */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1].map((i) => (
              <button
                key={i}
                onClick={() => setBannerIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  bannerIndex === i ? 'bg-white w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-[calc(100vh-198px)]">
        <MapView places={filteredPlaces} language={language} />
        <MarkerLegend />
      </div>
    </div>
  );
}
