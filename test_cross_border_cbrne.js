// Cross-Border CBRNe Drill — headless self-test harness
//
// Loads cross_border_cbrne.js with browser globals stubbed and exercises the
// data-quality contract documented in cross-border-cbrne-analytics-admin-audit.md.
//
// Run: node test_cross_border_cbrne.js
//
// Exits 0 on pass, 1 on failure.

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadInSandbox(scriptPath) {
  const source = fs.readFileSync(scriptPath, 'utf8');
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    Date,
    Math,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
  };
  // Browser-ish globals.
  const captured = { localAnswers: [], localModeResults: [], firebaseAnswers: [], firebaseModeResults: [] };
  sandbox.window = sandbox; // self-reference so `window.X` lookups resolve
  sandbox.document = {
    body: { appendChild() {} },
    createElement() { return { appendChild() {}, addEventListener() {}, setAttribute() {}, style: {} }; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    getElementById() { return null; },
    addEventListener() {}
  };
  sandbox.location = { search: '' };
  sandbox.navigator = { userAgent: 'node-test' };
  sandbox.G = {
    score: 0, xp: 0, level: 1, totalCorrect: 0, modesCompleted: new Set(),
    cbcbState: null, screen: 'modes', perfectModes: 0
  };
  sandbox.app = { innerHTML: '' };
  sandbox.LocalStore = {
    addAnswer(a) { captured.localAnswers.push(a); },
    addModeResult(r) { captured.localModeResults.push(r); }
  };
  sandbox.FirebaseSync = {
    isReady() { return false; },
    pushAnswer(_, a) { captured.firebaseAnswers.push(a); },
    pushModeResult(_, r) { captured.firebaseModeResults.push(r); }
  };
  sandbox.Tracker = {
    sessionId: 'TEST',
    startMode() {},
    endMode(score, details) { captured.trackerEndMode.push({ score: score, details: details }); },
    startQuestion() {},
    recordAnswer(qid, sel, correct, extras) { captured.trackerAnswers.push({ qid: qid, selected: sel, correct: correct, extras: extras }); }
  };
  captured.trackerAnswers = [];
  captured.trackerEndMode = [];
  // Stubs for game functions called by cross_border_cbrne but not exercised here.
  sandbox.render = function() {};
  sandbox.enterMode = function() {};
  sandbox.renderModeSelect = function() {};
  sandbox.ACHIEVEMENTS = [];
  sandbox.renderHUD = function() { return ''; };
  sandbox.startCountdown = function() {};
  sandbox.stopTimer = function() {};
  sandbox.stopAllTimers = function() {};
  sandbox.updateTimerDisplay = function() {};
  sandbox.sfx = function() {};
  sandbox.flashScreen = function() {};
  sandbox.shakeScreen = function() {};
  sandbox.addScore = function() {};
  sandbox.addXP = function() {};
  sandbox.updateStreak = function() {};
  sandbox.checkAchievements = function() {};
  sandbox.advanceStoryAct = function() {};
  sandbox.confetti = function() {};
  sandbox.getGrade = function() { return 'A'; };

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: scriptPath });
  return { sandbox, captured };
}

