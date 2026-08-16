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
 * "Complete" means: assessed branch needs at least one of the three fields
 * filled in (details/outcome/actions — a clinician may not always have all
 * three, e.g. "Actions: None" is itself a value the UI prefills as text, so
 * this checks for any non-empty field); not_assessed branch needs a
 * non-empty rationale.
 */
export function isRiskBlockComplete(risk) {
  if (!risk || typeof risk !== 'object') return false
  if (risk.branch === 'assessed') {
    return !!(risk.assessedDetails?.trim() || risk.outcome?.trim() || risk.actions?.trim())
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
    // PORT FIX, 2026-08-17: the fallbacks printed "Not provided" and "None",
    // both of which assert something the clinician never chose. A line the
    // clinician left empty is now omitted rather than filled with an assertion.
    const lines = [`Assessed: ${risk.assessedDetails?.trim() || 'Yes'}`]
    if (risk.outcome?.trim()) lines.push(`Outcome: ${risk.outcome.trim()}`)
    if (risk.actions?.trim()) lines.push(`Actions: ${risk.actions.trim()}`)
    return lines
  }
  // PORT FIX, 2026-08-17: the Actions line was hardcoded to "None" on this branch,
  // which asserted something about the clinician's conduct that they never chose.
  // It now prints what they recorded, and omits the line entirely when they
  // recorded nothing, rather than asserting an absence. See risk/PORT-NOTES.md.
  const notAssessedLines = [
    `Assessed: No`,
    `Outcome: Risk not formally assessed this session. ${risk.notAssessedReason.trim()}`,
  ]
  if (risk.actions?.trim()) notAssessedLines.push(`Actions: ${risk.actions.trim()}`)
  return notAssessedLines
}
