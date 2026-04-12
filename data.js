// ============================================
// DISASTER MEDICINE SIMULATOR — DATA
// ============================================

const SCENARIOS = {
  triage: {
    title: '대형 폭발 사고 현장',
    titleEn: 'Mass Explosion Incident',
    description: '도심 건물 폭발로 다수의 사상자가 발생했습니다. START Triage 알고리즘을 사용하여 환자를 신속하게 분류하세요.',
    patients: [
      {
        id: 'P-001',
        name: '김지수',
        age: 34,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '32회/분', status: 'critical', label: '호흡수' },
          pulse: { value: '128bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '3초', status: 'warning', label: '모세혈관 재충전' },
          consciousness: { value: '반응 있음', status: 'normal', label: '의식상태' }
        },
        findings: [
          '우측 대퇴부 개방성 골절로 출혈 지속',
          '안면부 열상 및 유리 파편 박힘',
          '빈호흡 상태, 복부 긴장 있음',
          '간단한 명령에 반응 가능'
        ],
        correctTriage: 'red',
        explanation: '호흡수 30회/분 이상 → 빈호흡. START 알고리즘에 따라 호흡이 있고 호흡수가 30 이상이면 즉시(RED) 분류. 대퇴부 개방골절 출혈도 응급처치 필요.'
      },
      {
        id: 'P-002',
        name: '박성호',
        age: 52,
        gender: '남',
        icon: '👨',
        vitals: {
          respiration: { value: '없음', status: 'critical', label: '호흡수' },
          pulse: { value: '없음', status: 'critical', label: '맥박' },
          capRefill: { value: '측정불가', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '무반응', status: 'critical', label: '의식상태' }
        },
        findings: [
          '기도 개방 후에도 자발호흡 없음',
          '경동맥 맥박 촉지 불가',
          '동공 산대 및 고정',
          '흉벽 함몰 및 다발성 손상'
        ],
        correctTriage: 'black',
        explanation: '기도 개방 후에도 호흡 없음 → 사망/기대불가(BLACK). START 알고리즘의 첫 단계: 보행 가능 여부 확인 후, 호흡 여부 확인. 기도 확보 후에도 자발호흡이 없으면 BLACK 분류.'
      },
      {
        id: 'P-003',
        name: '이수진',
        age: 28,
        gender: '여',
        icon: '👩‍🦰',
        vitals: {
          respiration: { value: '20회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '88bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' }
        },
        findings: [
          '좌측 전완부 폐쇄성 골절 의심',
          '안면부 미세 열상 (출혈 자체 지혈됨)',
          '독립적 보행 가능',
          '의식 명료하고 지남력 유지'
        ],
        correctTriage: 'green',
        explanation: '보행 가능 → 경상(GREEN). START의 첫 단계에서 스스로 걸을 수 있는 환자는 GREEN으로 분류. 전완부 골절은 생명에 즉각적 위협이 아님.'
      },
      {
        id: 'P-004',
        name: '최영준',
        age: 45,
        gender: '남',
        icon: '👨‍🦳',
        vitals: {
          respiration: { value: '22회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '102bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '4초', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '간단 명령 따름', status: 'normal', label: '의식상태' }
        },
        findings: [
          '복부 둔상으로 복부 팽만 관찰',
          '좌측 늑골 다발 골절 의심',
          '보행 불가, 들것 이송 필요',
          '의식은 있으나 지시에 느린 반응'
        ],
        correctTriage: 'red',
        explanation: '호흡수 30 미만 → 순환 확인 → 모세혈관 재충전 4초(>2초) → 즉시(RED). 관류 장애 징후가 있으면 RED 분류. 복부 내 출혈 가능성 높음.'
      },
      {
        id: 'P-005',
        name: '정하윤',
        age: 19,
        gender: '여',
        icon: '👧',
        vitals: {
          respiration: { value: '18회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '92bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' }
        },
        findings: [
          '좌측 경골 폐쇄성 골절로 보행 불가',
          '하지 감각 및 원위 맥박 정상',
          '활력징후 안정적',
          '의식 명료하고 협조적'
        ],
        correctTriage: 'yellow',
        explanation: '호흡수 정상(30 미만) → 순환 정상(모세혈관 재충전 ≤2초) → 의식 확인: 간단한 명령 따름 → 지연(YELLOW). 보행 불가하지만 활력징후가 안정적이고 즉각적 생명 위협 없음.'
      },
      {
        id: 'P-006',
        name: '한동욱',
        age: 67,
        gender: '남',
        icon: '👴',
        vitals: {
          respiration: { value: '28회/분', status: 'warning', label: '호흡수' },
          pulse: { value: '110bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '혼돈', status: 'warning', label: '의식상태' }
        },
        findings: [
          '두부 외상 — 두피 열상 출혈',
          '이름/날짜/장소 지남력 상실',
          '간단한 명령에 반응하지 못함',
          '보행 불가, 구역감 호소'
        ],
        correctTriage: 'red',
        explanation: '호흡수 30 미만 → 순환 정상 → 의식 확인: 간단한 명령에 반응하지 못함 → 즉시(RED). START에서 정신상태 변화가 있으면 RED로 분류. 두부외상 + 의식변화는 응급.'
      },
      {
        id: 'P-007',
        name: '서민지',
        age: 8,
        gender: '여',
        icon: '👧',
        vitals: {
          respiration: { value: '없음→재개', status: 'critical', label: '호흡수' },
          pulse: { value: '130bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '울고 있음', status: 'normal', label: '의식상태' }
        },
        findings: [
          '처음 발견 시 호흡 없었으나 기도 개방 후 호흡 재개',
          '안면부 먼지 및 경미한 찰과상',
          '사지 외상 없음',
          '울면서 부모를 찾고 있음'
        ],
        correctTriage: 'red',
        explanation: '처음 호흡 없음 → 기도 개방 → 호흡 재개 → 즉시(RED). 기도 개방 후 호흡이 돌아온 경우는 기도 유지가 필요하므로 RED 분류. 기도 폐쇄 재발 위험이 높음.'
      },
      {
        id: 'P-008',
        name: '윤준서',
        age: 41,
        gender: '남',
        icon: '👨',
        vitals: {
          respiration: { value: '16회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '78bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '1.5초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' }
        },
        findings: [
          '소규모 유리 파편에 의한 다수 표재성 열상',
          '좌측 손가락 2개 자상 (출혈 자체 지혈)',
          '독립적 보행 가능',
          '활력징후 완전 정상'
        ],
        correctTriage: 'green',
        explanation: '보행 가능 → 경상(GREEN). 활력징후 정상이고 독립적으로 걸을 수 있으므로 GREEN. 표재성 상처만 있어 즉각적 치료 불필요.'
      },
      {
        id: 'P-009',
        name: '장혜린',
        age: 55,
        gender: '여',
        icon: '👩‍🦳',
        vitals: {
          respiration: { value: '24회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '96bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' }
        },
        findings: [
          '좌측 어깨 탈구 의심',
          '흉부 타박상 — 심호흡 시 통증',
          '보행은 가능하나 통증으로 거부',
          '의식 명료, 협조적'
        ],
        correctTriage: 'yellow',
        explanation: '호흡수 정상 → 순환 정상 → 의식 정상 → 지연(YELLOW). 보행을 거부하지만 활력징후와 의식이 정상. 어깨 탈구와 흉부 타박은 즉각 위협 아님. 보행 가능하지만 거부하는 경우 GREEN이 아닌 YELLOW.'
      },
      {
        id: 'P-010',
        name: '강태현',
        age: 23,
        gender: '남',
        icon: '👨‍🦱',
        vitals: {
          respiration: { value: '36회/분', status: 'critical', label: '호흡수' },
          pulse: { value: '140bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '5초', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '의식 저하', status: 'critical', label: '의식상태' }
        },
        findings: [
          '좌측 흉부 관통상 — 개방성 기흉 의심',
          '피하기종 촉지',
          '산소포화도 급격히 저하',
          '호흡 보조근 사용, 청색증 진행'
        ],
        correctTriage: 'red',
        explanation: '호흡수 36회/분(>30) → 즉시(RED). 빈호흡 자체로 RED 분류. 개방성 기흉은 즉각적 3면 밀봉 드레싱 필요. 관류 장애와 의식 저하도 동반.'
      }
    ]
  }
};

const CBRNE_SCENARIOS = [
  {
    id: 'chemical',
    title: '화학물질 유출 사고',
    type: 'Chemical (C)',
    icon: '☣️',
    description: '산업단지에서 대량의 염소 가스가 유출되었습니다. 주변 주민과 근로자에 대한 즉각적인 대응이 필요합니다. 올바른 대응 순서를 선택하세요.',
    steps: [
      { id: 1, title: '현장 접근 통제', desc: '풍상측(바람이 부는 반대쪽)에서 접근하고, 위험 구역을 설정 (Hot/Warm/Cold Zone)', correct: 1 },
      { id: 2, title: 'PPE 착용', desc: 'Level A 또는 B 보호장비 착용 확인 — 자가 공기호흡기(SCBA) 포함', correct: 2 },
      { id: 3, title: '환자 구출 및 제염', desc: '피폭 환자를 Hot Zone에서 구출 → Warm Zone에서 즉시 대량 제염 (물 세척)', correct: 3 },
      { id: 4, title: '해독제 투여', desc: '염소 가스 노출 시 기관지경련에 대해 기관지확장제 투여, 산소 공급', correct: 4 },
      { id: 5, title: 'Triage 시행', desc: '제염 완료 후 Cold Zone에서 START Triage 시행, 중증도 분류', correct: 5 },
      { id: 6, title: '의료기관 이송', desc: '중증 환자부터 인근 수용 가능 병원으로 이송 (병원에 사전 화학물질 통보)', correct: 6 }
    ]
  },
  {
    id: 'biological',
    title: '생물학적 위협 대응',
    type: 'Biological (B)',
    icon: '🦠',
    description: '의심스러운 백색 분말이 포함된 소포가 공공기관에서 발견되었습니다. 탄저균(Anthrax) 테러 가능성에 대응하세요.',
    steps: [
      { id: 1, title: '현장 격리', desc: '발견 장소 즉시 봉쇄, 인원 대피 및 HVAC(공조시스템) 차단', correct: 1 },
      { id: 2, title: '노출자 확인', desc: '의심 물질에 직접 노출된 인원 목록 작성 및 격리', correct: 2 },
      { id: 3, title: '검체 수집 및 분석', desc: '전문 HAZMAT 팀이 검체 수집, 현장 검사(PCR) 또는 전문 실험실 의뢰', correct: 3 },
      { id: 4, title: '예방적 항생제 투여', desc: '탄저 의심 시 Ciprofloxacin 또는 Doxycycline 예방적 투여 시작', correct: 4 },
      { id: 5, title: '제염 및 세척', desc: '노출자 의복 제거, 비누와 물로 전신 세척', correct: 5 },
      { id: 6, title: '추적 관찰', desc: '노출자 60일 예방적 항생제 + 백신 접종, 증상 모니터링', correct: 6 }
    ]
  },
  {
    id: 'radiological',
    title: '방사능 오염 사고',
    type: 'Radiological (R)',
    icon: '☢️',
    description: '병원 방사선과에서 고준위 방사성 물질이 유출되었습니다. 방사능 오염 환자가 발생하였고, 즉각적인 방호 조치가 필요합니다.',
    steps: [
      { id: 1, title: '피폭 거리 확보', desc: '방사선원으로부터 최대한 거리 확보, 시간-거리-차폐 원칙 적용', correct: 1 },
      { id: 2, title: '오염 구역 설정', desc: '방사선량 측정기로 구역 확인, Hot/Buffer/Clean 구역 설정', correct: 2 },
      { id: 3, title: '환자 구출', desc: 'PPE 착용 후 피폭 환자 신속 구출, 구출자 선량 제한 모니터링', correct: 3 },
      { id: 4, title: '외부 오염 제거', desc: '오염된 의복 제거(90% 오염 감소), 비누와 물로 세척, 서베이 확인', correct: 4 },
      { id: 5, title: '내부 오염 평가', desc: '방사성 요오드 흡입 시 KI(요오드화칼륨) 투여, 전신계수기 검사', correct: 5 },
      { id: 6, title: '의학적 치료', desc: '급성방사선증후군(ARS) 평가: CBC/림프구 추적, 구토 시간 기록', correct: 6 }
    ]
  }
];

const MCI_SCENARIOS = [
  {
    title: '지하철 충돌 사고',
    description: '출퇴근 시간 지하철 2대 충돌, 약 200명의 승객 피해 예상',
    totalPatients: 47,
    resources: {
      ambulances: { total: 8, label: '구급차' },
      doctors: { total: 5, label: '현장 의사' },
      helicopters: { total: 2, label: '의료 헬기' },
      hospitals: { total: 3, label: '수용 병원' }
    },
    zones: { red: 12, yellow: 15, green: 14, black: 6 },
    decisions: [
      {
        question: '지하 현장에서 환자 이송 우선순위를 어떻게 결정하시겠습니까?',
        options: [
          { id: 'a', text: 'RED 환자 전원을 먼저 지상으로 이송', correct: false },
          { id: 'b', text: '보행 가능 GREEN 환자를 먼저 대피시킨 후 RED 환자 이송', correct: true },
          { id: 'c', text: '발견 순서대로 이송', correct: false },
          { id: 'd', text: 'BLACK 환자를 포함한 전원 동시 이송 시도', correct: false }
        ],
        explanation: 'MCI에서는 GREEN(보행 가능) 환자를 먼저 대피시켜 현장 혼잡도를 줄이고, RED 환자 치료에 집중할 수 있는 공간을 확보하는 것이 원칙입니다.'
      },
      {
        question: '구급차 8대에 RED 환자 12명을 이송해야 합니다. 어떤 전략이 가장 적합합니까?',
        options: [
          { id: 'a', text: '1대당 1명씩 이송, 4명은 대기', correct: false },
          { id: 'b', text: '가장 가까운 병원 1곳에 전원 이송', correct: false },
          { id: 'c', text: '가용 병원 3곳에 분산 이송, 중증도에 따라 병원 배정', correct: true },
          { id: 'd', text: '의료 헬기 2대로 먼 대형병원으로 이송', correct: false }
        ],
        explanation: '제한된 자원 상황에서는 수용 가능 병원에 환자를 분산하여 이송하는 것이 핵심입니다. 한 병원에 집중되면 병원 과부하가 발생합니다.'
      },
      {
        question: '현장에서 지휘체계(ICS)를 수립할 때 가장 먼저 해야 할 일은?',
        options: [
          { id: 'a', text: '언론 브리핑 준비', correct: false },
          { id: 'b', text: '현장 지휘관(IC) 지정 및 지휘소 설치', correct: true },
          { id: 'c', text: '추가 구급차 요청', correct: false },
          { id: 'd', text: '환자 이송 시작', correct: false }
        ],
        explanation: 'ICS(사고지휘체계)의 첫 단계는 현장 지휘관 지정과 지휘소 설치입니다. 명확한 지휘체계 없이는 자원 배분과 의사소통이 혼란에 빠집니다.'
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    question: 'START Triage에서 첫 번째로 확인하는 것은 무엇입니까?',
    options: [
      '맥박 유무',
      '보행 가능 여부',
      '의식 수준',
      '호흡수'
    ],
    correct: 1,
    explanation: 'START(Simple Triage and Rapid Treatment)의 첫 단계는 "보행 가능 여부" 확인입니다. 걸을 수 있으면 GREEN(경상)으로 즉시 분류합니다.'
  },
  {
    question: 'START Triage에서 기도 개방 후에도 자발호흡이 없는 환자의 분류는?',
    options: [
      'RED (즉시)',
      'YELLOW (지연)',
      'BLACK (사망/기대불가)',
      'GREEN (경상)'
    ],
    correct: 2,
    explanation: '기도를 개방한 후에도 자발호흡이 없으면 BLACK(사망/기대불가)으로 분류합니다. MCI 상황에서는 제한된 자원을 생존 가능성이 높은 환자에게 집중해야 합니다.'
  },
  {
    question: 'MCI 현장에서 Incident Command System(ICS)의 핵심 기능 5가지에 해당하지 않는 것은?',
    options: [
      '지휘(Command)',
      '작전(Operations)',
      '교육(Education)',
      '계획(Planning)'
    ],
    correct: 2,
    explanation: 'ICS의 5대 기능은 지휘(Command), 작전(Operations), 계획(Planning), 물류(Logistics), 재정/행정(Finance/Admin)입니다. 교육은 ICS의 핵심 기능이 아닙니다.'
  },
  {
    question: '화학물질 사고 현장에서 Hot Zone에 진입 시 최소 필요한 보호장비 수준은?',
    options: [
      'Level D (작업복, 안전화)',
      'Level C (전면 마스크 + 카트리지)',
      'Level B (SCBA + 화학복)',
      'Level A (완전 밀폐형 화학복 + SCBA)'
    ],
    correct: 2,
    explanation: '미확인 화학물질 Hot Zone 진입 시 최소 Level B(자급식 공기호흡기 + 화학물질 방호복)가 필요합니다. 물질 미확인 시 Level A를 권장하기도 합니다.'
  },
  {
    question: '탄저(Anthrax) 피부형에 대한 예방적 항생제로 적절한 것은?',
    options: [
      'Amoxicillin',
      'Ciprofloxacin',
      'Metronidazole',
      'Vancomycin'
    ],
    correct: 1,
    explanation: '탄저 노출 시 예방적 항생제로 Ciprofloxacin 또는 Doxycycline이 권장됩니다. 60일간 투여하며, 백신 접종을 병행합니다.'
  },
  {
    question: '방사능 사고에서 오염된 의복을 제거하면 방사성 오염의 약 몇 %가 감소합니까?',
    options: [
      '약 50%',
      '약 70%',
      '약 90%',
      '약 30%'
    ],
    correct: 2,
    explanation: '의복 제거만으로도 외부 방사성 오염의 약 90%를 제거할 수 있습니다. 이는 방사능 오염 환자 관리의 가장 기본적이면서도 효과적인 첫 단계입니다.'
  },
  {
    question: '재난 Triage에서 YELLOW(지연) 환자의 기준으로 올바른 것은?',
    options: [
      '보행 가능하고 의식 명료',
      '호흡수 30 이상, 맥박 빠름',
      '호흡, 순환, 의식 모두 정상이나 보행 불가',
      '기도 개방 후 호흡 재개'
    ],
    correct: 2,
    explanation: 'YELLOW는 호흡수 정상(<30), 순환 정상(모세혈관 재충전 ≤2초 또는 요골맥 촉지), 의식 정상(간단한 명령 이행 가능)이지만 보행이 불가능한 환자입니다.'
  },
  {
    question: 'JumpSTART Triage(소아용)에서 성인 START와 가장 다른 점은?',
    options: [
      '보행 가능 여부를 먼저 확인하지 않음',
      '호흡이 없을 때 5회 인공호흡을 시도함',
      '맥박 대신 의식만 확인함',
      '모든 소아를 RED로 분류함'
    ],
    correct: 1,
    explanation: 'JumpSTART는 소아 환자(1-8세)에서 무호흡 시 5회 인공호흡(rescue breathing)을 시도합니다. 이후 호흡이 재개되면 RED, 되지 않으면 BLACK으로 분류합니다.'
  },
  {
    question: '대량 사상자 사고에서 "Surge Capacity"의 의미로 가장 적절한 것은?',
    options: [
      '일일 외래 환자 수용 능력',
      '재난 시 의료 자원을 초과 동원하여 환자를 수용하는 능력',
      '병원 직원 수 대비 환자 비율',
      '구급차의 최대 속도'
    ],
    correct: 1,
    explanation: 'Surge Capacity는 대량 사상자 발생 시 평상시 수용 능력을 초과하여 환자를 수용할 수 있도록 인력, 공간, 물자를 확대하는 의료시스템의 능력을 의미합니다.'
  },
  {
    question: '화학 무기 신경작용제(Sarin, VX) 노출 시 해독제 조합으로 올바른 것은?',
    options: [
      'Naloxone + Flumazenil',
      'Atropine + Pralidoxime (2-PAM)',
      'Calcium gluconate + Sodium bicarbonate',
      'N-Acetylcysteine + Activated charcoal'
    ],
    correct: 1,
    explanation: '신경작용제는 아세틸콜린에스테라제를 억제합니다. Atropine(무스카린 수용체 차단)과 Pralidoxime/2-PAM(효소 재활성화)이 표준 해독제 조합입니다.'
  },
  {
    question: '폭발 손상에서 Primary blast injury의 주요 표적 장기는?',
    options: [
      '간과 비장',
      '폐, 고막, 장관(공기 포함 장기)',
      '뼈와 관절',
      '피부와 연조직'
    ],
    correct: 1,
    explanation: 'Primary blast injury는 폭발 압력파에 의한 손상으로, 공기를 포함하는 장기(폐, 고막, 장관, 부비동)가 가장 취약합니다. 폐 손상(blast lung)이 가장 치명적입니다.'
  },
  {
    question: '재난 의료대응에서 SALT Triage의 S-A-L-T 순서로 올바른 것은?',
    options: [
      'Sort - Assess - Lifesaving - Treatment/Transport',
      'Scene - Alert - Level - Triage',
      'Stabilize - Assess - Load - Transport',
      'Screen - Allocate - Label - Transfer'
    ],
    correct: 0,
    explanation: 'SALT Triage: Sort(분류), Assess(평가), Lifesaving interventions(생명구조 처치), Treatment/Transport(치료/이송). CDC에서 개발한 all-hazards 접근 방식의 triage 시스템입니다.'
  }
];

// START Algorithm reference steps
const START_STEPS = [
  { num: '1', text: '보행 가능? → YES → GREEN (경상)' },
  { num: '2', text: '호흡 있는가? → NO → 기도 개방' },
  { num: '3', text: '기도 개방 후 호흡? → NO → BLACK (사망)' },
  { num: '4', text: '기도 개방 후 호흡? → YES → RED (즉시)' },
  { num: '5', text: '호흡수 > 30/분? → YES → RED (즉시)' },
  { num: '6', text: '모세혈관 재충전 > 2초? → YES → RED (즉시)' },
  { num: '7', text: '간단한 명령 수행? → NO → RED (즉시)' },
  { num: '8', text: '간단한 명령 수행? → YES → YELLOW (지연)' }
];
