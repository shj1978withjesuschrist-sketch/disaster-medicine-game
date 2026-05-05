/**
 * START Triage Algorithm (Simple Triage And Rapid Treatment)
 * Reference: Super et al. 1994; FEMA NIMS 2008
 *
 * @module algorithms/triage
 */

/**
 * @typedef {Object} Patient
 * @property {boolean} [canWalk]            - Ambulatory? (Step 1)
 * @property {boolean} [breathing]          - Spontaneous respiration?
 * @property {number}  [respirationRate]    - Breaths/min (after airway repositioning)
 * @property {number}  [capillaryRefill]    - Seconds (>2 = poor perfusion)
 * @property {number|null} [radialPulse]    - bpm; null = absent
 * @property {boolean} [obeysCommands]      - Mental status — follows simple commands?
 */

/**
 * @typedef {('IMMEDIATE'|'DELAYED'|'MINOR'|'DECEASED')} TriageCategory
 */

export const TRIAGE = Object.freeze({
  IMMEDIATE: 'IMMEDIATE', // RED
  DELAYED: 'DELAYED', // YELLOW
  MINOR: 'MINOR', // GREEN
  DECEASED: 'DECEASED', // BLACK
});

export const TRIAGE_COLOR = Object.freeze({
  IMMEDIATE: '#D55E00',
  DELAYED: '#F0E442',
  MINOR: '#009E73',
  DECEASED: '#1a1a1a',
});

/**
 * Classify a patient using the START algorithm.
 * Decision order: walk → breathing → RR → perfusion → mental status.
 *
 * @param {Patient | null | undefined} p
 * @returns {TriageCategory}
 */
export function classifyStart(p) {
  if (!p || typeof p !== 'object') {
    throw new TypeError('classifyStart: patient required');
  }
  // Step 1 — ambulatory ⇒ MINOR (green)
  if (p.canWalk === true) return TRIAGE.MINOR;

  // Step 2 — breathing
  if (!p.breathing) {
    // After repositioning airway: still no breathing ⇒ DECEASED
    return TRIAGE.DECEASED;
  }

  // Step 3 — respiration rate (>30 ⇒ IMMEDIATE)
  if (typeof p.respirationRate === 'number' && p.respirationRate > 30) {
    return TRIAGE.IMMEDIATE;
  }

  // Step 4 — perfusion
  // Capillary refill > 2s OR absent radial pulse ⇒ IMMEDIATE
  const poorRefill = typeof p.capillaryRefill === 'number' && p.capillaryRefill > 2;
  const noPulse = p.radialPulse === null || p.radialPulse === 0;
  if (poorRefill || noPulse) return TRIAGE.IMMEDIATE;

  // Step 5 — mental status
  if (p.obeysCommands === false) return TRIAGE.IMMEDIATE;

  // Otherwise ⇒ DELAYED (yellow)
  return TRIAGE.DELAYED;
}

/**
 * Score a learner's triage decision against the gold standard.
 * @param {TriageCategory} learnerAnswer
 * @param {TriageCategory} goldStandard
 * @returns {{ correct: boolean, severity: 'exact'|'over'|'under'|'critical' }}
 */
export function scoreTriageDecision(learnerAnswer, goldStandard) {
  if (learnerAnswer === goldStandard) {
    return { correct: true, severity: 'exact' };
  }
  // Severity grades — under-triage is more dangerous than over-triage
  const order = [TRIAGE.MINOR, TRIAGE.DELAYED, TRIAGE.IMMEDIATE, TRIAGE.DECEASED];
  const li = order.indexOf(learnerAnswer);
  const gi = order.indexOf(goldStandard);
  if (li === -1 || gi === -1) return { correct: false, severity: 'critical' };
  // Under-triage: classified less urgent than truth
  if (li < gi) {
    // Missing IMMEDIATE classification is a critical patient-safety error
    if (goldStandard === TRIAGE.IMMEDIATE) return { correct: false, severity: 'critical' };
    return { correct: false, severity: 'under' };
  }
  return { correct: false, severity: 'over' };
}
