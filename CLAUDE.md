# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 기반의 풀스택 스타터킷으로, 다크모드, 반응형 레이아웃, 레이어드 아키텍처를 포함한 프로덕션 준비 템플릿입니다.

**핵심 특징:**
- Next.js 16.1.4 (App Router)
- TypeScript + Tailwind CSS v4 + shadcn/ui
- React Hook Form + Zod (폼 검증)
- 레이어드 아키텍처 (Controller → Service → Repository)
- next-themes 다크모드 지원

---

## 개발 환경 설정 및 주요 명령어

### 초기 설정
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```
→ http://localhost:3000에서 실시간 개발 가능 (HMR 지원)

### 프로덕션 빌드
```bash
npm run build    # Next.js 최적화 빌드 생성 (.next 폴더)
npm run start    # 빌드된 앱 실행 (프로덕션 모드)
```

### 코드 품질 검사
```bash
npm run lint     # ESLint 검사 (ESLint 9 flat config 사용)
```

### 환경 변수 설정
```bash
cp .env.example .env.local
```

필수 변수:
- `NEXT_PUBLIC_SITE_URL`: 애플리케이션 URL (기본: http://localhost:3000)
- `NEXT_PUBLIC_API_URL`: API 기본 URL (기본: http://localhost:3000/api)

---

## 고수준 아키텍처

### 1. 레이어드 아키텍처 (3-Tier Pattern)

```
API Request (src/app/api/*)
    ↓
[Controller] - HTTP 요청/응답 처리, 일관된 응답 포맷 제공
    ↓
[Service] - 비즈니스 로직, DTO 변환, 데이터 유효성 검사
    ↓
[Repository] - 데이터 접근 추상화 (현재: 메모리, 향후: DB)
```

**파일 위치:**
- Controller: `src/lib/controllers/*.controller.ts`
- Service: `src/lib/services/*.service.ts`
- Repository: `src/lib/repositories/*.repository.ts`
- Types/DTO: `src/lib/types/*.ts`

### 2. 각 계층의 책임

**Controller (`BaseController` 상속)**
- HTTP 요청 수신 및 파라미터 추출
- 서비스 호출
- 일관된 `ApiResponse<T>` 형식으로 응답
- 에러 핸들링 (`successResponse()`, `errorResponse()`)

**Service (`BaseService<T>` 상속)**
- 비즈니스 로직 구현
- Entity와 DTO 간의 변환
- 데이터 유효성 검사
- Repository를 통해 데이터 접근

**Repository (`BaseRepository<T>` 상속)**
- CRUD 작업 정의 (Create, Read, Update, Delete)
- 데이터 소스 추상화 (메모리, DB, API 등)
- 현재 구현: 정적 배열 기반 메모리 저장소
- 향후 DB 연동 시 이 계층만 교체 가능

### 3. 의존성 주입 (Dependency Injection)

API 라우트에서 의존성 주입 패턴 사용:
```typescript
const repository = new ExampleRepository();
const service = new ExampleService(repository);
const controller = new ExampleController(service);
```

### 4. 타입 시스템 및 DTO

**기본 타입:** `src/lib/types/index.ts`
- `ID`: 식별자 타입
- `BaseEntity`: 기본 엔티티 (id, createdAt, updatedAt)

**API 응답 형식:** `src/lib/types/api.ts`
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```

**DTO:** `src/lib/types/dto.ts`
- 요청: `CreateExampleDto`, `UpdateExampleDto`
- 응답: `ExampleResponseDto` (ISO 문자열로 날짜 변환)

### 5. API 설계

**REST 엔드포인트 예제:** `/api/example`
```
GET    /api/example          - 모든 항목 조회
GET    /api/example?id=1     - 특정 ID 조회
POST   /api/example          - 항목 생성
PUT    /api/example?id=1     - 항목 수정
DELETE /api/example?id=1     - 항목 삭제
```

모든 응답은 `ApiResponse<T>` 형식 사용.

---

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root 레이아웃 (ThemeProvider 포함)
│   ├── page.tsx           # 홈 페이지
│   ├── about/page.tsx     # About 페이지
│   ├── contact/page.tsx   # Contact 페이지
│   ├── api/example/       # REST API 라우트
│   └── globals.css        # Tailwind CSS v4 글로벌 스타일
│
├── components/
│   ├── ui/                # shadcn/ui 기본 컴포넌트 (Button, Card 등)
│   ├── layout/            # 레이아웃 컴포넌트 (Header, Footer, MobileNav)
│   ├── theme/             # 테마 관련 (ThemeProvider, ThemeToggle)
│   └── example/           # 도메인 컴포넌트 (ExampleList, ExampleCard)
│
├── lib/
│   ├── controllers/       # HTTP 요청/응답 처리
│   ├── services/          # 비즈니스 로직
│   ├── repositories/      # 데이터 접근
│   ├── types/             # 타입 정의 및 DTO
│   └── utils.ts           # 유틸리티 함수
│
├── config/
│   ├── site.ts            # 사이트 메타 정보 및 설정
│   └── navigation.ts      # 네비게이션 메뉴 정의
│
└── constants/
    └── index.ts           # API 엔드포인트, 상태코드, 에러메시지
```

---

## 기술 스택

### Frontend
- **Next.js 16.1.4** - App Router, SSR, SSG, API Routes
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 정적 타입 체크

### Styling
- **Tailwind CSS v4** - @tailwindcss/postcss 기반 원자적 CSS
- **shadcn/ui** - 접근성 높은 컴포넌트 (Radix UI 기반)
- **lucide-react** - 아이콘

### Forms & Validation
- **React Hook Form 7.71.1** - 효율적인 폼 상태 관리
- **Zod 4.3.5** - TypeScript 우선 런타임 검증
- **@hookform/resolvers** - 폼 검증 리졸버

### Theme & UI
- **next-themes 0.4.6** - 다크모드 관리
- **class-variance-authority** - CSS 클래스 변형
- **tailwind-merge** - Tailwind 클래스 병합
- **clsx** - 조건부 클래스 처리
- **use-mounted** - hydration 오류 해결

### Development
- **ESLint 9** - flat config 형식
- **TypeScript strict mode** - 엄격한 타입 체크

---

## 새로운 기능 추가 가이드

### 새로운 API 엔드포인트 추가 (레이어드 패턴)

1. **Repository 작성** (`src/lib/repositories/new.repository.ts`)
   ```typescript
   export class NewRepository extends BaseRepository<NewEntity> {
     async findAll(): Promise<NewEntity[]> { /* ... */ }
     async findById(id: ID): Promise<NewEntity | null> { /* ... */ }
   }
   ```

2. **Service 작성** (`src/lib/services/new.service.ts`)
   ```typescript
   export class NewService extends BaseService<NewEntity> {
     async getAll(): Promise<NewResponseDto[]> {
       const entities = await this.repository.findAll();
       return entities.map(e => this.toResponseDto(e));
     }
   }
   ```

3. **Controller 작성** (`src/lib/controllers/new.controller.ts`)
   ```typescript
   export class NewController extends BaseController {
     async handleGetAll(): Promise<ApiResponse<any>> {
       const data = await this.service.getAll();
       return this.successResponse(data, '조회 성공');
     }
   }
   ```

4. **API 라우트** (`src/app/api/new/route.ts`)
   ```typescript
   export async function GET(request: NextRequest) {
     const controller = new NewController(new NewService(new NewRepository()));
     const response = await controller.handleGetAll();
     return NextResponse.json(response);
   }
   ```

### 새로운 페이지 추가

1. `src/app/[route]/page.tsx` 작성
2. `src/config/navigation.ts`에서 네비게이션 메뉴 업데이트

### 새로운 컴포넌트 추가

- 기본 UI: `src/components/ui/` (shadcn/ui 사용)
- 도메인 컴포넌트: `src/components/[domain]/`
- 레이아웃: `src/components/layout/`
- Props는 TypeScript 인터페이스로 정의

### 폼 만들기

React Hook Form + Zod 패턴:
```typescript
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

