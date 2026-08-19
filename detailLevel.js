// The detail level shared by the MSE and Risk builders (change request B3,
// treatment A, chosen 2026-08-17).
//
// One control, three positions, sitting above the cascade. It decides how much
// of the vocabulary the panel OFFERS. It never pre-ticks, pre-fills or
// pre-selects anything: every term in a clinical record is still one the
// clinician chose. Offering less is a convenience; choosing for them would be
// a breach of .claude/rules/safety.md and Guardrail 1, and it is promised to
// customers in the terms of service.
//
// The levels are cumulative: Brief offers level 1, Standard offers 1 and 2,
// Comprehensive offers everything. A dimension carries its level in the
// vocabulary data (`level` on a sub), which is clinical content assigned by
// the tagging pass in docs/research-levels/. An untagged dimension is treated
// as Comprehensive, so a new dimension is never silently promoted into a
// clinician's routine contact by omission.

export const BRIEF = 1
export const STANDARD = 2
export const COMPREHENSIVE = 3

export const DETAIL_LEVELS = [
  { id: BRIEF, label: 'Brief', hint: 'The core of a routine contact.' },
  { id: STANDARD, label: 'Standard', hint: 'The usual working set.' },
  { id: COMPREHENSIVE, label: 'Comprehensive', hint: 'The whole vocabulary.' },
]

export const DEFAULT_LEVEL = STANDARD

export function isLevel(value) {
  return value === BRIEF || value === STANDARD || value === COMPREHENSIVE
}

export function levelLabel(level) {
  return DETAIL_LEVELS.find(l => l.id === level)?.label || 'Standard'
}

// A dimension with no level tag is Comprehensive. Deliberate: the failure mode
// of a missing tag should be "you have to go looking for it", never "it turned
// up in front of a clinician who did not ask for it".
export function levelOf(sub) {
  return isLevel(sub?.level) ? sub.level : COMPREHENSIVE
}

/**
 * Is this dimension offered at this level?
 *
 * `hasContent` is the escape hatch that makes the control safe: a dimension
 * the clinician has already recorded something in stays visible whatever the
 * level says. Without it, dropping from Comprehensive to Brief would hide a
 * recorded observation while it carried on serialising into the note, which is
 * the worst thing a filter can do to a clinical record.
 */
export function subOffered(sub, level, hasContent = false) {
  return hasContent || levelOf(sub) <= level
}

// Storage. One key, shared by both builders: a clinician working briefly is
// working briefly, and two controls that drift apart is a worse experience
// than one that moves together.
const STORAGE_KEY = 'alembic.detailLevel'

export function readDetailLevel(fallback = DEFAULT_LEVEL) {
  try {
    const raw = Number(window.localStorage?.getItem(STORAGE_KEY))
    return isLevel(raw) ? raw : fallback
  } catch {
    return fallback
  }
}

export function writeDetailLevel(level) {
  if (!isLevel(level)) return
  try { window.localStorage?.setItem(STORAGE_KEY, String(level)) } catch { /* noop */ }
}
