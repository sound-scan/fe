import { SoundType, SoundAnalysis, SoundClassification } from '@/types';

export function getSoundLevelColor(soundLevel: number): string {
  if (soundLevel <= 30) return '#6EE7B7'; // 민트: 정적에 가까운 조용함
  if (soundLevel <= 50) return '#FACC15'; // 따뜻한 노랑: 부드러운 백색소음
  if (soundLevel <= 70) return '#FB923C'; // 코랄: 편안한 대화가 가능한 공간
  return '#F43F5E'; // 로즈레드: 활발한 소통에 최적
}

export function getSoundLevelDescription(soundLevel: number): {
  level: string;
  activity: string;
} {
  if (soundLevel <= 30) {
    return {
      level: '정적에 가까운 조용함',
      activity: '깊은 집중이 잘 되는 고요한 환경',
    };
  }
  if (soundLevel <= 50) {
    return {
      level: '부드러운 백색소음',
      activity: '조용한 대화도 가능하며 공부·작업에 안정적',
    };
  }
  if (soundLevel <= 70) {
    return {
      level: '편안한 대화가 가능한 공간',
      activity: '일상 모임·팀플·가벼운 대화에 적당한 편안함',
    };
  }
  return {
    level: '활발한 소통에 최적',
    activity: '친구와 대화·모임하기 좋은 밝고 활기찬 분위기',
  };
}

/**
 * NSI (Noise Stress Index) 계산
 * 0-100 범위의 소음 스트레스 지수
 */
export function calculateNSI(
  soundLevel: number,
  irregularity: number = 0,
  peakCount: number = 0,
  classifications?: SoundClassification[]
): number {
  // 기본 점수: 데시벨 기반 (0-100)
  let nsi = soundLevel;

  // 불규칙성 가중치 (0-20점 추가)
  nsi += irregularity * 0.2;

  // 피크 횟수 가중치 (피크 1회당 2점 추가, 최대 10점)
  nsi += Math.min(peakCount * 2, 10);

  // 소리 종류별 가중치
  if (classifications) {
    classifications.forEach((classification) => {
      switch (classification.type) {
        case SoundType.CONVERSATION:
          // 사람 대화 소리는 더 신경 쓰임 (+5점)
          nsi += (classification.percentage / 100) * 5;
          break;
        case SoundType.IMPACT:
          // 충격음은 스트레스 증가 (+8점)
          nsi += (classification.percentage / 100) * 8;
          break;
        case SoundType.TRAFFIC:
          // 거리 소음 (+6점)
          nsi += (classification.percentage / 100) * 6;
          break;
        case SoundType.MUSIC:
          // 배경 음악은 상대적으로 덜 신경 쓰임 (-2점)
          nsi -= (classification.percentage / 100) * 2;
          break;
      }
    });
  }

  // 0-100 범위로 제한
  return Math.max(0, Math.min(100, Math.round(nsi)));
}

/**
 * NSI 레벨 설명 가져오기
 */
export function getNSIDescription(
  nsi: number,
  language: 'ko' | 'en' = 'ko'
): {
  level: string;
  description: string;
  color: string;
  emoji: string;
} {
  if (nsi <= 25) {
    return {
      level: language === 'ko' ? '매우 조용함' : 'Very Quiet',
      description:
        language === 'ko'
          ? '깊은 집중과 휴식에 이상적인 환경'
          : 'Ideal for deep focus and relaxation',
      color: '#10B981', // 그린
      emoji: '🌿',
    };
  }
  if (nsi <= 45) {
    return {
      level: language === 'ko' ? '조용한 편' : 'Quiet',
      description:
        language === 'ko'
          ? '공부와 업무에 적합한 안정적인 분위기'
          : 'Suitable for study and work',
      color: '#3B82F6', // 블루
      emoji: '📚',
    };
  }
  if (nsi <= 65) {
    return {
      level: language === 'ko' ? '일반적인 카페 수준' : 'Normal Cafe Level',
      description:
        language === 'ko'
          ? '가벼운 대화와 작업에 적당한 환경'
          : 'Good for light conversation and work',
      color: '#F59E0B', // 오렌지
      emoji: '☕',
    };
  }
  if (nsi <= 85) {
    return {
      level: language === 'ko' ? '시끄러움' : 'Noisy',
      description:
        language === 'ko'
          ? '대화 중심 활동에는 적합하나 집중이 어려움'
          : 'Suitable for socializing, difficult to focus',
      color: '#EF4444', // 레드
      emoji: '🔊',
    };
  }
  return {
    level: language === 'ko' ? '회피 권장' : 'Avoid',
    description:
      language === 'ko'
        ? '매우 시끄러워 대부분의 활동에 부적합'
        : 'Too noisy for most activities',
    color: '#991B1B', // 다크레드
    emoji: '⚠️',
  };
}

