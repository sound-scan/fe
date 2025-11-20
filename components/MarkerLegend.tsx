'use client';

import { useState, useRef, useEffect } from 'react';

export default function MarkerLegend() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const legends = [
    { color: '#6EE7B7', label: '정적에 가까운 조용함', emoji: '🔇' },
    { color: '#FACC15', label: '부드러운 백색소음', emoji: '🌿' },
    { color: '#FB923C', label: '편안한 대화가 가능한 공간', emoji: '☕' },
    { color: '#F43F5E', label: '활발한 소통에 최적', emoji: '😆' },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <>
      {/* 토글 버튼 */}
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={() => {
          if (!isDragging) {
            setIsOpen(!isOpen);
          }
        }}
        className="absolute z-[1001] floating-button"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        title="공간 분위기 범례"
      >
        <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hover:scale-110">
          <svg
            className="w-6 h-6 text-white"
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
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          )}
        </div>
      </button>

      {/* 범례 패널 */}
      {isOpen && (
        <div
          className="absolute z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-3 animate-fadeIn"
          style={{
            left: `${position.x + 60}px`,
            top: `${position.y}px`,
          }}
        >
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
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
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
      )}
    </>
  );
}