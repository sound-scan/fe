import { Place, TimeSlot } from '@/types';

// 시간대별 소리 레벨 생성 헬퍼 함수
const generateTimeBasedLevels = (baseLevel: number, variation: number = 15): TimeSlot[] => {
  const times = ['오전\n6-9시', '낮\n9-12시', '점심\n12-14시', '오후\n14-18시', '저녁\n18-21시', '밤\n21-24시'];
  return times.map((time, index) => {
    // 점심시간과 저녁시간에 더 시끄럽게
    let levelModifier = 0;
    if (index === 2) levelModifier = variation; // 점심
    else if (index === 4) levelModifier = variation * 0.7; // 저녁
    else if (index === 0 || index === 5) levelModifier = -variation * 0.5; // 오전, 밤

    return {
      time,
      level: Math.min(100, Math.max(0, Math.round(baseLevel + levelModifier)))
    };
  });
};

export const places: Place[] = [
  {
    id: 1,
    name: '스타벅스 강남역점',
    lat: 37.4979,
    lng: 127.0276,
    soundLevel: 75,
    timeBasedLevels: generateTimeBasedLevels(75, 15),
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
    timeBasedLevels: generateTimeBasedLevels(15, 8),
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
    timeBasedLevels: generateTimeBasedLevels(65, 18),
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
    timeBasedLevels: generateTimeBasedLevels(20, 10),
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
    timeBasedLevels: generateTimeBasedLevels(40, 15),
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
    timeBasedLevels: generateTimeBasedLevels(55, 16),
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
  {
    id: 7,
    name: '코엑스 스타필드 라이브러리',
    lat: 37.5119,
    lng: 127.0602,
    soundLevel: 25,
    timeBasedLevels: generateTimeBasedLevels(25, 12),
    reviews: [
      {
        soundLevel: 20,
        rating: 5,
        comment: '인스타 감성도 챙기고 공부도 할 수 있는 완벽한 공간!',
      },
      {
        soundLevel: 30,
        rating: 4,
        comment: '사람이 많지만 생각보다 조용해요. 집중하기 좋습니다.',
      },
    ],
  },
  {
    id: 8,
    name: '이디야 이태원점',
    lat: 37.5346,
    lng: 126.9946,
    soundLevel: 42,
    timeBasedLevels: generateTimeBasedLevels(42, 14),
    reviews: [
      {
        soundLevel: 38,
        rating: 4,
        comment: '적당한 배경음악과 조용한 분위기. 노트북 작업하기 좋아요.',
      },
      {
        soundLevel: 46,
        rating: 4,
        comment: '편안하게 공부할 수 있는 동네 카페 느낌이에요.',
      },
    ],
  },
  {
    id: 9,
    name: '망원동 북카페 책과 인생',
    lat: 37.5557,
    lng: 126.9024,
    soundLevel: 28,
    timeBasedLevels: generateTimeBasedLevels(28, 10),
    reviews: [
      {
        soundLevel: 25,
        rating: 5,
        comment: '아늑하고 조용한 공간. 독서와 공부에 최적이에요.',
      },
      {
        soundLevel: 31,
        rating: 5,
        comment: '힐링되는 분위기. 혼자 시간 보내기 딱 좋아요.',
      },
    ],
  },
  {
    id: 10,
    name: '커피스미스 연남점',
    lat: 37.5658,
    lng: 126.9252,
    soundLevel: 52,
    timeBasedLevels: generateTimeBasedLevels(52, 15),
    reviews: [
      {
        soundLevel: 48,
        rating: 4,
        comment: '조용한 편이지만 대화도 가능한 밸런스 좋은 카페.',
      },
      {
        soundLevel: 56,
        rating: 4,
        comment: '친구와 담소하기 딱 좋은 분위기예요.',
      },
    ],
  },
  {
    id: 11,
    name: '성수동 대림창고 카페',
    lat: 37.5445,
    lng: 127.0558,
    soundLevel: 68,
    timeBasedLevels: generateTimeBasedLevels(68, 17),
    reviews: [
      {
        soundLevel: 65,
        rating: 4,
        comment: '활기차고 트렌디한 분위기! 친구들과 브런치 즐기기 좋아요.',
      },
      {
        soundLevel: 71,
        rating: 5,
        comment: '소셜 모임하기 완벽. 에너지 넘치는 공간이에요.',
      },
    ],
  },
  {
    id: 12,
    name: '한양대 백남학술정보관',
    lat: 37.5566,
    lng: 127.0446,
    soundLevel: 18,
    timeBasedLevels: generateTimeBasedLevels(18, 9),
    reviews: [
      {
        soundLevel: 15,
        rating: 5,
        comment: '시험기간엔 최고의 선택. 완벽한 집중 환경!',
      },
      {
        soundLevel: 21,
        rating: 5,
        comment: '매우 조용하고 쾌적해요. 장시간 공부 가능.',
      },
    ],
  },
  {
    id: 13,
    name: '카페 노티드 성수점',
    lat: 37.5447,
    lng: 127.0547,
    soundLevel: 72,
    timeBasedLevels: generateTimeBasedLevels(72, 16),
    reviews: [
      {
        soundLevel: 68,
        rating: 4,
        comment: '핫플이라 사람도 많고 활기차요! 데이트나 모임 추천.',
      },
      {
        soundLevel: 76,
        rating: 5,
        comment: '왁자지껄 즐거운 분위기. 친구들과 수다 떨기 좋아요.',
      },
    ],
  },
  {
    id: 14,
    name: '빈브라더스 삼청점',
    lat: 37.5835,
    lng: 126.9825,
    soundLevel: 35,
    timeBasedLevels: generateTimeBasedLevels(35, 12),
    reviews: [
      {
        soundLevel: 32,
        rating: 4,
        comment: '고즈넉한 삼청동 분위기. 조용히 독서하기 좋아요.',
      },
      {
        soundLevel: 38,
        rating: 4,
        comment: '차분한 공간. 가벼운 업무 처리하기 적합해요.',
      },
    ],
  },
  {
    id: 15,
    name: '서울시립도서관',
    lat: 37.5668,
    lng: 126.9784,
    soundLevel: 12,
    timeBasedLevels: generateTimeBasedLevels(12, 7),
    reviews: [
      {
        soundLevel: 10,
        rating: 5,
        comment: '서울 최고의 공부 스팟! 정말 조용하고 집중 잘 돼요.',
      },
      {
        soundLevel: 14,
        rating: 5,
        comment: '완벽한 정숙. 시험공부나 논문 작성에 최적.',
      },
    ],
  },
  {
    id: 16,
    name: '폴바셋 광화문점',
    lat: 37.5704,
    lng: 126.9772,
    soundLevel: 58,
    timeBasedLevels: generateTimeBasedLevels(58, 16),
    reviews: [
      {
        soundLevel: 55,
        rating: 4,
        comment: '직장인들 많지만 대화 소리가 적당해요.',
      },
      {
        soundLevel: 61,
        rating: 4,
        comment: '업무 미팅하기 좋은 분위기. 적당히 활기차요.',
      },
    ],
  },
  {
    id: 17,
    name: '연세대 학술정보원',
    lat: 37.5663,
    lng: 126.9387,
    soundLevel: 17,
    timeBasedLevels: generateTimeBasedLevels(17, 9),
    reviews: [
      {
        soundLevel: 15,
        rating: 5,
        comment: '공부하기 정말 좋아요. 조용하고 쾌적합니다.',
      },
      {
        soundLevel: 19,
        rating: 5,
        comment: '집중력 MAX! 시험 기간 최애 장소.',
      },
    ],
  },
  {
    id: 18,
    name: '블루보틀 삼청점',
    lat: 37.5818,
    lng: 126.9836,
    soundLevel: 44,
    timeBasedLevels: generateTimeBasedLevels(44, 14),
    reviews: [
      {
        soundLevel: 41,
        rating: 4,
        comment: '조용한 편이라 노트북 작업하기 좋아요.',
      },
      {
        soundLevel: 47,
        rating: 4,
        comment: '차분한 분위기. 집중도 대화도 가능해요.',
      },
    ],
  },
  {
    id: 19,
    name: '탐앤탐스 건대입구점',
    lat: 37.5403,
    lng: 127.0697,
    soundLevel: 70,
    timeBasedLevels: generateTimeBasedLevels(70, 18),
    reviews: [
      {
        soundLevel: 67,
        rating: 4,
        comment: '대학가라 젊고 활기찬 분위기! 친구들과 만나기 좋아요.',
      },
      {
        soundLevel: 73,
        rating: 4,
        comment: '왁자지껄한 카페. 부담 없이 수다 떨기 좋아요.',
      },
    ],
  },
  {
    id: 20,
    name: '국회도서관',
    lat: 37.5311,
    lng: 126.9145,
    soundLevel: 10,
    timeBasedLevels: generateTimeBasedLevels(10, 6),
    reviews: [
      {
        soundLevel: 8,
        rating: 5,
        comment: '서울에서 가장 조용한 곳 중 하나. 진지한 연구에 최적.',
      },
      {
        soundLevel: 12,
        rating: 5,
        comment: '완벽한 집중 환경. 논문 쓰기 딱 좋아요.',
      },
    ],
  },
];