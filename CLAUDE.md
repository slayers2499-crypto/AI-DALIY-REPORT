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

## 하네스 구조 (에이전트 팀)

활성화: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (`.claude/settings.local.json`)
팀 이름: `ai-briefing-team` (`~/.claude/teams/ai-briefing-team/config.json`)

### 에이전트 (`.claude/agents/`)

| 파일 | 모델 | 도구 | 역할 |
|------|------|------|------|
| `news-collector.md` | haiku | WebSearch, WebFetch | AI 뉴스 5개 키워드 병렬 수집 + 7개 기사 본문 추출 |
| `report-writer.md` | sonnet | Write | 6섹션 C-레벨 HTML 리포트 작성·저장·재작성 |
| `quality-checker.md` | haiku | Read, Grep | 7개 항목 정량 체크리스트 — 빠른 게이트 |
| `rubric-evaluator.md` | sonnet | Read, Grep, Glob | 정성·정량 통합 루브릭 채점 (report/system 모드) |
| `issue-auditor.md` | sonnet | Read, Grep, Glob, Bash | 문서·스킬·에이전트·보안·설정 감사 |

### 워크플로우 (`.claude/workflows/`)

| 파일 | 트리거 | 파이프라인 |
|------|--------|-----------|
| `daily-report.js` | `팀으로 AI 리포트 만들어줘` | news-collector → report-writer → quality-checker → **rubric-evaluator** → 점수 기록 |
| `project-improve.js` | `프로젝트 개선해줘` | issue-auditor → resolver → doc-optimizer → **rubric-evaluator(system)** → 점수 기록 |

### 루브릭 피드백 루프

```
quality-checker (정량 FAIL) ──→ report-writer 재작성
rubric-evaluator (정성 REWRITE) ──→ report-writer 재작성 (최대 2회)
rubric-evaluator (system) ──→ .claude/scores/rubric_log.jsonl 누적 기록
```

### 점수 추적

- 파일: `.claude/scores/rubric_log.jsonl`
- 리포트 점수: `전략적 통찰·C-레벨 실용성·정량 통과 여부` (최대 12점)
- 시스템 점수: `하네스·신뢰성·문서·협업·관측가능성` (최대 20점)

### 에이전트 ↔ 스킬 연결

- `report-writer` → `daily-report-generator` 스킬 preload
- `issue-auditor` → `project-audit` 스킬 preload

---

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
| 이슈 없을 때까지 개선해줘 | `auto-improve` |
| 토큰 최적화해줘 | `token-optimizer` |
| 팀으로 AI 리포트 만들어줘 | `team-report-generator` |
