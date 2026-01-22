# Next.js 스타터킷

다크모드, 반응형 네비게이션, 레이어드 아키텍처를 포함한 프로덕션 준비 템플릿입니다.

## 기능

- ✅ **다크모드 지원** - next-themes를 사용한 완벽한 다크모드 지원
- ✅ **반응형 네비게이션** - 데스크톱 및 모바일 최적화된 네비게이션
- ✅ **레이어드 아키텍처** - Controller → Service → Repository 패턴
- ✅ **TypeScript** - 완벽한 타입 안전성
- ✅ **Tailwind CSS** - 유틸리티 기반 스타일링
- ✅ **React Hook Form + Zod** - 폼 검증 및 관리
- ✅ **API 라우트 예제** - 완전한 CRUD 작업 구현

## 기술 스택

- **프레임워크**: Next.js 16.1.4
- **라이브러리**: React 19.2.3
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4, shadcn/ui
- **폼 관리**: React Hook Form, Zod
- **테마**: next-themes
- **아이콘**: lucide-react
- **상태 관리**: usehooks-ts, use-mounted

## 시작하기

### 1. 프로젝트 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 참고하여 `.env.local` 파일을 생성하세요.

```bash
cp .env.example .env.local
```

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 4. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 폴더 구조

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # 루트 레이아웃
│   ├── page.tsx                     # 홈 페이지
│   ├── about/page.tsx               # 소개 페이지
│   ├── contact/page.tsx             # 연락처 페이지
│   ├── api/
│   │   └── example/route.ts         # API 엔드포인트
│   └── globals.css                  # 전역 스타일
│
├── components/
│   ├── ui/                          # 기본 UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   └── ...
│   ├── layout/                      # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── container.tsx
│   ├── theme/                       # 테마 컴포넌트
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── example/                     # 예제 컴포넌트
│       ├── example-card.tsx
│       └── example-list.tsx
│
├── lib/
│   ├── utils.ts                     # 유틸리티 함수
│   ├── types/                       # 타입 정의
│   │   ├── index.ts
│   │   ├── dto.ts
│   │   └── api.ts
│   ├── controllers/                 # Controller 레이어
│   │   ├── base.controller.ts
│   │   └── example.controller.ts
│   ├── services/                    # Service 레이어
│   │   ├── base.service.ts
│   │   └── example.service.ts
│   └── repositories/                # Repository 레이어
│       ├── base.repository.ts
│       └── example.repository.ts
│
├── config/                          # 설정 파일
│   ├── site.ts
│   └── navigation.ts
│
└── constants/                       # 상수
    └── index.ts
```

## 레이어드 아키텍처

이 스타터킷은 다음과 같은 아키텍처 패턴을 사용합니다:

```
API Route
    ↓
Controller (HTTP 요청/응답 처리)
    ↓
Service (비즈니스 로직)
    ↓
Repository (데이터 접근)
```

### 장점

- **테스트 용이성** - 각 레이어를 독립적으로 테스트 가능
- **유지보수성** - 명확한 책임 분리
- **재사용성** - 컴포넌트 간 의존성 최소화
- **확장성** - 새로운 기능 추가 용이

## API 예제

### GET - 모든 항목 조회

```bash
curl http://localhost:3000/api/example
```

**응답:**
```json
{
  "success": true,
  "message": "항목 조회 성공",
  "data": [
    {
      "id": "1",
      "title": "첫 번째 예제",
      "description": "이것은 첫 번째 예제입니다.",
      "status": "active",
      "createdAt": "2026-01-22T00:00:00.000Z",
      "updatedAt": "2026-01-22T00:00:00.000Z"
    }
  ]
}
```

### POST - 항목 생성

```bash
curl -X POST http://localhost:3000/api/example \
  -H "Content-Type: application/json" \
  -d '{
    "title": "새 항목",
    "description": "새 항목 설명",
    "status": "active"
  }'
```

### PUT - 항목 수정

```bash
curl -X PUT "http://localhost:3000/api/example?id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "수정된 제목",
    "status": "inactive"
  }'
```

### DELETE - 항목 삭제

```bash
curl -X DELETE "http://localhost:3000/api/example?id=1"
```

## 폼 사용법

이 프로젝트는 React Hook Form과 Zod를 사용한 강력한 폼 검증을 제공합니다.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 검증 스키마 정의
const schema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  message: z.string().min(10, '최소 10자 이상'),
});

type FormData = z.infer<typeof schema>;

// 컴포넌트 내에서 사용
const form = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

## 다크모드 구현

다크모드 토글은 Header 컴포넌트에서 확인할 수 있습니다:

```tsx
import { ThemeToggle } from '@/components/theme/theme-toggle';

// 라이트, 다크, 시스템 테마 자동 전환
<ThemeToggle />
```

## 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## ESLint 검사

```bash
npm run lint
```

## 배포

### Vercel 배포

가장 쉬운 배포 방법은 [Vercel 플랫폼](https://vercel.com)을 사용하는 것입니다.

1. GitHub에 코드를 푸시합니다.
2. Vercel 대시보드에서 프로젝트를 import합니다.
3. 자동으로 배포됩니다.

## 커스터마이징 가이드

### 새로운 API 엔드포인트 추가

1. Repository 클래스 생성 (`src/lib/repositories/`)
2. Service 클래스 생성 (`src/lib/services/`)
3. Controller 클래스 생성 (`src/lib/controllers/`)
4. API 라우트 추가 (`src/app/api/`)

### 새로운 페이지 추가

1. `src/app/` 디렉토리에 폴더 생성
2. `page.tsx` 파일 작성
3. 네비게이션 설정 업데이트 (`src/config/navigation.ts`)

### 컴포넌트 추가

1. `src/components/` 디렉토리에 파일 생성
2. TypeScript 인터페이스 정의
3. 필요한 컴포넌트에 import

## 라이센스

MIT

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev)
- [TypeScript 문서](https://www.typescriptlang.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)
