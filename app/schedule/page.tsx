'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ActivityPurpose, RecommendedPlace } from '@/types';
import { getNSIDescription } from '@/utils/soundLevel';
import Link from 'next/link';

export default function SchedulePage() {
  const { places, language } = useApp();
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    location: '',
    purpose: ActivityPurpose.STUDY,
  });
  const [recommendations, setRecommendations] = useState<RecommendedPlace[]>([]);
  const [showResults, setShowResults] = useState(false);

  // AI 추천 로직 (간단한 규칙 기반, 실제로는 AI 모델 사용)
  const generateRecommendations = () => {
    const purposeNSIPreference = {
      [ActivityPurpose.STUDY]: { min: 0, max: 45 }, // 조용한 곳
      [ActivityPurpose.MEETING]: { min: 30, max: 65 }, // 적당한 곳
      [ActivityPurpose.RELAX]: { min: 0, max: 50 }, // 조용한~적당한 곳
      [ActivityPurpose.CONVERSATION]: { min: 50, max: 85 }, // 대화하기 좋은 곳
    };

    const preference = purposeNSIPreference[scheduleForm.purpose as ActivityPurpose];

    // NSI 기준으로 필터링 및 점수 계산
    const scoredPlaces: RecommendedPlace[] = places
      .filter((place) => place.nsi !== undefined && place.nsi >= preference.min && place.nsi <= preference.max)
      .map((place) => {
        // 점수 계산: NSI가 선호 범위 중앙에 가까울수록 높은 점수
        const idealNSI = (preference.min + preference.max) / 2;
        const nsiDiff = Math.abs(place.nsi! - idealNSI);
        const maxDiff = (preference.max - preference.min) / 2;
        const nsiScore = Math.max(0, 100 - (nsiDiff / maxDiff) * 100);

        // 리뷰 개수와 평균 평점 고려
        const avgRating = place.reviews.length > 0
          ? place.reviews.reduce((sum, r) => sum + r.rating, 0) / place.reviews.length
          : 3;
        const ratingScore = (avgRating / 5) * 100;

        // 최종 점수
        const finalScore = Math.round((nsiScore * 0.7 + ratingScore * 0.3));

        // 추천 이유 생성
        let reason = '';
        if (scheduleForm.purpose === ActivityPurpose.STUDY) {
          reason = language === 'ko'
            ? `NSI ${place.nsi}로 집중하기 좋은 환경입니다. ${place.reviews.length}개의 긍정적인 리뷰가 있습니다.`
            : `NSI ${place.nsi} - Great for focus. ${place.reviews.length} positive reviews.`;
        } else if (scheduleForm.purpose === ActivityPurpose.MEETING) {
          reason = language === 'ko'
            ? `NSI ${place.nsi}로 회의하기 적당한 분위기입니다. 대화가 편안합니다.`
            : `NSI ${place.nsi} - Suitable for meetings. Comfortable conversation.`;
        } else if (scheduleForm.purpose === ActivityPurpose.RELAX) {
          reason = language === 'ko'
            ? `NSI ${place.nsi}로 휴식하기 좋은 차분한 환경입니다.`
            : `NSI ${place.nsi} - Perfect for relaxation. Calm environment.`;
        } else {
          reason = language === 'ko'
            ? `NSI ${place.nsi}로 대화하기 좋은 활기찬 분위기입니다.`
            : `NSI ${place.nsi} - Great for conversation. Lively atmosphere.`;
        }

        // 이동 시간 (임의 생성, 실제로는 geolocation API 사용)
        const travelTime = Math.floor(Math.random() * 30) + 5;

        // 예상 NSI (시간대별 데이터 활용)
        const timeIndex = parseInt(scheduleForm.time.split(':')[0]) < 12 ? 0 : 2;
        const predictedNSI = place.timeBasedLevels[timeIndex]?.nsi || place.nsi;

        return {
          ...place,
          score: finalScore,
          reason,
          travelTime,
          predictedNSI,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Top 3만

    setRecommendations(scoredPlaces);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateRecommendations();
  };

  const getPurposeText = (purpose: ActivityPurpose) => {
    const texts = {
      ko: {
        [ActivityPurpose.STUDY]: '공부',
        [ActivityPurpose.MEETING]: '회의',
        [ActivityPurpose.RELAX]: '휴식',
        [ActivityPurpose.CONVERSATION]: '대화',
      },
      en: {
        [ActivityPurpose.STUDY]: 'Study',
        [ActivityPurpose.MEETING]: 'Meeting',
        [ActivityPurpose.RELAX]: 'Relax',
        [ActivityPurpose.CONVERSATION]: 'Conversation',
      },
    };
    return texts[language][purpose];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="mb-6">
          <Link href="/map" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'ko' ? '뒤로' : 'Back'}
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {language === 'ko' ? 'AI 장소 추천' : 'AI Place Recommendation'}
          </h1>
          <p className="text-gray-600">
            {language === 'ko'
              ? '일정에 맞는 완벽한 장소를 AI가 추천해드립니다'
              : 'AI recommends the perfect place for your schedule'}
          </p>
        </div>

        {!showResults ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '날짜' : 'Date'}
              </label>
              <input
                type="date"
                value={scheduleForm.date}
                onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-xl px-4 py-3 transition-colors outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '시간' : 'Time'}
              </label>
              <input
                type="time"
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-xl px-4 py-3 transition-colors outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '대략적인 위치' : 'Approximate Location'}
              </label>
              <input
                type="text"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-xl px-4 py-3 transition-colors outline-none"
                placeholder={language === 'ko' ? '예: 강남역 근처' : 'e.g., Near Gangnam Station'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ko' ? '목적' : 'Purpose'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(ActivityPurpose).map((purpose) => (
                  <button
                    key={purpose}
                    type="button"
                    onClick={() => setScheduleForm({ ...scheduleForm, purpose })}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      scheduleForm.purpose === purpose
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getPurposeText(purpose)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              {language === 'ko' ? '🤖 AI 추천 받기' : '🤖 Get AI Recommendations'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* 입력 정보 요약 */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-5 shadow-xl">
              <h2 className="text-xl font-bold mb-3">
                {language === 'ko' ? '일정 정보' : 'Schedule Info'}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{scheduleForm.date || (language === 'ko' ? '날짜 미지정' : 'Date not specified')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🕐</span>
                  <span>{scheduleForm.time || (language === 'ko' ? '시간 미지정' : 'Time not specified')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>{getPurposeText(scheduleForm.purpose as ActivityPurpose)}</span>
                </div>
              </div>
            </div>

            {/* 추천 결과 */}
            <div className="bg-white rounded-2xl shadow-xl p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>✨</span>
                {language === 'ko' ? 'Top 3 추천 장소' : 'Top 3 Recommended Places'}
              </h2>

              <div className="space-y-3">
                {recommendations.map((place, index) => (
                  <div
                    key={place.id}
                    className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 border-2 border-purple-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                          <h3 className="text-lg font-bold text-gray-800">{place.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <span
                              className="text-xs font-bold px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: getNSIDescription(place.predictedNSI || place.nsi!, language).color + '20',
                                color: getNSIDescription(place.predictedNSI || place.nsi!, language).color,
                              }}
                            >
                              NSI {place.predictedNSI || place.nsi}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            🚶 {place.travelTime}{language === 'ko' ? '분' : ' min'}
                          </div>
                          <div className="text-xs font-bold text-purple-600">
                            {place.score}{language === 'ko' ? '점' : ' pts'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{place.reason}</p>
                    <div className="text-xs text-gray-600">
                      {language === 'ko' ? '예상 소음도 변화:' : 'Expected noise change:'}
                      <span className={`ml-1 font-bold ${place.predictedNSI! > place.nsi! ? 'text-red-600' : 'text-green-600'}`}>
                        {place.predictedNSI! > place.nsi! ? '↑' : '↓'} {Math.abs(place.predictedNSI! - place.nsi!)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all"
            >
              {language === 'ko' ? '다시 검색하기' : 'Search Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
