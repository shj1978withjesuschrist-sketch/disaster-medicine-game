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
  var LANGUAGE = 'ko';

  // Construct map by stepId — analytic domain semantics (English keys; UI text remains Korean).
  // Kept identical to the English version so cross-language analyses can pool by construct.
  var STEP_META = {
    triage:    { phase: 'field_triage',      role: 'Field Triage Officer',                   construct: 'triage',          order: 2 },
    predecon:  { phase: 'pre_decon',         role: 'On-Scene Commander',                     construct: 'pre_decon',       order: 3 },
    antidote:  { phase: 'hospital_clinical', role: 'Hospital Clinician',                     construct: 'antidote',        order: 4 },
    semantics: { phase: 'semantic_mapping',  role: 'Medical Semantics / Translation Officer', construct: 'semantic_mapping', order: 5 },
    degraded:  { phase: 'degraded_network',  role: 'Dispatch Coordinator',                   construct: 'degraded_network',order: 6 },
    transport: { phase: 'allocation',        role: 'Hospital Coordinator',                   construct: 'allocation',      order: 7 },
    briefing:  { phase: 'briefing',          role: 'All',                                    construct: 'briefing',        order: 1 }
  };

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
  // 옵션은 안정 ID로 식별 (정답 판정은 id/isCorrect 기반, 인덱스 비의존).
  // 옵션 라벨 길이를 균등화하고 상세 설명은 feedback/AAR로 이동.
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
      title: '2. MASS/START 분류 결정 — Field Triage Officer',
      situation: '환자 A: 호흡곤란, 의식 저하 (GCS 12), 보행 불가, 청색증 동반. 핫존 인근에서 의식 변화 발생.',
      question: 'START/MASS 분류 결과는?',
      correctOptionId: 'red_immediate',
      options: [
        { id: 'red_immediate', text: 'Red / Immediate (즉시)', isCorrect: true,
          feedback: '정답. 호흡곤란·의식변화·보행 불가 → START에서 Red/Immediate. 즉시 해독제 동선 확보가 필요.' },
        { id: 'yellow_delayed', text: 'Yellow / Delayed (지연)', isCorrect: false,
          feedback: '오답. 의식 변화·호흡곤란이 동반된 시안화물 의심 환자는 Yellow가 아니다.' },
        { id: 'green_minor', text: 'Green / Minor (경미)', isCorrect: false,
          feedback: '오답. 보행 불가·의식 저하 환자는 Green이 될 수 없다.' },
        { id: 'black_expectant', text: 'Black / Expectant (기대불가)', isCorrect: false,
          feedback: '오답. 자발 호흡·반응이 남아 있으면 Expectant가 아니다 — 즉시 처치 가능.' }
      ],
      kahootNote: '카훗 분석: Red 분류를 Yellow/Green으로 오답하는 학생이 다수.'
    },
    {
      id: 'predecon',
      type: 'choice',
      title: '3. 사전(우선) 제독 우선순위 — On-Scene Commander',
      situation: '핫존에서 끌어낸 환자: 호흡곤란 악화, SpO₂ 82%, 의식 저하. 제독 줄에 환자 12명 대기.',
      question: '제독·응급처치 순서로 가장 적절한 결정은?',
      correctOptionId: 'priority_0',
      options: [
        { id: 'priority_0', text: '우선순위 0 — 즉시 기도·해독제 처치 후 제독', isCorrect: true,
          feedback: '정답. 생명 위협이 있을 때는 루틴 wet decon보다 즉시 응급처치(기도·해독제)가 우선. 제독은 응급처치 직후에 이어서 수행하며, 이는 사전(우선) 제독 원칙과 일치한다.' },
        { id: 'wet_decon_first', text: '루틴 wet decon 줄로 보낸 후 처치', isCorrect: false,
          feedback: '오답. 생명 위협 환자에게 루틴 wet decon을 먼저 하면 응급처치 지연으로 사망 위험 증가. 사전 응급처치 후 제독이 원칙.' },
        { id: 'dry_decon_first', text: '루틴 dry decon 줄로 보낸 후 처치', isCorrect: false,
          feedback: '오답. dry decon도 즉각적인 생명 구조 처치보다 선행돼서는 안 된다. 응급처치가 항상 우선이다.' },
        { id: 'retriage_after_decon', text: '전체 제독 완료 후 일괄 재분류 진행', isCorrect: false,
          feedback: '오답. 제독 줄에서 대기하는 동안 응급처치가 지연되어 위중 환자가 사망할 위험이 있다.' }
      ],
      kahootNote: '카훗 분석: "제독이 항상 먼저"라는 오개념 다수.'
    },
    {
      id: 'antidote',
      type: 'choice',
      title: '4. 시안화물 해독제 선택 — Hospital Clinician',
      situation: '환자 A 응급실 도착: 호흡 부전, 대사성 산증(젖산 12 mmol/L), QT 연장 동반 부정맥, 정맥혈 동맥혈화. HCN 노출 이력 확인.',
      question: '1차 선택 해독제는?',
      correctOptionId: 'hydroxocobalamin',
      options: [
        { id: 'hydroxocobalamin', text: 'Hydroxocobalamin (히드록소코발라민)', isCorrect: true,
          feedback: '정답. Hydroxocobalamin이 시안화물 중독의 1차 해독제 — 시안 이온과 결합해 시아노코발라민(소변 배설)으로 무독화.' },
        { id: 'atropine_2pam', text: 'Atropine + 2-PAM (아트로핀·프랄리독심)', isCorrect: false,
          feedback: '오답. Atropine/2-PAM은 신경작용제·콜린성 중독 해독제이지, 단독 시안화물 중독에는 적응증이 아니다.' },
        { id: 'calcium_gluconate', text: 'Calcium gluconate (글루콘산칼슘)', isCorrect: false,
          feedback: '오답. Calcium gluconate는 불산(HF) 노출에 사용되지, 시안화물에는 적응증이 아니다.' },
        { id: 'naloxone', text: 'Naloxone (날록손)', isCorrect: false,
          feedback: '오답. Naloxone은 오피오이드 길항제로, 시안화물 중독의 산소-운반·세포호흡 차단 기전에 작용하지 않아 효과가 없다.' }
      ],
      kahootNote: '카훗 분석: Atropine·Calcium gluconate 오답 빈발.'
    },
    {
      id: 'semantics',
      type: 'choice',
      title: '5. 의미론적 매핑 결정 — Medical Semantics Officer',
      situation: '국경 너머 EMS가 환자 다수를 "Critical"로 표기해 전송. 공동 대시보드는 한국 DMAT/START 용어 체계로 운영 중.',
      question: 'Medical Semantics Officer로서 어떻게 처리해야 하는가?',
      correctOptionId: 'semantic_mapping_confirmed',
      options: [
        { id: 'semantic_mapping_confirmed', text: '원어 보존, Red 매핑, 등가부재 플래그 기록', isCorrect: true,
          feedback: '정답. 원어("Critical") 보존, 공유 대시보드용 운영적 매핑(Red/Immediate), "1:1 등가 없음" 플래그까지 함께 기록해야 사후검증·거버넌스가 성립한다.' },
        { id: 'silent_substitution', text: '원어 삭제 후 Red/Immediate로 자동 치환', isCorrect: false,
          feedback: '오답. 원어 손실 → 사후 검증·감사 불가. 사일런트 매핑은 의미론 거버넌스 위반이며, 책임 추적이 불가능해진다.' },
        { id: 'no_mapping', text: '매핑하지 않고 원시스템 표기 그대로 유지', isCorrect: false,
          feedback: '오답. 공동 대시보드의 가시성·일관성이 사라져 우선순위 판단과 자원 배분이 흐트러진다.' },
        { id: 'mismap_yellow', text: '"Critical"을 Yellow/Delayed로 강등 매핑', isCorrect: false,
          feedback: '오답. 의미상 우선순위가 손실되어 즉각 처치가 필요한 환자가 후순위로 밀리고, 사망률이 증가할 수 있다.' }
      ],
      mappingTable: SEMANTICS_MAP,
      kahootNote: '교훈: 의미론·거버넌스 문제는 기술 문제와 동일하게 중요.'
    },
    {
      id: 'degraded',
      type: 'choice',
      title: '6. 저하 네트워크 인젝트 (Degraded Network) — Dispatch Coordinator',
      situation: '공동 대시보드 갱신 90초 지연, 병원 가용병상 데이터 stale, 중복 메시지 수신, 무전 잡음 발생. 환자 인계는 계속되어야 한다.',
      question: '저하 네트워크 상태에서 가장 적절한 운영 절차는?',
      correctOptionId: 'timestamp_partial_radio',
      options: [
        { id: 'timestamp_partial_radio', text: '타임스탬프·불확실성 표시 + 부분 갱신 + 무전 폴백', isCorrect: true,
          feedback: '정답. 타임스탬프 부여, 불확실성 명시, 역할 기반 부분 갱신, 무전 폴백이 정공법. 지연 메트릭은 별도 트래킹하여 회복 시간(목표 ≤ 120초)을 측정한다.' },
        { id: 'wait_for_recovery', text: '대시보드 복구될 때까지 의사결정을 모두 보류', isCorrect: false,
          feedback: '오답. 대기하는 동안 사상자가 누적된다. degraded 상태에서도 가용한 정보로 결정을 내려야 하며, 결정 보류는 환자 위해를 야기한다.' },
        { id: 'spam_resend', text: '동일 메시지를 5회 이상 재송신해 강제 동기화', isCorrect: false,
          feedback: '오답. 중복 메시지가 누적되어 더 큰 혼선과 채널 포화를 야기하고, 진짜 신호가 묻혀버린다.' },
        { id: 'social_media_fallback', text: '무전 채널을 끊고 비공식 SNS 공지로 전환', isCorrect: false,
          feedback: '오답. 비공식 채널은 거버넌스·보안·기록 보존 요건을 위반하며, 사후 감사가 불가능해진다.' }
      ],
      latencyTargetSec: 120
    },
    {
      id: 'transport',
      type: 'choice',
      title: '7. 국경간 병원 배정 / 오염 환자 이송 — Hospital Coordinator',
      situation: '현장팀이 인접 일반 병원으로 환자 직송을 요청. 병원 사전 통보·수용 확인·제독 절차 모두 미실시 상태.',
      question: 'Hospital Coordinator의 결정은?',
      correctOptionId: 'decon_notify_assign',
      options: [
        { id: 'decon_notify_assign', text: '제독·사전 통보 후 지정 수용병원 배정', isCorrect: true,
          feedback: '정답. 미제독·미통보 직송은 절대 금지 — 제독, 사전 통보, 수용역량 확인 후 지정 수용병원으로 배정. 위반 시 수용병원 오염→추가 사상자·시설 폐쇄.' },
        { id: 'direct_to_nearest', text: '가장 가까운 일반 병원으로 즉시 직송', isCorrect: false,
          feedback: '오답. 미제독 환자 직송은 가장 빈번한 예방가능 오류.' },
        { id: 'bulk_to_university', text: '병상 확인 없이 대학병원으로 일괄 송부', isCorrect: false,
          feedback: '오답. 수용역량 미확인 — 추가 혼란.' },
        { id: 'family_self_transport', text: '환자 가족이 자체 이송하도록 지시', isCorrect: false,
          feedback: '오답. 지휘체계·오염 통제 위반.' }
      ]
    }
  ];

  // ---- Fisher-Yates 셔플 (옵션 순서 비편향 무작위화) ----
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // 세션 시작 시 STEPS의 옵션 순서를 무작위화한 사본 생성.
  // 결정 단계만 셔플하며, 정답 판정은 option.id / option.isCorrect로 수행 (인덱스 비의존).
  function buildRandomizedSteps() {
    return STEPS.map(function(step) {
      if (step.type !== 'choice' || !step.options) return step;
      var copy = {};
      for (var k in step) { if (step.hasOwnProperty(k)) copy[k] = step[k]; }
      copy.options = shuffleArray(step.options);
      return copy;
    });
  }

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

    if (antidote && !antidote.correct) {
      recommendations.push('해독제 매트릭스(시안화물=Hydroxocobalamin, 신경작용제=Atropine+2-PAM, HF=Calcium gluconate) 카드 학습 후 재훈련');
    }
    if (predecon && !predecon.correct) {
      recommendations.push('"사전 응급처치 → 제독" 우선순위 SOP 재학습 — 생명 위협 상황에서 루틴 제독 줄 회피 절차 포함');
    }
    if (triage && !triage.correct) {
      recommendations.push('START/MASS 분류 카드 — 호흡·관류·의식(RPM) 기준으로 Red/Immediate 인지 반복 훈련');
    }
    if (semantics && !semantics.correct) {
      recommendations.push('국경간 의미론 매핑 SOP — 원어 보존, 운영 매핑, 등가부재 플래그 3단계 절차 도입');
    }
    if (degraded && !degraded.correct) {
      recommendations.push('Degraded Network 상황 카드를 분기별 정기 인젝트로 포함, 무전 폴백·타임스탬프 부여 절차 훈련');
    }
    if (transport && !transport.correct) {
      recommendations.push('미제독·미통보 환자 직송 금지 — 사전 통보→제독→수용역량 확인→배정 4단계 체크리스트 배포');
    }

    if (triageLatencySec !== null && triageLatencySec > 90) {
      recommendations.push('분류→대시보드 지연이 목표(90초)를 초과 — 분류 카드 단순화 및 입력 인터페이스 개선 필요');
    }
    if (handoverLatencySec !== null && handoverLatencySec > 180) {
      recommendations.push('인계 지연이 목표(180초)를 초과 — 핸드오프 SBAR 카드 표준화 권장');
    }
    if (degradedRecoverySec !== null && degradedRecoverySec > 120) {
      recommendations.push('저하 네트워크 회복이 목표(120초)를 초과 — 폴백 절차 자동화 및 사전 시뮬레이션 강화');
    }

    if (recommendations.length === 0) {
      recommendations.push('현재 수행 수준을 유지하고, 다중 허브·다중 시간대 시나리오로 확장 — 야간/주말 인력 축소 조건 추가');
      recommendations.push('국경간 합동 훈련을 분기 1회 정기화하여 의미론 거버넌스·degraded 절차 숙련도 유지');
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
      runStartMs: Date.now(),
      // 세션 단위로 옵션이 셔플된 단계 사본. 셔플 후에는 같은 단계 안에서 안정적으로 유지된다.
      steps: buildRandomizedSteps()
    };
  }

  function getSessionSteps() {
    if (!G.cbcbState || !G.cbcbState.steps) return STEPS;
    return G.cbcbState.steps;
  }

  // ---- 렌더 ----
  function renderCBCBStep() {
    if (!G.cbcbState) initState();
    var st = G.cbcbState;
    var step = getSessionSteps()[st.stepIdx];
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
        if (opt.isCorrect) cls = 'correct';
        else if (i === st.selected && !opt.isCorrect) cls = 'wrong';
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
    var step = getSessionSteps()[st.stepIdx];
    st.answered = true;
    st.selected = idx;
    stopTimer('cbcbTimer');

    // 정답 판정은 옵션 식별자(id/isCorrect) 기반 — 셔플된 인덱스에 의존하지 않음.
    var opt = step.options[idx];
    var correct = !!(opt && (opt.isCorrect === true || (step.correctOptionId && opt.id === step.correctOptionId)));

    // Tracker에는 옵션 ID를 기록(분석/AAR용). 폴백으로 인덱스 사용.
    var chosenId = (opt && opt.id) ? opt.id : String(idx);
    var stepMeta = STEP_META[step.id] || {};
    var responseSec = Math.round((Date.now() - (G.cbcbState && G.cbcbState.stepStartMs ? G.cbcbState.stepStartMs : Date.now())) / 1000);
    var trackerExtras = {
      stepId: step.id,
      stepIndex: (G.cbcbState ? G.cbcbState.stepIdx : null),
      construct: stepMeta.construct || null,
      phase: stepMeta.phase || null,
      role: stepMeta.role || null,
      correctOptionId: step.correctOptionId || null,
      selectedOptionId: (opt && opt.id) ? opt.id : null,
      selectedDisplayIndex: idx,
      displayedOptionOrder: (step.options || []).map(function(o) { return o.id; }),
      responseTimeSec: responseSec,
      timeTakenSec: responseSec,
      modeName: MODE_LABEL,
      modeKey: MODE_KEY,
      language: LANGUAGE,
      version: 'cross-border-cbrne-v1'
    };
    Tracker.recordAnswer('cbcb_' + step.id, chosenId, correct, trackerExtras);
    recordStepResult(step, correct, idx, opt);

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

  function recordStepResult(step, correct, chosenIdx, chosenOpt) {
    var st = G.cbcbState;
    var now = Date.now();
    var meta = STEP_META[step.id] || {};
    var displayedOrder = (step.options || []).map(function(o) { return o.id; });
    var result = {
      stepId: step.id,
      stepOrder: meta.order || (st.stepIdx + 1),
      phase: meta.phase || null,
      role: meta.role || null,
      construct: meta.construct || null,
      title: step.title,
      correctOptionId: step.correctOptionId || null,
      displayedOptionOrder: displayedOrder,
      selectedDisplayIndex: chosenIdx,
      chosenOptionId: chosenOpt && chosenOpt.id ? chosenOpt.id : null,
      chosenOptionLabel: chosenOpt && chosenOpt.text ? chosenOpt.text : null,
      correct: correct,
      // legacy fields preserved for any older consumer
      chosen: chosenIdx,
      timeMs: now - st.stepStartMs,
      timeSec: Math.round((now - st.stepStartMs) / 1000),
      atMs: now - st.runStartMs,
      atIso: new Date().toISOString()
    };
    st.results.push(result);

    // Best-effort: persist a rich, structured copy into LocalStore (in-memory),
    // alongside the standard Tracker.recordAnswer call. The backend schema
    // can't accept these extra fields, but LocalStore + Firebase can.
    try {
      if (typeof LocalStore !== 'undefined' && LocalStore.addAnswer) {
        LocalStore.addAnswer({
          mode: MODE_KEY,
          modeLabel: MODE_LABEL,
          language: LANGUAGE,
          question_id: 'cbcb_' + step.id,
          stepId: step.id,
          stepOrder: result.stepOrder,
          phase: result.phase,
          role: result.role,
          construct: result.construct,
          correctOptionId: result.correctOptionId,
          displayedOptionOrder: displayedOrder,
          selected: result.chosenOptionId || String(chosenIdx),
          selectedOptionId: result.chosenOptionId,
          selectedOptionLabel: result.chosenOptionLabel,
          selectedDisplayIndex: chosenIdx,
          correct: correct,
          time_sec: result.timeSec,
          responseTimeSec: result.timeSec,
          at: result.atIso,
          structured: true
        });
      }
    } catch (e) { /* non-fatal — Tracker.recordAnswer already logged the basic row */ }

    // Best-effort: push a richer answer event to Firebase so live admin sees structured data.
    try {
      if (window.FirebaseSync && FirebaseSync.isReady && FirebaseSync.isReady() && Tracker && Tracker.sessionId) {
        FirebaseSync.pushAnswer(Tracker.sessionId, {
          mode: MODE_KEY,
          question_id: 'cbcb_' + step.id + '__structured',
          selected: JSON.stringify({
            stepId: step.id,
            construct: result.construct,
            phase: result.phase,
            role: result.role,
            correctOptionId: result.correctOptionId,
            chosenOptionId: result.chosenOptionId,
            displayedOptionOrder: displayedOrder,
            selectedDisplayIndex: chosenIdx,
            language: LANGUAGE
          }),
          correct: correct,
          time_sec: result.timeSec
        });
      }
    } catch (e) {}
  }

  function showCBCBAAR() {
    stopAllTimers();
    var st = G.cbcbState || { results: [], runStartMs: Date.now() };
    var aar = computeAAR(st);
    G.modesCompleted.add(MODE_KEY);
    if (aar.pct === 100) G.perfectModes = (G.perfectModes || 0) + 1;
    var grade = getGrade(aar.pct);
    var gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';

    // Build the structured AAR payload first so we can also persist it as
    // mode_results.details on the backend (and reuse it for LocalStore/Firebase).
    var aarPayload = {
      mode: MODE_KEY,
      modeLabel: MODE_LABEL,
      language: LANGUAGE,
      score: G.score || 0,
      xpAtCompletion: G.xp || 0,
      correct: aar.correct,
      total: aar.total,
      accuracyPct: aar.pct,
      triageToDashboardSec: aar.triageLatencySec,
      handoverLatencySec: aar.handoverLatencySec,
      contaminatedTransportErrors: aar.preventableContaminatedTransport,
      degradedNetworkRecoverySec: aar.degradedRecoverySec,
      antidoteCorrect: aar.antidoteCorrect,
      semanticsCorrect: aar.semanticsCorrect,
      strengths: aar.strengths,
      improvements: aar.improvements,
      recommendations: aar.recommendations,
      perStep: aar.timeline,
      targets: aar.targets,
      structuredResults: (st.results || []).map(function(r) {
        return {
          stepId: r.stepId,
          construct: r.construct || (STEP_META[r.stepId] && STEP_META[r.stepId].construct) || null,
          phase: r.phase || (STEP_META[r.stepId] && STEP_META[r.stepId].phase) || null,
          role: r.role || (STEP_META[r.stepId] && STEP_META[r.stepId].role) || null,
          correctOptionId: r.correctOptionId,
          displayedOptionOrder: r.displayedOptionOrder,
          selectedDisplayIndex: r.selectedDisplayIndex,
          chosenOptionId: r.chosenOptionId,
          chosenOptionLabel: r.chosenOptionLabel,
          correct: r.correct,
          responseTimeSec: r.timeSec,
          atIso: r.atIso
        };
      }),
      completedAt: new Date().toISOString()
    };

    try { Tracker.endMode(aar.correct, aarPayload); } catch (e) { console.warn('Tracker error:', e); }
    try { checkAchievements(); } catch (e) {}
    try { advanceStoryAct(); } catch (e) {}
    if (grade === 'S' || grade === 'A') { try { confetti(); } catch (e) {} }

    try {
      if (typeof LocalStore !== 'undefined' && LocalStore.addModeResult) {
        LocalStore.addModeResult({
          mode: MODE_KEY,
          modeLabel: MODE_LABEL,
          language: LANGUAGE,
          score: G.score || 0,
          correct: aar.correct,
          total: aar.total,
          time_sec: Math.round((Date.now() - (st.runStartMs || Date.now())) / 1000),
          at: aarPayload.completedAt,
          aar: aarPayload
        });
      }
    } catch (e) {}
    try {
      if (window.FirebaseSync && FirebaseSync.isReady && FirebaseSync.isReady() && Tracker && Tracker.sessionId) {
        FirebaseSync.pushModeResult(Tracker.sessionId, {
          mode: MODE_KEY,
          score: G.score || 0,
          correct: aar.correct,
          total: aar.total,
          time_sec: Math.round((Date.now() - (st.runStartMs || Date.now())) / 1000)
        });
        // Encode AAR JSON into a single answer-style event so live admin can
        // capture it without requiring a backend schema change.
        FirebaseSync.pushAnswer(Tracker.sessionId, {
          mode: MODE_KEY,
          question_id: 'cbcb__aar_summary',
          selected: JSON.stringify(aarPayload),
          correct: aar.pct === 100,
          time_sec: 0
        });
      }
    } catch (e) {}
    // Expose last AAR for tests + admin overlay drill-down.
    G.lastCrossBorderAAR = aarPayload;

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
    LANGUAGE: LANGUAGE,
    STEPS: STEPS,
    STEP_META: STEP_META,
    SCENARIO_MATRIX: SCENARIO_MATRIX,
    SEMANTICS_MAP: SEMANTICS_MAP,
    computeAAR: computeAAR,
    _shuffleArray: shuffleArray,
    _buildRandomizedSteps: buildRandomizedSteps,
    _scoreOption: function(step, opt) {
      return !!(opt && (opt.isCorrect === true || (step && step.correctOptionId && opt.id === step.correctOptionId)));
    },
    _answerCBCB: answerCBCB,
    _showAAR: showCBCBAAR,
    runSelfTest: runSelfTest
  };

  // ---- Self-test / data-quality audit ----
  // Validates: stable IDs, displayed-order capture, ID-based scoring after
  // randomization, AAR generation, no user-facing "ISCRAM", admin labels.
  function runSelfTest() {
    var failures = [];
    var pass = 0;
    function check(name, ok, detail) {
      if (ok) { pass++; }
      else { failures.push({ name: name, detail: detail || '' }); }
    }

    // 1. Every choice step has stable correctOptionId + every option has unique stable id.
    var choiceSteps = STEPS.filter(function(s) { return s.type === 'choice'; });
    check('choice steps present', choiceSteps.length === 6, 'expected 6, got ' + choiceSteps.length);
    choiceSteps.forEach(function(step) {
      check('step ' + step.id + ' has correctOptionId', !!step.correctOptionId);
      var ids = (step.options || []).map(function(o) { return o.id; });
      var unique = ids.filter(function(v, i, a) { return a.indexOf(v) === i; });
      check('step ' + step.id + ' has unique option ids', unique.length === ids.length);
      check('step ' + step.id + ' correctOptionId matches an option', ids.indexOf(step.correctOptionId) !== -1);
      var corrects = (step.options || []).filter(function(o) { return o.isCorrect; });
      check('step ' + step.id + ' has exactly one isCorrect option', corrects.length === 1);
      check('step ' + step.id + ' isCorrect option id matches correctOptionId',
            corrects.length === 1 && corrects[0].id === step.correctOptionId);
    });

    // 2. Construct/phase/role metadata exists for every choice step.
    choiceSteps.forEach(function(step) {
      var meta = STEP_META[step.id];
      check('step ' + step.id + ' has STEP_META', !!meta);
      if (meta) {
        check('step ' + step.id + ' has construct', !!meta.construct);
        check('step ' + step.id + ' has phase', !!meta.phase);
        check('step ' + step.id + ' has role', !!meta.role);
      }
    });

    // 3. Randomization preserves correctness via id-based scoring.
    for (var trial = 0; trial < 30; trial++) {
      var randomized = buildRandomizedSteps();
      randomized.forEach(function(step) {
        if (step.type !== 'choice') return;
        var correctOpt = step.options.filter(function(o) { return o.id === step.correctOptionId; })[0];
        check('randomized step ' + step.id + ' still resolves correctOptionId',
              !!correctOpt && correctOpt.isCorrect === true);
      });
    }

    // 4. _scoreOption returns true only for the correct option, regardless of position.
    choiceSteps.forEach(function(step) {
      var randomized = buildRandomizedSteps().filter(function(s) { return s.id === step.id; })[0];
      randomized.options.forEach(function(opt) {
        var scored = window.CROSS_BORDER_CBRNE._scoreOption(step, opt);
        check('score(' + step.id + ',' + opt.id + ') matches isCorrect', scored === !!opt.isCorrect);
      });
    });

    // 5. computeAAR produces required keys.
    var fakeState = {
      runStartMs: 0,
      results: choiceSteps.map(function(step, i) {
        return {
          stepId: step.id,
          title: step.title,
          correct: true,
          chosen: 0,
          chosenOptionId: step.correctOptionId,
          chosenOptionLabel: 'x',
          timeMs: 5000 + i * 1000,
          atMs: 5000 + i * 1000,
          atIso: new Date().toISOString()
        };
      })
    };
    var aar = computeAAR(fakeState);
    ['total', 'correct', 'pct', 'triageLatencySec', 'handoverLatencySec',
     'degradedRecoverySec', 'preventableContaminatedTransport',
     'antidoteCorrect', 'semanticsCorrect', 'targets', 'strengths',
     'improvements', 'recommendations', 'timeline'].forEach(function(k) {
      check('AAR has key ' + k, aar.hasOwnProperty(k));
    });
    check('AAR target triageLatencySec=90', aar.targets.triageLatencySec === 90);
    check('AAR target handoverLatencySec=180', aar.targets.handoverLatencySec === 180);
    check('AAR target preventableContaminatedTransport=0', aar.targets.preventableContaminatedTransport === 0);
    check('AAR target degradedRecoverySec=120', aar.targets.degradedRecoverySec === 120);

    // 6. No user-facing "ISCRAM" string in any UI text.
    var uiBlobs = [];
    STEPS.forEach(function(s) {
      ['title', 'narrative', 'situation', 'question', 'ack'].forEach(function(k) {
        if (s[k]) uiBlobs.push(s[k]);
      });
      (s.options || []).forEach(function(o) {
        uiBlobs.push(o.text || '');
        uiBlobs.push(o.feedback || '');
      });
    });
    uiBlobs.push(MODE_LABEL);
    uiBlobs.push(MODE_SUBTITLE_KO);
    var iscram = uiBlobs.some(function(s) { return /ISCRAM/i.test(s); });
    check('no user-facing ISCRAM string', !iscram);

    // 7. Mode label remains exactly "Cross-Border CBRNe Drill".
    check('mode label preserved', MODE_LABEL === 'Cross-Border CBRNe Drill');

    // 8. Admin label maps include crossBorderCbrne (best-effort — only when a
    //    real <script src="app.js"> tag is present; skipped in headless harness).
    if (typeof document !== 'undefined' && document.querySelectorAll) {
      var scripts = document.querySelectorAll('script[src]');
      if (scripts && scripts.length > 0) {
        var hasAppJs = Array.prototype.some.call(scripts, function(s) { return s && s.src && /app\.js/.test(s.src); });
        check('app.js script loaded (admin labels live there)', hasAppJs);
      }
    }

    var summary = {
      pass: pass,
      fail: failures.length,
      failures: failures,
      ok: failures.length === 0
    };
    if (typeof console !== 'undefined') {
      if (summary.ok) console.log('[Cross-Border CBRNe self-test] OK — ' + pass + ' checks passed');
      else console.warn('[Cross-Border CBRNe self-test] ' + failures.length + ' failures', failures);
    }
    return summary;
  }

  // Auto-run when ?cbcbTest=1 is in the URL — exposes results on
  // window.CROSS_BORDER_CBRNE.lastSelfTest for headless harnesses.
  try {
    if (typeof window !== 'undefined' && window.location && /[?&]cbcbTest=1/.test(window.location.search)) {
      setTimeout(function() {
        window.CROSS_BORDER_CBRNE.lastSelfTest = runSelfTest();
      }, 0);
    }
  } catch (e) {}
})();
