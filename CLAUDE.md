# AI 일일 트렌드 리포트 — Claude Code 프로젝트 설정

## 프로젝트 개요

C-레벨 임원용 AI 뉴스·트렌드 일일 HTML 리포트 자동 생성 시스템.  
사용자는 20년차 AI 전략담당자이며, 매일 아침 동료들에게 AI 트렌드를 공유해야 함.

## 작업 스타일

- **언어**: 한국어로 답변. 기술 용어는 영어 병기 허용.
- **대상 독자**: C-레벨 임원 — 전략적 시사점 중심, 기술 세부사항 최소화.
- **HTML 스타일**: 반응형, 모바일 지원, CSS 변수 사용, 깔끔한 카드 레이아웃.

## 중요 경로

| 항목 | 경로 |
|------|------|
| 리포트 저장 | `C:\Temp\AI-DALIY-REPORT\report_YYYYMMDD.html` |
| 영구 저장 (예정) | `C:\Users\Admin\Documents\AI-Reports\` |
| 스케줄 설정 | `C:\Users\Admin\.claude\scheduled-tasks\daily-ai-trend-report\SKILL.md` |
| 스킬 모음 | `C:\Temp\AI-DALIY-REPORT\.claude\skills\` |
| GitHub 저장소 | `slayers2499-crypto/AI-DALIY-REPORT` |

## GitHub 이슈 생성 규칙

- **한국어**로 제목과 설명 작성
- `gh issue create` + PowerShell heredoc(`@'...'@`) 사용 (한글 깨짐 방지)
- `Invoke-RestMethod` 방식 사용 금지 (한글 깨짐)

## 알려진 주의사항

- `C:\Temp`는 임시 폴더 — 영구 저장 필요 시 `config.json`의 `permanent_storage_path` 사용
- git remote URL에 토큰 포함 금지 — `credential.helper manager` 사용
- PowerShell 5.1 환경: `ConvertTo-Json`에 `-Encoding` 파라미터 없음

## 스킬 사용법

```
오늘 AI 리포트 만들어줘      → daily-report-generator
이슈들 해결해줘               → issue-resolver
프로젝트 점검해줘             → project-audit
이슈 일괄 등록해줘            → bulk-issue-creator
리포트 분석해줘               → report-analyzer
리포트 백업해줘               → backup-restore-manager
프로젝트 문서 생성해줘        → documentation-generator
```
