'use client';

export default function MarkerLegend() {
  const legends = [
    { color: '#6EE7B7', label: '정적에 가까운 조용함', emoji: '🔇' },
    { color: '#FACC15', label: '부드러운 백색소음', emoji: '🌿' },
    { color: '#FB923C', label: '편안한 대화가 가능한 공간', emoji: '☕' },
    { color: '#F43F5E', label: '활발한 소통에 최적', emoji: '😆' },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
        <svg
          className="w-4 h-4 text-blue-600"
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
        <span className="text-xs font-bold text-gray-700">공간 분위기</span>
      </div>
      <div className="space-y-1.5">
        {legends.map((legend, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: legend.color }}
            />
            <span className="text-xs text-gray-700">
              {legend.emoji} {legend.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}