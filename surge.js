// ============================================
// SURGE TRAIN SYSTEM — 디지털 이식
// 시간 기반 환자 관리 + 연속 체인 + 자원 배분
// ============================================

// ---- 처치(Intervention) 데이터 ----
const INTERVENTIONS = {
  airwayOpen:     { name: '기도 개방', nameEn: 'Airway Opening', icon: '🫁', timeIdeal: 1, timeNon: 2, skill: 'basic' },
  oxygenMask:     { name: '산소 마스크', nameEn: 'O2 Mask', icon: '😮‍💨', timeIdeal: 1, timeNon: 2, skill: 'basic' },
  ivCannula:      { name: 'IV 삽관', nameEn: 'IV Cannulation', icon: '💉', timeIdeal: 2, timeNon: 4, skill: 'nurse' },
  ivFluids:       { name: '수액 투여', nameEn: 'IV Fluids', icon: '🩸', timeIdeal: 1, timeNon: 2, skill: 'nurse' },
  analgesia:      { name: '진통제 투여', nameEn: 'Analgesia', icon: '💊', timeIdeal: 1, timeNon: 2, skill: 'nurse' },
  dressing:       { name: '드레싱', nameEn: 'Dressing', icon: '🩹', timeIdeal: 2, timeNon: 3, skill: 'basic' },
  splint:         { name: '부목 고정', nameEn: 'Splinting', icon: '🦴', timeIdeal: 3, timeNon: 5, skill: 'basic' },
  chestSeal:      { name: '흉부 밀봉', nameEn: 'Chest Seal', icon: '🫀', timeIdeal: 2, timeNon: 4, skill: 'doctor' },
  chestTube:      { name: '흉관 삽입', nameEn: 'Chest Tube', icon: '🔧', timeIdeal: 5, timeNon: 8, skill: 'doctor' },
  tourniquet:     { name: '지혈대', nameEn: 'Tourniquet', icon: '🔴', timeIdeal: 1, timeNon: 2, skill: 'basic' },
  spinalBoard:    { name: '척추 보드', nameEn: 'Spinal Board', icon: '🛏️', timeIdeal: 3, timeNon: 5, skill: 'paramedic' },
  intubation:     { name: '기관삽관', nameEn: 'Intubation', icon: '🫁', timeIdeal: 3, timeNon: 6, skill: 'doctor' },
  bloodTransfuse: { name: '수혈', nameEn: 'Blood Transfusion', icon: '🅱️', timeIdeal: 3, timeNon: 5, skill: 'doctor' },
  monitor:        { name: '모니터 연결', nameEn: 'Monitor', icon: '📊', timeIdeal: 1, timeNon: 2, skill: 'nurse' },
  decontam:       { name: '제독(제염)', nameEn: 'Decontamination', icon: '☢️', timeIdeal: 5, timeNon: 10, skill: 'specialist' },
  antidote:       { name: '해독제 투여', nameEn: 'Antidote', icon: '💚', timeIdeal: 2, timeNon: 4, skill: 'doctor' },
  cpr:            { name: 'CPR', nameEn: 'CPR', icon: '❤️', timeIdeal: 0, timeNon: 0, skill: 'basic', continuous: true },
  ventilator:     { name: '인공호흡기', nameEn: 'Ventilator', icon: '🌬️', timeIdeal: 5, timeNon: 8, skill: 'doctor' }
};

// ---- 자원(Resource) 타입 ----
const RESOURCE_TYPES = {
  doctor:    { name: '의사', icon: '🩺', color: '#3b82f6' },
  nurse:     { name: '간호사', icon: '💉', color: '#10b981' },
  paramedic: { name: '구급대원', icon: '🚑', color: '#f59e0b' },
  firstAid:  { name: '응급구조사', icon: '⛑️', color: '#ef4444' }
};

