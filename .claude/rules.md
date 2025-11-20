# Toss 미니앱 (AI Agent) 개발 규칙

이 프로젝트는 토스(Toss) 앱 내 웹뷰 환경에서 동작하는 상식 퀴즈 게임입니다.

## 프로젝트 정보

- **앱 이름**: `common-sense-quiz`
- **프레임워크**: Vite + React + TypeScript
- **패키지 관리**: pnpm
- **토스 SDK**: @apps-in-toss/web-framework

## 핵심 설정 파일

### granite.config.ts
토스 앱의 정체성과 동작 방식을 정의하는 설정 파일입니다.

**필수 확인 사항:**
- `appName`: 토스 개발자 콘솔의 앱 이름과 반드시 일치해야 함
- `brand.displayName`: 토스 앱 헤더에 표시될 한글 이름
- `brand.icon`: 빈 값이면 에러 발생 가능 (최소한 빈 문자열 `''` 설정 필요)
- `web.host`: 실기기 테스트 시 로컬 IP로 변경 필요 (예: `192.168.0.x`)
- `web.port`: 개발 서버 포트 (기본값: 5173)

## 개발 명령어

```bash
# 개발 서버 실행 (--host 옵션으로 네트워크 노출)
pnpm dev

# 프로덕션 빌드
pnpm build

# 배포 파일 생성
pnpm deploy
```

## 테스트 가이드

### iOS 테스트
1. **시뮬레이터**: 샌드박스 앱에서 `intoss://common-sense-quiz` 스키마 입력
2. **실기기**:
   - `granite.config.ts`의 `web.host`를 PC의 로컬 IP로 변경
   - PC와 아이폰을 동일한 Wi-Fi에 연결
   - Safari 개발자 메뉴에서 웹 인스펙터로 디버깅

### Android 테스트
1. ADB 포트 포워딩 설정:
```bash
adb reverse tcp:8081 tcp:8081
adb reverse tcp:5173 tcp:5173
```
2. 샌드박스 앱에서 `intoss://common-sense-quiz` 스키마 입력
3. Chrome `chrome://inspect/#devices`에서 디버깅

## 코딩 규칙

### UI/UX
- **토스 디자인 시스템(TDS)** 사용 권장
- 로딩 상태: 스켈레톤 UI 또는 TDS 로딩 인디케이터 활용
- 모바일 환경 우선 고려 (터치 인터랙션, 화면 크기)

### 네트워크
- CORS 문제 사전 확인 및 프록시 설정
- API 응답 지연 시 사용자 피드백 제공
- 에러 핸들링 철저히 구현

### 웹뷰 설정
- `webViewProps.type`: 기본값 `partner` (전체 화면은 `game`)
- `bridgeColorMode`: `basic` (흰색) 또는 `inverted` (검은색)
- iOS 비디오 인라인 재생 필요 시: `allowsInlineMediaPlayback` 활성화

## 빌드 및 배포

```bash
# 빌드 실행 (.ait 파일 생성)
pnpm build
```

**주의사항:**
- `granite.config.ts`의 `outdir` 경로와 실제 빌드 결과물 경로가 일치해야 함
- `.ait` 파일이 정상 생성되었는지 확인

## 트러블슈팅

### granite dev 실행 오류
- 현재 프로젝트는 `vite --host`를 직접 사용하도록 설정됨
- `granite dev`는 React Native 앱용이므로 웹 전용 프로젝트에서는 사용하지 않음

### 아이콘 설정 오류
- `[Apps In Toss Plugin] 플러그인 옵션이 올바르지 않습니다` 에러 발생 시
- `granite.config.ts`의 `brand.icon`을 최소한 빈 문자열로 설정

### HMR (Hot Module Replacement) 미작동
- `--host` 옵션이 제대로 설정되었는지 확인
- 방화벽에서 5173 포트가 열려있는지 확인
