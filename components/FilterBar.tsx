'use client';

import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
}

export default function FilterBar({ onFilterChange, onSearchChange }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', label: '전체', icon: '🎯' },
    { id: 'quiet', label: '조용함', icon: '🤫' },
    { id: 'moderate', label: '보통', icon: '☕' },
    { id: 'lively', label: '활기참', icon: '🎉' },
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border-b border-gray-200 p-4 space-y-3 shadow-sm">
      {/* 검색바 */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 장소를 검색해보세요..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              onSearchChange('');
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 필터 버튼 */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all transform ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg hover:scale-105'
            }`}
          >
            <span className="text-base">{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}