/* =====================================================================
   재난의학 게임 — 학습 효과 측정 모듈 (Phase B)
   ----------------------------------------------------------------------
   Kirkpatrick Model L1~L4 + xAPI/cmi5 + Pre/Post Test
   Based on KArP (Al-Ziftawi 2021) / EPIQ (Wisniewski 2010) instruments
   ===================================================================== */
(function (global) {
  'use strict';

  // ----------- Pre/Post Test Bank (KArP/EPIQ 기반 20문항, KR) -----------
  // K = Knowledge, A = Attitude, R = Readiness, S = Skill
  const TEST_BANK_KR = [
    { id: 'q01', dom: 'K', q: 'START 트리아지에서 호흡수 30회/분을 초과하는 환자의 분류는?', opts: ['적색(즉시)', '황색(지연)', '녹색(경증)', '흑색(사망)'], ans: 0 },
    { id: 'q02', dom: 'K', q: '대량사상자 사고(MCI) 시 의료지휘소(MCP)의 우선 임무는?', opts: ['환자 후송', '현장 통제', '자원 분배 및 트리아지 관리', '언론 대응'], ans: 2 },
    { id: 'q03', dom: 'K', q: 'CBRNE 중 화학(C) 사고 시 일차 제독(decontamination)의 우선순위는?', opts: ['의복 제거 후 물 세척', '항독제 즉시 투여', '심폐소생술', '병원 이송'], ans: 0 },
    { id: 'q04', dom: 'K', q: '방사능 사고(R) 시 노출량을 줄이는 3가지 원칙은?', opts: ['Time, Distance, Shielding', '시간, 약물, 격리', '제독, 항독제, 후송', '인지, 분류, 처치'], ans: 0 },
    { id: 'q05', dom: 'K', q: 'JumpSTART 소아 트리아지에서 무호흡 환자에게 5회 인공호흡 후 자발호흡이 없으면?', opts: ['적색', '황색', '녹색', '흑색'], ans: 3 },
    { id: 'q06', dom: 'K', q: 'ICS(Incident Command System)에서 Operations Section의 책임은?', opts: ['예산 관리', '현장 작전 실행', '언론 브리핑', '인사 관리'], ans: 1 },
    { id: 'q07', dom: 'K', q: '폭발 손상의 1차(Primary) 손상은 주로 어떤 기전인가?', opts: ['파편 충돌', '폭압파(blast wave)', '화상', '이차 낙하'], ans: 1 },
    { id: 'q08', dom: 'K', q: '생물학(B) 테러에서 탄저균 노출 시 표준 예방적 항생제는?', opts: ['Penicillin G', 'Ciprofloxacin 또는 Doxycycline', 'Vancomycin', 'Azithromycin'], ans: 1 },
    { id: 'q09', dom: 'K', q: '화상 환자의 9의 법칙(Rule of Nines)에서 성인 한쪽 다리 전체는 몇 %인가?', opts: ['9%', '13.5%', '18%', '36%'], ans: 2 },
    { id: 'q10', dom: 'K', q: '대량출혈 환자 처치 우선순위(MARCH)에서 M은 무엇인가?', opts: ['Massive hemorrhage', 'Movement', 'Monitoring', 'Medication'], ans: 0 },
    { id: 'q11', dom: 'A', q: '나는 재난 발생 시 자원봉사로 출동할 의향이 있다.', opts: ['전혀 그렇지 않다', '그렇지 않다', '보통이다', '그렇다', '매우 그렇다'], ans: -1, scale: 5 },
    { id: 'q12', dom: 'A', q: '나는 CBRNE 사고 현장에서도 환자 처치를 수행할 자신이 있다.', opts: ['전혀 그렇지 않다', '그렇지 않다', '보통이다', '그렇다', '매우 그렇다'], ans: -1, scale: 5 },
    { id: 'q13', dom: 'A', q: '재난의학 교육은 임상 의료진에게 필수적이다.', opts: ['전혀 그렇지 않다', '그렇지 않다', '보통이다', '그렇다', '매우 그렇다'], ans: -1, scale: 5 },
    { id: 'q14', dom: 'R', q: '나는 START 트리아지를 즉시 시행할 수 있다.', opts: ['전혀 못한다', '못한다', '보통이다', '할 수 있다', '매우 잘 할 수 있다'], ans: -1, scale: 5 },
    { id: 'q15', dom: 'R', q: '나는 ICS 구조 하에서 역할 수행이 가능하다.', opts: ['전혀 못한다', '못한다', '보통이다', '할 수 있다', '매우 잘 할 수 있다'], ans: -1, scale: 5 },
    { id: 'q16', dom: 'R', q: '나는 PPE(개인보호장구) Level C를 5분 내 착용할 수 있다.', opts: ['전혀 못한다', '못한다', '보통이다', '할 수 있다', '매우 잘 할 수 있다'], ans: -1, scale: 5 },
    { id: 'q17', dom: 'K', q: 'HSEEP 훈련 단계에서 SitMan(Situation Manual)의 주된 목적은?', opts: ['평가 보고', '시나리오 배경 제공', '참가자 등록', '예산 관리'], ans: 1 },
    { id: 'q18', dom: 'K', q: 'AAR/IP에서 IP가 의미하는 것은?', opts: ['Initial Phase', 'Improvement Plan', 'Incident Protocol', 'Internal Process'], ans: 1 },
    { id: 'q19', dom: 'K', q: '재난 의료팀이 도착 시 가장 먼저 수행할 임무(LCAN 보고)는?', opts: ['치료 개시', '상황 보고', '후송 시작', '제독 실시'], ans: 1 },
    { id: 'q20', dom: 'K', q: '대량사상자 트리아지에서 검정태그(흑색) 환자에 대한 처치 원칙은?', opts: ['CPR 즉시 시행', '편안한 환경 제공·통증 관리', '응급실 이송', '제독 후 처치'], ans: 1 }
  ];

  // ----------- Kirkpatrick L1 (반응) 만족도 5문항 -----------
  const REACTION_KR = [
    { id: 'r1', q: '본 게임은 학습 동기를 유발했다.', scale: 5 },
    { id: 'r2', q: '시나리오는 실제 상황과 유사했다.', scale: 5 },
    { id: 'r3', q: '게임은 재미있고 몰입도가 높았다.', scale: 5 },
    { id: 'r4', q: '동료에게 추천할 의향이 있다.', scale: 5 },
    { id: 'r5', q: '재난 의료 역량 향상에 도움이 되었다.', scale: 5 }
  ];

  // ----------- Pre/Post Test Bank (EN, parallel structure) -----------
  const TEST_BANK_EN = [
    { id: 'q01', dom: 'K', q: 'In START triage, a patient with respiratory rate over 30/min is classified as:', opts: ['Red (Immediate)', 'Yellow (Delayed)', 'Green (Minor)', 'Black (Deceased)'], ans: 0 },
    { id: 'q02', dom: 'K', q: 'In a Mass Casualty Incident (MCI), the Medical Command Post (MCP)\'s primary role is:', opts: ['Patient transport', 'Scene control', 'Resource allocation & triage management', 'Press response'], ans: 2 },
    { id: 'q03', dom: 'K', q: 'In a chemical (C) incident, the priority of primary decontamination is:', opts: ['Disrobe and rinse with water', 'Immediate antidote administration', 'CPR', 'Hospital transport'], ans: 0 },
    { id: 'q04', dom: 'K', q: 'In a radiation (R) incident, the three principles to reduce exposure are:', opts: ['Time, Distance, Shielding', 'Time, Drug, Isolation', 'Decon, Antidote, Transport', 'Recognize, Triage, Treat'], ans: 0 },
    { id: 'q05', dom: 'K', q: 'In JumpSTART pediatric triage, an apneic patient with no spontaneous breathing after 5 rescue breaths is:', opts: ['Red', 'Yellow', 'Green', 'Black'], ans: 3 },
    { id: 'q06', dom: 'K', q: 'In ICS, the Operations Section is responsible for:', opts: ['Budget', 'Field operations execution', 'Press briefing', 'Personnel'], ans: 1 },
    { id: 'q07', dom: 'K', q: 'Primary blast injury is mainly caused by:', opts: ['Fragment impact', 'Blast pressure wave', 'Burn', 'Secondary fall'], ans: 1 },
    { id: 'q08', dom: 'K', q: 'In a biological (B) attack, the standard prophylactic antibiotic for anthrax exposure is:', opts: ['Penicillin G', 'Ciprofloxacin or Doxycycline', 'Vancomycin', 'Azithromycin'], ans: 1 },
    { id: 'q09', dom: 'K', q: 'In Rule of Nines for adults, one entire leg is what %?', opts: ['9%', '13.5%', '18%', '36%'], ans: 2 },
    { id: 'q10', dom: 'K', q: 'In MARCH for hemorrhage management, M stands for:', opts: ['Massive hemorrhage', 'Movement', 'Monitoring', 'Medication'], ans: 0 },
    { id: 'q11', dom: 'A', q: 'I am willing to volunteer in a disaster.', opts: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], ans: -1, scale: 5 },
    { id: 'q12', dom: 'A', q: 'I am confident in providing patient care at a CBRNE incident scene.', opts: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], ans: -1, scale: 5 },
    { id: 'q13', dom: 'A', q: 'Disaster medicine training is essential for clinicians.', opts: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'], ans: -1, scale: 5 },
    { id: 'q14', dom: 'R', q: 'I can perform START triage immediately.', opts: ['Cannot at all', 'Cannot', 'Neutral', 'Can', 'Can very well'], ans: -1, scale: 5 },
    { id: 'q15', dom: 'R', q: 'I can perform my role within the ICS structure.', opts: ['Cannot at all', 'Cannot', 'Neutral', 'Can', 'Can very well'], ans: -1, scale: 5 },
    { id: 'q16', dom: 'R', q: 'I can don PPE Level C within 5 minutes.', opts: ['Cannot at all', 'Cannot', 'Neutral', 'Can', 'Can very well'], ans: -1, scale: 5 },
    { id: 'q17', dom: 'K', q: 'In HSEEP, the SitMan (Situation Manual) primary purpose is:', opts: ['Evaluation report', 'Provide scenario background', 'Participant registration', 'Budget'], ans: 1 },
    { id: 'q18', dom: 'K', q: 'In AAR/IP, "IP" stands for:', opts: ['Initial Phase', 'Improvement Plan', 'Incident Protocol', 'Internal Process'], ans: 1 },
    { id: 'q19', dom: 'K', q: 'On arrival, a disaster medical team\'s first action (LCAN report) is:', opts: ['Start treatment', 'Situation report', 'Begin transport', 'Decontamination'], ans: 1 },
    { id: 'q20', dom: 'K', q: 'Treatment principle for black-tagged patients in mass triage:', opts: ['Immediate CPR', 'Comfort care, pain management', 'ER transport', 'Decon then treat'], ans: 1 }
  ];

  const REACTION_EN = [
    { id: 'r1', q: 'The game motivated me to learn.', scale: 5 },
    { id: 'r2', q: 'The scenarios resembled real situations.', scale: 5 },
    { id: 'r3', q: 'The game was fun and engaging.', scale: 5 },
    { id: 'r4', q: 'I would recommend this to colleagues.', scale: 5 },
    { id: 'r5', q: 'It improved my disaster medicine competence.', scale: 5 }
  ];

  // ----------- 언어 판별 -----------
  const isEN = /disaster-medicine-game-en|\/en\//i.test(location.pathname) ||
               /disaster-med-edu-en|english/i.test(location.href) ||
               (document.documentElement.lang || '').toLowerCase().startsWith('en');

  const TEST_BANK = isEN ? TEST_BANK_EN : TEST_BANK_KR;
  const REACTION = isEN ? REACTION_EN : REACTION_KR;

  // ----------- i18n -----------
  const T = isEN ? {
    pre_title: 'Pre-Test (Required)',
    pre_intro: 'Please answer all 20 items honestly. This baseline measures your starting knowledge. Your individual results stay private.',
    post_title: 'Post-Test',
    post_intro: 'You\'ve completed the game. Please answer the same 20 items to measure what you\'ve learned.',
    react_title: 'Satisfaction Survey (Reaction)',
    react_intro: 'Please rate the following on a 5-point scale.',
    submit: 'Submit',
    next: 'Next',
    prev: 'Previous',
    of: 'of',
    progress: 'Progress',
    score: 'Score',
    your_score: 'Your knowledge score',
    pre_done: 'Pre-test complete. Starting the game now.',
    post_done: 'Post-test complete. Thank you.',
    reaction_done: 'Survey submitted. Thank you for your feedback.',
    learning_gain: 'Learning gain',
    pre_score: 'Pre-test',
    post_score: 'Post-test',
    show_results: 'Final Results',
    follow_up_title: '30-day Follow-up (Optional)',
    follow_up_q: 'Enter your email if you would like a 30-day follow-up survey to assess long-term retention. (Optional, can be skipped)',
    follow_up_skip: 'Skip',
    follow_up_save: 'Subscribe',
    must_answer: 'Please answer all questions.',
    knowledge_dom: 'Knowledge',
    attitude_dom: 'Attitude',
    readiness_dom: 'Readiness'
  } : {
    pre_title: '사전 평가 (필수)',
    pre_intro: '교육 시작 전 현재 지식 수준을 측정합니다. 20문항 모두 솔직하게 응답해 주세요. 개인 결과는 비공개입니다.',
    post_title: '사후 평가',
    post_intro: '게임을 완료하셨습니다. 동일한 20문항으로 학습 효과를 측정합니다.',
    react_title: '만족도 조사 (반응 평가)',
    react_intro: '5점 척도로 응답해 주세요.',
    submit: '제출',
    next: '다음',
    prev: '이전',
    of: '/',
    progress: '진행률',
    score: '점수',
    your_score: '당신의 지식 점수',
    pre_done: '사전 평가 완료. 게임을 시작합니다.',
    post_done: '사후 평가 완료. 감사합니다.',
    reaction_done: '설문이 제출되었습니다. 의견 감사합니다.',
    learning_gain: '학습 향상도',
    pre_score: '사전 점수',
    post_score: '사후 점수',
    show_results: '최종 결과',
    follow_up_title: '30일 추적 평가 (선택)',
    follow_up_q: '30일 후 장기 기억 평가 설문을 받고 싶다면 이메일을 입력하세요. (선택, 건너뛰기 가능)',
    follow_up_skip: '건너뛰기',
    follow_up_save: '구독',
    must_answer: '모든 문항에 응답해 주세요.',
    knowledge_dom: '지식',
    attitude_dom: '태도',
    readiness_dom: '실천역량'
  };

  // ----------- 점수 계산 -----------
  function gradeKnowledge(answers) {
    let correct = 0, total = 0;
    TEST_BANK.forEach(q => {
      if (q.dom === 'K' && q.ans >= 0) {
        total++;
        if (answers[q.id] === q.ans) correct++;
      }
    });
    return { correct, total, pct: total ? Math.round(100 * correct / total) : 0 };
  }
  function gradeLikert(answers, domain) {
    let sum = 0, n = 0;
    TEST_BANK.forEach(q => {
      if (q.dom === domain && q.scale === 5) {
        const v = answers[q.id];
        if (typeof v === 'number') { sum += (v + 1); n++; } // 1~5
      }
    });
    return { mean: n ? +(sum / n).toFixed(2) : 0, n };
  }
  // Normalized Learning Gain (Hake 1998): NLG = (post - pre) / (100 - pre)
  function normalizedGain(prePct, postPct) {
    if (prePct >= 100) return 0;
    return +(((postPct - prePct) / (100 - prePct))).toFixed(3);
  }

  // ----------- xAPI / cmi5 statement 빌더 -----------
  const XAPI_BASE_VERB = 'http://adlnet.gov/expapi/verbs/';
  const XAPI_OBJECT = (location.origin + location.pathname).replace(/\/$/, '');

  function makeXAPIStatement(verb, objectName, result, context) {
    const actor = (window.G && G.nickname) ? G.nickname : 'anonymous';
    return {
      actor: {
        objectType: 'Agent',
        name: actor,
        account: { homePage: location.origin, name: actor }
      },
      verb: {
        id: XAPI_BASE_VERB + verb,
        display: { 'en-US': verb, 'ko-KR': verb }
      },
      object: {
        id: XAPI_OBJECT + '#' + (objectName || 'activity'),
        definition: {
          name: { 'en-US': objectName, 'ko-KR': objectName },
          type: 'http://adlnet.gov/expapi/activities/assessment'
        }
      },
      result: result || undefined,
      context: Object.assign({
        platform: 'DisasterMedGame',
        language: isEN ? 'en-US' : 'ko-KR',
        extensions: {
          'http://id.tincanapi.com/extension/session-id':
            (window.SessionTracker && SessionTracker.sessionId) || ''
        }
      }, context || {}),
      timestamp: new Date().toISOString(),
      version: '1.0.3'
    };
  }

  async function sendXAPI(stmt) {
    try {
      const apiBase = (window.TRACKING_API || '').replace(/\/$/, '');
      if (!apiBase) {
        // 로컬에 큐잉
        const q = JSON.parse(localStorage.getItem('xapi_queue') || '[]');
        q.push(stmt); localStorage.setItem('xapi_queue', JSON.stringify(q.slice(-200)));
        return;
      }
      await fetch(apiBase + '/api/xapi/statements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Experience-API-Version': '1.0.3' },
        body: JSON.stringify(stmt)
      });
    } catch (e) { /* offline-friendly */ }

    // Firebase 백업
    if (window.FirebaseSync && FirebaseSync.isReady && FirebaseSync.isReady()) {
      try {
        const sid = (window.SessionTracker && SessionTracker.sessionId) || ('LOCAL-' + Date.now());
        firebase.database().ref('xapi/' + sid).push(stmt);
      } catch (_) {}
    }
  }

  // ----------- 모달 UI 헬퍼 -----------
  function ensureStyles() {
    if (document.getElementById('assessment-style')) return;
    const css = document.createElement('style');
    css.id = 'assessment-style';
    css.textContent = `
.assess-modal{position:fixed;inset:0;background:rgba(10,15,28,0.92);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;font-family:inherit}
.assess-card{background:#0f1729;color:#e6edf7;border-radius:14px;max-width:720px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.6);border:1px solid #2a3653}
.assess-head{padding:18px 22px;border-bottom:1px solid #1f2a44;display:flex;justify-content:space-between;align-items:center;gap:12px}
.assess-head h2{margin:0;font-size:1.15rem;color:#7aa6ff}
.assess-progress{font-size:0.85rem;color:#9bb0d0}
.assess-bar{height:6px;background:#1a2440;border-radius:99px;overflow:hidden}
.assess-bar>div{height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);transition:width .3s}
.assess-body{padding:18px 22px}
.assess-intro{background:#152043;padding:12px 14px;border-radius:8px;margin-bottom:14px;border-left:3px solid #3b82f6;font-size:.95rem;line-height:1.55}
.assess-q{background:#152043;padding:14px 16px;border-radius:10px;margin-bottom:10px}
.assess-q .num{display:inline-block;background:#3b82f6;color:#fff;border-radius:99px;padding:2px 10px;font-size:.78rem;margin-right:6px;font-weight:700}
.assess-q .dom{display:inline-block;background:#312e81;color:#c7d2fe;border-radius:6px;padding:1px 7px;font-size:.7rem;margin-left:4px}
.assess-q .qtxt{margin:8px 0 10px;font-size:1rem;line-height:1.5}
.assess-opts{display:flex;flex-direction:column;gap:6px}
.assess-opt{display:flex;align-items:flex-start;gap:8px;padding:9px 12px;background:#0c1428;border:1px solid #2a3653;border-radius:8px;cursor:pointer;transition:.15s;font-size:.93rem;line-height:1.4}
.assess-opt:hover{background:#1a2750;border-color:#3b82f6}
.assess-opt.selected{background:#1e3a8a;border-color:#60a5fa;color:#fff}
.assess-opt input{margin-top:3px;accent-color:#3b82f6}
.assess-foot{padding:14px 22px;border-top:1px solid #1f2a44;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
.assess-btn{padding:10px 22px;border-radius:8px;border:0;font-weight:700;cursor:pointer;font-size:.95rem;transition:.15s}
.assess-btn.primary{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff}
.assess-btn.primary:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(59,130,246,.4)}
.assess-btn.ghost{background:transparent;border:1px solid #475569;color:#cbd5e1}
.assess-btn:disabled{opacity:.4;cursor:not-allowed}
.assess-likert{display:flex;justify-content:space-between;gap:6px;margin-top:8px}
.assess-likert label{flex:1;text-align:center;padding:10px 4px;background:#0c1428;border:1px solid #2a3653;border-radius:8px;cursor:pointer;font-size:.82rem;line-height:1.25}
.assess-likert label:hover{background:#1a2750}
.assess-likert input{display:none}
.assess-likert input:checked + span{color:#fff}
.assess-likert label.selected{background:#1e3a8a;border-color:#60a5fa;color:#fff}
.assess-result{text-align:center;padding:22px}
.assess-result .big{font-size:2.6rem;font-weight:800;color:#60a5fa;margin:8px 0}
.assess-result .gain{display:inline-block;padding:6px 16px;border-radius:99px;background:#065f46;color:#a7f3d0;font-weight:700;margin-top:8px}
.assess-result .gain.neg{background:#7f1d1d;color:#fecaca}
.assess-table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.92rem}
.assess-table th,.assess-table td{padding:8px 10px;border-bottom:1px solid #1f2a44;text-align:left}
.assess-table th{background:#152043;color:#7aa6ff}
@media (max-width:480px){
  .assess-head h2{font-size:1rem}
  .assess-q .qtxt{font-size:.93rem}
  .assess-opt{font-size:.88rem}
  .assess-likert label{font-size:.74rem;padding:8px 2px}
}
    `;
    document.head.appendChild(css);
  }

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'style') e.style.cssText = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (children) (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  function closeModal() {
    const m = document.querySelector('.assess-modal');
    if (m) m.remove();
  }

  // ----------- Pre/Post Test 모달 -----------
  function showTest(mode, onDone) {
    ensureStyles();
    closeModal();

    const isPre = mode === 'pre';
    const answers = {};
    let idx = 0;

    const overlay = el('div', { class: 'assess-modal' });
    const card = el('div', { class: 'assess-card' });
    overlay.appendChild(card);

    function render() {
      card.innerHTML = '';
      const q = TEST_BANK[idx];
      const head = el('div', { class: 'assess-head' }, [
        el('h2', null, isPre ? T.pre_title : T.post_title),
        el('div', { class: 'assess-progress' }, `${idx + 1} ${T.of} ${TEST_BANK.length}`)
      ]);
      const bar = el('div', { class: 'assess-bar' }, [
        el('div', { style: `width:${((idx + 1) / TEST_BANK.length) * 100}%` })
      ]);

      const body = el('div', { class: 'assess-body' });
      if (idx === 0) {
        body.appendChild(el('div', { class: 'assess-intro' }, isPre ? T.pre_intro : T.post_intro));
      }

      const domLabel = q.dom === 'K' ? T.knowledge_dom : (q.dom === 'A' ? T.attitude_dom : T.readiness_dom);
      const qBox = el('div', { class: 'assess-q' });
      const title = el('div', null, [
        el('span', { class: 'num' }, String(idx + 1)),
        el('span', { class: 'dom' }, domLabel)
      ]);
      qBox.appendChild(title);
      qBox.appendChild(el('div', { class: 'qtxt' }, q.q));

      if (q.scale === 5) {
        const lk = el('div', { class: 'assess-likert' });
        q.opts.forEach((opt, i) => {
          const lb = el('label', {
            class: answers[q.id] === i ? 'selected' : '',
            onclick: () => { answers[q.id] = i; render(); }
          }, [
            el('input', { type: 'radio', name: q.id, value: String(i) }),
            el('span', null, opt)
          ]);
          lk.appendChild(lb);
        });
        qBox.appendChild(lk);
      } else {
        const opts = el('div', { class: 'assess-opts' });
        q.opts.forEach((opt, i) => {
          const o = el('label', {
            class: 'assess-opt' + (answers[q.id] === i ? ' selected' : ''),
            onclick: () => { answers[q.id] = i; render(); }
          }, [
            el('input', { type: 'radio', name: q.id, value: String(i) }),
            el('span', null, opt)
          ]);
          opts.appendChild(o);
        });
        qBox.appendChild(opts);
      }
      body.appendChild(qBox);

      const foot = el('div', { class: 'assess-foot' });
      const prevBtn = el('button', {
        class: 'assess-btn ghost',
        onclick: () => { if (idx > 0) { idx--; render(); } }
      }, T.prev);
      prevBtn.disabled = idx === 0;

      const isLast = idx === TEST_BANK.length - 1;
      const nextBtn = el('button', {
        class: 'assess-btn primary',
        onclick: () => {
          if (typeof answers[q.id] !== 'number') {
            alert(T.must_answer); return;
          }
          if (isLast) submit();
          else { idx++; render(); }
        }
      }, isLast ? T.submit : T.next);

      foot.appendChild(prevBtn);
      foot.appendChild(nextBtn);

      card.appendChild(head);
      card.appendChild(bar);
      card.appendChild(body);
      card.appendChild(foot);
    }

    function submit() {
      const knowledge = gradeKnowledge(answers);
      const attitude = gradeLikert(answers, 'A');
      const readiness = gradeLikert(answers, 'R');
      const payload = {
        type: mode === 'pre' ? 'pretest' : 'posttest',
        timestamp: new Date().toISOString(),
        nickname: window.G ? G.nickname : '',
        team: window.G ? G.team : '',
        sessionId: window.SessionTracker ? SessionTracker.sessionId : null,
        answers,
        knowledge_pct: knowledge.pct,
        knowledge_correct: knowledge.correct,
        knowledge_total: knowledge.total,
        attitude_mean: attitude.mean,
        readiness_mean: readiness.mean,
        lang: isEN ? 'en' : 'ko'
      };

      // localStorage
      try {
        const key = mode === 'pre' ? 'pretest_result' : 'posttest_result';
        localStorage.setItem(key, JSON.stringify(payload));
      } catch (_) {}

      // Backend
      try {
        const apiBase = (window.TRACKING_API || '').replace(/\/$/, '');
        if (apiBase) {
          fetch(apiBase + '/api/assessment/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(() => {});
        }
      } catch (_) {}

      // Firebase
      if (window.FirebaseSync && FirebaseSync.isReady && FirebaseSync.isReady()) {
        try {
          const sid = (window.SessionTracker && SessionTracker.sessionId) || ('LOCAL-' + Date.now());
          firebase.database().ref('assessments/' + sid).push(payload);
        } catch (_) {}
      }

      // xAPI
      sendXAPI(makeXAPIStatement(
        mode === 'pre' ? 'attempted' : 'completed',
        mode === 'pre' ? 'PreTest' : 'PostTest',
        {
          score: { scaled: knowledge.pct / 100, raw: knowledge.correct, max: knowledge.total },
          completion: true,
          extensions: {
            'http://example.org/extensions/attitude_mean': attitude.mean,
            'http://example.org/extensions/readiness_mean': readiness.mean
          }
        }
      ));

      // 결과 화면
      showTestResult(mode, knowledge, attitude, readiness, onDone);
    }

    document.body.appendChild(overlay);
    render();
  }

  function showTestResult(mode, knowledge, attitude, readiness, onDone) {
    const card = document.querySelector('.assess-card');
    if (!card) return;
    card.innerHTML = '';
    const head = el('div', { class: 'assess-head' }, [
      el('h2', null, mode === 'pre' ? T.pre_done : T.post_done)
    ]);
    const body = el('div', { class: 'assess-body' });
    const result = el('div', { class: 'assess-result' });
    result.appendChild(el('div', null, T.your_score + ' (' + T.knowledge_dom + ')'));
    result.appendChild(el('div', { class: 'big' }, knowledge.pct + '%'));
    result.appendChild(el('div', null, `${knowledge.correct} / ${knowledge.total}`));

    // post: 향상도 표시
    if (mode === 'post') {
      try {
        const pre = JSON.parse(localStorage.getItem('pretest_result') || 'null');
        if (pre && typeof pre.knowledge_pct === 'number') {
          const nlg = normalizedGain(pre.knowledge_pct, knowledge.pct);
          const diff = knowledge.pct - pre.knowledge_pct;
          const tbl = el('table', { class: 'assess-table' }, [
            el('tr', null, [el('th', null, ''), el('th', null, T.pre_score), el('th', null, T.post_score)]),
            el('tr', null, [el('th', null, T.knowledge_dom), el('td', null, pre.knowledge_pct + '%'), el('td', null, knowledge.pct + '%')]),
            el('tr', null, [el('th', null, T.attitude_dom), el('td', null, String(pre.attitude_mean)), el('td', null, String(attitude.mean))]),
            el('tr', null, [el('th', null, T.readiness_dom), el('td', null, String(pre.readiness_mean)), el('td', null, String(readiness.mean))])
          ]);
          result.appendChild(tbl);
          const gainCls = diff >= 0 ? 'gain' : 'gain neg';
          result.appendChild(el('div', { class: gainCls },
            `${T.learning_gain}: ${diff >= 0 ? '+' : ''}${diff}% (NLG=${nlg})`
          ));
        }
      } catch (_) {}
    }
    body.appendChild(result);
    card.appendChild(head);
    card.appendChild(body);

    const foot = el('div', { class: 'assess-foot' });
    const okBtn = el('button', {
      class: 'assess-btn primary',
      onclick: () => { closeModal(); if (typeof onDone === 'function') onDone({ knowledge, attitude, readiness }); }
    }, T.next);
    foot.appendChild(el('span'));
    foot.appendChild(okBtn);
    card.appendChild(foot);
  }

  // ----------- Reaction (L1) 만족도 모달 -----------
  function showReactionSurvey(onDone) {
    ensureStyles();
    closeModal();
    const answers = {};
    const overlay = el('div', { class: 'assess-modal' });
    const card = el('div', { class: 'assess-card' });
    overlay.appendChild(card);

    function render() {
      card.innerHTML = '';
      card.appendChild(el('div', { class: 'assess-head' }, [el('h2', null, T.react_title)]));
      const body = el('div', { class: 'assess-body' });
      body.appendChild(el('div', { class: 'assess-intro' }, T.react_intro));
      REACTION.forEach(q => {
        const qBox = el('div', { class: 'assess-q' });
        qBox.appendChild(el('div', { class: 'qtxt' }, q.q));
        const lk = el('div', { class: 'assess-likert' });
        const labels = isEN
          ? ['1-Strongly Disagree', '2', '3', '4', '5-Strongly Agree']
          : ['1-매우 그렇지 않다', '2', '3', '4', '5-매우 그렇다'];
        labels.forEach((L, i) => {
          const lb = el('label', {
            class: answers[q.id] === i ? 'selected' : '',
            onclick: () => { answers[q.id] = i; render(); }
          }, [el('span', null, L)]);
          lk.appendChild(lb);
        });
        qBox.appendChild(lk);
        body.appendChild(qBox);
      });
      card.appendChild(body);
      const foot = el('div', { class: 'assess-foot' });
      const skip = el('button', {
        class: 'assess-btn ghost',
        onclick: () => { closeModal(); if (typeof onDone === 'function') onDone(null); }
      }, T.follow_up_skip);
      const sub = el('button', {
        class: 'assess-btn primary',
        onclick: () => {
          if (REACTION.some(q => typeof answers[q.id] !== 'number')) { alert(T.must_answer); return; }
          submitReaction();
        }
      }, T.submit);
      foot.appendChild(skip);
      foot.appendChild(sub);
      card.appendChild(foot);
    }

    function submitReaction() {
      const ratings = REACTION.map(q => (answers[q.id] + 1));
      const mean = +(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
      const payload = {
        type: 'reaction',
        timestamp: new Date().toISOString(),
        nickname: window.G ? G.nickname : '',
        team: window.G ? G.team : '',
        sessionId: window.SessionTracker ? SessionTracker.sessionId : null,
        ratings, mean,
        lang: isEN ? 'en' : 'ko'
      };
      try { localStorage.setItem('reaction_result', JSON.stringify(payload)); } catch (_) {}
      try {
        const apiBase = (window.TRACKING_API || '').replace(/\/$/, '');
        if (apiBase) {
          fetch(apiBase + '/api/assessment/submit', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(() => {});
        }
      } catch (_) {}
      if (window.FirebaseSync && FirebaseSync.isReady && FirebaseSync.isReady()) {
        try {
          const sid = (window.SessionTracker && SessionTracker.sessionId) || ('LOCAL-' + Date.now());
          firebase.database().ref('assessments/' + sid).push(payload);
        } catch (_) {}
      }
      sendXAPI(makeXAPIStatement('rated', 'GameExperience', {
        score: { scaled: mean / 5, raw: mean, max: 5 },
        response: ratings.join(','),
        completion: true
      }));
      closeModal();
      // 다음 단계: 30일 follow-up 이메일 수집
      showFollowUp(onDone);
    }
    document.body.appendChild(overlay);
    render();
  }

  // ----------- Follow-up (L3) 30일 추적 이메일 수집 -----------
  function showFollowUp(onDone) {
    ensureStyles();
    closeModal();
    const overlay = el('div', { class: 'assess-modal' });
    const card = el('div', { class: 'assess-card' });
    overlay.appendChild(card);
    card.appendChild(el('div', { class: 'assess-head' }, [el('h2', null, T.follow_up_title)]));
    const body = el('div', { class: 'assess-body' });
    body.appendChild(el('div', { class: 'assess-intro' }, T.follow_up_q));
    const input = el('input', {
      type: 'email', placeholder: 'name@example.com', id: 'fu-email',
      style: 'width:100%;padding:11px 14px;background:#0c1428;border:1px solid #2a3653;border-radius:8px;color:#fff;font-size:1rem;margin-top:6px'
    });
    body.appendChild(input);
    card.appendChild(body);
    const foot = el('div', { class: 'assess-foot' });
    foot.appendChild(el('button', {
      class: 'assess-btn ghost',
      onclick: () => { closeModal(); if (typeof onDone === 'function') onDone(null); }
    }, T.follow_up_skip));
    foot.appendChild(el('button', {
      class: 'assess-btn primary',
      onclick: () => {
        const v = (input.value || '').trim();
        if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          closeModal(); if (typeof onDone === 'function') onDone(null); return;
        }
        const payload = {
          type: 'followup_optin',
          timestamp: new Date().toISOString(),
          email: v,
          nickname: window.G ? G.nickname : '',
          sessionId: window.SessionTracker ? SessionTracker.sessionId : null,
          due_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          lang: isEN ? 'en' : 'ko'
        };
        try { localStorage.setItem('followup_optin', JSON.stringify(payload)); } catch (_) {}
        try {
          const apiBase = (window.TRACKING_API || '').replace(/\/$/, '');
          if (apiBase) {
            fetch(apiBase + '/api/assessment/followup', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }).catch(() => {});
          }
        } catch (_) {}
        if (window.FirebaseSync && FirebaseSync.isReady && FirebaseSync.isReady()) {
          try {
            const sid = (window.SessionTracker && SessionTracker.sessionId) || ('LOCAL-' + Date.now());
            firebase.database().ref('followups/' + sid).push(payload);
          } catch (_) {}
        }
        closeModal(); if (typeof onDone === 'function') onDone(payload);
      }
    }, T.follow_up_save));
    card.appendChild(foot);
    document.body.appendChild(overlay);
  }

  // ----------- 게임 종료 시 자동 트리거 -----------
  function triggerPostFlow() {
    showTest('post', () => {
      showReactionSurvey(() => { /* follow-up은 reaction 완료 후 호출됨 */ });
    });
  }

  // ----------- 통합 API -----------
  global.Assessment = {
    showPreTest: function (onDone) { showTest('pre', onDone); },
    showPostTest: function (onDone) { showTest('post', onDone); },
    showReactionSurvey: showReactionSurvey,
    showFollowUp: showFollowUp,
    triggerPostFlow: triggerPostFlow,
    sendXAPI: sendXAPI,
    makeXAPIStatement: makeXAPIStatement,
    normalizedGain: normalizedGain,
    isEN: isEN,
    TEST_BANK: TEST_BANK,
    REACTION: REACTION,
    hasPreTest: function () { return !!localStorage.getItem('pretest_result'); }
  };

  // ----------- Auto-init: 게임 종료 감지 -----------
  // 모든 13개 모드 완료 또는 보스 클리어 시 트리거
  document.addEventListener('disasterMedGameComplete', triggerPostFlow);

  // 디버그 헬퍼
  global.__startPreTest = function () { showTest('pre'); };
  global.__startPostTest = function () { showTest('post'); };
  global.__startReaction = function () { showReactionSurvey(); };

})(window);
