// ============================================
// CBRNE 재난의학 RPG 교육 게임 — CBRNE 콘텐츠
// ============================================
// Source: CIREcourse Lectures (Heejun Shin MD, MS, FIBODM)
// 재난의학 RPG 교육 게임 전용 콘텐츠
// ============================================

// ============================================
// SECTION 1: QUIZ QUESTIONS
// ============================================

const CBRNE_QUIZ_QUESTIONS = {

  // ==========================================
  // CHEMICAL (화학재난) — 28 questions
  // ==========================================
  chemical: [
    {
      id: "chem_q01",
      q: "화학 생존 체인(Chain of Chemical Survival)의 4가지 연결고리를 순서대로 나열한 것은?",
      o: [
        "PPE → 제독 → 해독제 → 기본 지지 치료",
        "제독 → PPE → 해독제 → 기본 지지 치료",
        "해독제 → PPE → 제독 → 기본 지지 치료",
        "기본 지지 치료 → PPE → 제독 → 해독제"
      ],
      a: 0,
      exp: "화학 생존 체인의 4연결고리: ① PPE(개인보호장비) → ② Decontamination(제독) → ③ Antidote therapy(해독제 치료) → ④ BLS(기본 및 지지 치료). 순서가 중요하다: PPE 없이는 제독 불가, 제독 없이는 해독제 투여 불가.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q02",
      q: "1995년 도쿄 지하철 사린 공격에서 사망한 사람은 몇 명인가?",
      o: ["3명", "13명", "50명", "130명"],
      a: 1,
      exp: "1995년 3월 20일, 옴진리교(Aum Shinrikyo)가 도쿄 지하철에서 사린을 살포하여 13명이 사망하고 수천 명이 부상을 입었다. 일본 역사상 최악의 테러 사건 중 하나였다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q03",
      q: "신경작용제(사린 등)의 주요 작용 기전은?",
      o: [
        "아세틸콜린에스테라제(AChE)를 억제하여 아세틸콜린(ACh)이 축적된다",
        "도파민 수용체를 차단하여 근육 경직을 유발한다",
        "GABA 수용체를 활성화하여 중추신경을 억제한다",
        "소듐 채널을 차단하여 신경 전도를 방해한다"
      ],
      a: 0,
      exp: "신경작용제는 유기인계 화합물로 AChE(아세틸콜린에스테라제)를 억제한다. 이로 인해 ACh(아세틸콜린)가 분해되지 않고 축적되어, 자율신경·근육·중추신경에 지속적인 흥분이 발생한다. 결과적으로 횡격막이 지속 수축되어 질식사에 이른다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q04",
      q: "신경작용제 중독 시 나타나는 DUMBELS 독성증후군에서 'M'이 의미하는 증상은?",
      o: ["근육 경련(Muscle spasm)", "동공 축소(Miosis)", "정신 혼란(Mental confusion)", "서맥(Myocardial bradycardia)"],
      a: 1,
      exp: "DUMBELS: Defecation(배변), Urination(배뇨), Miosis(동공 축소), Bradycardia(서맥), Emesis(구토), Lacrimation(눈물 과다), Salivation(침 과다분비). 이는 신경작용제의 무스카린 효과이며, 동공 축소(miosis)는 가장 먼저 나타나는 징후 중 하나다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q05",
      q: "신경작용제 해독제로 올바르게 짝지어진 것은?",
      o: [
        "아트로핀(Atropine) + 프랄리독심(2-PAM) + 다이아제팜(Diazepam)",
        "날록손(Naloxone) + 하이드록소코발라민 + 칼슘",
        "메틸렌블루 + 아트로핀 + 산소",
        "피리독신 + 2-PAM + 날록손"
      ],
      a: 0,
      exp: "신경작용제(유기인계) 해독 삼중주: ① Atropine(무스카린 효과 차단) ② Pralidoxime/2-PAM(AChE 재활성화 — '노화' 전 투여 필수) ③ Diazepam(경련 조절). 세 약물의 역할을 구분하는 것이 핵심이다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q06",
      q: "사린(Sarin, GB)의 냄새 특성은?",
      o: ["달콤한 과일향", "장뇌(캠퍼) 향", "무취(냄새 없음)", "계란 썩는 냄새"],
      a: 2,
      exp: "사린(GB)은 무색·무취로 유명하다. 반면 타분(GA)은 약간의 과일향, 소만(GD)은 장뇌향이 있다. VX는 기름지고 지속적이다. 사린의 무취는 피해자가 노출을 인식하지 못하게 만들어 더욱 위험하다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q07",
      q: "OSHA 기준 화학재난 핫존(Hot Zone)의 최초 대응자(소방대원)에게 필요한 PPE 레벨은?",
      o: ["Level A", "Level B", "Level C", "Level D"],
      a: 0,
      exp: "OSHA 규정: 핫존 최초 대응자(소방대원)는 Level A 수트 착용. Level A = 완전 밀폐 보호복 + SCBA(자급식 공기호흡기). Level B는 EMS 현장 제독/병원 미확인 상황, Level C는 확인된 비치명적 농도, Level D는 일반 병원 직원.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q08",
      q: "PRISM(Primary Response Incident Scene Management) 3단계 프로토콜에서 2단계 '사다리 파이프 시스템 세척'의 권장 시간은?",
      o: ["5초", "15초", "60초", "90초"],
      a: 1,
      exp: "PRISM 3단계: ① 탈의 + 건식 제독(Disrobing + Dry decon) → ② 사다리 파이프 세척 15초(미온수) → ③ 2차/기술적 제독 15~90초(베이비샴푸 + 세척 도구). 3단계 전체를 시행하면 화학 오염 100%(표준편차 ±1%) 제거.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q09",
      q: "의복 제거(탈의)만으로 외부 화학 오염을 얼마나 제거할 수 있는가?",
      o: ["50%", "70%", "80~90%", "100%"],
      a: 2,
      exp: "의복 제거만으로도 외부 오염의 80~90%를 제거할 수 있다. 이는 화학 및 방사선 재난 모두에서 동일하게 적용된다. 수원 공급이 지연될 경우 즉시 건식 제독(탈의)을 시작하는 것이 핵심이다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q10",
      q: "ORCHIDS 프로토콜에서 최적 습식 제독 샤워 수온은?",
      o: ["15°C", "25°C", "35°C", "45°C"],
      a: 2,
      exp: "ORCHIDS 프로토콜 최적 조건: 샤워 수온 35°C, 샤워 시간 60~90초, 세제 0.5%(v/v) Argos™ 또는 FloraFree™, 세척 도구는 면 플란넬(세안 타월). 35°C는 피부 자극 없이 효과적인 오염 제거를 위한 온도다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q11",
      q: "2017년 말레이시아 쿠알라룸푸르 공항에서 김정남 암살에 사용된 신경작용제는?",
      o: ["사린(Sarin/GB)", "VX", "소만(Soman/GD)", "타분(Tabun/GA)"],
      a: 1,
      exp: "2017년, 북한 지도자 김정은의 이복형제인 김정남이 말레이시아 쿠알라룸푸르 국제공항에서 VX 신경작용제로 암살당했다. VX는 기름진 질감을 가지며 피부 투과성이 높아 소량으로도 치명적이다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q12",
      q: "청산(시안화물/Cyanide)계 혈액작용제에 대한 1차 선택 해독제(TOC)는?",
      o: ["아트로핀(Atropine)", "하이드록소코발라민(Hydroxocobalamin)", "날록손(Naloxone)", "피리독신(Pyridoxine)"],
      a: 1,
      exp: "시안화물계(혈액작용제) 해독제 TOC(Treatment of Choice)는 하이드록소코발라민(Hydroxocobalamin)이다. 암일 아질산염(Amyl nitrite)도 사용 가능하다. 2002년 모스크바 극장 인질 사건에서는 오피오이드+마취제 혼합물이 사용되어 130명 이상 사망했다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q13",
      q: "화학 재난 구역 설정 시 3-구역 시스템(3-Zone System)에서 제독이 이루어지는 구역은?",
      o: ["핫존(Hot Zone/Exclusion Zone)", "웜존(Warm Zone/Contamination Reduction Zone)", "콜드존(Cold Zone/Support Zone)", "중립지대(Neutral Zone)"],
      a: 1,
      exp: "3-구역: ① 핫존(오염 구역, 최대 PPE 필수) → ② 웜존(오염 감소 구역, 제독 실시) → ③ 콜드존(청정 구역, 병원/스테이징). 제독은 핫존에서 콜드존으로 이동하는 통로인 웜존에서 진행된다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q14",
      q: "MIMMS(Major Incident Medical Management and Support) 프레임워크인 CSCATTT에서 마지막 3T가 의미하는 것은?",
      o: [
        "Triage(분류), Treatment(치료), Transportation(이송)",
        "Training(훈련), Technology(기술), Teamwork(팀워크)",
        "Toxicology(독성학), Trauma(외상), Triage(분류)",
        "Threat(위협), Tactics(전술), Transfer(전원)"
      ],
      a: 0,
      exp: "CSCATTT: Command(지휘), Safety(안전), Communication(통신), Assessment(평가), Triage(분류), Treatment(치료), Transportation(이송). 마지막 3T는 Triage-Treatment-Transportation으로, 실제 의료 대응의 핵심이다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q15",
      q: "신경작용제의 니코틴성(Nicotinic) 효과로 올바른 것은?",
      o: [
        "동공 축소(Miosis)와 분비 증가",
        "근 섬유속성 수축(Fasciculations)과 근 마비",
        "서맥(Bradycardia)과 기관지 수축",
        "구역, 구토, 설사"
      ],
      a: 1,
      exp: "신경작용제 독성은 3가지: ① 무스카린 효과(DUMBELS — 서맥, 동공축소, 분비증가, 기관지수축, GI 증상) ② 니코틴 효과(근 섬유속성 수축→근 마비, 빈맥, 고혈압) ③ CNS 효과(불안, 경련, 혼수). 니코틴 효과는 골격근에 주로 나타난다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q16",
      q: "불화수소산(Hydrofluoric acid) 노출 시 해독제는?",
      o: ["메틸렌블루(Methylene blue)", "칼슘(Calcium)", "프랄리독심(2-PAM)", "날록손(Naloxone)"],
      a: 1,
      exp: "항상 기억할 해독제 매칭: 불화수소산/불소 → 칼슘(Ca²⁺), 시안화물 → 하이드록소코발라민, 유기인계/신경제 → 아트로핀+옥심, 메트헤모글로빈 형성 물질 → 메틸렌블루, 히드라진 → 피리독신.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q17",
      q: "1984년 인도 보팔 가스 누출 사고와 같은 산업 화학 사고와 테러리스트 화학 공격의 가장 큰 대응 차이는?",
      o: [
        "산업 사고는 PPE가 필요 없지만 테러는 필요하다",
        "테러는 법 집행 기관(경찰/군) 강화가 추가로 필요하다",
        "테러는 해독제를 사용하지만 산업 사고는 지지 치료만 한다",
        "산업 사고는 제독이 필요 없다"
      ],
      a: 1,
      exp: "주요 차이: 테러 → 화학사건 대응 + 법 집행 기관(경찰/군) 강화 필요. 사고 → 화학사건 대응만 필요. 테러 현장은 범죄 현장이기도 하므로 증거 보전, 보안, 2차 공격 방지를 위해 법 집행 기관과의 협력이 필수다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q18",
      q: "도쿄 지하철 사린 공격(1995)에서 FEMA 분석이 지적한 주요 교훈 중 하나는?",
      o: [
        "제독 장비가 부족했다",
        "병원이 사건 정보를 TV 뉴스에 의존했다",
        "사린 해독제가 부족했다",
        "PPE Level A 수트가 없었다"
      ],
      a: 1,
      exp: "도쿄 사린 공격 교훈(FEMA 분석): ① 빈약한 통신이 대응을 지연시켰다 ② 오염이 지하철 전 노선으로 확산됐다 ③ 병원들이 TV 뉴스로 사건 정보를 얻어야 했다 ④ 의사의 전문 지식이 진단에 결정적이었다 ⑤ 기관 간 조정 및 계획 필요성 부각.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q19",
      q: "VX 신경작용제의 특성은?",
      o: [
        "무취, 기체 상태, 신속 분해",
        "기름진 질감, 지속성, 피부 투과성 높음",
        "달콤한 향, 수용성, 흡입만 위험",
        "장뇌향, 무색, 즉시 증발"
      ],
      a: 1,
      exp: "VX의 특성: 기름진 질감, 지속성(쉽게 증발하지 않음), 피부 투과성이 매우 높아 소량(피부에 접촉만 해도)으로도 치명적. G-시리즈(Sarin, Soman, Tabun)에 비해 훨씬 지속적이고 위험하다. 2017년 김정남 암살에 VX가 사용된 이유다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q20",
      q: "화학 재난 병원 대응 12단계에서 가장 첫 번째 단계는?",
      o: [
        "제독 실시",
        "조기 병원 재난 선포(HICS 활성화)",
        "해독제 투여",
        "보안 강화"
      ],
      a: 1,
      exp: "병원 대응 12단계 중 1단계: 조기 병원 재난 선포(HICS/Hospital Incident Command System 활성화). 그 다음 순서: 재난 체계 전환 선언 → 제독 → 해독제 사용 → ED 구역 설정 → HICS 시설 확장 → 보안 강화 → ED 병상 확보...",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q21",
      q: "2002년 모스크바 극장 인질 사건에서 러시아 군이 사용한 화학물질은?",
      o: [
        "사린(Sarin)",
        "시안화물(Cyanide)",
        "오피오이드 전구체 + 마취제 혼합물",
        "신경작용제 VX"
      ],
      a: 2,
      exp: "2002년 모스크바 극장 인질 사건에서 러시아 군이 오피오이드 전구체 + 마취제 혼합물을 사용하여 130명 이상의 민간인 인질이 사망했다. 이는 오피오이드계 화학작용제의 위험성을 보여준 사례다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q22",
      q: "화학물질 노출 후 '제독 시작까지 권장 시간'은?",
      o: ["5분 이내", "15분 이내", "30분 이내", "1시간 이내"],
      a: 1,
      exp: "제독은 15분 이내 시작이 권장된다. 실제 사건에서는 시설 미비, 훈련 부족 등으로 종종 1시간 이상 지연된다. 습성 오염물질은 시간 지연에 따라 제독 효과가 지수적으로 감소하므로 조기 시작이 생명을 구한다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q23",
      q: "신경작용제 중독에서 경련(seizure) 조절을 위해 투여하는 약물은?",
      o: ["아트로핀(Atropine)", "프랄리독심(Pralidoxime/2-PAM)", "다이아제팜(Diazepam)", "하이드록소코발라민"],
      a: 2,
      exp: "다이아제팜(Diazepam, 벤조디아제핀계)은 신경작용제 중독 시 경련 조절에 사용한다. 아트로핀은 무스카린 효과를 차단하고, 2-PAM은 AChE를 재활성화한다. 세 약물 모두 신경작용제 해독의 필수 구성 요소다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q24",
      q: "화학 재난 사전 제독(Pre-Decontamination) 트리아지에서 1차로 사용하는 트리아지 방법은?",
      o: ["START 트리아지", "MASS 트리아지", "TST(10초 트리아지)", "SALT 트리아지"],
      a: 1,
      exp: "화학 재난 현장 트리아지 순서: 1차 = MASS(Move, Assess, Sort, Send), 2차 = 사전 제독 화학 트리아지 알고리즘. 일반 외상 MCI와 달리 화학 현장에서는 MASS를 먼저 사용하여 대규모 환자를 신속히 분류한다.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q25",
      q: "신경작용제 중독의 첫 번째 나타나는 징후는?",
      o: ["경련(Seizure)", "동공 축소(Miosis)", "근 마비(Muscle paralysis)", "의식 상실(Loss of consciousness)"],
      a: 1,
      exp: "신경작용제 중독의 가장 먼저 나타나는 징후는 동공 축소(Miosis)다. 이는 콜린성 독성증후군의 초기 신호로, 독성이 진행되면 DUMBELS 전체 증상(타액/눈물/분비물 증가, 배뇨/배변, 구토, 기관지 수축)이 나타난다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q26",
      q: "도쿄 지하철 사린 공격을 감행한 단체는?",
      o: ["알카에다(Al-Qaeda)", "옴진리교(Aum Shinrikyo)", "ISIS", "하마스(Hamas)"],
      a: 1,
      exp: "1995년 3월 20일 도쿄 지하철 사린 공격은 아사하라 쇼코가 이끄는 종교적 광신 집단 옴진리교(Aum Shinrikyo)가 자행했다. 그들은 종말이 올 것이라 믿었고, 자신들에게 죽임을 당하면 지옥에서 구원된다는 왜곡된 믿음을 가지고 있었다.",
      diff: "normal",
      category: "chemical"
    },
    {
      id: "chem_q27",
      q: "G-시리즈 신경작용제 4가지(Tabun, Sarin, Soman, Cyclosarin)의 코드명을 올바르게 짝지은 것은?",
      o: [
        "Tabun=GA, Sarin=GB, Soman=GD, Cyclosarin=GF",
        "Tabun=GB, Sarin=GA, Soman=GF, Cyclosarin=GD",
        "Tabun=GD, Sarin=GF, Soman=GA, Cyclosarin=GB",
        "Tabun=GF, Sarin=GD, Soman=GB, Cyclosarin=GA"
      ],
      a: 0,
      exp: "G-시리즈 코드: Tabun=GA(약한 과일향), Sarin=GB(무취), Soman=GD(장뇌향), Cyclosarin=GF. V-시리즈: VX는 기름지고 지속성. 모두 무색 또는 황색 기체, 무미, 실온에서 기화.",
      diff: "hard",
      category: "chemical"
    },
    {
      id: "chem_q28",
      q: "화학 재난에서 '오피오이드계 작용제' 노출 시 해독제는?",
      o: ["아트로핀(Atropine)", "날록손(Naloxone)", "하이드록소코발라민", "프랄리독심(2-PAM)"],
      a: 1,
      exp: "오피오이드계 화학작용제(펜타닐, 카르펜타닐 등)의 해독제는 날록손(Naloxone)이다. 독성증후군(Toxidrome): 서맥 또는 무호흡, 진정, 동공 축소. 2002년 모스크바 극장 사건에서도 오피오이드 계열이 사용됐다.",
      diff: "normal",
      category: "chemical"
    }
  ],

  // ==========================================
  // BIOLOGICAL (생물재난) — 28 questions
  // ==========================================
  biological: [
    {
      id: "bio_q01",
      q: "2001년 미국 앤트랙스(Amerithrax) 탄저균 우편물 테러로 사망한 사람의 수는?",
      o: ["2명", "5명", "11명", "22명"],
      a: 1,
      exp: "2001년 Amerithrax 사건: 총 22명 감염(피부 탄저 11명 + 흡입 탄저 11명), 5명 사망. 5통의 편지가 플로리다 AMI, 뉴욕 NBC/NY Post, 워싱턴 D.C. 상원의원실로 발송됐다. 총 비용은 10억 달러로 추정된다.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q02",
      q: "CDC 생물테러 A등급 병원체(Category A)에 해당하는 것을 모두 포함하는 선택지는?",
      o: [
        "탄저균, 보툴리눔, 페스트, 천연두, 야토병, 바이러스성 출혈열",
        "탄저균, 살모넬라, 리신, Q열, 브루셀라",
        "페스트, 에볼라, HIV, 인플루엔자, 콜레라",
        "천연두, SARS, 한타바이러스, 니파바이러스"
      ],
      a: 0,
      exp: "CDC Category A(최우선): ① 탄저균(Bacillus anthracis) ② 보툴리눔(Clostridium botulinum 독소) ③ 페스트(Yersinia pestis) ④ 천연두(Variola major) ⑤ 야토병(Francisella tularensis) ⑥ 바이러스성 출혈열(에볼라, 마버그, 라사 등). 쉽게 전파되고, 높은 사망률, 공포/사회 혼란 유발, 특별 공중보건 대응 필요.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q03",
      q: "탄저균 감염 3가지 형태를 사망률이 높은 순서부터 나열한 것은?",
      o: [
        "흡입형 > 위장형 > 피부형",
        "피부형 > 흡입형 > 위장형",
        "위장형 > 피부형 > 흡입형",
        "흡입형 > 피부형 > 위장형"
      ],
      a: 0,
      exp: "탄저균(Bacillus anthracis) 3형태: ① 흡입형(Inhalational) — 가장 치명적 ② 위장형(Gastrointestinal) ③ 피부형(Cutaneous) — 가장 덜 치명적. 중요: 탄저균은 사람-사람 간 전파 없음(Non-communicable). 포자는 대부분 환경 조건에서 저항성이 강하고 토양에서 발견된다.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q04",
      q: "페스트(Yersinia pestis)에서 사람-사람 간 전파가 가능한 유일한 형태는?",
      o: ["선페스트(Bubonic plague)", "패혈증 페스트(Septicemic plague)", "폐렴 페스트(Pneumonic plague)", "피부 페스트(Cutaneous plague)"],
      a: 2,
      exp: "3가지 페스트 형태: ① 선페스트(발열, 두통, 통증성 림프절/부보) ② 패혈증형(저혈압, 다발성장기부전, DIC) ③ 폐렴형 — 유일하게 사람-사람 간 호흡기 비말 전파 가능. 폐렴 페스트 환자는 N95 마스크 + 격리실에서 최소 72시간 격리 필요.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q05",
      q: "1993년 도쿄 가메이도(Kameido)에서 옴진리교의 탄저균 공격이 실패한 이유는?",
      o: [
        "경찰에 의해 사전에 탐지되었다",
        "독성이 없는 백신 균주(vaccine strain)를 사용했다",
        "탄저 포자가 충분히 건조되지 않았다",
        "살포 장치가 고장났다"
      ],
      a: 1,
      exp: "옴진리교는 1993년 도쿄 가메이도에서 Bacillus anthracis 탄저균을 에어로졸화하려 했으나 실패했다. 이유: 독성 없는 백신 균주(virulent strain이 아닌 vaccine strain)를 사용했기 때문. 결과적으로 아무도 아프지 않았다. 역사상 가장 유명한 생물 공격 시도 실패 사례다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q06",
      q: "보툴리눔 독소(Botulinum toxin) 에어로졸 1그램은 최소 몇 명을 죽일 수 있는가?",
      o: ["10만 명", "50만 명", "150만 명", "500만 명"],
      a: 2,
      exp: "보툴리눔 독소의 치명적 잠재력: 에어로졸화된 1그램으로 최소 150만 명을 죽일 수 있다. 이는 지구상에서 알려진 가장 독성이 강한 물질 중 하나다. 클로스트리디움 보툴리눔(Clostridium botulinum)은 혐기성 그람 양성 막대균으로 토양과 물에서 발견된다.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q07",
      q: "보툴리눔 독소 중독의 특징적인 마비 형태는?",
      o: [
        "상행성 강직성 마비(뇌신경→사지)",
        "하행성 이완성 마비(뇌신경에서 시작)",
        "대칭성 경직성 마비(사지 동시)",
        "비대칭성 반신 마비"
      ],
      a: 1,
      exp: "보툴리눔 독소의 특징: 하행성(descending) 이완성(flaccid) 마비 — 뇌신경(cranial nerves)에서 시작하여 아래로 진행. 증상: 열 없는 급성 발병, 어지럼증, 복시, 호흡 곤란, 말 어려움. 호흡 부전으로 진행 가능. 사람-사람 간 전파 없음.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q08",
      q: "천연두(Smallpox) 노출 후 감염을 예방할 수 있는 백신 접종 창(vaccination window)은?",
      o: ["노출 후 6시간 이내", "노출 후 1~4일 이내", "노출 후 7~14일 이내", "노출 후 1개월 이내"],
      a: 1,
      exp: "천연두 백신: 노출 후 1~4일 이내 접종 시 감염 예방 가능. 노출 후 4~7일 이내 접종 시 중증도 감소 가능. 천연두 잠복기는 12~14일. 전 세계 인구는 40년간 백신 미접종으로 면역력이 없다. TPOXX(Tecovirimat)는 2018년 7월 FDA 승인된 항바이러스제.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q09",
      q: "탄저균 감염의 흡입형 치료에서 항생제 투여 기간은?",
      o: ["14일", "21일", "30일", "60일"],
      a: 3,
      exp: "탄저균 치료: Ciprofloxacin 400mg IV BID 또는 Doxycycline 100mg IV BID → 안정되면 경구 Cipro 500mg으로 전환. 전체 경구 항생제 기간 60일. 노출 후 예방(PEP)도 동일하게 60일(Cipro 500mg BID 또는 Doxy 100mg BID).",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q10",
      q: "페스트(Plague) 폐렴형 환자의 격리 기간은 최소 얼마인가?",
      o: ["12시간", "24시간", "48시간", "72시간"],
      a: 3,
      exp: "페스트 폐렴형은 호흡기 비말로 사람-사람 간 전파가 가능하므로 N95 마스크 + 격리실에서 최소 72시간 격리가 필요하다. 흉부 X선 소견: 침윤, 경화, 공동. 치료: Streptomycin 15mg/kg BID IM 10일 또는 Gentamicin 5mg/kg/일 IV 7~10일.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q11",
      q: "Gram 염색에서 '안전핀(safety pin)' 모양의 균이 의미하는 것은?",
      o: ["탄저균(Bacillus anthracis)", "예르시니아 페스티스(Yersinia pestis/페스트)", "프란시셀라 툴라렌시스(Yersinia pestis)", "클로스트리디움 보툴리눔"],
      a: 1,
      exp: "예르시니아 페스티스(Yersinia pestis, 페스트균)는 Gram 음성 구간균(coccobacillus)으로 Gram 염색 시 '안전핀(safety pin)' 모양으로 보인다(양극 염색). 벼룩에 물린 설치류에서 사람으로 전파된다. 림프절 통증과 부종(부보, buboes)이 특징이다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q12",
      q: "1984년 미국 오레곤주 더달레스(The Dalles)에서 라지니쉬(Rajneeshees) 교도들이 저지른 생물 테러에 사용된 병원체는?",
      o: ["탄저균(Anthrax)", "살모넬라균(Salmonella)", "보툴리눔 독소", "천연두 바이러스"],
      a: 1,
      exp: "1984년 라지니쉬 사건: 오레곤 더달레스 지역 식당 샐러드 바에 살모넬라균 오염. 동기: 지방 선거 영향. 결과: 750명 감염, 지역사회 12% 감염. 2주 내 현지 병원 전체 병상이 가득 찼다. 미국 역사상 최초의 대규모 생물 테러 사건이다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q13",
      q: "1979년 소련 스베르들롭스크(Sverdlovsk) 탄저균 사건의 진실은?",
      o: [
        "자연 발생한 탄저 유행이었다",
        "오염된 고기로 인한 위장형 탄저 집단 발병이었다",
        "군사 시설에서 공기 중으로 탄저 포자가 방출됐다",
        "화학무기가 실수로 폭발한 것이었다"
      ],
      a: 2,
      exp: "스베르들롭스크 탄저 사건(1979): 소련 군사 시설에서 무기화된 탄저균이 의도치 않게 방출됨. 총 96명 감염(피부형 17명, 위장형 79명), 64명 사망. 소련은 처음에 오염 고기를 원인으로 주장했으나, 피해자 대부분이 군사 시설 하풍(downwind) 방향에 위치했다는 증거가 드러났다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q14",
      q: "보툴리눔 독소 중독 치료에서 가장 중요한 지지 치료는?",
      o: [
        "항생제(Ciprofloxacin) 즉시 투여",
        "기도 확보와 호흡기 지지(수주간 인공호흡기)",
        "해열제와 수액 보충",
        "스테로이드 투여로 신경 부종 감소"
      ],
      a: 1,
      exp: "보툴리눔 독소 치료: 기도 확보와 호흡 유지가 최우선 — 수주간 인공호흡기 지지 필요. 수동 면역: 마형 7가 보툴리눔 항독소(equine heptavalent botulinum antitoxin). 항생제 없음, 광범위 사용 백신 없음. 임상 소견 기반 진단, 특수 검사실에서 혈청/변/비강 면봉으로 ELISA 또는 PCR 확인.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q15",
      q: "1978년 영국 버밍엄 천연두 사건에서 마지막으로 사망한 사람은 누구인가?",
      o: [
        "옆 연구실의 대학원생",
        "버밍엄 의과대학 실험실 직원",
        "환자를 치료한 응급의학과 의사",
        "천연두 검체를 취급한 공중보건 관료"
      ],
      a: 1,
      exp: "1978년 버밍엄 천연두 사건: 버밍엄 의과대학 직원이 실험실에서 천연두에 감염되어 사망 — 인류 역사상 천연두로 알려진 마지막 사망자. 그녀의 어머니도 감염됐으나 생존. '슈터 보고서(Shooter Report)'가 실험실 천연두 검체 보안에 대한 광범위한 조사 결과를 담았다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q16",
      q: "CDC 생물테러 C등급 병원체(Category C)에 포함되는 것은?",
      o: [
        "탄저균, 보툴리눔, 천연두",
        "살모넬라, 리신, 브루셀라",
        "니파바이러스, 웨스트나일바이러스, 한타바이러스, SARS",
        "Q열, 글랜더스, 에볼라"
      ],
      a: 2,
      exp: "CDC 분류: A등급(최우선) — 탄저/보툴리눔/페스트/천연두/야토병/VHF. B등급(2순위) — 브루셀라/리신/살모넬라/Q열 등. C등급(3순위, 신종 감염병) — 니파바이러스, 웨스트나일바이러스, 한타바이러스, SARS. C등급은 미래 테러에 조작될 가능성이 있는 신종 병원체들이다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q17",
      q: "생물 재난 대응의 POD(Point of Dispensing) 시스템에서 '드라이브 스루(Drive-Through) POD'의 특징은?",
      o: [
        "이동이 불편한 고령층을 위한 방문 서비스",
        "차량에서 내리지 않고 의료 대응책을 받는다",
        "특정 직장인이나 학생에게만 개방된 폐쇄형",
        "헬기로 외딴 지역에 배포하는 이동형"
      ],
      a: 1,
      exp: "POD 유형: ① 공개형(Open POD) — 누구나 이용 가능한 공공 장소 ② 폐쇄형(Closed POD) — 특정 집단(직장, 학교) ③ 드라이브 스루(Drive-Through POD) — 차량에서 내리지 않고 대응책 수령 ④ 이동형(Mobile POD) — 소외/원격 지역 대상. 생물 재난 시 신속한 대량 배포의 핵심 인프라다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q18",
      q: "탄저균(Bacillus anthracis)의 가장 중요한 역학적 특성은?",
      o: [
        "사람-사람 간 쉽게 전파된다",
        "포자 형태로 대부분 환경 조건에서 저항성이 강하다",
        "수일 내에 자연 소멸한다",
        "동물에게만 감염되고 사람은 감수성이 없다"
      ],
      a: 1,
      exp: "탄저균의 핵심 특성: 그람 양성 포자형성 막대균. 포자는 대부분 환경 조건에서 저항성이 강함(토양에서 수십 년 생존 가능). 사람-사람 간 전파 없음. 토양에서 발견. 흉부 X선: 종격동 확장 + 흉막 삼출. 이러한 포자의 내구성이 생물무기로서의 위험성을 높인다.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q19",
      q: "야토병(Tularemia) 6가지 형태 중 가장 위험한 형태는?",
      o: ["피부선(Ulceroglandular)형 — 가장 흔한 형", "폐렴(Pulmonary)형", "선(Glandular)형", "인두(Oropharyngeal)형"],
      a: 1,
      exp: "야토병(Francisella tularensis) 6가지 형태(위험도 순): ① 폐렴형(Pulmonary) — 가장 위험 ② 선형(Glandular) ③ 피부선형(Ulceroglandular) — 가장 흔함 ④ 안구선형(Oculoglandular) ⑤ 인두형(Oropharyngeal) ⑥ 장티푸스형(Typhoidal). 진드기, 사슴등에, 오염된 고기, 직접 접촉, 동물 물림, 에어로졸로 전파.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q20",
      q: "천연두(Smallpox) 치료에 2018년 FDA가 승인한 항바이러스제는?",
      o: ["Remdesivir", "TPOXX(Tecovirimat)", "Acyclovir", "Ribavirin"],
      a: 1,
      exp: "TPOXX(Tecovirimat)는 2018년 7월 FDA가 패스트트랙 및 희귀의약품 프로그램을 통해 승인한 천연두 항바이러스제다. 추가 치료: 바리올라 면역글로불린(VIG), 링 접종(ring vaccination), 격리. 노출 후 1~4일 내 백신 접종이 감염을 예방할 수 있다.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q21",
      q: "1994년 인도 수랏(Surat) 페스트 발생의 직접적 원인이 된 사건은?",
      o: [
        "테러리스트의 의도적인 페스트균 살포",
        "1993년 지진과 홍수로 인한 환경 재난",
        "오염된 식수 공급",
        "아프리카에서 귀국한 여행자"
      ],
      a: 1,
      exp: "수랏 페스트(1994): 1993년 지진(2만 명 사망) 이후 홍수가 겹친 환경 재난이 원인. 폐렴 페스트 발생: 900명 감염, 56명 사망. 경제적 파급: 수랏 시 2억 6천만 달러, 인도 수출 10억 달러 손실, 관광 50% 감소. 자연 재난이 생물 재난으로 이어진 복합 재난 사례.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q22",
      q: "바이러스성 출혈열(VHF)의 증상으로 가장 적절하게 설명한 것은?",
      o: [
        "고열, 관절통, 피부 발진, 점막 출혈, 충격",
        "오심, 구토, 설사만 주로 나타남",
        "호흡 곤란과 흉통이 주증상",
        "발열 없이 점진적으로 마비가 진행"
      ],
      a: 0,
      exp: "VHF(에볼라, 마버그, 라사 등) 증상: 발열, 권태감, 근육통, 충격, 오심, 구토, 점막 전반 출혈(범출혈), 발진. 진단: 혈소판 감소증, 응고병증, DIC, 간효소 상승, 전신 SIRS. 쉽게 사람-사람 간 전파 가능. 치료: 지지 치료, 신규 치료제 Remdesivir.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q23",
      q: "생물 재난 대응에서 1차 접촉 의료기관으로 가장 먼저 피해자를 만나게 되는 곳은?",
      o: ["지역 보건소", "응급의료센터(ED, Emergency Department)", "국립보건원 격리 병동", "군 의무대"],
      a: 1,
      exp: "생물테러 피해자는 응급의료센터(ED)에서 가장 먼저 접촉하게 된다. 핵심 원칙: 즉시 격리 → 임상적 치료. 핵심 항생제: Cipro & Doxycycline(대부분 A등급 병원체에 광범위 커버). 저확률 사건이지만 발생 시 고충격이므로 확률과 가능성을 혼동하지 말 것.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q24",
      q: "페스트 노출 후 예방(PEP, Post-Exposure Prophylaxis) 기간은?",
      o: ["3일", "7일", "14일", "60일"],
      a: 1,
      exp: "병원체별 PEP 기간 비교: 탄저균 = 60일, 페스트 = 7일, 야토병 = 14일. 페스트 PEP: Ciprofloxacin 500mg BID 또는 Doxycycline 100mg BID, 7일간. 탄저균의 60일과 페스트의 7일을 혼동하지 않도록 주의.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q25",
      q: "생물 재난의 4가지 분류 기준에 해당하지 않는 것은?",
      o: ["발생 원인(자연/우발/고의)", "전파 가능성(전파성/비전파성)", "경제적 피해 규모", "규모(지역/국가/세계)"],
      a: 2,
      exp: "생물 재난 4가지 분류: ① 발생 원인(자연, 우발, 의도적) ② 전파 가능성(전파성 vs 비전파성 — 페스트 폐렴형 vs 탄저균) ③ 규모(국소, 지역, 국가, 세계) ④ 생물학적 병원체 유형(세균, 바이러스, 독소 등). 경제적 피해는 결과이지 분류 기준이 아니다.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q26",
      q: "탄저균 흡입 노출의 흉부 X선 특징적 소견은?",
      o: [
        "과팽창(hyperinflation)과 기흉(pneumothorax)",
        "종격동 확장(mediastinal widening)과 흉막 삼출(pleural effusions)",
        "간유리음영(ground-glass opacity)과 폐경화(consolidation)",
        "흉막비후(pleural thickening)와 석회화"
      ],
      a: 1,
      exp: "흡입 탄저균의 특징적 CXR 소견: 종격동 확장(mediastinal widening) + 흉막 삼출(pleural effusions). 이는 종격동 림프절 침범을 반영한다. 진단: 병력청취 + Gram 염색/혈액 배양 + PCR(LRN 검사실 필요). 치료: Cipro 400mg IV BID 또는 Doxy 100mg IV BID + 필요시 Rifampin, Clindamycin 추가.",
      diff: "hard",
      category: "biological"
    },
    {
      id: "bio_q27",
      q: "Amerithrax(2001) 사건에서 발송된 탄저균 편지의 수는?",
      o: ["2통", "5통", "10통", "22통"],
      a: 1,
      exp: "Amerithrax(2001): 총 5통의 편지 발송 — 플로리다 AMI, 뉴욕 NBC, 뉴욕 포스트, 워싱턴 D.C. 댁슬 상원의원실, 리히 상원의원실. 영향 주(州): 플로리다, 뉴욕, 뉴저지, 워싱턴 D.C., 코네티컷, 버지니아, 메릴랜드. 최초 사례: 플로리다 ER에 내원한 편집자.",
      diff: "normal",
      category: "biological"
    },
    {
      id: "bio_q28",
      q: "생물 재난 대응에서 FEMA가 제시한 6가지 대응 단계의 첫 번째는?",
      o: [
        "대중과 외부 파트너에게 소통",
        "위협 탐지 및 특성 파악",
        "질병 확산 통제",
        "의료 서비스 증강"
      ],
      a: 1,
      exp: "FEMA 생물 재난 대응 6단계: ① 위협 탐지 및 특성 파악(Detect and Characterize) → ② 외부 파트너 및 대중과 소통 → ③ 질병 확산 통제 → ④ 대량 케어 및 인적 서비스 증강 → ⑤ 보건 및 의료 서비스 증강 → ⑥ 필수 서비스 증강으로 회복 달성.",
      diff: "hard",
      category: "biological"
    }
  ],

  // ==========================================
  // RADIOLOGICAL (방사선 재난) — 27 questions
  // ==========================================
  radiological: [
    {
      id: "rad_q01",
      q: "RDD(Radiological Dispersal Device)란 무엇인가?",
      o: [
        "핵융합 반응을 이용한 무기",
        "방사성 물질 + 일반 폭발물 = 더티밤(Dirty Bomb)",
        "전자기 펄스(EMP)를 발생시키는 장치",
        "원자로에서 직접 방사선을 방출하는 기기"
      ],
      a: 1,
      exp: "RDD(방사선 분산 장치, '더티 밤') = 다이너마이트 등 일반 폭발물 + 방사성 분말/펠릿. 폭발 시 방사성 물질이 주변 지역으로 확산. 핵폭발과 달리 핵반응은 없으나, 방사성 오염이 발생한다. CDC 정의 기준.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q02",
      q: "방사선량 단위에서 1 그레이(Gy)는 몇 래드(rad)인가?",
      o: ["1 rad", "10 rad", "100 rad", "1000 rad"],
      a: 2,
      exp: "방사선량 단위 변환: 1 Gy(그레이) = 100 rad, 1 rad = 0.01 Gy. 시버트(Sv)와 렘(rem): 1 Sv = 100 rem. SI 단위: Gy(흡수선량), Sv(등가선량). 전통 단위: rad, rem.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q03",
      q: "1 시버트(Sv)는 몇 렘(rem)인가?",
      o: ["1 rem", "10 rem", "100 rem", "1000 rem"],
      a: 2,
      exp: "단위 변환 핵심: 1 Sv = 100 rem, 1 rem = 0.01 Sv. 1 Gy = 100 rad, 1 rad = 0.01 Gy. 방사선 피해는 선량/시간, 선원까지의 거리, 차폐에 따라 결정된다.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q04",
      q: "급성방사선증후군(ARS)의 4단계를 순서대로 나열한 것은?",
      o: [
        "전구기 → 잠복기 → 발현기 → 회복/사망",
        "잠복기 → 전구기 → 발현기 → 회복/사망",
        "발현기 → 전구기 → 잠복기 → 회복/사망",
        "전구기 → 발현기 → 잠복기 → 회복/사망"
      ],
      a: 0,
      exp: "ARS 4단계: ① 전구기(Prodromal) — 오심/구토/설사, 피폭 후 수분~수일, 선량에 따라 신속도 결정 ② 잠복기(Latent) — 환자가 건강해 보이는 기간(증상 없어 보임) ③ 발현기(Manifest Illness) — 혈액조혈/위장/심혈관신경 증후군 ④ 회복 또는 사망 — 대부분 사망은 피폭 후 수개월 내.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q05",
      q: "방사선 선량 100~200 렘(rem)에서 구토 발생 시작 시간과 발생률은?",
      o: ["즉시, 100%", "15~30분 후, 100%", "3~6시간 후, 5~50%", "2~3시간 후, 50~100%"],
      a: 2,
      exp: "선량별 구토 특성: 25~100 rem = 구토 없음. 100~200 rem = 3~6시간 후, 5~50% 발생. 200~600 rem = 2~3시간 후, 50~100%. 600~1000 rem = 15~30분 후, 100%. 1000~3500 rem = 5~20분 후, 100%. >3500 rem = 3분 이내, 100%. 구토 시작 시간이 빠를수록 선량이 높음을 의미한다.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q06",
      q: "방사선 선량 >3500 rem에서 나타나는 주요 증후군은?",
      o: [
        "조혈(Hematopoietic) 증후군",
        "위장(Gastrointestinal) 증후군",
        "심혈관/중추신경계(CNS) 증후군",
        "피부방사선(Cutaneous radiation) 증후군"
      ],
      a: 2,
      exp: "ARS 증후군 분류: ① 조혈(골수) 증후군: 200~1000 rem ② 위장 증후군: 1000~3500 rem ③ 심혈관/CNS 증후군: >3500 rem — 경련, 떨림, 사망률 100%. >3500 rem에서는 3분 이내 구토, 100% 사망. 뇌와 척수가 주요 영향 기관.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q07",
      q: "방사선 피폭 후 방사성 아이오딘(요오드) 노출에 가장 효과적인 치료제와 투여 시기는?",
      o: [
        "프러시안 블루(Prussian blue), 노출 즉시",
        "요오드화칼륨(KI), 노출 후 1일 이내",
        "DTPA, 노출 후 24시간 내",
        "줄기세포 이식, 노출 후 가능한 빨리"
      ],
      a: 1,
      exp: "방사선 특이 치료제: ① 요오드화칼륨(KI) — 방사성 요오드 노출, 1일 이내 가장 효과적 ② 프러시안 블루(Prussian blue) — 세슘 또는 탈륨 노출 ③ DTPA — 내부 오염 ④ 줄기세포 수혈 — 심각한 골수 손상 ⑤ 조혈 성장인자(myeloid cytokines) — 조혈 자극.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q08",
      q: "세슘(Cesium) 또는 탈륨(Thallium) 방사선 오염 시 사용하는 치료제는?",
      o: ["요오드화칼륨(KI)", "DTPA", "프러시안 블루(Prussian blue)", "하이드록소코발라민"],
      a: 2,
      exp: "방사선 오염 치료제 매칭: 방사성 요오드 → KI(요오드화칼륨). 세슘/탈륨 → Prussian blue(프러시안 블루). 내부 오염 → DTPA(diethylenetriamine pentaacetate). 심각한 골수 손상 → 줄기세포 이식. 조혈 자극 → myeloid cytokines.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q09",
      q: "RDD(더티 밤) 폭발 직후 초기 대피소 설정(shelter-in-place) 반경은?",
      o: ["100미터", "250미터", "500미터", "1킬로미터"],
      a: 2,
      exp: "RDD 대응 초기 대피 구역: 폭발 지점 사방 500미터. 오염 방향 확인 후 → 확인된 방향으로 2km로 확장. 100분 프레임워크: 인식(0~5분) → 통보(5~10분) → 개시(5~40분) → 측정/지도(15~90분) → 대피/모니터(>70분).",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q10",
      q: "방사선 오염 방향이 확인된 후 대피소 구역 확장 거리는?",
      o: ["500미터", "1킬로미터", "2킬로미터", "5킬로미터"],
      a: 2,
      exp: "초기 500m 대피소 설정 후, 오염 방향이 확인되면 확인된 방향으로 2km까지 확장. 이는 방사성 낙진의 하풍(downwind) 확산 패턴을 고려한 조치다. 구역 설정은 시간 경과에 따라 업데이트된다.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q11",
      q: "방사선 피폭 후 첫 12시간 동안 CBC(전혈구 검사) 모니터링 주기는?",
      o: ["30분마다", "1시간마다", "2~3시간마다", "6~12시간마다"],
      a: 2,
      exp: "CBC 모니터링 일정: 피폭 후 첫 12시간 = 2~3시간마다, 그 후 3일간 = 4~6시간마다. 림프구 수(lymphocyte count) 모니터링이 핵심. 방사선 사고 및 혈액 전문의 자문 의뢰 필요. 일반 치료: 구토 증상 완화, 수액 지지.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q12",
      q: "ARS의 잠복기(Latent stage)에서 환자는 어떻게 보이는가?",
      o: [
        "심각한 구토와 설사로 탈수 상태",
        "피부 발적과 수포로 고통받는 상태",
        "증상이 없어 건강해 보이는 상태",
        "경련과 의식 저하 상태"
      ],
      a: 2,
      exp: "ARS 잠복기(Latent stage)의 함정: 환자가 건강해 보이고 증상이 없다. 이는 임상적 함정(clinical trap)이다 — 실제로는 내부적으로 심각한 손상이 진행 중이다. RPG 게임에서 중요한 결정 포인트: 증상 없다고 방심하면 안 된다. 잠복기 후 발현기에서 급격히 악화된다.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q13",
      q: "방사선 피폭에 의한 지연 효과(delayed effects)에 해당하지 않는 것은?",
      o: ["암(Cancer)", "태아 이상(Fetal abnormalities)", "피부 화상(Skin burns)", "혈액 장애(Blood disorders)"],
      a: 2,
      exp: "즉각 효과: 피부 자극/화상, 급성방사선병(ARS). 지연 효과: 암, 태아 이상, 유전 장애, 혈액 장애. 피부 화상은 즉각 효과다. 피부 방사선 증후군(Cutaneous Radiation Syndrome)은 피부에 대한 급성 방사선 노출로 발생하며 ARS 없이도 단독으로 발생 가능.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q14",
      q: "PRISM 프로토콜 방사선 제독 2단계(사다리 파이프 세척) 후 3단계(2차 제독)의 소요 시간은?",
      o: ["5초", "15초", "90초", "5분"],
      a: 2,
      exp: "PRISM 3단계: ① 탈의+건식 제독 ② 사다리 파이프 미온수 세척 15초 ③ 2차/기술적 제독 90초(베이비샴푸+면 세척포). 전체 PRISM 3단계 완료 시 화학/방사선 오염 100%(SD±1%) 제거 가능.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q15",
      q: "방사선 첫 15분 내 응급 대응자에게 SCBA(자급식 공기호흡기)를 사용할 수 없는 상황(예: 운전 중)에서 권장 호흡기 보호구는?",
      o: [
        "수술용 마스크(Surgical mask)",
        "반면형 APR + P100 또는 HEPA 필터",
        "N95 마스크",
        "전면형 APR + P100 필터"
      ],
      a: 3,
      exp: "방사선 PPE 표: 첫 15분 — SCBA 양압 호흡기 (우선). SCBA가 작전 방해 시(예: 운전) — 전면형 APR + P100 또는 HEPA 필터. 15분 이후 — 반면형 APR + P100/HEPA 필터, 또는 N95. 항상: 보호 안경, 장갑, 일반 근무복.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q16",
      q: "방사선 피폭 선량 200~600 렘(rem)에서의 예후와 사망률은?",
      o: [
        "우수(Excellent), 사망률 0%",
        "양호(Good), 사망률 15~80%",
        "불량(Poor), 사망률 80~90%",
        "사망(Death), 100%"
      ],
      a: 1,
      exp: "선량별 예후: 25~100 rem = 우수(excellent), 0%. 100~200 rem = 우수, 0~15%. 200~600 rem = 양호(good), 15~80%. 600~1000 rem = 불량(poor), 80~90%. 1000~3500 rem = 사망(death), 거의 100%. >3500 rem = 사망, 100%. 200~600 rem은 골수, 혈액계, 위장관 영향.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q17",
      q: "방사선 재난의 시간 기반 대응 미션에서 '인식(RECOGNIZE)' 단계의 시간 범위는?",
      o: ["0~2분", "0~5분", "5~10분", "10~15분"],
      a: 1,
      exp: "100분 프레임워크: RECOGNIZE(폭발 현장에서 방사선 인식) = 0~5분. INFORM(대응자·대중 초기 핫존 통보, 관계 기관 통지) = 5~10분. INITIATE(방사선 모니터링 없이 생명 구조 시작) = 5~40분. MEASURE & MAP(방사선 측정) = 15~90분. EVACUATE & MONITOR(대피, 지역사회 수용센터 확인) = >70분.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q18",
      q: "대중 공개 정보 발표(PIA, Public Information Announcement) #1의 핵심 내용은?",
      o: [
        "방사선 유해 정보 제공",
        "즉각적인 현장 대피 유도 지침",
        "즉각적인 대피소 대피(Shelter-in-place) 지침",
        "언론 대상 기자회견 개최"
      ],
      a: 2,
      exp: "PIA 3단계: #1 — 즉각적인 대피소 대피(Shelter-in-place) 지침 포함한 사전 승인 공개 메시지(폭발 인식 즉시). #2 — 방사선 위험 정보 + 대피소 대피 재강조. #3 — 대응, 대피, 자가 제독 정보를 포함한 기자회견. 순서 기억: 먼저 대피소 대피, 그 다음 정보 제공.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q19",
      q: "피부 방사선 증후군(Cutaneous Radiation Syndrome)의 증상은?",
      o: [
        "구역, 구토, 설사, 탈모",
        "피부 발적, 수포, 궤양",
        "저혈압, 빈맥, 의식 저하",
        "림프절 종대와 출혈 경향"
      ],
      a: 1,
      exp: "피부 방사선 증후군(Cutaneous Radiation Syndrome): 피부에 대한 급성 방사선 노출로 발적(reddening), 수포(blistering), 궤양(ulceration) 발생. ARS 없이도 단독 발생 가능(예: 방사선 치료 중). 방사선 화상 부위에만 국한되어 나타난다.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q20",
      q: "방사선 피폭의 손상 정도를 결정하는 3가지 요인은?",
      o: [
        "방사선 종류, 노출 시간, 환자 연령",
        "선량/시간, 선원까지의 거리, 차폐",
        "피폭 면적, 흡수 선량, 전신/국소 여부",
        "방사성 동위원소 종류, 반감기, 체내 분포"
      ],
      a: 1,
      exp: "방사선 손상 결정 3요인: ① 선량/시간(Dose per time) — 얼마나 많은 방사선을 얼마나 빨리 받았는가 ② 선원까지의 거리(Distance from source) — 거리 제곱에 반비례 ③ 차폐(Shielding) — 방사선과 몸 사이의 물질. 이 3요소가 방사선 방호의 핵심 원칙이다.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q21",
      q: "방사선 재난 대응에서 EOC(비상운영센터)의 3가지 역할이 아닌 것은?",
      o: [
        "대중에게 보호 조치 발령",
        "파트너 통지 및 지원 요청",
        "방사선 데이터 통합 및 지도화",
        "직접 현장 제독 실시"
      ],
      a: 3,
      exp: "EOC(Emergency Operations Center) 역할: ① 대중에 보호 조치 발령 ② 파트너 통보 및 지원 요청 ③ 방사선 데이터 통합·지도화. 직접 현장 제독은 EOC가 아닌 현장 대응팀의 역할이다. EOC는 지휘·통제·조정 기능을 담당한다.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q22",
      q: "방사선 피폭 후 집단 모니터링(Population Monitoring)의 6가지 목표 중 해당되지 않는 것은?",
      o: [
        "의료 치료를 위한 의뢰 판단",
        "외부 오염(신체/의복) 확인",
        "방사선 유발 암의 즉각 치료",
        "오염 제거(제독) 실시"
      ],
      a: 2,
      exp: "집단 모니터링 6가지 목표: ① 의료 치료 의뢰 여부 판단 ② 외부 오염 확인 ③ 내부 오염 확인 ④ 제독 실시 ⑤ 받은 방사선량과 건강 위험 평가 ⑥ 장기적 건강 영향 평가. 방사선 유발 암의 '즉각 치료'는 해당하지 않는다(암은 수년~수십 년 후 발생).",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q23",
      q: "방사선 피폭 선량 1000~3500 렘(rem)에서의 주요 표적 장기는?",
      o: [
        "뇌와 척수(CNS)",
        "골수와 혈액계",
        "미세혈관과 위장관",
        "폐와 심장"
      ],
      a: 2,
      exp: "ARS 선량별 표적 장기: 200~1000 rem = 골수/혈액계/위장관(조혈 증후군). 1000~3500 rem = 미세혈관(tiny blood vessels)/위장관(위장 증후군) — 설사, 발열, 전해질 유지. >3500 rem = 뇌/척수(CNS 증후군) — 경련, 떨림. 선량이 높을수록 더 저항성 있는 조직이 영향받는다.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q24",
      q: "방사선 재난에서 '핵 사고 이후 방사성 낙진(fallout)의 방사능 감쇠 법칙'으로 알려진 규칙은?",
      o: ["1-2 규칙(1-2 rule)", "3-5 규칙(3-5 rule)", "7-10 규칙(7-10 rule)", "12-24 규칙(12-24 rule)"],
      a: 2,
      exp: "낙진 감쇠 '7-10 규칙': 폭발 후 시간이 7배 증가할 때마다 방사선 강도가 약 10분의 1로 감소. 예: 100 R/hr에서 시작 시 시간 경과에 따라 급격히 감소. 이것이 '건물 내 12~24시간 대피'가 효과적인 이유다.",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q25",
      q: "방사선 재난 현장에서 '건식 제독(Dry Decontamination)'을 우선 시행하는 경우는?",
      o: [
        "방사선 선량이 100 rem 이상일 때",
        "수원 공급이 지연될 때",
        "액체 방사성 물질에 오염되었을 때",
        "내부 오염이 의심될 때"
      ],
      a: 1,
      exp: "수원 공급이 지연되거나 사용 불가할 때 건식 제독을 즉시 시작한다: 탈의 → 피부/모발의 분말/먼지 제거(부드러운 빗자루 사용). 습성 오염물질은 시간 지연에 따라 제독 효과가 지수적으로 감소하므로 건식 제독으로 먼저 시작하는 것이 중요하다.",
      diff: "normal",
      category: "radiological"
    },
    {
      id: "rad_q26",
      q: "방사선 피폭 선량 600~1000 렘(rem)에서 권장 치료법은?",
      o: [
        "안심(Reassurance)과 관찰",
        "수혈과 혈액계 회복",
        "조혈 사이토카인 + 골수 이식",
        "전해질 유지와 진정제"
      ],
      a: 2,
      exp: "선량별 치료: 25~100 rem = 안심. 100~200 rem = 혈액계 회복. 200~600 rem = 수혈 + 조혈 사이토카인. 600~1000 rem = 조혈 사이토카인 + 골수 이식(불량 예후, 80~90% 사망). 1000~3500 rem = 전해질 유지(사망 결과). >3500 rem = 진정제(100% 사망).",
      diff: "hard",
      category: "radiological"
    },
    {
      id: "rad_q27",
      q: "방사선 재난 트리아지 시스템으로 사용되는 것은?",
      o: [
        "START와 MASS만 사용",
        "START, SMART, 방사선 재난 트리아지(Radiological Disaster Triage)",
        "TST(10초 트리아지)만 사용",
        "SALT와 CSCATTT만 사용"
      ],
      a: 1,
      exp: "방사선 재난 트리아지 시스템: ① START(재조직화된 방사선 버전) ② SMART 트리아지 ③ 방사선 재난 트리아지(Medical Management of Radiological Casualties, 4판, 2013). 방사선 피폭량에 따른 ARS 중증도를 반영한 특수 트리아지 체계가 필요하다.",
      diff: "hard",
      category: "radiological"
    }
  ],

  // ==========================================
  // NUCLEAR (핵재난) — 27 questions
  // ==========================================
  nuclear: [
    {
      id: "nuc_q01",
      q: "핵 폭발의 위력(yield)을 나타내는 기본 단위는?",
      o: [
        "메가와트(Megawatt, MW)",
        "킬로톤(kiloton, kT) TNT 당량",
        "렘(rem) 단위",
        "줄(Joule) 단위"
      ],
      a: 1,
      exp: "핵 폭발의 규모는 TNT 당량으로 표시되며, 주로 킬로톤(kT, 1,000톤 TNT 당량)으로 나타낸다. 1 kT 핵장치 = 1,000톤 TNT 폭발력. FEMA 계획 기준: 10 kT 지표 폭발. 역사적: 히로시마 ~15 kT, 나가사키 ~21 kT.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q02",
      q: "10 kT 핵 폭발을 일으키기 위해 필요한 우라늄 원자의 핵분열 질량은?",
      o: ["1 킬로그램(1 kg)", "약 20 온스(≈0.6 리터)", "100 킬로그램", "1 톤"],
      a: 1,
      exp: "놀라운 사실: 단 20 온스(≈0.6 L)의 우라늄 원자만 핵분열해도 10 kT 폭발이 발생한다. 이는 2020년 베이루트 암모늄 나이트레이트 항구 폭발(~1 kT 당량)의 10배 위력이다. 소량의 핵물질이 가진 파괴력의 규모를 이해하는 것이 중요하다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q03",
      q: "2020년 베이루트 암모늄 나이트레이트 항구 폭발은 몇 킬로톤(kT) 핵 폭발 당량에 해당하는가?",
      o: ["0.01 kT", "약 1 kT", "10 kT", "100 kT"],
      a: 1,
      exp: "2020년 베이루트 폭발은 약 1 kT 핵 폭발 당량의 에너지를 방출했다. FEMA 계획 기준인 10 kT 핵 장치는 이것의 10배 위력이다. 베이루트 폭발은 수천 명이 부상을 입고 건물 수천 채를 파괴한 역사상 큰 비핵 폭발 중 하나였다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q04",
      q: "핵 폭발 후 가장 중요한 보호 행동(최우선 권고사항)은?",
      o: [
        "즉시 차량을 이용해 빠르게 대피한다",
        "외부에 머물며 방호복을 착용한다",
        "건물 안으로 들어가고, 머물고, 정보를 청취한다",
        "높은 건물 옥상으로 올라가 방사선을 피한다"
      ],
      a: 2,
      exp: "핵 폭발 후 최우선 보호 행동: '건물 안으로 들어가라, 머물러라, 정보를 청취하라(Get Inside, Stay Inside, Stay Tuned)'. 지하실이나 크고 밀도 높은 건물 중앙부로 대피. 12~24시간 이상 머무를 것. 즉각 대피보다 건물 내 대피가 낙진 노출 감소에 더 효과적이다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q05",
      q: "핵 폭발 후 건물 내 대피(Shelter-in-Place) 권장 시간은?",
      o: ["1~2시간", "4~6시간", "12~24시간", "72시간"],
      a: 2,
      exp: "'7-10 법칙'에 의해 낙진의 방사능은 시간이 지남에 따라 급격히 감소한다. 건물 내 12~24시간 대피가 낙진 노출을 크게 줄인다. 추가 지침이 제공되지 않는 한 이 기간 동안 내부에 머물 것. 정보 청취 수단: AM/FM 라디오가 최선.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q06",
      q: "핵 폭발 후 정보를 얻는 가장 좋은 수단은?",
      o: ["소셜 미디어", "인터넷 포털 사이트", "AM/FM 라디오", "TV 방송"],
      a: 2,
      exp: "핵 폭발 후 EMP(전자기 펄스)가 전력망을 교란할 수 있다. AM/FM 라디오가 가장 신뢰할 수 있는 정보 수단이다. 그 다음: TV, 휴대전화, 인터넷(사용 가능한 경우). 인터넷과 소셜 미디어는 정전이나 혼란 시 신뢰할 수 없다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q07",
      q: "10 kT 핵 폭발의 '레드 존(Red Zone)'에 해당하는 방사선 선량은?",
      o: [
        "<1 Gy (<100 rad)",
        "1~8 Gy (100~800 rad)",
        ">8 Gy (>800 rad)",
        ">35 Gy (>3500 rad)"
      ],
      a: 2,
      exp: "10 kT 지표 폭발 구역별 방사선량: 레드 존 = >8 Gy(>800 rad) — 치명적. 옐로 존 = 1~8 Gy(100~800 rad) — 상해~치명적. 그린 존 = <1 Gy(<100 rad) — 급성 상해 임계값 이하. 레드 존에서는 생존 가능성이 거의 없다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q08",
      q: "NCRP(국립방사선방호위원회)가 정한 응급 대응자의 핫존 철수 결정 선량(decision dose)은?",
      o: ["0.1 Gy (10 rad)", "0.5 Gy (50 rad)", "1 Gy (100 rad)", "2.5 Gy (250 rad)"],
      a: 1,
      exp: "NCRP 결정 선량: 누적 흡수 선량이 0.5 Gy(50 rad)에 도달하면 응급 대응자를 핫존에서 철수할지 결정해야 한다. 이는 선량 한계가 아닌 결정 포인트다. ALARA 원칙(As Low As Reasonably Achievable) 준수가 기본이다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q09",
      q: "응급 대응자가 '생명 구조 또는 대규모 인구 보호'를 위해 감수할 수 있는 최대 방사선 피폭량(위험 완전 인식 조건)은?",
      o: [
        "50 mSv (5 rem)",
        "100 mSv (10 rem)",
        "250 mSv (25 rem)",
        ">250 mSv (>25 rem)"
      ],
      a: 3,
      exp: "응급 대응자 선량 기준: 모든 직업 노출 = 50 mSv(5 rem). 공공 복지를 위한 재산 보호 = 100 mSv(10 rem). 생명 구조/대규모 인구 보호 = 250 mSv(25 rem). 위험 완전 인식 + 생명 구조/인구 보호 = >250 mSv(>25 rem). NCRP 결정 선량 = 500 mGy(50 rad).",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q10",
      q: "히로시마/나가사키 폭격(1945) 데이터에 따르면 생존자 화상의 83~91%는 어떤 원인이었는가?",
      o: [
        "화염(불꽃) 화상(Flame burns)",
        "섬광 화상(Flash burns) 단독",
        "방사선 화상(Radiation burns)",
        "섬광+화염 복합 화상"
      ],
      a: 1,
      exp: "히로시마/나가사키 화상 데이터(Lebow et al., 1981; 전쟁부, 1945): 섬광 단독(Flash alone) = 83~91%, 섬광+화염 복합 = 6~15%, 화염 단독 = 2~3%. 섬광 화상이 압도적 다수였다. 이는 핵 폭발 후 즉각적인 광복사(thermal radiation)가 얼마나 강력한지를 보여준다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q11",
      q: "RTR(Radiation Triage, Treatment, and Transport) 시스템에서 RTR 사이트(RTR 1~3)의 역할은?",
      o: [
        "최종 치료 시설(병원과 동등한 기능)",
        "사건 발생 시 자발적으로 형성되는 초기 트리아지/치료 거점",
        "집단 대피를 위한 모임 장소",
        "방사선 측정 전담 모니터링 기지"
      ],
      a: 1,
      exp: "RTR 시스템 구성: RTR 사이트(1~3) = 사건 발생 중 자발적으로 형성되는 초기 트리아지/치료 거점. 모임 센터(AC, Assembly Centers) = 집결 지점. 의료 센터(MC, Medical Centers) = 치료 시설. 대피 센터(EC, Evacuation Centers) = 인구 대피. RTR 3 사이트는 위치/인프라에 따라 지정된 AC에 있을 수 있다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q12",
      q: "ALARA 원칙이 의미하는 것은?",
      o: [
        "All Life Actions Require Assessment(모든 생명 활동은 평가가 필요하다)",
        "As Low As Reasonably Achievable(합리적으로 달성 가능한 한 낮게)",
        "Always Limit Any Radiation Activity(항상 모든 방사선 활동을 제한한다)",
        "Assess Losses And Reduce Accordingly(손실을 평가하고 그에 따라 줄인다)"
      ],
      a: 1,
      exp: "ALARA = As Low As Reasonably Achievable(합리적으로 달성 가능한 한 낮게). 방사선 방호의 핵심 원칙으로, 필요한 활동을 수행하면서도 방사선 피폭을 최소화하도록 요구한다. 생명 구조와 대응자 안전 사이의 균형을 위한 지침이다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q13",
      q: "핵 재난에서 '1 R ≈ 1 rad ≈ 1 rem' 근사 등가는 어떤 방사선 유형에서 성립하는가?",
      o: [
        "알파 방사선(Alpha radiation)",
        "베타 방사선(Beta radiation)",
        "공기 중 감마 방사선(Gamma radiation in air)",
        "중성자 방사선(Neutron radiation)"
      ],
      a: 2,
      exp: "1 R ≈ 1 rad ≈ 1 rem: 공기 중 감마 방사선에서 성립하는 단순화 근사. 핵 재난 계획에서 편의상 사용한다(FEMA 2023). 이 근사는 다른 방사선 유형이나 조직에는 적용되지 않는다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q14",
      q: "핵 폭발의 전자기 펄스(EMP, Electromagnetic Pulse)가 미치는 주요 영향은?",
      o: [
        "방사선 피폭 범위 확대",
        "전력망과 인프라 교란",
        "대기 중 방사성 낙진 확산",
        "화학 오염 물질 생성"
      ],
      a: 1,
      exp: "핵 폭발의 EMP(전자기 펄스, Source Region EMP = SREMP): 전력망을 교란하여 대규모 인프라 피해를 초래한다. 전자 기기, 통신 시스템, 의료 장비에 영향. 핵 폭발 후 AM/FM 라디오가 주요 정보 수단인 이유이기도 하다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q15",
      q: "핵 폭발의 수소폭탄(H-bomb)과 원자폭탄(A-bomb)의 핵심 차이는?",
      o: [
        "H-bomb은 핵분열, A-bomb은 핵융합을 이용한다",
        "A-bomb은 핵분열, H-bomb은 핵융합(핵분열 촉발) 반응을 이용한다",
        "두 폭탄은 같은 원리로 작동한다",
        "H-bomb은 화학 반응, A-bomb은 핵 반응이다"
      ],
      a: 1,
      exp: "원자폭탄(A-bomb, 히로시마/나가사키형) = 핵분열(fission) 반응(우라늄 또는 플루토늄). 수소폭탄(H-bomb/열핵폭탄) = 핵분열로 핵융합(fusion)을 촉발하는 2단계 반응. H-bomb은 A-bomb보다 수십~수천 배 강력하다. FEMA 계획 기준은 10 kT(A-bomb 수준) 지표 폭발이다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q16",
      q: "핵 폭발 후 인구 모니터링(Population Monitoring)의 6가지 목표 중 마지막 목표는?",
      o: [
        "의료 치료 의뢰 필요 여부 판단",
        "외부 오염 확인",
        "제독 실시",
        "장기적 건강 영향 평가"
      ],
      a: 3,
      exp: "인구 모니터링 6목표 순서: ① 의료 치료 의뢰 필요 판단 ② 외부 오염 확인 ③ 내부 오염 확인 ④ 제독 실시 ⑤ 선량과 건강 위험 평가 ⑥ 장기적 건강 영향 평가. 마지막 목표가 장기 추적 관찰임을 기억.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q17",
      q: "핵 폭발 10 kT 지표 폭발에서 FEMA가 계획 지침으로 정의한 대응 구역의 수는?",
      o: ["3개 구역", "4개 구역", "5개 구역", "6개 구역"],
      a: 2,
      exp: "FEMA 2023 핵 폭발 대응 계획: 폭발 지점에서의 거리에 따라 5개의 서로 다른 구역(Planning Guidance Zones)을 정의하며, 각 구역별로 다른 대응 활동과 보호 조치가 적용된다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q18",
      q: "히로시마 핵폭탄의 폭발력(yield)은 대략 몇 킬로톤(kT)이었는가?",
      o: ["5 kT", "15 kT", "50 kT", "100 kT"],
      a: 1,
      exp: "역사적 핵폭발: 히로시마 = ~15 kT, 나가사키 = ~21 kT. FEMA 계획 기준 = 10 kT 지표 폭발(히로시마보다 약간 작음). 두 도시 합산 수십만 명 사망. 현대 핵무기는 이보다 수십~수천 배 강력하다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q19",
      q: "핵 재난 '옐로 존(Yellow Zone)'에 해당하는 방사선 선량 범위는?",
      o: [
        "<1 Gy (<100 rad)",
        "1~8 Gy (100~800 rad)",
        "8~35 Gy (800~3500 rad)",
        ">35 Gy (>3500 rad)"
      ],
      a: 1,
      exp: "10 kT 폭발 구역: 그린 존 = <1 Gy(<100 rad) — 급성 상해 임계값 이하. 옐로 존 = 1~8 Gy(100~800 rad) — 상해에서 치명적 범위. 레드 존 = >8 Gy(>800 rad) — 치명적. 옐로 존은 ARS 조혈 및 위장 증후군 범위와 겹친다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q20",
      q: "핵 폭발 후 구조 활동 시 응급 대응자가 '공공 복지를 위한 재산 보호' 목적으로 허용되는 최대 방사선 피폭량은?",
      o: ["50 mSv (5 rem)", "100 mSv (10 rem)", "250 mSv (25 rem)", ">250 mSv (>25 rem)"],
      a: 1,
      exp: "방사선 피폭 허용 기준(응급 대응자): 모든 직업 노출 → 50 mSv(5 rem). 공공 복지 재산 보호 → 100 mSv(10 rem, 50 mSv 초과 불가피 + 모니터링 가능 조건). 생명 구조/대규모 인구 보호 → 250 mSv(25 rem). 완전 위험 인식 + 생명 구조 → >250 mSv.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q21",
      q: "핵폭탄 폭발 시 가장 먼저 하는 생존 행동은?",
      o: [
        "가까운 차량으로 즉시 이동하여 빠르게 탈출한다",
        "폭발 지점 반대 방향으로 달려 거리를 최대한 벌린다",
        "즉시 엎드려 섬광/충격파를 피하고, 이후 건물 내 대피한다",
        "높은 곳으로 올라가 낙진을 피한다"
      ],
      a: 2,
      exp: "핵 폭발 즉각 생존 행동: 폭발 직후 즉시 엎드려 섬광과 충격파를 피한다 → 이후 Get Inside(건물, 특히 지하실 또는 크고 밀도 높은 건물 중앙) → Stay Inside(12~24시간) → Stay Tuned(AM/FM 라디오). 즉각 대피는 낙진이 낙하하기 전에 시작해야 효과적이지만, 건물 내 대피가 더 현실적.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q22",
      q: "응급 대응자 핫존 철수 기준인 NCRP 결정 선량은 무엇인가?",
      o: [
        "선량 한계(dose limit)이며 이 선량이 되면 무조건 철수해야 한다",
        "결정 포인트이며, 이 선량에서 철수 여부를 결정한다",
        "권고 최대 허용 선량으로 절대 초과 불가하다",
        "법적 구속력이 있는 규제 한도다"
      ],
      a: 1,
      exp: "중요: 0.5 Gy(50 rad) = NCRP 결정 선량(decision dose), 선량 한계(dose limit)가 아니다. 이 선량 도달 시 응급 대응자를 핫존에서 철수할지 결정해야 하는 포인트다. 생명 구조 상황이라면 위험 완전 인식 하에 초과 가능하다(ALARA 원칙 적용).",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q23",
      q: "핵 폭발 후 낙진 방사능이 시간 경과에 따라 감쇠하는 '7-10 법칙'의 의미는?",
      o: [
        "7시간 후 방사능이 10%로 감소한다",
        "시간이 7배 증가할 때마다 방사선 강도가 약 1/10로 감소한다",
        "10시간 후 방사능이 7%로 감소한다",
        "7일 후 방사능이 10분의 1로 감소한다"
      ],
      a: 1,
      exp: "낙진 감쇠 '7-10 법칙': 시간이 7배 증가할 때마다 방사선 강도가 약 10분의 1로 감소. 예: 100 R/hr에서 7배 시간 후 10 R/hr. 이 법칙이 '건물 내 12~24시간 대피'가 가장 중요한 보호 행동인 근거다. 낙진은 수일 내 급격히 감소하므로 초기 대피가 핵심이다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q24",
      q: "RTR 시스템의 4가지 구성 요소를 모두 포함하는 것은?",
      o: [
        "RTR 사이트, 분류 센터, 병원, 응급 대응 기지",
        "RTR 사이트(1~3), 모임 센터(AC), 의료 센터(MC), 대피 센터(EC)",
        "핫존, 웜존, 콜드존, 병원",
        "현장 처치소, 이송 구역, 수술실, 중환자실"
      ],
      a: 1,
      exp: "RTR 시스템 4요소: ① RTR 사이트(1~3) — 자발 형성 초기 트리아지/치료 거점 ② AC(Assembly Centers, 모임 센터) ③ MC(Medical Centers, 의료 센터) ④ EC(Evacuation Centers, 대피 센터). RTR 3 사이트는 위치에 따라 지정 AC에 있을 수 있다.",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q25",
      q: "핵 재난 발생 시 대중이 정보를 얻기 위해 가장 안정적인 수단과 그 이유는?",
      o: [
        "TV — 시각 정보 제공이 가능하기 때문",
        "인터넷 — 실시간 업데이트가 가능하기 때문",
        "AM/FM 라디오 — EMP 피해 최소화 가능성이 높고 단순 수신기만 필요하기 때문",
        "소셜 미디어 — 빠른 정보 전파가 가능하기 때문"
      ],
      a: 2,
      exp: "AM/FM 라디오가 핵 재난 시 최선의 정보 수단인 이유: 핵 EMP가 전력망을 교란해도 단순 라디오 수신기는 영향이 적다. TV, 인터넷, 소셜 미디어는 전력 또는 네트워크 의존적. 라디오 다음 순위: TV → 휴대전화 → 인터넷(사용 가능한 경우).",
      diff: "normal",
      category: "nuclear"
    },
    {
      id: "nuc_q26",
      q: "핵 재난 시 대피소 대피(Shelter-in-Place)가 즉각 대피(Evacuation)보다 더 효과적인 상황은?",
      o: [
        "핵 폭발 후 72시간이 경과한 시점",
        "대피 경로가 완전히 확보된 경우",
        "핵 폭발 직후 특히 첫 수 시간 동안",
        "낙진 방향이 확인된 이후"
      ],
      a: 2,
      exp: "핵 폭발 직후 첫 수 시간 동안은 건물 내 대피가 더 효과적이다. 이유: ① 즉각 대피는 낙진 피해 증가 위험 ② 대피 경로 혼잡/차단 가능성 ③ 건물 자체가 방사선 차폐 효과 제공. 시간이 지나 낙진 감쇠 후 안전 대피 가능성이 높아지면 대피를 고려한다.",
      diff: "hard",
      category: "nuclear"
    },
    {
      id: "nuc_q27",
      q: "나가사키 핵폭탄의 폭발력(yield)은 대략 몇 킬로톤(kT)이었는가?",
      o: ["10 kT", "15 kT", "21 kT", "50 kT"],
      a: 2,
      exp: "역사적 핵폭발: 히로시마 = ~15 kT(리틀 보이), 나가사키 = ~21 kT(팻 맨). FEMA 계획 기준 10 kT는 히로시마보다 약간 작다. 두 폭발 모두 즉각적으로 수만 명을 죽이고, 방사선 후유증으로 수십만 명이 사망했다.",
      diff: "normal",
      category: "nuclear"
    }
  ],

  // ==========================================
  // EXPLOSIVE / CTM (폭발물/대테러의학) — 28 questions
  // ==========================================
  explosive: [
    {
      id: "exp_q01",
      q: "폭발 손상의 5가지 기전 중 '1차 폭발 손상(Primary Blast Injury)'이 주로 영향을 미치는 장기는?",
      o: [
        "뼈와 관절(Bones and Joints)",
        "공기 충전 기관(폐, 귀, 위장관)",
        "피부와 연부 조직",
        "뇌와 척수"
      ],
      a: 1,
      exp: "폭발 손상 5기전: ① 1차(Primary) — 폭발파(압력파) → 공기 충전 기관(폐='폭발 폐', 귀, 위장관) ② 2차(Secondary) — 파편/파쇄물 관통 외상 → 가장 흔한 손상 ③ 3차(Tertiary) — 가속/감속(날아가 부딪힘) → 둔기 외상 ④ 4차(Quaternary) — 화상(열적) ⑤ 5차(Quinary) — 독성 염증(화학/생물/방사선 오염).",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q02",
      q: "폭발 손상의 5기전 중 가장 흔한 손상 원인은?",
      o: ["1차(폭발파)", "2차(파편/파쇄물)", "3차(가속/감속)", "4차(화상)"],
      a: 1,
      exp: "2차 폭발 손상(Secondary Blast Injury) = 파편, 파쇄물에 의한 관통 외상 → 가장 흔한 손상 원인. 폭발물에 못, 볼트, 금속 조각 등 살상력 강화 추가물이 포함되는 경우가 많다. ATLS 기준에 따른 치료가 필요하다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q03",
      q: "2015년 파리 테러 공격에서 가장 많은 사망자가 발생한 장소는?",
      o: ["스타드 드 프랑스(Stade de France)", "라 카사 노스트라(La Casa Nostra)", "바타클랑 콘서트홀(Bataclan Concert Hall)", "카페 콩투아르 볼테르(Café Comptoir Voltaire)"],
      a: 2,
      exp: "2015년 11월 13일 파리 테러: 바타클랑 콘서트홀에서 3명의 괴한이 인질극을 2시간 진행한 후 경찰이 12시 20분에 돌입했고, 공격자들이 자폭하여 최소 89명 사망. 총 사망자 130명+. 《The Lancet 2017》: 군·민간 의료 협력, 소아 외상 관리, 기관 간 조정이 핵심 교훈.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q04",
      q: "2016년 니스 트럭 공격(Bastille Day)에서 사용된 무기 유형은?",
      o: [
        "폭탄 테러(IED)",
        "소총 총기 공격",
        "차량(트럭) 돌진 공격",
        "화학무기 공격"
      ],
      a: 2,
      exp: "2016년 7월 14일(바스티유 데이), 니스 프로므나드 데 장글레에서 트럭이 군중 속으로 돌진. 22:30 진입, 22:35 경찰에 의해 팔레 드 라 메디테라네에서 저지. 차량(비폭발물) 공격: 1970~2020년 GTD 데이터에서 사건 건수는 127건(0.07%)이지만 사건당 평균 176.44명 부상 — 가장 높은 사건당 부상자 수.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q05",
      q: "1970~2020년 전 세계 테러 데이터(GTD)에서 사건 건수로 가장 많이 사용된 무기 유형은?",
      o: ["소화기(Firearms)", "폭발물(Explosives)", "차량(Vehicle)", "화학무기(Chemical)"],
      a: 1,
      exp: "GTD 1970~2020 통계: 폭발물 = 90,003건(51.43%) — 가장 많은 사건. 소화기 = 52,406건(29.95%). 총 174,995건, 354,382명 사망, 511,319명 부상. 반면 사건당 부상자 수는 차량(비폭발물) = 176.44명으로 가장 높음.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q06",
      q: "TECC(전술 응급 사상자 치료)의 3가지 치료 구역은?",
      o: [
        "핫존, 웜존, 콜드존",
        "직접 위협 치료(핫), 간접 위협 치료(웜), 대피 치료",
        "현장, 이송 중, 병원 전 단계",
        "1차 반응, 2차 반응, 3차 반응"
      ],
      a: 1,
      exp: "TECC 3구역: ① 직접 위협 치료(Direct Threat Care, 핫존) — 즉각 위협 하에서의 치료 ② 간접 위협 치료(Indirect Threat Care, 웜존) — S-C-ABE 시행(Safety, Circulation, Airway, Breathing, Environment) ③ 대피 치료(Evacuation Care) — 이송 중 치료. TCCC는 군사 원칙을 도시 환경에 적용.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q07",
      q: "TECC 간접 위협 치료(Indirect Threat Care)에서 S-C-ABE 프로토콜의 'C'는 무엇을 의미하는가?",
      o: ["Command(지휘)", "Circulation/대량출혈 조절(Hemorrhage control)", "Contamination(오염 확인)", "Communication(통신)"],
      a: 1,
      exp: "S-C-ABE: S(Safety, 안전), C(Circulation/출혈 조절, 대량 출혈 조절), A(Airway, 기도), B(Breathing, 호흡), E(Environment/Evacuation, 환경/대피). MARCH 또는 M-A-R-C-H 프로토콜과 유사하다. 간접 위협 구역에서 먼저 출혈 조절 후 기도·호흡 순서로 진행.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q08",
      q: "CSCATTT에서 '3T'가 의미하는 것은?",
      o: [
        "Training, Technology, Teamwork",
        "Triage, Treatment, Transportation",
        "Threat, Target, Tactics",
        "Trauma, Triage, Transfer"
      ],
      a: 1,
      exp: "MIMMS(영국 MCI 프레임워크) CSCATTT: Command(지휘), Safety(안전), Communication(통신), Assessment(평가), Triage(분류), Treatment(치료), Transportation(이송). 마지막 3T = Triage-Treatment-Transportation. 이는 실제 의료 대응의 핵심 3단계다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q09",
      q: "CTM(대테러의학)의 정의는?",
      o: [
        "화학무기 테러에만 대응하는 의학 분야",
        "테러 공격에 대응하는 의학 분야",
        "폭발물 제거 후 의료 지원",
        "테러 피해자 재활 전문 의학"
      ],
      a: 1,
      exp: "CTM(Counter-Terrorism Medicine, 대테러의학) = 테러 공격을 다루는 의학 분야. 구성 요소: 목표 강화, 전술 EMS, MCI/ICS, 손상 기전 패턴, 외상학, CBRNE, 심리 회복, 지역 재활, 상호운용성, HVA(위험 취약성 분석), 의료 시설 표적화 대응. EMS 자체가 테러 표적이 되는 현실 반영.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q10",
      q: "THREAT 프로토콜에서 'H'가 의미하는 것은?",
      o: [
        "Hazard identification(위험 확인)",
        "Hemorrhage control(출혈 조절)",
        "Hospital notification(병원 통보)",
        "Hypothermia prevention(저체온증 예방)"
      ],
      a: 1,
      exp: "THREAT 프로토콜: T(Threat suppression, 위협 제압), H(Hemorrhage control, 출혈 조절), R(Rapid extrication, 신속 구출), E(Assessment, 평가), A(Transport, 이송). 테러 현장에서의 우선순위: 위협 제압 → 출혈 조절 → 구출 → 평가 → 이송. 출처: Alpert EA, Grossman SA. EMS Terrorism Response. StatPearls 2023.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q11",
      q: "3 Echo 프로토콜의 3가지 단계는?",
      o: [
        "Evaluate, Execute, Evacuate",
        "Enter, Evaluate, Evacuate",
        "Engage, Establish, Exit",
        "Examine, Estimate, Extract"
      ],
      a: 1,
      exp: "3 Echo 프로토콜: Enter(진입), Evaluate(평가), Evacuate(대피). 간단한 세 단계로 구성된 현장 대응 프로토콜. THREAT 프로토콜과 함께 테러 현장에서의 초기 대응 표준화를 위해 사용된다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q12",
      q: "TST(Ten Second Triage, 10초 트리아지)에서 '걸을 수 있는 환자'는 어떤 우선순위로 분류되는가?",
      o: ["P1(즉시)", "P2(지연)", "P3(최소/경상)", "Not Breathing(사망)"],
      a: 2,
      exp: "TST(NHS UK 10초 트리아지) 알고리즘: ① 걷기 가능? → Yes = P3(최소/경상). ② 걷기 불가 + 심각한 출혈? → Yes = 압박/지혈대/패킹 → P1. ③ 걷기 불가 + 출혈 없음 + 말함 + 관통 손상(앞/뒤) → P1. ④ 말함 + 관통 없음 → P2. ⑤ 말 못함 + 호흡 있음 → P1(기도 개방). ⑥ 말 못함 + 호흡 없음 → Not Breathing.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q13",
      q: "화학무기(Chemical weapon)의 테러 사건당 평균 부상자 수는?",
      o: ["5명", "20명", "45명", "176명"],
      a: 2,
      exp: "GTD 1970~2020 무기별 분석: 화학무기 사건 수 = 295건(0.17%), 부상자 = 13,275명, 사건당 평균 부상자 = 45명. 폭발물 = 4.23명/사건. 차량(비폭발물) = 176.44명/사건(최고). 화학무기는 사건당 부상자가 폭발물의 10배 이상이다.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q14",
      q: "TEMS(Tactical Emergency Medical Support)에서 SWAT 부대와 함께 하는 의료 인력의 명칭은?",
      o: [
        "Emergency Medical Technician(EMT)",
        "Tactical Medical Provider(TMP)",
        "Combat Medic",
        "Trauma Surgeon"
      ],
      a: 1,
      exp: "TEMS = 적대적 환경에서 의료·전술 대응 통합. SWAT 훈련 및 배치 중 병원 전 응급의료 제공. SWAT 부대와 함께하는 인원 = TMP(Tactical Medical Providers, 전술 의료 제공자). 참고: Campbell et al. Tactical Medicine Essentials.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q15",
      q: "테러 현장에서 '2차 공격(Secondary Attack, double-tap)'이란 무엇인가?",
      o: [
        "같은 건물 내 두 번째 폭탄",
        "최초 공격 후 도착한 대응자(경찰/EMS)를 표적으로 하는 공격",
        "이틀 후 같은 장소에서 발생하는 추가 공격",
        "두 개의 다른 지점에서 동시 발생한 공격"
      ],
      a: 1,
      exp: "2차 공격(Secondary Attack, 'double-tap'): 최초 공격 후 현장에 도착한 대응자(구급대원, 경찰, 소방관 등)를 표적으로 하는 추가 공격. EMS가 '소프트 타겟'으로 표적화되는 증가 추세. 대응자 안전이 최우선 — 현장이 안전하다고 확인되기 전까지 접근 금지.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q16",
      q: "파리 테러(2015)의 The Lancet 2017 보고서가 제시한 주요 교훈이 아닌 것은?",
      o: [
        "의료 준비성과 적응",
        "군·민간 의료 서비스 협력",
        "소아 외상 관리",
        "핵 폭발 후 피폭 관리 프로토콜"
      ],
      a: 3,
      exp: "파리/니스 사건 The Lancet 2017 주요 교훈: ① 의료 준비성 및 적응 ② 군·민간 의료 협력 ③ 소아 외상 관리 ④ 기관 간 조정 ⑤ 병원 전 손상 조절(Damage Control). 핵 피폭 관리는 폭발물 테러 맥락과 무관하다.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q17",
      q: "1970~2020년 전 세계 테러에서 총 사망자 수는?",
      o: ["54,382명", "154,382명", "354,382명", "554,382명"],
      a: 2,
      exp: "GTD 1970~2020 전체 통계: 총 사건 수 174,995건, 총 사망자 354,382명, 총 부상자 511,319명, 전체 평균 사건당 부상자 21.53명. 9/11 테러 포함 수치다.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q18",
      q: "폭발 후 귀 청력 손실, 고막 천공, 외부 상처 없는 호흡 곤란 환자는 어떤 폭발 손상인가?",
      o: [
        "2차 폭발 손상(파편에 의한 관통 외상)",
        "1차 폭발 손상(압력파에 의한 기관 손상)",
        "3차 폭발 손상(날아가 부딪힘)",
        "4차 폭발 손상(화상)"
      ],
      a: 1,
      exp: "1차 폭발 손상(Primary Blast Injury): 폭발파(압력파)가 공기 충전 기관에 손상. '폭발 폐(Blast lung)'= 폐 손상 + 호흡 곤란, 고막 천공, 위장관 손상. 외부 상처 없이 나타날 수 있다. 치료 딜레마: 폭발 폐 손상 vs 파열된 폐(관리가 다름).",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q19",
      q: "폭발 사고 후 20미터 날아간 환자는 어떤 기전의 폭발 손상인가?",
      o: ["1차(압력파)", "2차(파편)", "3차(가속/감속)", "4차(화상)"],
      a: 2,
      exp: "3차 폭발 손상(Tertiary Blast Injury): 폭발로 인한 가속/감속 — 신체가 날아가 부딪히는 둔기 외상. 두개골 골절, 척추 손상, 내부 장기 손상 등 유발. 폭발 현장 외 지역에서도 관찰될 수 있다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q20",
      q: "폭발물 테러 현장에서 병원 대응 프로토콜의 표준은?",
      o: [
        "ACLS(Advanced Cardiac Life Support)",
        "ATLS(Advanced Trauma Life Support)",
        "CSCATTT(MIMMS 프레임워크)",
        "TECC(Tactical Emergency Casualty Care)"
      ],
      a: 1,
      exp: "폭발물 테러로 인한 손상의 병원 치료 표준: ATLS(Advanced Trauma Life Support) 기반의 체계적 외상 치료. ATLS는 주요 외상 처치의 국제 표준이다. CSCATTT는 현장 지휘 체계, TECC는 전술 현장 치료다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q21",
      q: "CTM(대테러의학) 취홈 메시지에서 '선도적 역할'을 하는 것은?",
      o: [
        "법 집행 기관(경찰)",
        "군(Military)",
        "대테러의학(CTM) 자체",
        "공중보건 기관"
      ],
      a: 2,
      exp: "CTM 6가지 취홈 메시지: ① 강력한 거버넌스 ② 군·민간 협력 ③ 통합 지휘·통제 ④ 준비성 및 전문 훈련 ⑤ 대응자 안전 확보 ⑥ CTM이 선도적 역할 수행. CTM은 단순히 의료 지원이 아닌 테러 대응의 핵심 조정 역할을 한다.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q22",
      q: "생물 무기 공격은 1970~2020년 GTD에서 사건당 평균 몇 명의 부상자를 발생시켰는가?",
      o: ["0명", "약 26명", "45명", "176명"],
      a: 1,
      exp: "GTD 생물 무기: 31건(0.02%), 사망 9명, 부상 805명, 사건당 평균 25.97명 부상. 화학무기는 45명/사건. 폭발물은 4.23명/사건. 생물 무기는 건수는 매우 적지만 발생 시 상당한 부상자를 낸다.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q23",
      q: "TCCC(Tactical Casualty Care)는 어떤 환경의 원칙을 도시 환경에 적용한 것인가?",
      o: ["응급의학 원칙", "군사 원칙", "해상 구조 원칙", "항공 의학 원칙"],
      a: 1,
      exp: "TCCC(Tactical Casualty Care, 전술 사상자 치료) = 군사 원칙을 도시 환경에 적용. TECC(Tactical Emergency Casualty Care)는 민간/EMS 버전. 우크라이나 전쟁 사례(TCCC Ukraine)가 최근 주요 참고 사례. TEMS는 SWAT와 의료의 통합.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q24",
      q: "Stop the Bleed 프로그램이 다루는 손상 유형을 모두 포함하는 것은?",
      o: [
        "폭발 손상, 방사선 손상, 화학 손상",
        "칼 손상, 총상, 폭발 손상, 압좌 손상, 관통 손상",
        "두부 손상, 흉부 손상, 복부 손상",
        "화상, 익수, 고소 손상"
      ],
      a: 1,
      exp: "Stop the Bleed 프로그램 손상 유형: ① 칼 손상(Knife injury) ② 총상(Gunshot injury) ③ 폭발 손상(Blast injury) ④ 압좌 손상(Crushing injury) ⑤ 관통 손상(Penetrating injury). 출혈 조절이 가능한 외부 손상 전반을 다루는 공공 훈련 프로그램.",
      diff: "hard",
      category: "explosive"
    },
    {
      id: "exp_q25",
      q: "파리 바타클랑 콘서트홀에서 테러리스트들이 인질극을 벌인 시간은 얼마인가?",
      o: ["30분", "1시간", "2시간", "4시간"],
      a: 2,
      exp: "바타클랑(Bataclan Concert Hall) 인질극: 3명의 괴한이 9시 40분 진입 → 약 2시간 인질극 → 경찰이 12시 20분에 돌입 → 공격자들 자폭으로 종료 → 최소 89명 사망. 파리 테러 중 가장 많은 희생자가 발생한 장소였다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q26",
      q: "폭발물 테러 피해자의 임상 특성으로 옳은 것은?",
      o: [
        "고령 환자가 많고, 단순 외상이 주를 이룬다",
        "젊은 피해자, 복합적 중증 손상, 혈역학적 불안정, 낮은 GCS",
        "경상이 대부분이며 ICU 치료가 거의 불필요하다",
        "흉부 손상이 없고 사지 골절이 주된 손상이다"
      ],
      a: 1,
      exp: "테러 폭발 피해자 임상 특성: 젊은 피해자, 심각하고 복합적인 손상, 혈역학적 불안정, 낮은 Glasgow Coma Score(GCS), ICU 및 외과적 중재 증가, 다차원적 손상 패턴 — 외상외과의 감독 필요. 일반 폭발 사고와 달리 더 심각하고 복잡하다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q27",
      q: "테러리스트가 구급차를 활용하는 방법으로 옳지 않은 것은?",
      o: [
        "차량 탑재 급조폭발물장치(VBIED)로 사용",
        "무기, 폭발물, 전투원, 테러리스트 이송 수단",
        "환자를 안전하게 후송하기 위한 본래 목적",
        "EMS를 '소프트 타겟'으로 표적화"
      ],
      a: 2,
      exp: "테러리스트의 구급차 악용: ① VBIED(차량 탑재 폭발물) ② 무기/폭발물/전투원/테러리스트 이송 ③ EMS를 소프트 타겟(soft target)으로 공격. '본래 목적(환자 후송)'은 악용 방법이 아니다. CTM은 이러한 새로운 위협에 대응하는 전문 분야다.",
      diff: "normal",
      category: "explosive"
    },
    {
      id: "exp_q28",
      q: "GTD(1970~2020) 데이터에서 방사선 무기(Radiological)로 인한 사건의 사망자 수는?",
      o: ["0명", "9명", "100명", "596명"],
      a: 1,
      exp: "GTD 방사선 무기(1970~2020): 12건(0.01%), 사망 9명, 부상 0명. 비교: 화학 = 596명 사망, 생물 = 9명 사망, 방사선 = 9명 사망. 방사선 공격 사건 수는 가장 적고, 부상자 없음(직접 사망만). 낮은 발생 빈도를 확률과 가능성을 혼동하지 말 것.",
      diff: "hard",
      category: "explosive"
    }
  ]

}; // end CBRNE_QUIZ_QUESTIONS

