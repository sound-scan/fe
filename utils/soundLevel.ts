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
