'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { getNSIDescription } from '@/utils/soundLevel';
import Link from 'next/link';

export default function DashboardPage() {
  const { places, language } = useApp();
  const [selectedPlace, setSelectedPlace] = useState(places[0]);
  const [currentNSI, setCurrentNSI] = useState(selectedPlace.nsi || 50);
  const [badgeEnabled, setBadgeEnabled] = useState(currentNSI <= 45);
  const [isLive, setIsLive] = useState(true);

  // 실시간 NSI 시뮬레이션
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentNSI((prev) => {
        const change = (Math.random() - 0.5) * 10;
        const newNSI = Math.max(0, Math.min(100, prev + change));
        return Math.round(newNSI);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // NSI에 따라 자동으로 배지 업데이트
  useEffect(() => {
    if (badgeEnabled && currentNSI > 45) {
      setBadgeEnabled(false);
    } else if (!badgeEnabled && currentNSI <= 45) {
      // 자동으로 켜지지는 않음, 사장님이 수동으로 켜야 함
    }
  }, [currentNSI]);

  // 시간대별 고객 유입 데이터 (모의 데이터)
  const hourlyVisitors = [
    { hour: '6-9', visitors: 25, avgNSI: 20 },
    { hour: '9-12', visitors: 45, avgNSI: 35 },
    { hour: '12-14', visitors: 80, avgNSI: 65 },
    { hour: '14-18', visitors: 60, avgNSI: 50 },
    { hour: '18-21', visitors: 75, avgNSI: 60 },
    { hour: '21-24', visitors: 30, avgNSI: 40 },
  ];

  const maxVisitors = Math.max(...hourlyVisitors.map((h) => h.visitors));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 헤더 */}
        <div className="mb-6">
          <Link href="/map" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'ko' ? '뒤로' : 'Back'}
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ko' ? '사장님 대시보드' : 'Business Dashboard'}
              </h1>
              <p className="text-gray-600">
                {language === 'ko' ? '실시간 소음 관리 및 고객 분석' : 'Real-time noise management & customer analytics'}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold">
              SoundScan B2B
            </div>
          </div>
        </div>

        {/* 장소 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {language === 'ko' ? '내 매장 선택' : 'Select Your Place'}
          </label>
          <select
            value={selectedPlace.id}
            onChange={(e) => {
              const place = places.find((p) => p.id === parseInt(e.target.value))!;
              setSelectedPlace(place);
              setCurrentNSI(place.nsi || 50);
            }}
            className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-xl px-4 py-3 transition-colors outline-none font-medium text-gray-900"
          >
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        {/* 메인 대시보드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 실시간 NSI 카드 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {language === 'ko' ? '실시간 NSI' : 'Live NSI'}
              </h2>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium text-gray-600">
                  {isLive ? (language === 'ko' ? '실시간' : 'Live') : (language === 'ko' ? '일시정지' : 'Paused')}
                </span>
              </div>
            </div>

            <div
              className="rounded-xl p-6 border-2 text-center mb-4"
              style={{
                backgroundColor: getNSIDescription(currentNSI, language).color + '15',
                borderColor: getNSIDescription(currentNSI, language).color,
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-5xl">{getNSIDescription(currentNSI, language).emoji}</span>
                <div
                  className="text-6xl font-bold"
                  style={{ color: getNSIDescription(currentNSI, language).color }}
                >
                  {currentNSI}
                </div>
              </div>
              <div
                className="text-xl font-bold mb-1"
                style={{ color: getNSIDescription(currentNSI, language).color }}
              >
                {getNSIDescription(currentNSI, language).level}
              </div>
              <p className="text-sm text-gray-700">{getNSIDescription(currentNSI, language).description}</p>
            </div>

            {/* NSI 그래프 (간단한 라인) */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-600 mb-2">
                {language === 'ko' ? '최근 1시간 추이' : 'Last Hour Trend'}
              </div>
              <div className="h-20 flex items-end gap-1">
                {Array.from({ length: 20 }).map((_, i) => {
                  const height = Math.random() * 100;
                  const nsiValue = Math.round((height / 100) * 100);
                  const color = getNSIDescription(nsiValue, language).color;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${height}%`,
                        backgroundColor: color,
                        opacity: 0.7,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* 조용해요 배지 컨트롤 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {language === 'ko' ? '"조용해요" 배지' : '"Quiet" Badge'}
            </h2>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${badgeEnabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                    🌿
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-800">
                      {language === 'ko' ? '지금 조용해요' : 'Quiet Now'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {badgeEnabled
                        ? (language === 'ko' ? '배지 활성화 중' : 'Badge Active')
                        : (language === 'ko' ? '배지 비활성화' : 'Badge Inactive')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!badgeEnabled && currentNSI <= 45) {
                      setBadgeEnabled(true);
                    } else if (badgeEnabled) {
                      setBadgeEnabled(false);
                    }
                  }}
                  disabled={!badgeEnabled && currentNSI > 45}
                  className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
                    badgeEnabled ? 'bg-green-500' : 'bg-gray-300'
                  } ${!badgeEnabled && currentNSI > 45 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span
                    className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform ${
                      badgeEnabled ? 'translate-x-12' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {!badgeEnabled && currentNSI > 45 && (
                <div className="text-sm text-amber-700 bg-amber-100 rounded-lg p-3">
                  ⚠️ {language === 'ko'
                    ? 'NSI가 45 이하일 때만 배지를 활성화할 수 있습니다.'
                    : 'Badge can only be enabled when NSI is 45 or below.'}
                </div>
              )}

              {badgeEnabled && (
                <div className="text-sm text-green-700 bg-green-100 rounded-lg p-3">
                  ✅ {language === 'ko'
                    ? '고객들이 앱에서 "조용한 카페"로 표시됩니다!'
                    : 'Customers will see "Quiet Cafe" badge in the app!'}
                </div>
              )}
            </div>

            <div className="text-xs text-gray-600">
              {language === 'ko'
                ? '💡 배지가 켜지면 고객 유입이 약 30% 증가합니다.'
                : '💡 Badge increases customer visits by about 30%.'}
            </div>
          </div>
        </div>

        {/* 시간대별 고객 유입 데이터 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {language === 'ko' ? '시간대별 고객 유입 & NSI' : 'Hourly Visitors & NSI'}
          </h2>

          <div className="space-y-3">
            {hourlyVisitors.map((data, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-700 w-20">
                      {data.hour}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                            style={{ width: `${(data.visitors / maxVisitors) * 100}%` }}
                          >
                            <span className="text-xs font-bold text-white">
                              {data.visitors}{language === 'ko' ? '명' : ''}
                            </span>
                          </div>
                        </div>
                        <div
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: getNSIDescription(data.avgNSI, language).color + '30',
                            color: getNSIDescription(data.avgNSI, language).color,
                          }}
                        >
                          NSI {data.avgNSI}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <div className="text-sm font-bold text-blue-900 mb-2">
              📊 {language === 'ko' ? '오늘의 통계' : 'Today\'s Statistics'}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {hourlyVisitors.reduce((sum, h) => sum + h.visitors, 0)}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'ko' ? '총 방문객' : 'Total Visitors'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(hourlyVisitors.reduce((sum, h) => sum + h.avgNSI, 0) / hourlyVisitors.length)}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'ko' ? '평균 NSI' : 'Avg NSI'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.max(...hourlyVisitors.map((h) => h.visitors))}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'ko' ? '피크 시간' : 'Peak Hour'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💼</div>
            <div>
              <div className="font-bold text-gray-800 mb-1">
                {language === 'ko' ? 'SoundScan B2B 서비스' : 'SoundScan B2B Service'}
              </div>
              <div className="text-sm text-gray-700">
                {language === 'ko'
                  ? 'NSI 데이터를 활용한 매출 증대와 고객 만족도 향상을 경험하세요. 문의: business@soundscan.com'
                  : 'Boost sales and customer satisfaction with NSI data. Contact: business@soundscan.com'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}