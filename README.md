# 바로견적 (Baro Estimate)

> 소상공인을 위한 무료 견적서/영수증 생성 솔루션

[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

🔗 **라이브 데모**: [https://baro-est.web.app](https://baro-est.web.app)

## 📋 소개

**바로견적**은 복잡한 엑셀 작업 없이 1분 만에 전문적인 견적서와 영수증을 만들 수 있는 웹 애플리케이션입니다.

### ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🚀 **빠른 작성** | 필요한 정보만 입력하면 전문적인 문서 완성 |
| 🎨 **세련된 디자인** | 현대적이고 깔끔한 비즈니스 문서 양식 |
| 📱 **반응형 디자인** | PC와 모바일 모두 지원 |
| 🌍 **다국어 지원** | 한글/영문 전환 가능 |
| 📄 **PDF 다운로드** | 완성된 문서를 PDF로 저장 |
| 🔒 **개인정보 보호** | 모든 데이터는 브라우저/클라우드에 안전하게 저장 |
| 🖼️ **직인 삽입** | PNG 이미지로 직인/도장 추가 가능 |
| 💾 **클라우드 저장** | Google 로그인 후 견적서 저장/관리 |
| 📋 **템플릿 저장** | 자주 사용하는 양식 템플릿으로 저장 |
| 💰 **완전 무료** | 회원가입 없이도 기본 기능 무제한 사용 |

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **프론트엔드** | React 19, Vite 7 |
| **라우팅** | React Router DOM |
| **인증** | Firebase Authentication (Google) |
| **데이터베이스** | Cloud Firestore |
| **PDF 생성** | html2canvas, jsPDF |
| **호스팅** | Firebase Hosting |
| **분석** | Firebase Analytics |

## 📁 프로젝트 구조

```
baro/
├── public/
│   ├── favicon.svg          # 파비콘
│   ├── og-image.png         # Open Graph 이미지
│   ├── robots.txt           # 검색엔진 크롤러 설정
│   └── sitemap.xml          # 사이트맵
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx    # 견적서/영수증 편집기
│   │   ├── InputPanel.jsx   # 입력 패널
│   │   ├── PreviewPanel.jsx # PDF 미리보기 패널
│   │   ├── LandingPage.jsx  # 랜딩 페이지
│   │   ├── MyEstimates.jsx  # 저장된 견적서 관리
│   │   ├── BlogList.jsx     # 블로그 목록
│   │   ├── BlogPost.jsx     # 블로그 상세
│   │   ├── PrivacyPolicy.jsx # 개인정보처리방침
│   │   └── TermsOfService.jsx # 이용약관
│   ├── contexts/
│   │   └── AuthContext.jsx  # 인증 상태 관리
│   ├── services/
│   │   └── firestoreService.js # Firestore CRUD
│   ├── data/
│   │   └── blogPosts.js     # 블로그 콘텐츠
│   ├── App.jsx              # 메인 앱 (라우터)
│   ├── firebase.js          # Firebase 설정
│   ├── translations.js      # 다국어 번역
│   ├── main.jsx             # 엔트리 포인트
│   └── index.css            # 글로벌 스타일
├── .env                     # 환경 변수 (Git 제외)
├── firebase.json            # Firebase Hosting 설정
├── .firebaserc              # Firebase 프로젝트 연결
└── package.json
```

## 🔗 페이지 라우트

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 |
| `/app` | 견적서/영수증 편집기 |
| `/my` | 내 견적서 관리 (로그인 필요) |
| `/blog` | 블로그 목록 |
| `/blog/:id` | 블로그 상세 |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Firebase CLI (배포 시)

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/baro.git
cd baro

# 의존성 설치
npm install
```

### 환경 변수 설정

`.env` 파일을 생성하고 Firebase 설정을 입력하세요:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
npm run build
```

### 배포

```bash
# Firebase 로그인 (최초 1회)
firebase login

# 빌드 및 배포
npm run deploy
```

## 📖 사용 방법

### 비회원
1. `/app` 페이지에서 견적서/영수증 작성
2. PDF 다운로드

### 회원 (Google 로그인)
1. **저장**: 견적서를 클라우드에 저장
2. **템플릿**: 자주 쓰는 양식 저장
3. **관리**: `/my` 페이지에서 저장된 견적서 조회/삭제

## 📜 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |
| `npm run deploy` | 빌드 후 Firebase 배포 |

## 🌐 SEO & 법적 문서

- ✅ Open Graph 메타 태그
- ✅ Twitter Card 메타 태그
- ✅ JSON-LD 구조화 데이터
- ✅ sitemap.xml
- ✅ robots.txt
- ✅ 개인정보처리방침 (`/privacy`)
- ✅ 이용약관 (`/terms`)
- ✅ AdSense 준비 완료

## 📝 블로그 콘텐츠

AdSense 심사용 + SEO를 위한 8개의 블로그 포스트 포함:
- 견적서 작성 가이드
- 영수증과 견적서의 차이점
- 부가세 계산법
- 전자 견적서의 장점
- 직인의 법적 효력
- 소상공인 견적서 꿀팁
- 흔히 하는 실수
- 프리랜서 견적서 작성법

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 👨‍💻 개발

바로견적 팀

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
