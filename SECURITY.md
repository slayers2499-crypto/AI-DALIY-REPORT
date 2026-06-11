# 보안 정책

## 지원 버전

| 버전 | 보안 지원 |
|------|----------|
| 0.2.x | ✅ 지원 중 |
| 0.1.x | ❌ 미지원 |

## 취약점 보고

보안 취약점 발견 시 공개 이슈 대신 **비공개 채널**로 보고해주세요.

보고 방법:
1. GitHub 저장소의 **Security** 탭 → **Report a vulnerability**
2. 또는 저장소 관리자에게 직접 연락

보고 시 포함할 내용:
- 취약점 설명
- 재현 방법
- 예상 영향 범위
- 가능한 경우 수정 제안

## 보안 원칙

### API 키 및 토큰 관리
- Personal Access Token(PAT)을 코드나 git URL에 포함 **금지**
- `credential.helper manager` (Windows Credential Manager) 사용
- `.env` 파일은 반드시 `.gitignore`에 포함

### 파일 접근 제어
- 리포트 파일에 개인정보 포함 금지
- 설정 파일의 민감한 값은 환경변수 또는 별도 secrets 파일로 관리

### git 보안
- `git remote` URL에 토큰 포함 금지
- 커밋 전 `git diff`로 민감 정보 포함 여부 확인

## 알려진 보안 이슈 이력

| 날짜 | 이슈 | 해결 방법 | 상태 |
|------|------|----------|------|
| 2026-06-11 | git remote URL에 PAT 노출 | URL에서 토큰 제거, credential.helper 설정 | ✅ 해결 |
