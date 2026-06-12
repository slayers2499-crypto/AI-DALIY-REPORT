export const meta = {
  name: 'daily-report',
  description: 'ai-briefing-team으로 AI 일일 리포트 생성 — 뉴스 수집·작성·정량검증·루브릭평가·피드백 파이프라인',
  phases: [
    { title: '뉴스 수집', detail: 'news-collector — WebSearch 5개 키워드 + WebFetch 7개 기사' },
    { title: '리포트 작성', detail: 'report-writer — 6섹션 HTML 초안 생성' },
    { title: '정량 검증', detail: 'quality-checker — 7개 항목 체크리스트 (빠른 게이트)' },
    { title: '루브릭 평가', detail: 'rubric-evaluator — 정성 2개 차원 채점 + 피드백 루프' },
    { title: '점수 기록', detail: '.claude/scores/rubric_log.jsonl 누적 저장' },
  ],
}

const dateStr = args?.date || 'today'
const MAX_REWRITE = 2  // 재작성 최대 횟수

// ── 1단계: 뉴스 수집 ──────────────────────────────────────────
phase('뉴스 수집')
const news = await agent(
  `오늘(${dateStr}) 기준으로 AI 뉴스를 수집하세요. ` +
  `WebSearch 5개 키워드를 실행하고 상위 7개 기사를 WebFetch로 수집해 기사 목록을 반환하세요.`,
  { label: 'news-collector', agentType: 'news-collector', phase: '뉴스 수집' }
)

if (!news) {
  log('뉴스 수집 실패 — 중단')
  return { success: false, reason: 'news-collector returned null' }
}
log('뉴스 수집 완료')

// ── 2단계: 리포트 작성 ────────────────────────────────────────
phase('리포트 작성')
const filePath = `C:\\Temp\\AI-DALIY-REPORT\\report_${dateStr === 'today' ? 'YYYYMMDD' : dateStr.replace(/-/g, '')}.html`

let draft = await agent(
  `아래 기사 목록으로 C-레벨 임원용 6섹션 HTML 리포트를 작성하고 ${filePath} 에 저장하세요.\n\n수집 기사:\n${news}`,
  { label: 'report-writer', agentType: 'report-writer', phase: '리포트 작성' }
)

if (!draft) {
  log('리포트 작성 실패 — 중단')
  return { success: false, reason: 'report-writer returned null' }
}

// ── 3단계: 정량 검증 (빠른 게이트) ───────────────────────────
phase('정량 검증')
const qaResult = await agent(
  `아래 리포트를 7개 항목 체크리스트로 검증하고 PASS/FAIL 결과를 반환하세요.\n\n파일 경로: ${filePath}\n\n${draft}`,
  { label: 'quality-checker', agentType: 'quality-checker', phase: '정량 검증' }
)

const qaFail = qaResult && qaResult.includes('FAIL') && !qaResult.includes('PASS (minor)')
if (qaFail) {
  log('정량 검증 FAIL — 리포트 재작성 요청')
  draft = await agent(
    `아래 검증 결과의 실패 항목을 수정해 리포트를 재작성하고 ${filePath} 에 다시 저장하세요.\n\n검증 결과:\n${qaResult}\n\n원본 기사:\n${news}`,
    { label: 'report-writer-retry', agentType: 'report-writer', phase: '리포트 작성' }
  )
}
log(`정량 검증: ${qaFail ? '재작성 후 완료' : (qaResult?.includes('PASS') ? 'PASS' : '완료')}`)

// ── 4단계: 루브릭 평가 + 피드백 루프 ──────────────────────────
phase('루브릭 평가')
let rubricResult = null
let rewriteCount = 0

while (rewriteCount <= MAX_REWRITE) {
  rubricResult = await agent(
    `mode: report\n\n아래 리포트를 정성·정량 통합 루브릭으로 평가하세요.\n` +
    `quality-checker 결과도 함께 참고하세요.\n\n` +
    `파일 경로: ${filePath}\n\nquality-checker 결과:\n${qaResult}\n\n리포트 내용:\n${draft}`,
    { label: `rubric-evaluator-r${rewriteCount + 1}`, agentType: 'rubric-evaluator', phase: '루브릭 평가' }
  )

  // 정성 점수 추출 — "REWRITE 요청" 포함 시 재작성
  const needsRewrite = rubricResult && rubricResult.includes('REWRITE 요청')

  if (!needsRewrite || rewriteCount >= MAX_REWRITE) break

  rewriteCount++
  log(`정성 평가 낮음 — 재작성 요청 (${rewriteCount}/${MAX_REWRITE}회)`)

  draft = await agent(
    `아래 루브릭 평가를 바탕으로 리포트를 개선하세요.\n` +
    `특히 "전략적 통찰 깊이"와 "C-레벨 실용성" 점수를 올리는 데 집중하세요.\n` +
    `파일 경로: ${filePath} 에 덮어쓰세요.\n\n` +
    `루브릭 평가 결과:\n${rubricResult}\n\n원본 기사:\n${news}`,
    { label: `report-writer-rewrite-${rewriteCount}`, agentType: 'report-writer', phase: '리포트 작성' }
  )
}

log(`루브릭 평가 완료 (재작성 ${rewriteCount}회)`)

// ── 5단계: 점수 기록 ──────────────────────────────────────────
phase('점수 기록')

// rubricResult에서 점수 파싱 (간단한 추출)
let reportScore = null
if (rubricResult) {
  const totalMatch = rubricResult.match(/총점[^\d]*(\d+)\/12/)
  const insightMatch = rubricResult.match(/전략적 통찰 깊이[^\d]*(\d+)\/4/)
  const utilityMatch = rubricResult.match(/C-레벨 실용성[^\d]*(\d+)\/4/)

  reportScore = {
    date: dateStr,
    mode: 'report',
    strategic_insight: insightMatch ? parseInt(insightMatch[1]) : null,
    c_level_utility: utilityMatch ? parseInt(utilityMatch[1]) : null,
    qa_pass: qaResult ? !qaFail : null,
    rewrite_count: rewriteCount,
    total: totalMatch ? parseInt(totalMatch[1]) : null,
    max: 12,
  }

  await agent(
    `아래 JSON을 C:\\Temp\\AI-DALIY-REPORT\\.claude\\scores\\rubric_log.jsonl 파일에 한 줄 추가하세요.\n` +
    `파일이 없으면 새로 만드세요. 기존 내용은 유지하고 맨 끝에 줄바꿈 후 추가.\n\n` +
    `${JSON.stringify(reportScore)}`,
    { label: 'score-logger', phase: '점수 기록' }
  )
  log(`점수 기록 완료: 총점 ${reportScore.total}/12`)
}

return {
  success: true,
  date: dateStr,
  file: filePath,
  qaResult,
  rubricResult,
  score: reportScore,
  rewriteCount,
}
