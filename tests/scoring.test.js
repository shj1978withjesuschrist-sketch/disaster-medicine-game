import { describe, it, expect } from 'vitest';
import {
  xpForLevel,
  levelFromXp,
  computeTriagePoints,
  updateStreak,
  applyMultiplier,
} from '../src/algorithms/scoring.js';

describe('XP / Level', () => {
  it('Level 1 requires 0 XP', () => {
    expect(xpForLevel(1)).toBe(0);
  });
  it('Level 2 requires 100 XP', () => {
    expect(xpForLevel(2)).toBe(100);
  });
  it('Level 3 requires 240 XP (100 + 140)', () => {
    expect(xpForLevel(3)).toBe(240);
  });
  it('levelFromXp(0) ⇒ 1', () => {
    expect(levelFromXp(0)).toBe(1);
  });
  it('levelFromXp(99) ⇒ 1', () => {
    expect(levelFromXp(99)).toBe(1);
  });
  it('levelFromXp(100) ⇒ 2', () => {
    expect(levelFromXp(100)).toBe(2);
  });
  it('levelFromXp(500) ⇒ ≥3', () => {
    expect(levelFromXp(500)).toBeGreaterThanOrEqual(3);
  });
});

describe('Triage points', () => {
  it('exact + zero time ⇒ base + max bonus', () => {
    const pts = computeTriagePoints({ correct: true, severity: 'exact' }, 0);
    expect(pts).toBe(150); // 100 base + 50 bonus
  });
  it('exact at time limit ⇒ base only', () => {
    const pts = computeTriagePoints({ correct: true, severity: 'exact' }, 10000);
    expect(pts).toBe(100);
  });
  it('critical error ⇒ -50 penalty', () => {
    expect(computeTriagePoints({ correct: false, severity: 'critical' }, 1000)).toBe(-50);
  });
  it('over-triage ⇒ partial credit (30)', () => {
    expect(computeTriagePoints({ correct: false, severity: 'over' }, 1000)).toBe(30);
  });
  it('under-triage ⇒ minimal credit (10)', () => {
    expect(computeTriagePoints({ correct: false, severity: 'under' }, 1000)).toBe(10);
  });
});

describe('Streak', () => {
  it('correct increases streak', () => {
    expect(updateStreak(2, true)).toEqual({ streak: 3, multiplier: 1.2 });
  });
  it('incorrect resets streak', () => {
    expect(updateStreak(7, false)).toEqual({ streak: 0, multiplier: 1 });
  });
  it('5-streak ⇒ 1.5x', () => {
    expect(updateStreak(4, true).multiplier).toBe(1.5);
  });
  it('10-streak ⇒ 2x', () => {
    expect(updateStreak(9, true).multiplier).toBe(2);
  });
  it('applyMultiplier floors result', () => {
    expect(applyMultiplier(100, 1.5)).toBe(150);
    expect(applyMultiplier(33, 1.2)).toBe(39);
  });
  it('penalty unaffected by multiplier', () => {
    expect(applyMultiplier(-50, 2)).toBe(-50);
  });
});
