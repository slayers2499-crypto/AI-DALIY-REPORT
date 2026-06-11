# AI 일일 트렌드 리포트

매일 오전 8시, AI 뉴스와 트렌드를 자동 수집·분석하여 C-레벨 임원용 HTML 리포트를 생성합니다.

## 시작하기

**사전 준비**: [Claude Code](https://claude.ai/code) 설치 + GitHub CLI(`gh`) 인증

```
오늘 AI 리포트 만들어줘
```

생성 위치: `C:\Temp\AI-DALIY-REPORT\report_YYYYMMDD.html`  
자동 실행: Claude Code Routines → `daily-ai-trend-report` 활성화 (매일 08:00)

## 리포트 구성

| 섹션 | 내용 |
|------|------|
| Executive Summary | 핵심 동향 3문장 |
| 주요 뉴스 | 5~8건 헤드라인 + 원문 링크 |
| 트렌드 분석 | 3~4개 거시 흐름 |
| 모델·기술 업데이트 | 새 모델/기술 동향 |
| 기업 동향 | 투자·M&A·전략 |
| 전략적 시사점 | C-레벨 액션 아이템 5개 |

## 리포트 읽는 법

- **Executive Summary** — "오늘 AI 업계에서 가장 중요한 것"을 3문장으로. 여기서 멈춰도 된다.
- **주요 뉴스** — 관심 있는 항목의 원문 링크로 바로 이동 가능.
- **트렌드 분석** — 단기 뉴스를 넘어선 거시 흐름. "이 방향이 어디로 가고 있는가".
- **전략적 시사점** — 바로 액션 가능한 5가지 제안. "우리 회사는 어떻게 대응할 것인가".

## 명령 목록

| 명령 | 동작 |
|------|------|
| `오늘 AI 리포트 만들어줘` | 리포트 즉시 생성 |
| `리포트 분석해줘` | 품질 점수 확인 |
| `리포트 백업해줘` | 영구 저장소 백업 |
| `프로젝트 점검해줘` | 이슈 자동 발굴 및 등록 |
| `이슈들 해결해줘` | 등록된 이슈 자동 처리 |
| `전체 개선 사이클 돌려줘` | 점검·해결·문서최적화 한 번에 |

## 설정

`config.json`에서 커스터마이징:

```json
{
  "search_keywords": ["AI news today 2026", "추가 키워드"],
  "storage_path": "C:\\Temp\\AI-DALIY-REPORT",
  "permanent_storage_path": "C:\\Users\\Admin\\Documents\\AI-Reports",
  "trusted_sources": ["techcrunch.com", "추가할도메인.com"]
}
```

## 알려진 이슈

- 리포트 저장 위치가 `C:\Temp` (임시) — 영구 경로 이전 예정 ([#2](https://github.com/slayers2499-crypto/AI-DALIY-REPORT/issues/2))

## 라이선스

MIT — [LICENSE](LICENSE) 참조
