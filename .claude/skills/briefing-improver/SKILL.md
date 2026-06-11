---
name: briefing-improver
description: 프로젝트 전체 개선 사이클 — 점검·이슈해결·문서최적화를 순서대로 실행
---

# 🔄 브리핑 개선 통합 스킬

project-audit → issue-resolver → doc-optimizer 세 스킬을 하나의 흐름으로 실행합니다.

## 트리거

```
브리핑 개선해줘
전체 개선 사이클 돌려줘
프로젝트 한 번에 정리해줘
```

## 실행 흐름

```
1단계  project-audit     프로젝트 전체 점검 → 이슈 발굴 및 GitHub 등록
         ↓ (이슈 목록 확보)
2단계  issue-resolver    등록된 이슈 자동 해결 → 파일 수정 + 커밋 + 이슈 클로즈
         ↓ (코드·파일 변경 완료)
3단계  doc-optimizer     3문서 역할 재점검 → 중복 제거 → 커밋
```

각 단계 완료 후 다음 단계 진입 전 상태를 한 줄로 보고합니다.

## 단계별 동작

### 1단계 — project-audit
- 프로젝트 구조·보안·문서·설정·코드 품질 점검
- 발견된 이슈를 심각도별(🔴🟡🟠🟢)로 분류
- GitHub 이슈 자동 등록
- 자동 해결 가능 건수 집계 후 2단계로 진입

### 2단계 — issue-resolver
- 자동 해결 가능한 이슈부터 처리 (파일 생성·수정)
- 처리 완료 건: git commit + GitHub 이슈 클로즈
- 수동 처리 필요 건: 안내 코멘트 달고 Open 유지
- 처리 결과 요약 출력

### 3단계 — doc-optimizer
- SOUL.md·CLAUDE.md·README.md 역할 재점검
- SSOT 원칙으로 중복 항목 제거
- 낡은 날짜·경로·이슈 번호 갱신
- 변경사항 git commit

## 완료 보고 형식

```
─────────────────────────────────────────
✅ briefing-improver 완료

1단계 project-audit   발견 N개 → GitHub 이슈 N개 등록
2단계 issue-resolver  N개 자동 해결 / N개 수동 처리 필요
3단계 doc-optimizer   중복 N건 제거 / 문서 N개 갱신
─────────────────────────────────────────
```

## 스킵 조건

- 이슈가 0건이면 2단계 건너뜀
- 3문서에 변경 없으면 3단계 커밋 생략

## 관련 스킬

- [[project-audit]] — 1단계
- [[issue-resolver]] — 2단계
- [[doc-optimizer]] — 3단계
