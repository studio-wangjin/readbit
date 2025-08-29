# 필수 규칙

## 기술 스택

### 핵심 프레임워크

- **Turbopack**: 빌드 도구
- **Next.js 15**: App Router와 Turbopack 사용
- **React 19**: TypeScript와 함께 사용
- **Tailwind CSS 4**: 스타일링

### 주요 라이브러리

- **Supabase**: 데이터베이스와 인증 (@supabase/supabase-js, @supabase/ssr)
- **React Query**: 서버 상태 관리 (@tanstack/react-query)
- **React Hook Form**: Zod 검증과 함께 폼 관리
- **Shadcn/ui**: UI 컴포넌트 라이브러리
- **Lucide React**: 아이콘 라이브러리
- **next-safe-action**: 타입 안전 서버 액션

### 테스팅

- **Jest**: jsdom 환경과 함께
- **Testing Library React**
- 테스트는 `__tests__/` 디렉토리에 배치하거나 `.test.ts/.spec.ts` 접미사 사용

### 개발 도구 및 검증

- **Zod**: 스키마 검증 및 타입 안전성
  - 'Schema' 접미사로 별도 파일에 스키마 생성
  - z.infer<typeof schema>로 타입 생성
  - 복잡한 검증을 위한 refinement 사용
  - 재사용성을 위한 스키마 구성
- **React Hook Form**:
  - @hookform/resolvers/zod를 통한 Zod 통합
  - 중첩 폼을 위한 FormProvider 사용
  - 비제어 컴포넌트보다 register 선호
  - 성능을 위해 watch() 사용 최소화
  - 복잡한 폼을 작은 컴포넌트로 분할
  - 성공적인 제출 후 리셋

### Server Actions

- next-safe-action으로 타입 안전성 확보
- Zod로 스키마 정의
- 일관된 ActionResponse 타입 반환
- 클라이언트 측 오류 처리를 위한 useActionState 사용

## UI 컴포넌트

### Shadcn/ui 통합

```bash
# 새로운 Shadcn 컴포넌트 추가
npx shadcn@latest add button
```

### 아이콘

Lucide React 아이콘 사용:

```tsx
import { Book, Settings } from 'lucide-react';
```

## 인증 및 데이터베이스

### Supabase 설정

- `.env.local`에 필요한 환경 변수 (값은 @milooy에게 문의)
- `src/shared/lib/auth.ts`에서 인증 설정
- `src/shared/lib/supabase/`에서 데이터베이스 클라이언트 설정

### 인증 플로우

- OAuth 및 이메일/비밀번호 인증
- 미들웨어를 통한 보호된 경로
- `src/features/auth/`에서 인증 상태 관리

### Supabase 개발 원칙

- Row-Level Security (RLS) 정책 구현
- 테이블과 쿼리에 대한 TypeScript 타입 정의
- PostgreSQL 기능 사용 (외래 키, 제약 조건)
- 라이브 업데이트를 위한 실시간 기능 활용
- 데이터베이스 마이그레이션 버전 관리
- 서버리스 작업을 위한 Edge Functions 활용

## UI 및 스타일링

### 디자인 원칙

- Tailwind를 사용한 모바일 우선 반응형 디자인
- 컴포넌트 라이브러리로 Shadcn UI 사용
- WebP 형식과 지연 로딩으로 이미지 최적화
- 적절한 ARIA 속성으로 접근성 보장

## 개발 워크플로우

### Next.js 패턴

- Next.js App Router 패턴과 모범 사례 따르기
- Client Component보다 Server Component 우선시
- 'use client' 사용 최소화:
  - 서버 컴포넌트와 Next.js SSR 기능 선호
  - 작은 컴포넌트에서 Web API 접근 시에만 'use client' 사용
  - 데이터 가져오기나 상태 관리에는 'use client' 사용 금지
- 상태 변경을 위해 Next.js App Router에 의존
- fallback과 함께 Suspense로 클라이언트 컴포넌트 래핑
- 중요하지 않은 컴포넌트에는 동적 로딩 사용
- error.tsx와 global-error.tsx 파일을 사용한 에러 바운더리 생성
- 성능을 위한 Web Vitals (LCP, CLS, FID) 우선시
- shared/ 레이어의 유틸리티 함수 사용
- 복잡한 기능에 대한 철저한 문서 작성
