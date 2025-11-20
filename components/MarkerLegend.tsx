'use client';

export default function MarkerLegend() {
  const legends = [
    { color: '#22c55e', label: '매우 조용 — 공부/작업에 최고' },
    { color: '#eab308', label: '적당히 조용 — 공부 + 대화 모두 가능' },
    { color: '#f97316', label: '보통 분위기 — 밝고 편안한 공간' },
    { color: '#ef4444', label: '활기찬 공간 — 친구와 대화/모임 최적' },
  ];

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
      <h3 className="font-bold text-lg mb-3">소리 레벨 가이드</h3>
      <div className="space-y-2">
        {legends.map((legend, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: legend.color }}
            />
            <span className="text-sm text-gray-700">{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
