// ============================================
// Cross-Border CBRNe Drill — Korean version
// 국경간 CBRNe 합동 훈련 (시안화물 테러 시뮬레이션)
// ============================================
// 같은 범위/스코어/AAR 구조를 영문판과 동일하게 유지.
// 모드 표시명: "Cross-Border CBRNe Drill" (그대로 유지)
// 내부 키: 'crossBorderCbrne'

(function() {
  'use strict';

  var MODE_KEY = 'crossBorderCbrne';
  var MODE_LABEL = 'Cross-Border CBRNe Drill';
  var MODE_SUBTITLE_KO = '국경간 CBRNe 합동 훈련 — 시안화물 테러 시뮬레이션';

  // ---- 시나리오 매트릭스 (Hazard / Sector / Task / Inject / Expected action / Failure risk) ----
  var SCENARIO_MATRIX = [
    {
      hazard: '시안화물 (HCN) 흡입',
      sector: '현장 분류 (Hot Zone)',
      task: 'MASS/START 분류',
      inject: '호흡곤란·의식 저하 환자 발생',
      expected: 'Red / Immediate 분류 후 즉시 해독제 동선 확보',
      failureRisk: 'Yellow/Green 오분류로 해독제 지연'
    },
    {
      hazard: '오염 환자 동선',
      sector: '제독 (Warm Zone)',
      task: '제독 우선순위 결정',
      inject: '생명 위협 환자 발생, 제독 줄 길어짐',
      expected: '우선순위 0 — 즉시 응급처치 후 후속 제독',
      failureRisk: '루틴 wet decon 우선으로 사망 위험 증가'
    },
    {
      hazard: '시안화물 중독',
      sector: '병원 의료지휘',
      task: '해독제 선택',
      inject: '응급실 도착, 산소·심전도 이상',
      expected: 'Hydroxocobalamin 투여',
      failureRisk: 'Atropine/2-PAM·Calcium gluconate 오용'
    },
    {
      hazard: '의미론적 불일치 (Semantics)',
      sector: '국경간 정보공유',
      task: 'EU "Critical" ↔ 한국 DMAT/START "Red/Immediate" 매핑',
      inject: '공동 대시보드에 EU 측 "Critical" 표시',
      expected: '원어 보존 + Red/Immediate 매핑 + 1:1 등가 없음 플래그',
      failureRisk: '용어 단순 치환으로 우선순위 오류'
    },
    {
      hazard: '저하 네트워크 (Degraded Network)',
      sector: '지휘통신',
      task: '대시보드 지연/메시지 손실 대응',
      inject: '병원 가용병상 데이터 90초 stale, 무전 잡음',
      expected: '타임스탬프·불확실성 명시·역할별 부분 갱신·무전 폴백',
      failureRisk: '잠시 모르는 상태로 의사결정 → 중복 이송'
    },
    {
      hazard: '오염 환자 이송',
      sector: '병원 배정 / 이송',
      task: '미제독 환자 직송 금지',
      inject: '인접 일반 병원으로 직송 요청 들어옴',
      expected: '사전 통보·제독 후 이송·수용 병원 알림',
      failureRisk: '병원 오염 → 추가 사상자, 폐쇄'
    }
  ];

  // ---- 의료 의미론적 매핑 테이블 ----
  var SEMANTICS_MAP = [
    {
      sourceSystem: 'EU 응급의료 (예시)',
      sourceTerm: 'Critical',
      sharedDashboard: 'Immediate',
      koreanTerm: 'Red / Immediate (즉시)',
      flag: '1:1 등가 아님 — 운영적 매핑 필요'
    },
    {
      sourceSystem: 'EU 응급의료 (예시)',
      sourceTerm: 'Serious',
      sharedDashboard: 'Delayed',
      koreanTerm: 'Yellow / Delayed (지연)',
      flag: '맥락 의존 매핑'
    },
    {
      sourceSystem: 'EU 응급의료 (예시)',
      sourceTerm: 'Minor',
      sharedDashboard: 'Minor',
      koreanTerm: 'Green / Minor (경미)',
      flag: '대체로 일치'
    },
    {
      sourceSystem: 'EU 응급의료 (예시)',
      sourceTerm: 'Deceased',
      sharedDashboard: 'Expectant/Black',
      koreanTerm: 'Black / 기대불가',
      flag: '관할별 사망 판정 절차 차이 주의'
    }
  ];

  // ---- 결정 단계 (영문판과 동일 시퀀스/스코어링) ----
  var STEPS = [
    {
      id: 'briefing',
      type: 'briefing',
      title: '1. 사고 브리핑 / 역할 대시보드',
      narrative: '국경간 환승 허브(철도·버스 터미널)에서 시안화물(HCN) 의심 테러 공격 발생. ' +
                 '핫존에서 콜드존 지휘소·병원 배정 대시보드까지 정보가 흘러야 한다.',
      roles: [
        { icon: '🩺', name: 'Field Triage Officer', desc: '핫존 환자 분류 (현장 분류관)' },
        { icon: '🎖️', name: 'On-Scene Commander', desc: '현장 지휘 / 구역 통제 (현장지휘)' },
        { icon: '📡', name: 'Dispatch Coordinator', desc: '배차 / 자원 조정 (디스패치)' },
        { icon: '🏥', name: 'Hospital Coordinator', desc: '병원 배정·수용 (병원 코디네이터)' },
        { icon: '🌐', name: 'Medical Semantics / Translation Officer', desc: '의미론적 매핑·번역 (의미론 오피서)' }
      ],
      ack: '대시보드를 확인했다 — 시작'
    },
    {
      id: 'triage',
      type: 'choice',
      title: '2. MASS/START 분류 결정',
      situation: '환자 A: HCN 노출, 호흡곤란·의식저하, 보행 불가, 시안화물 흡입 의심.',
      question: '이 환자에 대한 분류는?',
      options: [
        { text: 'Red / Immediate (즉시)', correct: true,
          feedback: '정답. 호흡곤란·의식변화·보행 불가 → START에서 Red/Immediate. 즉시 해독제 동선 확보가 필요.' },
        { text: 'Yellow / Delayed (지연)', correct: false,
          feedback: '오답. 의식 변화·호흡곤란이 동반된 시안화물 의심 환자는 Yellow가 아니다.' },
        { text: 'Green / Minor (경미)', correct: false,
          feedback: '오답. 보행 불가·의식 저하 환자는 Green이 될 수 없다.' },
        { text: 'Black / Expectant', correct: false,
          feedback: '오답. 자발 호흡·반응이 남아 있으면 Expectant가 아니다 — 즉시 처치 가능.' }
      ],
      kahootNote: '카훗 분석: Red 분류를 Yellow/Green으로 오답하는 학생이 다수.'
    },
    {
      id: 'predecon',
      type: 'choice',
      title: '3. 사전(우선) 제독 우선순위',
      situation: '핫존에서 끌려 나온 위중 환자. 제독 줄은 길고, 바로 응급처치가 필요한 상황.',
      question: '가장 적절한 우선순위는?',
      options: [
        { text: '우선순위 0 — 즉시 생명구조 처치 후 제독', correct: true,
          feedback: '정답. 생명 위협이 있을 때는 루틴 wet decon보다 즉시 응급처치(기도·해독제)가 우선.' },
        { text: '눕힌 채 wet decon 먼저', correct: false,
          feedback: '오답. 생명 위협 환자에게 루틴 wet decon을 먼저 하면 사망 위험 증가.' },
        { text: '눕힌 채 dry decon 먼저', correct: false,
          feedback: '오답. dry decon도 생명 구조 처치보다 선행돼서는 안 된다.' },
        { text: '제독 후 분류 다시 받기', correct: false,
          feedback: '오답. 제독 지연으로 응급처치가 늦어진다.' }
      ],
      kahootNote: '카훗 분석: "제독이 항상 먼저"라는 오개념 다수.'
    },
    {
      id: 'antidote',
      type: 'choice',
      title: '4. 시안화물 해독제 선택',
      situation: '환자 A 응급실 도착. 호흡 부전·산-염기 이상·심전도 이상. 시안화물 중독 강력 시사.',
      question: '1차 선택 해독제는?',
      options: [
        { text: 'Hydroxocobalamin (히드록소코발라민)', correct: true,
          feedback: '정답. Hydroxocobalamin이 시안화물 중독의 1차 해독제. 시안 이온과 결합해 시아노코발라민으로 배설.' },
        { text: 'Atropine + 2-PAM (프랄리독심)', correct: false,
          feedback: '오답. Atropine/2-PAM은 신경작용제·콜린성 중독 해독제이지, 단독 시안화물 중독에는 적응증이 아니다.' },
        { text: 'Calcium gluconate (글루콘산칼슘)', correct: false,
          feedback: '오답. Calcium gluconate는 불산(HF) 노출에 사용되지, 시안화물에는 적응증이 아니다.' },
        { text: 'Naloxone (날록손)', correct: false,
          feedback: '오답. Naloxone은 오피오이드 길항제. 시안화물 중독에 효과 없음.' }
      ],
      kahootNote: '카훗 분석: Atropine·Calcium gluconate 오답 빈발.'
    },
    {
      id: 'semantics',
      type: 'choice',
      title: '5. 의미론적 매핑 결정',
      situation: '국경 너머 EU 측에서 환자를 "Critical"로 보고. 공동 대시보드에는 한국 DMAT/START 용어가 표시되어야 한다.',
      question: '의미론 오피서로서 가장 적절한 처리는?',
      options: [
        { text: '원어("Critical") 보존 + Red/Immediate로 매핑 + "1:1 등가 없음, 운영적 매핑" 플래그', correct: true,
          feedback: '정답. 원어 보존, 공유 대시보드용 매핑, 그리고 거버넌스/플래그를 함께 남겨야 한다 — 의미론 문제는 기술 문제만큼 중요하다.' },
        { text: '"Critical" → 그냥 "Red"로 자동 치환, 원어 삭제', correct: false,
          feedback: '오답. 원어 손실 → 사후 검증 불가. 사일런트 매핑 위험.' },
        { text: '매핑하지 않고 EU 측 시스템에 그대로 남김', correct: false,
          feedback: '오답. 공동 대시보드 가시성이 사라져 우선순위가 흐트러진다.' },
        { text: '"Critical"을 Yellow/Delayed로 매핑', correct: false,
          feedback: '오답. 의미상 우선순위 손실 — 즉각 처치 환자가 후순위로 밀린다.' }
      ],
      mappingTable: SEMANTICS_MAP,
      kahootNote: '교훈: 의미론·거버넌스 문제는 기술 문제와 동일하게 중요.'
    },
    {
      id: 'degraded',
      type: 'choice',
      title: '6. 저하 네트워크 인젝트 (Degraded Network)',
      situation: '공동 대시보드 지연 90초, 병원 가용병상 stale, 중복 메시지 1건, 무전 잡음 발생.',
      question: '가장 적절한 대응은?',
      options: [
        { text: '타임스탬프 부여·불확실성 명시·역할별 부분 갱신·무전 폴백 사용', correct: true,
          feedback: '정답. 타임스탬프, 불확실성 표시, 역할 기반 갱신, 무전 폴백이 정공법. 지연 메트릭 트래킹.' },
        { text: '대시보드 복구될 때까지 의사결정 보류', correct: false,
          feedback: '오답. 대기 중 사상자 누적 — degraded 상태에서도 결정해야 한다.' },
        { text: '같은 메시지를 5번 더 재송신해 강제 동기화', correct: false,
          feedback: '오답. 중복 메시지가 늘어나 더 큰 혼선 야기.' },
        { text: '무전 끊고 SNS로 공지', correct: false,
          feedback: '오답. 비공식 채널 사용은 거버넌스/보안 위반.' }
      ],
      latencyTargetSec: 120
    },
    {
      id: 'transport',
      type: 'choice',
      title: '7. 국경간 병원 배정 / 오염 환자 이송',
      situation: '핫존에서 직접 인접 일반 병원으로 환자 직송 요청이 들어왔다. 병원 사전 통보 미실시, 제독 미실시.',
      question: 'Hospital Coordinator로서 가장 적절한 결정은?',
      options: [
        { text: '제독 + 사전 통보 + 수용역량 확인 후 지정 수용병원으로 배정', correct: true,
          feedback: '정답. 미제독·미통보 직송은 절대 금지 — 수용병원 오염 시 추가 사상자·시설 폐쇄.' },
        { text: '가장 가까운 일반 병원으로 즉시 직송 (제독 생략)', correct: false,
          feedback: '오답. 미제독 환자 직송은 가장 빈번한 예방가능 오류.' },
        { text: '병상 확인 없이 큰 대학병원으로 일괄 송부', correct: false,
          feedback: '오답. 수용역량 미확인 — 추가 혼란.' },
        { text: '환자 가족이 알아서 이송하도록 지시', correct: false,
          feedback: '오답. 지휘체계·오염 통제 위반.' }
      ]
    }
  ];

  // ---- AAR 계산 ----
  function computeAAR(state) {
    var stepsCount = state.results.length;
    var correct = state.results.filter(function(r) { return r.correct; }).length;

    var triage = state.results.find(function(r) { return r.stepId === 'triage'; });
    var antidote = state.results.find(function(r) { return r.stepId === 'antidote'; });
    var semantics = state.results.find(function(r) { return r.stepId === 'semantics'; });
    var degraded = state.results.find(function(r) { return r.stepId === 'degraded'; });
    var transport = state.results.find(function(r) { return r.stepId === 'transport'; });
    var predecon = state.results.find(function(r) { return r.stepId === 'predecon'; });

    var triageLatencySec = triage ? Math.round(triage.timeMs / 1000) : null;
    var handoverLatencySec = (transport && triage) ? Math.round(((transport.atMs || 0) - (triage.atMs || 0)) / 1000) : null;
    var degradedRecoverySec = degraded ? Math.round(degraded.timeMs / 1000) : null;

    var preventableContaminatedTransport = transport ? (transport.correct ? 0 : 1) : null;

    var strengths = [];
    var improvements = [];
    var recommendations = [];

    if (triage && triage.correct) strengths.push('START/MASS Red/Immediate 정확히 분류');
    else if (triage) improvements.push('MASS/START 분류 — Red/Immediate 인식 강화 필요');

    if (predecon && predecon.correct) strengths.push('생명 위협 환자에서 사전 응급처치 우선');
    else if (predecon) improvements.push('루틴 제독보다 응급처치 우선순위 학습');

    if (antidote && antidote.correct) strengths.push('Hydroxocobalamin 정확히 선택');
    else if (antidote) improvements.push('해독제 — Atropine/Calcium gluconate와 혼동 금지');

    if (semantics && semantics.correct) strengths.push('의미론적 매핑(원어 보존 + 운영 플래그) 수행');
    else if (semantics) improvements.push('국경간 용어 매핑 — 원어 보존·운영 플래그 절차 학습');

    if (degraded && degraded.correct) strengths.push('저하 네트워크 회복 절차 적용');
    else if (degraded) improvements.push('타임스탬프·불확실성 명시·무전 폴백 절차 강화');

    if (transport && transport.correct) strengths.push('오염 환자 직송 금지·사전 통보 준수');
    else if (transport) improvements.push('미제독 환자 직송 금지 절차 재학습');

    if (improvements.length > 0) {
      recommendations.push('카훗 약점 영역(시안화물 해독제·사전 제독·Red 분류)에 초점 둔 재훈련');
      recommendations.push('국경간 의미론 매핑 SOP — 원어 보존·플래그·1:1 등가 부재 명시');
      recommendations.push('Degraded Network 상황 카드를 정기 인젝트로 포함');
    } else {
      recommendations.push('현재 수행 수준을 유지하고, 보다 복잡한 멀티허브 시나리오로 확장');
    }

    return {
      total: stepsCount,
      correct: correct,
      pct: Math.round((correct / Math.max(stepsCount, 1)) * 100),
      triageAccuracy: triage ? (triage.correct ? 100 : 0) : 0,
      antidoteCorrect: !!(antidote && antidote.correct),
      semanticsCorrect: !!(semantics && semantics.correct),
      triageLatencySec: triageLatencySec,
      handoverLatencySec: handoverLatencySec,
      degradedRecoverySec: degradedRecoverySec,
      preventableContaminatedTransport: preventableContaminatedTransport,
      targets: {
        triageLatencySec: 90,
        handoverLatencySec: 180,
        preventableContaminatedTransport: 0,
        degradedRecoverySec: 120
      },
      strengths: strengths,
      improvements: improvements,
      recommendations: recommendations,
      timeline: state.results.map(function(r) {
        return {
          stepId: r.stepId,
          title: r.title,
          correct: r.correct,
          chosen: r.chosen,
          timeSec: Math.round(r.timeMs / 1000),
          atIso: r.atIso
        };
      })
    };
  }

  // ---- 상태 ----
  function initState() {
    G.cbcbState = {
      stepIdx: 0,
      results: [],
      answered: false,
      selected: -1,
      stepStartMs: Date.now(),
      runStartMs: Date.now()
    };
  }

  // ---- 렌더 ----
  function renderCBCBStep() {
    if (!G.cbcbState) initState();
    var st = G.cbcbState;
    var step = STEPS[st.stepIdx];
    if (!step) { showCBCBAAR(); return; }

    if (step.type === 'briefing') {
      renderBriefing(step);
      return;
    }
    renderChoice(step);
  }

  function renderBriefing(step) {
    var st = G.cbcbState;
    var matrixHtml = SCENARIO_MATRIX.map(function(m) {
      return '<tr>' +
        '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)">' + m.hazard + '</td>' +
        '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)">' + m.sector + '</td>' +
        '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)">' + m.task + '</td>' +
        '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)">' + m.inject + '</td>' +
        '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06);color:#7f8fff">' + m.expected + '</td>' +
        '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06);color:#ff8b8b">' + m.failureRisk + '</td>' +
      '</tr>';
    }).join('');

    var rolesHtml = step.roles.map(function(r) {
      return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;display:flex;gap:10px;align-items:flex-start">' +
        '<div style="font-size:1.4rem">' + r.icon + '</div>' +
        '<div><div style="font-weight:700;color:#e8eaf6">' + r.name + '</div>' +
        '<div style="font-size:0.78rem;color:#8b8fa3">' + r.desc + '</div></div></div>';
    }).join('');

    app.innerHTML =
      '<div class="screen quiz-game">' +
        '<div class="quiz-progress-bar" style="position:relative">' +
          '<button id="cbcbExitBtn" style="position:absolute;right:0;top:-2px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#8b8fa3;padding:4px 12px;border-radius:8px;font-size:0.72rem;cursor:pointer">✕ 나가기</button>' +
          '<span class="quiz-pbar-num">' + (st.stepIdx + 1) + '/' + STEPS.length + '</span>' +
          '<div class="pbar-track"><div class="pbar-fill" style="width:' + ((st.stepIdx / STEPS.length) * 100) + '%"></div></div>' +
        '</div>' +
        '<div class="quiz-q-card anim-in">' +
          '<div style="font-size:0.72rem;color:#7f8fff;letter-spacing:0.08em;margin-bottom:6px">CROSS-BORDER CBRNE DRILL · ' + MODE_LABEL + '</div>' +
          '<div class="quiz-q-text" style="margin-bottom:8px">' + step.title + '</div>' +
          '<div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;line-height:1.5">' + step.narrative + '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">' + rolesHtml + '</div>' +
          '<details style="margin-bottom:14px"><summary style="cursor:pointer;color:#7f8fff;font-size:0.82rem">📋 시나리오 매트릭스 보기 (Hazard / Sector / Task / Inject / Expected / Failure)</summary>' +
            '<div style="overflow-x:auto;margin-top:8px"><table style="width:100%;font-size:0.72rem;color:#c8cbd9;border-collapse:collapse">' +
              '<thead><tr style="background:rgba(127,143,255,0.08)">' +
                '<th style="padding:6px 8px;text-align:left">Hazard</th>' +
                '<th style="padding:6px 8px;text-align:left">Sector</th>' +
                '<th style="padding:6px 8px;text-align:left">Task</th>' +
                '<th style="padding:6px 8px;text-align:left">Inject</th>' +
                '<th style="padding:6px 8px;text-align:left">Expected</th>' +
                '<th style="padding:6px 8px;text-align:left">Failure</th>' +
              '</tr></thead><tbody>' + matrixHtml + '</tbody></table></div></details>' +
          '<div style="font-size:0.78rem;color:#8b8fa3;margin-bottom:10px">정보 흐름: 핫존(현장 분류) → 콜드존(현장지휘) → 디스패치 → 병원 코디네이터 / 의미론 오피서</div>' +
          '<button class="quiz-next-btn" id="cbcbBriefingNext">' + step.ack + ' →</button>' +
        '</div>' +
      '</div>';

    var exitBtn = document.getElementById('cbcbExitBtn');
    if (exitBtn) exitBtn.addEventListener('click', function() {
      stopAllTimers(); G.screen = 'modes'; render();
    });
    document.getElementById('cbcbBriefingNext').addEventListener('click', function() {
      st.stepIdx++;
      st.answered = false;
      st.selected = -1;
      st.stepStartMs = Date.now();
      Tracker.startQuestion();
      renderCBCBStep();
    });
  }

  function renderChoice(step) {
    var st = G.cbcbState;
    var optsHtml = step.options.map(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var cls = '';
      if (st.answered) {
        if (opt.correct) cls = 'correct';
        else if (i === st.selected && !opt.correct) cls = 'wrong';
      }
      return '<button class="q-opt ' + cls + '" data-cbcb-i="' + i + '" ' + (st.answered ? 'disabled' : '') + '>' +
        '<span class="q-letter">' + letter + '</span>' +
        '<span class="q-opt-text">' + opt.text + '</span>' +
      '</button>';
    }).join('');

    var feedbackHtml = '';
    if (st.answered) {
      var chosen = step.options[st.selected];
      var fb = chosen ? chosen.feedback : '시간초과 — 응답이 기록되지 않았습니다.';
      feedbackHtml = '<div class="quiz-explanation">' + fb + '</div>';
      if (step.kahootNote) {
        feedbackHtml += '<div class="quiz-explanation" style="border-left-color:#ffb86b">💡 ' + step.kahootNote + '</div>';
      }
      if (step.id === 'semantics' && step.mappingTable) {
        var rows = step.mappingTable.map(function(m) {
          return '<tr>' +
            '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)">' + m.sourceSystem + '</td>' +
            '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)"><code>' + m.sourceTerm + '</code></td>' +
            '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06)">' + m.sharedDashboard + '</td>' +
            '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06);color:#7f8fff">' + m.koreanTerm + '</td>' +
            '<td style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.06);color:#ffb86b">' + m.flag + '</td>' +
          '</tr>';
        }).join('');
        feedbackHtml += '<div style="margin-top:10px;font-size:0.72rem;color:#c8cbd9"><strong style="color:#7f8fff">의료 의미론 매핑 표</strong>' +
          '<div style="overflow-x:auto;margin-top:6px"><table style="width:100%;font-size:0.7rem;border-collapse:collapse">' +
            '<thead><tr style="background:rgba(127,143,255,0.08)">' +
              '<th style="padding:6px 8px;text-align:left">Source system</th>' +
              '<th style="padding:6px 8px;text-align:left">Source term</th>' +
              '<th style="padding:6px 8px;text-align:left">Shared dashboard</th>' +
              '<th style="padding:6px 8px;text-align:left">Korean DMAT/START</th>' +
              '<th style="padding:6px 8px;text-align:left">Flag</th>' +
            '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
      }
      feedbackHtml += '<button class="quiz-next-btn" id="cbcbNextStep">다음 단계 →</button>';
    }

    app.innerHTML =
      renderHUD('cbcbTimer') +
      '<div class="screen quiz-game">' +
        '<div class="quiz-progress-bar" style="position:relative">' +
          '<button id="cbcbExitBtn" style="position:absolute;right:0;top:-2px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#8b8fa3;padding:4px 12px;border-radius:8px;font-size:0.72rem;cursor:pointer">✕ 나가기</button>' +
          '<span class="quiz-pbar-num">' + (st.stepIdx + 1) + '/' + STEPS.length + '</span>' +
          '<div class="pbar-track"><div class="pbar-fill" style="width:' + ((st.stepIdx / STEPS.length) * 100) + '%"></div></div>' +
        '</div>' +
        '<div class="quiz-q-card anim-in">' +
          '<div style="font-size:0.72rem;color:#7f8fff;letter-spacing:0.08em;margin-bottom:6px">CROSS-BORDER CBRNE DRILL · ' + MODE_LABEL + '</div>' +
          '<div class="quiz-q-text" style="margin-bottom:6px">' + step.title + '</div>' +
          '<div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:12px;line-height:1.5">' + step.situation + '</div>' +
          '<div class="quiz-q-text"><strong>' + step.question + '</strong></div>' +
          '<div class="quiz-opts">' + optsHtml + '</div>' +
          feedbackHtml +
        '</div>' +
      '</div>';

    var exitBtn2 = document.getElementById('cbcbExitBtn');
    if (exitBtn2) exitBtn2.addEventListener('click', function() {
      stopAllTimers(); G.screen = 'modes'; render();
    });

    if (!st.answered) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-cbcb-i]'), function(btn) {
        btn.addEventListener('click', function() {
          answerCBCB(parseInt(btn.getAttribute('data-cbcb-i'), 10));
        });
      });
      var timerSec = (step.id === 'degraded') ? 30 : 25;
      startCountdown('cbcbTimer', timerSec, updateTimerDisplay, function() {
        // 시간 초과 = 오답
        st.answered = true;
        st.selected = -1;
        recordStepResult(step, false, -1);
        updateStreak(false);
        sfx('wrong'); shakeScreen();
        renderCBCBStep();
      });
    } else {
      var nextBtn = document.getElementById('cbcbNextStep');
      if (nextBtn) nextBtn.addEventListener('click', function() {
        st.stepIdx++;
        st.answered = false;
        st.selected = -1;
        st.stepStartMs = Date.now();
        Tracker.startQuestion();
        renderCBCBStep();
      });
    }
  }

  function answerCBCB(idx) {
    var st = G.cbcbState;
    if (st.answered) return;
    var step = STEPS[st.stepIdx];
    st.answered = true;
    st.selected = idx;
    stopTimer('cbcbTimer');

    var opt = step.options[idx];
    var correct = !!(opt && opt.correct);

    Tracker.recordAnswer('cbcb_' + step.id, String(idx), correct);
    recordStepResult(step, correct, idx);

    if (correct) {
      sfx('correct'); flashScreen('green');
      var timeBonus = Math.max(0, (G.cbcbTimer || 0) * 5);
      addScore(150 + timeBonus);
      addXP(40);
      updateStreak(true);
      G.totalCorrect++;
    } else {
      sfx('wrong'); shakeScreen();
      addScore(-15);
      updateStreak(false);
    }
    checkAchievements();
    renderCBCBStep();
  }

  function recordStepResult(step, correct, chosenIdx) {
    var st = G.cbcbState;
    var now = Date.now();
    st.results.push({
      stepId: step.id,
      title: step.title,
      correct: correct,
      chosen: chosenIdx,
      timeMs: now - st.stepStartMs,
      atMs: now - st.runStartMs,
      atIso: new Date().toISOString()
    });
  }

  function showCBCBAAR() {
    stopAllTimers();
    var st = G.cbcbState || { results: [], runStartMs: Date.now() };
    var aar = computeAAR(st);
    G.modesCompleted.add(MODE_KEY);
    if (aar.pct === 100) G.perfectModes = (G.perfectModes || 0) + 1;
    var grade = getGrade(aar.pct);
    var gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';

    try { Tracker.endMode(aar.correct); } catch (e) { console.warn('Tracker error:', e); }
    try { checkAchievements(); } catch (e) {}
    try { advanceStoryAct(); } catch (e) {}
    if (grade === 'S' || grade === 'A') { try { confetti(); } catch (e) {} }

    function metricRow(label, value, target, unit, lowerIsBetter) {
      if (value === null || typeof value === 'undefined') {
        return '<div class="r-stat"><div class="val">—</div><div class="lbl">' + label + '</div></div>';
      }
      var ok;
      if (typeof target === 'number') {
        ok = lowerIsBetter ? (value <= target) : (value >= target);
      } else { ok = !!value; }
      var color = ok ? '#4ade80' : '#ff8b8b';
      return '<div class="r-stat"><div class="val" style="color:' + color + '">' + value + (unit || '') + '</div>' +
        '<div class="lbl">' + label + '<br><span style="font-size:0.62rem;color:#8b8fa3">목표 ' + (lowerIsBetter ? '≤ ' : '') + target + (unit || '') + '</span></div></div>';
    }

    var timelineHtml = aar.timeline.map(function(t, i) {
      return '<div style="display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.06)">' +
        '<div style="font-size:0.7rem;color:#8b8fa3;width:36px">T+' + t.timeSec + 's</div>' +
        '<div style="flex:1">' +
          '<div style="font-size:0.82rem;color:#e8eaf6">' + t.title + '</div>' +
          '<div style="font-size:0.7rem;color:' + (t.correct ? '#4ade80' : '#ff8b8b') + '">' + (t.correct ? '✓ 올바른 결정' : '✗ 보강 필요') + '</div>' +
        '</div></div>';
    }).join('');

    var listHtml = function(arr, color, prefix) {
      if (!arr || arr.length === 0) return '<div style="font-size:0.78rem;color:#8b8fa3">— 해당 없음 —</div>';
      return arr.map(function(s) {
        return '<div style="padding:6px 0;border-bottom:1px dashed rgba(255,255,255,0.05);font-size:0.82rem;color:' + color + '">' + prefix + ' ' + s + '</div>';
      }).join('');
    };

    app.innerHTML =
      '<div class="screen results-screen">' +
        '<div class="result-big anim-in">🌐</div>' +
        '<div class="result-sub">' + MODE_LABEL + ' — 사후강평 (AAR / Hot Wash)</div>' +
        '<div style="font-size:0.78rem;color:#8b8fa3;margin-bottom:10px">' + MODE_SUBTITLE_KO + '</div>' +
        '<div class="result-grade ' + gradeClass + ' anim-in">등급: ' + grade + '</div>' +
        '<div class="result-stats anim-in">' +
          '<div class="r-stat"><div class="val">' + aar.correct + '/' + aar.total + '</div><div class="lbl">정답</div></div>' +
          '<div class="r-stat"><div class="val">' + aar.pct + '%</div><div class="lbl">정확도</div></div>' +
          '<div class="r-stat"><div class="val">' + (aar.antidoteCorrect ? '✓' : '✗') + '</div><div class="lbl">시안화물 해독제</div></div>' +
          '<div class="r-stat"><div class="val">' + (aar.semanticsCorrect ? '✓' : '✗') + '</div><div class="lbl">의미론 매핑</div></div>' +
        '</div>' +
        '<div style="margin:14px 0;padding:14px;background:rgba(127,143,255,0.05);border:1px solid rgba(127,143,255,0.15);border-radius:12px">' +
          '<div style="font-size:0.85rem;font-weight:700;color:#7f8fff;margin-bottom:10px">⏱ 운영 메트릭 (Operational Metrics)</div>' +
          '<div class="result-stats" style="margin:0">' +
            metricRow('분류→대시보드 지연', aar.triageLatencySec, aar.targets.triageLatencySec, 's', true) +
            metricRow('인계 지연', aar.handoverLatencySec, aar.targets.handoverLatencySec, 's', true) +
            metricRow('예방가능 오염 이송', aar.preventableContaminatedTransport, aar.targets.preventableContaminatedTransport, '건', true) +
            metricRow('저하 네트워크 회복', aar.degradedRecoverySec, aar.targets.degradedRecoverySec, 's', true) +
          '</div>' +
        '</div>' +
        '<div style="margin:14px 0;padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px">' +
          '<div style="font-size:0.85rem;font-weight:700;color:#e8eaf6;margin-bottom:8px">🕒 의사결정 타임라인</div>' +
          (timelineHtml || '<div style="font-size:0.78rem;color:#8b8fa3">—</div>') +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr;gap:10px;margin:14px 0">' +
          '<div style="padding:12px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.2);border-radius:10px">' +
            '<div style="font-size:0.82rem;font-weight:700;color:#4ade80;margin-bottom:6px">강점</div>' +
            listHtml(aar.strengths, '#c8cbd9', '✓') +
          '</div>' +
          '<div style="padding:12px;background:rgba(255,139,139,0.06);border:1px solid rgba(255,139,139,0.2);border-radius:10px">' +
            '<div style="font-size:0.82rem;font-weight:700;color:#ff8b8b;margin-bottom:6px">개선 영역</div>' +
            listHtml(aar.improvements, '#c8cbd9', '!') +
          '</div>' +
          '<div style="padding:12px;background:rgba(127,143,255,0.06);border:1px solid rgba(127,143,255,0.2);border-radius:10px">' +
            '<div style="font-size:0.82rem;font-weight:700;color:#7f8fff;margin-bottom:6px">권고사항</div>' +
            listHtml(aar.recommendations, '#c8cbd9', '→') +
          '</div>' +
        '</div>' +
        '<div class="result-actions anim-in">' +
          '<button class="btn-primary" id="cbcbReplay">🔄 재훈련</button>' +
          '<button class="btn-outline" id="cbcbBackHome">🏠 미션 선택</button>' +
        '</div>' +
      '</div>';

    G.screen = 'results';

    document.getElementById('cbcbReplay').addEventListener('click', function() {
      enterMode(MODE_KEY);
    });
    document.getElementById('cbcbBackHome').addEventListener('click', function() {
      G.screen = 'modes'; render();
    });
  }

  // ---- 모드 등록 (몽키패치 패턴) ----
  // 1) render()에 새 화면 라우트 추가
  (function() {
    var _origRender = render;
    render = function() {
      if (G.screen === MODE_KEY) { renderCBCBStep(); return; }
      _origRender();
    };
  })();

  // 2) enterMode()에 새 모드 진입 처리
  (function() {
    var _origEnter = enterMode;
    enterMode = function(mode) {
      if (mode === MODE_KEY) {
        G.screen = MODE_KEY;
        initState();
        try { Tracker.startMode(MODE_KEY); } catch (e) {}
        try { Tracker.startQuestion(); } catch (e) {}
        renderCBCBStep();
        return;
      }
      _origEnter(mode);
    };
  })();

  // 3) 모드 선택 그리드에 카드 삽입
  (function() {
    var _origModeSelect = renderModeSelect;
    renderModeSelect = function() {
      _origModeSelect();
      var grid = document.querySelector('.mode-grid');
      if (grid && !document.querySelector('[data-mode="' + MODE_KEY + '"]')) {
        var card = document.createElement('button');
        card.className = 'mode-card';
        card.setAttribute('data-mode', MODE_KEY);
        card.style.cssText = 'border-color:rgba(127,143,255,0.35);background:linear-gradient(135deg,rgba(127,143,255,0.10),rgba(56,189,248,0.05));';
        var done = G.modesCompleted && G.modesCompleted.has && G.modesCompleted.has(MODE_KEY) ? '✅' : '🆕';
        card.innerHTML =
          '<div class="mode-icon">🌐</div>' +
          '<div class="mode-info">' +
            '<h3>' + MODE_LABEL + ' ' + done + '</h3>' +
            '<p style="font-size:0.7rem;color:#7f8fff;margin-bottom:2px;">' + MODE_SUBTITLE_KO + '</p>' +
            '<p>역할 기반 의사결정 · 시안화물 해독제 · 의미론 매핑 · 저하 네트워크 · AAR</p>' +
            '<div class="mode-tag-row">' +
              '<span class="mode-tag">국경간 합동</span>' +
              '<span class="mode-tag" style="background:rgba(127,143,255,0.18);color:#7f8fff">CBRNe Drill</span>' +
            '</div>' +
          '</div>';
        card.addEventListener('click', function() { enterMode(MODE_KEY); });
        grid.appendChild(card);
      }
    };
  })();

  // 4) 업적 추가: Cross-Border Drill Cleared
  (function() {
    if (typeof ACHIEVEMENTS === 'undefined') return;
    var exists = ACHIEVEMENTS.some(function(a) { return a.id === 'cross_border_clear'; });
    if (!exists) {
      ACHIEVEMENTS.push({
        id: 'cross_border_clear',
        name: 'Cross-Border Drill 클리어',
        desc: '국경간 CBRNe 합동 훈련 완료',
        icon: '🌐',
        category: 'mastery',
        check: function(g) { return g.modesCompleted && g.modesCompleted.has && g.modesCompleted.has(MODE_KEY); }
      });
    }
  })();

  // 5) 외부 노출 (관리자 라벨 등에서 참조 가능)
  window.CROSS_BORDER_CBRNE = {
    KEY: MODE_KEY,
    LABEL: MODE_LABEL,
    SUBTITLE_KO: MODE_SUBTITLE_KO,
    STEPS: STEPS,
    SCENARIO_MATRIX: SCENARIO_MATRIX,
    SEMANTICS_MAP: SEMANTICS_MAP,
    computeAAR: computeAAR
  };
})();
