// The risk vocabulary, lifted from the signed-off prototype at
// app/prototypes/risk-builder.html (option B, chosen 2026-08-14). Two branches,
// four areas, sixteen dimensions, seventy-nine terms. Wording is byte-faithful
// to the prototype: the clinician signed off on these exact words.
//
// Shape, deliberately the same as lib/mse/mseVocabulary.js so one engine drives
// both:
//   area: { id, name, lane, lead, subs[] }
//   sub:  { id, name, terms[], lead?, single? }
//   term: [text, explanation]
//
// `lane` is the only addition, and it is what makes risk different from mental
// state: the Risk section is three fixed lines, not one, and every area feeds
// exactly one of them.
//   'assessed' -> the Assessed: line
//   'outcome'  -> the Outcome: line
//   'actions'  -> the Actions: line
//   'reason'   -> the Outcome: line, on the not-assessed branch
//
// Every term is something the clinician asked, observed, concluded or did.
// Nothing here asserts anything on the clinician's behalf, and nothing is ever
// inferred: the AI never writes this section (see
// docs/wiki/law/pages/tga-medical-device-status.md, and the terms of service).
// Data only, no DOM, no behaviour.

export const ASSESSED = [
 {id:'enq',name:'What was asked',lane:'assessed',lead:'',subs:[
  {id:'si',name:'Suicidal ideation',single:1,lead:'suicidal ideation',terms:[
   ['denied on direct enquiry','You asked directly and the client said no. Records the asking as well as the answer, which is the part that matters if the note is ever reviewed.'],
   ['passive ideation reported, no plan or intent','Thoughts of not being here, or of not waking up, without any plan or stated intent.'],
   ['active ideation reported, no plan','Active thoughts of ending their life, with no plan disclosed.'],
   ['active ideation with a plan, no stated intent','A plan was described. Intent was not stated. Record both parts, because they carry different weight.'],
   ['active ideation with plan and intent','The most serious of these entries. If you pick it, the Actions line should show what you did about it.'],
   ['not asked this contact','Honest, and better than silence. Use it when you screened for something else but did not ask about this.']]},
  {id:'sh',name:'Self-harm',single:1,lead:'self-harm',terms:[
   ['denied on direct enquiry','Asked directly and denied.'],
   ['urges reported, no acts since last contact','Urges without acts. Their own words are worth adding underneath.'],
   ['acts reported since last contact','Record that acts occurred. Detail of method belongs in the record only where it is needed for care.'],
   ['historical only, none current','Past self-harm, nothing current.'],
   ['not asked this contact','Use rather than leaving the question invisible.']]},
  {id:'ho',name:'Harm to others',single:1,lead:'thoughts of harm to others',terms:[
   ['denied on direct enquiry','Asked directly and denied.'],
   ['thoughts reported, no target or plan','Reported thoughts without a named person or a plan.'],
   ['thoughts reported with an identified person','This may engage a duty to warn or protect. Record what you did in the Actions line.'],
   ['not asked this contact','Honest where the contact gave no reason to ask.']]},
  {id:'me',name:'Access to means',single:1,lead:'access to means',terms:[
   ['discussed, no access identified','You asked about access and none was identified.'],
   ['discussed, access identified','Access exists. The Actions line should show what was done about it.'],
   ['discussed, access reduced during this contact','Means restriction actioned within the session.'],
   ['not discussed this contact','Records the gap rather than hiding it.']]},
  {id:'hx',name:'History reviewed',terms:[
   ['previous attempt history reviewed','You went back over previous attempts with the client this contact.'],
   ['previous self-harm history reviewed','Reviewed rather than assumed from the file.'],
   ['no relevant history on record or reported','Nothing in the record and nothing reported.'],
   ['history reviewed from file, not raised with the client','Distinguishes reading the record from asking the person.']]},
  {id:'ct',name:'Contributing factors reported',terms:[
   ['recent loss or separation reported','As reported by the client, not inferred.'],
   ['sleep disturbance reported','Their report, in the risk context.'],
   ['increased substance use reported','As reported. Avoid characterising it further here.'],
   ['financial or housing stress reported','As reported.'],
   ['reduced contact with usual supports reported','As reported.'],
   ['recent change to medication reported','As reported, and worth coordinating with the prescriber.'],
   ['none reported this contact','Asked and nothing was raised.']]},
  {id:'pf',name:'Protective factors',terms:[
   ['future-oriented plans described','The client spoke about something ahead of them.'],
   ['responsibility for dependants or pets described','Named by the client as a reason to stay safe.'],
   ['engaged with supports and willing to use them','Both halves matter: present, and willing.'],
   ['help-seeking demonstrated this contact','They came, or they called. That is itself a protective factor.'],
   ['safety plan in place and known to the client','In place, and they can say what is in it.'],
   ['no protective factors identified this contact','A significant finding, not a blank.']]}]},
 {id:'out',name:'Outcome',lane:'outcome',lead:'',subs:[
  {id:'o',name:'Outcome this contact',single:1,terms:[
   ['no current risk indicators identified','The plainest outcome, and the most common.'],
   ['risk indicators present, managed within this contact','Something was there and you dealt with it in the room.'],
   ['risk unchanged from the previous assessment','Explicitly comparing with last time, which is more useful than a bare rating.'],
   ['risk increased since the previous contact','Your judgement, stated as a change rather than a score.'],
   ['risk decreased since the previous contact','Your judgement.'],
   ['acute concern identified and escalated the same day','Pair this with the Actions line and, in most services, a phone call.']]},
  {id:'lvl',name:'Risk level this contact',single:1,lead:'risk level',terms:[
   ['not rated','The default position. The Outcome line above already carries the meaning in words.'],
   ['low','Your determination. Nothing in Alembic computes, suggests or infers this value.'],
   ['moderate','Your determination. See the note at the top of this page about whether this dimension ships at all.'],
   ['high','Your determination.']]},
  {id:'rv',name:'Review',single:1,terms:[
   ['to be reviewed at the next contact','The ordinary case.'],
   ['to be reviewed before the next contact','Brings the review forward without escalating.'],
   ['formal risk assessment scheduled','A full assessment is booked rather than done here.']]}]},
 {id:'act',name:'Actions taken',lane:'actions',lead:'',subs:[
  {id:'sp',name:'Safety planning',terms:[
   ['safety plan reviewed with the client','Gone through together, not just noted as existing.'],
   ['safety plan created with the client','New this contact.'],
   ['safety plan updated with the client','Changed this contact. Say what changed if it matters.'],
   ['crisis contact numbers provided and confirmed','Provided, and the client confirmed they have them.'],
   ['no safety planning indicated this contact','An action in itself when you considered it and it was not needed.']]},
  {id:'mr',name:'Means',terms:[
   ['means restriction discussed','Discussed, whatever the outcome.'],
   ['means restriction actioned with the client','Something concrete changed.'],
   ['support person engaged in means restriction, with consent','Records the consent alongside the action.']]},
  {id:'su',name:'Supports and coordination',terms:[
   ['GP notified, with consent','Consent recorded in the same breath as the disclosure.'],
   ['psychiatrist or prescriber notified, with consent','As above.'],
   ['case worker notified, with consent','As above.'],
   ['family or support person involved, with consent','As above.'],
   ['disclosure made without consent under duty of care','Rare and serious. The Disclosures section of the note must carry the detail as well.'],
   ['no external contact indicated this contact','Considered, not needed.']]},
  {id:'fu',name:'Follow-up',terms:[
   ['next appointment brought forward','Concrete and checkable.'],
   ['additional contact scheduled before the next session','A call or a check-in between sessions.'],
   ['between-session check-in agreed with the client','Agreed rather than imposed.'],
   ['usual appointment schedule maintained','Also an action: you considered changing it and did not.']]},
  {id:'es',name:'Escalation',terms:[
   ['discussed with supervisor','The most common escalation, and worth recording.'],
   ['emergency services contacted','Records the fact. Detail belongs in the Service provided section.'],
   ['crisis or triage service contacted','As above.'],
   ['emergency department attendance advised','Advised, whether or not it was taken up.'],
   ['no escalation indicated this contact','Considered and not indicated.']]}]}
];

export const NOT_ASSESSED = [
 {id:'na',name:'Reason not assessed',lane:'reason',lead:'',subs:[
  {id:'r',name:'Reason',single:1,terms:[
   ['the client was not present','The usual reason on a coordination call or a missed session.'],
   ['risk screening not indicated for this form of contact','The contact itself is not one in which risk can be screened. The everyday case for a text confirming a time.'],
   ['appointment or administrative contact only, no clinical content','Scheduling, paperwork, reminders. Nothing clinical was exchanged.'],
   ['text-based contact, no risk indicators in the message content','Matches the wording the SMS note already uses.'],
   ['brief phone contact, no risk indicators in the call content','Matches the wording the phone note already uses.'],
   ['assessed in full at the previous session, with no new indicators since','Says why it was reasonable not to repeat it.'],
   ['the client declined to discuss risk','Their choice, recorded neutrally. Consider what the Actions line should say.'],
   ['session ended early before risk could be addressed','Honest, and it flags itself for the next contact.']]}]}
];
export const RISK_AREAS = [...ASSESSED, ...NOT_ASSESSED]

// The three lines a risk block always has, in the order they are written.
export const RISK_LANES = ['assessed', 'outcome', 'actions']
