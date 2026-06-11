---
name: daily-report-generator
description: AI 뉴스·트렌드 일일 HTML 리포트 수동 즉시 생성
---

# 📰 일일 리포트 생성 스킬

오늘의 AI 뉴스·트렌드를 수집해 C-레벨 임원용 HTML 리포트를 즉시 생성합니다.

## 언제 사용하나요?

- 스케줄 자동 실행이 실패했을 때
- 특정 날짜 리포트를 다시 생성할 때
- 특정 키워드/주제로 커스텀 리포트를 만들 때
- "오늘 AI 리포트 만들어줘" 같은 즉시 요청 시

## 사용 방법

### 기본 실행
```
오늘 AI 리포트 만들어줘
일일 리포트 생성해줘
AI 뉴스 리포트 즉시 만들어줘
```

### 특정 날짜
```
2026-06-10 리포트 다시 만들어줘
어제 리포트 재생성해줘
```

### 커스텀 주제
```
LLM 관련 뉴스만 모아서 리포트 만들어줘
오늘 GPT 관련 뉴스 리포트 만들어줘
```

## 실행 절차

### 1단계: 뉴스 수집 (병렬)
WebSearch로 5개 키워드 동시 검색:
- "AI news today 2026"
- "LLM large language model update"
- "generative AI enterprise 2026"
- "AI 인공지능 뉴스 최신"
- "OpenAI Google Anthropic Meta AI"

### 2단계: 기사 상세 수집
상위 5~7개 기사를 WebFetch로 내용 수집:
- 제목, 날짜, 핵심 내용 추출
- 중복 기사 제거
- 출처 신뢰성 확인

### 3단계: 분석 및 HTML 생성
다음 6개 섹션으로 구성:
1. **Executive Summary** — 핵심 3줄 요약
2. **주요 뉴스** — 5~8건 헤드라인 + 요약
3. **트렌드 분석** — 3~4개 거시 흐름
4. **모델·기술 업데이트** — 새 모델/기술 동향
5. **기업 동향** — 투자·M&A·전략
6. **전략적 시사점** — C-레벨 액션 아이템 5개

### 4단계: 파일 저장
```
저장 경로: C:\Temp\AI-DALIY-REPORT\report_YYYYMMDD.html
파일명: report_20260611.html (날짜 자동 적용)
```

## 리포트 품질 기준

- 기사 5개 이상 수집
- 각 섹션 300자 이상
- 날짜 최신 기사 우선 (3개월 이내)
- 한국어 작성, 전문용어 최소화
- 모바일 반응형 HTML

## 출력 예시

```
✅ 리포트 생성 완료!
📄 파일: C:\Temp\AI-DALIY-REPORT\report_20260611.html
📰 수집 기사: 7개
⏱️ 생성 시간: 약 45초
```

---

**관련 스킬:** [[report-analyzer]], [[backup-restore-manager]]  
**스케줄 작업:** `C:\Users\Admin\.claude\scheduled-tasks\daily-ai-trend-report\SKILL.md`
