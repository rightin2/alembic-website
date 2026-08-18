// The risk vocabulary, lifted from the signed-off prototype at
// app/prototypes/risk-builder.html (option B, chosen 2026-08-14), then expanded
// and reworded 2026-08-17 by the research implementation pass
// (docs/research-risk/proposals.json, decided in docs/research-risk/impl/DECISIONS.md
// and DECISIONS-ADDENDUM.md).
// Wording is signed-off clinical content: nothing here is paraphrased or tidied
// outside that process, and this file must stay byte-identical to the website
// copy at alembic-website/risk/riskVocabulary.js.
//
// Two branches, 5 areas, 72 dimensions, 607 terms
// (counts are asserted in risk.test.js; the header never states a number the
// tests do not check).
//
// Shape, deliberately the same as lib/mse/mseVocabulary.js so one engine drives
// both:
//   area: { id, name, lane, lead, subs[] }
//   sub:  { id, name, terms[], lead?, single? }
//   term: [text, explanation]
//
// `lane` routes an area to its output line. It no longer implies branch
// membership: both branches carry an actions-lane area, so ASSESSED and
// NOT_ASSESSED below are explicit lists (DECISIONS-ADDENDUM.md A1).
//   'assessed' -> the Assessed: line
//   'outcome'  -> the Outcome: line
//   'actions'  -> the Actions: line
//   'reason'   -> the Outcome: line, on the not-assessed branch
//
// Every term is something the clinician asked, observed, concluded or did.

