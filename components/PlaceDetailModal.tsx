'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Place } from '@/types';
import { useApp } from '@/context/AppContext';
import { getSoundLevelDescription } from '@/utils/soundLevel';

interface PlaceDetailModalProps {
  place: Place;
  onClose: () => void;
}

export default function PlaceDetailModal({ place, onClose }: PlaceDetailModalProps) {
  const router = useRouter();
  const { addReview } = useApp();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    soundLevel: 50,
    rating: 5,
    comment: '',
  });

  const { level, activity } = getSoundLevelDescription(place.soundLevel);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    addReview(place.id, reviewForm);
    setShowReviewForm(false);
    setReviewForm({ soundLevel: 50, rating: 5, comment: '' });
    alert('리뷰가 등록되었습니다!');
  };

  const handleMeasure = () => {
    router.push('/measure');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
              <div className="space-y-1">
                <p className="text-lg font-semibold">{level}</p>
                <p className="text-sm text-blue-100">{activity}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">평균 소리 레벨</span>
              <span className="text-2xl font-bold text-blue-600">{place.soundLevel}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500"
                style={{ width: `${place.soundLevel}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={handleMeasure}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
            >
              소리 측정하기
            </button>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
            >
              리뷰 남기기
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">새 리뷰 작성</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    소리 레벨 (0-100)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={reviewForm.soundLevel}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, soundLevel: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                  <div className="text-center text-2xl font-bold text-blue-600 mt-2">
                    {reviewForm.soundLevel}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    별점
                  </label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {'⭐'.repeat(rating)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    코멘트
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows={3}
                    placeholder="이 장소는 어떤 활동에 좋았나요?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
                >
                  리뷰 등록
                </button>
              </div>
            </form>
          )}

          <div>
            <h3 className="font-bold text-lg mb-4">리뷰 ({place.reviews.length})</h3>
            <div className="space-y-4">
              {place.reviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                      <span className="text-sm text-gray-500">
                        소리 레벨: {review.soundLevel}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