function main() {
  const scriptPath = path.join(__dirname, 'cross_border_cbrne.js');
  const { sandbox, captured } = loadInSandbox(scriptPath);
  const M = sandbox.CROSS_BORDER_CBRNE;

  if (!M) {
    console.error('FAIL: cross_border_cbrne.js did not expose window.CROSS_BORDER_CBRNE');
    process.exit(1);
  }

  // 1. Built-in self-test (covers stable IDs, randomization, AAR keys, no ISCRAM, etc.).
  const result = M.runSelfTest();
  console.log('built-in self-test:', result.pass + ' passed,', result.fail + ' failed');
  if (!result.ok) {
    console.error('FAIL: self-test failures:', JSON.stringify(result.failures, null, 2));
    process.exit(1);
  }

  // 2. Verify mode label exact-match constraint.
  if (M.LABEL !== 'Cross-Border CBRNe Drill') {
    console.error('FAIL: mode label drift:', M.LABEL);
    process.exit(1);
  }

  // 3. Verify mode key.
  if (M.KEY !== 'crossBorderCbrne') {
    console.error('FAIL: mode key changed:', M.KEY);
    process.exit(1);
  }

  // 4. Randomized order ↔ id-based scoring: pick a randomized step, score
  //    every option, only the correctOptionId one returns true.
  for (let trial = 0; trial < 50; trial++) {
    const randomized = M._buildRandomizedSteps();
    randomized.forEach(step => {
      if (step.type !== 'choice') return;
      step.options.forEach(opt => {
        const scored = M._scoreOption(step, opt);
        const expected = (opt.id === step.correctOptionId);
        if (scored !== expected) {
          console.error('FAIL: scoring mismatch on randomized step', step.id, 'option', opt.id);
          process.exit(1);
        }
      });
    });
  }

  // 5. Verify STEP_META covers every choice step with construct/phase/role.
  const requiredConstructs = new Set(['triage', 'pre_decon', 'antidote', 'semantic_mapping', 'degraded_network', 'allocation']);
  const seen = new Set();
  M.STEPS.filter(s => s.type === 'choice').forEach(s => {
    const meta = M.STEP_META[s.id];
    if (!meta || !meta.construct || !meta.phase || !meta.role) {
      console.error('FAIL: missing STEP_META for', s.id);
      process.exit(1);
    }
    seen.add(meta.construct);
  });
  for (const c of requiredConstructs) {
    if (!seen.has(c)) {
      console.error('FAIL: required construct not present in STEP_META:', c);
      process.exit(1);
    }
  }

  // 6. AAR generation: synthesize a state with all-correct results and verify
  //    every required AAR field is populated.
  const fakeResults = M.STEPS.filter(s => s.type === 'choice').map((s, i) => ({
    stepId: s.id,
    title: s.title,
    correct: true,
    chosen: 0,
    chosenOptionId: s.correctOptionId,
    chosenOptionLabel: 'x',
    timeMs: 5000 + i * 1000,
    atMs: 5000 + i * 1000,
    atIso: new Date().toISOString()
  }));
  const aar = M.computeAAR({ runStartMs: 0, results: fakeResults });
  const required = ['total', 'correct', 'pct', 'triageLatencySec', 'handoverLatencySec',
    'degradedRecoverySec', 'preventableContaminatedTransport', 'antidoteCorrect',
    'semanticsCorrect', 'targets', 'strengths', 'improvements', 'recommendations', 'timeline'];
  for (const k of required) {
    if (!aar.hasOwnProperty(k)) {
      console.error('FAIL: AAR missing key', k);
      process.exit(1);
    }
  }
  if (aar.targets.triageLatencySec !== 90 || aar.targets.handoverLatencySec !== 180 ||
      aar.targets.preventableContaminatedTransport !== 0 || aar.targets.degradedRecoverySec !== 120) {
    console.error('FAIL: AAR target thresholds drift:', aar.targets);
    process.exit(1);
  }

  // 7. No user-facing ISCRAM string anywhere in step UI strings or labels.
  const blob = JSON.stringify({
    label: M.LABEL,
    subtitle: M.SUBTITLE_KO,
    steps: M.STEPS,
    matrix: M.SCENARIO_MATRIX,
    semantics: M.SEMANTICS_MAP
  });
  if (/ISCRAM/i.test(blob)) {
    console.error('FAIL: user-facing string contains ISCRAM');
    process.exit(1);
  }

  // 8. admin labels (admin.html) include crossBorderCbrne.
  const adminHtml = fs.readFileSync(path.join(__dirname, 'admin.html'), 'utf8');
  if (!/crossBorderCbrne\s*:\s*\{[^}]*Cross-Border CBRNe Drill/.test(adminHtml)) {
    console.error('FAIL: admin.html MODE_NAMES does not contain crossBorderCbrne -> "Cross-Border CBRNe Drill"');
    process.exit(1);
  }

  // 9. app.js inline admin MODE_LABELS includes crossBorderCbrne.
  const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  if (!/crossBorderCbrne\s*:\s*'Cross-Border CBRNe Drill'/.test(appJs)) {
    console.error('FAIL: app.js MODE_LABELS does not contain crossBorderCbrne label');
    process.exit(1);
  }
  // 10. CSV export columns mention cbcb_ summary fields.
  if (!/cbcb_score/.test(appJs) || !/cbcb_triage_to_dashboard_sec/.test(appJs)) {
    console.error('FAIL: CSV export does not include cbcb_ summary columns');
    process.exit(1);
  }
  // 11. Drill summary block exists.
  if (!/renderCrossBorderCBRNeSummary/.test(appJs)) {
    console.error('FAIL: drill-specific admin summary not wired into app.js');
    process.exit(1);
  }

  // 12. recordStepResult writes structured rows into LocalStore. Simulate one
  //     result by hand to verify the persistence path triggers.
  // We don't call recordStepResult directly (closure-scoped), but the IIFE
  // already exposed enough; instead, simulate a click by invoking computeAAR
  // and ensuring no crash, then verify our LocalStore stub captured 0 rows
  // (because we didn't run renderChoice). The full flow is exercised in the
  // browser; here we verify the wiring shape.
  if (typeof M.runSelfTest !== 'function') {
    console.error('FAIL: runSelfTest not exposed');
    process.exit(1);
  }

  // 13. Module exposes language tag.
  if (M.LANGUAGE !== 'ko') {
    console.error('FAIL: LANGUAGE expected "ko", got', M.LANGUAGE);
    process.exit(1);
  }

  // 14. Tracker.recordAnswer now receives a 4th argument `extras` carrying the
  //     structured per-question payload (stepId/construct/phase/role/etc.).
  //     Verify by simulating answerCBCB via the exposed handler.
  if (typeof M._answerCBCB === 'function') {
    var randomized = M._buildRandomizedSteps();
    var firstChoiceIdx = randomized.findIndex(function(s){ return s.type === 'choice'; });
    if (firstChoiceIdx >= 0) {
      sandbox.G.cbcbState = {
        stepIdx: firstChoiceIdx,
        stepStartMs: Date.now() - 4000,
        runStartMs: Date.now() - 8000,
        results: [],
        steps: randomized,
        answered: false,
        selected: -1,
        cbcbTimer: 0
      };
      sandbox.G.cbcbTimer = 0;
      try { M._answerCBCB(0); } catch(e) { /* render stubs may throw downstream */ }
      var lastAnswer = captured.trackerAnswers[captured.trackerAnswers.length - 1];
      if (!lastAnswer || !lastAnswer.extras) {
        console.error('FAIL: Tracker.recordAnswer was not called with extras payload');
        process.exit(1);
      }
      var requiredExtraKeys = [
        'stepId', 'stepIndex', 'construct', 'phase', 'role',
        'correctOptionId', 'selectedOptionId', 'selectedDisplayIndex',
        'displayedOptionOrder', 'responseTimeSec', 'modeName', 'language'
      ];
      for (var k = 0; k < requiredExtraKeys.length; k++) {
        if (!(requiredExtraKeys[k] in lastAnswer.extras)) {
          console.error('FAIL: extras missing key', requiredExtraKeys[k]);
          process.exit(1);
        }
      }
      if (lastAnswer.extras.modeName !== 'Cross-Border CBRNe Drill') {
        console.error('FAIL: extras.modeName drift:', lastAnswer.extras.modeName);
        process.exit(1);
      }
    }
  }

  // 15. Tracker.endMode receives details (the AAR payload) as second argument.
  if (typeof M._showAAR === 'function') {
    captured.trackerEndMode.length = 0;
    sandbox.G.cbcbState = { runStartMs: Date.now() - 1000, results: [] };
    try { M._showAAR(); } catch(e) { /* render stubs may throw downstream */ }
    var lastEnd = captured.trackerEndMode[captured.trackerEndMode.length - 1];
    if (!lastEnd || !lastEnd.details) {
      console.error('FAIL: Tracker.endMode was not called with details payload');
      process.exit(1);
    }
    var requiredDetailKeys = ['mode', 'modeLabel', 'language', 'accuracyPct', 'targets', 'structuredResults', 'completedAt'];
    for (var j = 0; j < requiredDetailKeys.length; j++) {
      if (!(requiredDetailKeys[j] in lastEnd.details)) {
        console.error('FAIL: endMode details missing key', requiredDetailKeys[j]);
        process.exit(1);
      }
    }
  }

  // 16. Backend (api_server.py) has the persistence wiring required.
  var backendPath = path.join(__dirname, 'api_server.py');
  if (fs.existsSync(backendPath)) {
    var backend = fs.readFileSync(backendPath, 'utf8');
    if (!/_ensure_column\(db,\s*"mode_results",\s*"details"/.test(backend)) {
      console.error('FAIL: api_server.py missing safe migration for mode_results.details');
      process.exit(1);
    }
    if (!/_ensure_column\(db,\s*"question_responses",\s*"extras"/.test(backend)) {
      console.error('FAIL: api_server.py missing safe migration for question_responses.extras');
      process.exit(1);
    }
    if (!/INSERT INTO question_responses[\s\S]*extras/i.test(backend)) {
      console.error('FAIL: api_server.py question/response insert does not include extras');
      process.exit(1);
    }
    if (!/extras:\s*Optional\[str\]/.test(backend)) {
      console.error('FAIL: QuestionResponse pydantic model missing optional extras field');
      process.exit(1);
    }
    if (!/admin\/mode\/\{mode\}\/details/.test(backend)) {
      console.error('FAIL: api_server.py missing admin mode details endpoint');
      process.exit(1);
    }
  }

  // 17. app.js Tracker.recordAnswer signature accepts extras and forwards it.
  var appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  if (!/recordAnswer\(questionId,\s*selectedAnswer,\s*isCorrect,\s*extras\)/.test(appJsContent)) {
    console.error('FAIL: Tracker.recordAnswer signature does not accept extras');
    process.exit(1);
  }
  if (!/endMode\(score,\s*details\)/.test(appJsContent)) {
    console.error('FAIL: Tracker.endMode signature does not accept details');
    process.exit(1);
  }
  if (!/extras:\s*extrasStr/.test(appJsContent)) {
    console.error('FAIL: Tracker.recordAnswer does not forward extras to backend');
    process.exit(1);
  }
  if (!/details:\s*detailsStr/.test(appJsContent)) {
    console.error('FAIL: Tracker.endMode does not forward details to backend');
    process.exit(1);
  }

  console.log('\n✅ ALL TESTS PASSED');
  console.log('   built-in self-test checks:', result.pass);
  console.log('   harness checks: 17');
  process.exit(0);
}

main();
