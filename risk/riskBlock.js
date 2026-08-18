// Risk mini-form (V2-UX-PLAN.md Phase B, agent B1, item 3).
//
// Every note style gets a Risk section driven by structured state rather
// than free text, so the serialiser (compose.js) can refuse to commit a note
// whose Risk section is empty-by-accident (X3, safety.md). The clinician
// picks exactly one branch:
//   assessed     — details / outcome / actions filled in
//   not_assessed — an explicit rationale (e.g. "client not present")
// Neither branch is ever prefilled; the clinician must click to choose one
// (safety.md: "not formally assessed" only via explicit click).
//
// Pure data + pure functions. No I/O, no React.

export const RISK_REFUSAL_MESSAGE =
  'The Risk section needs either an assessment or an explicit reason it was not assessed before this note can be saved.'

/** A blank risk state: no branch chosen yet. */
export function makeBlankRiskState() {
  return {
    branch: null, // 'assessed' | 'not_assessed' | null
    assessedDetails: '',
    outcome: '',
    actions: '',
    notAssessedReason: '',
  }
}

/**
 * True when the risk state has one branch complete enough to serialise.
 *
 * The assessed branch requires ALL THREE lines to carry clinician-chosen
 * content (risk-070 and risk-073, decided 2026-08-17): the old any-field rule
 * let software print fallback sentences ("Not provided", "None") that no
 * clinician wrote, and blocking removes the mechanism rather than softening
 * the wording. The vocabulary ships an honest one-click answer for every lane
 * (the limits dimension, "considered and not taken", the no-escalation terms),
 * so a truthful entry always exists; the gate never forces a false one.
 *
 * The not_assessed branch needs a non-empty rationale, and only that: the
 * reason remains the sole mandatory element there.
 */
export function isRiskBlockComplete(risk) {
  if (!risk || typeof risk !== 'object') return false
  if (risk.branch === 'assessed') {
    return !!(risk.assessedDetails?.trim() && risk.outcome?.trim() && risk.actions?.trim())
  }
  if (risk.branch === 'not_assessed') {
    return !!risk.notAssessedReason?.trim()
  }
  return false
}

/**
 * Serialise the risk state into the Risk section's bullet lines (no
 * heading, no bullet character — compose.js adds those). Returns null when
 * the block is not complete; callers must check isRiskBlockComplete first
 * and refuse to commit otherwise (X3).
 */
export function serialiseRiskBlock(risk) {
  if (!isRiskBlockComplete(risk)) return null
  if (risk.branch === 'assessed') {
    // No fallbacks. isRiskBlockComplete now requires all three lines, so an
    // unauthored sentence ("Yes", "Not provided", "None") can never print
    // (risk-070 and risk-073, decided 2026-08-17).
    return [
      `Assessed: ${risk.assessedDetails.trim()}`,
      `Outcome: ${risk.outcome.trim()}`,
      `Actions: ${risk.actions.trim()}`,
    ]
  }
  // The not-assessed shape (risk-070 with r27's sentence; the precise reading
  // is DECISIONS-ADDENDUM.md A9). The statement that risk was not formally
  // assessed lives once, on the Assessed line; the Outcome line carries the
  // clinician's chosen reason alone; the Actions line prints what they
  // recorded, falling back to "not recorded", which is a statement about the
  // record that is true by construction, never a claim about their conduct.
  // Research lane r26 found the old form's worst case: in the note recording
  // a client's death, the block read "the client was not present" followed by
  // "Actions: None" over the clinician's name.
  return [
    `Assessed: Risk was not formally assessed this contact.`,
    `Outcome: ${risk.notAssessedReason.trim()}`,
    `Actions: ${risk.actions?.trim() || 'not recorded'}`,
  ]
}
