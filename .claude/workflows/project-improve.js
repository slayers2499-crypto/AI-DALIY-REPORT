export const meta = {
  name: 'project-improve',
  description: '프로젝트 감사 → 이슈 해결 → 문서 최적화 순차 파이프라인. 이슈 0건이 될 때까지 최대 5회 반복.',
  phases: [
    { title: '감사', detail: 'issue-auditor — 문서·스킬·에이전트·보안·설정 전반 점검' },
    { title: '해결', detail: 'issue-resolver 스킬 — 자동 해결 가능 이슈 처리' },
    { title: '문서 최적화', detail: 'doc-optimizer 스킬 — 3문서 역할 분리·중복 제거' },
    { title: '완료', detail: '잔여 이슈 목록 보고' },
  ],
}

const MAX_ROUNDS = 5
let round = 0
let prevIssues = ''
let consecutiveSame = 0
const allResolved = []
const allManual = []

while (round < MAX_ROUNDS) {
  round++
  log(`── ${round}회차 ─────────────────────────────`)

  // 감사
  phase('감사')
  const auditResult = await agent(
    `C:\\Temp\\AI-DALIY-REPORT 프로젝트를 점검하고 신규 이슈 목록을 반환하세요. ` +
    `이전 회차 이슈와 중복되지 않는 신규 이슈만 포함.`,
    {
      label: `issue-auditor-r${round}`,
      agentType: 'issue-auditor',
      phase: '감사',
    }
  )

  if (!auditResult) {
    log('감사 실패 — 중단')
    break
  }

  // 신규 이슈 0건이면 종료
  const noNewIssues =
    auditResult.includes('신규 이슈: 0건') ||
    auditResult.includes('0건') ||
    auditResult.toLowerCase().includes('no new issues')

  if (noNewIssues) {
    log('신규 이슈 0건 — 루프 종료')
    break
  }

  // 동일 이슈 2회 연속 감지 → 자동 해결 불가, 종료
  if (auditResult === prevIssues) {
    consecutiveSame++
    if (consecutiveSame >= 2) {
      log('동일 이슈 2회 연속 — 수동 처리 필요 이슈만 남음, 루프 종료')
      break
    }
  } else {
    consecutiveSame = 0
  }
  prevIssues = auditResult

  // 해결
  phase('해결')
  const resolveResult = await agent(
    `아래 이슈 목록에서 자동 해결 가능한 항목을 처리하세요. ` +
    `파일 수정·스킬 업데이트·CLAUDE.md 트리거 추가 등을 직접 실행. ` +
    `수동 처리가 필요한 항목은 목록만 반환.\n\n${auditResult}`,
    {
      label: `resolver-r${round}`,
      phase: '해결',
    }
  )

  if (resolveResult) {
    allResolved.push(`[${round}회차] ${resolveResult}`)
  }

  // 문서 최적화
  phase('문서 최적화')
  await agent(
    `CLAUDE.md·SOUL.md·README.md 3문서의 역할 분리·중복 제거·최신화를 실행하세요. ` +
    `CHANGELOG.md에 이번 회차 변경사항을 추가하세요.`,
    {
      label: `doc-optimizer-r${round}`,
      phase: '문서 최적화',
    }
  )
}

phase('완료')
log(`총 ${round}회 실행 완료`)

return {
  rounds: round,
  resolved: allResolved,
  note: round >= MAX_ROUNDS ? '최대 반복 횟수 도달 — 잔여 이슈 수동 확인 필요' : '이슈 0건 달성',
}
