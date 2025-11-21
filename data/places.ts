import { Place, TimeSlot } from '@/types';

// 시간대별 소리 레벨 생성 헬퍼 함수
const generateTimeBasedLevels = (baseLevel: number, variation: number = 15, lang: 'ko' | 'en' = 'ko'): TimeSlot[] => {
  const times = lang === 'ko'
    ? ['오전\n6-9시', '낮\n9-12시', '점심\n12-14시', '오후\n14-18시', '저녁\n18-21시', '밤\n21-24시']
    : ['Morning\n6-9', 'Late AM\n9-12', 'Lunch\n12-14', 'Afternoon\n14-18', 'Evening\n18-21', 'Night\n21-24'];
  return times.map((time, index) => {
    let levelModifier = 0;
    if (index === 2) levelModifier = variation;
    else if (index === 4) levelModifier = variation * 0.7;
    else if (index === 0 || index === 5) levelModifier = -variation * 0.5;

    return {
      time,
      level: Math.min(100, Math.max(0, Math.round(baseLevel + levelModifier)))
    };
  });
};

// 런던 장소 데이터
export const placesEN: Place[] = [
  {
    id: 1,
    name: 'British Library',
    lat: 51.5299,
    lng: -0.1270,
    soundLevel: 12,
    timeBasedLevels: generateTimeBasedLevels(12, 7, 'en'),
    reviews: [
      { soundLevel: 10, rating: 5, comment: 'Perfect for focused study. Very quiet and peaceful.' },
      { soundLevel: 14, rating: 5, comment: 'Excellent environment for research and concentration.' },
    ],
  },
  {
    id: 2,
    name: 'Starbucks Piccadilly Circus',
    lat: 51.5101,
    lng: -0.1340,
    soundLevel: 78,
    timeBasedLevels: generateTimeBasedLevels(78, 16, 'en'),
    reviews: [
      { soundLevel: 75, rating: 4, comment: 'Lively atmosphere! Great for meeting friends.' },
      { soundLevel: 81, rating: 4, comment: 'Busy and energetic. Perfect for casual conversations.' },
      { soundLevel: 72, rating: 5, comment: 'Brilliant spot for people watching. Love the buzz!' },
      { soundLevel: 85, rating: 3, comment: 'Can get quite loud during peak hours, but great coffee.' },
      { soundLevel: 77, rating: 4, comment: 'Classic West End vibes. Perfect for social catch-ups.' },
    ],
  },
  {
    id: 3,
    name: 'London Library',
    lat: 51.5074,
    lng: -0.1359,
    soundLevel: 15,
    timeBasedLevels: generateTimeBasedLevels(15, 8, 'en'),
    reviews: [
      { soundLevel: 12, rating: 5, comment: 'Absolutely silent. Ideal for serious academic work.' },
      { soundLevel: 18, rating: 5, comment: 'Premium quiet space for focused research.' },
      { soundLevel: 14, rating: 5, comment: 'Historic atmosphere. Perfect for deep concentration.' },
      { soundLevel: 16, rating: 5, comment: 'One of the best libraries in London. Whisper quiet!' },
      { soundLevel: 13, rating: 5, comment: 'Stunning collection and blissfully peaceful.' },
    ],
  },
  {
    id: 4,
    name: 'Caffè Nero Covent Garden',
    lat: 51.5118,
    lng: -0.1220,
    soundLevel: 62,
    timeBasedLevels: generateTimeBasedLevels(62, 17, 'en'),
    reviews: [
      { soundLevel: 58, rating: 4, comment: 'Moderate noise. Good for light work and socializing.' },
      { soundLevel: 66, rating: 4, comment: 'Busy but comfortable. Nice for meeting colleagues.' },
    ],
  },
  {
    id: 5,
    name: 'Costa Coffee Oxford Street',
    lat: 51.5155,
    lng: -0.1415,
    soundLevel: 70,
    timeBasedLevels: generateTimeBasedLevels(70, 18, 'en'),
    reviews: [
      { soundLevel: 67, rating: 4, comment: 'Lively shopping district vibe. Great for casual meetings.' },
      { soundLevel: 73, rating: 4, comment: 'Energetic atmosphere, perfect for social gatherings.' },
    ],
  },
  {
    id: 6,
    name: 'Senate House Library',
    lat: 51.5216,
    lng: -0.1300,
    soundLevel: 18,
    timeBasedLevels: generateTimeBasedLevels(18, 9, 'en'),
    reviews: [
      { soundLevel: 16, rating: 5, comment: 'Very quiet reading rooms. Excellent for study.' },
      { soundLevel: 20, rating: 5, comment: 'Perfect silent environment for deep work.' },
    ],
  },
  {
    id: 7,
    name: 'Pret A Manger Kings Cross',
    lat: 51.5308,
    lng: -0.1238,
    soundLevel: 55,
    timeBasedLevels: generateTimeBasedLevels(55, 15, 'en'),
    reviews: [
      { soundLevel: 52, rating: 4, comment: 'Reasonable noise level. Good for quick work sessions.' },
      { soundLevel: 58, rating: 4, comment: 'Balanced atmosphere for both work and chat.' },
    ],
  },
  {
    id: 8,
    name: 'Wellcome Collection Library',
    lat: 51.5259,
    lng: -0.1337,
    soundLevel: 20,
    timeBasedLevels: generateTimeBasedLevels(20, 10, 'en'),
    reviews: [
      { soundLevel: 18, rating: 5, comment: 'Peaceful and inspiring space. Great for research.' },
      { soundLevel: 22, rating: 5, comment: 'Quiet and comfortable reading environment.' },
    ],
  },
  {
    id: 9,
    name: 'Flat White Soho',
    lat: 51.5138,
    lng: -0.1368,
    soundLevel: 58,
    timeBasedLevels: generateTimeBasedLevels(58, 14, 'en'),
    reviews: [
      { soundLevel: 55, rating: 4, comment: 'Cozy Soho café. Great for catching up with mates.' },
      { soundLevel: 61, rating: 4, comment: 'Nice background buzz. Lovely flat whites!' },
    ],
  },
  {
    id: 10,
    name: 'Barbican Library',
    lat: 51.5200,
    lng: -0.0936,
    soundLevel: 22,
    timeBasedLevels: generateTimeBasedLevels(22, 10, 'en'),
    reviews: [
      { soundLevel: 20, rating: 5, comment: 'Hidden gem! Very quiet and great architecture.' },
      { soundLevel: 24, rating: 5, comment: 'Perfect for focused reading and study sessions.' },
    ],
  },
  {
    id: 11,
    name: 'The Breakfast Club Angel',
    lat: 51.5345,
    lng: -0.1049,
    soundLevel: 75,
    timeBasedLevels: generateTimeBasedLevels(75, 18, 'en'),
    reviews: [
      { soundLevel: 72, rating: 4, comment: 'Fun and buzzy brunch spot. Great for groups!' },
      { soundLevel: 78, rating: 4, comment: 'Loud but lovely atmosphere. Proper good vibes.' },
    ],
  },
  {
    id: 12,
    name: 'Foyles Bookshop Café',
    lat: 51.5150,
    lng: -0.1305,
    soundLevel: 35,
    timeBasedLevels: generateTimeBasedLevels(35, 12, 'en'),
    reviews: [
      { soundLevel: 32, rating: 5, comment: 'Quiet spot surrounded by books. Heaven!' },
      { soundLevel: 38, rating: 4, comment: 'Calm atmosphere. Perfect for reading and light work.' },
    ],
  },
  {
    id: 13,
    name: 'Joe & The Juice Borough',
    lat: 51.5058,
    lng: -0.0895,
    soundLevel: 65,
    timeBasedLevels: generateTimeBasedLevels(65, 15, 'en'),
    reviews: [
      { soundLevel: 62, rating: 4, comment: 'Trendy spot near Borough Market. Lively vibe!' },
      { soundLevel: 68, rating: 4, comment: 'Good energy, great smoothies. Nice for chats.' },
    ],
  },
  {
    id: 14,
    name: 'Imperial College Library',
    lat: 51.4988,
    lng: -0.1749,
    soundLevel: 16,
    timeBasedLevels: generateTimeBasedLevels(16, 8, 'en'),
    reviews: [
      { soundLevel: 14, rating: 5, comment: 'Excellent study environment. Pin-drop silence.' },
      { soundLevel: 18, rating: 5, comment: 'Top-notch facilities. Perfect for revision.' },
    ],
  },
  {
    id: 15,
    name: 'Notes Coffee Trafalgar Square',
    lat: 51.5078,
    lng: -0.1280,
    soundLevel: 52,
    timeBasedLevels: generateTimeBasedLevels(52, 14, 'en'),
    reviews: [
      { soundLevel: 49, rating: 4, comment: 'Lovely independent café. Moderate buzz.' },
      { soundLevel: 55, rating: 4, comment: 'Great spot for laptop work between meetings.' },
    ],
  },
  {
    id: 16,
    name: 'The Ned - Members Club',
    lat: 51.5137,
    lng: -0.0878,
    soundLevel: 68,
    timeBasedLevels: generateTimeBasedLevels(68, 16, 'en'),
    reviews: [
      { soundLevel: 65, rating: 5, comment: 'Stunning interiors. Classy social atmosphere.' },
      { soundLevel: 71, rating: 4, comment: 'Buzzy but sophisticated. Great for networking.' },
    ],
  },
  {
    id: 17,
    name: 'LSE Library',
    lat: 51.5144,
    lng: -0.1165,
    soundLevel: 14,
    timeBasedLevels: generateTimeBasedLevels(14, 7, 'en'),
    reviews: [
      { soundLevel: 12, rating: 5, comment: 'Extremely quiet. Brilliant study environment.' },
      { soundLevel: 16, rating: 5, comment: 'One of the best academic libraries in London.' },
    ],
  },
  {
    id: 18,
    name: 'Grind Coffee Greenwich',
    lat: 51.4813,
    lng: -0.0077,
    soundLevel: 48,
    timeBasedLevels: generateTimeBasedLevels(48, 13, 'en'),
    reviews: [
      { soundLevel: 45, rating: 4, comment: 'Relaxed Greenwich vibe. Good for remote work.' },
      { soundLevel: 51, rating: 4, comment: 'Nice balance of quiet and atmosphere.' },
    ],
  },
];

