import { Place } from '@/types';

export const places: Place[] = [
  {
    id: 1,
    name: '스타벅스 강남역점',
    lat: 37.4979,
    lng: 127.0276,
    soundLevel: 75,
    reviews: [
      {
        soundLevel: 70,
        rating: 4,
        comment: '친구랑 이야기 나누기 좋아요! 활기찬 분위기라 편하게 수다 떨 수 있어요.',
      },
      {
        soundLevel: 80,
        rating: 5,
        comment: '소셜 모임하기 딱 좋은 공간입니다. 에너지 넘치는 카페!',
      },
    ],
  },
  {
    id: 2,
    name: '국립중앙도서관',
    lat: 37.5168,
    lng: 127.0398,
    soundLevel: 15,
    reviews: [
      {
        soundLevel: 10,
        rating: 5,
        comment: '공부하기 최적의 장소! 집중력이 200% 올라가요.',
      },
      {
        soundLevel: 20,
        rating: 5,
        comment: '매우 조용해서 혼자 작업하기 완벽합니다.',
      },
    ],
  },
  {
    id: 3,
    name: '홍대 엔제리너스',
    lat: 37.5563,
    lng: 126.9235,
    soundLevel: 65,
    reviews: [
      {
        soundLevel: 60,
        rating: 4,
        comment: '보통 분위기라 공부도, 대화도 적당히 할 수 있어요.',
      },
      {
        soundLevel: 70,
        rating: 4,
        comment: '활기차고 밝은 공간이에요. 친구랑 가볍게 얘기하기 좋아요.',
      },
    ],
  },
  {
    id: 4,
    name: '서울대 중앙도서관',
    lat: 37.4601,
    lng: 126.9520,
    soundLevel: 20,
    reviews: [
      {
        soundLevel: 15,
        rating: 5,
        comment: '매우 조용해서 집중하기 너무 좋습니다!',
      },
      {
        soundLevel: 25,
        rating: 5,
        comment: '공부와 작업에 완벽한 환경이에요.',
      },
    ],
  },
  {
    id: 5,
    name: '카페 온더테이블',
    lat: 37.5172,
    lng: 127.0473,
    soundLevel: 40,
    reviews: [
      {
        soundLevel: 35,
        rating: 4,
        comment: '적당히 조용해서 무난하게 집중할 수 있어요.',
      },
      {
        soundLevel: 45,
        rating: 4,
        comment: '조용한 대화도 가능하고 공부도 할 수 있는 균형 잡힌 공간.',
      },
    ],
  },
  {
    id: 6,
    name: '투썸플레이스 신촌점',
    lat: 37.5584,
    lng: 126.9377,
    soundLevel: 55,
    reviews: [
      {
        soundLevel: 50,
        rating: 4,
        comment: '적당히 조용해서 공부도 대화도 모두 괜찮아요.',
      },
      {
        soundLevel: 60,
        rating: 4,
        comment: '밝고 편안한 분위기. 가볍게 이야기 나누기 좋아요.',
      },
    ],
  },
];
