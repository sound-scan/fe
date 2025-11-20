export function getSoundLevelColor(soundLevel: number): string {
  if (soundLevel <= 30) return '#22c55e'; // 녹색: 매우 조용
  if (soundLevel <= 50) return '#eab308'; // 노랑: 적당히 조용
  if (soundLevel <= 70) return '#f97316'; // 주황: 보통 분위기
  return '#ef4444'; // 빨강: 활기참
}

export function getSoundLevelDescription(soundLevel: number): {
  level: string;
  activity: string;
} {
  if (soundLevel <= 30) {
    return {
      level: '매우 조용함',
      activity: '혼자 공부·작업에 최적',
    };
  }
  if (soundLevel <= 50) {
    return {
      level: '적당히 조용함',
      activity: '공부 + 조용한 대화도 가능',
    };
  }
  if (soundLevel <= 70) {
    return {
      level: '보통 분위기',
      activity: '친구와 가벼운 대화에 좋음',
    };
  }
  return {
    level: '활기참',
    activity: '수다, 모임, 소셜 활동에 좋음',
  };
}
