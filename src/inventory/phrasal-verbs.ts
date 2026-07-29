import type { CefrLevel } from '@/skill-graph/types'

/**
 * Curated CEFR levels for the common English phrasal verbs.
 *
 * WHY THIS EXISTS
 *
 * No open-licensed source levels phrasal verbs. CEFR-J contains only 19
 * multi-word entries of phrasal shape, and most are prepositions ("next to")
 * or adjectives ("fed up"); the only true phrasal verbs it holds are rare
 * literary ones — eke out, mull over, dole out, glory in, all C2. The common
 * everyday verbs a learner meets constantly are entirely absent.
 *
 * Deriving them from component words does not work either. "give up" and
 * "go to" are both two A1 words, but one means "quit" and the other means
 * exactly what it says. Two attempts to distinguish them from WordNet data
 * (definition glosses, tagged-sense frequency) both failed.
 *
 * So they are authored here, which is what every ELT publisher does.
 *
 * LEVELLING PRINCIPLE
 *
 *   A1  transparent, physical, taught in the first lessons
 *   A2  high-frequency daily life; lightly idiomatic at most
 *   B1  common but genuinely idiomatic — meaning is not the sum of the parts
 *   B2  less frequent, more abstract, workplace and academic register
 *   C1  infrequent, formal, or strongly idiomatic
 *   C2  rare and literary
 *
 * Transparent phrases are listed deliberately. Without an entry, "go to" and
 * "live in" fall through to derivation and get inflated to B1, which made a
 * beginner sentence profile as intermediate. Listing them at A1 is the fix.
 *
 * CONFIDENCE
 *
 * These carry 0.9, not 1. They are considered expert judgement rather than
 * corpus evidence, and they should be checked by a qualified teacher during
 * content review. Consistency with CEFR-J's own C2 assignments (eke out,
 * mull over, dole out) is a small check that the scale matches theirs.
 */

export const CURATED_PHRASAL_VERB_CONFIDENCE = 0.9

