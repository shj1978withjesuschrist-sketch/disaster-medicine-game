import { describe, it, expect } from 'vitest';
import { classifyStart, scoreTriageDecision, TRIAGE } from '../src/algorithms/triage.js';

describe('START triage algorithm', () => {
  it('ambulatory patient ⇒ MINOR', () => {
    expect(classifyStart({ canWalk: true, breathing: true, respirationRate: 18 })).toBe(
      TRIAGE.MINOR,
    );
  });

  it('non-breathing after airway ⇒ DECEASED', () => {
    expect(classifyStart({ canWalk: false, breathing: false })).toBe(TRIAGE.DECEASED);
  });

  it('RR > 30 ⇒ IMMEDIATE', () => {
    expect(
      classifyStart({
        canWalk: false,
        breathing: true,
        respirationRate: 36,
        capillaryRefill: 1,
        radialPulse: 110,
        obeysCommands: true,
      }),
    ).toBe(TRIAGE.IMMEDIATE);
  });

  it('absent radial pulse ⇒ IMMEDIATE', () => {
    expect(
      classifyStart({
        canWalk: false,
        breathing: true,
        respirationRate: 22,
        capillaryRefill: 1,
        radialPulse: null,
        obeysCommands: true,
      }),
    ).toBe(TRIAGE.IMMEDIATE);
  });

  it('capillary refill > 2s ⇒ IMMEDIATE', () => {
    expect(
      classifyStart({
        canWalk: false,
        breathing: true,
        respirationRate: 24,
        capillaryRefill: 4,
        radialPulse: 120,
        obeysCommands: true,
      }),
    ).toBe(TRIAGE.IMMEDIATE);
  });

  it('not following commands ⇒ IMMEDIATE', () => {
    expect(
      classifyStart({
        canWalk: false,
        breathing: true,
        respirationRate: 20,
        capillaryRefill: 1,
        radialPulse: 90,
        obeysCommands: false,
      }),
    ).toBe(TRIAGE.IMMEDIATE);
  });

  it('stable non-ambulatory ⇒ DELAYED', () => {
    expect(
      classifyStart({
        canWalk: false,
        breathing: true,
        respirationRate: 18,
        capillaryRefill: 1,
        radialPulse: 80,
        obeysCommands: true,
      }),
    ).toBe(TRIAGE.DELAYED);
  });

  it('throws on null patient', () => {
    expect(() => classifyStart(null)).toThrow();
  });
});

describe('Triage scoring', () => {
  it('exact match ⇒ correct/exact', () => {
    expect(scoreTriageDecision(TRIAGE.IMMEDIATE, TRIAGE.IMMEDIATE)).toEqual({
      correct: true,
      severity: 'exact',
    });
  });

  it('classifying IMMEDIATE as DELAYED ⇒ critical', () => {
    expect(scoreTriageDecision(TRIAGE.DELAYED, TRIAGE.IMMEDIATE).severity).toBe('critical');
  });

  it('classifying IMMEDIATE as MINOR ⇒ critical', () => {
    expect(scoreTriageDecision(TRIAGE.MINOR, TRIAGE.IMMEDIATE).severity).toBe('critical');
  });

  it('over-triage MINOR → DELAYED', () => {
    expect(scoreTriageDecision(TRIAGE.DELAYED, TRIAGE.MINOR).severity).toBe('over');
  });

  it('under-triage DELAYED → MINOR', () => {
    expect(scoreTriageDecision(TRIAGE.MINOR, TRIAGE.DELAYED).severity).toBe('under');
  });
});
