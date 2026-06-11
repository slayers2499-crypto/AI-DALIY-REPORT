# -*- coding: utf-8 -*-
<#
.SYNOPSIS
GitHub 이슈 생성 스크립트

.DESCRIPTION
현재 리포지토리에 새로운 이슈를 생성합니다.

.PARAMETER Title
이슈의 제목 (필수)

.PARAMETER Description
이슈의 상세 설명 (선택)

.PARAMETER Labels
이슈에 붙을 레이블 (쉼표로 구분, 선택)

.PARAMETER Assignee
이슈를 담당할 사용자명 (선택)
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$Title,

    [Parameter(Mandatory=$false)]
    [string]$Description = "",

    [Parameter(Mandatory=$false)]
    [string]$Labels = "",

    [Parameter(Mandatory=$false)]
    [string]$Assignee = ""
)

# UTF-8 인코딩 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$GhPath = "gh"

# 함수: gh 명령 실행
function Invoke-GhCommand {
    param([string[]]$Arguments)

    try {
        $result = & $GhPath @Arguments 2>&1
        return @{
            Success = $LASTEXITCODE -eq 0
            Output = $result
            ExitCode = $LASTEXITCODE
        }
    }
    catch {
        return @{
            Success = $false
            Output = $_.Exception.Message
            ExitCode = 1
        }
    }
}

# 설명이 없으면 기본값 설정
if (-not $Description) {
    $Description = "추가 설명"
}

# 현재 리포지토리 확인
Write-Host "🔍 리포지토리 확인 중..." -ForegroundColor Cyan
$repoCheck = Invoke-GhCommand @("repo", "view", "--json", "name")

if (-not $repoCheck.Success) {
    Write-Error "현재 디렉토리가 Git 리포지토리가 아니거나, gh 인증이 필요합니다."
    exit 1
}

# 이슈 생성 정보 출력
Write-Host ""
Write-Host "📝 이슈를 생성 중입니다..." -ForegroundColor Green
Write-Host "  제목: $Title"
if ($Description -ne "추가 설명") { Write-Host "  설명: $Description" }
if ($Labels) { Write-Host "  레이블: $Labels" }
if ($Assignee) { Write-Host "  담당자: $Assignee" }
Write-Host ""

# gh issue create 명령 구성
$args = @("issue", "create", "--title", $Title, "--body", $Description)

if ($Labels) {
    # 레이블을 각각 추가 (여러 개일 수 있음)
    $labelArray = $Labels -split ',' | ForEach-Object { $_.Trim() }
    foreach ($label in $labelArray) {
        $args += @("--label", $label)
    }
}

if ($Assignee) {
    $args += @("--assignee", $Assignee)
}

# 이슈 생성 실행
$result = Invoke-GhCommand $args

if ($result.Success) {
    Write-Host "✅ 이슈가 성공적으로 생성되었습니다!" -ForegroundColor Green
    Write-Host "📌 URL: $($result.Output)" -ForegroundColor Yellow
    exit 0
} else {
    $errorMsg = $result.Output -as [string]

    # 오류 유형별 처리
    if ($errorMsg -match "label.*not found") {
        Write-Warning "경고: 일부 레이블이 리포지토리에 존재하지 않습니다."
        Write-Host ""
        Write-Host "💡 사용 가능한 레이블을 확인하려면:" -ForegroundColor Yellow
        Write-Host "   gh label list"
        Write-Host ""
    }

    if ($errorMsg -match "Could not resolve to a User with the login") {
        Write-Error "담당자 이름이 존재하지 않거나 권한이 없습니다."
    }

    Write-Error "이슈 생성 실패: $errorMsg"
    exit 1
}
