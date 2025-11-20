'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getSoundLevelDescription } from '@/utils/soundLevel';

export default function MeasurePage() {
  const router = useRouter();
  const { saveMeasurement } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [soundLevel, setSoundLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

    animationFrameRef.current = requestAnimationFrame(updateSoundLevel);
  };

  const handleSave = () => {
    saveMeasurement({
      soundLevel,
      timestamp: Date.now(),
    });

    alert(`소리 레벨 ${soundLevel}이(가) 저장되었습니다!`);
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

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-gray-800 mb-1">{level}</div>
            <div className="text-sm text-gray-600">{activity}</div>
          </div>
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
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-medium text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
              >
                저장하고 지도로 돌아가기
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💡 측정을 시작하면 마이크 권한이 요청됩니다</p>
        </div>
      </div>
    </div>
  );
}
