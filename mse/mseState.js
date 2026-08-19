// Selection and serialisation engine for the MSE composer, ported from the
// signed-off prototype at app/prototypes/mse-composer.html (its S object,
// word(), tog() and build()). Pure: no DOM, no React, no I/O.
//
// State shape:
//   sel  { [domainId]: { [subId]: term[] } }  what the clinician has picked
//   own  { [scope]: string }                  free-typed lines, scope is
//                                             'root' | domainId | 'domainId|subId'
//   over { 'domainId|subId|term': string }    the clinician's own wording for
//                                             a term, reused everywhere after
//   edited string | null                      the whole line, typed by hand in
//                                             the preview, overriding the built
//                                             one until cleared
//
// Every mutator returns a new state object and leaves the old one untouched,
// so React can hold state in useState and compare by identity.

import { MSE_DOMAINS } from './mseVocabulary.js'
import { subOffered } from '../detailLevel.js'

const findDomain = domainId => MSE_DOMAINS.find(d => d.id === domainId)

const findSub = (domainId, subId) =>
  findDomain(domainId)?.subs.find(s => s.id === subId)

const termKey = (domainId, subId, term) => domainId + '|' + subId + '|' + term

// The prototype's three own-line scopes: the whole MSE, one domain, one sub.
const ownKey = (domainId, subId) =>
  domainId == null ? 'root' : subId == null ? domainId : domainId + '|' + subId

const trimmed = value => (typeof value === 'string' ? value.trim() : '')

// Every domain and sub gets its empty array up front, exactly as the prototype
// seeds S.sel, so callers can read state.sel[domainId][subId] without guarding.
export function emptyMseState() {
  const sel = {}
  for (const domain of MSE_DOMAINS) {
    sel[domain.id] = {}
    for (const sub of domain.subs) sel[domain.id][sub.id] = []
  }
  return { sel, own: {}, over: {}, edited: null }
}

// The hand edit (change request B1, 2026-08-17). The clinician can type
// straight into the preview, and what they typed is what goes in the note.
//
// It is deliberately a SEPARATE field rather than a rewrite of sel/own: the
// picks stay exactly as they were, so "Back to the built line" is lossless and
// the panel can keep showing which terms are ticked while the typed line is
// what serialises. Nothing here infers or generates: it records a sentence the
// clinician wrote, which is the strongest form of the rule in
// .claude/rules/safety.md, not an exception to it.
//
// Empty or whitespace clears the override rather than storing a blank line,
// so an accidental select-all-delete falls back to the built line instead of
// serialising nothing.
export function setEditedLine(state, text) {
  const value = trimmed(text)
  return { ...state, edited: value || null }
}

export function clearEditedLine(state) {
  return { ...state, edited: null }
}

export function isEdited(state) {
  return !!trimmed(state?.edited)
}

// The contradiction guard (research card mse-077). A blanket negative claims
// the whole dimension ("no specific fears reported"), so it cannot sit in the
// same serialised line as a positive it negates. In the listed multi-pick
// dimensions, picking the blanket clears the dimension and picking anything
// else clears the blanket. Detection is by the signed-off text rather than a
// vocabulary flag because the vocabulary is clinical content only Jean-Luc
// edits. tc/ge is special-cased: its "no acute distress observed" is a
// summary term whose own explanation says to pair it with specific findings,
// so only the delusions-and-perception blanket is exclusive there. tc/sx and
// co/su stay unguarded: their negatives record single enquiry facts that
// legitimately co-exist with the dimension's other facts.
const BLANKET_SUBS = new Set([
  'app|df', 'beh|ps', 'beh|mnr', 'tf|pv', 'tc|dp', 'tc|oc', 'tc|ph', 'tc|pr',
  'pe|ex', 'pe|hm', 'pe|il', 'pe|dd', 'pe|ii', 'co|me',
])
function isBlanketNegative(domainId, subId, term) {
  if (/ not enquired about this session$/.test(term)) return true
  if (/ asked about; none reported$/.test(term)) return true
  if (domainId === 'tc' && subId === 'ge') return term.startsWith('no delusional beliefs')
  return BLANKET_SUBS.has(domainId + '|' + subId) && /^no /.test(term)
}

export function toggleTerm(state, domainId, subId, term) {
  const sub = findSub(domainId, subId)
  if (!sub) return state
  const current = state.sel?.[domainId]?.[subId] || []
  const was = current.includes(term)
  let next
  if (sub.single) next = was ? [] : [term]
  else if (was) next = current.filter(t => t !== term)
  else if (isBlanketNegative(domainId, subId, term)) next = [term]
  else next = [...current.filter(t => !isBlanketNegative(domainId, subId, t)), term]
  return {
    ...state,
    sel: {
      ...state.sel,
      [domainId]: { ...(state.sel?.[domainId] || {}), [subId]: next },
    },
  }
}

