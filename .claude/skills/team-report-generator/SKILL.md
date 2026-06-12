---
name: team-report-generator
description: ai-briefing-team 에이전트 팀을 소환해 뉴스 수집·분석·품질 검증을 병렬 처리하는 리포트 생성 스킬
---

# 팀 기반 일일 리포트 생성 스킬

에이전트 팀(`ai-briefing-team`)을 구성해 뉴스 수집·리포트 작성·품질 검증을 병렬로 처리합니다.
단독 실행 대비 품질과 속도가 높아집니다.

## 트리거

```
팀으로 AI 리포트 만들어줘
에이전트 팀으로 리포트 생성해줘
팀 리포트 만들어줘
```

## 팀 구성

| 팀원 이름 | 역할 | 담당 작업 |
|-----------|------|-----------|
| `team-lead` | 오케스트레이터 (나) | 팀 소환·조율·최종 저장 |
| `news-collector` | 뉴스 수집 전문 에이전트 | WebSearch 5개 키워드 병렬 수집, WebFetch 본문 추출 |
| `report-writer` | 분석·작성 전문 에이전트 | 수집 데이터 분석, 6섹션 HTML 초안 작성 |
| `quality-checker` | 품질 검증 전문 에이전트 | 섹션 완성도·링크·날짜·액션아이템 검증 |

## 실행 절차

### 1단계: 팀원 소환 (병렬)

`news-collector`와 `report-writer`를 동시에 소환한다.

**news-collector 프롬프트:**
```
당신은 ai-briefing-team의 news-collector입니다.
오늘 날짜: {YYYY-MM-DD}

아래 5개 키워드로 WebSearch를 병렬 실행하세요:
1. "AI news today {YYYY}"
2. "LLM large language model update {YYYY}"
3. "generative AI enterprise {YYYY}"
4. "AI 인공지능 뉴스 최신"
5. "OpenAI Google Anthropic Meta AI"

상위 7개 기사를 WebFetch로 본문 수집 후 아래 형식으로 결과를 SendMessage로 team-lead에게 전달:

[기사 1]
- 제목:
- URL:
- 날짜:
- 핵심 내용 (3줄):
- 전략적 의미:
...
```

**report-writer 프롬프트:**
```
당신은 ai-briefing-team의 report-writer입니다.
news-collector로부터 기사 목록을 받으면 6섹션 HTML 리포트 초안을 작성하세요.

섹션 구성:
1. Executive Summary — 핵심 3문장
2. 주요 뉴스 — 5~8건 헤드라인 + 요약 + 원문 링크
3. 트렌드 분석 — 3~4개 거시 흐름
4. 모델·기술 업데이트
5. 기업 동향
6. 전략적 시사점 — 액션 아이템 5개 이상

품질 기준:
- 각 섹션 300자 이상
- 모든 뉴스에 원문 링크 필수
- 오늘 기사만 (3일 이전 제외)
- 한국어, 전문용어 최소화
- 모바일 반응형 HTML (인라인 CSS)

완성되면 HTML 전문을 SendMessage로 team-lead에게 전달.
```

### 2단계: 품질 검증

`report-writer`의 HTML 초안을 `quality-checker`에게 전달한다.

**quality-checker 프롬프트:**
```
당신은 ai-briefing-team의 quality-checker입니다.
아래 체크리스트로 HTML 리포트를 검증하고 결과를 SendMessage로 team-lead에게 전달하세요.

체크리스트:
[ ] Executive Summary 3문장 이내인가
[ ] 뉴스 5건 이상인가
[ ] 모든 뉴스에 원문 링크가 있는가
[ ] 오늘 날짜 기사인가 (3일 이내)
[ ] 액션 아이템 5개 이상인가
[ ] 각 섹션 300자 이상인가
[ ] 모바일 반응형 CSS인가

통과 항목, 실패 항목, 수정 제안을 함께 보고하세요.
```

### 3단계: 수정 및 저장

quality-checker 결과 기준:
- **실패 0건**: 바로 저장
- **실패 1~2건**: team-lead가 직접 수정 후 저장
- **실패 3건 이상**: report-writer에게 재작성 요청

저장 경로:
```
C:\Temp\AI-DALIY-REPORT\report_YYYYMMDD.html
```

### 4단계: 팀 종료

모든 팀원에게 SendMessage로 `shutdown_request` 전송:
```json
{"type": "shutdown_request"}
```

## 완료 보고 형식

```
팀 리포트 생성 완료
파일: report_YYYYMMDD.html
수집 기사: N건 (news-collector)
품질 검증: 통과 N / 실패 N (quality-checker)
소요 시간: 약 N초
```

## 주의사항

- 팀원은 메시지를 받아야 깨어납니다 — SendMessage 필수
- 팀원이 idle 상태가 되면 정상입니다 (응답 대기 중)
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`이 `.claude/settings.local.json`에 설정되어 있어야 합니다
- 팀 설정 파일: `~/.claude/teams/ai-briefing-team/config.json`

## 관련 스킬

- [[daily-report-generator]] — 단독 실행 버전 (팀 없이)
- [[report-analyzer]] — 생성 후 품질 점수 확인
- [[backup-restore-manager]] — 영구 저장소 백업
