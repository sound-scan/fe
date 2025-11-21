'use client';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TimeSlot } from '@/types';
import { getSoundLevelColor } from '@/utils/soundLevel';

interface TimeBasedChartProps {
  data: TimeSlot[];
  language: 'ko' | 'en';
}

export default function TimeBasedChart({ data, language }: TimeBasedChartProps) {
  // 시간 레이블에서 줄바꿈 제거하고 짧게 표시
  const chartData = data.map(item => ({
    ...item,
    shortTime: item.time.split('\n')[0] // 첫 줄만 사용 (시간 부분만)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const level = payload[0].value;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.time.replace('\n', ' ')}</p>
          <p className="text-sm" style={{ color: getSoundLevelColor(level) }}>
            {language === 'ko' ? '소리 레벨' : 'Level'}: {level}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="shortTime"
            tick={{ fontSize: 9, fill: '#6b7280' }}
            stroke="#9ca3af"
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            stroke="#9ca3af"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="level"
            stroke="#667eea"
            strokeWidth={3}
            fill="url(#colorLevel)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}