// ---- SURGE 환자 뱅크 (40명 — Sieve/Sort 데이터 포함) ----
const SURGE_PATIENTS = [
  // === 현장 Sieve: RED (즉시) ===
  {
    id: 'E-001', name: '김태현', age: 38, gender: '남', icon: '👨',
    walking: false,
    sieve: { breathing: true, respRate: 34, capRefill: 4, hr: 130 },
    sort: { gcs: 13, respRate: 34, systolicBP: 80 },
    injuries: ['우측 대퇴부 개방 골절', '복부 둔상 — 내출혈 의심', '안면 열상'],
    appearance: '하반신 혈흔, 창백한 안색',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['tourniquet','ivCannula','ivFluids','splint','monitor'],
    deterioration: { untreatedMinutes: 8, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['xray','surgery'], surgeryTime: 45, icuRequired: true
  },
  {
    id: 'E-002', name: '이수진', age: 27, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 36, capRefill: 5, hr: 140 },
    sort: { gcs: 11, respRate: 36, systolicBP: 70 },
    injuries: ['관통성 흉부 외상', '긴장성 기흉 의심', '우측 상완 골절'],
    appearance: '호흡 곤란, 청색증 시작',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['chestSeal','oxygenMask','ivCannula','ivFluids','chestTube'],
    deterioration: { untreatedMinutes: 5, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['ct','surgery'], surgeryTime: 60, icuRequired: true
  },
  {
    id: 'E-003', name: '정민호', age: 55, gender: '남', icon: '👴',
    walking: false,
    sieve: { breathing: true, respRate: 30, capRefill: 4, hr: 125 },
    sort: { gcs: 12, respRate: 30, systolicBP: 85 },
    injuries: ['골반 골절', '요도 출혈', '양측 하지 다발성 타박상'],
    appearance: '골반부 변형, 의식 약간 혼미',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['ivCannula','ivFluids','bloodTransfuse','spinalBoard','monitor'],
    deterioration: { untreatedMinutes: 10, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['ct','xray','surgery'], surgeryTime: 90, icuRequired: true
  },
  {
    id: 'E-004', name: '박서연', age: 8, gender: '여', icon: '👧',
    walking: false,
    sieve: { breathing: true, respRate: 40, capRefill: 3, hr: 150 },
    sort: { gcs: 14, respRate: 40, systolicBP: 75 },
    injuries: ['복부 둔상 — 비장파열 의심', '좌측 전완 골절', '다발성 찰과상'],
    appearance: '울며 복부 통증 호소, 창백',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['ivCannula','ivFluids','analgesia','splint','monitor'],
    deterioration: { untreatedMinutes: 12, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['ultrasound','ct','surgery'], surgeryTime: 50, icuRequired: true
  },
  {
    id: 'E-005', name: '최영수', age: 62, gender: '남', icon: '👴',
    walking: false,
    sieve: { breathing: false, afterAirway: true, respRate: 8, capRefill: 5, hr: 50 },
    sort: { gcs: 6, respRate: 8, systolicBP: 60 },
    injuries: ['중증 두부 외상', '두개골 함몰 골절', '뇌척수액 누출'],
    appearance: '무반응에 가까움, 좌측 동공 산대',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['airwayOpen','intubation','ivCannula','ivFluids','ventilator'],
    deterioration: { untreatedMinutes: 4, outcome: 'death', treatedOutcome: 'survive_disabled' },
    edNeeds: ['ct','surgery'], surgeryTime: 120, icuRequired: true
  },
  {
    id: 'E-006', name: '한지은', age: 31, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 32, capRefill: 4, hr: 135 },
    sort: { gcs: 13, respRate: 32, systolicBP: 78 },
    injuries: ['양측 하지 압궤 손상', '횡문근융해 위험', '탈수'],
    appearance: '건물 잔해에 4시간 매몰 후 구출',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['ivCannula','ivFluids','ivFluids','monitor','analgesia'],
    deterioration: { untreatedMinutes: 15, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['blood_test','ct'], surgeryTime: 0, icuRequired: true
  },

  // === 현장 Sieve: YELLOW (긴급) ===
  {
    id: 'E-007', name: '오준혁', age: 45, gender: '남', icon: '👨',
    walking: false,
    sieve: { breathing: true, respRate: 22, capRefill: 2, hr: 95 },
    sort: { gcs: 14, respRate: 22, systolicBP: 110 },
    injuries: ['좌측 경골-비골 개방 골절', '전두부 열상 (5cm)', '좌측 수부 화상 II도'],
    appearance: '통증 호소하나 의식 명료',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['dressing','splint','ivCannula','analgesia'],
    deterioration: { untreatedMinutes: 30, outcome: 'worsen_to_red', treatedOutcome: 'survive' },
    edNeeds: ['xray','surgery'], surgeryTime: 30, icuRequired: false
  },
  {
    id: 'E-008', name: '윤서아', age: 22, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 24, capRefill: 2, hr: 100 },
    sort: { gcs: 15, respRate: 24, systolicBP: 105 },
    injuries: ['양측 전완부 화상 II-III도 (15% TBSA)', '흡입 손상 의심', '안면 그을음'],
    appearance: '화상 부위 수포, 쉰 목소리',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['oxygenMask','ivCannula','ivFluids','dressing','analgesia'],
    deterioration: { untreatedMinutes: 20, outcome: 'worsen_to_red', treatedOutcome: 'survive' },
    edNeeds: ['bronchoscopy','blood_test'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-009', name: '강민재', age: 48, gender: '남', icon: '👨',
    walking: false,
    sieve: { breathing: true, respRate: 20, capRefill: 2, hr: 88 },
    sort: { gcs: 14, respRate: 20, systolicBP: 120 },
    injuries: ['경추 통증 — 골절 의심', '양측 수부 열상', '흉부 타박'],
    appearance: '경부 움직임 제한, 의식 명료',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['spinalBoard','dressing','analgesia','monitor'],
    deterioration: { untreatedMinutes: 40, outcome: 'worsen_neuro', treatedOutcome: 'survive' },
    edNeeds: ['ct','xray'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-010', name: '임하은', age: 35, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 26, capRefill: 2, hr: 105 },
    sort: { gcs: 15, respRate: 26, systolicBP: 100 },
    injuries: ['우측 쇄골 골절', '우측 늑골 다발 골절 (3-6번)', '우측 혈흉 소량'],
    appearance: '우측 흉부 통증으로 얕은 호흡',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['oxygenMask','ivCannula','analgesia','monitor'],
    deterioration: { untreatedMinutes: 25, outcome: 'worsen_to_red', treatedOutcome: 'survive' },
    edNeeds: ['xray','ct'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-011', name: '송도현', age: 59, gender: '남', icon: '👴',
    walking: false,
    sieve: { breathing: true, respRate: 22, capRefill: 2, hr: 92 },
    sort: { gcs: 13, respRate: 22, systolicBP: 130 },
    injuries: ['안와 골절', '비골 골절', '안면부 심한 부종', '시력 저하 호소'],
    appearance: '안면 심하게 부은 상태, 명령 수행 느림',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['dressing','ivCannula','analgesia'],
    deterioration: { untreatedMinutes: 45, outcome: 'permanent_vision_loss', treatedOutcome: 'survive' },
    edNeeds: ['ct','ophthalmology'], surgeryTime: 40, icuRequired: false
  },
  {
    id: 'E-012', name: '노지영', age: 40, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 18, capRefill: 2, hr: 110 },
    sort: { gcs: 15, respRate: 18, systolicBP: 95 },
    injuries: ['좌측 대퇴부 폐쇄 골절', '좌측 슬관절 탈구', '다발성 타박'],
    appearance: '좌측 하지 변형, 발 맥박 약함',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['splint','ivCannula','analgesia','monitor'],
    deterioration: { untreatedMinutes: 35, outcome: 'limb_ischemia', treatedOutcome: 'survive' },
    edNeeds: ['xray','vascular_check'], surgeryTime: 35, icuRequired: false
  },

  // === 현장 Sieve: GREEN (지연) ===
  {
    id: 'E-013', name: '장성민', age: 29, gender: '남', icon: '👨',
    walking: true,
    sieve: { breathing: true, respRate: 16, capRefill: 2, hr: 80 },
    sort: { gcs: 15, respRate: 16, systolicBP: 130 },
    injuries: ['좌측 수부 열상 (봉합 필요)', '전두부 찰과상', '경미한 요통'],
    appearance: '자력 보행, 손 출혈 지혈 중',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['dressing'],
    deterioration: { untreatedMinutes: 120, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['suture'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-014', name: '배지현', age: 24, gender: '여', icon: '👩',
    walking: true,
    sieve: { breathing: true, respRate: 18, capRefill: 1, hr: 90 },
    sort: { gcs: 15, respRate: 18, systolicBP: 125 },
    injuries: ['양측 전경골부 찰과상', '우측 족관절 염좌', '흡입 기침'],
    appearance: '절뚝이며 보행, 기침',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['dressing','oxygenMask'],
    deterioration: { untreatedMinutes: 180, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['xray'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-015', name: '류민석', age: 50, gender: '남', icon: '👨',
    walking: true,
    sieve: { breathing: true, respRate: 16, capRefill: 1, hr: 85 },
    sort: { gcs: 15, respRate: 16, systolicBP: 140 },
    injuries: ['다발성 유리 파편상', '좌측 전완 열상', '심리적 외상'],
    appearance: '의복에 유리 파편, 떨고 있음',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['dressing'],
    deterioration: { untreatedMinutes: 120, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['wound_care'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-016', name: '김나연', age: 19, gender: '여', icon: '👩',
    walking: true,
    sieve: { breathing: true, respRate: 20, capRefill: 1, hr: 95 },
    sort: { gcs: 15, respRate: 20, systolicBP: 120 },
    injuries: ['이명', '고막 천공 의심', '안면 찰과상', '심한 불안'],
    appearance: '귀를 잡고 고통 호소, 보행 가능',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['dressing'],
    deterioration: { untreatedMinutes: 180, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['ent'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-017', name: '조현우', age: 42, gender: '남', icon: '👨',
    walking: true,
    sieve: { breathing: true, respRate: 16, capRefill: 1, hr: 78 },
    sort: { gcs: 15, respRate: 16, systolicBP: 135 },
    injuries: ['좌측 5번 수지 골절', '무릎 찰과상', '먼지 흡입 기침'],
    appearance: '보행 가능, 좌측 손 부종',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['splint','dressing'],
    deterioration: { untreatedMinutes: 180, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['xray'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-018', name: '한소영', age: 33, gender: '여', icon: '👩',
    walking: true,
    sieve: { breathing: true, respRate: 18, capRefill: 1, hr: 88 },
    sort: { gcs: 15, respRate: 18, systolicBP: 118 },
    injuries: ['경미한 뇌진탕', '후두부 타박', '오심'],
    appearance: '어지럼증 호소, 보행 가능',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['monitor'],
    deterioration: { untreatedMinutes: 60, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['ct'], surgeryTime: 0, icuRequired: false
  },

  // === 현장 Sieve: BLACK (사망) ===
  {
    id: 'E-019', name: '이상철', age: 67, gender: '남', icon: '👴',
    walking: false,
    sieve: { breathing: false, afterAirway: false, respRate: 0, capRefill: 0, hr: 0 },
    sort: { gcs: 3, respRate: 0, systolicBP: 0 },
    injuries: ['다발성 장기 손상', '대량 출혈', '흉복부 관통상'],
    appearance: '무반응, 기도 개방 후에도 호흡 없음',
    correctSieve: 'black', correctSort: 'dead',
    neededInterventions: [],
    deterioration: { untreatedMinutes: 0, outcome: 'dead', treatedOutcome: 'dead' },
    edNeeds: [], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-020', name: '박영희', age: 71, gender: '여', icon: '👵',
    walking: false,
    sieve: { breathing: false, afterAirway: false, respRate: 0, capRefill: 0, hr: 0 },
    sort: { gcs: 3, respRate: 0, systolicBP: 0 },
    injuries: ['두부 대량 손상', '개방성 두개골 골절', '뇌실질 노출'],
    appearance: '무반응, 비가역적 손상',
    correctSieve: 'black', correctSort: 'dead',
    neededInterventions: [],
    deterioration: { untreatedMinutes: 0, outcome: 'dead', treatedOutcome: 'dead' },
    edNeeds: [], surgeryTime: 0, icuRequired: false
  },

  // === 추가 RED 환자 (연속 체인에서 사용) ===
  {
    id: 'E-021', name: '신동혁', age: 43, gender: '남', icon: '👨',
    walking: false,
    sieve: { breathing: true, respRate: 35, capRefill: 5, hr: 138 },
    sort: { gcs: 10, respRate: 35, systolicBP: 65 },
    injuries: ['복부 관통상 — 장파열 의심', '대량 복강내 출혈', '쇼크 상태'],
    appearance: '복부 팽만, 의식 저하, 창백',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['ivCannula','ivFluids','bloodTransfuse','monitor','analgesia'],
    deterioration: { untreatedMinutes: 6, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['ct','surgery'], surgeryTime: 75, icuRequired: true
  },
  {
    id: 'E-022', name: '문예진', age: 30, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 38, capRefill: 4, hr: 145 },
    sort: { gcs: 12, respRate: 38, systolicBP: 72 },
    injuries: ['양측 대퇴 골절', '골반 불안정', '후복막 출혈'],
    appearance: '극심한 통증, 쇼크 징후',
    correctSieve: 'red', correctSort: 'T1',
    neededInterventions: ['ivCannula','ivFluids','bloodTransfuse','splint','analgesia','monitor'],
    deterioration: { untreatedMinutes: 10, outcome: 'death', treatedOutcome: 'survive' },
    edNeeds: ['ct','xray','surgery'], surgeryTime: 100, icuRequired: true
  },

  // === 추가 YELLOW ===
  {
    id: 'E-023', name: '황준서', age: 36, gender: '남', icon: '👨',
    walking: false,
    sieve: { breathing: true, respRate: 24, capRefill: 2, hr: 98 },
    sort: { gcs: 14, respRate: 24, systolicBP: 108 },
    injuries: ['우측 상완 골절', '동측 전완 열상', '안면부 찰과상'],
    appearance: '우측 상지 변형, 의식 명료',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['splint','dressing','ivCannula','analgesia'],
    deterioration: { untreatedMinutes: 40, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['xray','surgery'], surgeryTime: 25, icuRequired: false
  },
  {
    id: 'E-024', name: '정다은', age: 26, gender: '여', icon: '👩',
    walking: false,
    sieve: { breathing: true, respRate: 20, capRefill: 2, hr: 102 },
    sort: { gcs: 15, respRate: 20, systolicBP: 100 },
    injuries: ['좌측 족관절 개방 탈구', '좌측 하퇴 열상', '다발성 타박'],
    appearance: '좌측 발목 심한 변형, 출혈',
    correctSieve: 'yellow', correctSort: 'T2',
    neededInterventions: ['dressing','splint','ivCannula','analgesia'],
    deterioration: { untreatedMinutes: 35, outcome: 'limb_necrosis', treatedOutcome: 'survive' },
    edNeeds: ['xray','surgery'], surgeryTime: 40, icuRequired: false
  },

  // === 추가 GREEN ===
  {
    id: 'E-025', name: '이채원', age: 15, gender: '여', icon: '👧',
    walking: true,
    sieve: { breathing: true, respRate: 20, capRefill: 1, hr: 92 },
    sort: { gcs: 15, respRate: 20, systolicBP: 115 },
    injuries: ['좌측 수부 화상 I도', '연기 흡입 기침', '경미한 불안'],
    appearance: '보행 가능, 기침, 손 통증 호소',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['dressing','oxygenMask'],
    deterioration: { untreatedMinutes: 120, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['wound_care'], surgeryTime: 0, icuRequired: false
  },
  {
    id: 'E-026', name: '박시우', age: 10, gender: '남', icon: '👦',
    walking: true,
    sieve: { breathing: true, respRate: 22, capRefill: 1, hr: 100 },
    sort: { gcs: 15, respRate: 22, systolicBP: 100 },
    injuries: ['우측 전완 골절 의심', '다발성 찰과상', '공포로 울음'],
    appearance: '울면서 보행, 우측 팔 보호자세',
    correctSieve: 'green', correctSort: 'T3',
    neededInterventions: ['splint','dressing'],
    deterioration: { untreatedMinutes: 120, outcome: 'stable', treatedOutcome: 'survive' },
    edNeeds: ['xray'], surgeryTime: 0, icuRequired: false
  }
];

// ---- 연속 체인 시나리오 ----
const SURGE_CHAIN_SCENARIOS = [
  {
    id: 'chain-1',
    title: '도심 복합건물 폭발',
    titleEn: 'Urban Complex Explosion',
    description: '6층 상업건물에서 가스 폭발이 발생했습니다. 건물 일부가 붕괴되어 다수의 사상자가 발생. 당신은 현장에서 병원까지 전체 대응을 지휘해야 합니다.',
    totalPatients: 16,
    patientIds: ['E-001','E-002','E-005','E-006','E-007','E-008','E-009','E-010','E-013','E-014','E-015','E-016','E-017','E-019','E-020','E-025'],
    phases: [
      {
        id: 'scene',
        name: '사고 현장',
        nameEn: 'Incident Scene',
        icon: '🔥',
        description: '현장 도착. 환자를 Sieve 트리아지로 신속 분류하세요.',
        task: 'sieve_triage',
        timeLimit: 180, // 3분 (게임 시간)
        availableResources: { paramedic: 4, firstAid: 2 },
        hint: 'Sieve: 보행 가능→GREEN / 호흡 없음+기도 개방 후 없음→BLACK / 호흡수>30 or 모세혈관재충전>2초→RED / 나머지→YELLOW'
      },
      {
        id: 'ccp',
        name: '현장응급처치소 (CCP)',
        nameEn: 'Casualty Clearing Post',
        icon: '⛺',
        description: 'Sort 트리아지로 재분류하고 응급처치를 시행하세요. 자원이 제한됩니다.',
        task: 'sort_and_treat',
        timeLimit: 300, // 5분
        availableResources: { doctor: 2, nurse: 3, paramedic: 4 },
        hint: 'Sort: GCS + 호흡수 + 수축기 BP로 T1/T2/T3 분류. 중증환자에게 적절한 처치를 배분하세요.'
      },
      {
        id: 'transport',
        name: '이송 관리',
        nameEn: 'Transport Management',
        icon: '🚑',
        description: '제한된 구급차로 환자를 병원에 이송하세요. 이송 우선순위를 결정하세요.',
        task: 'transport_priority',
        timeLimit: 180,
        ambulances: 4,
        transportTimeMin: 8, // 분
        transportTimeMax: 15,
        hint: 'T1 환자를 먼저, 가장 가까운 적절한 병원으로. 구급차는 왕복해야 합니다.'
      },
      {
        id: 'ed',
        name: '응급실 대응',
        nameEn: 'Emergency Department',
        icon: '🏥',
        description: '도착한 환자들을 ED에서 안정화하고 추가 처치를 결정하세요.',
        task: 'ed_management',
        timeLimit: 300,
        availableResources: { doctor: 3, nurse: 5 },
        edBeds: 8,
        existingPatients: 3, // 기존 ED 환자
        hint: '제한된 침대와 인력으로 최대한 많은 환자를 안정화하세요.'
      }
    ],
    maxPreventableDeaths: 3 // RED 중 이론상 살릴 수 있는 환자 수
  },
  {
    id: 'chain-2',
    title: '지하철 화학물질 유출',
    titleEn: 'Subway Chemical Spill',
    description: '출근 시간 지하철 역에서 화학물질이 유출되었습니다. 다수의 호흡기 증상 환자 발생. 제독(제염)이 필요합니다.',
    totalPatients: 14,
    patientIds: ['E-003','E-004','E-008','E-010','E-011','E-012','E-014','E-016','E-017','E-018','E-021','E-022','E-024','E-026'],
    phases: [
      {
        id: 'scene',
        name: '오염 현장',
        icon: '☢️',
        description: '오염구역 확인. PPE 착용 후 진입. Sieve 분류하세요.',
        task: 'sieve_triage',
        timeLimit: 180,
        availableResources: { paramedic: 3, firstAid: 2 },
        hazard: 'chemical',
        hint: 'CBRNE 현장: 반드시 제독 전 분류. 오염 환자는 제독 필수.'
      },
      {
        id: 'decontam',
        name: '제독 라인',
        icon: '🚿',
        description: '환자를 제독(제염)하세요. 제독 소요 시간과 자원을 관리하세요.',
        task: 'decontamination',
        timeLimit: 240,
        decontamStations: 2,
        decontamTimePerPatient: 5,
        availableResources: { paramedic: 4, nurse: 2 },
        hint: '제독소 2개소. 환자당 5분 소요. 중증부터 우선 제독.'
      },
      {
        id: 'ccp',
        name: '현장응급처치소',
        icon: '⛺',
        description: '제독 완료 환자를 Sort 분류하고 처치하세요.',
        task: 'sort_and_treat',
        timeLimit: 300,
        availableResources: { doctor: 2, nurse: 3, paramedic: 3 },
        hint: '화학물질 노출 환자에게 해독제 투여 고려.'
      },
      {
        id: 'transport',
        name: '이송 관리',
        icon: '🚑',
        description: '환자를 병원으로 이송하세요.',
        task: 'transport_priority',
        timeLimit: 180,
        ambulances: 3,
        transportTimeMin: 10,
        transportTimeMax: 18,
        hint: '제독 미완료 환자는 이송 불가.'
      }
    ],
    maxPreventableDeaths: 2
  }
];

// ---- Sieve 트리아지 알고리즘 ----
function sieveAlgorithm(patient) {
  if (patient.walking) return 'green';
  if (!patient.sieve.breathing) {
    if (patient.sieve.afterAirway) return 'red'; // 기도개방 후 호흡 회복
    return 'black';
  }
  if (patient.sieve.respRate > 30 || patient.sieve.respRate < 10) return 'red';
  if (patient.sieve.capRefill > 2 || patient.sieve.hr > 120) return 'red';
  return 'yellow';
}

// ---- Sort (TRTS) 점수 계산 ----
function sortScore(patient) {
  let score = 0;
  const s = patient.sort;
  // GCS
  if (s.gcs >= 13) score += 4;
  else if (s.gcs >= 9) score += 3;
  else if (s.gcs >= 6) score += 2;
  else if (s.gcs >= 4) score += 1;
  // Respiratory Rate
  if (s.respRate >= 10 && s.respRate <= 29) score += 4;
  else if (s.respRate > 29) score += 3;
  else if (s.respRate >= 6 && s.respRate <= 9) score += 2;
  else if (s.respRate >= 1 && s.respRate <= 5) score += 1;
  // Systolic BP
  if (s.systolicBP > 89) score += 4;
  else if (s.systolicBP >= 76) score += 3;
  else if (s.systolicBP >= 50) score += 2;
  else if (s.systolicBP >= 1) score += 1;
  return score; // 1-12, T1 ≤ 10, T2 = 11, T3 = 12
}

function sortCategory(patient) {
  if (patient.correctSieve === 'black') return 'dead';
  const s = sortScore(patient);
  if (s <= 10) return 'T1';
  if (s === 11) return 'T2';
  return 'T3';
}

// ---- 결과 계산: 예방가능 사망 ----
function calculatePreventableDeaths(decisions, patients, scenario) {
  let preventable = 0;
  let totalDeaths = 0;
  let survived = 0;

  patients.forEach(p => {
    const d = decisions[p.id] || {};
    const treated = d.treated || false;
    const treatTime = d.treatMinute || Infinity;
    const det = p.deterioration;

    if (det.outcome === 'dead') {
      totalDeaths++;
      return; // 비가역적 사망
    }

    if (!treated && det.outcome === 'death') {
      totalDeaths++;
      preventable++;
    } else if (treated && treatTime <= det.untreatedMinutes) {
      survived++;
    } else if (treated && treatTime > det.untreatedMinutes) {
      if (det.outcome === 'death') {
        totalDeaths++;
        preventable++;
      }
    } else {
      survived++;
    }
  });

  return { preventable, totalDeaths, survived, total: patients.length };
}
