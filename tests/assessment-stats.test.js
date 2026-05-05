import { describe, it, expect } from 'vitest';
import {
  mean,
  stdev,
  cohenD,
  normalizedLearningGain,
  passRate,
  interpretCohen,
} from '../src/algorithms/assessment-stats.js';

describe('Descriptive stats', () => {
  it('mean of [1,2,3,4,5] = 3', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
  });
  it('mean of [] = 0', () => {
    expect(mean([])).toBe(0);
  });
  it('stdev of [2,4,4,4,5,5,7,9] ≈ 2.138', () => {
    expect(stdev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.138, 2);
  });
  it('stdev of single value = 0', () => {
    expect(stdev([5])).toBe(0);
  });
});

describe("Cohen's d", () => {
  it('identical groups ⇒ d ≈ 0', () => {
    expect(cohenD([5, 5, 5, 5], [5, 5, 5, 5])).toBe(0);
  });
  it('post > pre ⇒ positive d', () => {
    const pre = [50, 55, 60, 52, 58];
    const post = [80, 85, 82, 88, 84];
    expect(cohenD(pre, post)).toBeGreaterThan(0.8); // large effect
  });
  it('returns 0 on insufficient data', () => {
    expect(cohenD([1], [2])).toBe(0);
    expect(cohenD([], [1, 2])).toBe(0);
  });
  it('interpretation: 0.3 ⇒ small', () => {
    expect(interpretCohen(0.3)).toBe('small');
  });
  it('interpretation: 0.6 ⇒ medium', () => {
    expect(interpretCohen(0.6)).toBe('medium');
  });
  it('interpretation: 1.2 ⇒ large', () => {
    expect(interpretCohen(1.2)).toBe('large');
  });
});

describe('Normalized Learning Gain (Hake)', () => {
  it('pre 50 → post 75 (max 100) ⇒ NLG = 0.5', () => {
    expect(normalizedLearningGain(50, 75, 100)).toBeCloseTo(0.5, 5);
  });
  it('pre 60 → post 90 ⇒ NLG = 0.75', () => {
    expect(normalizedLearningGain(60, 90, 100)).toBeCloseTo(0.75, 5);
  });
  it('ceiling effect: pre = max ⇒ 0', () => {
    expect(normalizedLearningGain(100, 100, 100)).toBe(0);
  });
  it('negative gain (post < pre)', () => {
    expect(normalizedLearningGain(80, 70, 100)).toBeCloseTo(-0.5, 5);
  });
});

describe('Pass rate', () => {
  it('60% pass at cutoff 70', () => {
    expect(passRate([50, 70, 75, 80, 90], 70)).toBeCloseTo(0.8, 5);
  });
  it('empty list ⇒ 0', () => {
    expect(passRate([], 70)).toBe(0);
  });
});
