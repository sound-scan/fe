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
    <div className="bg-white border-b border-gray-200 p-3 space-y-3">
      {/* 검색바 */}
      <div className="relative">
        <input
          type="text"
          placeholder="장소 검색..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
      </div>

      {/* 필터 버튼 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}