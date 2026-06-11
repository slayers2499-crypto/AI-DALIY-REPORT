# AI 일일 트렌드 리포트 — Claude Code 설정

@SOUL.md

## 경로

| 항목 | 경로 |
|------|------|
| 리포트 저장 | `C:\Temp\AI-DALIY-REPORT\report_YYYYMMDD.html` |
| 영구 저장 (예정) | `C:\Users\Admin\Documents\AI-Reports\` |
| 스킬 모음 | `C:\Temp\AI-DALIY-REPORT\.claude\skills\` |
| GitHub 저장소 | `slayers2499-crypto/AI-DALIY-REPORT` |

## GitHub 이슈 생성 규칙

- **한국어**로 제목과 설명 작성
- `gh issue create` + PowerShell heredoc(`@'...'@`) 사용 (한글 깨짐 방지)
- `Invoke-RestMethod` 방식 사용 금지 (한글 깨짐)

## 환경 주의사항

- `C:\Temp`는 임시 폴더 — 영구 저장 시 `config.json`의 `permanent_storage_path` 사용
- git remote URL에 토큰 포함 금지 — `credential.helper manager` 사용
- PowerShell 5.1: `ConvertTo-Json`에 `-Encoding` 파라미터 없음

## 스킬 트리거

| 트리거 | 스킬 |
|--------|------|
| 오늘 AI 리포트 만들어줘 | `daily-report-generator` |
| 이슈들 해결해줘 | `issue-resolver` |
| 프로젝트 점검해줘 | `project-audit` |
| 이슈 일괄 등록해줘 | `bulk-issue-creator` |
| 리포트 분석해줘 | `report-analyzer` |
| 리포트 백업해줘 | `backup-restore-manager` |
| 프로젝트 문서 생성해줘 | `documentation-generator` |
| 전체 개선 사이클 돌려줘 | `briefing-improver` |
