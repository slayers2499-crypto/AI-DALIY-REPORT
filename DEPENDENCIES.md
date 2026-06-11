# 의존성 관리

## 시스템 의존성

이 프로젝트는 별도 패키지 설치 없이 Claude Code 내장 도구만 사용합니다.

## 필수 도구

| 도구 | 버전 | 용도 | 설치 방법 |
|------|------|------|----------|
| Claude Code | 최신 | 스케줄 실행, AI 분석 | https://claude.ai/code |
| GitHub CLI (gh) | 2.x+ | 이슈 관리, 저장소 연동 | `winget install GitHub.cli` |
| Git | 2.x+ | 버전 관리 | https://git-scm.com |
| PowerShell | 5.1+ | 스크립트 실행 | Windows 기본 포함 |

## Claude Code 내장 도구 (별도 설치 불필요)

| 도구 | 용도 |
|------|------|
| WebSearch | AI 뉴스 키워드 검색 |
| WebFetch | 기사 본문 수집 |
| Write / Edit / Read | 파일 생성 및 수정 |
| Bash / PowerShell | 명령 실행 |

## 버전 확인

```powershell
gh --version
git --version
$PSVersionTable.PSVersion
```

## 업데이트

```powershell
winget upgrade GitHub.cli
winget upgrade Git.Git
```
