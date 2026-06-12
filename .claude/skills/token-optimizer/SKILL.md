---
name: token-optimizer
description: LLM API 코드에서 토큰 낭비 패턴을 감지하고 세 가지 방법으로 최적화 제안
---

# 토큰 최적화 스킬

현재 코드를 분석해 토큰 낭비 원인을 찾고, 프롬프트 캐싱·모델 선택·출력 제어 순으로 최적화안을 제시합니다.

## 언제 사용하나요?

- "토큰 최적화해줘"
- "API 비용 줄이고 싶어"
- "토큰이 너무 많이 나와"
- "프롬프트 캐싱 적용해줘"

## 실행 절차

### 1단계: 낭비 패턴 감지

코드에서 아래 세 가지를 확인한다.

| 패턴 | 확인 항목 |
|------|-----------|
| 시스템 프롬프트 반복 | `system=` 값이 매 호출마다 동일한 문자열인가 |
| 히스토리 무제한 누적 | `messages` 리스트를 자르거나 요약하는 로직이 없는가 |
| 출력 토큰 낭비 | `max_tokens`가 작업 규모 대비 과도하게 크거나 미설정인가 |

파일이 없으면 사용자에게 코드 붙여넣기를 요청한다.

### 2단계: 최적화 우선순위 결정

감지된 패턴에 따라 아래 순서로 적용한다.

1. **프롬프트 캐싱** — 시스템 프롬프트가 1,024 토큰 이상이고 반복되면 최우선 적용
2. **모델 다운그레이드 + Batch API** — 작업 복잡도 대비 모델이 과도하게 비싸면 제안
3. **출력 제어** — `max_tokens` 조정 및 간결 지시 추가

### 3단계: 수정 코드 제시

각 최적화마다 Before/After 코드를 함께 보여준다.

#### 패턴 1 — 프롬프트 캐싱 적용

```python
# Before
client.messages.create(
    model="claude-opus-4-8",
    system="긴 시스템 프롬프트...",
    messages=[{"role": "user", "content": user_input}]
)

# After
SYSTEM = [{
    "type": "text",
    "text": "긴 시스템 프롬프트...",
    "cache_control": {"type": "ephemeral"}
}]

client.messages.create(
    model="claude-opus-4-8",
    system=SYSTEM,  # 모듈 상단에 한 번만 정의
    messages=[{"role": "user", "content": user_input}]
)
# 첫 요청 이후 cache_read_input_tokens로 90% 절감
```

#### 패턴 2 — 모델 선택 + Batch API

```python
# 작업 복잡도별 모델 가이드
# 분류·추출·단순 Q&A   → claude-haiku-4-5   ($1/$5 per 1M)
# 일반 작업            → claude-sonnet-4-6  ($3/$15 per 1M)
# 복잡한 추론·코딩     → claude-opus-4-8    ($5/$25 per 1M)

# 급하지 않은 대량 작업 → Batch API (50% 추가 절감)
batch = client.messages.batches.create(
    requests=[
        {"custom_id": f"item-{i}",
         "params": {"model": "claude-haiku-4-5", "max_tokens": 100, ...}}
        for i in range(1000)
    ]
)
```

#### 패턴 3 — 출력 제어

```python
# Before: max_tokens 미설정 또는 과도하게 큼
client.messages.create(model="claude-opus-4-8", max_tokens=4096, ...)

# After: 작업에 맞게 축소 + 간결 지시
client.messages.create(
    model="claude-opus-4-8",
    max_tokens=256,  # 작업 규모에 맞게 조정
    system=[{
        "type": "text",
        "text": "기존 지침... 답변은 핵심만 간결하게. 서론·결론 생략.",
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...]
)
```

### 4단계: 절감 효과 요약

최적화 적용 후 예상 절감량을 표로 정리한다.

```
| 최적화 항목       | 적용 전 | 적용 후 | 절감률 |
|------------------|---------|---------|--------|
| 프롬프트 캐싱     | X토큰   | X×0.1   | ~90%   |
| 모델 변경         | Opus    | Haiku   | ~80%   |
| Batch API        | 정가    | 50% 할인 | ~50%  |
| 출력 토큰 제어    | X토큰   | 조정 후  | 가변   |
```

## 주의사항

- 캐시는 **5분 유효** — 만료 후 다음 요청 시 자동 재생성 (코드 수정 불필요)
- 캐싱 최소 조건: **1,024 토큰 이상**
- 모델 다운그레이드 전 품질 테스트 필수
- `cache_control`은 변하지 않는 블록 끝에만 붙인다
