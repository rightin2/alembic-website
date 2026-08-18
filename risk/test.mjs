// Port tests for the website Risk tool. These assert the CONTRACT the app decided
// (docs/research-risk/impl/DECISIONS.md and DECISIONS-ADDENDUM.md), not the older
// interim behaviour the website carried on 2026-08-17 before the app caught up.
import { RISK_AREAS } from './riskVocabulary.js'
import { emptyRiskState, setBranch, toggleTerm, setOwnLine, toRiskBlock, areasFor } from './riskState.js'
import { serialiseRiskBlock, isRiskBlockComplete } from './riskBlock.js'

let fails = 0
const t = (n, ok, d) => ok ? console.log('PASS ' + n)
  : (fails++, console.error('FAIL ' + n + (d ? '\n  ' + d : '')))

// 1. Structure, and no dashes in signed-off clinical content
const dims = RISK_AREAS.reduce((n, a) => n + a.subs.length, 0)
const terms = RISK_AREAS.reduce((n, a) => n + a.subs.reduce((m, s) => m + s.terms.length, 0), 0)
t('structure: 5 areas', RISK_AREAS.length === 5, 'got ' + RISK_AREAS.length)
t('structure: dims and terms present', dims === 72 && terms === 607, `got ${dims} dims / ${terms} terms`)
t('no em or en dashes in vocabulary', !/[–—]/.test(JSON.stringify(RISK_AREAS)))
t('every term within 115 chars', RISK_AREAS.every(a => a.subs.every(s => s.terms.every(x => x[0].length <= 115))))

// 2. The branch gate (safety.md): nothing serialises without a branch
t('no branch produces nothing', serialiseRiskBlock(toRiskBlock(emptyRiskState())) === null)
t('not-assessed without a reason is incomplete',
  !isRiskBlockComplete(toRiskBlock(setBranch(emptyRiskState(), 'not_assessed'))))

// 3. The blocking gate (risk-073): the assessed branch needs ALL THREE lines
let a = setBranch(emptyRiskState(), 'assessed')
a = toggleTerm(a, 'enq', 'si', 'asked about directly; client reported none')
t('assessed with only one lane still blocks', serialiseRiskBlock(toRiskBlock(a)) === null)
a = toggleTerm(a, 'out', 'o', 'no risk indicators identified on the enquiry made this contact')
a = toggleTerm(a, 'act', 'sp', 'safety plan reviewed with the client')
const outA = serialiseRiskBlock(toRiskBlock(a))
t('assessed with all three lanes serialises', Array.isArray(outA) && outA.length === 3, JSON.stringify(outA))
t('no unauthored fallback words', outA && !outA.some(l => /Not provided|Actions: None|Assessed: Yes/.test(l)), (outA || []).join(' | '))

// 4. The not-assessed branch carries its OWN actions area (nac, risk-065)
t('not-assessed exposes na and nac only',
  areasFor('not_assessed').map(x => x.id).join(',') === 'na,nac',
  areasFor('not_assessed').map(x => x.id).join(','))
let n = setBranch(emptyRiskState(), 'not_assessed')
n = toggleTerm(n, 'na', 'r', 'the client was not present')
const outN0 = serialiseRiskBlock(toRiskBlock(n))
t('reason alone serialises, with an honest actions line',
  outN0 && outN0[2] === 'Actions: not recorded', (outN0 || []).join(' | '))
n = toggleTerm(n, 'nac', 'at', 'contact attempted; message left')
const outN = serialiseRiskBlock(toRiskBlock(n))
t('missed-contact actions now serialise', outN && outN[2].includes('message left'), (outN || []).join(' | '))
t('never a false Actions: None', outN && !outN.join(' ').includes('Actions: None'), (outN || []).join(' | '))

// 5. The free-text line survives on the not-assessed branch (the 2026-08-17 data-loss bug)
let f = setBranch(emptyRiskState(), 'not_assessed')
f = toggleTerm(f, 'na', 'r', 'the client was not present')
f = setOwnLine(f, null, null, 'Two calls and a message left.')
t('own line serialises on not-assessed', toRiskBlock(f).notAssessedReason.includes('Two calls'),
  toRiskBlock(f).notAssessedReason)

// 6. The contradiction guard (risk-074), ported from the MSE engine
let g = setBranch(emptyRiskState(), 'assessed')
g = toggleTerm(g, 'act', 'es', 'no escalation indicated this contact')
const before = (g.sel.act.es || []).length
g = toggleTerm(g, 'act', 'es', 'discussed with supervisor')
t('a blanket negative and its positive cannot co-serialise',
  before === 1 && !(g.sel.act.es || []).includes('no escalation indicated this contact'),
  JSON.stringify(g.sel.act.es))

// 7. Full stops join sub-dimensions, so the semicolon stays intra-term
t('adopted enquiry wording keeps its own semicolon',
  outA && outA[0].includes('asked about directly; client reported none'), (outA || [])[0])

process.exit(fails ? 1 : 0)
