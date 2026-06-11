---
name: bulk-issue-creator
description: 여러 이슈를 한 번에 GitHub에 일괄 등록
---

# 📋 이슈 일괄 생성 스킬

발견된 여러 개의 이슈를 GitHub에 한 번에 자동 등록합니다.

## 언제 사용하나요?

- 프로젝트 점검 후 여러 개 이슈를 한꺼번에 올릴 때
- ISSUES.md 파일에 정리된 이슈를 GitHub에 동기화할 때
- 버그/개선사항 목록을 한 번에 등록할 때

## 사용 방법

```
ISSUES.md에 있는 이슈들 GitHub에 올려줘
이슈 일괄 등록해줘
발견된 이슈들 한꺼번에 GitHub에 등록해줘
```

## 실행 절차

### 1단계: 이슈 목록 파악
- ISSUES.md 또는 대화에서 이슈 목록 수집
- 심각도 분류: 긴급/높음/중간/낮음
- 중복 이슈 확인 (`gh issue list`)

### 2단계: 레이블 확인
```powershell
gh label list
```
존재하지 않는 레이블은 자동 생성:
- `bug` — 버그
- `enhancement` — 개선/기능
- `documentation` — 문서화
- `security` — 보안
- `performance` — 성능

### 3단계: 이슈 일괄 등록
각 이슈를 순서대로 등록:
```powershell
gh issue create --title "제목" --body @'
## 문제
...

## 영향
...

## 해결책
...
'@ --label "bug"
```

**중요:** 
- PowerShell heredoc(`@'...'@`)으로 한글 깨짐 방지
- 각 이슈 등록 후 성공 확인
- 실패 시 재시도

### 4단계: 결과 요약
```
✅ 1/5 - [긴급] 이슈 제목
✅ 2/5 - [높음] 이슈 제목
...
🎉 총 5개 이슈 등록 완료!
```

## 이슈 형식 템플릿

```markdown
## 문제
현재 상황과 문제점 설명

## 영향
- 영향 범위 1
- 영향 범위 2

## 해결책
- 해결 방법 1
- 해결 방법 2

## 우선순위
즉시 / 단기 / 중기 / 장기
```

## 주의사항

- `gh` CLI 인증 필요: `gh auth status`
- 기존 이슈와 중복 확인 필수
- 레이블은 리포지토리에 존재해야 함
- 한글은 반드시 heredoc 방식으로 입력

---

**관련 스킬:** [[project-audit]], [[github-issue-creator]]
