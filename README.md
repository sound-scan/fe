# Sound Scan 🎵

**지도 기반 소리 리뷰 웹앱 MVP**

Sound Scan은 카페, 도서관, 독서실 등의 장소를 지도에서 확인하고, 각 장소의 소리 환경이 어떤 활동에 적합한지 보여주는 서비스입니다.

## ✨ 주요 기능

### 🗺️ Map 페이지
- **Leaflet 기반 인터랙티브 지도**
- 서울 전역 20개 장소 데이터
- 소리 레벨에 따른 마커 색상 구분:
  - 🟢 녹색 (0-30): 매우 조용 — 공부/작업에 최고
  - 🟡 노랑 (31-50): 적당히 조용 — 공부 + 대화 모두 가능
  - 🟠 주황 (51-70): 보통 분위기 — 밝고 편안한 공간
  - 🔴 빨강 (71-100): 활기찬 공간 — 친구와 대화/모임 최적
- **필터 기능**: 조용함/보통/활기참 등 원하는 분위기로 필터링
- **검색 기능**: 장소 이름으로 빠르게 찾기
- **현재 위치 버튼**: 내 위치로 지도 이동 (위치 권한 필요)
- 마커 클릭 시 장소 상세 정보 모달
- 리뷰 작성 및 조회 기능
- 접을 수 있는 범례 (화면 공간 절약)

### 🎤 Measure 페이지
- **Web Audio API 기반 실시간 소리 측정**
- 마이크를 통한 주변 소음 측정
- 0-100 범위의 소리 레벨 표시
- 원형 프로그레스 바로 시각화
- 측정 결과를 저장하고 지도로 이동

### 📱 모바일 최적화
- **아이폰 14 사이즈 (390px)** 기준 디자인
- 데스크탑에서는 중앙 정렬 + 양옆 그라데이션 배경
- PWA 지원 준비 (manifest.json)

### 🎯 긍정적 표현 철학
"시끄러움 = 나쁨"이 아닌, **모든 소리 레벨을 긍정적으로 표현**합니다.
- 조용한 곳 → 공부/작업에 최적
- 활기찬 곳 → 친구와 대화/모임에 최적

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Map**: Leaflet
- **Audio**: Web Audio API
- **State Management**: React Context API

## 📦 프로젝트 구조

```
fe/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── globals.css         # 전역 스타일
│   ├── page.tsx            # 홈 (리다이렉트)
│   ├── map/
│   │   └── page.tsx        # 지도 페이지
│   └── measure/
│       └── page.tsx        # 소리 측정 페이지
├── components/
│   ├── Navigation.tsx      # 네비게이션 바
│   ├── MapView.tsx         # Leaflet 지도 컴포넌트
│   ├── PlaceDetailModal.tsx # 장소 상세 모달
│   └── MarkerLegend.tsx    # 마커 범례
├── context/
│   └── AppContext.tsx      # 전역 상태 관리
├── data/
│   └── places.ts           # 하드코딩 장소 데이터
├── types/
│   └── index.ts            # TypeScript 타입 정의
├── utils/
│   └── soundLevel.ts       # 소리 레벨 유틸리티
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 🌐 Vercel 배포

이 프로젝트는 Vercel에 바로 배포할 수 있도록 구성되어 있습니다.

### 배포 방법

1. GitHub 저장소에 코드 푸시
2. [Vercel](https://vercel.com)에 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. "Deploy" 클릭

또는 Vercel CLI 사용:

```bash
npm i -g vercel
vercel
```

## 📱 사용 방법

### 지도에서 장소 찾기
1. Map 페이지에서 지도를 탐색합니다
2. 마커를 클릭하여 장소 상세 정보를 확인합니다
3. 소리 레벨과 리뷰를 확인합니다

### 소리 측정하기
1. Measure 페이지로 이동합니다
2. "측정 시작" 버튼을 클릭합니다
3. 브라우저에서 마이크 권한을 허용합니다
4. 실시간으로 소리 레벨을 확인합니다
5. "저장하고 지도로 돌아가기"를 클릭합니다

### 리뷰 작성하기
1. 장소 상세 모달에서 "리뷰 남기기"를 클릭합니다
2. 소리 레벨, 별점, 코멘트를 입력합니다
3. "리뷰 등록"을 클릭합니다

## 🎨 디자인 특징

- **그라데이션 UI**: 블루-퍼플 그라데이션으로 모던한 느낌
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원
- **부드러운 애니메이션**: 모든 인터랙션에 자연스러운 전환 효과
- **직관적인 색상 코딩**: 소리 레벨을 한눈에 파악 가능

## 📝 데이터 구조

### Place
```typescript
{
  id: number;
  name: string;
  lat: number;
  lng: number;
  soundLevel: number; // 0-100
  reviews: Review[];
}
```

### Review
```typescript
{
  soundLevel: number; // 0-100
  rating: number; // 1-5
  comment: string;
}
```

## 🔧 주요 기술 구현

### Leaflet 통합
- Next.js의 SSR을 비활성화하여 Leaflet 사용
- `dynamic import`로 클라이언트 사이드에서만 로드
- 커스텀 마커로 소리 레벨 시각화

### Web Audio API
- `getUserMedia`로 마이크 액세스
- `AnalyserNode`로 주파수 데이터 분석
- 실시간 amplitude 기반 소리 레벨 계산

### Context API
- 전역 상태로 장소 데이터 관리
- 측정값 및 리뷰 임시 저장
- 컴포넌트 간 데이터 공유

## ⚠️ 주의사항

- 이 프로젝트는 **MVP**로, 백엔드나 데이터베이스를 사용하지 않습니다
- 모든 데이터는 메모리에 임시 저장되며, 페이지를 새로고침하면 초기화됩니다
- Web Audio API는 **HTTPS 환경**에서만 작동합니다 (로컬은 예외)
- 마이크 권한이 필요합니다

## 🎯 향후 개선 사항

- [ ] 백엔드 API 통합
- [ ] 사용자 인증 시스템
- [ ] 실제 데이터베이스 연동
- [ ] 장소 검색 기능
- [ ] 필터링 및 정렬 기능
- [ ] 사용자 프로필 및 히스토리
- [ ] PWA 지원
- [ ] 소셜 공유 기능

## 📄 라이센스

MIT License

---

**Made with ❤️ by Sound Scan Team**