---

## 주요 설정 파일

| 파일 | 용도 |
|------|------|
| `tsconfig.json` | TypeScript strict mode, 절대 경로 alias (`@/*`) |
| `next.config.ts` | React Compiler 활성화 |
| `postcss.config.mjs` | Tailwind CSS v4 PostCSS 설정 |
| `globals.css` | 다크모드 CSS 변수, OKLCH 색상 |
| `eslint.config.mjs` | ESLint 9 flat config, Next.js 규칙 |
| `.mcp.json` | Claude Model Context Protocol 설정 |
| `src/config/site.ts` | 사이트 메타 정보 |
| `src/config/navigation.ts` | 네비게이션 메뉴 정의 |
| `src/constants/index.ts` | API 엔드포인트, 상태코드, 메시지 |

---

## TypeScript 주의사항

- **any 타입 금지** - 구체적인 타입 정의 필수
- **strict mode 활성화** - 엄격한 타입 체크
- **절대 경로 사용** - `@/components/...` 형식
- **DTO 사용** - Entity와 API 응답 분리

---

## 다크모드

- **구현:** `next-themes` + CSS 커스텀 변수
- **토글:** `ThemeToggle` 컴포넌트 (Header에 포함)
- **감지:** 시스템 다크모드 자동 감지
- **저장:** localStorage에 사용자 선택 저장
- **스타일:** `globals.css`에서 `--background`, `--foreground` 등의 변수 정의

---

## 반응형 디자인

- **Tailwind 브레이크포인트:** sm, md, lg, xl, 2xl
- **모바일 네비게이션:** `MobileNav` 컴포넌트 (모바일에서만 표시)
- **Container:** `Container` 래퍼로 최대 너비 제한

---

## 성능 최적화

- **React Compiler:** `next.config.ts`에서 활성화 (자동 메모이제이션)
- **Next.js 이미지:** `next/image` 사용 (자동 최적화)
- **Code Splitting:** 자동 번들 분할

---

## 주의사항

1. **환경 변수:** `NEXT_PUBLIC_` 접두사는 클라이언트에 노출됨
2. **API 라우트:** `/api/*`는 서버에서만 실행
3. **Client Component:** `'use client'`는 필요한 컴포넌트에만 사용
4. **직렬화:** API 응답은 JSON 직렬화 가능해야 함 (Date는 ISO 문자열로 변환)
