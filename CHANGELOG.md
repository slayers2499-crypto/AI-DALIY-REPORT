# 변경 이력

## [Unreleased]

### 예정
- 이메일 자동 배송 기능
- 리포트 아카이브 및 검색
- 에러 처리 및 재시도 로직

---

## [0.4.0] - 2026-06-11

### 추가
- `briefing-improver` 통합 스킬 — project-audit → issue-resolver → doc-optimizer 순차 실행
- `auto-improve` 루프 스킬 — 이슈 0건이 될 때까지 briefing-improver 반복 실행

---

## [0.3.0] - 2026-06-11

### 추가
- `SOUL.md` 신규 생성 — WHO·WHY·판단 원칙·이슈 심각도 기준
- `doc-optimizer` 스킬 추가 — 3문서 역할 분리 및 중복 제거 자동화

### 변경
- `CLAUDE.md` — `@SOUL.md` 참조 추가, 프로젝트 개요 제거 (SOUL.md로 이동)
- `README.md` — 인간 독자 온보딩 전용으로 축소, MANUAL.md 내용 흡수
- `DEPLOY.md` — 시스템 요구사항 섹션 제거, DEPENDENCIES.md 포인터로 대체

### 삭제
- `MANUAL.md` — README.md와 100% 중복으로 제거

### 문제 및 해결
| 문제 | 원인 | 해결 |
|------|------|------|
| MANUAL.md·README.md 내용 중복 | 역할 구분 없이 생성 | MANUAL.md 삭제, README.md에 흡수 |
| DEPLOY.md·DEPENDENCIES.md 요구사항 중복 | 두 문서에 같은 도구 목록 기재 | DEPLOY.md에서 제거, DEPENDENCIES.md 단일 출처로 |
| CLAUDE.md에 WHO·WHY 섞임 | SOUL.md 부재 | SOUL.md 분리 생성, CLAUDE.md는 HOW만 |

---

## [0.2.0] - 2026-06-11

### 추가
- 8개 프로젝트 스킬
  - `daily-report-generator`: 일일 리포트 즉시 생성
  - `issue-resolver`: GitHub 이슈 자동 해결
  - `bulk-issue-creator`: 이슈 일괄 등록
  - `documentation-generator`: 문서 자동 생성
  - `backup-restore-manager`: 리포트 백업/복구
  - `report-analyzer`: 리포트 품질 검증
  - `project-audit`: 프로젝트 전체 점검 + 자동 해결 확인 단계
  - `github-issue-creator`: 개별 이슈 등록
- `config.json` 설정 파일
- `.gitignore`, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `DEPLOY.md`, `INCIDENT.md`, `BENCHMARK.md`, `DEPENDENCIES.md`
- 32개 GitHub 이슈 등록

### 수정
- git remote URL에서 PAT 토큰 제거 → `credential.helper manager` 전환

### 문제 및 해결
| 문제 | 원인 | 해결 |
|------|------|------|
| GitHub 이슈 한글이 `???`로 깨짐 | `Invoke-RestMethod` + `ConvertTo-Json`이 UTF-8 미보장 | `gh issue create` + PowerShell heredoc(`@'...'@`) 으로 전환 |
| git remote URL에 PAT 토큰 노출 | URL에 토큰 직접 포함 | URL에서 토큰 제거, `git config credential.helper manager` 설정 |
| PowerShell heredoc 커밋 메시지 오류 | 멀티라인 heredoc을 `-m`에 직접 전달 | `$msg` 변수에 저장 후 `git commit -m $msg` 사용 |
| `ConvertTo-Json -Encoding` 파라미터 없음 | PowerShell 5.1 미지원 | `gh` CLI로 우회 (인코딩 처리 내장) |
| project-audit 점검 후 수동 해결 필요 | 스킬이 발굴만 하고 해결하지 않음 | 점검 완료 후 "자동 해결할까요?" 확인 단계 추가, 승인 시 issue-resolver 자동 실행 |

---

## [0.1.0] - 2026-06-11

### 추가
- 첫 번째 AI 일일 트렌드 리포트 (`report_20260611.html`)
- Claude Code 스케줄 작업 (`0 8 * * *`, 매일 오전 8시)
- HTML 리포트 6개 섹션: Executive Summary, 주요 뉴스, 트렌드 분석, 모델·기술 업데이트, 기업 동향, 전략적 시사점
- WebSearch 5개 키워드 병렬 수집 + WebFetch 기사 본문 수집
- `ISSUES.md` 이슈 백로그 (12개)
