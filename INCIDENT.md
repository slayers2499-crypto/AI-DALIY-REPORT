# 인시던트 대응 계획

## 인시던트 정의

| 심각도 | 기준 | 대응 시간 |
|--------|------|----------|
| P1 (긴급) | 리포트가 3일 이상 생성 안 됨, 보안 침해 | 즉시 |
| P2 (높음) | 리포트 품질 저하, 오류 반복 | 당일 |
| P3 (중간) | 일부 섹션 누락, 오래된 뉴스 | 2일 이내 |
| P4 (낮음) | UI 깨짐, 경미한 오탈자 | 1주일 이내 |

## 일반 인시던트 절차

### 1. 감지
- 매일 아침 리포트 파일 생성 여부 확인
- `report-analyzer` 스킬로 품질 검증
- Claude Code Routines 패널에서 실행 이력 확인

### 2. 초기 대응
```
리포트 분석해줘       → 품질 점수 확인
오늘 AI 리포트 만들어줘  → 수동 재생성 시도
```

### 3. 원인 파악
- Routines 실행 로그 확인
- 인터넷 연결 상태 확인
- Claude Code 인증 상태 확인: `gh auth status`

### 4. 해결 및 복구
- 수동 리포트 생성 후 공유
- 원인 해결 후 스케줄 재확인

### 5. 사후 처리
- 재발 방지책 마련
- GitHub Issue 등록
- CHANGELOG.md 업데이트

## 시나리오별 대응

### 리포트 미생성
```powershell
# 수동 생성
# Claude Code에서: "오늘 AI 리포트 만들어줘"

# 이전 리포트 확인
Get-ChildItem "C:\Temp\AI-DALIY-REPORT\*.html" | Sort-Object LastWriteTime -Descending
```

### 보안 침해 (토큰 노출)
```powershell
# 1. 즉시 토큰 폐기 → GitHub Settings > Developer settings > Personal access tokens
# 2. 새 토큰 발급
# 3. git remote URL 갱신
git remote set-url origin https://github.com/slayers2499-crypto/AI-DALIY-REPORT.git
gh auth login  # 새 토큰으로 재인증
```

### HTML 리포트 손상
```powershell
# 백업에서 복구
# Claude Code에서: "어제 리포트 복구해줘"
```

## 연락처

- 시스템 관리자: 저장소 소유자 (slayers2499-crypto)
- 이슈 등록: https://github.com/slayers2499-crypto/AI-DALIY-REPORT/issues
