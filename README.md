# 마실 · Masil

에디터가 발행하는 일·커리어·사람들의 경험을 가볍게 발견하고 편안하게 읽는 모바일 에디토리얼 앱을 만든다.
React 웹 개발 경험을 바탕으로 React Native, 네이티브와 WebView의 통신을 익히고 iOS·Android 출시까지 경험하는 프로젝트다.

## 현재 상태

제품·디자인·개발 계획의 문서 초안을 정리한 단계다. 코드는 Expo 기본 화면과 기기 실행 스크립트로 구성되어 있으며, 마실 화면·WebView 통신·어드민·서버는 아직 구현하지 않았다.

더미 데이터로 앱의 핵심 읽기 흐름을 먼저 만들고 콘텐츠 형식을 검토한다. 이후 새 어드민과 서버를 만들고 실제 콘텐츠를 연결한다. 구체적인 기능과 기술 후보는 문서에서 확정 사항과 구분한다.

## 문서 안내

| 문서 | 내용 |
| --- | --- |
| [PRODUCT.md](./PRODUCT.md) | 제품 방향, 역할, 범위와 남은 결정 |
| [DESIGN.md](./DESIGN.md) | 기존 랜딩에서 이어받는 브랜드 기준과 앱 적용 제안 |
| [PLAN.md](./PLAN.md) | 개발 순서, 학습 목표, 완료 기준과 진행 상태 |
| [AGENTS.md](./AGENTS.md) | 이 저장소에서 작업할 때 따르는 지침 |

## 개발 환경 실행

Node.js와 pnpm이 필요하다. 아래 설치 예시는 [pnpm-lock.yaml](./pnpm-lock.yaml)을 사용한다.

```bash
pnpm install --frozen-lockfile
pnpm start
```

플랫폼별 실행 명령은 다음과 같다. iOS 시뮬레이터는 macOS와 Xcode, Android 에뮬레이터는 Android SDK와 가상 기기 설정이 필요하다.

| 명령 | 용도 |
| --- | --- |
| `pnpm ios` | Expo 개발 서버를 시작하고 iOS 시뮬레이터에서 열기 |
| `pnpm android` | Expo 개발 서버를 시작하고 Android에서 열기 |
| `pnpm web` | 웹 미리보기 실행 |

웹 미리보기와 별도로 iOS·Android에서 화면과 동작을 확인한다. 실제 검증 결과는 [PLAN.md](./PLAN.md)에 기록한다.

### macOS용 보조 스크립트

`pnpm dev`는 Android 에뮬레이터와 Expo 개발 서버를 함께 실행하고 iPhone 연결용 QR 코드를 표시한다.
[dev-mobile.sh](./scripts/dev-mobile.sh)는 Android SDK가 `$HOME/Library/Android/sdk`에 설치되어 있고, `Small_Phone`이라는 가상 기기와 프로젝트 SDK에 호환되는 Expo Go가 준비된 환경을 전제로 한다. 개발 서버는 LAN 모드의 8081 포트를 사용한다.

`pnpm android:open`은 개발 서버와 에뮬레이터가 이미 실행 중일 때 Android에서 앱을 다시 여는 보조 명령이다.

## 코드 위치

- [src/app](./src/app): Expo Router 화면과 레이아웃. 기본 화면은 `index.tsx`, `explore.tsx`에 있다.
- [src/components](./src/components): UI 컴포넌트.
- [src/constants](./src/constants): 테마 등 상수.
- [assets](./assets): 이미지 등 정적 자산.
- [scripts](./scripts): 로컬 개발 보조 스크립트.

현재 Expo·React Native·Expo Router·TypeScript 구성을 출발점으로 사용한다. 의존성과 실행 명령은 [package.json](./package.json), 설치 버전은 사용하는 lockfile에서 확인한다.