// ============================================
// SECTION 2: BOSS BATTLES
// ============================================

const CBRNE_BOSS_BATTLES = [
  {
    id: "boss_chemical",
    name: "신경작용제 대마왕 사린",
    nameEn: "Sarin the Nerve Agent Overlord",
    emoji: "☠️",
    hp: 500,
    maxHp: 500,
    category: "chemical",
    phases: [
      {
        name: "Phase 1: 독성증후군 식별",
        description: "사린이 자신의 정체를 숨긴다! DUMBELS 증후군을 식별하고 위협을 드러내라!",
        questionIds: ["chem_q03", "chem_q04", "chem_q06", "chem_q25"],
        hpThreshold: 0.75,
        attackMessage: "사린이 지하철에 살포됐다! 동공이 축소되고 타액이 흘러내린다! 독성증후군을 즉각 식별하라!",
        damageIfWrong: 40
      },
      {
        name: "Phase 2: 긴급 제독",
        description: "오염이 확산된다! PRISM 프로토콜로 즉각 제독하라!",
        questionIds: ["chem_q08", "chem_q09", "chem_q10", "chem_q22"],
        hpThreshold: 0.50,
        attackMessage: "오염이 웜존까지 퍼졌다! 제독 지연으로 피해자가 늘고 있다! PRISM을 당장 시행하라!",
        damageIfWrong: 50
      },
      {
        name: "Phase 3: 해독제 삼중 투여",
        description: "해독제의 시간! Atropine + 2-PAM + Diazepam을 정확히 투여하라!",
        questionIds: ["chem_q05", "chem_q12", "chem_q16", "chem_q23"],
        hpThreshold: 0.25,
        attackMessage: "경련이 시작됐다! 횡격막이 수축된다! 해독제 3종을 올바른 순서와 용량으로 투여하라!",
        damageIfWrong: 60
      },
      {
        name: "Phase 4: 화학 생존 체인 최종 결전",
        description: "화학 생존 체인 4고리를 완벽히 실행하라! 사린을 영원히 제압하라!",
        questionIds: ["chem_q01", "chem_q07", "chem_q13", "chem_q17"],
        hpThreshold: 0.0,
        attackMessage: "사린의 최후 공세! 전체 시스템이 무너지려 한다! 화학 생존 체인 전체를 완벽히 실행하라!",
        damageIfWrong: 70
      }
    ],
    description: "1995년 3월 20일, 도쿄 지하철 5개 노선에서 동시에 사린이 살포됐다. 13명 사망, 수천 명 부상. 옴진리교라는 광신 집단이 저지른 일본 최악의 테러였다. 2017년에는 북한 김정남 암살에 VX가 사용됐다. 신경작용제는 AChE를 억제하여 ACh를 축적시키고, 횡격막을 영구 수축시켜 질식사에 이르게 한다. 화학 생존 체인(PPE → 제독 → 해독제 → BLS)만이 이 대마왕을 쓰러뜨릴 수 있다!",
    loreQuote: "\"병원들은 사건 정보를 TV 뉴스로 얻어야 했다.\" — FEMA, 1995년 도쿄 교훈",
    reward: {
      xp: 5000,
      coins: 2000,
      title: "화학재난 대응 전문가",
      titleEn: "Chemical Disaster Response Expert",
      badge: "💊",
      unlockedContent: ["chem_scenario_advanced", "chem_skill_master"]
    },
    weaknesses: ["atropine", "pralidoxime", "decontamination", "PPE"],
    bgColor: "#0d1a00",
    accentColor: "#39ff14",
    bossArt: "☠️🧪🌫️",
    soundtrack: "tense_chemical"
  },

  {
    id: "boss_biological",
    name: "탄저 포자 악령 앤트락스",
    nameEn: "Anthrax the Spore Demon",
    emoji: "🦠",
    hp: 500,
    maxHp: 500,
    category: "biological",
    phases: [
      {
        name: "Phase 1: 병원체 식별과 분류",
        description: "앤트락스가 변신한다! CDC A/B/C 분류 체계로 위협을 정확히 식별하라!",
        questionIds: ["bio_q02", "bio_q03", "bio_q18", "bio_q28"],
        hpThreshold: 0.75,
        attackMessage: "흰색 분말이 든 봉투가 발견됐다! 2001 Amerithrax가 재현되는가?! 병원체를 즉각 분류하라!",
        damageIfWrong: 40
      },
      {
        name: "Phase 2: 격리와 역학 조사",
        description: "앤트락스가 확산된다! 전파 경로를 차단하고 POD를 가동하라!",
        questionIds: ["bio_q01", "bio_q17", "bio_q23", "bio_q27"],
        hpThreshold: 0.50,
        attackMessage: "더 많은 감염자가 응급실에 들이닥친다! 격리와 역학 조사가 시작됐다! POD 시스템을 가동하라!",
        damageIfWrong: 50
      },
      {
        name: "Phase 3: 항생제 치료와 예방",
        description: "60일간의 항생제 전쟁! 적절한 약물과 투여 기간을 결정하라!",
        questionIds: ["bio_q09", "bio_q14", "bio_q24", "bio_q30"],
        hpThreshold: 0.25,
        attackMessage: "흡입형 탄저! 가장 치명적인 형태다! Cipro와 Doxy의 정확한 용량과 기간으로 반격하라!",
        damageIfWrong: 60
      },
      {
        name: "Phase 4: 생물테러 총력 대응",
        description: "앤트락스 최후의 포자 공세! 생물 재난 대응의 모든 지식을 총동원하라!",
        questionIds: ["bio_q06", "bio_q07", "bio_q08", "bio_q22"],
        hpThreshold: 0.0,
        attackMessage: "보툴리눔, 페스트, 천연두까지 동원한 최후 공세! CBRNE 생물 파트 모든 지식으로 최종 결전!",
        damageIfWrong: 70
      }
    ],
    description: "2001년 9월 18일, 탄저균이 든 편지가 미국 전역으로 발송됐다. 5명 사망, 22명 감염, 피해 비용 10억 달러. Amerithrax라 불린 이 사건은 생물테러의 현실을 세계에 보여줬다. 포자는 수십 년간 토양에서 생존한다. 보툴리눔 1그램은 150만 명을 죽일 수 있다. 천연두 바이러스에 대한 면역이 사라진 지 40년이 됐다. 생물테러는 저확률 고충격 사건이다 — 확률과 가능성을 혼동하지 말라!",
    loreQuote: "\"생물테러 피해자는 응급의료센터(ED)에서 가장 먼저 접촉하게 된다. 즉시 격리하고 임상적으로 치료하라.\" — CIREcourse",
    reward: {
      xp: 5000,
      coins: 2000,
      title: "생물재난 대응 전문가",
      titleEn: "Biological Disaster Response Expert",
      badge: "🧫",
      unlockedContent: ["bio_scenario_advanced", "bio_skill_master"]
    },
    weaknesses: ["ciprofloxacin", "doxycycline", "isolation", "POD"],
    bgColor: "#1a0a00",
    accentColor: "#ff6600",
    bossArt: "🦠📮☣️",
    soundtrack: "tense_biological"
  },

  {
    id: "boss_radiological",
    name: "방사선 오염마 더티밤",
    nameEn: "Dirty Bomb the Radiation Contaminator",
    emoji: "☢️",
    hp: 500,
    maxHp: 500,
    category: "radiological",
    phases: [
      {
        name: "Phase 1: 방사선 인식과 구역 설정",
        description: "더티밤이 폭발했다! 0~10분 골든타임 — 방사선 구역을 즉시 설정하라!",
        questionIds: ["rad_q01", "rad_q09", "rad_q10", "rad_q17"],
        hpThreshold: 0.75,
        attackMessage: "도심에서 폭발음! 방사선 탐지기가 경보! 500미터 구역 즉시 설정! RDD 대응 100분 타임라인을 가동하라!",
        damageIfWrong: 40
      },
      {
        name: "Phase 2: 급성방사선증후군(ARS) 평가",
        description: "더티밤이 ARS를 퍼뜨린다! 피폭 선량을 평가하고 증후군 단계를 진단하라!",
        questionIds: ["rad_q04", "rad_q05", "rad_q06", "rad_q12"],
        hpThreshold: 0.50,
        attackMessage: "피해자들이 구토를 시작했다! 잠복기의 함정에 빠지지 마라! ARS 4단계를 정확히 평가하라!",
        damageIfWrong: 50
      },
      {
        name: "Phase 3: 방사선 특이 치료제 투여",
        description: "방사선 해독제를 정확히 매칭하라! 요오드화칼륨? 프러시안 블루? 틀리면 죽는다!",
        questionIds: ["rad_q07", "rad_q08", "rad_q11", "rad_q16"],
        hpThreshold: 0.25,
        attackMessage: "방사선 내부 오염! 외부 오염! 골수 파괴! 정확한 치료제를 선택하라!",
        damageIfWrong: 60
      },
      {
        name: "Phase 4: 총력 방사선 대응",
        description: "더티밤 최후의 오염 파동! 방사선 재난의 모든 지식으로 최종 승리를 쟁취하라!",
        questionIds: ["rad_q02", "rad_q03", "rad_q14", "rad_q20"],
        hpThreshold: 0.0,
        attackMessage: "Gy? rem? rad? Sv? 단위 혼란이 온다! PRISM 제독! CBC 모니터링! 방사선 재난 완전 정복!",
        damageIfWrong: 70
      }
    ],
    description: "더티 밤(Dirty Bomb) = 방사성 물질 + 일반 폭발물. 핵폭탄이 아니지만 방사성 오염을 광범위하게 퍼뜨린다. 체르노빌 폭발과 히로시마/나가사키 원폭 이후 급성방사선증후군(ARS)이 기록됐다. 선량이 높을수록 구토가 빨리 시작된다: >3500 rem에서 3분 이내. 잠복기의 함정 — 건강해 보이는 그 순간, 내부에서는 골수가 파괴되고 있다!",
    loreQuote: "\"방사선 방호 3원칙: 선량/시간, 거리, 차폐. 알라라(ALARA) 원칙 — 합리적으로 달성 가능한 한 낮게.\" — NCRP",
    reward: {
      xp: 5000,
      coins: 2000,
      title: "방사선재난 대응 전문가",
      titleEn: "Radiological Disaster Response Expert",
      badge: "⚛️",
      unlockedContent: ["rad_scenario_advanced", "rad_skill_master"]
    },
    weaknesses: ["potassiumIodide", "prussianBlue", "DTPA", "CBCmonitoring"],
    bgColor: "#001a00",
    accentColor: "#00ff88",
    bossArt: "☢️💣🌊",
    soundtrack: "tense_radiological"
  },

  {
    id: "boss_nuclear",
    name: "핵 폭풍 군주 아토믹",
    nameEn: "Atomic the Nuclear Storm Lord",
    emoji: "💥",
    hp: 500,
    maxHp: 500,
    category: "nuclear",
    phases: [
      {
        name: "Phase 1: 핵 폭발 즉각 생존",
        description: "아토믹이 폭발했다! 첫 번째 10분 — 즉각 생존 행동을 결정하라!",
        questionIds: ["nuc_q01", "nuc_q04", "nuc_q05", "nuc_q06"],
        hpThreshold: 0.75,
        attackMessage: "핵 폭발 섬광! EMP로 모든 통신이 두절됐다! Get Inside, Stay Inside, Stay Tuned를 즉시 시행하라!",
        damageIfWrong: 40
      },
      {
        name: "Phase 2: 방사선 구역 분류와 생존자 평가",
        description: "아토믹의 구역별 공격! 레드/옐로/그린 존과 ARS 선량을 평가하라!",
        questionIds: ["nuc_q07", "nuc_q08", "nuc_q09", "nuc_q19"],
        hpThreshold: 0.50,
        attackMessage: "생존자들이 다가온다! 레드 존, 옐로 존, 그린 존 — 어디에서 왔는가?! NCRP 결정 선량을 기억하라!",
        damageIfWrong: 50
      },
      {
        name: "Phase 3: 히로시마 데이터와 RTR 트리아지",
        description: "역사가 반복된다! 히로시마/나가사키 데이터와 RTR 시스템으로 반격하라!",
        questionIds: ["nuc_q10", "nuc_q11", "nuc_q16", "nuc_q24"],
        hpThreshold: 0.25,
        attackMessage: "섬광 화상이 83~91%다! RTR 사이트를 구축하라! 모임 센터, 의료 센터, 대피 센터를 정확히 배치!",
        damageIfWrong: 60
      },
      {
        name: "Phase 4: 핵재난 총력 결전",
        description: "아토믹 최후의 핵 공세! ALARA 원칙과 7-10 법칙으로 최종 승리!",
        questionIds: ["nuc_q12", "nuc_q13", "nuc_q18", "nuc_q23"],
        hpThreshold: 0.0,
        attackMessage: "ALARA! 7-10 법칙! 히로시마 15kT, 나가사키 21kT! 핵재난 완전 정복 최종전!",
        damageIfWrong: 70
      }
    ],
    description: "히로시마(~15 kT), 나가사키(~21 kT). FEMA 계획 기준 10 kT 지표 폭발. 단 20 온스의 우라늄이 핵분열해도 10 kT 폭발이 발생한다. 레드 존: >8 Gy(치명), 옐로 존: 1~8 Gy, 그린 존: <1 Gy. 최우선 보호 행동: 'Get Inside, Stay Inside, Stay Tuned' — 12~24시간. 7-10 법칙에 의해 낙진은 시간과 함께 급격히 감소한다. ALARA 원칙으로 대응자를 보호하라!",
    loreQuote: "\"핵 폭발 후 즉각적인 대피보다 건물 내 대피가 첫 수 시간 동안 더 효과적이다.\" — FEMA 2023",
    reward: {
      xp: 5000,
      coins: 2000,
      title: "핵재난 대응 전문가",
      titleEn: "Nuclear Disaster Response Expert",
      badge: "☢️",
      unlockedContent: ["nuc_scenario_advanced", "nuc_skill_master"]
    },
    weaknesses: ["shelterInPlace", "ALARA", "RTRsystem", "dosimetery"],
    bgColor: "#1a1000",
    accentColor: "#ffcc00",
    bossArt: "💥🌑⚡",
    soundtrack: "tense_nuclear"
  },

  {
    id: "boss_explosive",
    name: "테러 폭풍 블라스트",
    nameEn: "Blast the Terror Storm",
    emoji: "💣",
    hp: 520,
    maxHp: 520,
    category: "explosive",
    phases: [
      {
        name: "Phase 1: 폭발 손상 기전 식별",
        description: "블라스트가 콘서트홀을 공격했다! 5가지 폭발 손상 기전을 즉각 식별하라!",
        questionIds: ["exp_q01", "exp_q02", "exp_q18", "exp_q19"],
        hpThreshold: 0.75,
        attackMessage: "파리 바타클랑이 재현된다! 폭발파, 파편, 날아가는 신체, 화상... 손상 기전을 정확히 분류하라!",
        damageIfWrong: 40
      },
      {
        name: "Phase 2: 다중 현장 테러 지휘",
        description: "블라스트가 동시 다발 공격! CSCATTT 프레임워크로 지휘 체계를 세워라!",
        questionIds: ["exp_q08", "exp_q09", "exp_q15", "exp_q21"],
        hpThreshold: 0.50,
        attackMessage: "2차 공격(double-tap) 경보! 대응자가 표적이 됐다! CSCATTT와 안전 원칙을 즉각 적용하라!",
        damageIfWrong: 50
      },
      {
        name: "Phase 3: 전술 의료 대응",
        description: "블라스트가 EMS를 타겟으로 삼는다! TECC와 S-C-ABE를 완벽히 수행하라!",
        questionIds: ["exp_q06", "exp_q07", "exp_q10", "exp_q14"],
        hpThreshold: 0.25,
        attackMessage: "EMS가 포위됐다! TECC 3구역 — 직접 위협, 간접 위협, 대피 치료! S-C-ABE 프로토콜을 수행하라!",
        damageIfWrong: 60
      },
      {
        name: "Phase 4: CTM 최종 통합 대응",
        description: "블라스트 최후의 광역 공격! CTM의 모든 지식을 총동원하라!",
        questionIds: ["exp_q05", "exp_q11", "exp_q12", "exp_q20"],
        hpThreshold: 0.0,
        attackMessage: "THREAT! 3Echo! TST! ATLS! CTM 전체 지식을 동원한 최종 결전!",
        damageIfWrong: 70
      }
    ],
    description: "2015년 11월 13일 파리. 바타클랑에서만 89명. 총 130명 이상 사망. 2016년 7월 14일 니스. 바스티유 데이 군중 속으로 트럭 돌진. GTD 1970~2020: 폭발물 = 51.43%, 174,995건, 354,382명 사망. 차량 공격 = 사건당 176.44명 부상(최고). 화학 = 사건당 45명. EMS가 테러의 소프트 타겟이 되고 있다. CTM(대테러의학)이 선도적 역할을 해야 한다!",
    loreQuote: "\"CTM은 단순 의료 지원이 아닌 테러 대응의 선도적 역할을 한다.\" — CIREcourse CTM 취홈 메시지",
    reward: {
      xp: 5200,
      coins: 2100,
      title: "대테러의학 전문가",
      titleEn: "Counter-Terrorism Medicine Specialist",
      badge: "🛡️",
      unlockedContent: ["exp_scenario_advanced", "exp_skill_master", "cbrne_master_badge"]
    },
    weaknesses: ["CSCATTT", "TECC", "ATLS", "responderSafety"],
    bgColor: "#1a0000",
    accentColor: "#ff3333",
    bossArt: "💣🔥🚨",
    soundtrack: "tense_explosive"
  }
];