export const ASSESSED = [
 // Four drafting constraints bind every term in this file (risk-232).
 // 1. Truth at write time. A term is false until the act has happened. A clinician
 //    writing at 9pm who intends to ring someone in the morning must not be able to
 //    click a term saying they did.
 // 2. Perishable versus durable. Any term asserting a current state carries "this
 //    contact" or an equivalent scope marker.
 // 3. Mark the source. Observed or reported, because the receiving clinician sorts
 //    on exactly that axis.
 // 4. Reason or consequence over task.
 // 
 // Banned wording, term text and explanations alike (risk-008). Never add, in any
 // lane: committed suicide; successful or unsuccessful suicide; failed attempt;
 // suicide bid; parasuicide; suicidality; suicide gesture; manipulative act; suicide
 // threat; contracted for safety; no-suicide contract; no-harm contract; client
 // agreed not to self-harm; denies; denied; claims; endorses; manipulative;
 // attention-seeking; non-compliant; difficult; cutter; self-harmer;
 // self-mutilation; deliberate self-harm; non-suicidal self-injury; NSSI;
 // superficial, minor or serious as severity descriptors for an act; any "failure to
 // protect" wording attributing protective failure to the parent who is not using
 // violence; identifies as; biologically male; biologically female; born male; born
 // female; transgendered; any former name or former gender marker; abuse as in
 // substance abuse; abuser; addict; alcoholic; junkie; druggie; drug user; clean;
 // dirty; substance use disorder applied to a client the psychologist has not
 // diagnosed; disengaged; poor engagement; treatment resistant; did not engage;
 // chronic non-attender; refused; declined to engage; would not accept. Watch list,
 // legitimate technical uses only: "behavioural" as a hedge meaning not-genuine-risk,
 // and "chronic", which these proposals replace with "long-standing".
 // 
 // The vocabulary is never filtered by the client (risk-112). No age field, no
 // working-with-a-young-person toggle, no diagnosis selector, no tab per population,
 // no conditional structure that surfaces different terms depending on anything
 // recorded elsewhere in the file, and no ordering, hint or suggestion derived from
 // anything known or guessed about the client. Every term is offered to every
 // clinician for every client, always. Also excluded: any developmental judgement
 // term; any term asserting capacity status rather than the act of considering
 // capacity against a decision; any term recording that the client's own words were
 // used verbatim in the note. This is the exclusion most likely to be proposed again
 // in good faith as a usability improvement.
 {id:"enq",name:"What was asked",lane:"assessed",lead:"",subs:[
  {id:"pr",name:"What prompted the enquiry",single:1,terms:[
    ["asked because of a change in presentation observed this contact","Records that the enquiry followed something you saw. This is the half of the bridge between the mental state line and the risk line that usually goes missing."],
    ["asked because of something the client said earlier in this contact","Records that the enquiry followed something the client said rather than a routine sweep."],
    ["asked as routine screening; nothing in the contact prompted it","Records a routine screen with nothing behind it, which is a different clinical act from one you were driven to."],
    ["asked because a previous entry recorded something unresolved","Records that the file, rather than this contact, is what put the question."],
    ["asked because another person raised a concern","Records that the question came from outside the room. Where the information came from is recorded in the information-from-others dimension below."]]},
  {id:"tf",name:"The time frame the enquiry covered",terms:[
    ["this contact only","Records the window the questions covered. A later reader cannot reconstruct this from anything else in the note."],
    ["the interval since the last contact","Records that the questions covered the gap between appointments rather than the moment."],
    ["the past two months reviewed","Records a named recent window, which is more use to a later reader than the word recently."],
    ["lifetime history reviewed","Records that the enquiry went back over the whole history rather than the recent period."],
    ["presenting event walked through step by step with the client","Records a chronological enquiry through one event rather than a set of separate questions."]]},
  {id:"ar",name:"Where this contact sits",terms:[
    ["first contact with this client","Records that there is no earlier observation behind this entry."],
    ["ongoing contact within the current course of work","Records the ordinary position, which is worth stating once the other entries exist."],
    ["first contact after a gap longer than the agreed interval","Records that an interval nobody observed sits in front of this entry. You select the gap; nothing in the software works it out."],
    ["first contact after the client returned following a closed episode","Records a re-presentation, which is a different position in the work from an unbroken course."],
    ["the record of the earlier episode was read before this contact","Records the preparation that a re-presentation asks for."],
    ["final contact before a planned ending","Records the position a later reader turns to first when a file is read end to end."],
    ["contact has been less frequent than the agreed plan","Records the gap between the plan and what happened, named by you rather than inferred by a reader."],
    ["the client has declined the agreed frequency of contact","Records whose choice the frequency was, which the previous term on its own leaves open."]]},
  {id:"bl",name:"The baseline this rests on",single:1,terms:[
    ["this contact is the first risk assessment on file and is the baseline","Records that this entry is the referent everything later will be compared with."],
    ["compared with the risk assessment recorded at intake","Names the document the comparison is against, so a stranger can check it."],
    ["compared with the last contact at which risk was assessed","Use rather than the previous assessment wherever contacts have intervened at which risk was not assessed."],
    ["no earlier risk assessment on file; nothing to compare with","Records the absence of a referent, which flags itself to the next reader."],
    ["assessed in full this contact; the detail is in a separate assessment on the file","Records that the short line here is pointing at a longer document, and says which."]]},
  {id:"tl",name:"Structure, depth and tools used",terms:[
    ["brief risk screen completed; nothing raised that indicated a fuller enquiry this contact","Records the depth of what was done. A private practitioner writing this is not claiming to have administered any named screening instrument."],
    ["brief screen raised something; fuller risk enquiry completed this contact","Records both stages, which is the sequence a later reader most often wants to see."],
    ["fuller risk enquiry completed this contact","Records that the enquiry went past a screen."],
    ["enquiry extended to specific behaviours, sequences and timing","Records that the enquiry went past a yes or no answer. Depth, not technique."],
    ["enquiry was structured on a published framework; no instrument was administered","Records structure without an instrument, which is the commonest honest description of a thorough enquiry."],
    ["a structured screening tool was administered; the completed form is filed with the record","Records that a tool was used and where the completed form lives."],
    ["a structured screening tool was administered; the score is recorded in the assessments section","Records that a tool was used and points at where the number lives, so it is not duplicated into a second place where it can drift."],
    ["a self-report measure was completed by the client before this contact","Records that the measure was completed outside the contact rather than in it."],
    ["a measure was offered and the client declined to complete it","Records the offer and the answer."],
    ["no structured tool used this contact; enquiry was by interview","The most common case in private practice, said positively rather than left blank."],
    ["a general distress measure was completed; risk was asked about separately, not read off the score","Records that the risk question was put on its own. A general distress measure is not a risk instrument and a score cannot answer a risk question."]]},
  // Two cultural exclusions are written here because both are gaps a future
  // contributor would fill in good faith (risk-105, r12 P3).
  // 
  // 6.3 Identity is never a risk factor or a protective factor. No term records a
  // client's sexual orientation, gender identity, intersex status, or being trans, as
  // a risk factor or as anything else. The evidence such a term would claim to rest
  // on says the harm comes from stigma and discrimination, not from who the person
  // is. What is recordable is the event the client reported, which lives in the
  // contributing-factors dimension.
  // 
  // 6.10 No term records a doubt about whether an answer meant what it said. The
  // permitted form is that findings are LIMITED by the method, which is a claim about
  // the clinician's evidence. The forbidden form is "answer may reflect
  // acquiescence" or "reliability uncertain", which is the clinician recording
  // disbelief in the client's word, and is what retiring "denied" existed to avoid.
  {id:"hw",name:"How the enquiry was conducted",terms:[
    ["risk enquiry conducted through a NAATI-credentialled interpreter","Records how the questions and the answers travelled. NAATI retired accreditation in 2018, so credentialled is the current word."],
    ["risk enquiry conducted through a Certified Specialist Health Interpreter","Records the specific credential where the interpreter held it."],
    ["risk enquiry conducted through an interpreter whose credential was not established","Records what was known about the credential at the time, rather than a claim that cannot be supported."],
    ["no credentialled interpreter was available for this contact","Records the method that was available rather than the one that was wanted."],
    ["interpreter offered and declined by the client; enquiry conducted in English","Records the offer as well as the outcome."],
    ["a family member or support person interpreted, at the client's request","Records who carried the words. The same wording as the mental state line, so one note does not describe one fact two ways."],
    ["the interpreter was briefed on the risk questions before the contact","Records a preparation step that is invisible unless it is written down."],
    ["risk enquiry conducted by telephone interpreter","Records the channel the interpreting came through."],
    ["risk enquiry conducted by video interpreter","Records the channel the interpreting came through."],
    ["risk enquiry conducted in a language that is not the client's first language","Records a condition on the evidence you have. It records a limit on the method and never a doubt about whether an answer meant what it said."],
    ["risk questions asked in open form and repeated in the client's own words","Records that the questions were put in open form. A negatively framed question inverts in several languages, so the form of the question is a fact about the method."],
    ["client's answer checked back with them before it was recorded","Records that the answer was read back before it was written down."],
    ["enquiry made in literal wording, without figurative phrasing","Records the form the questions took. Some clients answer a figure of speech accurately without answering the question that was meant."],
    ["meaning of the words used was established with the client before the questions went on","Records that the shared meaning was settled first rather than assumed."],
    ["asked what the client meant by the words they used","Records that the meaning was established rather than assumed. Their own words belong in the free text below."],
    ["asked what the client understood dying or being dead to mean","Records the question. With a young child this is the enquiry rather than a preliminary to it."],
    ["the client used words for this that they had not used before","A fact about this contact, and one that disappears in a note that translates every account into the same clinical phrase."],
    ["the client explained the experience within their own cultural or spiritual framework","Records that a different explanatory model was described. It is not a finding about insight."],
    ["additional processing time allowed between questions","Records an adaptation you made to the pace of the enquiry."],
    ["written or visual format used for part of the enquiry","Records the format the questions and answers took."],
    ["enquiry adapted to the client's communication needs","The general form. Every term in this dimension is available for every clinician and for every client."],
    ["client is autistic (client report or established diagnosis); enquiry adapted accordingly","Byte-consistent with the mental state builder. For use where the client identifies as autistic or the diagnosis is established, and available to every clinician for every client."],
    ["observational cues not relied on; the findings rest on what the client said","Records what the finding rests on. For some clients manner is not evidence about their inner state."],
    ["cognitive state at the time of the enquiry noted; findings limited accordingly","Records a limit on the evidence, the same caveat the mental state builder applies to an interpreted session."],
    ["findings compared with this client's own usual pattern rather than a general expectation","Records the referent the findings were read against."],
    ["client seen alone for the risk enquiry","Records who was in the room while the questions were put."],
    ["client seen with a support person present throughout","Records the same fact in the other direction."],
    ["seen alone for part of the contact and with a support person for the remainder","Records the commonest arrangement in work with young people, which neither of the terms above can carry."],
    ["the client asked to speak without a support person present for this part","Records the request as the client made it."],
    ["asked what the client would do if the thoughts returned before the next contact","Records an act of enquiry about the interval ahead. It is a question, not a safety plan; the plan lands on the Actions line."],
    ["asked about specific methods one at a time","Records the format of the enquiry without putting any method in the record."],
    ["returned to the question later in the contact after an earlier answer","Records a second pass, which is real clinical work and cannot be reconstructed by anyone afterwards."],
    ["asked again later in the contact after the client's manner changed","Records what prompted the second pass."]]},
  {id:"cf",name:"Consent and confidentiality inside the enquiry",terms:[
    ["limits of confidentiality reviewed with the client before the enquiry went further","Records the confidentiality conversation that happened inside the risk enquiry, not the one at intake."],
    ["the client asked what would happen to what they said before answering","Records the question the client put. What a person understands about where their words are going shapes what they say."],
    ["capacity to consent to this decision considered with the young person","Records the consideration against this decision. It is never routine, and it states no conclusion about capacity."],
    ["the client's view about what could be shared was sought","Records that the client was asked, which is a separate fact from what was then decided."],
    ["the client asked that particular information not be shared","Records the request as the client made it."],
    ["permission obtained in advance to contact a named service about risk","Records a permission given for this contact rather than a standing consent."],
    ["information given to me in confidence by a third party, with a request it not be shared","Records the basis on which the information arrived. In Victoria this is what makes the confidence enforceable later, and it cannot be added afterwards."],
    ["client informed of the nature and purpose of the disclosure before it was made","Records that the client was told before rather than after."],
    ["disclosure limited to what the receiving service needed to act","Records minimum necessary applied at the moment it is hardest to apply."],
    ["the client was told afterwards what had been shared and with whom","Records the step most often left out. The recipient, purpose, authority and date belong in the Disclosures and Coordination section."]]},
  {id:"src",name:"Information from others, and whose account this is",terms:[
    ["assessment based on the client's account this contact","The ordinary case, stated rather than assumed, so that silence does not have to mean either this or its opposite."],
    ["assessment included observation of the client's presentation this contact","Records that observation was part of how the assessment was made."],
    ["collateral information sought, with consent","Records the consent alongside the act."],
    ["source sought and not available this contact","An attempt that did not land is still a record of what you did, and it is invisible unless it is written down."],
    ["client declined contact with a collateral source","Records the client position that closed the option."],
    ["no information from others available this contact","Records the absence, so that a thin entry is a stated fact rather than a gap."],
    ["concern raised by a family member or support person this contact","Records where the concern came from. Roles only; names belong nowhere in a chart note."],
    ["concern raised by another treating practitioner this contact","Records the source by role."],
    ["concern raised by another person and discussed with the client","Records both the source and the step of taking it back to the client. The mental state panel has the same entry, so the two lines agree."],
    ["information from another service reviewed as part of this contact","Records that material from elsewhere was read as part of this contact."],
    ["previous risk record reviewed before this contact; client not asked to repeat the history","Records the preparation, and that the client was spared repeating an account already on file."],
    ["discharge summary or letter from the service received and reviewed","Dates the moment you knew what the other service found."],
    ["no summary or letter received from the service contacted","Records the silence. There is no channel that automatically sends a hospital summary to a private psychologist, so the absence is expected and worth noticing."],
    ["client reported what happened at the emergency department","Marks the account as the client account, which where you have nothing else is the only source you have."],
    ["client has a treating doctor or team; the standing arrangement is recorded","Records the arrangement that already exists around the client."],
    ["risk content disclosed in a message or email between sessions","Records material that arrived outside the contact, which is what disciplinary matters about records most often turn on."],
    ["risk content raised in a telephone contact between sessions","Records the same fact for a call."],
    ["concern raised by another person through an unmonitored channel","Records how the concern arrived, which matters when the channel is not one you watch."],
    ["material the client showed you during this contact","Records that something was shown rather than described."],
    ["client's online activity raised by the client and discussed","Records that the client raised it. Nothing in Alembic searches for, receives or reads any online material."],
    ["observations from the client's visible environment on video","Records what the video contact made visible."],
    ["another service's risk rating noted; my own enquiry conducted independently","Records that an external rating exists without the note adopting it. Nothing in Alembic reads, parses or displays such a rating."],
    ["automated alert or flag from another system reviewed with the client","Records that you looked at it and discussed it. The conclusion in it is not adopted by this note."],
    ["account consistent with the previous record","Records the comparison against what the file already held."],
    ["account differs from the previous record","Records the comparison in the other direction. The difference is the finding, and it belongs in the free text below."],
    ["account given by a parent or carer; the client was not present","Records whose account this entry rests on, so the rest of the note does not read as though the client said it."],
    ["account given by a support person while the client was present","Records who spoke, with the client in the room."],
    ["client asked directly as well as the person who raised the concern","Records the step that turns a third-party report into an enquiry."],
    ["the client's account and the other account agreed","Records the comparison, which is worth stating once the disagreement term exists."],
    ["the client's account and the other account differed","The disagreement is the finding. Both positions belong in the free text below."]]},
  {id:"cc",name:"Contact conditions",terms:[
    ["risk enquiry conducted by video; observation limited to what the camera showed","Records what the channel let you ask and see. The mental state line records what the mode let you observe; this records what it let you ask."],
    ["risk enquiry conducted by phone; no visual observation available this contact","Records that the questions and answers travelled intact and everything visual did not."],
    ["enquiry limited to the content of written messages; nothing observed this contact","Records that a written exchange is the whole of what this contact was."],
    ["client asked whether they could speak freely; confirmed they could","Records the question and the answer."],
    ["others present in the client's environment; enquiry adjusted accordingly","Records the conditions and the adjustment together."],
    ["enquiry deferred to a contact where the client could speak privately","Records a clinician who noticed the conditions rather than one who took a flat answer at face value."],
    ["connection dropped while risk was being discussed","Records a technical failure, kept separate from a client ending the contact, because the two are not the same event."],
    ["contact moved to another channel during this contact","Records a change of channel partway through."]]},
  // Resemblance analysis, recorded 2026-08-17 before any publication (risk-210).
  // 
  // This six-term ladder resembles the best known published ideation hierarchy,
  // because the project's own textbook names that hierarchy as the clearest available
  // ladder and it plainly informed the design. r28 worked the copyright analysis and
  // concluded the ladder as it stands is defensible against a reproduction objection,
  // and proposed no reword. The analysis is written here so the reasoning is
  // contemporaneous rather than reconstructed under pressure later.
  // 
  // BINDING CONSTRAINT: a "methods considered but no plan" rung must never be added
  // to this dimension. Adding it completes a five-step sequence matching the
  // published ideation subscale in order and cut points, which is the one version of
  // this design that has a real question to answer. The capability lives in the plan
  // detail dimension and in access to means, where it already ships.
  // 
  // PROVENANCE: the free-use position of the instrument in question is REPORTED only.
  // A single page load from an unblocked machine closes it.
  {id:"si",name:"Suicidal ideation",single:1,lead:"suicidal ideation",terms:[
    ["asked about directly; client reported none","You asked directly and the client said no. Records the asking as well as the answer, which is the part that matters if the note is ever reviewed. The same wording as the mental state line, so one note does not use two registers for one question."],
    ["passive ideation reported; no plan or intent described","Records what was described in the conversation. Nobody can know what was not there; what you can record is what was not described."],
    ["active ideation reported; no plan described","Records active thoughts with no plan described."],
    ["active ideation with a plan described; no intent described","A plan was described and intent was not. The two parts carry different weight and the record keeps them apart."],
    ["active ideation with plan and intent","The most serious entry in this dimension. What was done about it lands on the Actions line."],
    ["asked; the client did not answer","A question that got no answer is not the same finding as a question answered no, and it is not the same as a question never put."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no. A reader after the event can work with a recorded gap; an unexplained silence gives them nothing."]]},
  {id:"idt",name:"Ideation detail",terms:[
    ["frequency of the thoughts established with the client","Records that how often was asked and settled. Their own words belong in the free text below."],
    ["how much of the day the thoughts occupy established","Records the second half of the same question, which a bare presence entry cannot carry."],
    ["client described being able to put the thoughts aside","Records the account of control as the client gave it."],
    ["client described the thoughts as hard to put aside","Records the same account in the other direction."],
    ["last occasion of suicidal thinking dated with the client","Turns a flat entry into a record with a timeline, and it is the question a later reader most often wishes had been put."]]},
  {id:"in",name:"Intent",single:1,lead:"intent",terms:[
    ["intent asked about directly; client reported none","Intent is a separate question from ideation and from plan. The same wording as the mental state line."],
    ["client stated no intent to act on the thoughts","Records the client's own position rather than the clinician's question."],
    ["client described some intent to act, without a timeframe","Records intent without a timeframe, which is a different account from one with a timeframe in it."],
    ["client described intent to act within a stated timeframe","Records that a timeframe was described. The timeframe itself belongs in the free text below."],
    ["intent not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"dis",name:"Disclosure",terms:[
    ["client answered some parts of the enquiry and declined others","A partial refusal is commoner than a total one and is invisible in a record that has only yes, no and not asked."],
    ["client disclosed thoughts this contact that they had not previously reported","Often the most significant thing that happened in the contact, and it has nowhere else to land."],
    ["client reported not having told anyone about this before","Records what the client said about who else knows."],
    ["hesitancy noticed during the enquiry and returned to","Records what you noticed and what you did about it in the same entry."],
    ["the client declined to discuss this further","Records a refusal inside an enquiry that otherwise went ahead, which the not-assessed branch cannot reach."],
    ["raised by a family member or support person, not by the client","Records where the disclosure came from, which changes what the entry means."],
    ["raised late in the session, with limited time to explore","Honest, and it explains to the next reader why the entry is thin."]]},
  {id:"pl",name:"Plan detail",single:1,terms:[
    ["no plan described on direct enquiry","Records what was described rather than what was concluded."],
    ["methods considered, no plan formed","Records the account at the point before a plan. This rung lives here and never in the ideation dimension above."],
    ["a method described, no place or timing","Records which elements of a plan were described. No term in this dimension names a method."],
    ["method and place described","Records two elements described."],
    ["method, place and timing described","Records all three elements described."]]},
  {id:"prep",name:"Preparation and rehearsal",terms:[
    ["no preparatory steps reported on direct enquiry","Records the asking and the answer for a category that is neither thought nor act."],
    ["means gathered or stored, as reported by the client","Records a preparatory act as the client described it. No term here names any means."],
    ["a note, letter or message written","Records a preparatory act as the client reported it."],
    ["saying goodbye, giving things away, or putting affairs in order","Records preparatory acts described by the client."],
    ["the act imagined or rehearsed in the mind","Records mental rehearsal, which is neither a plan nor an act."],
    ["stopped themselves before acting","An aborted attempt. Without this term the record has only thoughts and attempts and loses the category entirely."],
    ["stopped by someone else or by circumstance before acting","An interrupted attempt, which is a different event from an aborted one."]]},
  {id:"me",name:"Access to means",lead:"access to means",terms:[
    ["discussed, no access identified","You asked about access and none was identified."],
    ["discussed, access identified","Access exists. What was done about it lands on the Actions line."],
    ["access described as immediate","Records how far away the access is, as the client described it."],
    ["access described as requiring steps to obtain","Records the other half of the same fact, as the client described it."],
    ["occupational or household access discussed","Records that access through work or the home was covered, which a general means question misses."],
    ["access asked about for more than one method","Records the breadth of the enquiry without recording any method."],
    ["discussed, access reduced during this contact","Means restriction actioned within the contact by the client."],
    ["discussed, access reduced by a parent, carer or support person","Records whose act it was, which in work with young people is usually not the client's."],
    ["access identified and not reduced this contact","The commonest real outcome, recorded plainly rather than left for a reader to fill in."],
    ["the client declined to reduce access to means","Records the client's position as their own."],
    ["client declined to discuss access","Records a refusal to discuss, which is a different fact from a question that got no answer."],
    ["asked; the client did not answer","A question that got no answer is not the same finding as a question answered no."],
    ["not asked about this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"sh",name:"Self-harm",single:1,lead:"self-harm",terms:[
    ["asked about directly; client reported none","You asked directly and the client said no. Records the asking as well as the answer, which is the part that matters if the note is ever reviewed. The same wording as the mental state line, so one note does not use two registers for one question."],
    ["urges reported, no acts since last contact","Urges without acts. Their own words are worth adding underneath."],
    ["acts reported since the last contact","Records that acts occurred. Detail of method belongs in the record only where it is needed for care."],
    ["acts reported, first episode the client has described","A first disclosed episode is a different clinical event from a continuing pattern, and the record should be able to tell them apart later."],
    ["acts reported, continuing a pattern already known to the record","Records continuation rather than onset."],
    ["past self-harm reported, none in the period discussed","Records what a contact can establish, which is that a period was named and nothing fell inside it."],
    ["asked; the client did not answer","A question that got no answer is not the same finding as a question answered no."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"int",name:"Intent for the acts described",single:1,terms:[
    ["intent asked about separately; client described no intent to die","The only place a record can say an act was not an attempt to die is the client's own account of what they meant."],
    ["client described the acts as coping, not as trying to end their life","Records the client's account of what they meant."],
    ["client described mixed or uncertain intent","Records the account as it was given, without resolving it."],
    ["client described intent to die at the time of the act","Records the client's account of intent at the time."],
    ["client was not able to say what the intent was","Records that the question was put and the account could not be given, which is not the same as not asking."],
    ["intent for the acts not asked about this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"pat",name:"The pattern this period",lead:"pattern",terms:[
    ["frequency increased since the last contact, as reported","Records change over time as the client reported it. No term here counts anything."],
    ["frequency decreased since the last contact, as reported","Records change in the other direction, as reported."],
    ["a method not previously described was reported this contact","Records the change without naming the method."],
    ["no acts reported for the longest period the client has described","Records what the client said about the longest interval."],
    ["acts reported as occurring while intoxicated","Records the circumstance as the client reported it. Nothing here records intoxication as a conclusion and nothing grades it."]]},
  // No term in this dimension may attribute a function to the client (risk-020).
  // Every term begins from the client's own account of what they said it does for
  // them, and that framing is what keeps the dimension on the documentation side of
  // guardrail 1. It must not be relaxed.
  {id:"fun",name:"What the client said it does for them",lead:"the client described",terms:[
    ["relief from a feeling that had become unbearable","Recorded as the client described it."],
    ["feeling something at a time when they felt numb or unreal","Recorded as the client described it."],
    ["punishing themselves","Recorded as the client described it, in their frame and not as a formulation."],
    ["making distress visible when they could not say it","Recorded as the client described it. This is the entry that replaces what older notes called attention-seeking."],
    ["using it to hold off thoughts of ending their life","Recorded as the client described it."],
    ["discussed, and the client could not put it into words","Records the conversation and its outcome, which is a real answer rather than a blank."],
    ["not explored this contact","Records that this was not explored, which is a different fact from an answer of no."]]},
  {id:"hx",name:"History reviewed",terms:[
    ["previous attempt history reviewed","You went back over previous attempts with the client this contact."],
    ["previous self-harm history reviewed","Reviewed rather than assumed from the file."],
    ["attempt history asked item by item, not left to what the client volunteered","Records the format of the enquiry, which is what determines how much of a history it finds."],
    ["number of previous attempts established","Records that the count was established with the client. The number itself belongs in the free text below."],
    ["most serious previous attempt reviewed","What was most serious is not always what was most recent, and the record should be able to say both."],
    ["most recent previous attempt dated","A date carries more than some years ago."],
    ["previous attempt reported within the last twelve months","Records recency, which is the part that changes what the rest of the note has to do."],
    ["aborted or interrupted attempt reported","Records the history version of the category. The preparation dimension carries this period."],
    ["medical care required at the time established","Records what was established about care at the time."],
    ["suicide of a family member, friend or peer reported","Records the history as the client reported it."],
    ["previous violence or threats reviewed","Records that previous incidents involving others were reviewed."],
    ["previous threats towards the same person reviewed","A repeat target is a different picture from a new one, and only the record can carry the difference."],
    ["no relevant history on record or reported","Nothing in the record and nothing reported."],
    ["no history of violence on record or reported","The matching negative, so a caseload that includes risk to others can record the absence."],
    ["history reviewed from file, not raised with the client","Distinguishes reading the record from asking the person."],
    ["file and previous notes reviewed before this contact","Records the preparation, which is the thing a later reader most often notes was not done."],
    ["records requested from another service; not yet received","Turns a gap in what you knew into a record of what you did about it."],
    ["history could not be reviewed this contact","Records the gap rather than leaving it to be inferred."]]},
  {id:"ho",name:"Harm to others",single:1,lead:"thoughts of harm to others",terms:[
    ["asked about directly; client reported none","You asked directly and the client said no. Records the asking as well as the answer, which is the part that matters if the note is ever reviewed. The same wording as the mental state line, so one note does not use two registers for one question."],
    ["thoughts reported, no target or plan","Reported thoughts without a named person or a plan."],
    ["thoughts reported about an identifiable person","Records that a person was described rather than named. Anything you did about it belongs on the Actions line, and the recipient, purpose, authority and date of any disclosure belong in the Disclosures and Coordination section."],
    ["asked; the client did not answer","A question that got no answer is not the same finding as a question answered no."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"tg",name:"Target and awareness",lead:"the person at risk",terms:[
    ["a household or family member was described","Records the relationship by role and never by name. It also tells a later reader the family violence material may be in play."],
    ["a group or class of people was described, no individual identified","Records that no individual was described."],
    ["the clinician or the service was the subject","Records the subject where it is you or the service."],
    ["the person at risk is already aware","Changes what a protective step would add, and it is one of the facts a reviewer looks for."],
    ["the person at risk is not aware","The matching entry, recorded as a fact about what the client said."],
    ["not explored this contact","Records that this was not explored, which is a different fact from an answer of no."]]},
  {id:"wm",name:"Weapons and access",terms:[
    ["access to a weapon discussed, none identified","Kept separate from the self-harm means dimension so neither line is ambiguous."],
    ["access to a weapon discussed, access identified","Records the finding. What was done about it lands on the Actions line."],
    ["firearm ownership or access discussed","Named specifically because a general means question misses it."],
    ["recent acquisition or preparation reported","Records what the client reported."],
    ["not discussed this contact","Records that this was not discussed, which is a different fact from an answer of no."]]},
  {id:"cm",name:"Experiences and beliefs bearing on risk",terms:[
    ["asked about directly; client reported none","Asked and none reported. The mental state panel sends you here when a command experience is recorded there, so this is where the enquiry gets its line."],
    ["client reported commands to harm themselves","Records the experience as the client reported it."],
    ["client reported commands to harm another person","Records the experience as reported. Any identified person stays a role, never a name."],
    ["client reported being able to resist the commands","What moves clinically is usually the client's stance rather than the presence of the experience, and this is the half most often left out."],
    ["client reported being unable to resist the commands","The matching entry, recorded as the client's report."],
    ["client described their own stance toward the experience","Records that the stance was discussed. Their words belong in the free text below."],
    ["client reported having acted on such an experience before","History, not prediction. When it happened belongs in the free text below, because an act thirty years ago and an act last month read very differently."],
    ["client reported distress or anger arising from a belief they described","The distress is what is recorded here. Belief content belongs in the mental state section."],
    ["client described not eating or not taking prescribed medication because of a belief","Records the consequence the client described, which is the common version and carries real weight."],
    ["no such experience during this contact; client reported one since the last contact","Keeps the contact honest and still puts the report on the record. The same shape the mental state builder uses for perception."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"sub",name:"Substance use at this contact",lead:"substance use at this contact",terms:[
    ["asked about; client reported no use before this contact","Records what was asked and what was reported about this contact, which is a different question from the pattern of use recorded under contributing factors."],
    ["client reported using a substance before this contact","Records the client's report and nothing more."],
    ["smell of alcohol or other signs noticed; raised with the client","Records what was noticed and that it was raised. The same wording as the mental state line. Intoxication is never recorded here as a conclusion and never graded."],
    ["client reported reducing or stopping a substance since the last contact","Records a change as the client reported it."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"ph",name:"Physical health",terms:[
    ["asked about physical health; nothing of concern reported","Records the asking and the answer. Nothing in this dimension assesses physical stability."],
    ["client reported a physical symptom, in their own words","Records the report. Their words belong in the free text below."],
    ["eating and related behaviours asked about; client's account recorded in their words","Records the enquiry and points at where the account lives."],
    ["no injury requiring attention was reported","Records the asking and the answer for injury specifically."],
    ["injury reported; the client had already sought medical care","Records what the client reported about care already sought."],
    ["injury reported; medical care had not been sought","Records the same fact in the other direction. Advice given about it lands on the Actions line."],
    ["client reported signs of infection or poor healing","Records the report. The clinician is not assessing the wound."],
    ["client reported loss of sensation or movement near an injury","Records the report, which is the account that most often needs a medical answer."],
    ["a named treating doctor holds responsibility for medical monitoring","Records where medical responsibility sits."],
    ["client confirmed medical review is current","Records what the client confirmed."],
    ["no medical review in place at this contact","Records the absence of a medical review rather than leaving it to be inferred."],
    ["physical health not discussed this contact","Records that this was not discussed, which is a different fact from an answer of no."]]},
  {id:"fv",name:"Family violence",single:1,lead:"family violence",terms:[
    ["asked about directly; client reported none","Records the asking and the answer. The same wording as the other enquiry lines."],
    ["client reported current family violence","Records the client's report. The dimension works in both directions because a client may be the person subjected to violence or the person using it."],
    ["client reported family violence, historical, none current","Records the period the client described."],
    ["client reported a pattern of controlling or coercive behaviour by a family member","A pattern is a different account from an incident and needs its own wording."],
    ["client reported using violence or controlling behaviour towards a family member","Records the client's own report about their own behaviour."],
    ["asked following indicators raised in this contact","Records the trigger as well as the question, so a later reader can see what put it."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"vu",name:"Vulnerability to harm from others",single:1,lead:"vulnerability to harm from others",terms:[
    ["asked about directly; client reported no current concern","Records the asking and the answer."],
    ["client reported harm or exploitation by another person","Records the report and leaves the characterisation alone."],
    ["client reported financial control or exploitation by another person","Named separately because financial abuse is the easiest form to leave unnamed."],
    ["client reported pressure or coercion from a carer or support person","Records the report. A carer relationship can meet the legal definition of a family relationship; the term records what was said."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"dep",name:"Children and dependants in the client's care",single:1,lead:"children or dependants in the client's care",terms:[
    ["asked about directly; client reported no concern for anyone in their care","Records that you turned your mind to the wellbeing of others in the client's care."],
    ["concern raised about a child in the client's care","Records the concern. What was done about it lands on the Actions line."],
    ["concern raised about an adult dependant in the client's care","Records the concern for an adult in their care."],
    ["children present in the household during this contact","A plain fact about the contact, not a finding about anyone."],
    ["client reported children were exposed to violence in the home","Records the report. A child who hears or sees family violence is a person subjected to it, not a bystander."],
    ["no dependants identified","Records that the question was put and there was nobody in the frame."],
    ["not asked this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"ct",name:"Contributing factors reported",terms:[
    ["recent loss or separation reported","As reported by the client, not inferred."],
    ["sleep disturbance reported","Their report, in the risk context."],
    ["increased substance use reported","As reported. Avoid characterising it further here."],
    ["financial or housing stress reported","As reported."],
    ["reduced contact with usual supports reported","As reported."],
    ["recent change to medication reported","As reported. Coordination with the prescriber, if any, lands on the Actions line."],
    ["a change since a recent medication change reported by the client","As reported, and with no claim about what caused what."],
    ["reduced sleep with increased drive reported","As reported. It points the opposite way from the sleep disturbance term above."],
    ["agitation or restlessness reported alongside low mood","As reported."],
    ["pain reported","As reported."],
    ["a new or worsening physical health condition reported","As reported."],
    ["recent or planned separation reported","As reported. Named separately from the general loss term because the two are different facts."],
    ["pregnancy or recent birth reported","As reported."],
    ["client reported the other person has access to weapons","As reported, and about the other person rather than about the client."],
    ["client reported being strangled, choked or suffocated","Serious enough clinically and medically to have its own words rather than being folded into a general account of assault."],
    ["client reported fear for their own safety","Recorded in their voice. Nothing here weighs it."],
    ["a grievance against a person or organisation described","Recorded in the client's own terms, as something they described."],
    ["experience of racism or discrimination reported","As reported. The record carries the event, never an identity."],
    ["experience of transphobia, homophobia or biphobia reported","As reported. The record carries the event, never an identity."],
    ["family rejection or conflict connected to identity reported","As reported."],
    ["delay or difficulty accessing gender-affirming care reported as a current stressor","As reported, and as a stressor the client named. Nothing here says anything about that care and risk in either direction."],
    ["separation from family overseas reported","As reported."],
    ["visa, residency or immigration matter reported as a current stressor","As reported, and as a stressor the client named rather than as a status."],
    ["distress connected to events in the client's country of origin reported","As reported."],
    ["experiences of torture or war-related trauma raised by the client this contact","Records that it was raised and nothing about what was said."],
    ["religious or spiritual struggle described by the client","As described by the client."],
    ["a harmful experience connected to a faith or community group reported","As reported."],
    ["shame named by the client as limiting what could be discussed","A fact about the conversation rather than about the person, and it tells a later reader why the enquiry stopped where it did."],
    ["a barrier to getting help named by the client","As named by the client."],
    ["bullying or peer victimisation reported","As reported."],
    ["difficulty at school, or absence from school, reported","Deliberately broad, because suspension, refusal and quiet non-attendance all arrive in the room the same way."],
    ["a relationship ending reported","As reported, and not the same fact as the general loss term above."],
    ["death of a peer, classmate or friend reported","As reported."],
    ["loss of independence or of a valued function reported","As reported."],
    ["a move into residential or supported accommodation reported","As reported."],
    ["change to routine, environment or supports reported","As reported. For some clients this is the largest event of the year and it appears nowhere else on the list."],
    ["caring for another person described as a strain, in the client's words","Their description, not an assessment of their caring."],
    ["client described decisions with a financial, work or relationship cost they now regret","As described by the client."],
    ["contributing factors asked about; none reported this contact","Records the asking as well as the answer, because this dimension has no lead of its own."]]},
  {id:"sm",name:"Self-monitoring reported",terms:[
    ["client's own mood or sleep tracking reviewed, as they described it","Records what the client said their own tracking showed. Nothing in Alembic receives, reads or analyses device or app data."],
    ["between-session self-monitoring discussed; client reported no change","Records the discussion and the report together."],
    ["client declined to share between-session monitoring","Records the position as the client took it."]]},
  {id:"rs",name:"Recent contact with other services",terms:[
    ["client discharged from an inpatient unit within the past three months, as reported","Recorded as the client's report. Nothing in the software looks anything up or counts any days."],
    ["client attended an emergency department for a mental health presentation since the last contact","As reported."],
    ["client left a service before assessment or treatment was completed, as reported","As reported."],
    ["client is currently under the care of another mental health service","As reported."],
    ["no contact with other services reported since the last contact","The matching negative, recorded as a report."]]},
  {id:"lg",name:"Legal and decision-making context",terms:[
    ["capacity for this decision was considered this contact","Records the consideration, per contact, because capacity is decision-specific and can change. No term here states a conclusion about capacity."],
    ["the client described the risks and the alternatives back to me in their own words","An observation about what happened in the room rather than a conclusion about the person."],
    ["asked whether the client has a written statement of their treatment preferences","Records the question."],
    ["client's advance statement of preferences noted, with its date","Records that the statement was read and when it was made."],
    ["checked whether anyone holds a formal decision making role for the client","Records the role and never the name."],
    ["checked the client's current status with any service already involved, with consent","Records the check and the consent together."]]},
  // Lead-in teaching copy (risk-041, r9 A2), verbatim:
  // 
  // Record these because they are true and because they matter to the person, not
  // because they lower risk. The largest study of completed risk evaluations found no
  // association between documented protective factors and subsequent suicide
  // (Saulnier et al, 2025). Say who named each one, and add their words underneath
  // where the words carry the weight.
  {id:"pf",name:"Strengths and supports the client named",terms:[
    ["future-oriented plans described by the client","Records who named it. A strength inferred from the file is an assumption wearing clinical clothing."],
    ["responsibility for dependants or pets named by the client","Named by the client. The same fact can be a strength here and a safeguarding question in the dependants dimension."],
    ["engaged with supports and says they would use them","Records both halves as the client stated them."],
    ["help-seeking demonstrated this contact","They came, or they called. That is itself something the record can carry."],
    ["safety plan in place and the client can say what is in it","Records what the client could say about the plan rather than that a plan exists somewhere."],
    ["reasons for living described by the client","Recorded because they are true and because they matter to the person."],
    ["connection to family, community or culture described by the client","As described by the client."],
    ["religious, spiritual or moral objection to suicide described by the client","As described by the client. No term here treats faith as protective."],
    ["connection to a faith or spiritual community described by the client","As described by the client."],
    ["connection to an affirming community or peer group described by the client","As described by the client."],
    ["an affirming family member or support person named by the client","Named by the client, by role rather than by name."],
    ["a trusted adult the client would go to was named","Named by the client, by role rather than by name."],
    ["connection to a sibling, friend, team or group described","As described by the client."],
    ["nominated support person named by the client","Named by the client."],
    ["role as a carer for another person described","As described by the client. The same fact can be a strain, which the contributing factors dimension carries."],
    ["something the client is looking forward to described in their own words","As described by the client."],
    ["client described what usually helps them not to act on an urge","As described by the client. What they said belongs in the free text below."],
    ["ambivalence about acting expressed by the client","Recorded as the client expressed it, without resolving it."],
    ["supports available but described by the client as unhelpful or unsafe","The honest inversion, recorded as the client described it."],
    ["a previously named reason for living was not endorsed this contact","Records a change against something the file already held."],
    ["the client described dependants or family as better off without them","Records what the client said, which points the opposite way from the responsibility term above."],
    ["no strengths or supports named on enquiry this contact","A statement about a conversation, not a statement about the person's life."],
    ["not asked about this contact","Records that this was not asked, which is a different fact from an answer of no."]]},
  {id:"cr",name:"What helps in a crisis, as the client describes it",terms:[
    ["client described what helps when distress escalates","The content belongs in the free text below. This is the material a later reader most wants and the file most often lacks."],
    ["client described what does not help when distress escalates","Just as useful and more often omitted, recorded as their account and never as a judgement about the response they named."],
    ["client named who they would contact first in a crisis","By role rather than by name."],
    ["no support person identified as available before the next contact","Records reachability, which is not the same fact as having supports."],
    ["supports identified but not contactable within the timeframe discussed","Records the timeframe that makes reachability mean something."],
    ["not discussed this contact","Records that this was not discussed, which is a different fact from an answer of no."]]},
  {id:"lim",name:"Limits on this assessment",terms:[
    ["the enquiry was not completed; the client ended the contact","A partial assessment for a real reason is not an omission, but only if the record says so."],
    ["findings limited; the client had used a substance before this contact","Records a limit on the evidence, which is a claim about what you have and never a doubt about the client."],
    ["findings limited; the client was too distressed or agitated to continue","Records why the enquiry stopped where it did."],
    ["presentation this contact may not reflect the recent course; recent course asked about","Records both the limit and the step taken about it."],
    ["connection quality affected the exchange; findings limited accordingly","Records a limit produced by the channel."],
    ["risk enquiry begun and not completed this contact","Records service activity commenced but not completed, which is a state distinct from a client declining and from a history not reviewed."],
    ["some risk questions were not reached this contact; listed in the Plan","Records the gap and points at where the outstanding questions live."],
    ["enquiry limited by the time available in this contact","Honest and very common."],
    ["enquiry to continue at the next contact, agreed with the client","A deliberate shared decision. The agreement is the part worth recording, and it is not the same fact as running out of time."]]},
  {id:"ax",name:"Other areas asked about",terms:[
    ["asked whether the client has been taking medication and eating as usual","Records an ordinary question that often finds something."],
    ["asked about living arrangements and contact with others between sessions","Records an ordinary question that often finds something."],
    ["bereavement asked about as its own subject","Records a question that is not the same as the general loss question and is usually not volunteered."],
    ["asked whether the client feels they are a burden to the people around them","Records the question."],
    ["the client raised voluntary assisted dying","Records that the client raised a lawful process. It is not suicidal ideation and is never recorded as such. In Victoria, as at August 2026, the Voluntary Assisted Dying Act 2017 prohibits a registered health practitioner from initiating this discussion; the amendment allowing psychologists to raise it commences 19 April 2027, which is why this term is worded around the client raising it."],
    ["asked about an area not listed here; recorded in my own words below","The headings above are a prompt and not a boundary. This term says so in the record."]]}]},
 {id:"out",name:"Outcome",lane:"outcome",lead:"",subs:[
  {id:"o",name:"Outcome this contact",single:1,terms:[
    ["no risk indicators identified on the enquiry made this contact","The plainest outcome, and the most common. The wording ties the finding to what was actually asked this contact, so it cannot later be read as a claim that nothing was there."],
    ["risk indicators present, managed within this contact","Something was there and you dealt with it in the room."],
    ["risk unchanged from the last contact at which it was assessed","Explicitly comparing with the last entry that actually assessed risk, which is more useful than a bare rating and, unlike \"the previous assessment\", tells the reader which entry that was."],
    ["assessed as increased since the previous contact","Your judgement, stated as a change rather than a score, and marked as yours."],
    ["assessed as decreased since the previous contact","Your judgement, marked as yours. A coroner reads an unattributed \"risk decreased\" as a prediction; \"assessed as decreased\" is a record of what you concluded on the day."],
    ["acute concern identified and escalated the same day","Your conclusion that something acute was present and was escalated on the day. What was done, and who was contacted, lands on the Actions line."],
    ["self-harm reported; intent asked about separately and none described","The two findings sit side by side and neither is inferred from the other. Records both lines above rather than collapsing them into one."],
    ["self-harm and suicidal ideation both present, recorded separately","Both, and neither collapsed into the other. Common, and the record should not have to choose."],
    ["self-harm reported; the account of intent was uncertain","Carries the ambivalence forward instead of resolving it on the page. Honest, and it tells the next clinician what to ask."],
    ["concern this contact relates to harm to others rather than to the client","Says which risk moved. Without it the Outcome line cannot distinguish an unchanged suicide picture from a new concern about someone else."],
    ["concern is that the current pattern continues rather than escalates","A statement about the shape of the concern rather than its level. Closer to how you actually think about it than any rating is."],
    ["partial assessment only; enquiry stopped for safety","You narrowed the questioning and stopped because continuing was not safe. A considered decision, and it should not read as an omission."],
    ["the client and I did not agree about the level of concern; both positions recorded","The Victorian Chief Psychiatrist's white paper asks specifically that disagreements about risk be documented. Recording both views protects the client's account as well as yours."],
    ["the picture was unclear this contact; the plan reflects that uncertainty","Uncertainty stated as uncertainty. Much of what is unknown about an individual's risk is irreducible, and a note that says so is more honest than one that resolves it artificially."],
    ["agreed risk this contact in the interest of the client's autonomy and recovery","Dignity of risk, as framed by the Mental Health and Wellbeing Act 2022 (Vic). Records that you and the client deliberately accepted some risk this contact; what supports that decision lands on the Actions line."],
    ["presentation changed materially during this contact","Suicidal states can shift within hours. If it shifted in the room, that is a finding, and it belongs in the record rather than in your memory."]]},
  {id:"bl",name:"Compared with this client's usual",single:1,terms:[
    ["at this client's usual baseline","Says where they are relative to themselves rather than to a population. For a long-term client this is the most informative sentence in the block, and it shows the next reader that you know their pattern."],
    ["above this client's usual baseline","An acute change on a known background. The response to it lands on the Actions line, so the record carries the change and the response together."],
    ["below this client's usual baseline","Improvement stated as movement rather than as a score. Worth recording because it is evidence of the work."],
    ["first risk conversation; no baseline for comparison yet","Honest at intake. It also tells a later reader why no comparison was made."]]},
  {id:"lt",name:"Long-term picture",single:1,terms:[
    ["long-standing ideation, at its usual level for this client","Long-standing risk stated as long-standing. Neither \"no indicators\" nor \"high\" is true for a client whose baseline includes some ideation, and this term is the sentence that is."],
    ["long-standing ideation, acutely worse this contact","Acute on a long-standing background, the case a single rating cannot express. Recording both halves is what shows you distinguished them."],
    ["history of attempt; long-term risk stays elevated whatever today's picture","The honest long-term statement for anyone with an attempt behind them. The RANZCP guideline says plainly that such clients should not be considered at low or no foreseeable risk."],
    ["long-standing pattern; a change in method or lethality was described","An unchanged pattern can still carry a changed method, and the change is the point. Records that a change was described, without naming what it was."]]},
  {id:"fc",name:"What could change before next contact",single:1,terms:[
    ["no changes foreseen before the next contact","You considered what is coming and nothing stood out. Recording the consideration is the point."],
    ["an upcoming event was identified that could raise risk","Anniversaries, court dates, results, discharge. The event itself is named in the Plan."],
    ["a support the client relies on is ending before the next contact","A departure, a discharge, a service ending. Foreseeable, and often actionable."]]},
  {id:"ba",name:"What the conclusion rests on",terms:[
    ["conclusion rests on what the client reported this contact","The Outcome line says what you concluded. This says what you had in front of you when you concluded it, which is what lets a later reader reconstruct the assessment rather than only its result."],
    ["conclusion rests on the client's report and what was observed in the room","Two sources, kept apart. The receiving clinician sorts on the reported-versus-observed axis, so the record marks which is which."],
    ["conclusion rests on the client's report and information from another person","Records that the conclusion was not formed on the client's account alone. Who the person was, and on what footing, belongs in the enquiry lane and in Disclosures and Coordination."],
    ["conclusion rests on a comparison with how the client presented at the last contact","Says the conclusion is a comparison rather than a fresh guess."],
    ["conclusion differs from the client's own account of their safety","The term for when you are not persuaded by a reassuring account. It records the disagreement as a fact without characterising the client."],
    ["reached on the client's account this contact; no other source available","States the ground the conclusion stands on. It is not a caveat and not an apology; it is the information a later reader needs in order to weigh what you concluded."],
    ["reasoning for continuing the usual care arrangement recorded below","The decision a reviewer asks about first when a client with current ideation stays in outpatient care. The reasoning itself goes in your own line underneath."],
    ["outcome limited by the information available this contact","An honest limit, and a better entry than a conclusion that claims more than the contact supported."],
    ["the previous contact's risk entry was re-read before this conclusion was reached","Three terms above compare this contact with the last one, and they only mean something if the comparison was against the record rather than against memory. This says the comparison was real."],
    ["the client said there were things they did not want written down","Their words, recorded as theirs, and a real limit on what the conclusion rests on. Recording the limit is more honest than a conclusion that reads as though nothing was held back."],
    ["assessment recorded as a description of the current picture rather than as a rating","Where you have deliberately not assigned a level, this records the choice. An empty field reads as an omission; this reads as a method. It is a statement about your own approach, not a claim about the client."],
    ["the conclusion above rests on the interview, not on an instrument score","A score never substitutes for the judgement. Says plainly what the conclusion was built on."],
    ["an instrument score was available this contact and did not change the conclusion reached","Records that the score was in front of you and weighed. An option considered and not acted on is a clinical act, and this is that shape applied to a number."]]},
  {id:"bear",name:"Bearing of strengths on this outcome",single:1,terms:[
    ["strengths recorded above were part of the reason for this outcome","This is the sentence a reviewer looks for when a client with ideation stays in ordinary outpatient care. It says the strengths named in the enquiry lane bore on the conclusion, rather than leaving a reader to infer the link."],
    ["strengths recorded above were considered and do not change this outcome","The honest-limits line. Protective factors do not cancel out concerns, and a note that implies they did is the one that reads badly later."],
    ["no strengths were relied on in reaching this outcome","Plainest of the three. The conclusion rests on what was asked and what was found, and nothing else."]]},
  {id:"ob",name:"Reporting and sharing obligations",single:1,terms:[
    ["no reporting or information sharing obligation engaged by this contact","The ordinary case. Records that you turned your mind to it, which is the part a later reader cannot otherwise tell from a silent line."],
    ["reporting threshold considered; assessed as not met on the information available","Your conclusion, stated affirmatively. The ground goes in your own line underneath; a conclusion with no visible reason is the entry most likely to be questioned later."],
    ["reporting threshold considered; assessed as met","Your conclusion that it was met, marked as yours. The report itself lands on the Actions line, so one line carries the decision and the other carries the act."],
    ["information sharing threshold considered; assessed as met","A share and a report are different acts under different laws, and this keeps them apart in the record."],
    ["concern held, below the reporting threshold; monitoring continues","A decision not to report today is a decision to keep watching, and this records it as a decision rather than as an absence. The watching itself is described in the Plan."]]},
  // NOTE-TYPE SCOPED, and the engine cannot express it yet. r14 P6 is explicit:
  // if this dimension ships, its terms must not appear on a routine session
  // note's picker, or the file acquires a set of terms that are false in most
  // contexts. That is a sessionType-to-vocabulary filter the builder does not
  // have. The dimension therefore ships as an ordinary dimension and THIS
  // COMMENT carries the scoping intent until the filter exists: out/cl belongs
  // on a closure, transfer or final-case entry, and nowhere else.
  // 
  // THE BOUNDARY RULE (w3e, from r30 Part 8.2) binds every term here: an
  // episode-scoped negative is honest only beside a stated boundary. The third
  // term is bounded to attended contacts on purpose, because a claim across the
  // whole period would cover every gap between appointments, which is an
  // interval nobody observed. r14-09 and risk-089 exclude the unbounded forms
  // permanently, in both builds: no "no foreseeable risk" in any wording, least
  // of all at closure, and no "no risk identified during the service period".
  // 
  // Multi-pick: the pattern statement and the baseline handover are different
  // facts and are ordinarily both true at a closure.
  {id:"cl",name:"At the end of the episode",terms:[
    ["risk enquiry was made at every attended contact across the service period","An episode-scoped statement of what was done, which is what makes an episode-scoped finding readable. Bounded to attended contacts, because the gaps between them are intervals nobody observed."],
    ["risk enquiry was made at some contacts and not at others across the period","The other half of the pair, for a period where the enquiry was not made every time. Which contacts, and why, is a fact for your own line underneath."],
    ["no risk indicators were identified at any attended contact","Deliberately bounded to attended contacts, because a claim across the whole period would cover every gap between appointments, which is an interval you did not observe."],
    ["risk could not be reassessed after the final attended contact","The honest line after a client stops coming, and the ceiling on what can be said about a period you had no contact in. An episode negative running past the date your information stopped asserts knowledge nobody had."],
    ["the picture described above is the baseline for whoever continues the care","A closing risk line does two jobs a session line never does: it states the pattern across the whole period, and it leaves a baseline for whoever reads next. This term is the second of the two."],
    ["the client's own account of what helps them in a crisis is recorded for the next reader","The one clinicians most often leave out and the receiving clinician most needs: anyone can look up a crisis number, but only your file knows what actually settles this person."]]},
  {id:"sc",name:"Scope of this conclusion",single:1,terms:[
    ["describes the client's state at this contact; no view formed about any later time","The honest scope of any risk conclusion. Nobody predicts individual suicide, and a note that claims only what it observed is the one that holds up. This scopes the conclusion in time; the enquiry-scoping is already carried by the first Outcome term, so a note does not say it twice."]]},
  {id:"bd",name:"Read against the rest of this note",terms:[
    ["the presentation and the client's account of risk point the same way","What you observed and what they told you agree. Worth stating once rather than leaving the reader to check two sections against each other."],
    ["the presentation and the client's account of risk differ; both are recorded and will be monitored","The honest entry when the mental state line and the risk answers pull apart. It names the tension rather than averaging it, and carries it forward as something to be watched rather than resolved on the page."],
    ["the risk answers were taken in the light of the mental state recorded above","Records the order in which you worked, where the observation came first and shaped the questions that followed."]]},
  // risk-121: the twelve temporal automations are permanently excluded. A date
  // is a fact and may be recorded; an interval is an inference and only the
  // clinician may draw it. No elapsed-time counter, overdue badge, suggested
  // interval or risk-over-time chart may ever attach to this dimension.
  {id:"rv",name:"Review",terms:[
    ["to be reviewed at the next contact","The ordinary case."],
    ["to be reviewed before the next contact","Brings the review forward without escalating."],
    ["fuller risk assessment scheduled, date recorded in Plan","A full assessment is booked rather than done here. Saying where the date lives keeps the two sections agreeing with each other."],
    ["next review date agreed with the client","Concrete and checkable. A relative interval tells the next reader less than a date does."],
    ["risk to be reviewed as a standing item at every contact","The right setting for a client whose baseline includes ideation. It says the question is never assumed closed."],
    ["review interval considered and left unchanged","Also a decision: you thought about bringing it forward and did not. Recording it distinguishes a choice from an oversight."],
    ["contact to be confirmed within twenty-four hours","Where something was escalated, the entry does not end at the referral. It ends at confirmation."],
    ["no review interval set this contact","The one entry in this dimension that says the interval was not settled. Naming the gap is better than leaving the line silent."],
    ["the interval to the next contact was set with the current risk picture in mind","The interval between contacts is a decision you made, and this records that the current picture was part of making it."],
    ["review to be brought forward if the next contact is not attended","The condition that would move the review, which is the part a later reader can check against what actually happened."],
    ["review to be brought forward if the client makes contact between sessions","A second trigger, and a different one: the review moves if the client reaches out rather than if they do not arrive."],
    ["no trigger agreed for bringing the review forward","Names the gap rather than leaving the line to imply a trigger that was never agreed."],
    ["the next contact falls after a longer gap than usual, and this was planned for","A longer gap that was decided rather than drifted into. Scheduling a review is a scheduling decision, not a safety measure."],
    ["risk reviewed as part of a planned periodic review, not prompted by any change","Reviewing on a schedule when nothing has happened is real clinical work and reads as such. Without it, a record only ever shows risk being looked at when something went wrong."],
    ["risk reviewed at the point of transfer or closure of this episode","The transition points are where Australian services concentrate their review requirements, because they are where people fall between services."],
    ["to be reviewed before the next contact because this assessment was not settled","Records unsettledness as a finding rather than resolving it artificially. It is more useful to a later reader than a confident conclusion the clinician did not hold."]]},
  // risk-168, the inertness contract: this dimension ships ONLY while inert.
  // No colour, no sort order, no dashboard count, no prompt that changes when
  // it is set, and no term that makes any interval or action follow from a
  // band. Every band surviving in Australian practice is an instruction to a
  // system, never a prediction about a person; this band instructs nothing,
  // which is precisely why it may exist. Withheld from the public build
  // (risk-051). A feature attaching behaviour to this value reopens risk-051.
  {id:"lvl",name:"Categorical rating (only if your setting requires one)",single:1,lead:"risk level",terms:[
    ["not rated; the Outcome line carries the finding in words","The default position, and the one the rest of this section is built for. Saying so in the line itself stops a reader treating an unrated note as an unassessed one, and stops another document in the file filling the gap with a level nobody chose. Categorical ratings have poor accuracy for individuals, and the guidelines have moved away from them; the words above carry more. No source consulted in building this vocabulary, whether regulator, panel, indemnity insurer or professional body, requires a categorical risk level."],
    ["low, on my clinical judgement this contact","Your determination. Nothing in Alembic computes, suggests or infers this value."],
    ["moderate, on my clinical judgement this contact","Your determination. A single recorded word is the thing an inquest can hold against a death, and it will be read as evidence about the clinician's whole approach."],
    ["high, on my clinical judgement this contact","Your determination."],
    ["rating recorded to meet a service requirement; the words above carry the assessment","Records that the level was entered because a service requires one, so the reasoning in the lines above is not read as a gloss on the rating."]]}]},
 {id:"act",name:"Actions taken",lane:"actions",lead:"",subs:[
  {id:"sp",name:"Safety planning",terms:[
    ["safety plan reviewed with the client","Gone through together, not just noted as existing."],
    ["safety plan created with the client","New this contact."],
    ["safety plan updated with the client","Changed this contact. Say what changed if it matters."],
    ["safety plan reviewed, no change needed this contact","Gone through together and it still fits. The most common state in ongoing work, and worth its own line so \"reviewed\" does not have to carry two meanings."],
    ["the client declined safety planning this contact","Their choice, recorded neutrally. Nothing here says what should follow; that is the rest of the Actions line."],
    ["crisis service numbers provided","Provided. Records the handing over and nothing beyond it."],
    ["crisis service numbers provided; the client confirmed they have them","Both halves. Only use it if the client actually confirmed."],
    ["a crisis service contacted together with the client during this contact","Dialled in the room, or on the call, with the client present. Different from advising them to ring later, and worth distinguishing."],
    ["the client agreed to continue treatment and to use the agreed crisis steps","A statement about engagement, which is a thing you both did. It is deliberately not a promise about what the client will not do."],
    ["no safety planning indicated this contact","An action in itself when you considered it and it was not needed. Recording the consideration is what separates a decision from an oversight."]]},
  {id:"mr",name:"Means",terms:[
    ["means restriction discussed","Discussed, whatever the outcome. Keep method detail out of this line; put only what care actually needs into your own words."],
    ["means restriction actioned with the client","Something concrete changed."],
    ["support person engaged in means restriction, with consent","Records the consent alongside the action."],
    ["means restriction discussed; the client did not agree to a change this contact","The conversation happened and nothing changed. Records the honest outcome rather than an empty line, and it carries forward."],
    ["no means identified that required restriction this contact","You asked and there was nothing to act on. Different from not asking, which the Assessed line already carries."],
    ["means restriction agreed with a parent or carer","Records who agreed to do it. In work with young people this is nearly always the parent's act and not the client's."],
    ["means agreed to be locked or secured rather than removed","Locking and removing are different levels of restriction with different durability. A note recording only that means were discussed cannot tell a later reader what state the house is in."],
    ["means agreed to be removed from the home","The other half of the same distinction."]]},
  {id:"mrv",name:"Medical review",terms:[
    ["medical review advised this contact","Advised, whether or not it was taken up. What you said is the part that is yours to record."],
    ["same-day medical review advised","The stronger version, for the account that would not wait. It sits beside whatever the rest of the Actions line records."],
    ["client declined medical review; the advice was recorded and repeated","Their decision and your advice, both on the page. This is the entry that protects everyone."],
    ["no medical review indicated this contact","Considered and not indicated. An action in itself."]]},
  {id:"lm",name:"What was discussed about limits",terms:[
    ["confidentiality limits revisited with the client before any disclosure was made","The second confidentiality conversation, the one that happens under pressure. It is the one a later reader will look for."],
    ["the client was told what would be disclosed and to whom, and agreed","Converts a disclosure made on another ground into a consented one, which is always the better footing."],
    ["the client was told, and did not agree; the disclosure proceeded on the ground below","Records both halves honestly. The ground goes on the disclosure line."],
    ["the client was not told beforehand; my reason is recorded in Disclosures","The entry clinicians most fear writing and the one whose absence looks worst. Recording the reason is what distinguishes a judgement from an omission."],
    ["explained to the client what I can and cannot do if their safety worsens","Records the conversation about the limits of your own role. It is the conversation that shapes what the client expects, and it is currently invisible in most records."]]},
  {id:"su",name:"Supports and coordination",terms:[
    ["GP notified, with consent","Consent recorded in the same breath as the disclosure."],
    ["psychiatrist or prescriber notified, with consent","As above."],
    ["case worker notified, with consent","As above."],
    ["family or support person involved, with the client's consent","Names the holder of the consent, which is the reader's standing question about this line."],
    ["family or support person involved, with a parent's or guardian's consent","The same act on a different consent. Either separated parent can give it, so the term names the holder rather than the relationship."],
    ["disclosure made without consent, on my judgement of a serious threat to safety","Records the ground you relied on in your own words. The recipient, purpose, authority and date belong in the Disclosures and Coordination section, which is where a reviewer looks for them."],
    ["disclosure made without consent, under a reporting obligation I judged applied","Records that the disclosure was compelled rather than chosen. Which obligation, and to whom, belongs in the Disclosures and Coordination section."],
    ["client informed of the intended disclosure, its purpose and its recipient","Records the step before the disclosure. What was said belongs in the Disclosures and Coordination section."],
    ["disclosure considered and not made; threshold not reached in my judgement","Records a decision rather than a silence, and keeps the conclusion in your own voice."],
    ["information given to a practitioner who could examine the client, with consent","Records what you did, which is supply information. The decision about what follows is made by the person who examines the client."],
    ["the firearms licensing authority was advised, in good faith","Records a notification made in good faith. What was said belongs in the Disclosures and Coordination section."],
    ["parent or carer informed without the client's agreement; the client was told what was shared","The commonest serious disclosure in work with young people. The second clause is what distinguishes a considered override from a broken confidence."],
    ["the client's wishes about what may be shared with family were recorded","Records the boundary the client drew around a disclosure that did not happen. A wish a person expressed and did not withdraw can outlast them."],
    ["no external contact indicated this contact","Considered, not needed."]]},
  {id:"ch",name:"Child safety and reporting",terms:[
    ["report made to child protection","Records the act. Channel, time, reference number and the person who took it belong underneath in your own words; they convert an assertion into a checkable fact."],
    ["report made to police","Some obligations run to police rather than child protection, and some run to both."],
    ["client informed that a report would be made, and what to expect","Records that the report was a kept promise rather than a surprise. Where you decided not to tell them, that goes in your own words instead."],
    ["no report indicated this contact","Considered and not indicated. An action in itself."]]},
  {id:"es",name:"Escalation",terms:[
    ["emergency services contacted; what I asked for is recorded in my own line below","Records the call. The Disclosures and Coordination section carries who was called and when."],
    ["outcome of the emergency services contact recorded","The second half of the pair. A request with no recorded outcome leaves the next reader unable to see what happened."],
    ["crisis or triage service contacted; the response is recorded in my own line below","Records the contact. Whether the service accepted, declined or advised is the part a later reader needs."],
    ["triage or intake service contacted; not accepted for assessment at this time","The commonest real outcome of a call to an external service. Leaving it out makes the record read as though the escalation succeeded."],
    ["escalation attempted; no response received at the time of writing","The honest entry when the note is written before anything came back. It is also the natural place for a later addendum."],
    ["emergency department attendance advised","Advised. Whether it was taken up is a separate and equally important entry; use the terms below."],
    ["client agreed to attend the emergency department","Their agreement, recorded plainly. Whether a person will engage with attending is treated as triage-grade information at the receiving end."],
    ["client declined the recommendation to attend","Their choice, recorded neutrally and without any inference about why."],
    ["attendance confirmed by the client or a support person","The step almost nobody records. It is the difference between advice given and care continued."],
    ["no escalation indicated this contact","Considered and not indicated."]]},
  {id:"pr",name:"Police and emergency response",terms:[
    ["police asked to attend for a welfare check","Records the request. What was asked for, and of whom, is the substance of the action."],
    ["police asked to attend because of an immediate concern for safety","A different request from a welfare check, and the difference matters if the record is reviewed."],
    ["police attended; the outcome is recorded in my own line below","The second half. An attendance with no recorded outcome is half a record."],
    ["police were asked to attend and did not attend","Records what happened rather than what was requested."],
    ["an ambulance was called","Recorded separately from police, because they are different responses with different consequences for the client."]]},
  {id:"hv",name:"Handover and onward information",terms:[
    ["urgent same-day assessment requested from the service contacted","Records what you asked for, not just that you rang. It is the part most often left out of the record."],
    ["advice sought from the service; transfer of care not requested","A consultation is not a referral. Saying which one it was protects both you and the receiving service from a later disagreement about who was holding the client."],
    ["written summary provided to the receiving service, with consent","Consent recorded in the same breath as the disclosure, in the pattern the Supports dimension already uses."],
    ["crisis plan and the supports the client finds helpful included in what was sent","What the person finds helpful in a crisis is knowledge you hold and the receiving service does not."]]},
  {id:"tf",name:"Handover",terms:[
    ["referral sent; acceptance not confirmed at the time of writing","The honest state of most referrals when the note is written. It is also the state that carries the responsibility, so it is worth naming rather than leaving blank."],
    ["handover accepted by a named clinician at the receiving service","A handover is complete when responsibility has transferred, and your responsibility can continue until then. Naming the person who accepted is what closes it."],
    ["the service contacted advised the referral did not meet their threshold","Not a judgement about the service. A fact about where the client now stands, which is the fact the next reader needs."],
    ["attendance at the referred service confirmed","Confirmed rather than assumed. It dates the point at which somebody else was in fact seeing the client."],
    ["the client was given names of alternative practitioners; no referral was made","A legitimate ending, and not a transfer. Saying so is what stops a later reader assuming somebody else was holding the client."]]},
  {id:"cs",name:"Consultation",terms:[
    ["raised with the supervisor the same day","Records your own act, and when you did it. Only pick a term whose event has already happened when you write the note."],
    ["to be raised at the next scheduled supervision","The ordinary case, since supervision usually comes after the contact it concerns."],
    ["supervisor contacted during this contact","Reached while the client was still with you, which is a different fact from reaching them afterwards."],
    ["supervisor contacted; no response at the time of writing","The route was used and it did not answer. It also explains why the next line records a decision made alone."],
    ["discussed with an experienced practitioner","The Code's own term, covering a senior psychologist, a peer consultant, or another practitioner with experience of the issue."],
    ["discussed with a colleague, client not identified","The de-identified discussion the confidentiality framework expressly permits without consent."],
    ["supervision sought, not yet held; proceeding on my own judgement in the meantime","Records that you decided it needed supervision, and that the decision in the room was still yours."],
    ["no consultation sought this contact","Considering whether to consult and deciding not to is a clinical act, and this is where it lands."]]},
  {id:"tel",name:"Contact and location safety",terms:[
    ["client's location confirmed at the start of this contact","The reason this field exists is dispatch. On any contact where you are not in the room, knowing where the client is turns a crisis into something that can be acted on."],
    ["client's current physical location confirmed before escalating","You cannot send help to a video window. The escalation moment is a different moment from the start of the contact, and this records that one."],
    ["emergency contact confirmed as current","Confirmed this contact, not assumed from intake. Contacts go stale in exactly the months nobody checks them."],
    ["crisis service local to the client identified","National lines travel with the client; the local triage service and nearest emergency department do not."],
    ["plan agreed for a dropped connection","Agreed before it is needed. If a connection did drop during this contact, the detail goes in your own line."],
    ["contact not re-established after the connection dropped","The harder outcome, and the one that has to show what followed. Each attempt and its time belong in your own line."]]},
  {id:"msg",name:"Written contact between sessions",terms:[
    ["message actioned on the day it was received","The ordinary case, stated rather than assumed. Response time is a fact that becomes relevant later and a reader made to guess at it will guess against you."],
    ["message received out of hours and actioned at the next opportunity","Two clocks: when it arrived, and when you saw it. The gap is visible rather than inferred."],
    ["client contacted by another channel in response to the message","A written disclosure answered by voice. Records that the channel was judged rather than accepted."],
    ["the client's original message retained in the record","Safety-relevant words are on the short list for keeping verbatim. A risk-relevant message kept only on a phone is a record nobody can produce."]]},
  {id:"fu",name:"Follow-up",terms:[
    ["next appointment brought forward","Concrete and checkable."],
    ["additional contact scheduled before the next session","A call or a check-in between sessions."],
    ["between-session check-in agreed with the client","Agreed rather than imposed."],
    ["usual appointment schedule maintained","Also an action: you considered changing it and did not."],
    ["arranged to see the client alone at the next contact","The action that follows a third-party report. Concrete and checkable, and it closes the gap the report opened."]]},
  {id:"fx",name:"Follow-up made",terms:[
    ["follow-up contact made as planned","The check-in happened. If it produced clinical content, it is its own contact and its own note."],
    ["follow-up contact attempted; no answer, message left","Method, time and outcome belong in your own words. The attempt is the part that must not go unrecorded."],
    ["follow-up contact attempted; no response to date","Records an open loop. It will read as an open loop to the next person too, which is the point."]]},
  {id:"rec",name:"The client and the record",terms:[
    ["told the client what would be recorded in this section","The record is accessible by right in Australia, and this line shows it was not written behind the person's back."],
    ["this section was read back to the client during the contact","Stronger than telling them, and just as checkable. It records that the words themselves were read out, not only their gist."],
    ["a copy of this note was provided to the client at their request","Records the request and the response together. In Australia the request is lawful by default, so the line is a routine one, not a special event."],
    ["the client asked for a correction to an earlier entry; addendum to follow","A correction request can arrive in a session, in ordinary words, and it starts a clock. The addendum is made separately; nothing above it is ever rewritten."],
    ["what would be recorded in this section explained to the client through the interpreter","The record will most likely be read in another language. This records that it was explained while there was still an interpreter in the room."]]},
  {id:"cn",name:"Considered and not taken",terms:[
    ["more frequent contact considered and not indicated this contact","An option you considered and did not take is a clinical act, and it is the act most often found missing when a record is reviewed after a death."],
    ["referral to a crisis or acute service considered and not indicated this contact","Records the consideration and its conclusion. The reasoning belongs in your own words underneath."],
    ["presentation to an emergency department considered and not indicated this contact","As above. Nothing here says the decision was safe or sufficient; it says it was considered and reasoned."],
    ["involving a support person considered; the client declined","Records both halves: that it was offered, and that the client said no."],
    ["a change to the safety plan considered and not indicated this contact","The plan was looked at and left as it was, which is a decision rather than an omission."],
    ["an escalation was considered and I judged it was not indicated this contact","The considered decision not to act, in the clinician's own voice."],
    ["the client declined the referral or escalation offered","Offered and declined. The offer is the part a bare \"no escalation\" loses."],
    ["other options were considered this contact and are set out in my own words","Points at the free text, where the options themselves belong. The record is the only place the alternatives survive."]]}]}
];

export const NOT_ASSESSED = [
 {id:"na",name:"Reason not assessed",lane:"reason",lead:"",subs:[
  // risk-197 (r26-06), homed here as a comment per DECISIONS-ADDENDUM.md A5,
  // because lead serialises into the record and this must never:
  // A contact where risk was not formally assessed is still a contact, and for
  // a client who dies between sessions it is often the last entry in the file.
  // Coronial findings locate and quote the last entry by name.
  {id:"r",name:"Reason",single:1,terms:[
    ["the client was not present","Records a contact in which the client took no part, such as a coordination call with another service. Where the client was booked in and did not attend, the non-attendance terms carry that instead."],
    ["risk enquiry not indicated for this form of contact","The contact itself is not one in which risk can be asked about. The everyday case for a text confirming a time. Enquiry rather than screening, because screening claims an instrument that was not used."],
    ["appointment or administrative contact only, no clinical content","Scheduling, paperwork, reminders. Nothing clinical was exchanged."],
    ["written message contact; no risk indicators in the message content","Covers text, email and portal messages rather than SMS alone. Records that the written exchange carried nothing that raised a risk concern."],
    ["brief phone contact; no risk indicators in the call content","Matches the wording the phone note already uses."],
    ["assessed in full at the previous session; nothing this contact indicated a change","Records why repeating the full assessment was not necessary, limited to what this contact showed. It makes no claim about the interval between appointments, which nobody observed."],
    ["the client chose not to discuss risk this contact","Their decision, recorded neutrally. Anything done in response is carried on the Actions line."],
    ["session ended early before risk could be addressed","Honest, and it flags itself for the next contact."],
    ["the client left before risk could be addressed","Distinct from a session that simply ran short. It flags itself for the next contact."],
    ["the client did not attend and did not make contact","Records a booked session the client did not attend and did not explain. What was done in response is carried on the Actions line."],
    ["the client cancelled inside the agreed notice period","Records a cancellation made later than the notice the client agreed to. Distinct from a cancellation with notice, which is diary management."],
    ["the client cancelled with notice and the contact was rebooked","Records a cancellation made within the agreed notice, together with the replacement appointment."],
    ["a child or young person was not brought to the appointment","Follows the wording health services now use for children, because a young child can only attend an appointment somebody brings them to. Records the absence without attributing it to the child."],
    ["the contact concerned another person's safety, not the client's own risk","Records a contact given over to another person's safety, such as a child or a dependant, rather than to the client's own risk."],
    ["brief contact to confirm safety plan or appointment details only","Covers the call or message that exists only to check a detail. Nothing clinical was exchanged, and nothing was asked about risk."],
    ["the client could not be seen alone at this contact","Someone else was present throughout, so raising risk was not safe or not possible. Honest, and it flags itself for the next contact."],
    ["the contact was with another service about the client, who was not present","The everyday case for a call to a GP, a crisis line or an emergency department about a client who is not on the line. More precise than recording only that the client was not present."],
    ["contact was with a parent, carer or support person; the client was not present","Records that somebody was spoken to and that it was not the client. This is the contact where risk was discussed at length with a parent, carer or support person and the client was not there."],
    ["risk information was reported by the person contacted and is set out in my own line below","Records that the person spoken to reported something about risk, with the substance carried in the clinician's own sentence rather than in a term."],
    ["the client has died; this entry records the notification and its source","Records what was told and who told it. The cause of death is a coroner's finding, and no term here states or implies one."],
    ["this contact took place after the client's death","For the contacts that follow, when a case worker, a family member or a coronial investigator is the one on the phone."],
    ["the information was not available this contact; follow-up planned to obtain it","Information that could not be obtained is not the same as information that was not relevant. The first carries a follow-up, and this term records that one is planned."],
    ["assessed today by another service; that assessment relied on rather than repeated","Where the client has just been assessed elsewhere and the record is available, repeating it is not automatically better care. The service is named in the note's coordination section, not here."],
    ["no credentialled interpreter was available for this contact","Records that the language support the enquiry needed was not available. Anything arranged for the next contact is carried on the Actions line."],
    ["the appointment did not proceed because the practitioner was unavailable","Records that the contact did not happen for a reason on the practitioner's side. It carries no reason for the unavailability, because that is not information about this client."],
    ["contact made before the first appointment, while the client was waiting to be seen","Records a contact made in the period between a referral and a first appointment. Nothing in Alembic ranks, prioritises or triages anyone who is waiting."],
    ["holding contact while the client waits for a service elsewhere","Records a contact made to keep in touch while the client waits for another service to start."],
    ["this entry closes the file after contact ended; the client was not present","Records a closure written after the client stopped attending. Nobody was there to assess, and the entry says so rather than leaving the risk line silent."],
    ["the client completed a measure between contacts; no clinical contact took place to discuss it","For the case where a questionnaire comes in and no session happened. Explains why there is a score on the file and no risk enquiry beside it."]]}]},
 {id:"nac",name:"Actions taken",lane:"actions",lead:"",subs:[
  {id:"at",name:"Contact attempts",terms:[
    ["contact attempted; message left","Records an attempt and what came of it."],
    ["contact attempted; no response","Records an attempt that reached nobody."],
    ["client responded and the appointment was rebooked","Records the response and the replacement appointment together."],
    ["no further contact attempted this contact","Records that no attempt was made on this occasion, which a later reader would otherwise have to infer from silence."],
    ["message acknowledged and a contact offered","Records what was done about a message that did not call for a risk enquiry."],
    ["supervisor consulted about the response to this contact","Records the consultation as an act. It carries no view about whether the response was right."],
    ["a decision was made not to attempt contact on this occasion","Records a decision rather than a silence. Nothing in Alembic sets or suggests a number of attempts."],
    ["a decision was recorded to stop attempting contact for the time being","Records the point at which attempts stopped, and that it was a decision rather than a lapse."],
    ["the decision about further contact attempts was made with the supervisor","Records who the decision was made with. It carries no view about the decision itself."]]},
  {id:"bk",name:"Risk backdrop",single:1,terms:[
    ["no prior risk concerns on record","Records the backdrop this contact sits against, as it stands in the record."],
    ["prior risk concerns on record, reviewed before responding","Records that the earlier entries were read before the response to this contact was settled."],
    ["risk position at the previous contact carried forward","The clinician's own statement that the position reached at the last contact still stands. Nothing is carried forward by the software."]]},
  {id:"ad",name:"After a death",terms:[
    ["the supervisor was informed of the client's death","Records that the supervisor was told. Like every term here, it describes an act that has already happened."],
    ["the professional indemnity insurer was contacted","Records that the insurer was contacted. It carries nothing about what was discussed."],
    ["a complete copy of the record was taken and secured","Records that a complete copy was taken and secured. That copy is the version of events available later."],
    ["the referring practitioner was informed of the death","Records that the referrer was told. It states no cause."],
    ["records or a statement were provided in response to a coronial request","Records that records or a statement were provided, and nothing about their content."],
    ["the death was reported to a coroner or to police","Records that a report was made. The cause of death is a coroner's finding, and no term here states one."],
    ["the client's death was reported, or confirmed as already reported","Records what was done on learning of a death. In most places somebody else will already have reported it, and confirming that is itself an act."],
    ["arrangements were considered for other clients affected by the death","Records that the effect on other clients was considered. It says nothing about what was decided for any of them."],
    ["contact was made with a family member; no information from the record was disclosed","Records that a conversation happened and that nothing from the record was disclosed in it."],
    ["a request for information was received from a family member and not answered at this contact","Records that a request was received and was not answered at this contact. Who may access a deceased person's record differs by state."]]},
  {id:"ig",name:"Information given to another service",terms:[
    ["information given to another service about the client, with consent","Records the disclosure and the consent in the same term. The recipient, purpose, authority and date belong in the Disclosures and Coordination section."]]}]}
];
export const RISK_AREAS = [...ASSESSED, ...NOT_ASSESSED]

// The three lines a risk block always has, in the order they are written.
export const RISK_LANES = ['assessed', 'outcome', 'actions']
