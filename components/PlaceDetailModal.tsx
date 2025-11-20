'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Place } from '@/types';
import { useApp } from '@/context/AppContext';
import { getSoundLevelDescription } from '@/utils/soundLevel';
import TimeBasedChart from './TimeBasedChart';

interface PlaceDetailModalProps {
  place: Place;
  onClose: () => void;
}

export default function PlaceDetailModal({ place, onClose }: PlaceDetailModalProps) {
  const router = useRouter();
  const { addReview } = useApp();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'reviews'>('chart');
  const [reviewForm, setReviewForm] = useState({
    soundLevel: 50,
    rating: 5,
    comment: '',
  });
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureError, setMeasureError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { level, activity } = getSoundLevelDescription(place.soundLevel);

  // 컴포넌트 언마운트 시 측정 중지
  useEffect(() => {
    return () => {
      stopMeasuring();
    };
  }, []);

  const startMeasuring = async () => {
    try {
      setMeasureError(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;

      setIsMeasuring(true);
      updateSoundLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setMeasureError('마이크 접근 권한이 필요합니다.');
    }
  };

  const stopMeasuring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    microphoneRef.current = null;
    analyserRef.current = null;
    setIsMeasuring(false);
  };

  const updateSoundLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const normalizedLevel = Math.min(100, Math.round((average / 128) * 100));

    setReviewForm((prev) => ({ ...prev, soundLevel: normalizedLevel }));

    animationFrameRef.current = requestAnimationFrame(updateSoundLevel);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    stopMeasuring();
    addReview(place.id, reviewForm);
    setShowReviewForm(false);
    setReviewForm({ soundLevel: 50, rating: 5, comment: '' });
    alert('리뷰가 등록되었습니다!');
  };

  const handleMeasure = () => {
    router.push('/measure');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-3 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[390px] max-h-[85vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{place.name}</h2>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                  <span className="text-xs font-medium">{level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold">{place.soundLevel}</span>
                  <span className="text-xs opacity-80">/100</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-white/90">{activity}</p>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* 액션 버튼 */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleMeasure}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-3 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              소리 측정
            </button>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 px-3 rounded-xl text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              리뷰 작성
            </button>
          </div>

          {/* 리뷰 폼 */}
          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 animate-fadeIn">
              <h3 className="font-bold text-lg mb-4 text-gray-800">✨ 새 리뷰 작성</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      소리 레벨 ({reviewForm.soundLevel})
                    </label>
                    <button
                      type="button"
                      onClick={isMeasuring ? stopMeasuring : startMeasuring}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm ${
                        isMeasuring
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                      }`}
                    >
                      {isMeasuring ? '⏹ 측정 중지' : '🎤 실시간 측정'}
                    </button>
                  </div>
                  {measureError && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-xs">{measureError}</p>
                    </div>
                  )}
                  {isMeasuring && (
                    <div className="mb-2 flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-blue-600">실시간으로 소리를 측정하고 있습니다...</span>
                    </div>
                  )}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={reviewForm.soundLevel}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, soundLevel: parseInt(e.target.value) })
                    }
                    disabled={isMeasuring}
                    className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-400 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {isMeasuring ? '측정 중에는 슬라이더를 조작할 수 없습니다' : '슬라이더를 움직이거나 실시간 측정을 사용하세요'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    별점
                  </label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating })}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          reviewForm.rating === rating
                            ? 'bg-yellow-400 text-white shadow-md scale-110'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {'⭐'.repeat(rating)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    코멘트
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full border-2 border-gray-300 focus:border-blue-500 rounded-xl px-4 py-3 transition-colors outline-none"
                    rows={3}
                    placeholder="이 장소는 어떤 활동에 좋았나요?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  리뷰 등록
                </button>
              </div>
            </form>
          )}

          {/* 탭 */}
          <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('chart')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'chart'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              시간대별 분위기
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'reviews'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              리뷰 ({place.reviews.length})
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          {activeTab === 'chart' ? (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-3 border border-gray-200">
              <h3 className="font-bold text-base mb-1 text-gray-800">시간대별 소리 레벨</h3>
              <p className="text-xs text-gray-600 mb-3">
                하루 동안의 평균 소리 레벨 변화를 확인하세요
              </p>
              <TimeBasedChart data={place.timeBasedLevels} />
            </div>
          ) : (
            <div className="space-y-2.5">
              {place.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-3.5 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{'⭐'.repeat(review.rating)}</span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                      소리 {review.soundLevel}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}