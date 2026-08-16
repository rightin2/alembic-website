import { emptyRiskState, setBranch, toggleTerm, setOwnLine, toRiskBlock } from './riskState.js'
import { serialiseRiskBlock, isRiskBlockComplete } from './riskBlock.js'
let fails=0
const t=(n,ok,d)=>{ok?console.log('PASS '+n):(fails++,console.error('FAIL '+n+(d?'\n  '+d:'')))}

// bug 1: own line on not-assessed branch must survive
let s=setBranch(emptyRiskState(),'not_assessed')
s=toggleTerm(s,'na','r','the client was not present')
s=setOwnLine(s,null,null,'Client did not attend; two calls and a message left.')
let b=toRiskBlock(s)
t('bug1 own line serialises on not-assessed', b.notAssessedReason.includes('two calls'), JSON.stringify(b))

// bug 2: actions on not-assessed branch
let s2=setBranch(emptyRiskState(),'not_assessed')
s2=toggleTerm(s2,'na','r','the client was not present')
s2=toggleTerm(s2,'act','es','discussed with supervisor')
s2=toggleTerm(s2,'act','fu','next appointment brought forward')
const b2=toRiskBlock(s2), out2=serialiseRiskBlock(b2)
t('bug2 actions serialise on not-assessed', out2.some(l=>l.startsWith('Actions:')&&l.includes('supervisor')), out2.join(' | '))
t('bug2 no false Actions: None', !out2.includes('Actions: None'), out2.join(' | '))

// bug 4: empty lines omitted, not asserted
let s3=setBranch(emptyRiskState(),'assessed')
s3=toggleTerm(s3,'enq','si','denied on direct enquiry')
const out3=serialiseRiskBlock(toRiskBlock(s3))
t('empty outcome omitted not "Not provided"', !out3.some(l=>l.includes('Not provided')), out3.join(' | '))
t('assessed line always present', out3[0].startsWith('Assessed:'), out3.join(' | '))

// safety: no branch => nothing serialises
t('no branch produces nothing', serialiseRiskBlock(toRiskBlock(emptyRiskState()))===null)
// safety: branch without reason => incomplete
t('not-assessed without reason incomplete', !isRiskBlockComplete(toRiskBlock(setBranch(emptyRiskState(),'not_assessed'))))
process.exit(fails?1:0)