/**
 * 모의 AI 분석 (실제로는 서버에서 처리)
 * 프론트엔드에서는 간단한 규칙 기반 분석 사용
 */
export function mockSoundAnalysis(
  soundLevel: number,
  frequencyData?: Uint8Array
): SoundAnalysis {
  // 간단한 규칙 기반 분류 (실제로는 AI 모델 사용)
  const classifications: SoundClassification[] = [];

  // 소리 레벨에 따라 대략적인 분류
  if (soundLevel < 40) {
    // 조용한 환경
    classifications.push(
      { type: SoundType.MUSIC, percentage: 40 },
      { type: SoundType.KEYBOARD, percentage: 30 },
      { type: SoundType.CONVERSATION, percentage: 20 },
      { type: SoundType.MACHINE, percentage: 10 }
    );
  } else if (soundLevel < 70) {
    // 중간 소음
    classifications.push(
      { type: SoundType.CONVERSATION, percentage: 45 },
      { type: SoundType.MACHINE, percentage: 25 },
      { type: SoundType.MUSIC, percentage: 20 },
      { type: SoundType.KEYBOARD, percentage: 10 }
    );
  } else {
    // 시끄러운 환경
    classifications.push(
      { type: SoundType.CONVERSATION, percentage: 60 },
      { type: SoundType.MACHINE, percentage: 20 },
      { type: SoundType.TRAFFIC, percentage: 15 },
      { type: SoundType.IMPACT, percentage: 5 }
    );
  }

  // 불규칙성 계산 (간단한 랜덤 값, 실제로는 주파수 데이터 분석)
  const irregularity = Math.min(100, soundLevel * 0.3 + Math.random() * 20);

  // 피크 횟수 (간단한 추정)
  const peakCount = Math.floor(soundLevel / 20);

  // NSI 계산
  const nsi = calculateNSI(soundLevel, irregularity, peakCount, classifications);

  // 체감 소음 점수 (데시벨 + 불규칙성)
  const perceivedNoiseScore = Math.min(
    100,
    Math.round(soundLevel * 0.7 + irregularity * 0.3)
  );

  return {
    classifications,
    perceivedNoiseScore,
    irregularity: Math.round(irregularity),
    peakCount,
    nsi,
  };
}

/**
 * 소리 종류 이름 가져오기
 */
export function getSoundTypeName(
  type: SoundType,
  language: 'ko' | 'en' = 'ko'
): string {
  const names = {
    ko: {
      [SoundType.CONVERSATION]: '사람 대화',
      [SoundType.KEYBOARD]: '키보드/마우스',
      [SoundType.MACHINE]: '카페 머신',
      [SoundType.MUSIC]: '배경 음악',
      [SoundType.TRAFFIC]: '거리 소음',
      [SoundType.IMPACT]: '충격음',
    },
    en: {
      [SoundType.CONVERSATION]: 'Conversation',
      [SoundType.KEYBOARD]: 'Keyboard/Mouse',
      [SoundType.MACHINE]: 'Machine',
      [SoundType.MUSIC]: 'Music',
      [SoundType.TRAFFIC]: 'Traffic',
      [SoundType.IMPACT]: 'Impact',
    },
  };

  return names[language][type];
}

/**
 * 소리 종류 아이콘 가져오기
 */
export function getSoundTypeIcon(type: SoundType): string {
  const icons = {
    [SoundType.CONVERSATION]: '💬',
    [SoundType.KEYBOARD]: '⌨️',
    [SoundType.MACHINE]: '☕',
    [SoundType.MUSIC]: '🎵',
    [SoundType.TRAFFIC]: '🚗',
    [SoundType.IMPACT]: '💥',
  };

  return icons[type];
}
