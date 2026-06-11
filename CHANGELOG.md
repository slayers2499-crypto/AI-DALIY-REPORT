# 변경 이력

## [Unreleased]

### 예정
- 이메일 자동 배송 기능
- 리포트 아카이브 및 검색
- 에러 처리 및 재시도 로직

---

## [0.2.0] - 2026-06-11

### 추가
- 7개 프로젝트 스킬 추가
  - `daily-report-generator`: 일일 리포트 즉시 생성
  - `issue-resolver`: GitHub 이슈 자동 해결
  - `bulk-issue-creator`: 이슈 일괄 등록
  - `documentation-generator`: 문서 자동 생성
  - `backup-restore-manager`: 리포트 백업/복구
  - `report-analyzer`: 리포트 품질 검증
  - `project-audit`: 프로젝트 전체 점검
- `config.json` 설정 파일 추가
- `CLAUDE.md` 프로젝트 컨텍스트 문서 추가
- `.gitignore` 추가
- `README.md` 추가
- `LICENSE` (MIT) 추가
- 32개 GitHub 이슈 등록 (버그·개선·문서 분류)

### 수정
- git remote URL에서 PAT 토큰 제거 (보안 이슈 #27)
- credential.helper manager 설정으로 안전한 인증

---

## [0.1.0] - 2026-06-11

### 추가
- 첫 번째 AI 일일 트렌드 리포트 생성 (`report_20260611.html`)
- Claude Code 스케줄 작업 설정 (`0 8 * * *`, 매일 오전 8시)
- 6개 섹션 HTML 리포트 템플릿
  - Executive Summary
  - 주요 뉴스 헤드라인
  - 트렌드 분석
  - 모델·기술 업데이트
  - 기업 동향
  - 전략적 시사점
- WebSearch 5개 키워드 병렬 수집
- WebFetch 기사 상세 내용 수집
- `ISSUES.md` 이슈 백로그 문서화 (12개 이슈)
