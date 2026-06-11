# AI 일일 트렌드 리포트 시스템

매일 오전 8시, AI 뉴스와 트렌드를 자동 수집·분석하여 C-레벨 임원용 HTML 리포트를 생성하는 자동화 시스템입니다.

## 개요

20년차 AI 전략담당자가 매일 반복해야 하는 AI 뉴스 수집·분석 업무를 자동화합니다.  
Claude Code 스케줄 작업을 통해 매일 아침 최신 AI 동향을 정리한 리포트를 생성합니다.

## 주요 기능

- **자동 수집**: WebSearch로 5개 키워드 병렬 검색, WebFetch로 기사 상세 수집
- **AI 분석**: Claude Sonnet 4.6이 전략적 관점으로 분석
- **HTML 리포트**: 반응형 디자인, 모바일 지원
- **스케줄 자동화**: 매일 오전 8시 자동 실행

## 리포트 구성

| 섹션 | 내용 |
|------|------|
| Executive Summary | 핵심 동향 3줄 요약 |
| 주요 뉴스 | 5~8건 헤드라인 + 요약 |
| 트렌드 분석 | 3~4개 거시 흐름 |
| 모델·기술 업데이트 | 새 모델/기술 동향 |
| 기업 동향 | 투자·M&A·전략 |
| 전략적 시사점 | C-레벨 액션 아이템 5개 |

## 시작하기

### 사전 준비

- [Claude Code](https://claude.ai/code) 설치
- GitHub CLI (`gh`) 인증 완료

### 즉시 리포트 생성

Claude Code에서:
```
오늘 AI 리포트 만들어줘
```

### 스케줄 설정

Claude Code Routines에서 `daily-ai-trend-report` 작업 활성화  
→ 매일 오전 8시 자동 실행

## 파일 구조

```
AI-DALIY-REPORT/
├── report_YYYYMMDD.html     # 일일 리포트
├── config.json              # 시스템 설정
├── ISSUES.md                # 이슈 백로그
├── .claude/
│   ├── skills/              # 프로젝트 스킬 모음
│   │   ├── daily-report-generator/
│   │   ├── issue-resolver/
│   │   ├── project-audit/
│   │   └── ...
│   └── settings.json
└── README.md
```

## 설정 변경

`config.json`에서 커스터마이징:
- 검색 키워드 추가/변경
- 리포트 언어 설정
- 저장 경로 변경
- 수신자 이메일 추가 (향후)

## 스킬 목록

| 스킬 | 명령 예시 |
|------|----------|
| `daily-report-generator` | "오늘 AI 리포트 만들어줘" |
| `issue-resolver` | "이슈들 해결해줘" |
| `project-audit` | "프로젝트 점검해줘" |
| `bulk-issue-creator` | "이슈 일괄 등록해줘" |
| `report-analyzer` | "리포트 분석해줘" |
| `backup-restore-manager` | "리포트 백업해줘" |
| `documentation-generator` | "프로젝트 문서 생성해줘" |

## 알려진 이슈

- 리포트 저장 위치가 `C:\Temp` (임시 폴더) — 영구 경로 이전 예정 ([#2](../../issues/2))
- 스케줄 실행 시간 08:02 오차 ([#12](../../issues/12))

## 라이선스

MIT License — 자세한 내용은 [LICENSE](LICENSE) 참조
