# 기여 가이드

## 기여 방법

### 이슈 등록
- 버그 발견 시 GitHub Issues에 등록
- 제목: `[유형] 간단한 설명` 형식 사용
- 레이블: `bug`, `enhancement`, `documentation` 중 선택

### 풀 리퀘스트
1. 이슈 먼저 등록 후 작업 시작
2. feature 브랜치 생성: `git checkout -b fix/issue-27`
3. 변경사항 커밋 (아래 커밋 메시지 규칙 참조)
4. PR 생성 시 관련 이슈 번호 명시: `Closes #27`

### 커밋 메시지 규칙

```
<타입>: <요약>

<선택적 상세 설명>
```

타입:
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `chore`: 설정, 빌드 관련
- `refactor`: 리팩토링
- `style`: 포맷, 스타일 변경

예시:
```
feat: 이메일 자동 배송 기능 추가

리포트 생성 후 설정된 수신자에게 HTML 리포트를 이메일로 자동 전송.
config.json의 report_recipients 배열에 이메일 추가.
```

## 코드 스타일

- HTML: 2스페이스 들여쓰기, CSS 변수 사용
- JSON: 2스페이스 들여쓰기
- Markdown: 한국어 우선, 기술 용어는 영어 병기

## 테스트

변경 후 확인 사항:
- `리포트 분석해줘` 스킬로 HTML 품질 검증
- 모바일 브라우저에서 리포트 렌더링 확인
- config.json 유효성 검증 (JSON 형식)