// 서울 장소 데이터
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
  {
    id: 21,
    name: '합정역 일리카페',
    lat: 37.5493,
    lng: 126.9144,
    soundLevel: 48,
    timeBasedLevels: generateTimeBasedLevels(48, 14),
    reviews: [
      {
        soundLevel: 45,
        rating: 4,
        comment: '적당히 조용해서 노트북 작업하기 좋아요.',
      },
      {
        soundLevel: 51,
        rating: 4,
        comment: '잔잔한 음악과 대화 소리가 있어 편안합니다.',
      },
    ],
  },
  {
    id: 22,
    name: '연남동 스탠스커피',
    lat: 37.5662,
    lng: 126.9220,
    soundLevel: 62,
    timeBasedLevels: generateTimeBasedLevels(62, 18),
    reviews: [
      {
        soundLevel: 58,
        rating: 4,
        comment: '밝고 활기찬 공간. 친구랑 얘기하기 좋아요.',
      },
      {
        soundLevel: 66,
        rating: 4,
        comment: '대화하기 편안한 분위기입니다.',
      },
    ],
  },
  {
    id: 23,
    name: '삼청동 북카페 라운지',
    lat: 37.5827,
    lng: 126.9829,
    soundLevel: 28,
    timeBasedLevels: generateTimeBasedLevels(28, 10),
    reviews: [
      {
        soundLevel: 25,
        rating: 5,
        comment: '조용하고 아늑해서 독서하기 좋아요.',
      },
      {
        soundLevel: 31,
        rating: 5,
        comment: '힐링되는 분위기. 혼자 시간 보내기 좋습니다.',
      },
    ],
  },
  {
    id: 24,
    name: '광화문 교보문고 라운지',
    lat: 37.5713,
    lng: 126.9768,
    soundLevel: 22,
    timeBasedLevels: generateTimeBasedLevels(22, 12),
    reviews: [
      {
        soundLevel: 20,
        rating: 5,
        comment: '차분한 분위기. 집중 잘 되는 환경입니다.',
      },
      {
        soundLevel: 24,
        rating: 5,
        comment: '조용해서 공부하기 좋아요.',
      },
    ],
  },
  {
    id: 25,
    name: '건대 커먼그라운드 카페존',
    lat: 37.5400,
    lng: 127.0664,
    soundLevel: 72,
    timeBasedLevels: generateTimeBasedLevels(72, 16),
    reviews: [
      {
        soundLevel: 68,
        rating: 4,
        comment: '젊고 활기찬 분위기! 친구랑 놀기 좋아요.',
      },
      {
        soundLevel: 76,
        rating: 4,
        comment: '인기 많은 장소라 꽤 활기차요.',
      },
    ],
  },
  {
    id: 26,
    name: '성북구 삼선동 조용한 책방',
    lat: 37.5864,
    lng: 127.0166,
    soundLevel: 18,
    timeBasedLevels: generateTimeBasedLevels(18, 8),
    reviews: [
      {
        soundLevel: 16,
        rating: 5,
        comment: '정말 조용하고 집중 잘 돼요.',
      },
      {
        soundLevel: 20,
        rating: 5,
        comment: '혼자 공부하기 딱 좋은 곳입니다.',
      },
    ],
  },
  {
    id: 27,
    name: '사당 이디야 카페',
    lat: 37.4753,
    lng: 126.9816,
    soundLevel: 52,
    timeBasedLevels: generateTimeBasedLevels(52, 14),
    reviews: [
      {
        soundLevel: 49,
        rating: 4,
        comment: '일상적인 카페 소음. 대화·작업 둘 다 가능.',
      },
      {
        soundLevel: 55,
        rating: 4,
        comment: '편안한 분위기에서 대화하기 좋습니다.',
      },
    ],
  },
  {
    id: 28,
    name: '왕십리 민트라떼 카페',
    lat: 37.5617,
    lng: 127.0382,
    soundLevel: 38,
    timeBasedLevels: generateTimeBasedLevels(38, 12),
    reviews: [
      {
        soundLevel: 35,
        rating: 4,
        comment: '적당히 조용해서 공부하기 좋았어요.',
      },
      {
        soundLevel: 41,
        rating: 4,
        comment: '노트북 작업하기 편안한 분위기.',
      },
    ],
  },
  {
    id: 29,
    name: '신림역 청춘카페',
    lat: 37.4842,
    lng: 126.9295,
    soundLevel: 68,
    timeBasedLevels: generateTimeBasedLevels(68, 15),
    reviews: [
      {
        soundLevel: 65,
        rating: 4,
        comment: '대학가 분위기! 친구들이랑 수다 떨기 좋아요.',
      },
      {
        soundLevel: 71,
        rating: 4,
        comment: '밝고 활기차서 모임하기 좋습니다.',
      },
    ],
  },
  {
    id: 30,
    name: '압구정 로스터리랩',
    lat: 37.5264,
    lng: 127.0286,
    soundLevel: 55,
    timeBasedLevels: generateTimeBasedLevels(55, 13),
    reviews: [
      {
        soundLevel: 52,
        rating: 4,
        comment: '조용한 편이라 작업하기 괜찮아요.',
      },
      {
        soundLevel: 58,
        rating: 4,
        comment: '적당히 활기차서 대화도 편합니다.',
      },
    ],
  }
];