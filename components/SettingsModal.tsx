'use client';

import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { language, setLanguage } = useApp();
  const router = useRouter();

  const handleLanguageChange = (newLanguage: 'ko' | 'en') => {
    setLanguage(newLanguage);
    onClose();
    router.push('/map');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[390px] overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">설정</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 space-y-6">
          {/* 언어 설정 */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">언어 설정</h3>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">현재 언어:</span>
                <span className="text-sm font-bold text-gray-800">
                  {language === 'ko' ? '한국어 🇰🇷' : 'UK (English) 🇬🇧'}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleLanguageChange('ko')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    language === 'ko'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🇰🇷</span>
                    <span className="font-semibold">한국어</span>
                  </span>
                  {language === 'ko' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🇬🇧</span>
                    <span className="font-semibold">English</span>
                  </span>
                  {language === 'en' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs text-blue-800">
              💡 언어를 변경하면 지도와 모든 UI가 선택한 언어로 전환됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}