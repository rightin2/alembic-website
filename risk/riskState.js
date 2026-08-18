// Selection and serialisation engine for the Risk builder, the same shape as
// lib/mse/mseState.js with one addition that changes everything: a branch.
//
// State:
//   branch  null | 'assessed' | 'not_assessed'
//   sel     { [areaId]: { [subId]: term[] } }
//   own     { [scope]: string }   'root' | areaId | 'areaId|subId'
//   over    { 'areaId|subId|term': string }
//
// Every mutator returns a new object and leaves the old one untouched.
//
// This module does NOT format the note. It builds the five fields
// lib/noteStyles/riskBlock.js already takes, and that module writes the three
// lines. One serialiser, already tested, already trusted by the composer, the
// completeness checker and the commit guard.
//
// The branch is the safety rule in code (.claude/rules/safety.md): a risk block
// with no branch produces nothing at all, and the not-assessed branch produces
// nothing until a reason is chosen. A contact type may PRE-SELECT the
// not-assessed branch (sessionTypes.js riskDefaultBranch, amended 2026-08-14),
// but it can never pre-select a reason, so the sentence that lands in the record
// is always one the clinician picked.

import { RISK_AREAS, ASSESSED, NOT_ASSESSED } from './riskVocabulary.js'

// Branch membership comes straight from the vocabulary's explicit lists
// (DECISIONS-ADDENDUM.md A1): the not-assessed branch carries its own Actions
// area (nac, risk-065), whose wording is written for a missed contact, so the
// 2026-08-17 interim fix that borrowed the assessed Actions area is retired.
// Exported so the panel renders exactly the areas the engine will serialise;
// it used to duplicate this expression locally, which is how the actions area
// stayed invisible on the not-assessed branch even once the engine carried it.
export const areasFor = branch =>
  branch === 'assessed' ? ASSESSED : branch === 'not_assessed' ? NOT_ASSESSED : []

const findArea = areaId => RISK_AREAS.find(a => a.id === areaId)
const findSub = (areaId, subId) => findArea(areaId)?.subs.find(s => s.id === subId)

const termKey = (areaId, subId, term) => areaId + '|' + subId + '|' + term
const ownKey = (areaId, subId) =>
  areaId == null ? 'root' : subId == null ? areaId : areaId + '|' + subId

const trimmed = value => (typeof value === 'string' ? value.trim() : '')

// Every area and sub gets its empty array up front, so callers can read
// state.sel[areaId][subId] without guarding.
export function emptyRiskState() {
  const sel = {}
  for (const area of RISK_AREAS) {
    sel[area.id] = {}
    for (const sub of area.subs) sel[area.id][sub.id] = []
  }
  return { branch: null, sel, own: {}, over: {} }
}

// Changing branch keeps every selection: a clinician who ticks their way
// through an assessment, then realises the client was never present, should not
// lose the work if they change their mind back.
export function setBranch(state, branch) {
  if (branch !== 'assessed' && branch !== 'not_assessed' && branch !== null) return state
  return { ...state, branch }
}

// The contradiction guard, ported from mseState.js (risk-074). A blanket
// negative claims the whole dimension ("not asked this contact",
// "contributing factors asked about; none reported this contact"), so it can
// never sit in one serialised line beside a positive it negates: picking the
// blanket clears the dimension, picking anything else clears the blanket.
// The prefix rule covers the honest meta family in every multi-pick
// dimension; the exact-text set covers the enumerated whole-dimension
// negatives. Deliberately NOT guarded: domain-specific negatives that
// co-exist with other facts ("no history of violence on record or reported"
// beside an attempt history), and out/cl's episode negative, which the w3e
// boundary rule REQUIRES to sit beside a stated boundary term.
const BLANKET_EXACT = new Set([
  'contributing factors asked about; none reported this contact',
  'no strengths or supports named on enquiry this contact',
  'no preparatory steps reported on direct enquiry',
  'no contact with other services reported since the last contact',
  'no relevant history on record or reported',
  'no safety planning indicated this contact',
  'no means identified that required restriction this contact',
  'no medical review indicated this contact',
  'no external contact indicated this contact',
  'no report indicated this contact',
  'no escalation indicated this contact',
])
const isBlanketNegative = term =>
  /^not (asked|explored|discussed|raised)/.test(term) || BLANKET_EXACT.has(term)

export function toggleTerm(state, areaId, subId, term) {
  const sub = findSub(areaId, subId)
  if (!sub) return state
  const current = state.sel?.[areaId]?.[subId] || []
  const was = current.includes(term)
  let next
  if (sub.single) next = was ? [] : [term]
  else if (was) next = current.filter(t => t !== term)
  else if (isBlanketNegative(term)) next = [term]
  else next = [...current.filter(t => !isBlanketNegative(t)), term]
  return {
    ...state,
    sel: { ...state.sel, [areaId]: { ...(state.sel?.[areaId] || {}), [subId]: next } },
  }
}