export const CURATED_PHRASAL_VERBS: Record<string, CefrLevel> = {
  // ---- A1 — transparent, physical, first lessons -------------------------
  'get up': 'A1',
  'sit down': 'A1',
  'stand up': 'A1',
  'come in': 'A1',
  'come back': 'A1',
  'go back': 'A1',
  'go out': 'A1',
  'go to': 'A1',
  'live in': 'A1',
  'look at': 'A1',
  'listen to': 'A1',
  'talk to': 'A1',
  'wait for': 'A1',
  'come from': 'A1',
  'wake up': 'A1',
  'put on': 'A1',
  'take off': 'A1',
  'turn on': 'A1',
  'turn off': 'A1',
  'get in': 'A1',
  'get out': 'A1',
  'go in': 'A1',
  'sit up': 'A1',
  'walk to': 'A1',
  'point at': 'A1',

  // ---- A2 — everyday, high frequency, lightly idiomatic ------------------
  'look for': 'A2',
  'pick up': 'A2',
  'put away': 'A2',
  'put down': 'A2',
  'try on': 'A2',
  'grow up': 'A2',
  'go away': 'A2',
  'run away': 'A2',
  'throw away': 'A2',
  'get on': 'A2',
  'get off': 'A2',
  'take out': 'A2',
  'bring back': 'A2',
  'give back': 'A2',
  'come down': 'A2',
  'go down': 'A2',
  'go up': 'A2',
  'come up': 'A2',
  'fill in': 'A2',
  'write down': 'A2',
  'hang up': 'A2',
  'check in': 'A2',
  'check out': 'A2',
  'clean up': 'A2',
  'wash up': 'A2',
  'hurry up': 'A2',
  'turn around': 'A2',
  'come over': 'A2',
  'go away with': 'A2',
  'look around': 'A2',
  'put up': 'A2',
  'cut out': 'A2',
  'move in': 'A2',
  'move out': 'A2',
  'call back': 'A2',
  'ask for': 'A2',
  'belong to': 'A2',
  'depend on': 'A2',
  'pay for': 'A2',
  'think about': 'A2',
  'worry about': 'A2',

  // ---- B1 — common but genuinely idiomatic -------------------------------
  'give up': 'B1',
  'find out': 'B1',
  'look after': 'B1',
  'carry on': 'B1',
  'go on': 'B1',
  'look forward to': 'B1',
  'get on with': 'B1',
  'deal with': 'B1',
  'take care of': 'B1',
  'run out of': 'B1',
  'break down': 'B1',
  'put up with': 'B1',
  'look up': 'B1',
  'get over': 'B1',
  'hold on': 'B1',
  'hang on': 'B1',
  'make up': 'B1',
  'set off': 'B1',
  'take up': 'B1',
  'turn down': 'B1',
  'work out': 'B1',
  'turn out': 'B1',
  'get along': 'B1',
  'get through': 'B1',
  'put off': 'B1',
  'take part in': 'B1',
  'look out': 'B1',
  'pass away': 'B1',
  'put out': 'B1',
  'set out': 'B1',
  'show up': 'B1',
  'take back': 'B1',
  'warm up': 'B1',
  'keep up': 'B1',
  'give in': 'B1',
  'go ahead': 'B1',
  'come round': 'B1',
  'end up': 'B1',
  'fall out': 'B1',
  'get away': 'B1',
  'give away': 'B1',
  'go off': 'B1',
  'hold up': 'B1',
  'let down': 'B1',
  'look through': 'B1',
  'run into': 'B1',
  'take after': 'B1',
  'tell off': 'B1',
  'turn up': 'B1',

  // ---- B2 — abstract, workplace and academic register --------------------
  'carry out': 'B2',
  'bring up': 'B2',
  'point out': 'B2',
  'set up': 'B2',
  'come up with': 'B2',
  'take on': 'B2',
  'bring about': 'B2',
  'call off': 'B2',
  'cut down on': 'B2',
  'do without': 'B2',
  'figure out': 'B2',
  'go through': 'B2',
  'put forward': 'B2',
  'rule out': 'B2',
  'sort out': 'B2',
  'stand out': 'B2',
  'back up': 'B2',
  'break out': 'B2',
  'bring in': 'B2',
  'come about': 'B2',
  'come across': 'B2',
  'draw up': 'B2',
  'drop out': 'B2',
  'get by': 'B2',
  'lay off': 'B2',
  'live up to': 'B2',
  'look down on': 'B2',
  'look into': 'B2',
  'make out': 'B2',
  'pull off': 'B2',
  'put together': 'B2',
  'take over': 'B2',
  'turn into': 'B2',
  'break up': 'B2',
  'call for': 'B2',
  'carry through': 'B2',
  'cut off': 'B2',
  'hand in': 'B2',
  'hand out': 'B2',
  'let off': 'B2',
  'make up for': 'B2',
  'set aside': 'B2',
  'stick to': 'B2',
  'take in': 'B2',
  'work on': 'B2',

  // ---- C1 — infrequent, formal, strongly idiomatic -----------------------
  'account for': 'C1',
  'bank on': 'C1',
  'brush up on': 'C1',
  'come down to': 'C1',
  'get around to': 'C1',
  'hold back': 'C1',
  'iron out': 'C1',
  'keep up with': 'C1',
  'pin down': 'C1',
  'wear off': 'C1',
  'wind up': 'C1',
  'bear out': 'C1',
  'boil down to': 'C1',
  'cash in on': 'C1',
  'clamp down on': 'C1',
  'fall back on': 'C1',
  'gloss over': 'C1',
  'lash out': 'C1',
  'level off': 'C1',
  'opt out': 'C1',
  'phase out': 'C1',
  'ramp up': 'C1',
  'shore up': 'C1',
  'tail off': 'C1',
  'thrash out': 'C1',
  'weed out': 'C1',
  'bulk up': 'C1',
  'turn to': 'C1',
  'pertain to': 'C1',

  // ---- C2 — rare and literary --------------------------------------------
  // These four match CEFR-J's own assignments, which is a check that this
  // scale is calibrated to theirs rather than drifting.
  'eke out': 'C2',
  'mull over': 'C2',
  'dole out': 'C2',
  'glory in': 'C2',
  'hark back to': 'C2',
  'reel off': 'C2',
  'knuckle down': 'C2',
  'egg on': 'C2',
  'chalk up': 'C2',
}
