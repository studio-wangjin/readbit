# 폴더 구조

Next.js App router와 Feature-Sliced Design(FSD) 아키텍처를 따릅니다. 관심사 분리와 모듈화된 개발을 지향합니다.
https://feature-sliced.github.io/documentation/kr/docs/get-started/overview

## 레이어 구조

- `app`: 애플리케이션 초기화 및 라우팅 (Next.js App Router)
- `views`: 페이지 컴포넌트 (페이지 구성 및 레이아웃)
- `widgets`: 여러 feature/entitie의 통합. 페이지의 한 영역을 구성. 상태/로직은 최소화 (e.g. ArticleList)
- `features`: 사용자 행동/시나리오. (e.g. AddToCartButton, CreateCommentForm)
- `entities`: 비즈니스의 '명사'역할. 데이터 구조 그 자체. 실제 세상에 존재하는 것. (e.g. User, Article)
- `shared`: 재사용 가능한 인프라, UI, 라이브러리
- `middleware.ts`: Next.js 미들웨어

### widget이랑 feature의 차이점

"이게 여러 개를 묶은 섹션/영역인가?" → widget
"이게 단일 액션/기능인가?" → feature

### Slice

최상위 레이어 하부에는 Slices라는 서브 디렉토리를 가집니다. '가치'를 기준으로 묶입니다.
e.g.

```
widgets/
   ├── newsfeed/
   ├── header/
   └── footer/
```

### Segment

Slice는 Segment로 구성됩니다. '목적'기반으로 묶입니다.

```
- api: 서버 요청
- UI: Slice의 UI 컴포넌트
- model: 비즈니스 로직, 상태 관련 인터랙션 (actions and selectors)
- lib: Slice 안에서 사용되는 보조 함수
- config: Slice에 대한 설정 (흔하게 발생하지는 않음)
- consts: 필요한 상수
```

## 각 레이어 상세 설명

### 🌐 app/

애플리케이션 초기화, 라우팅, 기본 레이아웃을 담당합니다. Next.js App Router 구조를 따릅니다. 실제 페이지 컴포넌트 구현은 pages/ 레이어에 있습니다.

- auth
  - sign-in/
    - `page.tsx`: 로그인 페이지
  - sign-up/
    - `page.tsx`: 회원가입 페이지
  - verify/
    - `page.tsx`: 이메일 인증 페이지
- dashboard
  - `page.tsx`: 대시보드 페이지 (로그인 유저의 홈)
- `page.tsx`: 비로그인 유저의 랜딩 페이지

```tsx
import { FeedPage } from 'pages/feed';

export const meta: MetaFunction = () => {
  return [{ title: 'Conduit' }];
};

export default FeedPage;
```

### 📄 views/

페이지 컴포넌트를 관리합니다. app/ 레이어의 라우팅 엔드포인트에 대응되는 실제 페이지 구현을 담당합니다.
Next.js App router와의 충돌을 막기 위해 FSD에서 기본적으로 사용하는 'pages'폴더명 대신 'views'폴더명을 사용합니다.

- auth/
  - sign-in/
    - ui
    - model
    - api
  - sign-up/
- dashboard/

### 🧩 widgets/

독립적인 페이지 블록으로, 여러 기능과 엔티티로 구성된 복합 UI입니다.
pages에 위치한 페이지 컴포넌트에서 조합하여 사용하기 위한 거의 완성된 독립 기능들입니다.

### ⚙️ features/

비즈니스 밸류를 가지는 사용자 시나리오나 기능을 다룹니다.
widgets를 구성하기 위한 비즈니스 로직의 구체적인 표현 기능들 (결제, 재생, 좋아요, 환불 등)입니다.

- auth: 인증 관련 기능
  - api/ - API 호출 관련 코드
  - model/ - 비즈니스 로직 및 상태
  - ui/ - 인증 관련 UI 컴포넌트

### 🧠 entities/

비즈니스 엔티티(사용자, 상품 등)를 나타냅니다.
features에서 구체적인 동작이 부여되기 전인 비즈니스 주체들 (유저, 비디오, 라이크버튼 등)입니다.

### 🔄 shared/

특정 비즈니스 로직에 종속되지 않는 재사용 가능한 코드로, 프로젝트 전체에서 사용되는 인프라, UI, 라이브러리가 포함됩니다. slice로 나누지 않습니다.

```
shared/
├── api/            - API 클라이언트 및 엔드포인트
├── config/         - 환경 설정 및 상수
├── lib/            - 유틸리티 및 헬퍼 함수
│   ├── auth.ts         - 인증 관련 유틸리티
│   ├── react-query.tsx - React Query 설정
│   ├── safe-action.ts  - 서버 액션 유틸리티
│   └── zod-utils.ts    - Zod 유효성 검사 유틸리티
├── types/          - 공통 타입 정의
└── ui/             - 공통 UI 컴포넌트
```

## FSD 개발 원칙

1. **상향식 의존성**: 각 모듈은 자신보다 낮은 레이어의 모듈만 의존할 수 있습니다 (app → views → widgets → features → entities → shared).

- e.g. features레이어는 widget의 컴포넌트를 참조할 수 없음
- 슬라이스는 같은 레이어 안에서 다른 슬라이스를 참조할 수 없다. 예를 들어, User 슬라이스는 같은 레이어의 Product 슬라이스를 참조할 수 없으며, 오직 필요한 경우에 한해 하위 레이어의 공통 요소들만 참조할 수 있다.

2. **명시적 공개 API**: 각 모듈은 index.ts를 통해 공개 API를 명시적으로 제공합니다.

- Public API에 정의되지 않은 내부적인 부분은 격리된 것으로 간주하여 그 자신의 Slice나 Segment만 여기에 접근할 수 있습니다.

3. **도메인 분리**: 비즈니스 도메인에 따라 기능을 분리합니다.
4. **독립적 개발**: 각 기능은 독립적으로 개발 및 테스트할 수 있어야 합니다.
5. **모듈화**: 각 모듈은 ui/, model/, lib/ 구조를 따릅니다.
   - **ui/**: 사용자 인터페이스 컴포넌트
   - **model/**: 상태 관리 및 비즈니스 로직
   - **lib/**: 유틸리티 및 헬퍼 함수
   - **api/**: 외부 시스템과의 통신

이 구조는 확장성, 유지보수성, 재사용성을 극대화하는 데 초점을 맞추고 있습니다.