// ============================================
// SECTION 3: RPG SCENARIOS
// ============================================

const CBRNE_SCENARIOS = [
  {
    id: "scenario_chemical_subway",
    title: "서울 지하철 2호선 화학물질 유출 사건",
    category: "chemical",
    difficulty: "hard",
    estimatedTime: "20분",
    totalXP: 1800,
    description: "오후 8시 러시아워, 서울 지하철 2호선 강남역. 무전이 들어온다. '승객들이 쓰러지고 있습니다. 이상한 냄새가...' 당신은 현장 지휘관으로 즉각 결정해야 한다. 1995년 도쿄가 서울에서 재현되는가?",
    setting: "서울 지하철 2호선 강남역, 러시아워 — 추정 피해자 50명 이상",
    characterRole: "현장 지휘관 (사건 지휘관)",
    backgroundImage: "subway_chemical",
    steps: [
      {
        id: "step_chem_1",
        narrative: "강남역 승강장에서 무전이 들어온다. '승객들이 눈물을 흘리고, 콧물이 나오고, 기침합니다. 일부는 쓰러졌고, 동공이 극도로 축소된 것을 확인했습니다.' 당신은 현장 최초 대응자다. PPE는 차량에 있다.",
        question: "가장 먼저 해야 할 행동은?",
        options: [
          {
            text: "PPE 없이 즉시 현장에 진입하여 쓰러진 환자를 구출한다",
            correct: false,
            feedback: "치명적 오류! PPE 없이 진입하면 당신도 2차 피해자가 된다. 화학 현장 규칙: '나 먼저 안전'. 화학 생존 체인의 첫 번째 링크는 PPE다.",
            xpLost: 50
          },
          {
            text: "현장 접근을 차단하고, 3-구역 시스템(핫/웜/콜드)을 설정한 뒤 PPE를 착용한다",
            correct: true,
            feedback: "정확하다! 화학 생존 체인 링크 1: PPE → 링크 2: 제독 → 링크 3: 해독제 → 링크 4: BLS. 안전 확보 없이는 어떤 의료 행위도 불가능하다.",
            xpGained: 300
          },
          {
            text: "즉시 해독제(Atropine)를 가져와 모든 환자에게 투여한다",
            correct: false,
            feedback: "아직 제독이 되지 않은 환자에게 해독제를 투여하려면 먼저 PPE가 필요하다. 또한 무작정 Atropine 투여는 과용량 위험이 있다.",
            xpLost: 30
          },
          {
            text: "119에 신고하고 멀리서 대기한다",
            correct: false,
            feedback: "신고는 당연히 해야 하지만 현장 지휘관으로서 즉각적인 구역 설정과 지휘 수립이 필요하다. 수동적 대기는 피해를 증가시킨다.",
            xpLost: 20
          }
        ],
        xp: 300,
        timeLimit: 30
      },
      {
        id: "step_chem_2",
        narrative: "PPE Level B를 착용했다. 환자 중 한 명이 경련을 일으키고 있다. 동공 축소(miosis), 과도한 타액 분비, 근 섬유속성 수축(fasciculations), 배뇨가 확인된다. SLUDGEM 증후군이 전형적으로 나타난다.",
        question: "이 환자에게 필요한 1차 치료는?",
        options: [
          {
            text: "즉시 심폐소생술(CPR)을 시작한다",
            correct: false,
            feedback: "환자에게 맥박이 있다(서맥이지만 있음). 신경작용제 중독에서는 해독제가 우선이다. CPR만으로는 AChE 억제를 해결할 수 없다.",
            xpLost: 40
          },
          {
            text: "제독 후 Atropine + Pralidoxime(2-PAM) 투여, 경련 지속 시 Diazepam 추가",
            correct: true,
            feedback: "완벽하다! 신경작용제 해독제 삼중주: Atropine(무스카린 효과 차단) + 2-PAM(AChE 재활성화, '노화' 전 투여 필수) + Diazepam(경련 조절). 반드시 제독 후 또는 PPE 착용 후 투여.",
            xpGained: 350
          },
          {
            text: "산소 투여 후 Naloxone을 투여한다",
            correct: false,
            feedback: "Naloxone은 오피오이드 해독제다. 신경작용제(유기인계) 중독에는 Atropine + 2-PAM이 필요하다. 독성증후군(Toxidrome) 식별이 중요하다.",
            xpLost: 50
          },
          {
            text: "수액을 빠르게 주입하고 경과를 관찰한다",
            correct: false,
            feedback: "신경작용제 중독에서 수액만으로는 AChE 억제 문제를 해결할 수 없다. 해독제 투여가 즉각적으로 필요하다.",
            xpLost: 30
          }
        ],
        xp: 350,
        timeLimit: 45
      },
      {
        id: "step_chem_3",
        narrative: "제독 구역을 설정하려는데 수원 공급이 지연됐다. 30분 후에나 물이 공급될 것이라는 보고가 들어온다. 환자들은 계속 증상을 보이고 있다.",
        question: "수원 공급이 지연될 때 제독 원칙은?",
        options: [
          {
            text: "물이 올 때까지 30분 기다린 후 습식 제독을 시작한다",
            correct: false,
            feedback: "위험! 습성 오염물질은 시간 지연에 따라 제독 효과가 지수적으로 감소한다. 30분 지연은 회복 불가능한 손상을 야기할 수 있다.",
            xpLost: 60
          },
          {
            text: "즉시 건식 제독(탈의 + 가시적 분진 제거)을 시작하고, 물 도착 후 즉시 습식 제독으로 전환한다",
            correct: true,
            feedback: "정확하다! PRISM: 탈의만으로 외부 오염의 80~90% 제거 가능. 건식 제독 먼저, 물 도착 후 사다리파이프 15초 → 2차 제독 90초 순서로 진행.",
            xpGained: 350
          },
          {
            text: "오염된 의복을 그대로 두고 해독제부터 투여한다",
            correct: false,
            feedback: "오염된 의복은 지속적인 오염 노출을 야기한다. 제독이 먼저다. 화학 생존 체인 순서: PPE → 제독 → 해독제 → BLS.",
            xpLost: 40
          },
          {
            text: "핫존에서 직접 물 없이 항생제 스프레이로 제독한다",
            correct: false,
            feedback: "항생제는 화학 오염 제독제가 아니다. 의복 제거(탈의)가 가장 즉각적이고 효과적인 건식 제독이다.",
            xpLost: 30
          }
        ],
        xp: 350,
        timeLimit: 35
      },
      {
        id: "step_chem_4",
        narrative: "제독을 시작했다. 병원에 연락했더니 '언론 뉴스를 보고 있습니다. 정확한 사건 정보를 알 수 없습니다'라고 한다. 1995년 도쿄의 악몽이 떠오른다.",
        question: "병원이 TV 뉴스로 정보를 얻고 있는 이 상황의 대응은?",
        options: [
          {
            text: "언론이 빨리 알리면 되므로 현장에서 직접 병원에 연락하지 않아도 된다",
            correct: false,
            feedback: "이것이 1995년 도쿄의 교훈이다! 병원은 TV 뉴스에 의존하지 않고 직접 의료 통신 채널을 통해 사건 정보를 받아야 한다.",
            xpLost: 50
          },
          {
            text: "직접 의료 통신 채널을 통해 병원에 사건 유형, 예상 환자 수, 독성증후군 정보를 즉시 전달한다",
            correct: true,
            feedback: "1995년 도쿄의 가장 큰 교훈: 병원이 TV 뉴스로 정보를 얻어야 했다. 직접 통신이 핵심이다. HICS(Hospital Incident Command System) 활성화 지시도 포함해야 한다.",
            xpGained: 400
          },
          {
            text: "소셜 미디어를 활용하여 상황을 공유한다",
            correct: false,
            feedback: "소셜 미디어는 공식 의료 통신 채널이 아니다. 혼란과 잘못된 정보를 확산시킬 위험이 있다.",
            xpLost: 30
          },
          {
            text: "병원 대응은 나중에 처리하고 현장 처치에 집중한다",
            correct: false,
            feedback: "조기 병원 통보와 HICS 활성화는 화학 재난 병원 대응 12단계의 최우선이다. 현장 처치와 병행해야 한다.",
            xpLost: 40
          }
        ],
        xp: 400,
        timeLimit: 30
      },
      {
        id: "step_chem_5",
        narrative: "트리아지가 시작됐다. 걸어서 나온 환자(독성증후군 없음), 쓰러진 환자(miosis + fasciculations + 호흡 곤란), 무반응 환자(호흡 없음) 총 3그룹이 있다. 화학재난 사전 제독 트리아지 알고리즘을 적용해야 한다.",
        question: "화학재난 현장 1차 트리아지로 사용할 방법은?",
        options: [
          {
            text: "START 트리아지만 사용한다",
            correct: false,
            feedback: "화학재난 현장의 1차 트리아지는 MASS(Move, Assess, Sort, Send)다. START는 2차 제독 후 트리아지 알고리즘과 함께 사용한다.",
            xpLost: 30
          },
          {
            text: "MASS 트리아지를 1차로 사용하고, 이후 사전 제독 화학 트리아지 알고리즘을 적용한다",
            correct: true,
            feedback: "정확하다! 화학재난 트리아지 순서: 1차 = MASS → 2차 = 사전 제독 화학 트리아지 알고리즘(KEY: START + Antidote). 독성증후군 기준도 확인: IGSA 증후군, GI 증상, CNS 증상.",
            xpGained: 400
          },
          {
            text: "TST(10초 트리아지)를 사용한다",
            correct: false,
            feedback: "TST는 영국 NHS 폭발물/일반 외상 MCI용이다. 화학재난에서는 독성증후군 평가가 추가된 MASS + 화학 트리아지 알고리즘이 우선이다.",
            xpLost: 20
          },
          {
            text: "모든 환자를 RED로 분류하고 즉시 해독제를 투여한다",
            correct: false,
            feedback: "트리아지 없이 모두 RED로 분류하면 자원 배분이 불가능하다. 걸어 나온 환자(독성증후군 없음)는 GREEN으로 분류하고 독성증후군 있는 환자를 우선한다.",
            xpLost: 30
          }
        ],
        xp: 400,
        timeLimit: 40,
        isFinalStep: true,
        completionMessage: "화학재난 대응을 성공적으로 완료했다! 화학 생존 체인 4링크를 완벽히 수행했다. 1995년 도쿄의 교훈을 반복하지 않았다!"
      }
    ]
  },

  {
    id: "scenario_biological_hospital",
    title: "응급의료센터 내원 집단 호흡기 질환 — 생물테러 의심",
    category: "biological",
    difficulty: "hard",
    estimatedTime: "20분",
    totalXP: 1800,
    description: "48시간 동안 20명이 발열, 기침, 혈담을 호소하며 응급의료센터(ED)에 내원했다. 모두 국가 안보 컨퍼런스 참석자들이다. Gram 염색에서 '안전핀' 모양의 균이 보인다. 이것은 자연 발생 감염인가, 아니면 생물 테러인가?",
    setting: "대학병원 응급의료센터 — 20명 환자, 의료진 노출 가능성",
    characterRole: "응급의학과 전공의 (현장 의사)",
    backgroundImage: "hospital_bio",
    steps: [
      {
        id: "step_bio_1",
        narrative: "48시간 동안 20명이 ED에 내원했다. 모두 같은 컨퍼런스 참석자. 발열, 기침, 혈담(hemoptysis). Gram 음성 구간균, '안전핀(safety pin)' 모양. 국가 안보 컨퍼런스라는 공통점. 당신은 감염병 의심의 원인 균을 먼저 식별해야 한다.",
        question: "Gram 염색 '안전핀' 모양의 균은?",
        options: [
          {
            text: "탄저균(Bacillus anthracis)",
            correct: false,
            feedback: "탄저균은 Gram 양성 포자형성 막대균이다. Gram 음성이 아니며 '안전핀' 모양이 아니다.",
            xpLost: 40
          },
          {
            text: "예르시니아 페스티스(Yersinia pestis, 페스트균)",
            correct: true,
            feedback: "정확하다! 예르시니아 페스티스는 Gram 음성 구간균으로 양극 염색(bipolar staining)에 의해 '안전핀(safety pin)' 모양으로 보인다. 폐렴 페스트는 인간-인간 전파가 가능하다!",
            xpGained: 350
          },
          {
            text: "프란시셀라 툴라렌시스(Francisella tularensis, 야토병)",
            correct: false,
            feedback: "야토병도 Gram 음성 구간균이지만 '안전핀' 모양이 특징적이지 않다. 안전핀 모양은 페스트균(Y. pestis)의 특징이다.",
            xpLost: 30
          },
          {
            text: "클로스트리디움 보툴리눔(Clostridium botulinum)",
            correct: false,
            feedback: "보툴리눔은 Gram 양성 혐기성 막대균이다. 음성도 아니고 구간균도 아니다.",
            xpLost: 40
          }
        ],
        xp: 350,
        timeLimit: 30
      },
      {
        id: "step_bio_2",
        narrative: "페스트균(Yersinia pestis)이 확인됐다. 호흡기 비말로 전파되는 폐렴 페스트가 의심된다. 20명 환자 중 일부는 이미 의료진 옆에서 기침하고 있다. 의료진 노출 위험이 있다.",
        question: "폐렴 페스트 환자에게 필요한 격리 조치는?",
        options: [
          {
            text: "일반 격리실에서 24시간 격리 후 항생제 투여 시작",
            correct: false,
            feedback: "폐렴 페스트는 최소 72시간 격리가 필요하다. 24시간은 불충분하다. N95 마스크도 필수다.",
            xpLost: 50
          },
          {
            text: "N95 마스크 착용 + 격리실에서 최소 72시간 격리",
            correct: true,
            feedback: "정확하다! 폐렴 페스트는 호흡기 비말로 인간-인간 전파 가능 → N95 마스크 필수 + 격리실 최소 72시간. 이것이 페스트 폐렴형이 CDC Category A의 핵심 위험 요인이다.",
            xpGained: 400
          },
          {
            text: "일반 마스크(수술용)만 착용하고 같은 병동에서 치료",
            correct: false,
            feedback: "수술용 마스크는 공기 전파 방지에 불충분하다. N95 마스크와 격리실이 필수다. 의료진이 슈퍼 전파자가 될 수 있다.",
            xpLost: 60
          },
          {
            text: "PPE 없이 치료 후 항생제 예방 투여만 한다",
            correct: false,
            feedback: "PPE 없이 노출된 의료진은 추가 감염원이 된다. 격리, PPE, 항생제 치료를 동시에 시행해야 한다.",
            xpLost: 40
          }
        ],
        xp: 400,
        timeLimit: 35
      },
      {
        id: "step_bio_3",
        narrative: "격리가 시작됐다. 치료 항생제를 선택해야 한다. 폐렴 페스트는 치료 없이 100% 사망률에 이를 수 있다.",
        question: "폐렴 페스트의 1차 치료 항생제는?",
        options: [
          {
            text: "Ciprofloxacin 500mg 경구, 7일",
            correct: false,
            feedback: "경구 Cipro는 경증 또는 예방 목적이다. 중증 폐렴 페스트는 주사용 Streptomycin 또는 Gentamicin이 필요하다.",
            xpLost: 30
          },
          {
            text: "Streptomycin 15mg/kg BID IM, 10일 또는 Gentamicin 5mg/kg/일 IV, 7~10일",
            correct: true,
            feedback: "정확하다! 페스트 1차 치료: Streptomycin 15mg/kg BID IM 10일 또는 Gentamicin 5mg/kg/day IV 7~10일. 대안: Cipro 또는 Doxy. 노출 후 예방: Cipro 500mg BID 또는 Doxy 100mg BID 7일.",
            xpGained: 350
          },
          {
            text: "Amoxicillin-Clavulanate 경구, 14일",
            correct: false,
            feedback: "Amoxicillin-Clavulanate는 페스트에 1차 선택이 아니다. Streptomycin, Gentamicin, Cipro, Doxycycline이 사용된다.",
            xpLost: 40
          },
          {
            text: "Vancomycin IV, 14일",
            correct: false,
            feedback: "Vancomycin은 Gram 양성균 대상이다. 페스트(Gram 음성)에는 효과가 없다.",
            xpLost: 50
          }
        ],
        xp: 350,
        timeLimit: 40
      },
      {
        id: "step_bio_4",
        narrative: "치료가 시작됐다. 노출된 의료진 12명에 대한 예방 처치도 필요하다. 공중보건 당국에 신고해야 하며, 추가 확산을 막아야 한다.",
        question: "페스트 폐렴형에 노출된 의료진의 노출 후 예방(PEP) 기간은?",
        options: [
          {
            text: "3일",
            correct: false,
            feedback: "3일은 페스트 PEP로 불충분하다. 페스트 PEP는 7일이다. 탄저균 PEP(60일)와 혼동하지 않도록 주의.",
            xpLost: 40
          },
          {
            text: "7일",
            correct: true,
            feedback: "페스트 PEP = 7일(Cipro 500mg BID 또는 Doxy 100mg BID). 비교: 탄저균 = 60일, 야토병 = 14일. 각 병원체별 PEP 기간을 정확히 기억하라!",
            xpGained: 400
          },
          {
            text: "14일",
            correct: false,
            feedback: "14일은 야토병(Tularemia)의 PEP 기간이다. 페스트 PEP는 7일이다.",
            xpLost: 30
          },
          {
            text: "60일",
            correct: false,
            feedback: "60일은 탄저균(Anthrax)의 PEP/치료 기간이다. 페스트 PEP는 7일이다.",
            xpLost: 40
          }
        ],
        xp: 400,
        timeLimit: 30
      },
      {
        id: "step_bio_5",
        narrative: "모든 조치가 취해졌다. 마지막으로 생물테러 가능성을 고려해야 한다. 공중보건 당국 신고, 법 집행 기관 연락이 필요하다. 코드블루를 선언해야 하는가?",
        question: "생물테러 의심 시 ED의 최우선 행동 원칙은?",
        options: [
          {
            text: "확실한 증거가 나올 때까지 기다리고 공개하지 않는다",
            correct: false,
            feedback: "위험한 지연! 생물테러 발생 시 초기 대응 속도가 피해 규모를 결정한다. 의심 단계에서 즉각 신고해야 한다.",
            xpLost: 60
          },
          {
            text: "즉각 격리하고 임상적으로 치료하면서, 공중보건 당국과 법 집행 기관에 동시에 보고한다",
            correct: true,
            feedback: "생물 재난 대응 핵심: '격리 → 임상적 치료' 동시에 공중보건 당국과 법 집행 기관 즉각 보고. 저확률-고충격 사건 — 확률과 가능성을 혼동하지 마라!",
            xpGained: 400
          },
          {
            text: "병원 내 자체 처리하고 외부에 알리지 않는다",
            correct: false,
            feedback: "생물테러는 단일 병원이 독자 처리할 수 없다. 공중보건 당국 신고는 법적 의무이며 추가 확산 방지에 필수다.",
            xpLost: 50
          },
          {
            text: "언론에 먼저 알려 대중이 주의하도록 한다",
            correct: false,
            feedback: "언론 공개는 공황과 혼란을 야기할 수 있다. 공식 경로(공중보건 당국)를 통한 체계적 대응이 먼저다.",
            xpLost: 40
          }
        ],
        xp: 400,
        timeLimit: 30,
        isFinalStep: true,
        completionMessage: "생물 재난 대응 성공! 페스트균을 식별하고, 격리하고, 치료하고, 당국에 신고했다. Amerithrax 2001의 교훈을 살렸다!"
      }
    ]
  },

  {
    id: "scenario_radiological_rdd",
    title: "도심 방사선 분산 장치(RDD) 폭발 대응",
    category: "radiological",
    difficulty: "hard",
    estimatedTime: "25분",
    totalXP: 2000,
    description: "오전 9시, 서울 도심 광화문 광장에서 폭발이 발생했다. 방사선 탐지기가 경보를 울린다. 폭발물과 방사성 물질이 결합된 '더티 밤'으로 추정된다. 100분 타임라인이 시작됐다.",
    setting: "서울 광화문 광장 — 시민 수천 명, 방사선 탐지기 경보",
    characterRole: "방사선 안전관 / 현장 지휘관",
    backgroundImage: "city_rdd",
    steps: [
      {
        id: "step_rad_1",
        narrative: "폭발 직후 0~5분. 방사선 탐지기가 경보를 울린다. 현장에 부상자가 보인다. 구조 충동이 강하게 든다. 하지만 100분 타임라인의 첫 단계가 무엇인지 기억하라.",
        question: "폭발 0~5분, RDD 대응 첫 번째 행동은?",
        options: [
          {
            text: "즉시 현장에 진입하여 부상자를 구출한다",
            correct: false,
            feedback: "0~5분 단계는 '인식(RECOGNIZE)' — 폭발 현장에서 방사선이 있음을 인식하는 단계다. 방사선 모니터링 없이 진입하면 대응자가 오염된다.",
            xpLost: 50
          },
          {
            text: "방사선이 있음을 인식하고 초기 위험 구역을 확인한다",
            correct: true,
            feedback: "정확하다! 0~5분: RECOGNIZE — 폭발 현장에서 방사선 존재 인식. 5~10분: INFORM — 대응자와 대중에게 초기 핫존 및 대피소 대피 통보, 당국 신고. 순서를 지켜야 한다.",
            xpGained: 300
          },
          {
            text: "500미터 대피 구역을 즉시 선포하고 주민을 대피시킨다",
            correct: false,
            feedback: "대피 구역 선포는 올바른 조치지만 0~5분 단계의 우선 행동은 '방사선 인식'이다. 대피 지시는 INFORM 단계(5~10분)에서 이루어진다.",
            xpLost: 20
          },
          {
            text: "언론에 즉시 연락하여 사건을 알린다",
            correct: false,
            feedback: "공식 당국 보고가 먼저다. 언론 발표는 체계적 통제 후 공식 발표를 통해 이루어져야 한다. 잘못된 정보가 공황을 야기한다.",
            xpLost: 30
          }
        ],
        xp: 300,
        timeLimit: 25
      },
      {
        id: "step_rad_2",
        narrative: "방사선이 확인됐다. 5~10분 구간이다. 대중에게 정보를 알리고 초기 보호 조치를 취해야 한다. 첫 번째 공개 정보 발표(PIA #1)가 준비됐다.",
        question: "PIA #1(공개 정보 발표 첫 번째)의 핵심 메시지는?",
        options: [
          {
            text: "방사선 위험에 대한 과학적 설명과 장기 건강 영향 정보 제공",
            correct: false,
            feedback: "PIA #1은 과학 설명이 아니다. 즉각적인 행동 지시가 핵심이다.",
            xpLost: 30
          },
          {
            text: "즉각적인 대피소 대피(Shelter-in-Place) 지침",
            correct: true,
            feedback: "PIA #1: 즉각적인 대피소 대피 지침 포함 사전 승인 공개 메시지. PIA #2: 방사선 위험 정보 + 대피소 대피 재강조. PIA #3: 기자회견(대응, 대피, 자가 제독 정보). 순서: 대피소 대피 먼저, 정보는 나중.",
            xpGained: 350
          },
          {
            text: "즉각적인 현장 대피(Evacuation) 명령",
            correct: false,
            feedback: "초기에는 대피소 대피(Shelter-in-Place)가 현장 대피보다 우선이다. 방사선 방향이 확인되기 전까지 급격한 대피는 더 많은 노출을 유발할 수 있다.",
            xpLost: 20
          },
          {
            text: "방사성 물질 유형 확인 후 치료제 정보 제공",
            correct: false,
            feedback: "치료제 정보는 PIA #1의 단계가 아니다. 즉각적인 보호 행동 지시가 우선이다.",
            xpLost: 30
          }
        ],
        xp: 350,
        timeLimit: 30
      },
      {
        id: "step_rad_3",
        narrative: "초기 대피소 대피 구역을 설정해야 한다. RDD 폭발 후 초기 대피소 구역 반경은 얼마인가?",
        question: "RDD 폭발 직후 초기 대피소 대피(Shelter-in-Place) 구역 반경은?",
        options: [
          {
            text: "100미터",
            correct: false,
            feedback: "100미터는 너무 좁다. RDD의 방사성 물질 확산 반경을 고려하면 최소 500미터가 필요하다.",
            xpLost: 50
          },
          {
            text: "500미터",
            correct: true,
            feedback: "정확하다! 초기 대피소 대피 구역: 폭발 지점 사방 500미터. 오염 방향 확인 후 → 확인된 방향으로 2km 확장.",
            xpGained: 400
          },
          {
            text: "1킬로미터",
            correct: false,
            feedback: "1km는 초기 기준이 아니다. 초기 500m, 방향 확인 후 2km 확장이 올바른 순서다.",
            xpLost: 30
          },
          {
            text: "5킬로미터",
            correct: false,
            feedback: "5km는 과도하게 넓다. 자원 낭비와 불필요한 혼란을 야기한다. 초기 500m, 방향 확인 후 2km다.",
            xpLost: 30
          }
        ],
        xp: 400,
        timeLimit: 25
      },
      {
        id: "step_rad_4",
        narrative: "환자가 내원했다. 폭발 후 20분 만에 구토가 시작됐다. 방사선 피폭 선량을 추정해야 한다. ARS 단계를 평가하고 치료를 시작해야 한다.",
        question: "폭발 후 20분 내에 구토가 시작된 환자의 추정 방사선 피폭 선량은?",
        options: [
          {
            text: "100~200 rem(구역질 없음, 또는 3~6시간 후 시작)",
            correct: false,
            feedback: "100~200 rem은 구토 발생률 5~50%, 3~6시간 후 시작이다. 20분 내 구토는 훨씬 높은 선량을 의미한다.",
            xpLost: 40
          },
          {
            text: "600~1000 rem(15~30분 후 구토, 100%)",
            correct: true,
            feedback: "정확하다! 600~1000 rem: 15~30분 후, 100% 구토. 예후: 불량(80~90% 사망). 치료: 조혈 사이토카인 + 골수 이식 고려. >3500 rem이면 3분 이내 구토, 100% 사망이다.",
            xpGained: 400
          },
          {
            text: "200~600 rem(2~3시간 후 구토, 50~100%)",
            correct: false,
            feedback: "200~600 rem은 2~3시간 후 구토다. 20분 내 구토는 600 rem 이상을 시사한다.",
            xpLost: 30
          },
          {
            text: ">3500 rem(3분 이내 구토, CNS 증후군, 100% 사망)",
            correct: false,
            feedback: ">3500 rem이라면 3분 이내 구토와 경련이 나타났을 것이다. 20분 후 구토는 600~1000 rem 범위에 해당한다.",
            xpLost: 20
          }
        ],
        xp: 400,
        timeLimit: 40
      },
      {
        id: "step_rad_5",
        narrative: "ARS 환자들의 치료가 시작됐다. 방사성 세슘(Cs-137)이 포함된 RDD였다는 것이 확인됐다. 내부 오염이 의심되는 환자에게 어떤 치료제를 투여해야 하는가?",
        question: "방사성 세슘(Cs-137) 내부 오염에 사용하는 치료제는?",
        options: [
          {
            text: "요오드화칼륨(KI, Potassium iodide)",
            correct: false,
            feedback: "KI는 방사성 요오드(I-131) 노출 시 사용한다. 세슘 오염에는 효과가 없다.",
            xpLost: 50
          },
          {
            text: "프러시안 블루(Prussian blue)",
            correct: true,
            feedback: "정확하다! 프러시안 블루 = 세슘(Cs) 또는 탈륨(Tl) 내부 오염 치료제. KI = 방사성 요오드. DTPA = 기타 내부 오염. 치료제를 방사성 물질에 맞게 정확히 매칭해야 한다.",
            xpGained: 450
          },
          {
            text: "DTPA(Diethylenetriamine pentaacetate)",
            correct: false,
            feedback: "DTPA는 특정 방사성 핵종의 내부 오염에 사용되지만, 세슘에 대한 1차 선택은 프러시안 블루다.",
            xpLost: 20
          },
          {
            text: "줄기세포 이식",
            correct: false,
            feedback: "줄기세포 이식은 심각한 골수 손상 후 지지 치료다. 세슘 내부 오염의 1차 특이 치료제는 프러시안 블루다.",
            xpLost: 30
          }
        ],
        xp: 450,
        timeLimit: 35,
        isFinalStep: true,
        completionMessage: "방사선 재난 대응 성공! 100분 타임라인을 준수하고, ARS를 정확히 평가하며, 세슘 오염에 프러시안 블루를 투여했다!"
      }
    ]
  },

  {
    id: "scenario_nuclear_detonation",
    title: "핵 폭발 대응 — 10 kT 도심 핵 테러",
    category: "nuclear",
    difficulty: "boss",
    estimatedTime: "25분",
    totalXP: 2200,
    description: "최악의 시나리오가 현실이 됐다. 도심에서 10 kT 핵 장치가 폭발했다. EMP로 통신이 두절됐다. 당신은 살아남은 비상 대응팀의 지휘관이다. FEMA 2023 지침에 따라 즉각 결정을 내려야 한다.",
    setting: "도심 10 kT 핵 폭발 — EMP 전력망 교란, 통신 두절, 수천 명 사상자",
    characterRole: "비상 대응팀 지휘관",
    backgroundImage: "nuclear_blast",
    steps: [
      {
        id: "step_nuc_1",
        narrative: "핵 폭발 직후 섬광이 지나갔다. EMP로 전력이 나갔다. 주변 사람들이 도망치려 한다. 대부분이 야외에 있다. 당신의 첫 번째 명령은?",
        question: "핵 폭발 직후 즉각 생존 행동 원칙은?",
        options: [
          {
            text: "차량을 이용해 최대한 빠르게 폭발 지점에서 멀리 대피한다",
            correct: false,
            feedback: "폭발 직후 대피는 낙진이 떨어지는 시간 동안 방사선에 노출될 위험이 크다. '건물 안으로 들어가라'가 첫 번째 원칙이다.",
            xpLost: 60
          },
          {
            text: "즉시 건물 안(지하실 또는 크고 밀도 높은 건물 중앙)으로 들어가 12~24시간 머문다",
            correct: true,
            feedback: "핵 재난 최우선 원칙: 'Get Inside, Stay Inside, Stay Tuned'. 지하실이나 크고 밀도 높은 건물이 최선. 7-10 법칙에 따라 낙진은 시간과 함께 급감하므로 12~24시간 내부 대피가 가장 효과적.",
            xpGained: 400
          },
          {
            text: "옥상으로 올라가 낙진을 피한다",
            correct: false,
            feedback: "옥상은 낙진에 직접 노출되는 위험한 위치다. 건물 내부, 특히 지하가 최선이다.",
            xpLost: 70
          },
          {
            text: "AM/FM 라디오를 찾아 정보를 수집한다",
            correct: false,
            feedback: "라디오 정보 수집('Stay Tuned')은 맞지만 첫 번째 행동이 아니다. 즉각적인 건물 내 대피('Get Inside')가 최우선이다.",
            xpLost: 20
          }
        ],
        xp: 400,
        timeLimit: 20
      },
      {
        id: "step_nuc_2",
        narrative: "건물 안으로 대피했다. 생존자들이 속속 들어온다. 일부는 폭발 지점에 더 가까이 있었다. 레드 존 생존자들의 방사선 선량을 평가해야 한다.",
        question: "핵 폭발 10 kT '레드 존'에서 온 생존자에게 예상되는 방사선 선량은?",
        options: [
          {
            text: "<1 Gy (급성 상해 임계값 이하)",
            correct: false,
            feedback: "<1 Gy는 그린 존 선량이다. 레드 존 = >8 Gy(치명적).",
            xpLost: 40
          },
          {
            text: "1~8 Gy (100~800 rad)",
            correct: false,
            feedback: "1~8 Gy는 옐로 존(상해~치명적)이다. 레드 존 = >8 Gy.",
            xpLost: 30
          },
          {
            text: ">8 Gy (>800 rad) — 치명적",
            correct: true,
            feedback: "정확하다! 레드 존 = >8 Gy(>800 rad) — 치명적. 옐로 존 = 1~8 Gy. 그린 존 = <1 Gy. 레드 존 생존자는 RTR 트리아지에서 기대 불가(Expectant) 또는 매우 불량한 예후를 가진다.",
            xpGained: 400
          },
          {
            text: ">35 Gy (>3500 rad) — CNS 증후군",
            correct: false,
            feedback: ">35 Gy(>3500 rem)은 CNS 증후군으로 경련과 즉사에 이른다. 레드 존 기준은 >8 Gy이며, 일부는 더 높을 수 있다.",
            xpLost: 20
          }
        ],
        xp: 400,
        timeLimit: 30
      },
      {
        id: "step_nuc_3",
        narrative: "응급 대응팀이 구성됐다. 대원 한 명이 누적 방사선 선량을 측정하니 50 rad(0.5 Gy)에 도달했다. NCRP 기준에 따른 결정을 내려야 한다.",
        question: "응급 대응자가 누적 0.5 Gy(50 rad)에 도달했을 때 NCRP 기준 행동은?",
        options: [
          {
            text: "즉시 무조건 철수해야 하는 법적 한계 선량이다",
            correct: false,
            feedback: "0.5 Gy는 선량 한계(limit)가 아닌 결정 선량(decision dose)이다. 즉시 철수 의무가 아니라 철수 여부를 결정하는 포인트다.",
            xpLost: 40
          },
          {
            text: "NCRP 결정 선량 도달 — 핫존에서 철수할지 결정해야 하는 포인트 (의무 철수 아님)",
            correct: true,
            feedback: "정확하다! 0.5 Gy(50 rad) = NCRP 결정 선량(decision dose). 선량 한계가 아니다. 생명 구조 상황이라면 위험 완전 인식 하에 초과 가능(ALARA 원칙). >250 mSv는 생명 구조 + 완전 위험 인식 조건에서 허용.",
            xpGained: 450
          },
          {
            text: "이 선량은 안전하므로 계속 작업해도 된다",
            correct: false,
            feedback: "0.5 Gy는 결정 포인트다. 무시하고 계속 작업하는 것은 ALARA 원칙 위반이다. 상황에 따라 철수 여부를 결정해야 한다.",
            xpLost: 30
          },
          {
            text: "이 선량부터 ARS 증상이 즉시 나타나는 위험 수준이다",
            correct: false,
            feedback: "0.5 Gy(50 rad)에서 즉각적인 ARS 증상은 없다. 증상이 나타나기 시작하는 수준은 1 Gy(100 rad) 이상이다.",
            xpLost: 30
          }
        ],
        xp: 450,
        timeLimit: 35
      },
      {
        id: "step_nuc_4",
        narrative: "RTR 트리아지 시스템을 구축해야 한다. 생존자들이 자발적으로 모여들고 있다. RTR 시스템 첫 번째 구성 요소를 어디에 설정해야 하는가?",
        question: "RTR 시스템에서 가장 먼저 자발적으로 형성되는 구성 요소는?",
        options: [
          {
            text: "의료 센터(Medical Centers, MC)",
            correct: false,
            feedback: "의료 센터는 RTR 시스템의 공식 치료 시설이다. 사건 초기 자발 형성되는 것은 RTR 사이트다.",
            xpLost: 30
          },
          {
            text: "RTR 사이트(RTR Sites 1~3) — 사건 중 자발적으로 형성되는 초기 트리아지/치료 거점",
            correct: true,
            feedback: "정확하다! RTR 1~3 사이트 = 사건 발생 중 자발적으로 형성되는 초기 트리아지/치료 거점. 그 후 AC(모임 센터), MC(의료 센터), EC(대피 센터) 순서로 체계가 수립된다.",
            xpGained: 400
          },
          {
            text: "대피 센터(Evacuation Centers, EC)",
            correct: false,
            feedback: "대피 센터는 인구 대피를 위한 구성 요소다. 사건 초기 자발 형성 거점은 RTR 사이트다.",
            xpLost: 30
          },
          {
            text: "모임 센터(Assembly Centers, AC)",
            correct: false,
            feedback: "모임 센터는 RTR 사이트와 함께 운영되지만 자발적으로 먼저 형성되는 것은 RTR 사이트다.",
            xpLost: 20
          }
        ],
        xp: 400,
        timeLimit: 30
      },
      {
        id: "step_nuc_5",
        narrative: "응급 처치가 시작됐다. 히로시마/나가사키 데이터에 따르면 화상 생존자의 대부분이 어떤 원인의 화상인가? 이를 알아야 우선 치료를 결정할 수 있다.",
        question: "히로시마/나가사키 데이터에 따른 화상 생존자의 가장 많은 화상 유형은?",
        options: [
          {
            text: "화염 화상(Flame burns, 2~3%)",
            correct: false,
            feedback: "화염 화상은 2~3%로 가장 적다. 섬광 화상이 83~91%로 압도적이다.",
            xpLost: 30
          },
          {
            text: "섬광 화상 단독(Flash burns alone, 83~91%)",
            correct: true,
            feedback: "역사적 데이터: 섬광 화상 단독 = 83~91%(Lebow et al., 1981), 섬광+화염 복합 = 6~15%, 화염 단독 = 2~3%. 핵 폭발 순간의 열복사(thermal radiation)가 가장 치명적이다.",
            xpGained: 450
          },
          {
            text: "방사선 화상(Radiation burns, 50~60%)",
            correct: false,
            feedback: "방사선 자체에 의한 직접적인 피부 화상은 섬광 화상과 다르다. 섬광 화상이 83~91%로 가장 많다.",
            xpLost: 40
          },
          {
            text: "섬광+화염 복합 화상(6~15%)",
            correct: false,
            feedback: "복합 화상은 6~15%다. 가장 많은 것은 섬광 단독(83~91%)이다.",
            xpLost: 20
          }
        ],
        xp: 450,
        timeLimit: 30,
        isFinalStep: true,
        completionMessage: "핵 재난 대응 성공! Get Inside, Stay Inside, Stay Tuned — 7-10 법칙 — NCRP 결정 선량 — RTR 시스템. 모든 원칙을 완벽히 실행했다!"
      }
    ]
  },

  {
    id: "scenario_explosive_concert",
    title: "콘서트홀 폭탄 테러 — 파리 2015 재현",
    category: "explosive",
    difficulty: "boss",
    estimatedTime: "25분",
    totalXP: 2200,
    description: "서울의 한 대형 콘서트홀에서 폭발이 발생했다. 200명 이상의 사상자. 2차 공격 경고가 있다. EMS가 표적이 될 수 있다. 당신은 현장 지휘관이자 대테러의학(CTM) 전문가다. CSCATTT를 적용하라.",
    setting: "서울 올림픽 체조경기장 — 관중 5,000명, 폭탄 폭발 후 혼란, 2차 공격 경고",
    characterRole: "현장 지휘관 / CTM 전문가",
    backgroundImage: "concert_blast",
    steps: [
      {
        id: "step_exp_1",
        narrative: "폭발 직후 현장에 도착했다. 200명 이상이 쓰러져 있다. 일부는 걷고 있다. EMS 대원이 '2차 공격 경고가 있다'고 한다. 당신의 첫 번째 행동은 무엇인가?",
        question: "2차 공격 경고가 있을 때 현장 진입 원칙은?",
        options: [
          {
            text: "부상자가 많으므로 즉시 전원 현장에 진입하여 치료를 시작한다",
            correct: false,
            feedback: "2차 공격(double-tap)은 첫 대응자를 표적으로 한다! EMS가 소프트 타겟이다. 현장 안전 확인 없이 전원 진입은 대응자 전원을 위험에 빠뜨린다.",
            xpLost: 70
          },
          {
            text: "현장이 안전하다고 확인되기 전까지 대응자를 안전한 곳에 대기시키고, 법 집행 기관의 안전 확인 후 진입한다",
            correct: true,
            feedback: "CTM 원칙 #1: 대응자 안전이 최우선. 2차 공격 경고 시 법 집행 기관(LEMC)과 협력하여 안전 확인 후 진입. CSCATTT: S(Safety)가 C(Command) 다음의 두 번째다.",
            xpGained: 400
          },
          {
            text: "소수의 대원만 먼저 진입하고 나머지는 대기한다",
            correct: false,
            feedback: "소수 진입도 안전 확인 없이는 2차 공격 위험에 노출된다. 법 집행 기관의 공식 안전 확인이 필요하다.",
            xpLost: 30
          },
          {
            text: "구급차를 방패로 활용하여 진입한다",
            correct: false,
            feedback: "구급차는 테러리스트에게 VBIED(차량 탑재 폭발물)나 타겟으로 인식될 수 있다. 안전 확인 없는 무분별한 사용은 위험하다.",
            xpLost: 40
          }
        ],
        xp: 400,
        timeLimit: 25
      },
      {
        id: "step_exp_2",
        narrative: "현장이 안전하다고 확인됐다. 트리아지를 시작해야 한다. TST(Ten Second Triage)를 사용하기로 했다. 첫 번째 환자: 걸어서 접근하고 있다. 출혈은 없다.",
        question: "TST에서 걸어서 접근하는 환자는?",
        options: [
          {
            text: "P1(즉시/Immediate) — 즉각 치료",
            correct: false,
            feedback: "TST에서 걸을 수 있는 환자는 P3(최소/경상)이다. 자력 이동 가능 = 경상.",
            xpLost: 30
          },
          {
            text: "P2(지연/Delayed) — 지연 치료",
            correct: false,
            feedback: "TST에서 걸을 수 있으면 P3이다. P2는 걷지 못하지만 관통 손상 없이 말할 수 있는 환자다.",
            xpLost: 20
          },
          {
            text: "P3(최소/경상/Minimal) — 경상 처치",
            correct: true,
            feedback: "TST 첫 단계: 걷기 가능 → Yes = P3(Minimal/경상). 이후: 걷기 불가 + 심각 출혈 → 지혈 → P1. 걷기 불가 + 말함 + 관통 손상 → P1. 걷기 불가 + 말함 + 관통 없음 → P2.",
            xpGained: 350
          },
          {
            text: "Not Breathing — 사망/기대 불가",
            correct: false,
            feedback: "걸어서 오는 환자가 Not Breathing일 수 없다. Not Breathing은 걷지 못하고 말하지 못하며 호흡이 없는 환자다.",
            xpLost: 40
          }
        ],
        xp: 350,
        timeLimit: 20
      },
      {
        id: "step_exp_3",
        narrative: "두 번째 환자: 쓰러져 있고, 대퇴부에서 동맥 출혈이 심하다. 말을 한다. 당신은 즉시 지혈대를 찾는다. 이 환자의 트리아지와 처치는?",
        question: "걷지 못하고 심각한 출혈이 있는 환자의 TST 분류와 처치는?",
        options: [
          {
            text: "P2(지연) — 지혈 없이 이송 우선",
            correct: false,
            feedback: "심각한 출혈 = P1. 지혈 없이 이송하면 이송 중 사망한다. 출혈 조절이 먼저다.",
            xpLost: 60
          },
          {
            text: "P1(즉시) — 지혈대/압박/패킹으로 즉시 지혈",
            correct: true,
            feedback: "TST: 걷기 불가 + 심각한 출혈 → P1 + 즉시 압박/지혈대/패킹. Stop the Bleed 원칙: 외부 출혈 조절이 생명을 구한다. 2차 폭발 손상(파편)으로 인한 출혈이 가장 흔하다.",
            xpGained: 400
          },
          {
            text: "P3(경상) — 자가 지혈 기다림",
            correct: false,
            feedback: "동맥 출혈은 자가 지혈이 불가능하다. 즉각 P1 분류 + 지혈 조치가 필요하다.",
            xpLost: 70
          },
          {
            text: "Black(사망/기대 불가) — 자원 낭비 방지",
            correct: false,
            feedback: "말을 하는 환자는 Black이 아니다. 심각한 출혈 + 의식 있음 = P1으로 즉각 지혈 시작이 옳다.",
            xpLost: 50
          }
        ],
        xp: 400,
        timeLimit: 25
      },
      {
        id: "step_exp_4",
        narrative: "세 번째 환자: 고막 천공, 외부 출혈 없음, 호흡 곤란 호소. '날아온 충격으로 몸이 튀어서 벽에 부딪혔다'고 말한다. 어떤 폭발 손상 기전인가?",
        question: "고막 천공 + 외부 출혈 없음 + 호흡 곤란은 어떤 폭발 손상 기전인가?",
        options: [
          {
            text: "2차 폭발 손상(파편에 의한 관통)",
            correct: false,
            feedback: "2차 손상은 파편/파쇄물에 의한 관통 외상이다. 외부 출혈이 있을 것이다. 이 환자는 외부 출혈이 없다.",
            xpLost: 30
          },
          {
            text: "1차 폭발 손상(압력파 — 공기 충전 기관 손상, '폭발 폐')",
            correct: true,
            feedback: "정확하다! 1차 폭발 손상(Primary Blast Injury) = 압력파 → 공기 충전 기관(폐='폭발 폐', 귀, 위장관). 고막 천공 + 호흡 곤란 + 외부 출혈 없음 = 전형적 1차 손상. 치료 딜레마: 폭발 폐 vs 파열된 폐(관리가 다름).",
            xpGained: 400
          },
          {
            text: "3차 폭발 손상(가속/감속 — 날아가 부딪힘)",
            correct: false,
            feedback: "3차 손상은 날아가 벽에 부딪히는 둔기 외상이다. '몸이 튀어서 부딪혔다'는 3차 손상 요소도 있지만, 고막 천공과 호흡 곤란은 1차 손상이 더 일치한다.",
            xpLost: 20
          },
          {
            text: "4차 폭발 손상(화상)",
            correct: false,
            feedback: "4차 손상은 화상(열적)이다. 이 환자에게 화상 소견은 없다.",
            xpLost: 30
          }
        ],
        xp: 400,
        timeLimit: 30
      },
      {
        id: "step_exp_5",
        narrative: "현장 지휘 체계를 수립해야 한다. CSCATTT(MIMMS) 프레임워크를 적용한다. 의료 대응의 핵심 3단계 '3T'를 정확히 실행해야 한다.",
        question: "MIMMS의 CSCATTT에서 '3T'의 올바른 내용과 순서는?",
        options: [
          {
            text: "Training → Technology → Teamwork",
            correct: false,
            feedback: "3T는 Training/Technology/Teamwork가 아니다.",
            xpLost: 30
          },
          {
            text: "Triage(분류) → Treatment(치료) → Transportation(이송)",
            correct: true,
            feedback: "CSCATTT 마지막 3T: Triage(분류) → Treatment(치료) → Transportation(이송). 전체: Command(지휘) - Safety(안전) - Communication(통신) - Assessment(평가) - Triage - Treatment - Transportation. 파리/니스 교훈: 이 체계의 완전한 이행이 생명을 구한다.",
            xpGained: 450
          },
          {
            text: "Trauma → Triage → Transfer",
            correct: false,
            feedback: "올바른 3T = Triage, Treatment, Transportation이다.",
            xpLost: 20
          },
          {
            text: "Threat → Tactics → Target",
            correct: false,
            feedback: "3T는 Threat/Tactics/Target이 아니다. Triage-Treatment-Transportation이다.",
            xpLost: 30
          }
        ],
        xp: 450,
        timeLimit: 25,
        isFinalStep: true,
        completionMessage: "폭발물 대테러의학 대응 성공! 2차 공격을 피하고, TST 트리아지를 수행하고, CSCATTT를 완벽히 적용했다. 파리 2015의 교훈을 살렸다!"
      }
    ]
  }
];

