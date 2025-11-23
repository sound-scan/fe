// 소리 종류 분류 (Sound Type Classification)
export enum SoundType {
  CONVERSATION = 'conversation', // 사람 대화 소리
  KEYBOARD = 'keyboard', // 키보드/마우스 사용 소리
  MACHINE = 'machine', // 카페 머신 소리
  MUSIC = 'music', // 배경 음악
  TRAFFIC = 'traffic', // 거리 소음
  IMPACT = 'impact', // 기타 충격음
}

// 소리 분류 정보
export interface SoundClassification {
  type: SoundType;
  percentage: number; // 0-100
}

// AI 분석 결과
export interface SoundAnalysis {
  classifications: SoundClassification[]; // 소리 종류별 비율
  perceivedNoiseScore: number; // 체감 소음 점수 (0-100)
  irregularity: number; // 불규칙성 (0-100)
  peakCount: number; // 갑작스러운 피크 횟수
  nsi: number; // Noise Stress Index (0-100)
}

export interface Review {
  soundLevel: number;
  rating: number;
  comment: string;
  analysis?: SoundAnalysis; // AI 분석 결과 (선택적)
}

export interface TimeSlot {
  time: string;
  level: number;
  nsi?: number; // NSI 추가
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  soundLevel: number;
  nsi?: number; // NSI 추가
  reviews: Review[];
  timeBasedLevels: TimeSlot[];
  analysis?: SoundAnalysis; // 장소별 평균 분석 결과
}

export interface Measurement {
  placeId?: number;
  soundLevel: number;
  timestamp: number;
  analysis?: SoundAnalysis; // 측정 시 분석 결과
}

// 일정 연동 추천을 위한 타입
export enum ActivityPurpose {
  STUDY = 'study', // 공부
  MEETING = 'meeting', // 회의
  RELAX = 'relax', // 휴식
  CONVERSATION = 'conversation', // 대화
}

export interface ScheduleRecommendation {
  date: string; // ISO 형식 날짜
  time: string; // HH:mm 형식
  location: string; // 대략적인 위치
  purpose: ActivityPurpose; // 목적
}

export interface RecommendedPlace extends Place {
  score: number; // 추천 점수 (0-100)
  reason: string; // 추천 이유
  travelTime?: number; // 이동 시간 (분)
  predictedNSI?: number; // 예상 NSI
}
