---
name: backup-restore-manager
description: HTML 리포트 파일 백업 및 특정 날짜 리포트 복구
---

# 💾 백업/복구 관리 스킬

생성된 HTML 리포트를 안전하게 백업하고, 필요 시 특정 날짜 리포트를 복구합니다.

## 언제 사용하나요?

- C:\Temp 폴더가 정리되어 리포트가 사라진 경우
- 특정 날짜 리포트를 다시 확인하고 싶을 때
- 리포트를 다른 위치로 옮기고 싶을 때
- 정기 백업을 수행할 때

## 사용 방법

### 백업
```
리포트 백업해줘
오늘 리포트 백업
전체 리포트 아카이브해줘
```

### 복구
```
2026-06-10 리포트 복구해줘
어제 리포트 찾아줘
6월 리포트 목록 보여줘
```

### 상태 확인
```
백업 상태 확인해줘
리포트 몇 개 저장돼 있어?
```

## 백업 구조

```
C:\Users\Admin\Documents\AI-Reports\
├── 2026\
│   ├── 06\
│   │   ├── report_20260611.html
│   │   ├── report_20260610.html
│   │   └── ...
│   └── 07\
│       └── ...
└── archive_index.json   ← 전체 인덱스
```

## 실행 절차

### 백업 실행
1. `C:\Temp\AI-DALIY-REPORT\` 에서 HTML 파일 목록 수집
2. 영구 디렉토리 생성 (없을 경우)
3. 파일 복사 (덮어쓰기 옵션)
4. `archive_index.json` 업데이트

### 복구 실행
1. `archive_index.json`에서 해당 날짜 파일 검색
2. 파일 존재 여부 확인
3. `C:\Temp\AI-DALIY-REPORT\`로 복사
4. 복구 완료 알림

### archive_index.json 형식
```json
{
  "last_updated": "2026-06-11",
  "total_reports": 1,
  "reports": [
    {
      "date": "2026-06-11",
      "filename": "report_20260611.html",
      "path": "C:\\Users\\Admin\\Documents\\AI-Reports\\2026\\06\\report_20260611.html",
      "size_kb": 36,
      "sections": 6
    }
  ]
}
```

## PowerShell 명령 예시

```powershell
# 백업 디렉토리 생성
$backupRoot = "C:\Users\Admin\Documents\AI-Reports"
$yearMonth = Get-Date -Format "yyyy\\MM"
New-Item -ItemType Directory -Force "$backupRoot\$yearMonth"

# 오늘 리포트 백업
$today = Get-Date -Format "yyyyMMdd"
Copy-Item "C:\Temp\AI-DALIY-REPORT\report_$today.html" `
          "$backupRoot\$yearMonth\report_$today.html"

# 백업 목록 확인
Get-ChildItem "$backupRoot" -Recurse -Filter "*.html" | 
  Select-Object Name, LastWriteTime, Length
```

## 주의사항

- 백업 전 원본 파일 존재 확인 필수
- `C:\Temp`는 시스템 재시작 시 정리될 수 있음 → 즉시 백업 권장
- 영구 저장 위치: `C:\Users\Admin\Documents\AI-Reports\`

---

**관련 스킬:** [[daily-report-generator]], [[report-analyzer]]  
**관련 이슈:** #2 (C:\Temp에서 영구 디렉토리로 이동)
