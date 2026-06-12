export const meta = {
  name: 'project-improve',
  description: '프로젝트 감사 → 이슈 해결 → 문서 최적화 → 시스템 루브릭 평가. 이슈 0건이 될 때까지 최대 5회 반복.',
  phases: [
    { title: '감사', detail: 'issue-auditor — 문서·스킬·에이전트·보안·설정 전반 점검' },
    { title: '해결', detail: '자동 해결 가능 이슈 처리' },
    { title: '문서 최적화', detail: 'doc-optimizer — 3문서 역할 분리·중복 제거' },
    { title: '시스템 루브릭', detail: 'rubric-evaluator — 5개 시스템 차원 채점 + 점수 기록' },
    { title: '완료', detail: '잔여 이슈 + 루브릭 점수 보고' },
  ],
}

const MAX_ROUNDS = 5
let round = 0
let prevIssues = ''
let consecutiveSame = 0
const allResolved = []

while (round < MAX_ROUNDS) {
  round++
  log(`── ${round}회차 ─────────────────────────────`)

  // ── 감사 ──────────────────────────────────────────────────────
  phase('감사')
  const auditResult = await agent(
    `C:\\Temp\\AI-DALIY-REPORT 프로젝트를 점검하고 신규 이슈 목록을 반환하세요. ` +
    `이전 회차 이슈와 중복되지 않는 신규 이슈만 포함.`,
    { label: `issue-auditor-r${round}`, agentType: 'issue-auditor', phase: '감사' }
  )

  if (!auditResult) { log('감사 실패 — 중단'); break }

  const noNewIssues =
    auditResult.includes('신규 이슈: 0건') ||
    auditResult.includes('0건') ||
    auditResult.toLowerCase().includes('no new issues')

  if (noNewIssues) { log('신규 이슈 0건 — 루프 종료'); break }

  if (auditResult === prevIssues) {
    consecutiveSame++
    if (consecutiveSame >= 2) { log('동일 이슈 2회 연속 — 수동 처리만 남음, 루프 종료'); break }
  } else {
    consecutiveSame = 0
  }
  prevIssues = auditResult

  // ── 해결 ──────────────────────────────────────────────────────
  phase('해결')
  const resolveResult = await agent(
    `아래 이슈 목록에서 자동 해결 가능한 항목을 처리하세요. ` +
    `파일 수정·스킬 업데이트·CLAUDE.md 트리거 추가 등을 직접 실행. ` +
    `수동 처리가 필요한 항목은 목록만 반환.\n\n${auditResult}`,
    { label: `resolver-r${round}`, phase: '해결' }
  )

  if (resolveResult) allResolved.push(`[${round}회차] ${resolveResult}`)

  // ── 문서 최적화 ────────────────────────────────────────────────
  phase('문서 최적화')
  await agent(
    `CLAUDE.md·SOUL.md·README.md 3문서의 역할 분리·중복 제거·최신화를 실행하세요. ` +
    `CHANGELOG.md에 이번 회차 변경사항을 추가하세요.`,
    { label: `doc-optimizer-r${round}`, phase: '문서 최적화' }
  )
}

// ── 시스템 루브릭 평가 (루프 완료 후 1회) ──────────────────────
phase('시스템 루브릭')
const sysRubric = await agent(
  `mode: system\n\n` +
  `C:\\Temp\\AI-DALIY-REPORT 프로젝트의 시스템 품질을 루브릭으로 평가하세요.\n` +
  `하네스 아키텍처·자동화 신뢰성·문서관리·에이전트 협업 실질성·관측가능성 5개 차원을 채점하고,\n` +
  `JSON_SCORES: 라인을 반드시 포함해 반환하세요.`,
  { label: 'rubric-evaluator-system', agentType: 'rubric-evaluator', phase: '시스템 루브릭' }
)

// 점수 추출 및 로그 저장
if (sysRubric) {
  const jsonMatch = sysRubric.match(/JSON_SCORES:(\{.+\})/)
  if (jsonMatch) {
    await agent(
      `아래 JSON을 C:\\Temp\\AI-DALIY-REPORT\\.claude\\scores\\rubric_log.jsonl 파일에 한 줄 추가하세요.\n` +
      `파일이 없으면 새로 만드세요. 기존 내용은 유지하고 맨 끝에 줄바꿈 후 추가.\n\n` +
      `${jsonMatch[1]}`,
      { label: 'score-logger-system', phase: '시스템 루브릭' }
    )
  }
  log(`시스템 루브릭 평가 완료`)
}

phase('완료')
log(`총 ${round}회 실행 완료`)

return {
  rounds: round,
  resolved: allResolved,
  systemRubric: sysRubric,
  note: round >= MAX_ROUNDS ? '최대 반복 횟수 도달 — 잔여 이슈 수동 확인 필요' : '이슈 0건 달성',
}
