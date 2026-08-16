# Risk tool: port notes

The website Risk tool is a port of the app's Risk builder. This file records every way the
website copy differs from the app copy, so the two can be reconciled and so a drift check
knows what to expect.

Ported 2026-08-17 from `/Users/jean-lucalder/Desktop/Claude/alembic` at the state of that
date, per `HANDOVER-risk-implementation.md`.

## What the tool is

**A thing used to help write case notes.** Jean-Luc's scoping, 2026-08-17. It is not a risk
assessment, not screening, not triage, not a clinical service. It composes the three-line
Risk block from a curated vocabulary and hands the clinician plain text to paste into their
own record. Everything runs in the browser: no accounts, no storage, no network calls, no AI.

## Files

| File | Source | Difference |
|---|---|---|
| `riskVocabulary.js` | `app/src/lib/risk/riskVocabulary.js` | **Byte-identical.** SHA1 `9f055b8c644dd1e11d8972ebcf46674bd313762b`. Signed-off clinical content; never edit here. |
| `riskState.js` | `app/src/lib/risk/riskState.js` | Three documented changes, below. |
| `riskBlock.js` | `app/src/lib/noteStyles/riskBlock.js` | One documented change, below. |
| `riskInsert.js` | NOT PORTED | Deliberate. It writes into the app's note; there is no note here. |

## The differences, and why

### 1. Import extension (website-only, permanent)

`riskState.js` imports `./riskVocabulary.js` with the extension, which browser ES modules
require. The app uses a bundler and omits it. Same difference as the MSE port.

### 2. The free-text line serialises on both branches (BUG FIX, app must mirror)

Was: `if (lane === 'assessed' && state.own?.root)`. The panel offers "Write my own line" on
both branches, so on the not-assessed branch the clinician typed, the recorded dot lit, and
the text was never serialised. Live data loss.

Now the root line lands on whichever lane the chosen branch actually writes to:
`reason` on the not-assessed branch, `assessed` otherwise.

### 3. The actions lane serialises on the not-assessed branch (BUG FIX, app must mirror)

Two changes, because the hardcoded value was a symptom rather than the cause.

**3a, the root cause.** `areasFor('not_assessed')` returned only `NOT_ASSESSED`, so the
actions area was unreachable on that branch and its lane could never carry anything. It now
returns `[...NOT_ASSESSED, ...actionAreas]`, reason first.

**3b, the symptom.** `toRiskBlock` had `actions: ''` hardcoded. A clinician who rang the client twice, left a message, told
their supervisor and brought the appointment forward could record none of it.

### 4. Empty lines are omitted rather than asserted (BUG FIX, app must mirror)

`riskBlock.js` printed `Outcome: Not provided` and `Actions: None` as fallbacks, and
`Actions: None` unconditionally on the not-assessed branch. Software was asserting something
about the clinician's conduct that they never chose. Research lane r26 found the worst case:
in the note recording a client's death, the block read "the client was not present" followed
by "Actions: None" over the clinician's name.

Now a line the clinician left empty is omitted. `Assessed:` always prints, because the
branch itself is a clinician choice.

## What was deliberately NOT changed

- **The full-stop serialiser change** (join lanes with ". " instead of "; "). The app needs
  it before the retired-"denied" wording lands, because the replacement contains an internal
  semicolon. Checked 2026-08-17: **no term in the current vocabulary contains a semicolon**,
  so making the change now would create divergence for no benefit. Apply it in both repos in
  the same pass as the vocabulary update.
- **The vocabulary itself.** No terms added, removed or reworded. The research pass proposes
  a great many changes; none are implemented in either repo yet.
- **The `out/lvl` low, moderate, high dimension** is in the vocabulary and therefore in the
  data, but see the tool's own build notes for how it is treated in the interface pending
  the decision on card `risk-051`.

## Drift check

The vocabulary must stay byte-identical. To verify:

```
shasum app/src/lib/risk/riskVocabulary.js ../alembic-website/risk/riskVocabulary.js
```

Both must print `9f055b8c644dd1e11d8972ebcf46674bd313762b` until the vocabulary is
deliberately updated, at which point both change together in the same pass.
