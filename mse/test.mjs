// Fidelity tests for the MSE website port, per HANDOVER-mse-website.md section 9.7.
// Run: node mse/test.mjs
import { MSE_DOMAINS } from './mseVocabulary.js'
import { emptyMseState, toggleTerm, serialiseMse, domainsRecorded, setOwnWording, effectiveWording } from './mseState.js'

let failures = 0
function check(name, ok, detail) {
  if (ok) { console.log('PASS ' + name) }
  else { failures++; console.error('FAIL ' + name + (detail ? '\n  ' + detail : '')) }
}

// 1. Structure: 12 domains, 50 dimensions, 221 terms
const dims = MSE_DOMAINS.reduce((n, d) => n + d.subs.length, 0)
const terms = MSE_DOMAINS.reduce((n, d) => n + d.subs.reduce((m, s) => m + s.terms.length, 0), 0)
check('structure 12/50/221', MSE_DOMAINS.length === 12 && dims === 50 && terms === 221,
  `got ${MSE_DOMAINS.length}/${dims}/${terms}`)

// 2. Dash scan: no em or en dashes anywhere in the vocabulary
const flat = JSON.stringify(MSE_DOMAINS)
check('no em/en dashes in vocabulary', !/[–—]/.test(flat))

// 3. Golden paragraph serialisation (from the pinned app test)
let s = emptyMseState()
s = toggleTerm(s, 'app', 'gr', 'well groomed')
s = toggleTerm(s, 'beh', 'en', 'cooperative and engaged')
s = toggleTerm(s, 'sp', 'fl', 'coherent')
s = toggleTerm(s, 'mo', 'm', 'low')
s = toggleTerm(s, 'af', 'rg', 'restricted')
s = toggleTerm(s, 'af', 'cg', 'congruent with content')
s = toggleTerm(s, 'tf', 'as', 'logical and goal-directed')
s = toggleTerm(s, 'tc', 'ge', 'no psychotic features evident')
s = toggleTerm(s, 'tc', 'si', 'denied on direct enquiry')
s = toggleTerm(s, 'co', 'lc', 'alert')
s = toggleTerm(s, 'in', 'i', 'client identifies the difficulty and the reason for attending')

const GOLDEN = 'Well groomed; cooperative and engaged; speech coherent; mood low; affect restricted, congruent with content; thought form logical and goal-directed; no psychotic features evident, suicidal ideation denied on direct enquiry; cognition alert; insight client identifies the difficulty and the reason for attending.'
const para = serialiseMse(s, 'para')
check('golden paragraph', para === GOLDEN, 'got:\n  ' + para)

// 4. Labelled and dot-point shapes
const labelled = serialiseMse(s, 'labelled')
check('labelled starts correctly', labelled.startsWith('Appearance: Well groomed. Behaviour: Cooperative and engaged.'), labelled.slice(0, 80))
const bullets = serialiseMse(s, 'bullets')
check('bullets shape', bullets.startsWith('- Appearance: well groomed\n- Behaviour: cooperative and engaged'), bullets.split('\n')[0])

// 5. Empty state serialises to empty string in every format
const e = emptyMseState()
check('empty state serialises empty', serialiseMse(e, 'para') === '' && serialiseMse(e, 'labelled') === '' && serialiseMse(e, 'bullets') === '')

// 6. Domains recorded count
check('domainsRecorded', domainsRecorded(s) === 9 && domainsRecorded(e) === 0, `got ${domainsRecorded(s)} and ${domainsRecorded(e)}`)

// 7. single dimension replaces rather than accumulates
let r = emptyMseState()
r = toggleTerm(r, 'mo', 'm', 'low')
r = toggleTerm(r, 'mo', 'm', 'anxious')
check('single replaces', r.sel.mo.m.length === 1 && r.sel.mo.m[0] === 'anxious', JSON.stringify(r.sel.mo.m))

// 8. own wording flows into serialisation
let w = emptyMseState()
w = toggleTerm(w, 'app', 'gr', 'well groomed')
w = setOwnWording(w, 'app', 'gr', 'well groomed', 'neatly presented')
check('own wording used', serialiseMse(w, 'para') === 'Neatly presented.' && effectiveWording(w, 'app', 'gr', 'well groomed') === 'neatly presented', serialiseMse(w, 'para'))

// 9. no output contains em or en dashes
check('no dashes in outputs', ![para, labelled, bullets].some(t => /[–—]/.test(t)))

process.exit(failures ? 1 : 0)