// ============================================
// SECTION 4: SKILL TREE
// ============================================

const CBRNE_SKILL_TREE = {

  chemical: [
    {
      id: "chem_sk_1",
      name: "독성학 기초",
      nameEn: "Toxicology Fundamentals",
      icon: "🔬",
      prereq: null,
      unlockLevel: 1,
      description: "화학작용제의 기본 분류와 독성 원리를 이해한다. 유기인계, 신경작용제, 혈액작용제, 수포작용제의 기초.",
      passiveBonus: "화학 퀴즈 정답 시 XP +5%",
      requiredXP: 0,
      relatedQuestions: ["chem_q03", "chem_q04", "chem_q15"]
    },
    {
      id: "chem_sk_2",
      name: "독성증후군 전문가",
      nameEn: "Toxidrome Expert",
      icon: "👁️",
      prereq: "chem_sk_1",
      unlockLevel: 3,
      description: "DUMBELS, SLUDGEM, 콜린성 독성증후군을 즉각 식별한다. 신경작용제, 오피오이드, 혈액작용제 독성증후군 구분.",
      passiveBonus: "독성증후군 관련 문제 타임 보너스 +10초",
      requiredXP: 500,
      relatedQuestions: ["chem_q04", "chem_q06", "chem_q12", "chem_q16"]
    },
    {
      id: "chem_sk_3",
      name: "PPE 마스터",
      nameEn: "PPE Master",
      icon: "🦺",
      prereq: "chem_sk_1",
      unlockLevel: 5,
      description: "OSHA PPE 레벨 A/B/C/D를 구역별로 완벽히 선택한다. 핫존/웜존/콜드존별 적합 PPE 실전 적용.",
      passiveBonus: "안전 관련 결정에서 오답 시 HP 손실 -20%",
      requiredXP: 800,
      relatedQuestions: ["chem_q07", "chem_q13"]
    },
    {
      id: "chem_sk_4",
      name: "해독제 삼중주",
      nameEn: "Antidote Triple",
      icon: "💊",
      prereq: "chem_sk_2",
      unlockLevel: 8,
      description: "Atropine + 2-PAM + Diazepam의 각 역할과 적응증을 완전히 숙지한다. 해독제 전체 매트릭스(HF→Ca, Cyanide→Hydroxocobalamin 등) 마스터.",
      passiveBonus: "해독제 관련 정답 시 XP +15%",
      requiredXP: 1500,
      relatedQuestions: ["chem_q05", "chem_q12", "chem_q16", "chem_q23", "chem_q28"]
    },
    {
      id: "chem_sk_5",
      name: "PRISM 제독 전문가",
      nameEn: "PRISM Decontamination Expert",
      icon: "🚿",
      prereq: "chem_sk_3",
      unlockLevel: 10,
      description: "PRISM 3단계 프로토콜을 완벽히 실행한다. ORCHIDS 최적 조건, 건식/습식 제독 선택 원리 숙지.",
      passiveBonus: "제독 관련 시나리오에서 추가 XP +200",
      requiredXP: 2000,
      relatedQuestions: ["chem_q08", "chem_q09", "chem_q10", "chem_q22"]
    },
    {
      id: "chem_sk_6",
      name: "화학 생존 체인 완성자",
      nameEn: "Chain of Chemical Survival Master",
      icon: "⛓️",
      prereq: ["chem_sk_4", "chem_sk_5"],
      unlockLevel: 15,
      description: "화학 생존 체인(PPE→제독→해독제→BLS)을 현장에서 즉각 실행하는 최고 전문가. 병원 HICS 활성화 프로토콜 완전 마스터.",
      passiveBonus: "화학재난 보스전 데미지 +25%",
      requiredXP: 5000,
      relatedQuestions: ["chem_q01", "chem_q17", "chem_q20"]
    }
  ],

  biological: [
    {
      id: "bio_sk_1",
      name: "생물안전 기초",
      nameEn: "Biosafety Fundamentals",
      icon: "🧫",
      prereq: null,
      unlockLevel: 1,
      description: "생물 재난의 4가지 분류 기준과 전파성/비전파성 개념을 이해한다. CDC 분류 체계 기초 학습.",
      passiveBonus: "생물 퀴즈 첫 번째 시도 정답 시 XP +5%",
      requiredXP: 0,
      relatedQuestions: ["bio_q02", "bio_q25", "bio_q28"]
    },
    {
      id: "bio_sk_2",
      name: "Category A 병원체 전문가",
      nameEn: "Category A Pathogen Expert",
      icon: "☣️",
      prereq: "bio_sk_1",
      unlockLevel: 3,
      description: "CDC 6대 Category A 병원체(탄저균/보툴리눔/페스트/천연두/야토병/VHF)를 완전히 이해한다. 임상 특징, 전파 방식, 치료를 숙지.",
      passiveBonus: "Category A 관련 보스전 HP +50",
      requiredXP: 500,
      relatedQuestions: ["bio_q03", "bio_q04", "bio_q06", "bio_q07", "bio_q08"]
    },
    {
      id: "bio_sk_3",
      name: "역학 조사관",
      nameEn: "Epidemiological Investigator",
      icon: "🔍",
      prereq: "bio_sk_1",
      unlockLevel: 5,
      description: "생물 재난 역학 사례(Amerithrax 2001, 스베르들롭스크 1979 등)를 분석하고 패턴을 식별한다.",
      passiveBonus: "역학 관련 시나리오에서 정답 연속 보너스 +1.5배",
      requiredXP: 800,
      relatedQuestions: ["bio_q01", "bio_q05", "bio_q12", "bio_q13", "bio_q27"]
    },
    {
      id: "bio_sk_4",
      name: "항생제 프로토콜 마스터",
      nameEn: "Antibiotic Protocol Master",
      icon: "💉",
      prereq: "bio_sk_2",
      unlockLevel: 8,
      description: "병원체별 항생제 치료(Cipro/Doxy/Streptomycin/Gentamicin)와 PEP 기간을 정확히 매칭한다. 탄저 60일 vs 페스트 7일 vs 야토병 14일.",
      passiveBonus: "항생제 문제 정답 시 XP +20%",
      requiredXP: 1500,
      relatedQuestions: ["bio_q09", "bio_q10", "bio_q24"]
    },
    {
      id: "bio_sk_5",
      name: "POD 시스템 전문가",
      nameEn: "POD System Expert",
      icon: "🏥",
      prereq: "bio_sk_3",
      unlockLevel: 10,
      description: "Points of Dispensing(POD) 시스템의 4가지 유형을 이해하고 대규모 생물 재난 시 의료 대응책 배포를 조직한다.",
      passiveBonus: "생물 시나리오에서 결정 보너스 +150 XP",
      requiredXP: 2000,
      relatedQuestions: ["bio_q17", "bio_q23"]
    },
    {
      id: "bio_sk_6",
      name: "생물재난 대응 총괄",
      nameEn: "Biological Disaster Response Director",
      icon: "🦠",
      prereq: ["bio_sk_4", "bio_sk_5"],
      unlockLevel: 15,
      description: "생물 재난 전체 대응 체계(탐지→통보→격리→치료→회복)를 총괄 지휘한다. 저확률-고충격 생물테러 대응 최고 전문가.",
      passiveBonus: "생물재난 보스전 전 단계 데미지 +25%",
      requiredXP: 5000,
      relatedQuestions: ["bio_q22", "bio_q23", "bio_q26"]
    }
  ],

  radiological: [
    {
      id: "rad_sk_1",
      name: "방사선 물리학 기초",
      nameEn: "Radiation Physics Basics",
      icon: "⚛️",
      prereq: null,
      unlockLevel: 1,
      description: "방사선 단위(Gy/Sv/rad/rem)와 변환, 방사선 손상 결정 3요인(선량/거리/차폐)을 이해한다.",
      passiveBonus: "단위 변환 문제 정답 시 XP +5%",
      requiredXP: 0,
      relatedQuestions: ["rad_q02", "rad_q03", "rad_q13", "rad_q20"]
    },
    {
      id: "rad_sk_2",
      name: "ARS 진단가",
      nameEn: "ARS Diagnostician",
      icon: "🩺",
      prereq: "rad_sk_1",
      unlockLevel: 3,
      description: "급성방사선증후군(ARS) 4단계와 선량별 증후군 유형(조혈/위장/CNS)을 완전히 이해한다. 구토 시작 시간으로 선량 추정 가능.",
      passiveBonus: "ARS 관련 보스전 HP +50",
      requiredXP: 500,
      relatedQuestions: ["rad_q04", "rad_q05", "rad_q06", "rad_q12"]
    },
    {
      id: "rad_sk_3",
      name: "방사선 구역 전문가",
      nameEn: "Radiation Zone Expert",
      icon: "🗺️",
      prereq: "rad_sk_1",
      unlockLevel: 5,
      description: "RDD 대응 100분 타임라인과 구역 설정(500m→2km) 원칙을 완전히 숙지한다. 3가지 PIA 메시지 순서 마스터.",
      passiveBonus: "방사선 시나리오에서 첫 번째 결정 보너스 +200 XP",
      requiredXP: 800,
      relatedQuestions: ["rad_q09", "rad_q10", "rad_q17", "rad_q18"]
    },
    {
      id: "rad_sk_4",
      name: "방사선 치료제 전문가",
      nameEn: "Radiation Treatment Specialist",
      icon: "💊",
      prereq: "rad_sk_2",
      unlockLevel: 8,
      description: "방사성 물질별 치료제(KI/프러시안블루/DTPA/줄기세포)를 정확히 매칭한다. CBC 모니터링 일정 완전 숙지.",
      passiveBonus: "방사선 치료제 문제 정답 시 XP +20%",
      requiredXP: 1500,
      relatedQuestions: ["rad_q07", "rad_q08", "rad_q11", "rad_q16"]
    },
    {
      id: "rad_sk_5",
      name: "PRISM 방사선 제독 전문가",
      nameEn: "PRISM Radiological Decon Expert",
      icon: "🚿",
      prereq: "rad_sk_3",
      unlockLevel: 10,
      description: "방사선 제독의 PRISM 프로토콜과 PPE 선택(SCBA/APR/N95)을 완전히 마스터한다. 탈의 90% 오염 제거 원리 적용.",
      passiveBonus: "제독 관련 문제 연속 정답 시 보너스 +2배",
      requiredXP: 2000,
      relatedQuestions: ["rad_q14", "rad_q15", "rad_q25"]
    },
    {
      id: "rad_sk_6",
      name: "방사선 재난 총괄 전문가",
      nameEn: "Radiological Disaster Master",
      icon: "☢️",
      prereq: ["rad_sk_4", "rad_sk_5"],
      unlockLevel: 15,
      description: "RDD부터 원전 사고까지 방사선 재난의 전체 대응 체계를 총괄한다. ALARA 원칙과 집단 모니터링 6목표 완전 실행.",
      passiveBonus: "방사선 보스전 전 단계 데미지 +25%",
      requiredXP: 5000,
      relatedQuestions: ["rad_q19", "rad_q21", "rad_q22", "rad_q24"]
    }
  ],

  nuclear: [
    {
      id: "nuc_sk_1",
      name: "핵물리학 기초",
      nameEn: "Nuclear Physics Basics",
      icon: "💥",
      prereq: null,
      unlockLevel: 1,
      description: "핵 폭발의 위력(kT/MT), 역사적 사례(히로시마/나가사키), 핵분열 원리를 이해한다. 1 kT = 1,000톤 TNT 당량.",
      passiveBonus: "핵물리 관련 문제 정답 시 XP +5%",
      requiredXP: 0,
      relatedQuestions: ["nuc_q01", "nuc_q02", "nuc_q03", "nuc_q18", "nuc_q27"]
    },
    {
      id: "nuc_sk_2",
      name: "즉각 생존 전문가",
      nameEn: "Immediate Survival Expert",
      icon: "🏠",
      prereq: "nuc_sk_1",
      unlockLevel: 3,
      description: "'Get Inside, Stay Inside, Stay Tuned' 원칙과 12~24시간 대피 근거(7-10 법칙)를 완전히 이해한다.",
      passiveBonus: "생존 행동 관련 보스전 HP +50",
      requiredXP: 500,
      relatedQuestions: ["nuc_q04", "nuc_q05", "nuc_q06", "nuc_q21", "nuc_q23", "nuc_q26"]
    },
    {
      id: "nuc_sk_3",
      name: "방사선 구역 분석가",
      nameEn: "Radiation Zone Analyst",
      icon: "📊",
      prereq: "nuc_sk_1",
      unlockLevel: 5,
      description: "10 kT 폭발의 레드/옐로/그린 존 선량 범위와 RTR 시스템을 완전히 이해한다. 섬광 화상 데이터 숙지.",
      passiveBonus: "구역 관련 시나리오 정답 시 추가 XP +200",
      requiredXP: 800,
      relatedQuestions: ["nuc_q07", "nuc_q10", "nuc_q11", "nuc_q19", "nuc_q24"]
    },
    {
      id: "nuc_sk_4",
      name: "방사선 방호 전문가",
      nameEn: "Radiation Protection Expert",
      icon: "🛡️",
      prereq: "nuc_sk_3",
      unlockLevel: 8,
      description: "NCRP 결정 선량(0.5 Gy)과 상황별 허용 선량, ALARA 원칙을 완전히 적용한다. 응급 대응자 선량 관리.",
      passiveBonus: "ALARA/선량 관련 문제 정답 시 XP +20%",
      requiredXP: 1500,
      relatedQuestions: ["nuc_q08", "nuc_q09", "nuc_q12", "nuc_q20", "nuc_q22"]
    },
    {
      id: "nuc_sk_5",
      name: "EMP 대응 전문가",
      nameEn: "EMP Response Expert",
      icon: "⚡",
      prereq: "nuc_sk_2",
      unlockLevel: 10,
      description: "핵 폭발 EMP(전자기 펄스)가 인프라에 미치는 영향과 통신 두절 상황에서의 대응을 완전히 이해한다.",
      passiveBonus: "통신/정보 관련 시나리오 결정 보너스 +150 XP",
      requiredXP: 2000,
      relatedQuestions: ["nuc_q06", "nuc_q14", "nuc_q25"]
    },
    {
      id: "nuc_sk_6",
      name: "핵재난 대응 총사령관",
      nameEn: "Nuclear Disaster Supreme Commander",
      icon: "💫",
      prereq: ["nuc_sk_4", "nuc_sk_5"],
      unlockLevel: 15,
      description: "핵 폭발 전체 대응(즉각 생존→구역 설정→RTR 트리아지→장기 회복)을 총사령관급으로 지휘한다. FEMA 2023 5개 구역 완전 적용.",
      passiveBonus: "핵재난 보스전 전 단계 데미지 +25%",
      requiredXP: 5000,
      relatedQuestions: ["nuc_q13", "nuc_q16", "nuc_q17"]
    }
  ],

  explosive: [
    {
      id: "exp_sk_1",
      name: "폭발 손상 기초",
      nameEn: "Blast Injury Basics",
      icon: "💣",
      prereq: null,
      unlockLevel: 1,
      description: "5가지 폭발 손상 기전(1차~5차)의 정의와 각 기전이 영향을 미치는 신체 부위를 이해한다.",
      passiveBonus: "폭발 손상 퀴즈 첫 시도 정답 XP +5%",
      requiredXP: 0,
      relatedQuestions: ["exp_q01", "exp_q02", "exp_q18", "exp_q19"]
    },
    {
      id: "exp_sk_2",
      name: "대테러의학(CTM) 전문가",
      nameEn: "Counter-Terrorism Medicine Expert",
      icon: "🚨",
      prereq: "exp_sk_1",
      unlockLevel: 3,
      description: "CTM의 정의와 구성 요소, TEMS/TCCC/TECC의 차이, 테러리스트의 EMS 악용 방식을 이해한다.",
      passiveBonus: "CTM 관련 보스전 HP +50",
      requiredXP: 500,
      relatedQuestions: ["exp_q09", "exp_q14", "exp_q15", "exp_q27"]
    },
    {
      id: "exp_sk_3",
      name: "트리아지 마스터",
      nameEn: "Triage Master",
      icon: "🏷️",
      prereq: "exp_sk_1",
      unlockLevel: 5,
      description: "START, TST(10초 트리아지), SALT 트리아지를 실전 적용한다. TST 6단계 알고리즘 완전 숙지.",
      passiveBonus: "트리아지 시나리오 결정 보너스 +200 XP",
      requiredXP: 800,
      relatedQuestions: ["exp_q12", "exp_q26"]
    },
    {
      id: "exp_sk_4",
      name: "TECC 전술 의료 전문가",
      nameEn: "TECC Tactical Medical Expert",
      icon: "⚕️",
      prereq: "exp_sk_2",
      unlockLevel: 8,
      description: "TECC 3구역(직접 위협/간접 위협/대피)과 S-C-ABE 프로토콜을 완전히 실행한다. THREAT 및 3 Echo 프로토콜 마스터.",
      passiveBonus: "전술 의료 관련 문제 정답 시 XP +20%",
      requiredXP: 1500,
      relatedQuestions: ["exp_q06", "exp_q07", "exp_q10", "exp_q11"]
    },
    {
      id: "exp_sk_5",
      name: "CSCATTT 지휘 전문가",
      nameEn: "CSCATTT Command Expert",
      icon: "🎖️",
      prereq: "exp_sk_3",
      unlockLevel: 10,
      description: "MIMMS의 CSCATTT 프레임워크를 완전히 적용하여 대규모 테러 MCI를 지휘한다. 파리/니스 사례 완전 분석.",
      passiveBonus: "지휘 관련 시나리오 결정 보너스 +200 XP",
      requiredXP: 2000,
      relatedQuestions: ["exp_q03", "exp_q04", "exp_q05", "exp_q08", "exp_q16", "exp_q17"]
    },
    {
      id: "exp_sk_6",
      name: "CTM 선도적 전문가",
      nameEn: "CTM Leading Expert",
      icon: "🛡️",
      prereq: ["exp_sk_4", "exp_sk_5"],
      unlockLevel: 15,
      description: "대테러의학(CTM)의 선도적 역할을 수행한다. 군·민간 협력, 통합 지휘, 대응자 안전, 지역사회 회복까지 전체 CTM 사이클을 마스터.",
      passiveBonus: "폭발물 보스전 전 단계 데미지 +30% + 전 CBRNE 보스전 HP +100",
      requiredXP: 5000,
      relatedQuestions: ["exp_q21", "exp_q22", "exp_q23", "exp_q24"]
    }
  ]

}; // end CBRNE_SKILL_TREE

