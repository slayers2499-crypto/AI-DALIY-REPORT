export const meta = {
  name: 'daily-report',
  description: 'ai-briefing-team으로 AI 일일 리포트 생성 — 뉴스 수집·작성·품질 검증 파이프라인',
  phases: [
    { title: '뉴스 수집', detail: 'news-collector — WebSearch 5개 키워드 + WebFetch 7개 기사' },
    { title: '리포트 작성', detail: 'report-writer — 6섹션 HTML 초안 생성' },
    { title: '품질 검증', detail: 'quality-checker — 7개 항목 체크리스트' },
    { title: '완료', detail: '결과 요약 반환' },
  ],
}

const dateStr = args?.date || 'today'

// 1단계: 뉴스 수집
phase('뉴스 수집')
const news = await agent(
  `오늘(${dateStr}) 기준으로 AI 뉴스를 수집하세요. ` +
  `WebSearch 5개 키워드를 실행하고 상위 7개 기사를 WebFetch로 수집해 기사 목록을 반환하세요.`,
  {
    label: 'news-collector',
    agentType: 'news-collector',
    phase: '뉴스 수집',
  }
)

if (!news) {
  log('뉴스 수집 실패 — 중단')
  return { success: false, reason: 'news-collector returned null' }
}

log(`뉴스 수집 완료`)

// 2단계: 리포트 작성
phase('리포트 작성')
const draft = await agent(
  `아래 기사 목록으로 C-레벨 임원용 6섹션 HTML 리포트를 작성하고 ` +
  `C:\\Temp\\AI-DALIY-REPORT\\report_${dateStr === 'today' ? 'YYYYMMDD' : dateStr.replace(/-/g, '')}.html 에 저장하세요.\n\n` +
  `수집 기사:\n${news}`,
  {
    label: 'report-writer',
    agentType: 'report-writer',
    phase: '리포트 작성',
  }
)

if (!draft) {
  log('리포트 작성 실패 — 중단')
  return { success: false, reason: 'report-writer returned null' }
}

// 3단계: 품질 검증
phase('품질 검증')
const qa = await agent(
  `아래 리포트를 7개 항목 체크리스트로 검증하고 PASS/FAIL 결과를 반환하세요.\n\n${draft}`,
  {
    label: 'quality-checker',
    agentType: 'quality-checker',
    phase: '품질 검증',
  }
)

log(`품질 검증 완료: ${qa?.includes('PASS') ? 'PASS' : 'FAIL'}`)

phase('완료')
return {
  success: true,
  date: dateStr,
  qaResult: qa,
}
