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

// WEBSITE PORT, 2026-08-17. Three documented differences from the app copy, all
// recorded in risk/PORT-NOTES.md. (1) this import carries a .js extension for
// browser ES modules; (2) the own.root free-text line now serialises on BOTH
// branches, fixing live data loss; (3) the actions lane now serialises on the
// not-assessed branch instead of being hardcoded empty. Differences 2 and 3 are
// bug fixes the app must make too (HANDOVER-risk-implementation.md section 2).
import { RISK_AREAS, ASSESSED, NOT_ASSESSED } from './riskVocabulary.js'

// PORT FIX 3a, the root cause of the "Actions: None" defect. The not-assessed
// branch only ever exposed the reason area, so the actions area was unreachable
// and its lane could not carry anything. A missed contact needs to record what
// the clinician actually did: attempts, supervisor notification, the decision.
// The reason area stays first, so the branch still reads reason-then-actions.
const actionAreas = ASSESSED.filter(a => a.lane === 'actions')
const areasFor = branch =>
  branch === 'assessed' ? ASSESSED
  : branch === 'not_assessed' ? [...NOT_ASSESSED, ...actionAreas]
  : []

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

export function toggleTerm(state, areaId, subId, term) {
  const sub = findSub(areaId, subId)
  if (!sub) return state
  const current = state.sel?.[areaId]?.[subId] || []
  const was = current.includes(term)
  let next
  if (sub.single) next = was ? [] : [term]
  else if (was) next = current.filter(t => t !== term)
  else next = [...current, term]
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
  // PORT FIX 2: was `lane === 'assessed' && state.own?.root`, which captured the
  // clinician's typed line on the not-assessed branch and then never serialised
  // it. The line now lands on whichever lane the chosen branch writes to.
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
  return bits.join('; ')
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
      // PORT FIX 3: was hardcoded ''. A clinician who rang the client twice, left
      // a message, told their supervisor and brought the appointment forward could
      // record none of it, and the block printed "Actions: None" over their name.
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
