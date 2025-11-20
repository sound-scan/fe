'use client';

import { useState } from 'react';

export default function MarkerLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  const legends = [
    { color: '#22c55e', label: '매우 조용', emoji: '🤫' },
    { color: '#eab308', label: '적당히 조용', emoji: '📚' },
    { color: '#f97316', label: '보통 분위기', emoji: '☕' },
    { color: '#ef4444', label: '활기참', emoji: '🎉' },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-all flex items-center gap-2"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm font-medium">범례</span>
      </button>

      {isExpanded && (
        <div className="mt-2 bg-white rounded-lg shadow-xl p-3 max-w-[200px] animate-fadeIn">
          <div className="space-y-2">
            {legends.map((legend, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: legend.color }}
                />
                <span className="text-xs text-gray-700">{legend.emoji} {legend.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
