/**
 * Educational assessment statistics — Cohen's d, NLG, descriptive stats.
 * Mirrors the Python implementation in api_server.py for client-side preview.
 *
 * @module algorithms/assessment-stats
 */

/**
 * Sample mean.
 * @param {number[]} arr
 * @returns {number}
 */
export function mean(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  return arr.reduce((s, x) => s + x, 0) / arr.length;
}

/**
 * Sample standard deviation (Bessel's correction, n-1).
 * @param {number[]} arr
 * @returns {number}
 */
export function stdev(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return 0;
  const m = mean(arr);
  const variance = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

/**
 * Cohen's d effect size (pooled SD).
 * Interpretation: 0.2=small, 0.5=medium, 0.8=large (Cohen 1988).
 * @param {number[]} g1
 * @param {number[]} g2
 * @returns {number}
 */
export function cohenD(g1, g2) {
  if (!Array.isArray(g1) || !Array.isArray(g2)) return 0;
  if (g1.length < 2 || g2.length < 2) return 0;
  const m1 = mean(g1),
    m2 = mean(g2);
  const s1 = stdev(g1),
    s2 = stdev(g2);
  const n1 = g1.length,
    n2 = g2.length;
  const pooled = Math.sqrt(((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2));
  if (pooled === 0) return 0;
  return (m2 - m1) / pooled;
}

/**
 * Normalized Learning Gain (Hake 1998).
 * NLG = (post - pre) / (max - pre)
 * @param {number} pre
 * @param {number} post
 * @param {number} [max=100]
 * @returns {number}
 */
export function normalizedLearningGain(pre, post, max = 100) {
  if (pre >= max) return 0;
  return (post - pre) / (max - pre);
}

/**
 * Pass-rate proportion above a cutoff.
 * @param {number[]} scores
 * @param {number} cutoff
 * @returns {number} 0..1
 */
export function passRate(scores, cutoff = 70) {
  if (!Array.isArray(scores) || scores.length === 0) return 0;
  return scores.filter((s) => s >= cutoff).length / scores.length;
}

/**
 * Interpret Cohen's d magnitude.
 * @param {number} d
 * @returns {('negligible'|'small'|'medium'|'large')}
 */
export function interpretCohen(d) {
  const abs = Math.abs(d);
  if (abs < 0.2) return 'negligible';
  if (abs < 0.5) return 'small';
  if (abs < 0.8) return 'medium';
  return 'large';
}