export function setOwnWording(state, areaId, subId, term, wording) {
  const key = termKey(areaId, subId, term)
  const value = trimmed(wording)
  const over = { ...state.over }
  if (value && value !== term) over[key] = value
  else delete over[key]
  return { ...state, over }
}

export function setOwnLine(state, areaId, subId, text) {
  const key = ownKey(areaId, subId)
  const value = trimmed(text)
  const own = { ...state.own }
  if (value) own[key] = value
  else delete own[key]
  return { ...state, own }
}

export function effectiveWording(state, areaId, subId, term) {
  return state.over?.[termKey(areaId, subId, term)] || term
}

export function areaHasContent(state, area) {
  return area.subs.some(s => (state.sel?.[area.id]?.[s.id] || []).length > 0 || state.own?.[`${area.id}|${s.id}`])
    || !!state.own?.[area.id]
}

// One line's worth of text: every area on that lane, in vocabulary order, each
// sub's picks joined with commas and the subs joined with semicolons.
export function laneText(state, lane) {
  const bits = []
  // FIX 2026-08-17 (b): was `lane === 'assessed' && state.own?.root`, which
  // captured the clinician's typed line on the not-assessed branch and then
  // never serialised it. The panel offers "Write my own line" on both branches,
  // so the line now lands on whichever lane the chosen branch writes to.
  const rootLane = state.branch === 'not_assessed' ? 'reason' : 'assessed'
  if (lane === rootLane && state.own?.root) bits.push(state.own.root)
  for (const area of areasFor(state.branch)) {
    if (area.lane !== lane) continue
    if (state.own?.[area.id]) bits.push(state.own[area.id])
    for (const sub of area.subs) {
      const picks = state.sel?.[area.id]?.[sub.id] || []
      const own = state.own?.[`${area.id}|${sub.id}`]
      const pieces = []
      if (picks.length) {
        pieces.push(picks.map(t => effectiveWording(state, area.id, sub.id, t)).join(', '))
      }
      if (own) pieces.push(own)
      if (pieces.length) bits.push((sub.lead ? sub.lead + ' ' : '') + pieces.join(', '))
    }
  }
  // Sub-dimensions join with full stops, exactly as mseState.js does post
  // mse-065, so the semicolon stays reserved for the intra-term evidential join
  // (research card risk-072). This became necessary in the same pass as the
  // vocabulary: the adopted replacement for "denied on direct enquiry" is
  // "asked about directly; client reported none", which carries its own
  // semicolon, and semicolon-joined fragments containing semicolons are
  // unreadable. Each part is capitalised so the line reads as sentences.
  return bits
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join('. ')
}

// A sentence: first letter up, one full stop at the end. Empty stays empty.
function sentence(text) {
  const t = trimmed(text)
  if (!t) return ''
  const capped = t.charAt(0).toUpperCase() + t.slice(1)
  return /[.!?]$/.test(capped) ? capped : capped + '.'
}

/**
 * The five fields lib/noteStyles/riskBlock.js takes. Returns a blank-branch
 * block when nothing has been chosen, which isRiskBlockComplete rejects, which
 * is how the safety rule ends up enforced by the code that already guards
 * every commit rather than by this module remembering to.
 */
export function toRiskBlock(state) {
  if (state?.branch === 'assessed') {
    return {
      branch: 'assessed',
      assessedDetails: sentence(laneText(state, 'assessed')),
      outcome: sentence(laneText(state, 'outcome')),
      actions: sentence(laneText(state, 'actions')),
      notAssessedReason: '',
    }
  }
  if (state?.branch === 'not_assessed') {
    return {
      branch: 'not_assessed',
      assessedDetails: '',
      outcome: '',
      // FIX 2026-08-17 (c): was hardcoded ''. A clinician who rang the client
      // twice, left a message, told their supervisor and brought the
      // appointment forward could record none of it, and the block printed
      // "Actions: None" over their name.
      actions: sentence(laneText(state, 'actions')),
      notAssessedReason: sentence(laneText(state, 'reason')),
    }
  }
  return { branch: null, assessedDetails: '', outcome: '', actions: '', notAssessedReason: '' }
}

// How many of the branch's areas carry something, for the panel's header count.
export function areasRecorded(state) {
  return areasFor(state?.branch).filter(a => areaHasContent(state, a)).length
}

export function areaCount(state) {
  return areasFor(state?.branch).length
}
