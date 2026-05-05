/**
 * Game scoring, XP, level, and streak logic.
 * Pure functions — no DOM, no globals.
 *
 * @module algorithms/scoring
 */

export const LEVEL_XP_BASE = 100;
export const LEVEL_XP_GROWTH = 1.4;

/**
 * XP threshold to reach a given level.
 * Level 1 → 0, Level 2 → 100, Level 3 → 240, Level 4 → 436...
 * @param {number} level (1-based)
 * @returns {number}
 */
export function xpForLevel(level) {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += Math.floor(LEVEL_XP_BASE * Math.pow(LEVEL_XP_GROWTH, i - 1));
  }
  return total;
}

/**
 * Determine current level from cumulative XP.
 * @param {number} xp
 * @returns {number} level (1-based)
 */
export function levelFromXp(xp) {
  if (typeof xp !== 'number' || xp < 0) return 1;
  let lvl = 1;
  while (xpForLevel(lvl + 1) <= xp) lvl++;
  return lvl;
}

/**
 * Award points based on triage correctness + speed bonus.
 * @param {{correct: boolean, severity: string}} result
 * @param {number} responseMs - Time taken in milliseconds
 * @param {{base?: number, timeLimit?: number}} [opts]
 * @returns {number}
 */
export function computeTriagePoints(result, responseMs, opts = {}) {
  const base = opts.base ?? 100;
  const timeLimitMs = opts.timeLimit ?? 10000;
  if (result.severity === 'critical') return -50;
  if (result.severity === 'under') return 10;
  if (result.severity === 'over') return 30;
  if (!result.correct) return 0;
  // Exact correct: base + speed bonus (0..50)
  const speedRatio = Math.max(0, 1 - responseMs / timeLimitMs);
  const speedBonus = Math.floor(50 * speedRatio);
  return base + speedBonus;
}

/**
 * Update streak counter based on correct/incorrect answer.
 * @param {number} currentStreak
 * @param {boolean} isCorrect
 * @returns {{streak: number, multiplier: number}}
 */
export function updateStreak(currentStreak, isCorrect) {
  if (!isCorrect) return { streak: 0, multiplier: 1 };
  const streak = currentStreak + 1;
  // Multiplier tiers: 3=1.2x, 5=1.5x, 10=2x
  let multiplier = 1;
  if (streak >= 10) multiplier = 2;
  else if (streak >= 5) multiplier = 1.5;
  else if (streak >= 3) multiplier = 1.2;
  return { streak, multiplier };
}

/**
 * Apply streak multiplier to base points.
 * @param {number} basePoints
 * @param {number} multiplier
 * @returns {number}
 */
export function applyMultiplier(basePoints, multiplier) {
  if (basePoints <= 0) return basePoints;
  return Math.floor(basePoints * multiplier);
}