// Empty wording, or wording identical to the term, clears the override.
export function setOwnWording(state, domainId, subId, term, wording) {
  const key = termKey(domainId, subId, term)
  const value = trimmed(wording)
  const over = { ...state.over }
  if (value && value !== term) over[key] = value
  else delete over[key]
  return { ...state, over }
}

// The Write-my-own entries. Empty text clears the line.
export function setOwnLine(state, domainId, subId, text) {
  const key = ownKey(domainId, subId)
  const value = trimmed(text)
  const own = { ...state.own }
  if (value) own[key] = value
  else delete own[key]
  return { ...state, own }
}

export function effectiveWording(state, domainId, subId, term) {
  return state.over?.[termKey(domainId, subId, term)] || term
}

// One entry per domain that has anything in it, in MSE_DOMAINS order, plus a
// leading unlabelled entry when the clinician wrote a whole-MSE line.
function domainParts(state) {
  const parts = []
  if (state.own?.root) parts.push({ label: null, lead: '', text: state.own.root })
  for (const domain of MSE_DOMAINS) {
    const bits = []
    if (state.own?.[domain.id]) bits.push(state.own[domain.id])
    for (const sub of domain.subs) {
      const picks = state.sel?.[domain.id]?.[sub.id] || []
      const own = state.own?.[domain.id + '|' + sub.id]
      const pieces = []
      if (picks.length) {
        pieces.push(picks.map(t => effectiveWording(state, domain.id, sub.id, t)).join(', '))
      }
      if (own) pieces.push(own)
      if (pieces.length) bits.push((sub.lead ? sub.lead + ' ' : '') + pieces.join(', '))
    }
    if (bits.length) parts.push({ label: domain.label, lead: domain.lead, text: bits.join(', ') })
  }
  return parts
}

export function domainsRecorded(state) {
  return domainParts(state).filter(p => p.label).length
}

export function serialiseMse(state, format = 'para') {
  // A hand edit wins over every format: the preview shows the exact text that
  // will land in the note, so there is no arrangement of the interface in
  // which the clinician reads one sentence and the record keeps another.
  if (isEdited(state)) return trimmed(state.edited)
  const parts = domainParts(state)
  if (!parts.length) return ''
  if (format === 'bullets') {
    return parts.map(p => '- ' + (p.label ? p.label + ': ' : '') + p.text).join('\n')
  }
  if (format === 'labelled') {
    return parts
      .map(p => (p.label ? p.label + ': ' : '') + p.text.charAt(0).toUpperCase() + p.text.slice(1) + '.')
      .join(' ')
  }
  // paragraph: the mandated inline shape. Domains join with full stops so the
  // semicolon stays reserved for the intra-term evidential join (research card
  // mse-065, 2026-08-16; matches the clinician's own filed sentence-per-domain
  // lines and documentation.md, which allows full stops within a section line).
  return (
    parts
      .map(p => {
        const t = p.lead ? p.lead + ' ' + p.text : p.text
        return t.charAt(0).toUpperCase() + t.slice(1)
      })
      .join('. ') + '.'
  )
}

// The single line that goes into a chart note. documentation.md requires MSE
// to sit inline after its label, so any newline a clinician typed into a
// free-text line is folded back to a space here.
export function mseInlineLine(state) {
  return 'MSE: ' + serialiseMse(state, 'para').replace(/\s*\n+\s*/g, ' ')
}

// The detail level (change request B3, treatment A, 2026-08-17). Exported from
// the engine and imported by the panel rather than re-derived there: a panel
// that computes vocabulary shape locally drifts from the engine silently, which
// is exactly the defect HANDOVER-website-sync.md section 5 records.
//
// A dimension the clinician has already recorded something in is always
// offered, whatever the level. Dropping to Brief must never hide an
// observation that is still serialising into the note.
export function subHasContent(state, domainId, subId) {
  return (state?.sel?.[domainId]?.[subId] || []).length > 0
    || !!state?.own?.[domainId + '|' + subId]
}

export function domainsForLevel(state, level) {
  const out = []
  for (const domain of MSE_DOMAINS) {
    const subs = domain.subs.filter(s => subOffered(s, level, subHasContent(state, domain.id, s.id)))
    // A domain whose own line is written stays reachable even if every one of
    // its dimensions is above the level.
    if (subs.length || state?.own?.[domain.id]) out.push({ ...domain, subs })
  }
  return out
}

export function offeredCounts(state, level) {
  const domains = domainsForLevel(state, level)
  let dims = 0
  let terms = 0
  for (const d of domains) {
    dims += d.subs.length
    for (const s of d.subs) terms += s.terms.length
  }
  return { domains: domains.length, dims, terms }
}