// ============================================
// SECTION 5: EXPORT
// ============================================

window.CBRNE_CONTENT = {
  questions: CBRNE_QUIZ_QUESTIONS,
  bossBattles: CBRNE_BOSS_BATTLES,
  scenarios: CBRNE_SCENARIOS,
  skillTree: CBRNE_SKILL_TREE,

  // Metadata
  meta: {
    version: "1.0.0",
    createdAt: "2025",
    source: "CIREcourse Lectures — Heejun Shin MD, MS, FIBODM",
    totalQuestions: (
      Object.values(CBRNE_QUIZ_QUESTIONS).reduce((sum, cat) => sum + cat.length, 0)
    ),
    categories: ["chemical", "biological", "radiological", "nuclear", "explosive"],
    categoryLabels: {
      chemical: "화학재난 (Chemical)",
      biological: "생물재난 (Biological)",
      radiological: "방사선재난 (Radiological)",
      nuclear: "핵재난 (Nuclear)",
      explosive: "폭발물/대테러의학 (Explosive/CTM)"
    },
    difficultyDistribution: {
      normal: "기본 핵심 지식",
      hard: "심화 임상 적용",
      boss: "최고 난이도 통합 문제"
    }
  },

  // Helper functions
  getQuestionsByCategory: function(category) {
    return this.questions[category] || [];
  },

  getQuestionById: function(id) {
    for (const cat of Object.values(this.questions)) {
      const found = cat.find(q => q.id === id);
      if (found) return found;
    }
    return null;
  },

  getBossByCategory: function(category) {
    return this.bossBattles.find(b => b.category === category) || null;
  },

  getScenarioByCategory: function(category) {
    return this.scenarios.filter(s => s.category === category);
  },

  getSkillsByCategory: function(category) {
    return this.skillTree[category] || [];
  },

  getRandomQuestions: function(category, count, difficulty = null) {
    let pool = this.questions[category] || [];
    if (difficulty) {
      pool = pool.filter(q => q.diff === difficulty);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
};

// Also expose individual constants for backward compatibility
window.CBRNE_QUIZ_QUESTIONS = CBRNE_QUIZ_QUESTIONS;
window.CBRNE_BOSS_BATTLES = CBRNE_BOSS_BATTLES;
window.CBRNE_SCENARIOS = CBRNE_SCENARIOS;
window.CBRNE_SKILL_TREE = CBRNE_SKILL_TREE;

console.log(
  "[CBRNE_CONTENT] Loaded successfully. " +
  Object.values(CBRNE_QUIZ_QUESTIONS).reduce((sum, c) => sum + c.length, 0) +
  " questions, " +
  CBRNE_BOSS_BATTLES.length + " bosses, " +
  CBRNE_SCENARIOS.length + " scenarios, " +
  Object.keys(CBRNE_SKILL_TREE).length + " skill categories."
);
