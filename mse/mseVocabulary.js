// The MSE vocabulary, lifted verbatim from the signed-off prototype at
// app/prototypes/mse-composer.html. Twelve domains, fifty sub-dimensions,
// 221 terms. Wording is byte-faithful to the prototype: the clinician signed
// off on these exact words, so nothing here is paraphrased or tidied.
//
// Shape:
//   domain: { id, name, label, lead, subs[], risk? }
//   sub:    { id, name, terms[], lead?, single?, risk? }
//   term:   [text, explanation, normalRange?]
//
// lead is the word the serialiser puts in front of a domain or sub's picks
// ("mood low", "suicidal ideation denied on direct enquiry"). A sub lead wins
// over its domain lead. single marks a sub where one pick replaces the last,
// which is how the risk sub-dimensions behave.
// Data only, no DOM, no behaviour.

export const MSE_DOMAINS = [
 {id:'app',name:'Appearance',label:'Appearance',lead:'',subs:[
  {id:'gr',name:'Grooming and self-care',terms:[
   ['grooming and dress usual for this client','Nothing has changed from how this person usually presents. The safest baseline-relative wording, because it compares them to themselves rather than to a social standard.',1],
   ['well groomed','Hair, clothing and hygiene appear cared for and appropriate to the setting.',1],
   ['grooming below usual standard for this client','A departure from their own baseline, which is the clinically meaningful comparison.'],
   ['self-care below usual standard for this client','Broader than grooming: may take in eating, hygiene, medication or household tasks the client has mentioned.'],
   ['appearance markedly changed since last session','Use when the change itself is the finding. Say what changed in your own words.']]},
  {id:'dr',name:'Dress and context',terms:[
   ['dressed for the weather and setting','Clothing suits the conditions and the appointment.',1],
   ['dress consistent with cultural or religious practice','Marks dress as cultural rather than clinical, so it is never later read as bizarre.',1],
   ['wearing sensory aids by preference','Records sensory accommodation as preference, not avoidance. Matters for autistic clients.',1],
   ['dressed heavily for the conditions','Observation only. Do not infer concealment here.']]},
  {id:'ab',name:'Apparent age and build',terms:[
   ['appears their stated age','The default observation, and the one that needs no explanation.',1],
   ['appears older than stated age','An observation only. Do not attach a cause to it here.'],
   ['appears younger than stated age','An observation only.'],
   ['average build','A neutral description of body habitus.',1],
   ['slight build','Neutral descriptor.'],
   ['larger build','Neutral descriptor. Keep evaluative words out of this line.']]},
  {id:'df',name:'Distinguishing features',terms:[
   ['no distinguishing features noted','Nothing that needs recording for identification or clinical relevance.',1],
   ['visible tattoos or piercings, noted as appearance only','Records the observation without letting it become a clinical finding.',1],
   ['mobility aid used','A fact about how the client gets about, not a finding about function.',1],
   ['visible injury or scarring observed; raised with client','The observation plus the fact that you asked about it.']]},
  {id:'ey',name:'Eye contact',terms:[
   ['eye contact usual for this client','Baseline-relative, and safe across cultures and neurotypes.',1],
   ['reduced eye contact; client describes this as their usual comfortable pattern','Records the observation and the explanation together, so it is not later read as avoidance.',1],
   ['direct eye contact avoided as a mark of respect in the client community (client explained)','Stops a culturally normative behaviour being recorded as a finding. Only use when the client told you.',1],
   ['reduced eye contact','A bare observation. Prefer a contextualised version where you know the reason.'],
   ['downcast gaze','Gaze directed downward for much of the session.']]}]},
 {id:'beh',name:'Behaviour',label:'Behaviour',lead:'',subs:[
  {id:'ps',name:'Psychomotor activity',terms:[
   ['settled readily','Took a short time to settle, then remained settled.',1],
   ['movement pattern usual for this client','Baseline-relative.',1],
   ['self-regulatory movement observed; client describes this as usual and helpful','Records stimming as regulation rather than as an abnormal movement.',1],
   ['psychomotor retardation (long pauses before initiating movement)','The technical term with the observable evidence attached, so the label is anchored.'],
   ['psychomotor agitation (unable to remain seated)','As above: the term plus what you actually saw.'],
   ['restless; shifted position frequently','Plainer alternative where agitation would overstate it.']]},
  {id:'ag',name:'Agitation or slowing',terms:[
   ['no agitation or slowing observed','Neither raised nor reduced activity was apparent.',1],
   ['activity level usual for this client','Baseline-relative, which is the comparison that carries meaning.',1],
   ['increased activity; paced during the session','The observable evidence, so agitation is not asserted bare.'],
   ['slowed movement and delayed responses','The observable evidence for slowing.']]},
  {id:'mnr',name:'Mannerisms',terms:[
   ['no unusual mannerisms observed','Nothing repetitive or atypical was apparent.',1],
   ['repetitive hand movement observed; client describes this as usual','The observation with the client account attached, so it is not read as abnormal.',1],
   ['tremor observed','Observation only. Say which limb, and whether at rest or on movement.'],
   ['tic-like movement observed','Descriptive rather than diagnostic.']]},
  {id:'en',name:'Cooperation and engagement',terms:[
   ['engaged readily; answered openly','Replaces the compliance verdict "cooperative" with what happened.',1],
   ['cooperative and engaged','Appears often in your own notes. Plainer than the above.',1],
   ['requested a break; break taken','A neutral record of an accommodation, never a finding about tolerance.',1],
   ['responses brief; limited elaboration','Observable, and avoids inferring guardedness.'],
   ['declined to answer some questions','States the fact without attributing a motive such as evasive.']]},
  {id:'cx',name:'Context',terms:[
   ['first session; presentation may reflect unfamiliarity with the setting','Guards a first-session presentation from being treated as a baseline.'],
   ['support person present at client request','A fact about the session, not about dependence.',1],
   ['client is in Sorry Business (client term); presentation understood in that context','Marks culturally normative mourning so withdrawal is not recorded as retardation.',1],
   ['interpreter present; observations limited accordingly','Flags that several domains are mediated and less reliable.']]}]},
 {id:'ar',name:'Attitude and rapport',label:'Attitude and rapport',lead:'',subs:[
  {id:'att',name:'Attitude to interviewer',lead:'attitude',terms:[
   ['open and receptive to the interview','Engaged with the process without reservation.',1],
   ['usual for this client','Baseline-relative.',1],
   ['guarded on some topics, and said so','Records the reticence together with the client own account of it.'],
   ['ambivalent about attending, and discussed this openly','Neutral, and avoids the loaded word resistant.'],
   ['attended at the request of another person, and said so','A fact about how the referral came about, not a verdict on motivation.']]},
  {id:'rap',name:'Quality of rapport',lead:'rapport',terms:[
   ['established readily and maintained','Warm working contact through the session.',1],
   ['consistent with previous sessions','Baseline-relative.',1],
   ['slower to establish, then settled','Describes the shape of the session rather than labelling the client.'],
   ['limited this session; client named tiredness as the reason','The observation with the reason the client gave for it.']]}]},
 {id:'sp',name:'Speech',label:'Speech',lead:'speech',subs:[
  {id:'rt',name:'Rate and volume',terms:[
   ['normal rate and volume','Nothing remarkable in pace or loudness.',1],
   ['rate usual for this client','Baseline-relative alternative.',1],
   ['slow','Noticeably slower than conversational pace.'],
   ['pressured and difficult to interrupt','Technical term; the second clause is the observable that earns it.'],
   ['soft','Quieter than conversational volume.']]},
  {id:'tn',name:'Tone and prosody',terms:[
   ['tone and inflection unremarkable','The usual variation in pitch and emphasis was present.',1],
   ['prosody usual for this client','Baseline-relative.',1],
   ['monotonous','Little variation in pitch or emphasis.'],
   ['tone flattened compared with previous sessions','A baseline-relative change, which is the meaningful one.']]},
  {id:'qt',name:'Quantity and spontaneity',terms:[
   ['normal quantity; spoke spontaneously','The usual amount of speech, initiated as well as answered.',1],
   ['quantity usual for this client','Baseline-relative.',1],
   ['reduced quantity; answered briefly','Observable, without inferring that anything was withheld.'],
   ['increased quantity; spoke at length','Observable, without claiming pressure of speech.']]},
  {id:'fl',name:'Flow and clarity',terms:[
   ['fluent and clear','Flowed without difficulty and was easily understood.',1],
   ['coherent','Hung together and could be followed. Appears often in your own notes.',1],
   ['spontaneous','Client initiated speech rather than only answering.',1],
   ['long pauses before answering','Observable, and better than inferring latency of thought.'],
   ['word finding difficulties','Noticeable searching for words.']]},
  {id:'ch',name:'Channel',terms:[
   ['spoken in the client first language','Establishes that speech findings are reliable.',1],
   ['spoken through an interpreter; speech findings limited accordingly','Interpreted speech is not the client speech; rate, prosody and latency are not assessable.'],
   ['communicated in writing or using a communication device','Replaces the stigmatising label mute with what happened.']]}]},
 {id:'mo',name:'Mood',label:'Mood',lead:'mood',subs:[
  {id:'ow',name:'Client own words',lead:'described by the client as',terms:[
   ['"fine"','Recorded verbatim, in the word the client used. Quotation marks keep it theirs.',1],
   ['"okay"','Recorded verbatim.',1],
   ['"flat"','Recorded verbatim.'],
   ['"stressed"','Recorded verbatim.'],
   ['"up and down"','Recorded verbatim.'],
   ['"numb"','Recorded verbatim.']]},
  {id:'m',name:'Stated valence',single:true,terms:[
   ['euthymic','Within the normal range, neither low nor elevated. Technical and precise.',1],
   ['settled','Plainer alternative to euthymic.',1],
   ['low','Below usual. Preferred over depressed, which is a diagnostic register word.'],
   ['flat','Client describes little emotional colour. Common in your own notes.'],
   ['anxious','Reported worry or apprehension.'],
   ['irritable','Easily annoyed, as reported.'],
   ['grieving','Where loss is the context, more accurate than low.']]},
  {id:'tr',name:'Trend, as reported',terms:[
   ['reported as usual for this client','No change from their own baseline.',1],
   ['reported as improved since last session','The client own comparison, attributed to them.'],
   ['reported as worse since last session','The client own comparison. Pair it with the risk screen.']]}]},
 {id:'af',name:'Affect',label:'Affect',lead:'affect',subs:[
  {id:'rg',name:'Range',single:true,terms:[
   ['full range','The usual variety of emotional expression was present.',1],
   ['range usual for this client','Baseline-relative.',1],
   ['restricted','Reduced range, still present. The mildest of the reduction terms.'],
   ['constricted','More reduced than restricted.'],
   ['blunted','Markedly reduced intensity of expression.'],
   ['flat','Little or no emotional expression observable.']]},
  {id:'re',name:'Reactivity',terms:[
   ['reactive to conversation','Expression shifted appropriately with the content.',1],
   ['brightened when discussing a specific topic','A useful, specific observation. Name the topic in your own wording.',1],
   ['reduced reactivity across the session','Less shift than expected with changing content.'],
   ['tearful','Observable. Note when, and about what.']]},
  {id:'it',name:'Intensity',single:true,terms:[
   ['usual intensity of expression','Emotion expressed at about the strength the content would suggest.',1],
   ['intensity usual for this client','Baseline-relative.',1],
   ['heightened intensity of expression','Stronger than the content would suggest.'],
   ['reduced intensity of expression','Weaker than the content would suggest.']]},
  {id:'st',name:'Stability',single:true,terms:[
   ['stable across the session','No abrupt shifts in expressed emotion.',1],
   ['shifted with the content, and settled again','Movement that tracked the conversation, which is expected.',1],
   ['labile; rapid shifts not tied to the content','The technical term with the observable that earns it.']]},
  {id:'cg',name:'Congruence',single:true,terms:[
   ['congruent with reported mood','What you saw matched what they told you.',1],
   ['congruent with content','What you saw matched what was being discussed. Common in your own notes.',1],
   ['facial expression may not reflect internal state for this client (client reported)','Stops autistic or medicated presentation being recorded as flat or incongruent.',1],
   ['incongruent with reported mood; context considered','A mismatch, with the caveat that context was weighed first.']]}]},
 {id:'tf',name:'Thought form',label:'Thought form',lead:'thought form',subs:[
  {id:'ce',name:'Coherence',single:true,terms:[
   ['coherent throughout','Followed without difficulty from beginning to end.',1],
   ['mostly coherent, with occasional loss of thread','A proportional hedge, which is usually the truthful shape.'],
   ['difficult to follow at times','An observation about following, not a label on the client.']]},
  {id:'gl',name:'Goal direction',single:true,terms:[
   ['goal-directed','Moved toward a point and reached it.',1],
   ['reached the point after considerable detail','Plainer than circumstantial, and says the same thing.'],
   ['did not reach the point','Plainer than tangential.']]},
  {id:'as',name:'Associations',terms:[
   ['logical and goal-directed','Ideas connected sensibly and moved toward a point.',1],
   ['coherent and organised','Plainer alternative.',1],
   ['linear','Progressed in a straight line without digression.',1],
   ['mostly logical and sequential, some tangentiality','A proportional hedge. Real thought form is rarely all one thing.'],
   ['digressed into detail before returning to the question (circumstantial)','The technical term with its observable definition attached.'],
   ['digressed and did not return to the question (tangential)','The distinction from circumstantial is the returning.'],
   ['thought blocking','Speech stopped mid-thought and the thread was lost.']]},
  {id:'tp',name:'Tempo',terms:[
   ['normal tempo','Ideas arrived at a usual pace.',1],
   ['tempo usual for this client','Baseline-relative.',1],
   ['rapid succession of ideas, difficult to interrupt (flight of ideas)','The technical term with the observable that earns it.'],
   ['slowed tempo; long gaps between ideas','Observable, and better than asserting retardation of thought.'],
   ['speech stopped mid-thought and the thread was lost (thought blocking)','The observable first, then the term.']]},
  {id:'pv',name:'Perseveration',terms:[
   ['no perseveration observed','No theme or response repeated beyond its point.',1],
   ['returned repeatedly to the same theme','An observable description, without a mechanism attached.'],
   ['repeated the same response to different questions (perseveration)','The observable that earns the term.']]}]},
 {id:'tc',name:'Thought content',label:'Thought content',lead:'',risk:true,subs:[
  {id:'ge',name:'General content',terms:[
   ['no acute distress observed','A composite negative that appears in three quarters of your own notes.',1],
   ['no psychotic features evident','Blanket negative covering delusions and perceptual disturbance.',1],
   ['preoccupied with current stressors','Content dominated by present circumstances rather than fixed beliefs.'],
   ['ruminative','Repetitive circling on the same content.']]},
  {id:'si',name:'Suicidal ideation',single:true,risk:true,lead:'suicidal ideation',terms:[
   ['denied on direct enquiry','You asked directly and the client said no. Only use if you actually asked.',1],
   ['not screened this session','An honest record that the question was not put. It is an answer, not a screen.'],
   ['passive thoughts of death, no wish to act','Thoughts of being dead or not waking, without intent to act.'],
   ['active, no plan','Thoughts of ending life, no plan described.'],
   ['active, plan described','Thoughts with a plan. Record intent and means, and update the Risk section.']]},
  {id:'hi',name:'Harm to others',single:true,risk:true,lead:'ideation of harm to others',terms:[
   ['denied on direct enquiry','Asked directly, answered no.',1],
   ['not screened this session','Not asked this session.'],
   ['thoughts of harm to others, no wish to act','Thoughts without intent.'],
   ['active, plan described','Thoughts with a plan. Duty-of-care considerations apply.']]},
  {id:'sh',name:'Self-harm',single:true,risk:true,lead:'self-harm without suicidal intent',terms:[
   ['denied on direct enquiry','Asked directly, answered no.',1],
   ['not screened this session','Not asked this session.'],
   ['reports urges to self-harm without acting','Urges present, not acted on.'],
   ['reports self-harm since last session','Acted on since you last met.']]},
  {id:'fb',name:'Fixed beliefs by theme',terms:[
   ['no fixed beliefs elicited','You asked and found none.',1],
   ['belief shared by the client cultural or religious peers; not treated as a clinical finding','The cultural clause is part of the definition of a delusion. This records that you applied it.',1],
   ['persecutory belief reported','Preferred to paranoid, which carries lay stigma.'],
   ['grandiose belief reported','Inflated belief about capability, status or identity.'],
   ['referential belief reported','Belief that neutral events carry a personal message.'],
   ['belief of external control or interference reported','Belief that thoughts or actions are directed from outside.'],
   ['somatic belief reported','Fixed belief about the body that examination does not account for.'],
   ['belief of guilt or unworthiness held with fixed conviction','What separates this from a depressive thought is the conviction.'],
   ['jealous belief reported','Fixed belief about a partner faithfulness.'],
   ['nihilistic belief reported','Fixed belief that the self, the body or the world has ceased to exist.']]},
  {id:'ov',name:'Overvalued ideas',terms:[
   ['no overvalued ideas elicited','You asked and found none.',1],
   ['strongly held idea, held with less than delusional conviction','The degree of conviction is the whole distinction.'],
   ['strongly held health-related idea, discussed in session','A common presentation, and the note records that you raised it.']]},
  {id:'oc',name:'Obsessions and compulsions',terms:[
   ['no obsessions or compulsions reported','You asked and none were reported.',1],
   ['reports intrusive unwanted thoughts','Described rather than labelled, and attributed to the client.'],
   ['reports repeated checking or washing','The behaviour in plain terms.'],
   ['reports rituals that ease distress temporarily','Records the function without interpreting the cause.']]},
  {id:'ph',name:'Phobias',terms:[
   ['no specific fears reported','You asked and none were reported.',1],
   ['reports a specific fear with avoidance','The fear plus the behaviour it drives, which is the useful pair.'],
   ['reports fear of social situations with avoidance','Plain description, no diagnostic claim.']]},
  {id:'pr',name:'Preoccupations',terms:[
   ['no particular preoccupation reported','Nothing dominating the content.',1],
   ['preoccupied with a current relationship difficulty','Name the area, not the detail. The detail belongs elsewhere.'],
   ['preoccupied with work or study demands','As above.'],
   ['preoccupied with physical health','As above.'],
   ['preoccupied with finances or housing','As above.']]}]},
 {id:'pe',name:'Perception',label:'Perception',lead:'',subs:[
  {id:'ex',name:'Perceptual experience',terms:[
   ['no perceptual disturbance reported or observed','Covers both what they told you and what you saw.',1],
   ['experience occurs only at the edges of sleep','Within normal range. Should not be recorded as a hallucination.',1],
   ['reports hearing a voice or sound with no identifiable external source','Describes the experience rather than asserting the conclusion.'],
   ['reports content directing the client to act; Risk section updated','Command experiences carry risk implications. The second clause is a commitment.']]},
  {id:'hm',name:'Hallucinations by modality',terms:[
   ['no hallucinations reported in any modality','Covers every sense in one line.',1],
   ['auditory experience with no external source reported','The most common modality. Describe it rather than conclude it.'],
   ['visual experience with no external source reported','Record what the client described seeing.'],
   ['tactile experience with no external source reported','Sensation on or under the skin.'],
   ['olfactory or gustatory experience reported','Smell or taste, worth recording given the medical relevance.']]},
  {id:'il',name:'Illusions',terms:[
   ['no illusions reported','Nothing real was misperceived.',1],
   ['misperceived a real stimulus; resolved on looking again','A real stimulus misread is what makes it an illusion.'],
   ['misperception occurred in low light only','Context that keeps a common experience from becoming a finding.',1]]},
  {id:'dd',name:'Derealisation and depersonalisation',terms:[
   ['no dissociative experience reported','You asked and none were reported.',1],
   ['brief detachment during distress, settles afterwards','Common, and not on its own a clinical finding.',1],
   ['reports feeling detached from surroundings','Derealisation, described plainly.'],
   ['reports feeling detached from self','Depersonalisation, described plainly.']]},
  {id:'mn',name:'Context and meaning',terms:[
   ['client reports the experience as not distressing','Distress is often the clinically decisive fact.',1],
   ['experience described by client as spiritual or cultural, and not distressing','Stops normative spiritual experience being pathologised.',1],
   ['recent bereavement; experience consistent with grief and reported as comforting','Sensing a deceased relative during grief is common and not a clinical finding.',1],
   ['client reports the experience as distressing','Usually the one that changes the plan.']]}]},
 {id:'co',name:'Cognition',label:'Cognition',lead:'cognition',subs:[
  {id:'lc',name:'Consciousness level',single:true,terms:[
   ['alert','Fully awake and responsive. Opens half of your own MSE lines.',1],
   ['alert and responsive throughout','The same finding, stated across the whole session.',1],
   ['drowsy','Sleepy but rousable and able to participate.'],
   ['drowsy at the start, alert for the remainder','Records a change within the session rather than flattening it.']]},
  {id:'or',name:'Orientation',terms:[
   ['oriented to person, place, time and situation','Only record this if you actually established it.',1],
   ['orientation not formally tested; client tracked the conversation throughout','The honest wording for most therapy sessions, where nothing was administered.',1],
   ['disoriented to time','Could not give the date or approximate time.']]},
  {id:'at',name:'Attention and concentration',terms:[
   ['attention and recall unremarkable in session','Passive observation, which is what a therapy session actually supports.',1],
   ['no formal cognitive testing indicated this session','States plainly that nothing was administered.',1],
   ['sustained attention through the session','What you observed, over the period you observed it.',1],
   ['client reports difficulty concentrating','Attributed to the client, not tested by you.'],
   ['attention drifted at times; redirected easily','Observable, with the degree of difficulty attached.']]},
  {id:'me',name:'Memory',terms:[
   ['no memory difficulty reported or observed','Covers both what they told you and what you saw.',1],
   ['recalled recent events consistently within the session','Passive observation, which is what a session supports.',1],
   ['memory not formally tested this session','States plainly that nothing was administered.',1],
   ['client reports difficulty with recent memory','Attributed to the client, not tested by you.']]}]},
 {id:'in',name:'Insight',label:'Insight',lead:'insight',subs:[
  {id:'i',name:'Insight',single:true,terms:[
   ['client describes own difficulties in terms consistent with the clinical picture','Replaces the free-floating adjective "good insight" with the evidence for it.',1],
   ['client identifies the difficulty and the reason for attending','A minimal, defensible statement.',1],
   ['client explains their experience within their own cultural or spiritual framework','A different explanatory model is not poor insight.',1],
   ['client account differs in some respects from the clinical picture','Replaces "partial insight" with what actually differs.'],
   ['client account markedly inconsistent with the clinical picture despite this being discussed','Replaces "poor insight", and records that you discussed it.']]}]},
 {id:'ju',name:'Judgement',label:'Judgement',lead:'judgement',subs:[
  {id:'j',name:'Judgement',single:true,terms:[
   ['recent decisions consistent with stated goals and safety','Anchored to decisions rather than a bare adjective.',1],
   ['decision made in consultation with family or community, consistent with client stated values','Collective decision-making is not impaired judgement.',1],
   ['a specific recent decision inconsistent with stated goals, discussed in session','Names that there is a specific decision, and that you raised it.']]}]}
]
