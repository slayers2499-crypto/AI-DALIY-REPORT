# 배포 가이드

## 시스템 요구사항

→ [DEPENDENCIES.md](DEPENDENCIES.md) 참조

## 초기 설치

### 1. 저장소 클론

```powershell
git clone https://github.com/slayers2499-crypto/AI-DALIY-REPORT.git
cd AI-DALIY-REPORT
```

### 2. GitHub CLI 인증

```powershell
gh auth login
# GitHub.com → HTTPS → 브라우저 인증 선택
```

### 3. Git Credential 설정 (토큰 안전 저장)

```powershell
git config credential.helper manager
```

### 4. config.json 설정

`config.json`에서 필요한 항목 수정:
- `storage_path`: 리포트 저장 경로
- `permanent_storage_path`: 영구 백업 경로
- `report_recipients`: 이메일 수신자 (향후 기능)

## 스케줄 작업 설정

### Claude Code Routines 등록

1. Claude Code 실행
2. 사이드바 → **Routines** 섹션
3. `daily-ai-trend-report` 작업 확인
4. **Run now** 클릭 → 도구 권한 승인 (WebSearch, WebFetch, Write)
5. 이후 매일 오전 8시 자동 실행

### 수동 실행 (즉시 생성)

Claude Code에서:
```
오늘 AI 리포트 만들어줘
```

## 영구 저장소 설정 (권장)

`C:\Temp`는 시스템 재시작 시 정리될 수 있으므로 영구 경로 사용 권장:

```powershell
# 영구 저장 디렉토리 생성
New-Item -ItemType Directory -Force "C:\Users\Admin\Documents\AI-Reports"
```

`config.json`에서 `storage_path` 변경:
```json
"storage_path": "C:\\Users\\Admin\\Documents\\AI-Reports"
```

## 업데이트

```powershell
cd C:\Temp\AI-DALIY-REPORT
git pull origin master
```

## 문제 해결

### 스케줄 작업이 실행 안 될 때
- Claude Code 앱이 실행 중인지 확인
- Routines 패널에서 작업 상태 확인
- **Run now**로 수동 트리거 후 오류 메시지 확인

### 리포트가 생성 안 될 때
- 인터넷 연결 확인
- Claude Code 로그인 상태 확인
- `report-analyzer` 스킬로 마지막 리포트 상태 확인

### git push 실패 시
```powershell
gh auth status        # 인증 상태 확인
git remote get-url origin  # URL에 토큰 없는지 확인
```
