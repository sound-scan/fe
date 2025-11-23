'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getSoundLevelDescription, mockSoundAnalysis, getNSIDescription, getSoundTypeName, getSoundTypeIcon } from '@/utils/soundLevel';
import { Place, SoundAnalysis } from '@/types';

export default function MeasurePage() {
  const router = useRouter();
  const { places, addReview } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [soundLevel, setSoundLevel] = useState(0);
  const [soundAnalysis, setSoundAnalysis] = useState<SoundAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPlaceSelection, setShowPlaceSelection] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);

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

      setIsRecording(true);
      updateSoundLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('마이크 접근 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요.');
    }
  };

  const stopRecording = () => {
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
    setIsRecording(false);
  };

  const updateSoundLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // 평균 amplitude 계산
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

    // 0-100 범위로 매핑 (간단한 스케일링)
    const normalizedLevel = Math.min(100, Math.round((average / 128) * 100));

    setSoundLevel(normalizedLevel);

    // AI 분석 실행 (1초마다 한 번씩만)
    if (!soundAnalysis || Math.random() < 0.1) {
      const analysis = mockSoundAnalysis(normalizedLevel, dataArray);
      setSoundAnalysis(analysis);
    }

    animationFrameRef.current = requestAnimationFrame(updateSoundLevel);
  };

  const handleWriteReview = () => {
    stopRecording();
    setShowPlaceSelection(true);
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setShowPlaceSelection(false);
    setShowReviewForm(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlace) return;

    addReview(selectedPlace.id, {
      soundLevel,
      ...reviewForm,
    });

    alert(`${selectedPlace.name}에 리뷰가 등록되었습니다!`);
    setShowReviewForm(false);
    setSelectedPlace(null);
    setReviewForm({ rating: 5, comment: '' });
    router.push('/map');
  };

  const { level, activity } = getSoundLevelDescription(soundLevel);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          소리 측정하기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          주변 소리를 실시간으로 측정해보세요
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${(soundLevel / 100) * 553} 553`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.3s ease' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {soundLevel}
              </div>
              <div className="text-sm text-gray-500 mt-1">/ 100</div>
            </div>
          </div>

          {isRecording && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="font-medium">측정 중...</span>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center mb-4">
            <div className="text-lg font-bold text-gray-800 mb-1">{level}</div>
            <div className="text-sm text-gray-600">{activity}</div>
          </div>

          {/* AI 분석 결과 */}
          {isRecording && soundAnalysis && (
            <div className="space-y-3 animate-fadeIn">
              {/* NSI 표시 */}
              <div
                className="rounded-lg p-4 border-2"
                style={{
                  backgroundColor: getNSIDescription(soundAnalysis.nsi).color + '10',
                  borderColor: getNSIDescription(soundAnalysis.nsi).color,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getNSIDescription(soundAnalysis.nsi).emoji}</span>
                    <h3 className="font-bold text-gray-800">NSI (소음 스트레스 지수)</h3>
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: getNSIDescription(soundAnalysis.nsi).color }}
                  >
                    {soundAnalysis.nsi}
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="font-medium">{getNSIDescription(soundAnalysis.nsi).level}</div>
                  <div className="text-xs mt-1">{getNSIDescription(soundAnalysis.nsi).description}</div>
                </div>
              </div>

              {/* 소리 종류 분류 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  주요 소음 원인
                </h3>
                <div className="space-y-2">
                  {soundAnalysis.classifications
                    .sort((a, b) => b.percentage - a.percentage)
                    .slice(0, 3)
                    .map((classification, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span>{getSoundTypeIcon(classification.type)}</span>
                            <span className="font-medium text-gray-700">
                              {getSoundTypeName(classification.type)}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-purple-600">
                            {classification.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                            style={{ width: `${classification.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              측정 시작
            </button>
          ) : (
            <>
              <button
                onClick={stopRecording}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-medium text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
              >
                측정 중지
              </button>
              <button
                onClick={handleWriteReview}
                className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium text-lg hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg"
              >
                리뷰 작성하기
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💡 측정을 시작하면 마이크 권한이 요청됩니다</p>
        </div>
      </div>

      {/* 장소 선택 모달 */}
      {showPlaceSelection && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[390px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">장소 선택</h2>
                <button
                  onClick={() => setShowPlaceSelection(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-white/90 mt-2">측정한 소리 레벨: {soundLevel}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {places.map((place) => (
                <button
                  key={place.id}
                  onClick={() => handlePlaceSelect(place)}
                  className="w-full text-left p-4 bg-gradient-to-br from-white to-purple-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:scale-105"
                >
                  <h3 className="font-bold text-gray-800 mb-1">{place.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">현재 소리 레벨:</span>
                    <span className="text-sm font-bold text-purple-600">{place.soundLevel}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 리뷰 작성 모달 */}
      {showReviewForm && selectedPlace && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[390px] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{selectedPlace.name}</h2>
                  <p className="text-sm text-white/90 mt-1">소리 레벨: {soundLevel}</p>
                </div>
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setSelectedPlace(null);
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
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
                  className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-xl px-4 py-3 transition-colors outline-none"
                  rows={4}
                  placeholder="이 장소는 어떤 활동에 좋았나요?"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
              >
                리뷰 등록
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
