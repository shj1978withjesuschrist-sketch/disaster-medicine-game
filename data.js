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
      },
      // ============================================
      // NEW PATIENTS P-011 ~ P-018
      // ============================================
      {
        id: 'P-011',
        name: '오현수',
        age: 38,
        gender: '남',
        icon: '👨',
        vitals: {
          respiration: { value: '28회/분', status: 'warning', label: '호흡수' },
          pulse: { value: '54bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '혼미', status: 'critical', label: '의식상태' }
        },
        findings: [
          '동공 극도 축소(바늘 동공, miosis)',
          '침 흘림(salivation) 및 과도한 눈물(lacrimation)',
          '불수의적 배뇨·배변, 구토(SLUDGEM 전형 증상)',
          '근 경련 및 호흡 분비물 증가로 기도 위협',
          '화학공단 인근에서 발견, 사린 유사 물질 노출 의심'
        ],
        correctTriage: 'red',
        triageNote: '화학 노출 / 신경작용제',
        explanation: 'SLUDGEM 증상(Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis, Miosis)은 유기인계 신경작용제(사린 등) 노출의 전형 소견. 서맥, 과도한 분비물, 의식 저하는 즉각 해독제(Atropine + 2-PAM) 투여가 필요한 RED 분류. 제염 전에는 의료진 PPE 필수.'
      },
      {
        id: 'P-012',
        name: '민지영',
        age: 29,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '22회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '108bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '혼돈', status: 'warning', label: '의식상태' }
        },
        findings: [
          '원전 사고 현장 근로자, 고선량 방사선 피폭 추정',
          '피폭 후 1시간 이내 구역·구토 발현 (전구 증상)',
          '두통 및 피로감 심함',
          '외부 상처 없음, 피부 발적 없음',
          '정확한 피폭량 미확인 (ARS 고위험군 분류 필요)'
        ],
        correctTriage: 'red',
        triageNote: '방사선 노출 / ARS 의심',
        explanation: '피폭 후 1시간 이내 구역·구토 발현은 급성방사선증후군(ARS) 전구기(prodromal phase)의 전형 소견으로, 고선량(>1Gy) 피폭을 시사합니다. 현장에서는 증상 발현 시각을 정확히 기록하고 RED 분류. 제염(탈의 + 세척), CBC 반복 측정, 가능하면 생물학적 선량 측정(biological dosimetry) 필요.'
      },
      {
        id: 'P-013',
        name: '류승민',
        age: 44,
        gender: '남',
        icon: '👨‍🦳',
        vitals: {
          respiration: { value: '20회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '116bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '3초', status: 'warning', label: '모세혈관 재충전' },
          consciousness: { value: '명료하나 쇠약', status: 'warning', label: '의식상태' }
        },
        findings: [
          '건물 붕괴로 하지 4시간 이상 압박 후 구출',
          '양측 하지 부종 및 압박 흔적, 운동 불가',
          '소변 색깔 진갈색(myoglobinuria 의심)',
          '구출 직전보다 의식 악화 우려',
          '구출 시 급성 고칼륨혈증(hyperkalemia) + 저혈압 위험 높음'
        ],
        correctTriage: 'red',
        triageNote: '압좌 증후군 (Crush Syndrome)',
        explanation: '압좌 증후군(Crush Syndrome)은 압박 해제 시 근육 괴사 산물(K⁺, 미오글로빈)이 전신 순환에 방출되며 급성 신부전, 고칼륨혈증, 심부전을 유발합니다. 구출 전 수액 공격(생리식염수 1L/h)을 개시하고, 심장 모니터 장착, RED 분류. 진갈색 소변은 미오글로빈뇨의 경고 신호입니다.'
      },
      {
        id: 'P-014',
        name: '홍미래',
        age: 31,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '26회/분', status: 'warning', label: '호흡수' },
          pulse: { value: '122bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '3초', status: 'warning', label: '모세혈관 재충전' },
          consciousness: { value: '반응 있음', status: 'normal', label: '의식상태' }
        },
        findings: [
          '화재 현장 탈출, 체표면적 30% 2~3도 화상',
          '목과 얼굴 화상 있음, 쉰 목소리(hoarseness) 발생',
          '코털 그을림 및 그을린 점막 확인',
          '기침 시 검은 가래 배출',
          '현재 기도 유지되나 부종 악화로 조기 삽관 고려 필요'
        ],
        correctTriage: 'red',
        triageNote: '흡입 손상 동반 광범위 화상',
        explanation: '30% TBSA 2~3도 화상은 심각한 손상이며, 쉰 목소리·코털 그을림·그을린 점막은 흡입 손상(inhalation injury)의 3대 징후입니다. 기도 부종은 수 시간 내 급속히 진행되므로 조기 기관삽관이 생명을 구합니다. 수액 소생(Parkland 공식: 4mL × kg × %TBSA) 즉시 시작. RED 분류 필수.'
      },
      {
        id: 'P-015',
        name: '고정순',
        age: 72,
        gender: '여',
        icon: '👵',
        vitals: {
          respiration: { value: '24회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '94bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' }
        },
        findings: [
          '자력 보행 가능, 천천히 이동 중',
          '화재 연기 흡입 후 COPD 악화 증상',
          '경도 천명음(wheezing) 청진',
          '기저 질환: COPD, 고혈압, 당뇨',
          '흡입기 보유 없음, 호흡 불편 호소'
        ],
        correctTriage: 'green',
        triageNote: '보행 가능 / 노인 취약군',
        explanation: '보행 가능 → GREEN 분류. 그러나 노인·COPD 기저 질환자는 악화 위험이 높아 주기적 재평가(re-triage)가 필수입니다. Green 구역에서 기관지확장제(흡입기) 제공 및 산소 포화도 모니터링을 지속해야 합니다. 노인은 생리적 보상 능력이 제한되어 경증이라도 악화 속도가 빠를 수 있습니다.'
      },
      {
        id: 'P-016',
        name: '임서준',
        age: 5,
        gender: '남',
        icon: '👦',
        vitals: {
          respiration: { value: '28회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '118bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '울고 있음', status: 'normal', label: '의식상태' }
        },
        findings: [
          '5세 남아, 보호자 없이 혼자 발견',
          '양 무릎과 손 경미한 찰과상 (자체 지혈)',
          '자력 보행 가능',
          '이름·나이 대답 가능하지만 겁에 질린 상태',
          'JumpSTART Triage 프로토콜 적용 필요'
        ],
        correctTriage: 'green',
        triageNote: 'JumpSTART / 소아 비동반',
        explanation: 'JumpSTART(소아용 Triage): 보행 가능 → GREEN. 생리적 활력징후도 정상 범위(소아 정상 호흡수 20-30회/분). 단, 비동반 소아는 심리적 외상 위험이 높으므로 별도 소아 안전구역(family reunification area)에 배치하고 정신건강 지원 연결이 필요합니다. 보호자 확인 절차를 별도로 진행해야 합니다.'
      },
      {
        id: 'P-017',
        name: '손나리',
        age: 29,
        gender: '여',
        icon: '🤰',
        vitals: {
          respiration: { value: '20회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '98bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' }
        },
        findings: [
          '임신 32주, 폭발 충격으로 넘어짐',
          '우측 팔 경미한 열상 (지혈됨)',
          '자력 보행 가능',
          '하복부 간헐적 통증 호소',
          '태동 확인 필요, 태반 조기 박리 위험'
        ],
        correctTriage: 'yellow',
        triageNote: '임산부 특수 취약군',
        explanation: '현재 활력징후와 의식은 안정적이나 임신 32주 임산부는 복부 외상 후 태반 조기 박리(placental abruption)·조기 진통 위험이 있어 일반 YELLOW보다 우선적 평가가 필요합니다. 좌측 와위(left lateral decubitus)로 자궁의 대정맥 압박을 줄이고, 산부인과 응급 평가를 조기에 시행해야 합니다. 두 생명을 동시에 고려하는 특수 케이스입니다.'
      },
      {
        id: 'P-018',
        name: '응우옌반탄',
        age: 35,
        gender: '남',
        icon: '👨',
        vitals: {
          respiration: { value: '18회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '88bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '각성', status: 'normal', label: '의식상태' }
        },
        findings: [
          '베트남 국적 외국인 근로자, 한국어 소통 어려움',
          '자력 보행 가능',
          '비언어적으로 머리와 복부를 가리키며 통증 표현',
          '활력징후 안정적이나 통증 정도 평가 어려움',
          '언어 장벽으로 기저 질환·투약 이력 확인 불가'
        ],
        correctTriage: 'yellow',
        triageNote: '언어 장벽 / 외국인 취약군',
        explanation: '활력징후 정상이고 보행 가능하나, 언어 장벽으로 주관적 증상 파악이 제한되어 증상 과소 평가 위험이 있습니다. YELLOW로 분류하되, 통역 서비스(통역 앱·이중언어 자원봉사자) 연결 및 정기적 재평가를 시행해야 합니다. 외국인·이주 노동자는 재난 시 정보 접근성 부족으로 취약계층에 해당합니다.'
      },
      // ============================================
      // NEW PATIENTS P-019 ~ P-028 (CBRN/Special Disaster)
      // ============================================
      {
        id: 'P-019',
        name: '김도현',
        age: 42,
        gender: '남',
        icon: '👨',
        vitals: {
          respiration: { value: '8회/분 (불규칙)', status: 'critical', label: '호흡수' },
          pulse: { value: '48bpm (서맥)', status: 'critical', label: '맥박' },
          capRefill: { value: '4초', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '의식 저하/경련', status: 'critical', label: '의식상태' },
        },
        findings: [
          '화학 테러 현장 — 지하철역 신경작용제 살포 상황',
          '전신 경련(generalized seizure) 발작 중',
          '침 과다 분비(hypersalivation) 및 동공 극도 축소(miosis)',
          '기관지 분비물 증가로 기도 위협, 호흡 부전 진행',
          '비보행 상태, SLUDGEM 증상 완전형',
        ],
        correctTriage: 'red',
        triageNote: '신경작용제 중증 노출 / 경련',
        explanation: '경련 + SLUDGEM 완전형 증상은 중증 신경작용제(사린, VX) 노출의 전형입니다. 즉각 Atropine 2mg IV 반복 투여 + Pralidoxime 1g IV, 벤조다이아제핀(Diazepam)으로 경련 조절이 필요합니다. 기도 확보와 흡인 제거가 최우선. RED 분류 후 제염 → 해독제 → 기관삽관 순서로 진행합니다.'
      },
      {
        id: 'P-020',
        name: '송지은',
        age: 33,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '22회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '96bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료, 불안', status: 'normal', label: '의식상태' },
        },
        findings: [
          '지하철 신경작용제 살포 현장에서 자력 대피',
          '양안 축동(miosis)으로 시야 흐림, 눈 통증 호소',
          '경도 비루(rhinorrhea) 및 가슴 답답함',
          '보행 가능하나 불안 심함',
          '경미한 노출 — 증상 악화 감시 필요',
        ],
        correctTriage: 'yellow',
        triageNote: '신경작용제 경미 노출 / 증상 감시',
        explanation: '보행 가능하고 활력징후 안정적이나, 신경작용제 노출 환자는 시간 경과에 따라 증상이 악화될 수 있어 단순 GREEN이 아닌 YELLOW로 분류합니다. 동공 축소와 분비물 증가는 경미 노출의 초기 징후이며, Atropine 점안제 및 경구 투여를 고려하고 30분 간격 재평가가 필수입니다.'
      },
      {
        id: 'P-021',
        name: '박준혁',
        age: 27,
        gender: '남',
        icon: '👨‍🦱',
        vitals: {
          respiration: { value: '34회/분', status: 'critical', label: '호흡수' },
          pulse: { value: '132bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '5초', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '혼미', status: 'warning', label: '의식상태' },
        },
        findings: [
          'IED 폭발 사고 — 파편에 의한 다발성 관통상',
          '우측 대퇴부 개방성 골절, 지속적 동맥 출혈',
          '피하기종 촉지, 좌측 흉부 둔탁음',
          '얼굴과 상지 다수 파편 박힘',
          '출혈성 쇼크 초기 징후 — 빈맥, 빈호흡, 의식 혼미',
        ],
        correctTriage: 'red',
        triageNote: '폭발 외상 / 다발 관통상 / 출혈성 쇼크',
        explanation: '호흡수 34회/분(>30) → 즉시(RED). 다발성 관통상 + 동맥 출혈 + 모세혈관 재충전 5초는 출혈성 쇼크의 명백한 징후입니다. 지혈대(tourniquet) 즉시 적용, 손상통제 소생술(DCR: 1:1:1 혈액 제제, TXA 1g IV), 흉부 감압 고려. 골든타임 내 손상통제 수술(DCS) 시설로 이송이 필요합니다.'
      },
      {
        id: 'P-022',
        name: '이하나',
        age: 38,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '24회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '110bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '혼돈, 구토 지속', status: 'warning', label: '의식상태' },
        },
        findings: [
          '원전 사고 현장 — 고선량 방사선 피폭 추정',
          '피폭 후 30분 이내 구토 발현(TTE <1시간 = ≥6 Gy 추정)',
          '급격한 피로감, 두통, 설사 동반',
          '외부 상처 없음, 피부 홍반 서서히 진행',
          '림프구 수 급격 감소 예상 — 조혈 증후군 고위험',
        ],
        correctTriage: 'red',
        triageNote: '방사선 피폭 / ARS 고선량 (≥6 Gy)',
        explanation: '구토 발현 시간(Time to Emesis, TTE)이 피폭 선량의 가장 중요한 조기 지표입니다. 1시간 이내 구토는 ≥6 Gy 이상 고선량 피폭을 시사하며, 조혈 증후군(Hematopoietic syndrome) + 위장관 증후군의 중첩이 예상됩니다. 제염 후 즉시 CBC/림프구 연속 측정, 조혈모세포 이식 준비, RED 분류가 필수입니다.'
      },
      {
        id: 'P-023',
        name: '정민수',
        age: 55,
        gender: '남',
        icon: '👨‍🦳',
        vitals: {
          respiration: { value: '28회/분', status: 'warning', label: '호흡수' },
          pulse: { value: '118bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '3초', status: 'warning', label: '모세혈관 재충전' },
          consciousness: { value: '명료, 극심한 통증', status: 'normal', label: '의식상태' },
        },
        findings: [
          '화학 공격 현장 — 겨자 가스(Mustard gas) 노출 의심',
          '전신 체표면적 25% 수포성 화상(vesicant burn)',
          '양안 결막 충혈 및 시력 저하, 안검 부종',
          '상기도 자극 증상 — 쉰 목소리, 기침',
          '노출 후 2-6시간 경과하여 증상 본격 발현',
        ],
        correctTriage: 'red',
        triageNote: '수포작용제(겨자가스) / 광범위 수포',
        explanation: '겨자 가스(Sulfur mustard)는 노출 후 2-24시간 잠복기를 거쳐 증상이 발현됩니다. 25% 이상 체표면적 수포는 대량 수액 소생이 필요하며, 상기도 증상은 기도 부종 진행 위험을 시사합니다. 특이 해독제는 없으며 대증 치료(수포 드레싱, 안구 세척, 기관지확장제)가 핵심. RED 분류 후 화상센터 이송이 필요합니다.'
      },
      {
        id: 'P-024',
        name: '윤서연',
        age: 24,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '36회/분', status: 'critical', label: '호흡수' },
          pulse: { value: '126bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '4초', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '반응 있음', status: 'normal', label: '의식상태' },
        },
        findings: [
          '밀폐 공간 폭발 — 지하철 역사 내 IED 폭발',
          '양측 폐 청진 시 수포음(crackles), 호흡곤란 급격 악화',
          '양측 고막 파열 확인 — 혈성 이루',
          '외관상 경미한 상처만 보이나 내부 손상 심각',
          '복부 팽만 — 장관 파열(hollow viscus injury) 의심',
        ],
        correctTriage: 'red',
        triageNote: '폭발성 폐 (Blast Lung) / 1차 폭발 손상',
        explanation: '호흡수 36회/분(>30) → RED. 밀폐 공간 폭발에서 Primary blast injury(1차 폭발 손상)는 공기 포함 장기(폐, 고막, 장관)를 선택적으로 손상시킵니다. Blast lung(폐 출혈 + 기흉 + ARDS)은 가장 치명적인 1차 손상으로, 외관상 정상으로 보여도 수 시간 내 급격히 악화될 수 있습니다. 고유량 산소, 양압 환기 주의(기흉 악화 위험), 흉관 삽관 대비가 필요합니다.'
      },
      {
        id: 'P-025',
        name: '최은별',
        age: 6,
        gender: '여',
        icon: '👧',
        vitals: {
          respiration: { value: '없음→구조호흡후 재개', status: 'critical', label: '호흡수' },
          pulse: { value: '140bpm', status: 'warning', label: '맥박' },
          capRefill: { value: '3초', status: 'warning', label: '모세혈관 재충전' },
          consciousness: { value: '울음/반응 있음', status: 'normal', label: '의식상태' },
        },
        findings: [
          '6세 여아, 화학 재난 현장에서 무호흡 상태로 발견',
          'JumpSTART 프로토콜: 5회 구조 호흡 시도 → 호흡 재개',
          '동공 축소(miosis) 및 분비물 증가',
          '울음으로 반응, 의식 회복 중',
          '신경작용제 노출 소아 — 체중 기반 해독제 용량 조절 필요',
        ],
        correctTriage: 'red',
        triageNote: 'JumpSTART / 신경작용제 노출 소아',
        explanation: 'JumpSTART 프로토콜: 무호흡 소아에서 5회 구조 호흡 시도 → 호흡 재개 → RED 분류. 소아의 무호흡은 저산소증이 원인인 경우가 많아 환기만으로 회복 가능합니다. 신경작용제 노출 소아는 체중 기반 Atropine 용량(0.05mg/kg) 조절이 필수이며, 성인 용량의 과량 투여는 위험합니다. 소아 전용 해독제 키트 준비가 필요합니다.'
      },
      {
        id: 'P-026',
        name: '한소희',
        age: 30,
        gender: '여',
        icon: '👩',
        vitals: {
          respiration: { value: '30회/분', status: 'critical', label: '호흡수' },
          pulse: { value: '120bpm', status: 'critical', label: '맥박' },
          capRefill: { value: '3초', status: 'warning', label: '모세혈관 재충전' },
          consciousness: { value: '명료, 극심한 불안', status: 'normal', label: '의식상태' },
        },
        findings: [
          '산업 화재 현장 — 유독 가스 + 연기 흡입 환자',
          '쉰 목소리(hoarseness) 급격 악화, 천명음(stridor) 출현',
          '안면부 및 구강 내 그을음, 코털 소실',
          '체표면적 20% 2도 화상 (안면, 경부, 상지)',
          '기도 부종 급속 진행 중 — 30분 내 완전 폐쇄 위험',
        ],
        correctTriage: 'red',
        triageNote: '흡입 손상 / 기도 긴급',
        explanation: '쉰 목소리 + 천명음(stridor) + 안면 화상 + 그을음은 흡입 손상(inhalation injury)의 임상 3대 징후입니다. 기도 부종은 화상 후 6-24시간에 걸쳐 진행되며, stridor 출현은 기도 내경이 50% 이상 좁아졌음을 의미합니다. 조기 기관삽관(RSI)이 생명을 구하며, 지연 시 삽관 불가능해질 수 있습니다. RED 분류 즉시 기관삽관 준비.'
      },
      {
        id: 'P-027',
        name: '조영재',
        age: 48,
        gender: '남',
        icon: '👨',
        vitals: {
          respiration: { value: '18회/분', status: 'normal', label: '호흡수' },
          pulse: { value: '84bpm', status: 'normal', label: '맥박' },
          capRefill: { value: '2초', status: 'normal', label: '모세혈관 재충전' },
          consciousness: { value: '명료', status: 'normal', label: '의식상태' },
        },
        findings: [
          '원전 사고 현장 — 원거리 노출, 저선량 피폭 추정',
          '피폭 후 6시간 이후 경미한 구역감 발현 (TTE >6h = <2 Gy)',
          '자력 보행 가능, 활력징후 안정',
          '외상 없음, 피부 정상',
          '정기적 CBC 추적 및 선량 평가 필요',
        ],
        correctTriage: 'green',
        triageNote: '방사선 저선량 피폭 / 경증 ARS',
        explanation: '구토 발현 시간(TTE) 6시간 이후는 저선량 피폭(<2 Gy)을 시사하며, 보행 가능 + 활력징후 안정 → GREEN 분류. 그러나 방사선 피폭자는 잠복기 후 증상이 악화될 수 있으므로, CBC(특히 림프구 절대 수)를 4시간 간격으로 추적하고 48시간 림프구 감소 패턴으로 정확한 선량을 추정합니다. GREEN 구역에서 정기 재평가가 필수입니다.'
      },
      {
        id: 'P-028',
        name: '배수정',
        age: 60,
        gender: '여',
        icon: '👩‍🦳',
        vitals: {
          respiration: { value: '없음', status: 'critical', label: '호흡수' },
          pulse: { value: '없음', status: 'critical', label: '맥박' },
          capRefill: { value: '측정불가', status: 'critical', label: '모세혈관 재충전' },
          consciousness: { value: '무반응', status: 'critical', label: '의식상태' },
        },
        findings: [
          '신경작용제 대량 노출 현장 — 심폐정지 상태로 발견',
          '기도 개방 후에도 자발호흡 없음',
          'Atropine 4mg IV 초기 투여에 무반응',
          '동공 고정, 경동맥 맥박 촉지 불가',
          'CBRN 대량 사상자 상황: 의료진 2명, 잔여 환자 45명 대기',
        ],
        correctTriage: 'black',
        triageNote: 'CBRN MCI / 심폐정지 + 해독제 무반응',
        explanation: 'CBRN 대량 사상자 상황에서 심폐정지 + 초기 해독제(Atropine) 무반응 환자는 Black(Expectant) 분류 대상입니다. 이는 평상시 기준(Conventional Standards)이 아닌 위기 기준(Crisis Standards of Care)의 적용입니다. 2명의 의료진이 45명의 생존 가능 환자를 치료해야 하므로, 자원 집중이 불가피합니다. 자원 여유 발생 시 재평가하며, 모든 결정은 반드시 기록합니다.'
      },
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
  },
  // ============================================
  // NEW CBRNE SCENARIOS
  // ============================================
  {
    id: 'nuclear',
    title: '원자력 발전소 사고',
    type: 'Nuclear (N)',
    icon: '⚛️',
    description: '후쿠시마형 원자력 발전소 냉각 시스템 고장으로 방사성 물질 대량 누출이 발생했습니다. 반경 30km 지역 주민 약 15만 명에 대한 보호 조치와 의료 대응이 필요합니다.',
    steps: [
      {
        id: 1,
        title: '즉각적 보호 조치 결정',
        desc: '거리에 따른 구역별 대피(evacuation) 또는 실내 대피(shelter-in-place) 명령 발령. 10km 이내는 즉각 대피, 10~30km는 실내 대피 후 상황에 따라 대피 전환',
        correct: 1
      },
      {
        id: 2,
        title: '방사선 모니터링 네트워크 가동',
        desc: '주변 환경 방사선량 측정(γ선량률 측정), 기상 데이터(풍향·풍속) 연계로 오염 확산 예측, 핫스팟 지도 작성',
        correct: 2
      },
      {
        id: 3,
        title: '안정 요오드(KI) 배포',
        desc: '방사성 요오드(¹³¹I) 흡입으로 인한 갑상선 피폭 방지를 위해 요오드화칼륨(KI) 배포 및 복용 지시. 40세 미만 우선 투여, 투여 시점 중요(누출 전후 24시간 이내)',
        correct: 3
      },
      {
        id: 4,
        title: '급성방사선증후군(ARS) 분류 및 치료',
        desc: '증상 발현 시각 기록으로 피폭 선량 추정(구토 1시간 이내: 고선량). 혈액 검사(CBC, 림프구 절대 수), 중증도별 분류(경증/중등도/중증/사망), 조혈모세포 이식 준비',
        correct: 4
      },
      {
        id: 5,
        title: '외부 오염 제염 및 내부 오염 평가',
        desc: '탈의(의복 제거만으로 90% 제염), 비누 세척, 전신 방사선 오염 측정기 서베이. 방사성 세슘·요오드 흡입 시 내부 오염 평가 (전신계수기, WBC)',
        correct: 5
      },
      {
        id: 6,
        title: '장기 건강 모니터링 체계 수립',
        desc: '갑상선암·백혈병·고형암 장기 추적 등록부 운영. 피폭 선량 개인 기록 보관. 정신건강(방사선 공포, 낙인 문제) 지원 체계 구축. 국제원자력기구(IAEA) 협력',
        correct: 6
      }
    ]
  },
  {
    id: 'explosive',
    title: '지하철 폭발물 테러',
    type: 'Explosive (E)',
    icon: '💥',
    description: '출근 시간대 도심 지하철역에서 즉석폭발물(IED)이 폭발하여 다수 사상자가 발생했습니다(런던 2005년 유형). 밀폐 공간 특성상 과압파 손상이 심각하며 이차 폭발물 위협도 존재합니다.',
    steps: [
      {
        id: 1,
        title: '현장 안전 확보 및 이차 폭발물 확인',
        desc: '폭발물처리반(EOD)이 이차 장치(secondary device) 유무 확인. 안전 확인 전 의료진 진입 금지. 경찰·소방·의료 간 통합 지휘소(Unified Command) 설치',
        correct: 1
      },
      {
        id: 2,
        title: '구역 설정 및 접근 통제',
        desc: 'Hot Zone(즉각 위험 구역, EOD·소방 전담) / Warm Zone(의료 처치 구역) / Cold Zone(Triage 후방, 가족대기·언론 구역) 설정. 단일 진입·출구 경로 지정',
        correct: 2
      },
      {
        id: 3,
        title: '1차 폭발 손상 평가',
        desc: '압력파(blast wave)에 의한 Primary blast injury 우선 평가: 폐 손상(blast lung — 청진 시 수포음), 고막 파열, 장관 파열 증상. 외관상 정상인 환자도 내부 손상 가능성 높음',
        correct: 3
      },
      {
        id: 4,
        title: 'Triage 시행 및 분류 구역 운영',
        desc: 'START Triage로 중증도 분류. RED/YELLOW/GREEN/BLACK 구역 설치. 밀폐 공간 특성으로 흡입 손상 환자 다수 예상. 파편 손상(2차)과 압좌(3차)도 함께 평가',
        correct: 4
      },
      {
        id: 5,
        title: '손상통제 소생술(DCR) 및 손상통제 수술(DCS)',
        desc: '과다 출혈 환자에 대한 손상통제 소생술: 1:1:1 혈액 제제(적혈구:신선동결혈장:혈소판), TXA 조기 투여. 즉각 생명 위협 손상만 처치 후 전원(Damage Control Surgery)',
        correct: 5
      },
      {
        id: 6,
        title: '대량 환자 이송 조정',
        desc: '병원별 수용 능력 사전 파악(HEMS·지역 의료기관 공조). 손상 유형(흉부 외상, 신경계 손상)에 따른 적정 병원 배분. 추가 이송 자원(버스·특수차량) 동원. 가족 확인 체계 운영',
        correct: 6
      }
    ]
  },
  // ============================================
  // NEW CBRNE SCENARIOS (CBRN Special Disaster)
  // ============================================
  {
    id: 'CB-006',
    type: 'chemical',
    title: '신경작용제 지하철 테러 대응',
    scenario: '출근 시간대 도심 지하철역에서 원인 불명의 액체가 살포되어 50명 이상이 쓰러졌습니다. 경련, 동공 축소, 과다 분비물 등 신경작용제 노출 증상이 보고되고 있습니다. 도쿄 지하철 사린 테러(1995년)와 유사한 상황입니다.',
    icon: '☠️',
    steps: [
      {
        id: 1,
        desc: '신경작용제 의심 인지 및 즉각 경보 발령. SLUDGEM/DUMBELS 증상 패턴 확인. 지하철 환기 시스템 차단 요청. 풍상측에서 접근, 최소 100m 안전거리 확보',
        options: [
          { id: 'a', text: '즉시 지하철역 진입하여 환자 구출 시작', correct: false },
          { id: 'b', text: 'SLUDGEM 증상 패턴 확인 후 신경작용제 의심 경보, 풍상측 접근 및 안전거리 확보', correct: true },
          { id: 'c', text: '검체 수집을 위해 현장 보존 우선', correct: false },
          { id: 'd', text: '증상이 있는 환자만 선별적으로 구출', correct: false },
        ]
      },
      {
        id: 2,
        desc: 'Hot/Warm/Cold Zone 설정 및 PPE 착용. Hot Zone(지하철역 내부): Level A PPE + SCBA 필수. Warm Zone(역 출구 주변): 제염 라인 설치. Cold Zone(풍상측 300m): Triage·치료·지휘소',
        options: [
          { id: 'a', text: 'Level C PPE로 Hot Zone 진입', correct: false },
          { id: 'b', text: 'Hot Zone에 Level A PPE, Warm Zone에 제염 라인, Cold Zone에 지휘소 설치', correct: true },
          { id: 'c', text: '구역 설정 없이 역 출구에서 바로 치료 시작', correct: false },
          { id: 'd', text: '전문 HAZMAT 팀 도착까지 모든 활동 중단', correct: false },
        ]
      },
      {
        id: 3,
        desc: '환자 구출 및 즉석 대량 제염(Mass Decontamination). 탈의(90% 오염 제거) → 대량 물 세척(Warm Zone) → 제염 확인. 보행 가능 환자는 스스로 제염 라인 통과 유도',
        options: [
          { id: 'a', text: '제염 없이 바로 병원 이송', correct: false },
          { id: 'b', text: '탈의 → 대량 물 세척 → 제염 확인 순서로 진행, 보행 가능자 자가 제염 유도', correct: true },
          { id: 'c', text: '중증 환자만 선별적으로 제염', correct: false },
          { id: 'd', text: '모든 환자를 한꺼번에 물로 세척', correct: false },
        ]
      },
      {
        id: 4,
        desc: '해독제 투여 결정. 경련 환자: Atropine 2mg IV 반복(분비물 건조까지) + 2-PAM 1g IV + Diazepam 10mg IV. 경미 노출(축동만): Atropine 점안제. 중등도(SLUDGEM): Atropine 2mg IM, 필요 시 반복',
        options: [
          { id: 'a', text: '모든 환자에게 동일 용량 Atropine 투여', correct: false },
          { id: 'b', text: '해독제 투여 전 물질 확인 검사 결과 대기', correct: false },
          { id: 'c', text: '중증도별 Atropine + 2-PAM + Diazepam 차등 투여, 분비물 건조를 종점으로 반복 투여', correct: true },
          { id: 'd', text: 'Atropine만 투여, 2-PAM은 병원에서 시작', correct: false },
        ]
      },
      {
        id: 5,
        desc: '제염 완료 환자 Triage 및 병원 이송. 경련/호흡부전 → RED, SLUDGEM + 비보행 → RED, 축동/경미 증상 + 보행 → YELLOW, 무증상 노출 → GREEN. 병원에 사전 통보(SBAR): 물질, 환자 수, 중증도, 제염 여부',
        options: [
          { id: 'a', text: '모든 노출자를 동일하게 RED로 분류하여 이송', correct: false },
          { id: 'b', text: '증상 중증도별 Triage 분류 후 SBAR로 병원 사전 통보, 제염 완료 확인 후 이송', correct: true },
          { id: 'c', text: '보행 가능자는 자가 병원 방문 안내', correct: false },
          { id: 'd', text: '가장 가까운 병원 1곳에 전원 이송', correct: false },
        ]
      },
    ],
    debrief: '1995년 도쿄 지하철 사린 테러에서는 현장 제염 체계 부재로 병원 2차 오염이 발생했습니다. 핵심 교훈: ① 현장 안전이 환자 구조보다 우선(PPE 없는 진입 금지), ② 탈의만으로 90% 제염, ③ Atropine은 분비물 건조를 종점으로 반복 투여(최대 수십 mg 가능), ④ 2-PAM은 "에이징(aging)" 전 조기 투여가 핵심, ⑤ 병원 사전 통보로 2차 오염 방지.'
  },
  {
    id: 'CB-007',
    type: 'radiological',
    title: '더티밤(RDD) 항구 폭발 대응',
    scenario: '국제 무역항에서 방사성 물질이 포함된 즉석폭발물(더티밤, Radiological Dispersal Device)이 폭발했습니다. 폭발 부상자와 방사능 오염자가 혼재하며, 항만 근로자와 시민 약 80명이 피해를 입었습니다. 방사선량 측정기에서 정상 이상의 수치가 감지되고 있습니다.',
    icon: '☢️',
    steps: [
      {
        id: 1,
        desc: '방사선 위협 인지 및 구역 설정. 방사선량 측정기(survey meter)로 오염 범위 파악. 시간-거리-차폐 원칙 적용. Hot Zone(높은 선량 구역) / Warm Zone(제염 구역) / Cold Zone(안전 구역) 설정',
        options: [
          { id: 'a', text: '폭발이므로 일반 폭발 대응 프로토콜만 적용', correct: false },
          { id: 'b', text: '방사선 측정 후 시간-거리-차폐 원칙으로 구역 설정, 풍향 고려', correct: true },
          { id: 'c', text: '전 지역 대피 명령 발령 후 대응 시작', correct: false },
          { id: 'd', text: '방사선 전문팀 도착까지 현장 대기', correct: false },
        ]
      },
      {
        id: 2,
        desc: '폭발 부상 우선 처치(생명 위협 우선). IAEA 원칙: 방사능 오염이 있어도 생명 위협 외상은 먼저 치료. "오염된 환자는 위험한 환자가 아닌, 치료가 필요한 환자"',
        options: [
          { id: 'a', text: '제염 완료 전까지 모든 의료 처치 보류', correct: false },
          { id: 'b', text: '방사능 오염 여부와 무관하게 생명 위협 외상 우선 처치', correct: true },
          { id: 'c', text: '방사능 오염 환자는 별도 구역에서만 치료', correct: false },
          { id: 'd', text: '오염 수치가 높은 환자부터 치료', correct: false },
        ]
      },
      {
        id: 3,
        desc: '제염 실시. 탈의(90% 오염 제거) → 비누와 물로 전신 세척 → 방사선 서베이로 잔여 오염 확인. 오염된 상처는 생리식염수로 관류. 내부 오염 평가(전신계수기)',
        options: [
          { id: 'a', text: '특수 화학 제염제로 세척', correct: false },
          { id: 'b', text: '탈의 → 비누·물 세척 → 서베이 확인, 오염 상처는 생리식염수 관류', correct: true },
          { id: 'c', text: '물 세척만으로 충분, 서베이 불필요', correct: false },
          { id: 'd', text: '피부를 강하게 문질러 오염 제거', correct: false },
        ]
      },
      {
        id: 4,
        desc: 'ARS 위험도 평가 및 분류. 구토 발현 시간(TTE) 기록: <1h = 고선량, 1-4h = 중등도, >6h = 저선량. CBC/림프구 4시간 간격 추적. 고선량 의심 → RED',
        options: [
          { id: 'a', text: '방사선량 측정기 수치만으로 분류', correct: false },
          { id: 'b', text: '구토 발현 시간(TTE) 기록 + CBC 연속 추적으로 피폭 선량 추정 및 분류', correct: true },
          { id: 'c', text: '모든 노출자를 동일하게 입원 관찰', correct: false },
          { id: 'd', text: '증상 없는 노출자는 즉시 귀가', correct: false },
        ]
      },
      {
        id: 5,
        desc: '심리사회적 대응 및 대중 소통. 더티밤의 최대 위협은 방사선 자체보다 심리적 공포. 정확한 정보 제공으로 공황 방지. 노출자 등록부 운영, 장기 추적 체계 수립',
        options: [
          { id: 'a', text: '방사능 위험을 최소화하여 발표', correct: false },
          { id: 'b', text: '투명하고 정확한 정보 공개, 노출자 등록 및 장기 추적 체계 수립', correct: true },
          { id: 'c', text: '검사 결과가 나올 때까지 정보 비공개', correct: false },
          { id: 'd', text: '전문가만 이해할 수 있는 기술적 설명 제공', correct: false },
        ]
      },
    ],
    debrief: '더티밤(RDD)은 방사선 자체의 건강 피해보다 심리적 공포, 경제적 혼란, 도시 기능 마비가 더 큰 위협입니다. IAEA 핵심 원칙: "방사능 오염 환자도 일반 외상 환자와 동일하게 생명 위협 우선 치료". 탈의만으로 90% 제염이 가능하고, 구토 발현 시간(TTE)이 피폭 선량의 가장 빠른 지표입니다. 위기 소통에서 투명성이 공황 방지의 핵심입니다.'
  },
  {
    id: 'CB-008',
    type: 'biological',
    title: '의심 생물 재난 — 탄저균 의심 백색 분말',
    scenario: '도심 정부 청사에서 의심스러운 백색 분말이 포함된 소포가 발견되었습니다. 이미 3명의 직원이 분말에 직접 노출되었고, 건물 내 약 200명이 동일 공간에 있었습니다. SEIRV 모델에 따른 역학적 대응과 의료 대응이 동시에 필요합니다.',
    icon: '🦠',
    steps: [
      {
        id: 1,
        desc: 'Identify-Isolate-Inform(3I) 원칙 적용. 생물 위협 인지 → 현장 즉시 격리(봉쇄) → HVAC 차단 → 보건 당국 신고. 노출자 이동 금지, 명단 작성 시작',
        options: [
          { id: 'a', text: '분말을 수거하여 가까운 병원으로 가져감', correct: false },
          { id: 'b', text: '현장 격리 + HVAC 차단 + 보건당국 신고 + 노출자 명단 작성', correct: true },
          { id: 'c', text: '건물 전체 즉시 대피 명령', correct: false },
          { id: 'd', text: '분말 성분이 확인될 때까지 정상 업무 유지', correct: false },
        ]
      },
      {
        id: 2,
        desc: '검체 수집 및 분석. HAZMAT 팀이 Level B PPE 착용 후 검체 수집. 현장 신속 검사(lateral flow assay) + PCR 실험실 의뢰. 결과 확인까지 최악의 시나리오(탄저) 가정 대응',
        options: [
          { id: 'a', text: '일반 장갑으로 검체 수집하여 실험실 의뢰', correct: false },
          { id: 'b', text: 'HAZMAT 팀 Level B PPE로 검체 수집, 탄저 가정하에 대응 시작', correct: true },
          { id: 'c', text: '검사 결과를 기다린 후 대응 결정', correct: false },
          { id: 'd', text: '노출자 스스로 검체를 채취하여 제출', correct: false },
        ]
      },
      {
        id: 3,
        desc: '노출자 제염 및 예방적 항생제. 직접 노출자: 탈의 → 비누·물 세척 → Ciprofloxacin 500mg PO 또는 Doxycycline 100mg PO 즉시 시작. 동일 공간 간접 노출자: 항생제 시작, 검사 결과에 따라 조정',
        options: [
          { id: 'a', text: '검사 결과 확인 후 항생제 결정', correct: false },
          { id: 'b', text: '직접 노출자 제염 + 즉시 예방적 Ciprofloxacin/Doxycycline, 간접 노출자도 항생제 시작', correct: true },
          { id: 'c', text: '직접 노출자만 항생제, 간접 노출자는 증상 발현 시 시작', correct: false },
          { id: 'd', text: '광범위 항생제(Vancomycin) 정맥투여', correct: false },
        ]
      },
      {
        id: 4,
        desc: '역학 조사 및 접촉자 추적. SEIRV 모델: Susceptible → Exposed → Infected → Recovered/Vaccinated. 노출 시간·거리·방식 기록. 잠복기(1-60일) 내 증상 모니터링 체계 구축',
        options: [
          { id: 'a', text: '노출자 전원 입원 격리', correct: false },
          { id: 'b', text: 'SEIRV 모델 기반 접촉자 추적, 노출 세부사항 기록, 잠복기 증상 모니터링 체계 구축', correct: true },
          { id: 'c', text: '직접 노출자만 추적, 간접 노출자는 제외', correct: false },
          { id: 'd', text: '모든 접촉자에게 백신 즉시 접종', correct: false },
        ]
      },
      {
        id: 5,
        desc: '장기 추적 및 예방적 조치 완료. 탄저 확인 시: 60일 예방적 항생제 + AVA 백신 3회 접종. 정기 건강 검진. 심리 지원 프로그램 운영. 검사 음성 시에도 관찰 기간 유지',
        options: [
          { id: 'a', text: '항생제 7일 투여 후 종료', correct: false },
          { id: 'b', text: '60일 항생제 + AVA 백신 3회 + 정기 검진 + 심리 지원, 음성 시에도 관찰 유지', correct: true },
          { id: 'c', text: '백신만 접종하고 항생제 중단', correct: false },
          { id: 'd', text: '증상이 없으면 1주 후 모든 조치 해제', correct: false },
        ]
      },
    ],
    debrief: '2001년 미국 탄저균 우편 테러에서 배운 핵심 교훈: ① 생물 위협은 초기 인지가 어려워 "의심하면 즉시 대응" 원칙 적용, ② 탄저 포자는 수십 년 생존하므로 환경 제염이 중요, ③ 예방적 항생제 60일 투여의 순응도 관리가 과제, ④ 정보 투명성이 공황 방지와 협조 확보의 핵심. Identify-Isolate-Inform(3I) 원칙을 기억하세요.'
  },
  {
    id: 'CB-009',
    type: 'explosive',
    title: '산업 분진 폭발 + 대량 화상 환자 대응',
    scenario: '대규모 곡물 저장 시설에서 분진 폭발(dust explosion)이 발생했습니다. 1차 폭발 후 연쇄 폭발로 건물 일부가 붕괴되었으며, 60명 이상의 근로자가 폭발 손상과 광범위 화상을 입었습니다. 밀폐 공간 특성상 1차 폭발 손상(blast lung)이 다수 예상됩니다.',
    icon: '💥',
    steps: [
      {
        id: 1,
        desc: '현장 안전 확보 및 추가 폭발 위험 평가. 분진 폭발은 연쇄 폭발(secondary explosion) 위험이 매우 높음. EOD/소방과 협력하여 추가 분진 축적 확인. 안전 확인 전 의료진 진입 금지',
        options: [
          { id: 'a', text: '즉시 건물 진입하여 구조 시작', correct: false },
          { id: 'b', text: '소방/EOD와 협력하여 추가 폭발 위험 평가, 안전 확인 후 단계적 진입', correct: true },
          { id: 'c', text: '원거리에서 확성기로 자력 탈출 유도만 실시', correct: false },
          { id: 'd', text: '폭발 후 30분 경과했으므로 추가 위험 없다고 판단', correct: false },
        ]
      },
      {
        id: 2,
        desc: '폭발 손상 5단계 체계적 평가. Primary(압력파 → blast lung, 고막 파열, 장관 파열), Secondary(파편·비산물), Tertiary(몸이 날아가 충돌), Quaternary(화상·질식), Quinary(오염물질). 밀폐 공간에서는 Primary 빈도 증가',
        options: [
          { id: 'a', text: '외관상 보이는 손상만 평가', correct: false },
          { id: 'b', text: '5단계 폭발 손상(Primary~Quinary) 체계적 평가, 특히 외관상 정상인 blast lung 환자 경계', correct: true },
          { id: 'c', text: '화상 환자만 우선 평가', correct: false },
          { id: 'd', text: '고막 검사는 병원에서 실시', correct: false },
        ]
      },
      {
        id: 3,
        desc: '화상 환자 Triage 및 초기 처치. 9의 법칙(Rule of Nines)으로 TBSA 산정. 흡입 손상 3대 징후(코털 그을림, 쉰 목소리, 그을린 가래) 확인. Parkland 공식(4mL × kg × %TBSA) 수액 소생 시작. 조기 삽관 판단',
        options: [
          { id: 'a', text: '화상 부위에 냉수만 적용', correct: false },
          { id: 'b', text: 'Rule of Nines TBSA 산정, 흡입 손상 징후 확인, Parkland 공식 수액 소생, 필요 시 조기 삽관', correct: true },
          { id: 'c', text: '모든 화상 환자를 동일하게 치료', correct: false },
          { id: 'd', text: '화상 연고 도포 후 이송', correct: false },
        ]
      },
      {
        id: 4,
        desc: 'Blast lung 의심 환자 관리. 청진 시 양측 수포음, 혈성 객담, 저산소증. 고유량 산소 투여하되 양압 환기 시 주의(기흉 악화 위험). 흉관 삽관 준비. 외관상 정상인 환자도 24시간 관찰 필수',
        options: [
          { id: 'a', text: '산소 투여 후 증상 호전되면 귀가 처리', correct: false },
          { id: 'b', text: '고유량 산소 + 양압 환기 주의 + 흉관 삽관 대비, 외관 정상이라도 24시간 관찰', correct: true },
          { id: 'c', text: '즉시 양압 기계환기 시작', correct: false },
          { id: 'd', text: '고막 파열이 없으면 blast lung 가능성 배제', correct: false },
        ]
      },
      {
        id: 5,
        desc: '대량 화상 환자 분산 이송. 화상센터 수용 능력 확인, 중증 화상(>20% TBSA)은 화상센터로 직접 이송. 병원별 수용 능력에 따른 환자 배분. 이송 중 수액·진통·체온 관리 지속',
        options: [
          { id: 'a', text: '가장 가까운 병원에 전원 이송', correct: false },
          { id: 'b', text: '화상센터 수용 능력 확인 후 중증도별 분산 이송, 이송 중 수액·진통·체온 관리 지속', correct: true },
          { id: 'c', text: '모든 환자를 화상센터로만 이송', correct: false },
          { id: 'd', text: '경증 화상 환자는 현장에서 치료 완료 후 귀가', correct: false },
        ]
      },
    ],
    debrief: '산업 분진 폭발의 특성: ① 연쇄 폭발 위험이 매우 높아 현장 안전 확인이 최우선, ② 밀폐 공간에서 1차 폭발 손상(blast lung) 빈도가 개방 공간보다 수배 높음, ③ 화상 + 폭발 손상 복합 환자의 중증도는 산술적 합산 이상, ④ 외관상 정상인 blast lung 환자가 수 시간 후 급격히 악화될 수 있어 지연 재평가가 필수, ⑤ 대량 화상 환자는 화상센터 수용 능력 초과 시 비화상센터 분산이 불가피하며 원격 화상 전문의 자문이 유용합니다.'
  },
  {
    id: 'CB-010',
    type: 'chemical',
    title: '압좌 증후군(Crush Syndrome) — 지진 매몰자 구출',
    scenario: '규모 7.0 지진으로 다층 건물이 붕괴되어 다수의 생존자가 잔해 속에 매몰되어 있습니다. 구조대가 4시간 이상 하지가 압박된 매몰자를 발견했습니다. 잘못된 구출은 즉각적인 심정지를 유발할 수 있는 압좌 증후군(Crush Syndrome) 고위험 상황입니다.',
    icon: '🏚️',
    steps: [
      {
        id: 1,
        desc: '매몰자 평가 및 압좌 증후군 위험 판단. 압박 시간 4시간 이상, 대근육군(하지·둔부) 압박 → Crush Syndrome 고위험. 구출 전 의료팀 현장 배치 필수. 구조 안전 기사와 추가 붕괴 위험 공동 평가',
        options: [
          { id: 'a', text: '즉시 잔해 제거하여 신속 구출', correct: false },
          { id: 'b', text: '압박 시간·부위 확인, 의료팀 현장 배치, 구조 안전 기사와 위험 공동 평가 후 구출 계획 수립', correct: true },
          { id: 'c', text: '구출 후 병원에서 처치 시작', correct: false },
          { id: 'd', text: '압박 시간이 짧으면 위험 없으므로 바로 구출', correct: false },
        ]
      },
      {
        id: 2,
        desc: '구출 전 수액 공격 개시. 생리식염수 1-1.5L/h IV 투여 시작(압박 해제 전). 목표: 소변량 200-300mL/h 유지. 심전도 모니터 장착(고칼륨혈증 감시). 가능하면 중탄산나트륨 추가(소변 알칼리화)',
        options: [
          { id: 'a', text: '구출 후 수액 투여 시작', correct: false },
          { id: 'b', text: '구출 전 생리식염수 1-1.5L/h + 심전도 모니터 + 중탄산나트륨 준비', correct: true },
          { id: 'c', text: '포도당 수액으로 투여', correct: false },
          { id: 'd', text: '수액 없이 지혈대 적용 후 구출', correct: false },
        ]
      },
      {
        id: 3,
        desc: '압박 해제 및 즉각 모니터링. 압박 해제 시 K⁺·미오글로빈·젖산 등 독성 물질이 전신 순환에 방출. 심전도 지속 감시(고칼륨혈증 → 부정맥 → 심정지). 진갈색 소변(미오글로빈뇨) 확인. 즉각 이상 시 Calcium gluconate IV',
        options: [
          { id: 'a', text: '압박 해제 후 활력징후만 측정', correct: false },
          { id: 'b', text: '압박 해제와 동시에 심전도 집중 감시, 미오글로빈뇨 확인, 이상 시 즉각 Calcium gluconate IV', correct: true },
          { id: 'c', text: '압박 해제 후 안정 시까지 관찰만', correct: false },
          { id: 'd', text: '압박 해제와 함께 하지 거상', correct: false },
        ]
      },
      {
        id: 4,
        desc: '압좌 증후군 합병증 관리. 급성 신부전(미오글로빈에 의한 세뇨관 괴사) → 수액 공격 + 소변 알칼리화. 고칼륨혈증 → Calcium gluconate + 인슐린/포도당 + 카이엑살레이트. 구획증후군(compartment syndrome) → 근막절개술 고려',
        options: [
          { id: 'a', text: '신부전 징후 시 수액 제한', correct: false },
          { id: 'b', text: '적극적 수액 + 소변 알칼리화 + 고칼륨혈증 치료 + 구획증후군 시 근막절개술', correct: true },
          { id: 'c', text: '진통제 투여 후 경과 관찰', correct: false },
          { id: 'd', text: '투석 장비가 없으면 치료 불가', correct: false },
        ]
      },
      {
        id: 5,
        desc: '현장 투석 및 이송 결정. 현장 투석(portable dialysis) 가능 시 즉시 시작. 불가능 시 투석 가능 병원으로 긴급 이송. REMS 점수(Rapid Emergency Medicine Score)로 중증도 재평가. 다수 매몰자 시 구출 우선순위 결정',
        options: [
          { id: 'a', text: '모든 환자를 가장 가까운 병원으로 이송', correct: false },
          { id: 'b', text: '현장 투석 가능 시 시작, 불가 시 투석 가능 병원 긴급 이송, REMS로 중증도 재평가', correct: true },
          { id: 'c', text: '경증 환자만 이송, 중증은 현장 치료', correct: false },
          { id: 'd', text: '투석 없이 수액만으로 관리 가능', correct: false },
        ]
      },
    ],
    debrief: '압좌 증후군은 "구출이 곧 위기의 시작"인 역설적 상황입니다. 핵심 교훈: ① 구출 전 수액 공격이 생사를 가름(K⁺ 방출에 의한 심정지 예방), ② 미오글로빈뇨(진갈색 소변)는 신부전의 경고 신호, ③ 수액 목표 소변량 200-300mL/h, ④ 1995년 한신 대지진과 2023년 튀르키예 지진에서 압좌 증후군 환자의 조기 수액 투여가 사망률을 극적으로 낮췄습니다. 재난 의료팀은 매몰자 구출 현장에 반드시 IV 수액과 심전도 모니터를 준비해야 합니다.'
  },

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
  },
  // ============================================
  // NEW MCI SCENARIOS
  // ============================================
  {
    title: '다층 건물 붕괴 사고',
    description: '백화점 주차장 상부 구조물 붕괴 (삼풍백화점·마우나리조트 유형). 다층 건물 잔해에 다수 매몰자 발생, 구조 장비와 의료 자원 모두 한계 상황.',
    totalPatients: 65,
    resources: {
      ambulances: { total: 10, label: '구급차' },
      doctors: { total: 6, label: '현장 의사' },
      helicopters: { total: 3, label: '의료 헬기' },
      hospitals: { total: 4, label: '수용 병원' },
      rescueTeams: { total: 5, label: '구조대' },
      engineers: { total: 2, label: '구조안전기사' }
    },
    zones: { red: 18, yellow: 22, green: 17, black: 8 },
    decisions: [
      {
        question: '붕괴 잔해 속 생존자 구출 순서를 결정해야 합니다. 구조 안전 기사가 "추가 붕괴 가능성이 있다"고 경고했습니다. 어떻게 대응하시겠습니까?',
        options: [
          { id: 'a', text: '추가 붕괴 경고 무시, 즉시 구조 진행', correct: false },
          { id: 'b', text: '구조 활동 전면 중단, 안전 평가 완료까지 대기', correct: false },
          { id: 'c', text: '구조 안전 기사와 협력, 안전한 구역부터 우선 구조 진행 + 지속 모니터링', correct: true },
          { id: 'd', text: '자원봉사자 투입으로 인원 수 증가', correct: false }
        ],
        explanation: '건물 붕괴 현장에서는 구조 안전 전문가(structural engineer)와의 협력이 필수입니다. 추가 붕괴 위험은 구조자 안전을 위협하므로, 위험 구역을 확인하면서 안전한 구역부터 구조하는 전략이 최선입니다. 안전 무시는 구조자 추가 피해를 야기하고, 전면 중단은 골든타임을 놓칩니다.'
      },
      {
        question: '잔해 속에 4시간 이상 하지가 압박된 환자를 발견했습니다. 구출 전 의료팀이 취해야 할 우선 조치는?',
        options: [
          { id: 'a', text: '즉시 구출하여 빠르게 병원 이송', correct: false },
          { id: 'b', text: '구출 전 정맥 수액(생리식염수) 투여 시작, 심전도 모니터 장착', correct: true },
          { id: 'c', text: '진통제 투여 후 구출', correct: false },
          { id: 'd', text: '구출 후 활력징후 측정', correct: false }
        ],
        explanation: '압좌 증후군(Crush Syndrome)은 구출과 함께 압박 해제 시 근육 괴사 산물(K⁺, 미오글로빈)이 급격히 혈류에 방출되며 심정지·급성 신부전을 유발합니다. 구출 전 수액 공격 개시(1~1.5L/hr 생리식염수)와 심전도 모니터링이 필수입니다. "구출 = 의료 처치 시작"이 원칙입니다.'
      },
      {
        question: '인근 4개 병원 중 1곳(레벨1 외상센터)에 환자가 집중되어 수용 한계에 도달했습니다. 어떻게 이송 전략을 조정하시겠습니까?',
        options: [
          { id: 'a', text: '모든 RED 환자를 레벨1 센터로 계속 이송', correct: false },
          { id: 'b', text: '외상센터 이송 중단, 나머지 3개 병원에 골고루 분산', correct: false },
          { id: 'c', text: '병원 간 협의로 외상센터 수용 능력 재확인, YELLOW 환자는 다른 병원으로 우회', correct: true },
          { id: 'd', text: '원거리 상급병원으로 전원 전환', correct: false }
        ],
        explanation: '병원 과부하는 오히려 전체 대응 역량을 떨어뜨립니다. 가장 중증인 RED 환자는 레벨1 센터가 담당하되, 안정된 YELLOW 환자는 인근 다른 병원으로 우회하는 분산 전략이 최적입니다. 이를 위해 병원 간 실시간 소통(병원 지휘체계 HICS)이 필수입니다.'
      }
    ]
  },
  {
    title: '화학공장 폭발 및 독성 가스 유출',
    description: '구미 유형 화학공장 폭발 사고. 불화수소(HF) 등 독성 물질 유출, 바람에 따른 피해 확산. 공장 근로자·인근 주민 복합 피해.',
    totalPatients: 38,
    resources: {
      ambulances: { total: 7, label: '구급차' },
      doctors: { total: 4, label: '현장 의사' },
      helicopters: { total: 2, label: '의료 헬기' },
      hospitals: { total: 3, label: '수용 병원' },
      hazmat: { total: 2, label: 'HAZMAT 팀' },
      fireEngines: { total: 6, label: '소방차' }
    },
    zones: { red: 10, yellow: 14, green: 10, black: 4 },
    decisions: [
      {
        question: '현장 도착 시 풍향이 북동쪽입니다. 의료 지휘소와 Triage 구역 설치 위치는 어디가 적절합니까?',
        options: [
          { id: 'a', text: '공장 정문 앞 (가장 가까운 곳)', correct: false },
          { id: 'b', text: '공장 북동쪽 (풍하측)', correct: false },
          { id: 'c', text: '공장 남서쪽 (풍상측, 바람이 불어오는 반대 방향)', correct: true },
          { id: 'd', text: '공장 건물 내부', correct: false }
        ],
        explanation: '독성 가스 사고에서 의료 지휘소와 치료 구역은 반드시 풍상측(바람이 불어오는 방향의 반대쪽)에 설치해야 합니다. 풍하측에 설치하면 의료진과 미제염 환자 모두 가스에 2차 피폭됩니다. 풍향·풍속 정보는 소방청·기상청 실시간 연계로 지속 확인합니다.'
      },
      {
        question: '불화수소(HF) 피부 노출 환자가 다수 도착했습니다. 제염 전에 병원 응급실에 알려야 할 핵심 정보는?',
        options: [
          { id: 'a', text: '환자 수와 예상 도착 시간만 통보', correct: false },
          { id: 'b', text: '노출 물질(HF), 환자 수, 중증도, 제염 여부, 해독제 필요 여부를 모두 통보', correct: true },
          { id: 'c', text: '병원이 알아서 대비할 것이므로 별도 통보 불필요', correct: false },
          { id: 'd', text: '환자 도착 후 상황 설명', correct: false }
        ],
        explanation: 'HF 노출 환자는 응급실에서 Calcium gluconate 겔·주사 준비, 격리 병실, 특수 제염 공간이 필요합니다. 사전 통보 없이 제염 안 된 HF 환자가 도착하면 의료진 2차 오염과 응급실 오염이 발생합니다. 노출 물질, 중증도, 제염 여부 등 SBAR 형식의 사전 통보가 필수입니다.'
      },
      {
        question: '인근 마을 주민들이 눈·목·피부 자극을 호소하며 자발적으로 현장에 몰려들고 있습니다. 현장 의료팀의 우선 조치는?',
        options: [
          { id: 'a', text: '몰려드는 주민 모두 즉시 응급 치료 시작', correct: false },
          { id: 'b', text: '주민들을 풍상측 집결 지점으로 유도, Triage 후 증상 경중에 따라 분류·처치', correct: true },
          { id: 'c', text: '경증이므로 자택 대기 지시', correct: false },
          { id: 'd', text: '모두 인근 병원으로 즉시 이송', correct: false }
        ],
        explanation: '자발적으로 집결하는 피해 주민들은 응급 처치 전에 반드시 Triage를 거쳐야 합니다. 풍상측 안전 집결 지점 설정, GREEN 환자는 제염 후 관찰, RED/YELLOW는 의료 처치 후 병원 이송. 무분별한 집결은 현장 혼란 가중과 의료진 소진을 유발합니다.'
      }
    ]
  },
  {
    title: '팬데믹 의료 병상 위기',
    description: 'COVID-19 유형 팬데믹 급증기. 전국 병원 중환자실 가동률 95% 초과, 응급실 과밀화 극심. 지역 병원에서 의료 기준(Standards of Care) 전환 결정이 필요한 상황.',
    totalPatients: 120,
    resources: {
      icuBeds: { total: 8, label: '가용 중환자실 병상' },
      ventilators: { total: 6, label: '가용 인공호흡기' },
      doctors: { total: 12, label: '의료진' },
      nurses: { total: 24, label: '간호인력' },
      makeShift: { total: 1, label: '임시 생활치료센터' }
    },
    zones: { red: 22, yellow: 45, green: 48, black: 5 },
    decisions: [
      {
        question: '중환자실이 완전히 포화 상태입니다. 현재 적용해야 할 의료 기준(Standards of Care)은 무엇입니까?',
        options: [
          { id: 'a', text: '통상적 기준(Conventional): 평상시와 동일한 개인별 최적 치료', correct: false },
          { id: 'b', text: '비상 기준(Contingency): 일부 변경 허용, 동일 수준 결과 유지 노력', correct: false },
          { id: 'c', text: '위기 기준(Crisis Standards of Care): 전체 최대 다수의 생존을 위한 자원 배분', correct: true },
          { id: 'd', text: '자원 배분 없이 선착순 원칙 유지', correct: false }
        ],
        explanation: '의료 자원이 수요를 현저히 초과하는 상황에서는 Crisis Standards of Care(위기 기준)로 전환이 불가피합니다. 이는 개인 최적 치료 대신 "최대 다수의 최선의 결과"를 목표로 자원을 배분하는 원칙입니다. 이 전환은 법적·윤리적 근거 하에 투명하게 결정되어야 합니다.'
      },
      {
        question: '인공호흡기 6대에 필요한 환자가 12명입니다. 배분 우선순위 결정 방식으로 가장 윤리적·실용적인 것은?',
        options: [
          { id: 'a', text: '나이 기준: 젊은 환자 우선', correct: false },
          { id: 'b', text: '선착순: 먼저 도착한 환자 우선', correct: false },
          { id: 'c', text: '생존 가능성 기반 점수 체계(SOFA score 등) + 윤리위원회 검토', correct: true },
          { id: 'd', text: '의사 개인 판단으로 결정', correct: false }
        ],
        explanation: '위기 기준 하 인공호흡기 배분은 단순 나이·선착순이 아닌 의학적 생존 가능성 점수(SOFA, Sequential Organ Failure Assessment 등)를 기반으로 해야 합니다. 윤리위원회 검토와 투명한 절차가 의료진을 보호하고 사회적 신뢰를 유지합니다.'
      },
      {
        question: '경증 환자를 위한 임시 생활치료센터 운영 중 의료진이 "우리가 할 일이 아니다"라며 저항합니다. 리더로서 어떻게 대응하겠습니까?',
        options: [
          { id: 'a', text: '의료진 의사를 존중해 센터 운영 중단', correct: false },
          { id: 'b', text: '명령으로 강제 배치', correct: false },
          { id: 'c', text: '위기 의료의 목표와 개인의 역할을 설명하고, 교대 근무·지원 체계를 구체적으로 제시', correct: true },
          { id: 'd', text: '자원봉사자로 대체', correct: false }
        ],
        explanation: '위기 상황에서 의료진의 저항은 두려움·소진·정보 부족에서 비롯됩니다. 강제가 아닌 투명한 목표 공유, 명확한 역할 분담, 보호 자원(PPE, 교대 주기) 제공이 효과적입니다. TeamSTEPPS의 리더십 원칙: 심리적 안전 환경 조성이 팀 성과를 높입니다.'
      }
    ]
  },
  {
    title: '이태원형 군중 압사 사고',
    description: '할로윈 행사에 10만 명 이상 운집한 좁은 골목에서 군중 압사(crowd crush) 발생. 심정지 환자 다수 발생, 경찰·소방·의료 간 혼란스러운 현장.',
    totalPatients: 85,
    resources: {
      ambulances: { total: 12, label: '구급차' },
      doctors: { total: 8, label: '현장 의사' },
      helicopters: { total: 2, label: '의료 헬기' },
      hospitals: { total: 5, label: '수용 병원' },
      police: { total: 30, label: '경찰 인력' },
      bystanders: { total: 200, label: '자원봉사 시민' }
    },
    zones: { red: 30, yellow: 25, green: 20, black: 10 },
    decisions: [
      {
        question: '현장에는 경찰, 소방, 의료팀이 뒤섞여 각각 다른 지시를 내리고 있습니다. 현장 지휘 혼란을 해소하기 위한 첫 번째 조치는?',
        options: [
          { id: 'a', text: '가장 먼저 도착한 기관이 계속 지휘', correct: false },
          { id: 'b', text: '경찰·소방·의료 대표가 모여 통합 지휘관(Unified Commander) 결정 및 지휘소 단일화', correct: true },
          { id: 'c', text: '각 기관이 독립적으로 활동, 나중에 조율', correct: false },
          { id: 'd', text: '중앙 상황실의 지시가 올 때까지 대기', correct: false }
        ],
        explanation: '복합 기관이 참여하는 대형 사고에서는 단일 통합 지휘소(Unified Command, ICS의 핵심)가 필수입니다. 지휘 혼란은 자원 중복 투입, 사각 지대 발생, 의사소통 오류를 초래합니다. 이태원 참사의 핵심 교훈 중 하나가 초동 지휘체계 부재였습니다.'
      },
      {
        question: '심정지 환자가 30명 이상 발생했습니다. 현장 CPR 인력이 부족할 때 가장 효과적인 자원 배분은?',
        options: [
          { id: 'a', text: '전문 의료진만 CPR 시행, 일반 시민 접근 금지', correct: false },
          { id: 'b', text: '전문 의료진을 CPR 그룹 리더로 배치, 현장 시민들을 CPR 보조자로 즉시 훈련 투입', correct: true },
          { id: 'c', text: 'CPR 인력 도착까지 모든 심정지 환자 BLACK 분류', correct: false },
          { id: 'd', text: '한 명의 환자에게 모든 자원 집중', correct: false }
        ],
        explanation: '대량 심정지 상황에서 전문가만으로는 대응 불가능합니다. 현장 시민을 즉석 CPR 보조자로 활용(Bystander CPR)하고 전문 의료진은 그룹 리더로 배치하는 전략이 최대 생존을 가능하게 합니다. AED 위치 파악과 현장 배포도 동시에 진행합니다.'
      },
      {
        question: '부상자 가족들이 현장으로 몰려들어 구조 활동을 방해하고 있습니다. 이 상황을 어떻게 관리하겠습니까?',
        options: [
          { id: 'a', text: '경찰로 강제 퇴거 조치', correct: false },
          { id: 'b', text: '가족들이 들어오도록 허용', correct: false },
          { id: 'c', text: '현장 외부에 가족 대기소(Family Assistance Center) 설치, 정기 정보 업데이트 제공', correct: true },
          { id: 'd', text: '언론에 상황 공개해 자발적으로 물러나도록 유도', correct: false }
        ],
        explanation: '가족들의 현장 진입은 구조 활동 방해와 2차 피해를 유발합니다. 가족 지원 센터(Family Assistance Center)를 설치하여 정기적인 정보 제공, 심리 지원, 신원 확인을 체계적으로 운영하는 것이 최선입니다. 이는 이태원 참사 이후 강화된 재난 대응 표준입니다.'
      }
    ]
  },
  // ============================================
  // NEW MCI SCENARIOS (CBRN/Special Disaster)
  // ============================================
  {
    title: '지하철 신경작용제 화학 테러',
    situation: '출근 시간대 도심 지하철역에서 원인 불명의 액체가 살포되어 50명이 쓰러졌습니다. 경련 환자, 과다 분비물 환자, 보행 가능한 눈 통증 환자가 혼재. 현장 HAZMAT 팀 1개, 구급차 6대, 의료진 3명으로 대응해야 합니다.',
    totalPatients: 50,
    resources: {
      ambulances: { total: 6, label: '구급차' },
      doctors: { total: 3, label: '현장 의사' },
      hazmat: { total: 1, label: 'HAZMAT 팀' },
      hospitals: { total: 3, label: '수용 병원' },
      antidoteKits: { total: 30, label: 'Atropine 키트' },
    },
    zones: { red: 8, yellow: 15, green: 22, black: 5 },
    decisions: [
      {
        question: '현장 도착 시 지하철역에서 환자들이 계속 나오고 있습니다. 가장 먼저 수행해야 할 조치는?',
        options: [
          { id: 'a', text: '즉시 역사 내부로 진입하여 환자 구출', feedback: 'PPE 없이 진입하면 의료진이 추가 환자가 됩니다. 현장 안전이 최우선입니다.', correct: false },
          { id: 'b', text: 'Hot/Warm/Cold Zone 설정 및 풍상측 지휘소 설치, PPE 착용 후 단계적 진입', feedback: 'CBRN 현장에서 구역 설정과 PPE 확보가 최우선입니다. 안전 없이는 구조도 없습니다.', correct: true },
          { id: 'c', text: '보행 가능 환자부터 치료 시작', feedback: '제염 전 환자 접촉은 2차 오염 위험이 있습니다.', correct: false },
          { id: 'd', text: '물질 확인을 위해 검체 수집 우선', feedback: '물질 확인보다 환자 안전과 의료 대응이 우선합니다.', correct: false },
        ],
      },
      {
        question: 'Atropine 키트 30개로 50명 환자를 대응해야 합니다. 해독제 배분 전략은?',
        options: [
          { id: 'a', text: '모든 노출자에게 1키트씩 배분', feedback: '30키트로 50명 전원에게 배분 불가. 중증 환자는 여러 키트가 필요합니다.', correct: false },
          { id: 'b', text: '경련+호흡부전 환자에게 우선 다회 투여, 경미 노출자는 점안제/관찰', feedback: '중증 신경작용제 노출은 Atropine 수십 mg까지 필요할 수 있습니다. 중증도별 차등 배분이 핵심입니다.', correct: true },
          { id: 'c', text: '선착순 투여', feedback: '선착순은 가장 필요한 환자에게 해독제가 도달하지 못하게 합니다.', correct: false },
          { id: 'd', text: '추가 해독제 도착까지 투여 보류', feedback: '신경작용제 중독의 골든타임을 놓치면 사망률이 급격히 상승합니다.', correct: false },
        ],
      },
      {
        question: '제염이 완료되지 않은 환자가 호흡 정지 상태입니다. 병원 이송 결정은?',
        options: [
          { id: 'a', text: '제염 완료 후 이송', feedback: '호흡 정지 환자의 제염 대기는 사망을 의미합니다.', correct: false },
          { id: 'b', text: '즉석 제염(탈의 + 물 세척) 실시 → 동시에 Atropine 투여 및 기도 확보 → 제염 확인 후 이송, 병원에 미제염 가능성 사전 통보', feedback: '생명 위협 시 즉석 제염과 치료를 동시에 진행하고, 병원에 반드시 사전 통보합니다.', correct: true },
          { id: 'c', text: '미제염 상태로 바로 병원 이송', feedback: '미제염 환자의 무통보 이송은 병원 2차 오염을 유발합니다.', correct: false },
          { id: 'd', text: '자원 부족으로 Black 분류', feedback: '현재 자원으로 처치 가능한 환자를 포기하는 것은 적절하지 않습니다.', correct: false },
        ],
      },
    ]
  },
  {
    title: '더티밤(RDD) 항구 폭발 대응',
    situation: '국제 무역항에서 더티밤(방사능 분산 장치)이 폭발하여 80명이 부상당했습니다. 폭발 외상과 방사능 오염이 혼재하며, 항만 근로자와 인근 시민이 피해를 입었습니다. 방사선량 측정기에서 높은 수치가 감지되고 있습니다.',
    totalPatients: 80,
    resources: {
      ambulances: { total: 10, label: '구급차' },
      doctors: { total: 5, label: '현장 의사' },
      helicopters: { total: 2, label: '의료 헬기' },
      hospitals: { total: 4, label: '수용 병원' },
      radiationTeam: { total: 2, label: '방사선 전문팀' },
    },
    zones: { red: 15, yellow: 25, green: 32, black: 8 },
    decisions: [
      {
        question: '현장에서 대량 출혈 환자가 방사능 오염도 되어 있습니다. 치료 우선순위는?',
        options: [
          { id: 'a', text: '제염 완료 후 출혈 치료', feedback: '생명 위협 외상은 방사능 오염 여부와 무관하게 즉시 치료해야 합니다.', correct: false },
          { id: 'b', text: '생명 위협 외상 먼저 치료(지혈, 기도 확보), 동시에 가능한 범위 내 제염 진행', feedback: 'IAEA 원칙: 방사능 오염 환자도 생명 위협 외상은 즉시 치료. 오염된 환자는 위험한 환자가 아닙니다.', correct: true },
          { id: 'c', text: '방사선량이 낮아질 때까지 대기', feedback: '출혈 환자의 골든타임을 놓칩니다.', correct: false },
          { id: 'd', text: '방사능 오염 환자는 전문 시설로만 이송', feedback: '생명 위협 시 가장 가까운 적정 병원으로 이송이 원칙입니다.', correct: false },
        ],
      },
      {
        question: '폭발 현장 주변에서 시민 수백 명이 "방사능에 오염되었다"며 공황 상태에 빠졌습니다. 어떻게 대응하겠습니까?',
        options: [
          { id: 'a', text: '"방사능 위험은 없다"고 안심시킴', feedback: '불확실한 상황에서 거짓 안심은 신뢰를 파괴합니다.', correct: false },
          { id: 'b', text: '안전 집결 지점 설치, 방사선 스크리닝(서베이), 정확한 정보 제공, 필요 시 제염 안내', feedback: '체계적 스크리닝과 투명한 정보 제공이 공황을 줄이는 가장 효과적인 방법입니다.', correct: true },
          { id: 'c', text: '전원 병원 방문 권고', feedback: '수백 명이 병원으로 몰리면 의료 시스템이 마비됩니다.', correct: false },
          { id: 'd', text: '검사 결과가 나올 때까지 대기 지시', feedback: '불확실성 속 대기 지시는 공황을 악화시킵니다.', correct: false },
        ],
      },
      {
        question: '구토 발현 시간(TTE)이 30분 이내인 환자가 2명 발견되었습니다. 어떤 조치가 필요합니까?',
        options: [
          { id: 'a', text: '일반 구토 환자와 동일하게 대증 치료', feedback: 'TTE 30분 이내는 매우 고선량(>8 Gy) 피폭을 시사하는 중대한 소견입니다.', correct: false },
          { id: 'b', text: 'TTE 기록, 즉시 RED 분류, CBC/림프구 추적 시작, 조혈모세포 이식 가능 센터에 사전 연락', feedback: 'TTE <1h는 ≥6 Gy 고선량 피폭을 시사합니다. 조기 CBC 추적과 전문센터 연결이 필수입니다.', correct: true },
          { id: 'c', text: '항구토제 투여 후 관찰', feedback: '구토 자체를 치료하는 것이 아니라 피폭 선량의 지표로 활용해야 합니다.', correct: false },
          { id: 'd', text: 'KI(요오드화칼륨) 투여', feedback: 'KI는 방사성 요오드 흡입 시에만 유효하며, 외부 피폭이나 다른 핵종에는 효과 없습니다.', correct: false },
        ],
      },
    ]
  },
  {
    title: '대규모 지진 — 압좌 손상 대량 환자',
    situation: '규모 7.0 강진으로 도심 다층 건물 다수가 붕괴되었습니다. 매몰자 추정 300명 이상, 현재까지 구출된 45명 중 다수가 4시간 이상 하지·둔부 압박 후 구출되어 압좌 증후군(Crush Syndrome) 고위험 상태입니다. 투석 장비와 수액 재고가 제한적입니다.',
    totalPatients: 45,
    resources: {
      ambulances: { total: 8, label: '구급차' },
      doctors: { total: 4, label: '현장 의사' },
      rescueTeams: { total: 6, label: '구조대' },
      hospitals: { total: 3, label: '수용 병원(투석 가능 1곳)' },
      ivFluids: { total: 100, label: '수액(L)' },
    },
    zones: { red: 15, yellow: 18, green: 8, black: 4 },
    decisions: [
      {
        question: '구조대가 잔해 속 생존자를 발견했습니다. 6시간 이상 하지 압박 상태입니다. 구출 전 의료팀의 첫 번째 조치는?',
        options: [
          { id: 'a', text: '즉시 잔해 제거하여 최대한 빠르게 구출', feedback: '수액 투여 없이 구출하면 압박 해제 시 K⁺ 방출로 심정지 위험이 있습니다.', correct: false },
          { id: 'b', text: '구출 전 IV 수액(생리식염수 1-1.5L/h) 투여 시작 + 심전도 모니터 장착', feedback: '"구출 = 의료 처치 시작". 수액 공격과 심전도 모니터링이 구출 전 필수입니다.', correct: true },
          { id: 'c', text: '구출 후 병원에서 수액 투여', feedback: '구출과 병원 이송 사이에 심정지가 발생할 수 있습니다.', correct: false },
          { id: 'd', text: '하지에 지혈대 적용 후 구출', feedback: '지혈대는 수액 대안이 될 수 없으며, 추가 허혈 손상을 악화시킵니다.', correct: false },
        ],
      },
      {
        question: '수액 100L로 압좌 증후군 고위험 환자 15명을 관리해야 합니다. 수액 배분 전략은?',
        options: [
          { id: 'a', text: '15명에게 균등 배분(6-7L/인)', feedback: '중증도에 따른 차등 배분이 필요합니다. 일부 환자는 더 많은 수액이 필요합니다.', correct: false },
          { id: 'b', text: '미오글로빈뇨·심전도 이상이 있는 환자에게 우선 배분, 무뇨 환자는 투석 가능 병원으로 긴급 이송', feedback: '미오글로빈뇨와 심전도 이상은 가장 급박한 합병증 징후이며 수액 우선 배분 대상입니다.', correct: true },
          { id: 'c', text: '추가 수액 도착까지 투여 보류', feedback: '압좌 증후군의 수액 투여 지연은 신부전과 심정지 위험을 높입니다.', correct: false },
          { id: 'd', text: '가장 먼저 구출된 환자부터 투여', feedback: '구출 순서가 아닌 중증도 기준으로 배분해야 합니다.', correct: false },
        ],
      },
      {
        question: '투석 가능 병원이 1곳뿐이고 이미 5명의 급성 신부전 환자가 투석 대기 중입니다. 추가 압좌 환자 3명이 무뇨 상태입니다. 어떻게 대응하겠습니까?',
        options: [
          { id: 'a', text: '대기 순서대로 투석 진행', feedback: '고칼륨혈증 진행 속도에 따라 우선순위가 달라져야 합니다.', correct: false },
          { id: 'b', text: '고칼륨혈증 수치·심전도 변화가 가장 심각한 환자 우선 투석, 원거리 투석 센터 추가 확보 시도, 보존적 고칼륨혈증 치료 병행', feedback: '고칼륨혈증 심전도 변화가 가장 급박한 지표입니다. 원거리 센터 추가 확보와 보존적 치료를 병행합니다.', correct: true },
          { id: 'c', text: '투석 없이 수액만으로 전원 관리', feedback: '무뇨 상태의 급성 신부전은 수액만으로는 관리할 수 없습니다.', correct: false },
          { id: 'd', text: '투석이 불가능한 환자는 Black 분류', feedback: '원거리 이송 등 대안이 있는 한 포기는 부적절합니다.', correct: false },
        ],
      },
    ]
  },
  {
    title: '산업 분진 폭발 — 대량 화상 환자',
    situation: '대규모 곡물 저장 시설에서 분진 폭발이 발생하여 60명 이상이 부상당했습니다. 1차 폭발 후 연쇄 폭발로 건물 일부가 붕괴되었습니다. 밀폐 공간 특성상 폭발성 폐(blast lung)와 광범위 화상 환자가 다수 예상됩니다. 지역 화상센터는 1곳뿐입니다.',
    totalPatients: 60,
    resources: {
      ambulances: { total: 9, label: '구급차' },
      doctors: { total: 5, label: '현장 의사' },
      helicopters: { total: 2, label: '의료 헬기' },
      hospitals: { total: 4, label: '수용 병원' },
      burnCenter: { total: 1, label: '화상센터(10병상)' },
    },
    zones: { red: 18, yellow: 20, green: 15, black: 7 },
    decisions: [
      {
        question: '화상센터 10병상에 중증 화상 환자 18명(RED)을 배분해야 합니다. 어떤 전략이 최선입니까?',
        options: [
          { id: 'a', text: '선착순으로 화상센터에 10명 입원, 나머지 대기', feedback: '중증도 기반 배분이 아닌 선착순은 가장 위중한 환자를 놓칠 수 있습니다.', correct: false },
          { id: 'b', text: '흡입 손상 동반 환자 우선 화상센터, 나머지 중증 환자는 일반 병원 ICU + 원격 화상전문의 자문 체계 구축', feedback: '흡입 손상은 가장 치명적이므로 화상센터 우선. 일반 병원은 원격 전문의 자문으로 화상 치료 역량을 보강합니다.', correct: true },
          { id: 'c', text: '모든 RED 환자를 화상센터로 이송 시도', feedback: '10병상에 18명은 물리적으로 불가능하며 과부하를 유발합니다.', correct: false },
          { id: 'd', text: '화상센터를 포기하고 모든 병원에 균등 분산', feedback: '전문 화상 치료가 필요한 환자를 비전문 시설에만 보내면 사망률이 상승합니다.', correct: false },
        ],
      },
      {
        question: '외관상 경미한 상처만 있는 환자가 2시간 후 갑자기 혈성 객담과 호흡곤란을 호소합니다. 의심해야 할 진단은?',
        options: [
          { id: 'a', text: '단순 흡인성 폐렴', feedback: '폭발 현장에서 지연 발현되는 호흡곤란은 blast lung을 우선 의심해야 합니다.', correct: false },
          { id: 'b', text: '폭발성 폐(Blast lung) — 지연 발현형 1차 폭발 손상', feedback: 'Blast lung은 외관상 정상이라도 수 시간 후 갑자기 악화될 수 있어 밀폐 공간 폭발 환자는 24시간 관찰이 필수입니다.', correct: true },
          { id: 'c', text: '공황 발작', feedback: '혈성 객담은 공황 발작의 증상이 아닙니다.', correct: false },
          { id: 'd', text: '흡입 화상', feedback: '분진 폭발 환경에서는 흡입 화상보다 blast lung이 더 특이적인 진단입니다.', correct: false },
        ],
      },
      {
        question: '연쇄 폭발 위험이 아직 완전히 해소되지 않았으나, 건물 내부에서 생존자 신호가 감지되고 있습니다. 현장 지휘관으로서 결정은?',
        options: [
          { id: 'a', text: '위험을 감수하고 즉시 구조 진입', feedback: '연쇄 폭발 위험 하에서 구조자 투입은 추가 사상자를 만들 수 있습니다.', correct: false },
          { id: 'b', text: '소방/EOD와 협력하여 안전 평가 후, 가장 안전한 진입 경로로 제한적 구조 진행 + 지속 모니터링', feedback: '구조 안전 전문가와의 협력 하에 위험을 최소화하면서 구조를 진행하는 것이 최선입니다.', correct: true },
          { id: 'c', text: '위험 완전 해소 시까지 구조 중단', feedback: '생존자의 골든타임을 놓칠 수 있습니다.', correct: false },
          { id: 'd', text: '무인 드론으로 생존 확인만 실시', feedback: '확인만으로는 생존자를 구할 수 없습니다.', correct: false },
        ],
      },
    ]
  },

];

const QUIZ_QUESTIONS = [
  // ============================================
  // ORIGINAL 12 QUESTIONS (KEPT EXACTLY)
  // ============================================
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
  },

  // ============================================
  // NEW QUIZ QUESTIONS — 재난관리주기
  // ============================================
  {
    question: '재난관리 주기의 4단계를 올바른 순서로 나열한 것은?',
    options: [
      '대비-완화-대응-복구',
      '완화-대비-대응-복구',
      '대응-대비-완화-복구',
      '복구-완화-대비-대응'
    ],
    correct: 1,
    explanation: '재난관리 주기(Disaster Management Cycle)는 완화(Mitigation) → 대비(Preparedness) → 대응(Response) → 복구(Recovery)의 4단계로 구성됩니다. 각 단계는 순환하며 이전 경험이 다음 단계에 반영됩니다.'
  },
  {
    question: '건물의 내진설계 강화는 재난관리 주기의 어느 단계에 해당합니까?',
    options: [
      '대비(Preparedness)',
      '대응(Response)',
      '완화(Mitigation)',
      '복구(Recovery)'
    ],
    correct: 2,
    explanation: '내진설계 강화는 재난 발생 자체를 예방하거나 피해를 줄이는 구조적 조치로, 완화(Mitigation) 단계에 해당합니다. 완화는 재난 발생 전 위험 요인 자체를 제거하거나 감소시키는 모든 활동을 포함합니다.'
  },
  {
    question: '2022년 이태원 압사 사고는 재난 유형 분류상 어디에 해당합니까?',
    options: [
      '자연재해(Natural disaster)',
      '사회재해/인적재해(Man-made disaster)',
      '기술재해(Technological disaster)',
      'CBRNE 테러'
    ],
    correct: 1,
    explanation: '이태원 압사 사고는 인간의 행동과 관리 부실이 주요 원인인 사회재해(인적재해, Man-made disaster)로 분류됩니다. 과밀한 군중 관리 실패, 초동 대응 지휘체계 부재 등이 핵심 원인으로 분석되었습니다.'
  },
  {
    question: 'MCI(대량 사상자 사건)와 재난(Disaster)의 가장 핵심적인 차이점은?',
    options: [
      'MCI는 의료 수요가 가용 자원을 초과하는 상태이며, 재난은 사회 전반의 기능에 영향을 미치는 더 넓은 개념',
      'MCI는 자연재해에만 적용되고, 재난은 인적재해에만 적용됨',
      'MCI는 사망자가 없는 사건이고, 재난은 사망자가 있는 사건',
      'MCI와 재난은 동일한 개념의 다른 표현'
    ],
    correct: 0,
    explanation: 'MCI(Mass Casualty Incident)는 의료 수요가 현재 가용 자원을 초과하는 상황을 의미합니다. 반면 재난(Disaster)은 의료뿐 아니라 경제, 사회 기반시설, 커뮤니티 전체 기능에 영향을 미치는 더 광범위한 개념입니다. 재난은 항상 MCI를 포함하지만, MCI가 반드시 재난인 것은 아닙니다.'
  },

  // ============================================
  // STANDARDS OF CARE
  // ============================================
  {
    question: 'Crisis Standards of Care(위기 의료 기준)의 핵심 목표는 무엇입니까?',
    options: [
      '개별 환자에게 최선의 치료를 제공',
      '의료진의 안전 최우선 보장',
      '최대 다수의 환자에게 최선의 결과를 달성',
      '의료 비용 절감'
    ],
    correct: 2,
    explanation: 'Crisis Standards of Care는 의료 자원이 심각하게 부족한 상황에서 개인 최적 치료 대신 "최대 다수의 최선의 결과(the greatest good for the greatest number)"를 달성하기 위한 자원 배분 원칙으로 전환하는 것입니다. 미국 의학한림원(IOM)이 제안한 개념입니다.'
  },
  {
    question: 'COVID-19 팬데믹 시 운영된 생활치료센터는 어느 의료 기준에 해당합니까?',
    options: [
      '통상적 기준(Conventional Standards)',
      '비상 기준(Contingency Standards)',
      '위기 기준(Crisis Standards)',
      '평상시 기준(Normal Standards)'
    ],
    correct: 1,
    explanation: '생활치료센터는 병원 입원 기준을 조정하여 경증 환자는 비병원 시설에 수용하는 변형된 치료 방식으로, 비상 기준(Contingency Standards)에 해당합니다. 완전한 위기 기준(Crisis Standards)은 자원 배분 원칙 자체가 변경될 때 적용됩니다.'
  },

  // ============================================
  // ICS / HICS
  // ============================================
  {
    question: 'ICS(Incident Command System)의 5대 핵심 기능을 모두 올바르게 나열한 것은?',
    options: [
      '지휘-작전-계획-물류-재정/행정',
      '지휘-의료-소방-경찰-행정',
      '대비-대응-복구-완화-평가',
      '지휘-통신-교육-훈련-평가'
    ],
    correct: 0,
    explanation: 'ICS 5대 핵심 기능: 지휘(Command), 작전(Operations), 계획(Planning), 물류/군수(Logistics), 재정/행정(Finance/Administration). 이 구조는 재난 규모에 관계없이 동일하게 적용되며, 필요한 기능만 활성화합니다.'
  },
  {
    question: 'HICS(병원 사고 지휘 체계)에서 병원 지휘관(Hospital Incident Commander)의 역할은?',
    options: [
      '외과 수술팀 직접 지휘',
      '병원 전체 재난 대응의 총괄 책임자',
      '환자 Triage 직접 수행',
      '언론 브리핑 전담'
    ],
    correct: 1,
    explanation: 'HICS에서 병원 지휘관(Hospital Incident Commander)은 병원 전체 재난 대응의 총괄 책임자로, 전략적 의사결정, 자원 배분 우선순위, 외부 기관(소방·경찰·행정)과의 협력을 담당합니다. 직접 환자를 치료하는 역할이 아닙니다.'
  },
  {
    question: '재난 시 병원의 Surge Capacity 확장을 위한 4S 전략에 포함되지 않는 것은?',
    options: [
      'Staff (인력)',
      'Stuff (물자/장비)',
      'Structure/Space (공간/시설)',
      'Salary (급여)'
    ],
    correct: 3,
    explanation: '4S 전략: Staff(인력 확보), Stuff(물자·장비·의약품), Structure/Space(공간·시설 확장), Systems(정책·절차·프로토콜 변경). 급여(Salary)는 4S에 포함되지 않습니다. 이 전략은 병원이 평상시 수용 능력을 초과하는 환자를 수용하기 위한 체계적 접근입니다.'
  },

  // ============================================
  // CBRNE DETAILED
  // ============================================
  {
    question: 'SLUDGEM 증상이 나타내는 것은 무엇입니까?',
    options: [
      '방사선 피폭의 전구 증상',
      '유기인계 신경작용제(사린 등) 노출에 의한 무스카린성 증상',
      '탄저균 흡입 감염 증상',
      '일산화탄소 중독 증상'
    ],
    correct: 1,
    explanation: 'SLUDGEM: Salivation(침 분비), Lacrimation(눈물), Urination(배뇨), Defecation(배변), GI distress(위장 증상), Emesis(구토), Miosis(동공 축소). 유기인계 신경작용제(사린, VX)나 농약(유기인제) 중독에 의한 무스카린성 수용체 과활성 증상입니다.'
  },
  {
    question: '미확인 화학물질이 있는 Hot Zone 진입 시 가장 높은 수준의 보호장비는?',
    options: [
      'Level D: 일반 작업복 + 안전화',
      'Level C: 공기 정화식 마스크 + 화학 방호복',
      'Level B: SCBA + 화학 방호복',
      'Level A: 완전 밀폐형 증기 방호복 + SCBA'
    ],
    correct: 3,
    explanation: 'Level A는 가장 높은 수준의 피부·호흡기 보호를 제공합니다. 완전 밀폐 증기 방호복(vapor-protective suit) + 자급식 공기호흡기(SCBA)로 구성됩니다. 미확인 고위험 화학물질, 고농도 증기 환경에서 필수입니다.'
  },
  {
    question: '요오드화칼륨(KI)을 원전 사고 시 투여하는 이유는?',
    options: [
      '방사선에 의한 세포 손상을 직접 치료',
      '방사성 세슘의 체내 흡수 차단',
      '방사성 요오드(¹³¹I)의 갑상선 침착을 경쟁적으로 억제',
      '급성방사선증후군 전반에 대한 해독제'
    ],
    correct: 2,
    explanation: '방사성 요오드(¹³¹I)는 갑상선에 선택적으로 축적되어 갑상선암 위험을 높입니다. KI(요오드화칼륨)는 안정 요오드로 갑상선 수용체를 먼저 포화시켜 방사성 요오드의 갑상선 흡수를 경쟁적으로 억제합니다. 단, 다른 방사성 물질(세슘 등)에는 효과가 없습니다.'
  },
  {
    question: '폭발 손상 5가지 유형(Primary~Quinary) 중 임상적으로 가장 흔하게 발생하는 유형은?',
    options: [
      '1차(Primary): 압력파에 의한 손상',
      '2차(Secondary): 파편·비산물에 의한 손상',
      '3차(Tertiary): 폭풍에 날려 충돌하는 손상',
      '4차(Quaternary): 화상·질식 손상'
    ],
    correct: 1,
    explanation: '폭발 손상에서 가장 흔한 유형은 2차 손상(Secondary blast injury)입니다. 폭발 시 발생하는 파편, 유리, 건물 잔해 등 비산물에 의한 관통·열상·골절이 가장 많이 발생합니다. 1차 손상(압력파)은 가장 특이적이지만, 발생 빈도는 2차보다 낮습니다.'
  },
  {
    question: '"더티 밤(Dirty Bomb, RDD)"에 대한 대응에서 가장 우선적인 조치는?',
    options: [
      '전 국민 KI 즉시 배포',
      '방사성 오염 확산 방지 및 현장 제염',
      '피폭 환자 즉시 항암 치료',
      '폭발물 완전 수거 후 의료 대응'
    ],
    correct: 1,
    explanation: '더티 밤(Dirty Bomb/RDD: Radiological Dispersal Device)은 방사성 물질을 일반 폭발물과 결합한 무기입니다. 방사선 자체보다 심리적 공포와 오염 확산이 더 큰 위협입니다. 가장 우선 조치는 오염 확산 방지(구역 설정)와 제염(탈의 + 세척)이며, 폭발 부상 치료도 병행합니다.'
  },

  // ============================================
  // 한국 재난 사례
  // ============================================
  {
    question: '2003년 대구 지하철 화재 참사에서 사망자는 약 몇 명입니까?',
    options: [
      '약 50명',
      '약 100명',
      '약 192명',
      '약 300명'
    ],
    correct: 2,
    explanation: '2003년 2월 대구 지하철 1호선 방화 사건으로 192명이 사망하고 148명이 부상당했습니다. 당시 부적절한 소재(방염 처리 미흡), 대피 유도 실패, 전동차 운행 지속 결정 등 다중의 실패가 복합적으로 작용한 대형 참사였습니다.'
  },
  {
    question: '대구 지하철 화재 참사 이후 실시된 완화(Mitigation) 조치로 올바른 것은?',
    options: [
      '지하철 운행 속도 감소',
      '역사 내 불연재 교체 및 스크린도어 설치',
      '의무 보험 가입 강화',
      '운전기사 근무 시간 단축'
    ],
    correct: 1,
    explanation: '대구 지하철 참사 이후 핵심 완화 조치로 전 지하철역 가연성 소재의 불연재 교체, 스크린도어(PSD) 전국 설치, 자동 소화 시스템 강화가 시행되었습니다. 이는 이후 유사 사고 발생 시 피해를 구조적으로 줄이는 완화 단계 조치의 모범 사례입니다.'
  },
  {
    question: '2014년 마우나리조트 붕괴 사고의 재난 의료 측면에서 핵심 교훈은?',
    options: [
      '폭설에 의한 구조물 붕괴 대비 설계 기준 필요',
      '초기 재난의료대응체계의 문제점 노출 — 현장 의료 지휘 부재, 환자 이송 혼란',
      '대학 축제 안전 관리 강화',
      '기상 예보 정확도 개선'
    ],
    correct: 1,
    explanation: '2014년 마우나리조트 붕괴 사고(10명 사망, 204명 부상)는 경주 리조트에서 발생한 붕괴 사고로, 초기 현장 의료 지휘 체계 부재, 환자 이송 혼란, 병원 수용 준비 미흡 등 재난의료대응체계의 구조적 문제점을 드러내었으며 이후 DMAT 체계 강화의 계기가 되었습니다.'
  },
  {
    question: '2014년 세월호 참사에서 재난 대응 측면의 핵심 교훈은?',
    options: [
      '해상 교통 속도 제한',
      '골든타임 내 초동 대응 중요성 및 지휘체계 혼선의 위험성',
      '해운사 보험 의무화',
      '여객선 승객 연령 제한'
    ],
    correct: 1,
    explanation: '세월호 참사(304명 사망·실종)는 초동 대응의 골든타임 내 구조 실패, 정부-해경-선사 간 지휘체계 혼선, 잘못된 대기 명령 등 복합적 실패가 피해를 키웠습니다. 이 참사를 계기로 국민안전처 설치, 안전 교육 강화, 재난 대응 매뉴얼 전면 개정이 이루어졌습니다.'
  },

  // ============================================
  // 감염병 재난
  // ============================================
  {
    question: '감염병 대응의 3T 전략을 올바르게 나열한 것은?',
    options: [
      'Test(검사), Trace(추적), Treat(치료)',
      'Triage(분류), Transfer(이송), Treat(치료)',
      'Track(추적), Treat(치료), Terminate(종식)',
      'Test(검사), Teach(교육), Terminate(종식)'
    ],
    correct: 0,
    explanation: '3T 전략: Test(검사 확대), Trace(접촉자 추적), Treat(신속한 치료·격리). COVID-19 대응에서 WHO가 강조한 전략으로, 검사를 통한 조기 발견, 추적을 통한 전파 차단, 치료를 통한 중증화 방지가 핵심입니다.'
  },
  {
    question: '"곡선 평탄화(Flatten the Curve)"의 핵심 목적은?',
    options: [
      '감염병 총 사망자 수를 0으로 만드는 것',
      '감염 속도를 늦춰 의료 시스템의 과부하를 방지하는 것',
      '백신 개발 기간을 단축하는 것',
      '감염자 수를 최소화하는 것'
    ],
    correct: 1,
    explanation: '곡선 평탄화는 비약물적 중재(사회적 거리두기, 마스크 착용 등)로 감염 전파 속도를 늦춰, 단기간 의료 수요가 의료시스템 수용 능력(병상, 인공호흡기, 의료진)을 초과하지 않도록 방지하는 전략입니다. 총 환자 수보다 시간당 환자 수 관리가 목적입니다.'
  },
  {
    question: '2015년 한국 MERS 사태의 가장 핵심적인 문제점으로 꼽히는 것은?',
    options: [
      'MERS에 대한 효과적인 치료제가 없었던 것',
      '정보 비공개 정책으로 인한 대중의 신뢰 붕괴 및 공황 확산',
      '마스크 생산량이 부족했던 것',
      '감염병 전문 병원이 없었던 것'
    ],
    correct: 1,
    explanation: '2015년 한국 MERS 사태에서 가장 큰 문제는 초기 감염 병원 명단 비공개 등 정보 투명성 부재였습니다. 이는 감염 경로 불명으로 인한 자발적 격리 실패, 대중 공황, 불필요한 의료기관 기피 등을 야기했습니다. 위기 소통(Risk Communication)에서 투명성이 가장 중요하다는 교훈을 남겼습니다.'
  },

  // ============================================
  // 심리 응급 처치 & 정신건강
  // ============================================
  {
    question: '심리 응급 처치(PFA, Psychological First Aid)의 핵심 3단계는?',
    options: [
      '진단-치료-추적',
      '살펴보기(Look)-경청(Listen)-연결(Link)',
      '안정-평가-치료',
      '접촉-평가-개입'
    ],
    correct: 1,
    explanation: 'PFA(Psychological First Aid)의 3단계: Look(현장과 피해자 상태 살펴보기), Listen(공감하며 경청, 비판 없는 경청), Link(자원 연결 — 가족, 지역사회 지원). PFA는 심리 치료가 아닌 즉각적 안정과 연결을 목표로 하며, 비전문가도 수행 가능합니다.'
  },
  {
    question: '재난 대응 이후 의료진 소진(Burnout) 및 대리 외상(Vicarious Trauma) 예방을 위한 가장 효과적인 방법은?',
    options: [
      '업무 종료 후 즉시 퇴근하여 혼자 휴식',
      '교대 근무 체계 유지, 동료 지원 프로그램, 자기 관리(self-care) 제도화',
      '피해 상황을 최대한 자세히 기록해 나중에 처리',
      '감정 표현 자제 및 전문성 유지'
    ],
    correct: 1,
    explanation: '재난 의료진 소진 예방을 위해 WHO와 국제적십자사는 체계적 교대 근무, 동료 지원(peer support), 위기 후 디브리핑, 자기 관리 자원 제공을 권장합니다. 감정을 억압하는 것은 오히려 PTSD 위험을 높이며, 조직 차원의 지원 체계가 필수입니다.'
  },

  // ============================================
  // 취약 계층
  // ============================================
  {
    question: 'JumpSTART Triage에서 무호흡 소아에게 5회 인공호흡을 시도하는 이유는?',
    options: [
      '소아는 CPR이 효과적이기 때문',
      '소아의 무호흡은 저산소증이 원인인 경우가 많아 환기만으로 회복 가능하기 때문',
      '소아는 성인과 달리 맥박이 없어도 호흡이 지속되기 때문',
      'JumpSTART는 소아에서 기도 확보가 불필요하기 때문'
    ],
    correct: 1,
    explanation: '소아 무호흡의 주요 원인은 성인과 달리 심장 문제보다 저산소증(기도 폐쇄, 호흡 억제)인 경우가 많습니다. 5회 환기만으로 호흡이 재개되는 경우가 있어 바로 BLACK 분류하지 않고 시도합니다. 호흡 재개 시 RED, 재개 안 되면 BLACK으로 분류합니다.'
  },
  {
    question: '재난 발생 시 노인이 취약 계층으로 분류되는 주요 이유를 모두 포함한 것은?',
    options: [
      '노인은 재난 경험이 부족하여 패닉이 심하기 때문',
      '만성질환 보유, 이동성 저하, 사회적 고립, 인지 기능 저하 등 복합 요인',
      '노인은 의료 보험이 없는 경우가 많기 때문',
      '노인은 재난 대피 훈련에 참여하지 않기 때문'
    ],
    correct: 1,
    explanation: '노인의 재난 취약성 요인: 만성질환(COPD, 당뇨, 심혈관질환)으로 인한 생리적 보상 능력 저하, 이동성 저하로 자력 대피 어려움, 사회적 고립으로 정보 접근 제한, 인지 기능 저하로 재난 상황 판단 어려움, 복잡한 약물 복용. 이러한 복합 요인이 재난 시 불균형적으로 높은 사망률의 원인입니다.'
  },
  {
    question: '재난 대응 계획 수립 시 장애인을 위해 고려해야 할 핵심 사항은?',
    options: [
      '장애인은 전용 대피 시설을 별도로 만들어 분리 대피',
      '대피 보조 인력 지정, 접근 가능한 의사소통 수단 확보, 개인화된 대피 계획 수립',
      '장애인 보호자에게 전적으로 위임',
      '중증 장애인은 제자리 대기(shelter in place) 원칙'
    ],
    correct: 1,
    explanation: '재난 시 장애인 보호: 개인화된 비상 대피 계획(PEEP) 수립, 다양한 장애 유형에 맞는 대피 보조 인력 지정, 시각·청각 장애인을 위한 다양한 경보 방식과 의사소통 수단, 이동 보조 기기 접근성 확보가 필요합니다. UN 장애인권리협약은 재난 대응의 장애 포용성을 권리로 명시합니다.'
  },

  // ============================================
  // 위기 리더십
  // ============================================
  {
    question: '위기(Crisis)의 4대 특성을 올바르게 나열한 것은?',
    options: [
      'Undesirable(바람직하지 않음)-Unstable(불안정)-Unexpected(예측 불가)-Urgent(긴급)',
      'Uncontrollable-Unpredictable-Unfair-Urgent',
      'Dangerous-Dynamic-Difficult-Demanding',
      'Fast-Furious-Fatal-Final'
    ],
    correct: 0,
    explanation: '위기의 4U 특성: Undesirable(모두가 원하지 않음), Unstable(상황이 불안정하여 빠르게 변화), Unexpected(예측하지 못한 상황), Urgent(즉각적 행동이 요구됨). 이 4가지 특성이 복합적으로 작용하여 리더십의 극도의 시험이 됩니다.'
  },
  {
    question: '"스톡데일 패러독스(Stockdale Paradox)"에서 위기 극복의 핵심 원칙은?',
    options: [
      '긍정적 사고로 현실의 어려움을 무시한다',
      '냉혹한 현실을 직시하면서도 결국 승리할 것이라는 믿음을 유지한다',
      '빠른 탈출이 최선의 전략이다',
      '불확실성 앞에서는 결정을 미룬다'
    ],
    correct: 1,
    explanation: '스톡데일 패러독스(짐 콜린스가 제안): 베트남 포로 생활 중 생존한 제임스 스톡데일 제독에서 유래. "크리스마스까지 나갈 수 있을 거야"처럼 맹목적 낙관주의자들은 실망에 의해 무너졌지만, 냉혹한 현실을 직시하면서도 "결국 살아서 나갈 것"이라는 믿음을 가진 이들이 생존했습니다. 전략적 낙관주의의 핵심입니다.'
  },
  {
    question: '빅터 프랭클(Viktor Frankl)의 교훈이 위기 리더십에 주는 핵심 메시지는?',
    options: [
      '고통이 크면 행동을 멈춰야 한다',
      '상황을 통제할 수 없더라도 그에 대한 태도는 선택할 수 있다',
      '최악의 상황에서는 생존이 유일한 목표이다',
      '위기는 결코 의미 있는 경험이 아니다'
    ],
    correct: 1,
    explanation: '빅터 프랭클은 나치 강제수용소 생존 경험을 바탕으로 "자극과 반응 사이에는 공간이 있고, 그 공간에 우리의 선택이 있다"는 통찰을 남겼습니다. 위기 리더십에서 이는 통제 불가능한 외부 상황이 아닌 우리의 태도와 반응을 선택함으로써 리더십을 발휘할 수 있음을 의미합니다.'
  },
  {
    question: '"신뢰의 속도(Speed of Trust)"에서 신뢰가 높은 조직의 특성은?',
    options: [
      '모든 결정에 더 많은 검토 단계가 필요하다',
      '의사결정과 실행 속도가 빨라지고 불필요한 관료적 비용이 감소한다',
      '직원들이 서로를 감시하는 체계가 강화된다',
      '신뢰는 실행 속도와 무관하다'
    ],
    correct: 1,
    explanation: '스티븐 코비 Jr.의 "신뢰의 속도": 신뢰가 높은 조직에서는 의사결정이 빠르고, 의사소통이 직접적이며, 협력이 원활합니다. 반면 불신이 높으면 승인 절차가 복잡해지고 실행이 느려지며 비용이 증가합니다. 위기 상황에서 평소 신뢰 구축이 빠른 대응의 토대가 됩니다.'
  },
  {
    question: 'TeamSTEPPS의 핵심 4대 요소는?',
    options: [
      '리더십-상황 모니터링-상호 지원-의사소통',
      '교육-훈련-평가-보상',
      '계획-실행-검토-개선',
      '지휘-통제-조정-협력'
    ],
    correct: 0,
    explanation: 'TeamSTEPPS(Team Strategies and Tools to Enhance Performance and Patient Safety): 리더십(Leadership), 상황 모니터링(Situation Monitoring), 상호 지원(Mutual Support), 의사소통(Communication). AHRQ에서 개발한 팀 기반 의료 안전 프로그램으로 재난 의료에도 광범위하게 적용됩니다.'
  },
  {
    question: 'SBAR 의사소통 도구의 올바른 순서는?',
    options: [
      'Summary-Background-Assessment-Recommendation',
      'Situation-Background-Assessment-Recommendation',
      'Status-Brief-Action-Result',
      'Scene-Background-Alert-Response'
    ],
    correct: 1,
    explanation: 'SBAR: Situation(현재 상황 — 환자가 누구이고 무슨 일이 있는가), Background(배경 — 관련 병력, 투약), Assessment(평가 — 현재 문제가 무엇인가), Recommendation(권고 — 무엇이 필요한가). 구조화된 의사소통으로 정보 누락을 방지하고 응급 상황에서 효율적 인계를 가능하게 합니다.'
  },
  {
    question: 'AAR(사후 검토, After Action Review)에서 다루는 4가지 핵심 질문은?',
    options: [
      '누가/언제/어디서/어떻게',
      '예상 결과는/실제 결과는/차이의 이유는/유지·개선할 점은',
      '비용은/시간은/인원은/결과는',
      '성공/실패/책임/처벌'
    ],
    correct: 1,
    explanation: 'AAR의 4가지 질문: ① 예상한 결과는 무엇이었는가? ② 실제로 일어난 것은? ③ 왜 차이가 발생했는가? ④ 다음에 유지하거나 개선할 것은? 재난 대응 후 조직 학습의 핵심 도구로, 책임 추궁이 아닌 개선을 목적으로 합니다.'
  },
  {
    question: '르윈(Lewin)의 변화 모델 3단계를 올바른 순서로 나열한 것은?',
    options: [
      '계획-실행-평가',
      '해동(Unfreezing)-이동(Moving)-재동결(Refreezing)',
      '인식-동기-실행',
      '저항-수용-통합'
    ],
    correct: 1,
    explanation: '르윈의 변화 모델: 해동(Unfreezing, 현상 유지의 힘 약화, 변화 필요성 인식) → 이동(Moving, 새로운 방향으로 실제 변화) → 재동결(Refreezing, 새로운 상태를 안정화·제도화). 재난 이후 시스템 개선, 새로운 프로토콜 도입에 유용한 변화 관리 프레임워크입니다.'
  },
  {
    question: 'WHO 위기 소통 가이드라인의 핵심 원칙을 모두 포함한 것은?',
    options: [
      '신속성, 비공개, 권위적 발표',
      '투명성, 적시성, 공감, 일관성',
      '낙관적 메시지, 공포 최소화, 단일 채널',
      '전문성 강조, 기술적 설명 위주'
    ],
    correct: 1,
    explanation: 'WHO 위기 소통 원칙: 투명성(Transparent — 알려진 것/모르는 것 모두 공개), 적시성(Timely — 정보를 신속히 제공), 공감(Empathic — 대중의 감정과 우려 인정), 일관성(Consistent — 기관 간 메시지 통일). MERS 사태의 정보 비공개 실패가 이 원칙의 중요성을 보여주었습니다.'
  },
  {
    question: '칼 웨익(Karl Weick)의 "센스메이킹(Sensemaking)"이 재난 대응에서 의미하는 것은?',
    options: [
      '재난 피해 규모를 수치화하는 과정',
      '혼란스러운 재난 상황에서 무슨 일이 일어나고 있는지 의미를 구성하고 행동 방향을 결정하는 인지 과정',
      '재난 대응 훈련을 계획하는 과정',
      '통계적 데이터를 분석하는 과정'
    ],
    correct: 1,
    explanation: '센스메이킹(Weick): 사람들이 불확실하고 혼란스러운 상황에서 현재 무슨 일이 일어나고 있는지 해석하고 의미를 부여하는 과정. 재난 초기 대응에서 리더는 단편적 정보를 모아 "이게 어떤 상황인가?"를 판단하고 행동 방향을 결정해야 하는데, 이 과정이 센스메이킹입니다. 잘못된 센스메이킹이 대응 실패로 이어질 수 있습니다.'
  },
  {
    question: '"Guiding Coalition(안내 연합)"이 위기 대응에서 수행하는 역할은?',
    options: [
      '언론 브리핑만 전담하는 홍보팀',
      '위기 리더를 지원하고 변화를 이끄는 핵심 지도팀으로, 다양한 역량과 신뢰를 갖춘 인물로 구성',
      '의사결정을 대신하는 위원회',
      '위기 후 책임 소재를 파악하는 조사팀'
    ],
    correct: 1,
    explanation: '존 코터(John Kotter)가 제안한 Guiding Coalition: 위기나 변화 상황에서 리더 혼자로는 한계가 있어, 다양한 역량(전문성, 신뢰성, 네트워크)을 가진 핵심 인물들로 구성된 연합을 형성합니다. 재난 대응에서는 의료, 행정, 대외 관계 등 다양한 영역의 핵심 인물이 협력해야 합니다.'
  },

  // ============================================
  // BUILD BACK BETTER & 미래 기술
  // ============================================
  {
    question: '"Build Back Better(더 나은 재건)"의 핵심 개념은?',
    options: [
      '재난 피해 시설을 가장 빠르게 원상 복구하는 것',
      '재난 복구 시 이전보다 더 안전하고 회복력 있는 상태로 재건하는 것',
      '재난 피해 비용을 최소화하는 재건 방식',
      '국제 원조를 최대로 확보하는 재건 전략'
    ],
    correct: 1,
    explanation: 'Build Back Better(BBB): 유엔이 채택한 재난 복구 원칙으로, 단순 원상복구가 아닌 재난 이전보다 더 안전하고 지속가능하며 회복력 있는(resilient) 상태로 재건하는 것을 목표로 합니다. 센다이 프레임워크(2015-2030)에서 핵심 원칙으로 채택되었습니다.'
  },
  {
    question: '재난 의학 분야에서 미래 기술의 활용으로 올바르지 않은 것은?',
    options: [
      'AI를 활용한 재난 예측 및 자원 배분 최적화',
      '드론을 이용한 현장 정찰 및 의약품 배송',
      'VR/AR을 활용한 재난 의료 훈련',
      '원격 의료는 재난 상황에서 사용이 금지됨'
    ],
    correct: 3,
    explanation: '원격 의료(Telemedicine)는 재난 상황에서 현장 전문 의료인이 부족할 때 원격으로 진료 지도, 중증도 평가, 의사결정 지원을 할 수 있는 유용한 기술입니다. 사용 금지가 아니라 적극 활용이 권장됩니다. AI 예측, 드론 운용, VR 훈련 모두 재난 의학의 미래 방향입니다.'
  },

  // ============================================
  // NEW QUIZ — CBRN/특수재난/AI 심화
  // ============================================
  {
    id: 52,
    category: 'Chemical Triage - DUMBELS',
    question: '신경작용제(Nerve Agent) 노출 시 나타나는 DUMBELS 증상 중 동공과 관련된 징후는?',
    options: [
      'A. 동공 산대 (Mydriasis)',
      'B. 동공 축소 (Miosis)',
      'C. 복시 (Diplopia)',
      'D. 안구진탕 (Nystagmus)',
    ],
    correct: 1,
    explanation: '신경작용제는 AChE를 억제하여 아세틸콜린이 축적되고, 무스카린성 수용체 과활성으로 동공 축소(Miosis)가 발생. 동공 축소는 신경작용제 노출의 핵심 징후 중 하나.'
  },
  {
    id: 53,
    category: 'Radiation Triage - TTE',
    question: '더티밤(RDD) 폭발 현장에서 폭발 후 45분에 구토를 시작한 환자의 추정 방사선 피폭 선량과 Triage 분류는?',
    options: [
      'A. <2 Gy - Green (Minor)',
      'B. 2-4 Gy - Yellow (Delayed)',
      'C. 4-6 Gy - Red (Immediate/Urgent)',
      'D. ≥6 Gy - Red (Immediate, very severe)',
    ],
    correct: 3,
    explanation: 'TTE(구토 발현 시간) <1시간 = 피폭 추정 선량 ≥6 Gy (초중증 ARS H4). TTE 가이드: <1hr → ≥6Gy, 1-2hr → 4-6Gy, 2-4hr → 2-4Gy, >4hr → <2Gy.'
  },
  {
    id: 54,
    category: 'Chemical Antidote',
    question: '신경작용제 노출 환자에게 Atropine 2mg을 투여했으나 반응이 없을 때 다음 조치는?',
    options: [
      'A. Atropine 투여를 중단하고 관찰',
      'B. Atropine 용량을 2배(4mg)로 늘려 반복 투여',
      'C. Pralidoxime만 단독 투여',
      'D. Diazepam으로 전환',
    ],
    correct: 1,
    explanation: '신경작용제 Atropine 프로토콜: 2mg 초기 볼루스 후 반응 없으면 용량을 2배로 늘려 반복 투여 (증상 소실까지). Pralidoxime은 병용 투여이며, Diazepam은 경련 조절에 추가 사용.'
  },
  {
    id: 55,
    category: 'Pediatric Triage - JumpSTART',
    question: '6세 아이가 재난 현장에서 발견됨. 자발 호흡 없으나 맥박은 있음. JumpSTART에 따른 다음 조치는?',
    options: [
      'A. 즉시 Black(Expectant) 분류',
      'B. 즉시 Red(Immediate) 분류하고 이송',
      'C. 기도 개방 후 5회 구조 호흡 시도',
      'D. 성인 START 알고리즘 적용',
    ],
    correct: 2,
    explanation: 'JumpSTART(소아 MCI Triage): 무호흡 + 맥박 있음 → 기도 개방 + 5회 구조 호흡. 호흡 회복 시 Red(Immediate), 미회복 시 Black(Expectant). 성인 START와 다름 - 소아는 호흡 정지로 인한 심정지 가능성 때문에 구조 호흡 시도.'
  },
  {
    id: 56,
    category: 'CBRN Zoning',
    question: 'CBRN 현장에서 세 구역 중 \'완전 제독 후 정규 의료 처치가 이루어지는\' 구역은?',
    options: [
      'A. Hot Zone (오염 구역)',
      'B. Warm Zone (제독 구역)',
      'C. Cold Zone (청정 구역)',
      'D. 어느 구역이든 가능',
    ],
    correct: 2,
    explanation: 'Cold Zone(청정 구역/Support Zone): 완전 제독 후 진입. 정규 의료 처치 및 이송 결정. Hot Zone: PPE Level A/B, 1차 신속 분류. Warm Zone: 제독 시행, 제한적 응급 처치.'
  },
  {
    id: 57,
    category: 'Triage Principles - Blast Injury',
    question: '폭발 손상의 4가지 기전 중, 폭발파(Blast Wave)의 직접 압력에 의한 손상이며 폐, 귀, 장이 주요 손상 부위인 것은?',
    options: [
      'A. Primary Blast Injury (1차 폭발 손상)',
      'B. Secondary Blast Injury (2차 폭발 손상)',
      'C. Tertiary Blast Injury (3차 폭발 손상)',
      'D. Quaternary Blast Injury (4차 폭발 손상)',
    ],
    correct: 0,
    explanation: 'Primary Blast Injury(1차 폭발 손상): 폭발파 직접 압력. 기체 충전 장기 손상 - 폐(폭발 폐), 귀(고막 파열), 장(폭발 복부), 뇌(PTBI). Secondary: 파편. Tertiary: 투사. Quaternary: 화상/흡입/압좌.'
  },
  {
    id: 58,
    category: 'Reverse Triage',
    question: '역방향 Triage(Reverse Triage)의 목적으로 가장 올바른 것은?',
    options: [
      'A. 가장 중증의 환자를 먼저 이송하는 것',
      'B. 현재 입원 환자 중 조기 퇴원 가능한 환자를 선별해 병상을 확보하는 것',
      'C. 생존 가능성이 낮은 환자를 Black으로 분류하는 것',
      'D. 소아 환자를 성인보다 우선 처치하는 것',
    ],
    correct: 1,
    explanation: '역방향 Triage(Reverse Triage): 재난 시 현재 입원 환자 중 향후 96시간 동안 주요 처치가 불필요한 환자를 조기 퇴원시켜 신규 재난 환자를 위한 병상을 확보. 총 병상의 10-20% 추가 확보 가능(Pollaris & Sabbe, 2016).'
  },
  {
    id: 59,
    category: 'Triage Systems - Evidence',
    question: '다음 Triage 도구 중 Zhang et al.(2021) 지진 사상자 29,523명 연구에서 병원 내 사망 예측 AUC가 가장 높았던 것은?',
    options: [
      'A. START',
      'B. CareFlight',
      'C. REMS (Rapid Emergency Medicine Score)',
      'D. T-RTS',
    ],
    correct: 2,
    explanation: 'Zhang et al. 지진 사상자 연구(2021): REMS AUC 0.835(최고) > TEWS 0.797 > START 0.750 > CareFlight 0.737 > T-RTS 0.736. 단, START는 현장 적용성과 학습 용이성 때문에 여전히 광범위하게 활용됨.'
  },
  {
    id: 60,
    category: 'Biological Disaster - SEIRV',
    question: '생물 재난의 SEIRV 모델에서 \'E\'에 해당하는 집단과 그에 대한 처치는?',
    options: [
      'A. 감염성 있는 환자 - 즉각 격리 및 치료',
      'B. 노출되었으나 아직 감염성 없는 사람 - 격리·검역 및 예방 항생제/항바이러스 투여',
      'C. 회복된 환자 - 의료자원 지원',
      'D. 예방 접종된 사람 - 전파 차단 활동 참여',
    ],
    correct: 1,
    explanation: 'SEIRV: S=Susceptible(감수성), E=Exposed(노출-잠복기), I=Infectious(감염성), R=Removed(회복/사망), V=Vaccinated(보호). \'E\' 노출자: 격리·검역 + 예방 항생제/항바이러스 투여.'
  },
  {
    id: 61,
    category: 'AI-Based Triage Algorithm',
    question: 'AI 기반 화생방·중증외상 통합 중증도 분류 알고리즘에서 입력 변수로 사용되는 것이 아닌 것은?',
    options: [
      'A. 호흡수 (Respiratory Rate)',
      'B. AVPU 의식 수준 (Consciousness Level)',
      'C. 환자의 나이와 성별 (Patient Age and Gender)',
      'D. 화생방 오염 증상 (CBRNE contamination symptoms)',
    ],
    correct: 2,
    explanation: 'AI 알고리즘 입력 변수: 호흡수, 맥박, 의식 수준(AVPU), 이동 능력(Mobility), 활력징후, 외상/중독 증상, 화생방 오염 기반 제독 우선순위 및 응급 처치 논리. 나이/성별은 주요 입력 변수가 아님.'
  },
  {
    id: 62,
    category: 'Burn Triage - Inhalation Injury',
    question: '흡입 손상(Inhalation Injury)의 3대 징후에 해당하지 않는 것은?',
    options: [
      'A. 안면부 화상 (Facial burns)',
      'B. 코털 그을림 (Singed nasal hairs)',
      'C. 폐쇄 공간 노출 (Closed space exposure)',
      'D. 광범위 전신 화상 TBSA>90% (Extensive burns TBSA>90%)',
    ],
    correct: 3,
    explanation: '흡입 손상 3대 징후: 1) 안면부 화상, 2) 코털 그을림, 3) 폐쇄 공간 노출. 쉰 목소리는 기도 부종 진행 신호. TBSA>90%는 화상 중증도 지표이지 흡입 손상의 특이적 징후가 아님.'
  },
  {
    id: 63,
    category: 'ARS - Lymphocyte Count',
    question: '급성 방사선 증후군(ARS)에서 G-CSF 등 골수자극제 투여의 임상 기준점(threshold)이 되는 피폭 선량은?',
    options: [
      'A. >1 Gy',
      'B. >2 Gy',
      'C. >4 Gy',
      'D. >6 Gy',
    ],
    correct: 1,
    explanation: '피폭 선량 ≥2 Gy가 G-CSF 등 골수자극제 투여의 임상 기준점. 절대 림프구 수(ALC) 48-72시간 추적으로 확인. ≥2 Gy 피폭자는 방사선 손상 전문 치료 센터(RITN)로 이송 우선화.'
  },
  {
    id: 64,
    category: 'CBRN Triage Levels',
    question: 'CBRN 현장 3단계 Triage 중 \'이송 우선순위를 결정하며, 제독 완료를 확인하는\' 단계는?',
    options: [
      'A. Level 1 - 현장 Triage (On-Site Triage)',
      'B. Level 2 - 의료 Triage (Medical Triage)',
      'C. Level 3 - 이송 Triage (Evacuation Triage)',
      'D. Level 4 - 병원 Triage',
    ],
    correct: 2,
    explanation: 'CBRN 3단계: Level 1=현장(보행 가능/불가 구분), Level 2=의료(4색 분류+CBRN 증상 포함), Level 3=이송(제독 완료 확인 후 이송 우선순위 결정). 제독 전 의료기관 이송 금지.'
  },
  {
    id: 65,
    category: 'Metaverse Training - AI Algorithm',
    question: 'AI 기반 메타버스 시뮬레이션 훈련의 시나리오로 포함되는 것은?',
    options: [
      'A. 단순 외상 환자 처치 훈련',
      'B. 전방 전초 부대에 화학 포탄 공격으로 인한 폭발 손상과 신경작용제 중독 대량 환자 발생',
      'C. 병원 내 심폐소생술 훈련',
      'D. 도시 교통사고 대량 사상자 처치',
    ],
    correct: 1,
    explanation: 'AI 메타버스 시뮬레이션 시나리오: \'화학 포탄이 전방 전초 부대에 낙하하여 폭발 손상과 신경작용제 중독에 의한 대량 환자 발생\' - 사고 발생부터 Triage, 처치, 후송까지 포함. AI 가상 조수가 HUD/태블릿으로 실시간 조언 제공.'
  },
  {
    id: 66,
    category: 'Crush Syndrome - Pre-extrication',
    question: '장시간 매몰된 지진 생존자의 구출(extrication) 전에 반드시 시행해야 하는 처치는?',
    options: [
      'A. 전신 X-ray 촬영',
      'B. IV/IO 확보 및 대량 수액 투여 시작',
      'C. 항생제 예방 투여',
      'D. 혈액 검사 후 수액 용량 결정',
    ],
    correct: 1,
    explanation: '구출 전 수액 투여가 필수: 구출 시 재관류 손상 → 미오글로빈 급격한 방출 → 급성 신손상 + 고칼륨혈증 + 심정지 위험. 구출 전 IV/IO 확보 및 대량 수액 투여 시작이 사망 예방의 핵심. 제세동기도 준비.'
  },
  {
    id: 67,
    category: 'Triage Ethics - Utilitarian Principle',
    question: '재난 의료(Triage)에서 적용되는 공리주의적 원칙을 가장 잘 설명하는 것은?',
    options: [
      'A. 가장 중증인 환자에게 최선의 치료를 제공한다',
      'B. 선착순으로 처치 순서를 결정한다',
      'C. 제한된 자원으로 최대 다수의 생존 가능성을 극대화한다',
      'D. 의료진의 판단보다 환자 본인의 선택을 우선한다',
    ],
    correct: 2,
    explanation: '재난 의료 공리주의 원칙: \'가장 많은 사람에게 가장 큰 이익\'. 개별 최선 치료 → 집단 생존 극대화로 패러다임 전환. \'가장 아픈 환자\'가 아닌 \'생존 가능성이 가장 높은 환자\' 우선 처치. 위기 표준 의료(CSC).'
  },
  {
    id: 68,
    category: 'Special Population - Pregnant',
    question: '재난 현장에서 임산부의 최소 Triage 분류는?',
    options: [
      'A. Green (비응급)',
      'B. Yellow (응급) 이상',
      'C. Red (긴급)',
      'D. 일반 기준과 동일하게 적용',
    ],
    correct: 1,
    explanation: '임산부는 2명의 생명(모체+태아)이 동시에 위험에 처하는 특수 집단 - 최소 Yellow(응급) 이상으로 분류 권장. 증상이 경미해도 Yellow 하한선 적용. 제왕절개 필요 시 즉각 산부인과 전문 시설 이송.'
  },
  {
    id: 69,
    category: 'Biological - Botulism',
    question: '생물테러 작용제 중 보툴리눔(Botulism)의 임상적 특징과 Triage 시 핵심 고려사항은?',
    options: [
      'A. 상행성 마비, 자연 회복 가능 - Green 분류',
      'B. 하행성 마비, 다수 환자의 인공호흡기 의존 - 자원 배분 위기',
      'C. 발열 + 발진, 전파 차단 최우선',
      'D. 급격한 호흡기 증상, 24시간 내 항생제 필수',
    ],
    correct: 1,
    explanation: '보툴리눔 독소: 하행성 마비(Descending paralysis) 특징. 다수 환자에서 인공호흡기 의존 → 자원 배분 위기 발생. 항독소(Antitoxin) 존재하나 조기 투여 필요. 다수의 중증 환자에게 기계 환기 장비가 부족해지는 상황이 핵심 Triage 문제.'
  },
  {
    id: 70,
    category: '기초 트리아지 분류',
    question: '다음 중 대량 사상자 사고(MCI) 현장에서 가장 기본적인 환자 분류 원칙은 무엇인가?',
    options: [
      'A. 개별 환자에게 최선의 치료를 제공한다',
      'B. 가장 많은 수의 사람들에게 가장 큰 이익을 제공한다',
      'C. 가장 중증인 환자를 먼저 치료한다',
      'D. 도착 순서대로 치료한다',
    ],
    correct: 1,
    explanation: '재난 의학의 핵심 원칙은 \'doing the greatest good for the largest number of people\'로, 개별 환자보다 집단 전체의 이익을 극대화하는 공리주의적 패러다임이다.'
  },
  {
    id: 71,
    category: '트리아지 색상 분류',
    question: '황색(Yellow) 태그는 어떤 환자에게 부여하는가?',
    options: [
      'A. 생명이 즉각적인 위험에 처해 있으며 즉각적인 구명 처치가 필요한 환자',
      'B. 생명에 즉각적인 위험은 없으나 2-12시간 내 치료가 필요한 중등도 부상자',
      'C. 가벼운 부상으로 외래 치료만으로 충분한 보행 가능 환자',
      'D. 현재 가용한 자원으로는 소생할 수 없을 만큼 광범위한 손상을 입은 환자',
    ],
    correct: 1,
    explanation: '황색(Yellow)은 지연(Delayed/T2/Priority 2) 범주로, 생명에 즉각적인 위험은 없으나 긴급한 의료적 치료가 필요한 환자. 일반적으로 2시간에서 12시간까지 치료를 지연할 수 있는 중등도 부상자이다.'
  },
  {
    id: 72,
    category: 'START vs SALT 비교',
    question: 'START 알고리즘의 가장 심각한 임상적 한계는 무엇인가?',
    options: [
      'A. 사용하기 너무 복잡하여 현장 적용이 어렵다',
      'B. 과소분류율(Under-triage rate)이 약 20%로 중증 환자를 지연 치료군으로 잘못 분류하는 비율이 높다',
      'C. 화학 재난에서 해독제 투여 절차를 포함하지 않는다',
      'D. B와 C 모두',
    ],
    correct: 3,
    explanation: 'START는 과소분류율이 약 20%로 ACS-COT 권장 기준 5% 미만을 크게 초과한다. 또한 CBRNE 특수 병변 판단 능력이 없으며 화학 재난 시 해독제 투여 절차가 알고리즘 내 포함되어 있지 않다.'
  },
  {
    id: 73,
    category: '신경작용제 대응',
    question: '사린(Sarin) 노출 환자에게 ABCDDs 원칙을 적용할 때 \'D\'와 \'D\'는 각각 무엇을 의미하는가?',
    options: [
      'A. Diagnosis(진단)와 Discharge(퇴원)',
      'B. Decontamination(제독)와 Drugs(해독제 투여)',
      'C. Documentation(문서화)와 Discharge(퇴원)',
      'D. Decontamination(제독)와 Diagnosis(진단)',
    ],
    correct: 1,
    explanation: 'ABCDDs는 Airway, Breathing, Circulation, Decontamination, and Drugs를 의미한다. 신경작용제 노출 환자에게는 기도, 호흡, 순환 유지뿐만 아니라 제독과 해독제(아트로핀, 프랄리독심) 즉각적 투여가 필수이다.'
  },
  {
    id: 74,
    category: '방사능 재난 대응',
    question: '방사능 재난 현장에서 IAEA 지침에 따른 환자 분류의 기본 원칙은?',
    options: [
      'A. 방사성 오염 측정 수치가 높은 순서대로 치료 우선순위를 결정한다',
      'B. 방사능 오염이 있는 환자는 완전히 제독될 때까지 치료를 제공하지 않는다',
      'C. 1차 환자 분류는 방사능 오염의 측정치가 아니라 의학적 상태의 중증도에 기초한다',
      'D. 방사능 피폭 환자는 모두 흑색 태그를 부여한다',
    ],
    correct: 2,
    explanation: 'IAEA의 강력한 지침에 따르면, 방사능 응급 상황에서의 1차 환자 분류는 방사능 오염의 측정치가 아니라 철저하게 의학적 상태의 중증도에 기초하여 수행되어야 한다. 생명을 위협하는 출혈이나 기도 폐쇄 환자에게는 방사선계측기 경보 여부와 관계없이 구명 처치가 최우선이다.'
  },
  {
    id: 75,
    category: '급성 방사선 증후군(ARS) 분류',
    question: '방사선 피폭 후 30분 이내에 구토 증상이 발현된 환자의 임상적 상태 추정은?',
    options: [
      'A. 경미하거나 지연된 피폭 - 대기 관찰 필요',
      'B. 중등도 피폭 - 외래 기반 혈구 모니터링',
      'C. 심각한 피폭 - 즉각적인 CBC 및 조혈기계 파괴 예방 조치',
      'D. 극심한 전신 피폭 상태 - 즉각적인 입원, 제독 및 고강도 소생 치료 필수',
    ],
    correct: 3,
    explanation: '피폭 후 30분 미만 구토 발현은 극심한 전신 피폭 상태를 시사한다. 1시간 이내 급성 발열, 심각한 두통, 수양성 설사 등을 동반할 수 있으며 즉각적인 입원과 고강도 소생 치료가 필수이다.'
  },
  {
    id: 76,
    category: 'CBRN 통제 구역',
    question: 'CBRNE 재난 현장에서 \'탈의(Disrobing)\' 과정이 중요한 의학적 이유는?',
    options: [
      'A. 환자의 신원 확인을 용이하게 한다',
      'B. 완벽한 습식 제독을 대체할 수 있다',
      'C. 신체에 부착된 오염 물질의 75%에서 90%를 즉각적으로 제거하는 건식 제독(Dry decontamination) 효과가 있다',
      'D. 의료진의 환자 신체 검진을 용이하게 한다',
    ],
    correct: 2,
    explanation: '탈의 과정은 단순히 오염된 의복을 벗는 행위 자체만으로도 건식 제독(Dry decontamination)의 역할을 수행하며, 신체에 부착된 오염 물질의 75%에서 90%까지 즉각적으로 제거할 수 있는 가장 신속하고 강력한 첫 번째 임상적 조치이다.'
  },
  {
    id: 77,
    category: '생물학 재난 역학',
    question: '생물학 재난에서 SEIRV 모델의 \'E(Exposed)\'에 해당하는 환자 관리 원칙은?',
    options: [
      'A. 즉각적이고 철저한 격리 조치 및 집중 치료 병동 배정',
      'B. 예방적 격리 및 백신 우선 접종 대상',
      'C. 역학 조사, 증상 발현 모니터링, 예방적 항생제 투여',
      'D. 방역 요원 및 자원봉사 인력으로 활용 가능',
    ],
    correct: 2,
    explanation: 'E(Exposed)는 생물학 작용제에 노출되어 감염되었고 잠복기에 있으나 아직 타인에게 전염성은 없는 상태이다. 역학 조사 및 증상 발현 모니터링과 함께 예방적 항생제 투여(예: 탄저균 노출 시)가 핵심 관리 원칙이다.'
  },
  {
    id: 78,
    category: 'AI 기반 트리아지',
    question: '호라이즌 유럽 보고서에서 2026년 ECRI가 \'AI 진단 딜레마\'를 최우선 환자 안전 위협으로 지목한 이유는?',
    options: [
      'A. AI가 너무 느려서 응급 상황에 실시간 대응이 불가능하다',
      'B. CBRN-E 테러와 군중 압사가 결합된 복합 재난 등 비정형적 상황에서 AI가 환자의 미세한 상태 악화를 전혀 인식하지 못하는 사각지대가 있다',
      'C. AI 시스템이 너무 비싸서 현장에 배치하기 어렵다',
      'D. AI가 항상 과대분류(Over-triage)하여 의료 자원을 낭비한다',
    ],
    correct: 1,
    explanation: '대부분의 상용화된 기계 학습 모델들은 일상적인 환경의 후향적 데이터나 교과서적인 증상 묘사를 바탕으로 훈련되었기 때문에, CBRN-E 테러와 군중 압사가 결합된 복합 재난과 같은 비정형적인 상황에서는 환자의 미세한 상태 악화를 전혀 인식하지 못하는 사각지대를 보이고 있다.'
  },
  {
    id: 79,
    category: '메타버스 시뮬레이션',
    question: '한국군 AI 기반 화생방·중증외상 분류 알고리즘 연구에서 메타버스 훈련의 핵심 시나리오는?',
    options: [
      'A. 병원 내 일반 응급환자 트리아지 훈련',
      'B. 전방 부대에 화학탄 공격으로 인한 폭발 부상 및 신경작용제 중독 환자 다수 발생 상황',
      'C. 자연 재해(지진, 홍수) 후 대량 사상자 구조 훈련',
      'D. 평시 응급실 과밀화 대응 훈련',
    ],
    correct: 1,
    explanation: '연구의 핵심 훈련 시나리오는 \'전방 부대에 화학탄 공격으로 인한 폭발 부상 및 신경작용제 중독 환자 다수 발생 상황\'으로, 사건 발생부터 환자분류, 응급처치, 후송에 이르는 전 과정을 메타버스 가상 환경에서 재현한다.'
  },
  {
    id: 80,
    category: '연합 학습 (Federated Learning)',
    question: '호라이즌 유럽 Project BETHESDA에서 연합 학습(Federated Learning)을 도입하는 주된 이유는?',
    options: [
      'A. AI 모델의 학습 속도를 높이기 위해',
      'B. GDPR 등 프라이버시 규제로 인해 국가 간 의료 데이터를 중앙 서버에 모을 수 없는 상황에서, 원시 데이터를 유출하지 않고도 각 기관에서 AI 모델을 훈련시켜 글로벌 모델을 업데이트하는 기술',
      'C. 의료진의 교육 비용을 절감하기 위해',
      'D. 사이버 보안 위협을 완전히 제거하기 위해',
    ],
    correct: 1,
    explanation: '연합 학습은 원시 데이터를 외부로 유출하지 않고 각 기관이나 사용자의 로컬 엣지(Edge) 단에서 AI 모델을 훈련시킨 뒤, 오직 암호화된 매개변수(Weight)만을 중앙 서버로 전송하여 글로벌 모델을 업데이트하는 기술이다. 이를 통해 GDPR의 독소 조항을 우회하면서도 실시간 감염병 감시와 국경 초월적 추적이 가능해진다.'
  },
  {
    id: 81,
    category: '폭발 손상 분류',
    question: '폭발 사고 현장에서 과대분류(Over-triage)가 특히 문제가 되는 이유는?',
    options: [
      'A. 환자들이 더 심한 부상을 입었다고 거짓말하기 때문',
      'B. 폭발 부상자들에게서 ICU 이송 필요성을 현저히 과대평가하는 경향이 있어, 가벼운 충격 환자들을 무더기로 ICU로 보내어 병상 자원을 포화 상태로 만들기 때문',
      'C. 의료진이 방호복을 착용하여 정확한 평가가 어렵기 때문',
      'D. 폭발 부상자들은 항상 중증 상태이기 때문',
    ],
    correct: 1,
    explanation: '실제 폭발 사고와 일반 외상의 환자 분류 비교 데이터에 따르면, 재난 환경에서 분류 담당자들은 폭발 부상자들의 ICU 이송 필요성을 현저히 과대평가하는 경향이 확인되었다. 이로 인해 ICU 병상이 순식간에 포화 상태가 되어 진짜 중증 환자가 적절한 집중치료를 받지 못하는 결과를 초래한다.'
  },
  {
    id: 82,
    category: '사망률 역설 (Mortality Paradox)',
    question: '한국 의료-계엄 위기(2024-2025) 연구에서 \'사망률 역설(Mortality Paradox)\'이 의미하는 것은?',
    options: [
      'A. 응급실 내 사망률이 기대보다 낮게 나타났지만 실제로는 암 수술 지연 등 숨겨진 사상자(Hidden Casualties)가 급증했다는 것',
      'B. 의료 위기 상황에서 사망자가 전혀 발생하지 않았다는 것',
      'C. 의료진의 노력으로 사망률이 절반으로 감소했다는 것',
      'D. AI가 정확하게 사망률을 예측했다는 것',
    ],
    correct: 0,
    explanation: '응급실 내 사망률의 통계적 안정성(보정 RR 1.03)은 \'영웅적 선별(Heroic Triage)\'의 결과였지만, 실제로는 암 수술 대기 환자의 30일 사망률 12% 증가, 급성심근경색 전원 중 사망 8% 증가, 뇌졸중 15% 증가 등 \'숨겨진 사상자(Hidden Casualties)\'가 급증했다. 죽음은 응급실이 아닌 대기자 명단과 전원 과정으로 이동한 \'사망의 전위(Mortality Displacement)\' 현상이다.'
  },
  {
    id: 83,
    category: 'MPTT-24 알고리즘',
    question: 'MPTT-24 알고리즘이 기존 START 알고리즘과 다른 핵심적인 차이점은?',
    options: [
      'A. 호흡수 임계값을 기존보다 낮게 설정하고 GCS 척도를 사용한다',
      'B. 호흡수 임계값을 분당 24회(≥24 bpm)로 상향하고 GCS 대신 직관적인 AVPU 척도를 도입하여 평가 시간을 단축한다',
      'C. 혈압만으로 환자를 분류한다',
      'D. 화학 작용제 노출 여부만 평가한다',
    ],
    correct: 1,
    explanation: 'MPTT-24의 두 가지 핵심 혁신은 호흡수(RR) 임계값을 분당 24회(≥24 bpm)로 상향하여 빈호흡 환자를 더 신속하게 걸러낼 수 있도록 하고, 복잡한 GCS 대신 더 직관적인 AVPU(Alert, Verbal, Pain, Unresponsive) 척도를 도입하여 환자 1인당 평가 시간을 획기적으로 단축한 것이다.'
  },
  {
    id: 84,
    category: '더티 소생술 (Dirty Resuscitation)',
    question: '\'더티 소생술(Dirty resuscitation)\'의 개념이 적용되어야 하는 상황은?',
    options: [
      'A. 의료 시설이 오염된 경우에 소독 후 소생술을 시행하는 것',
      'B. 혈압이 떨어지거나 호흡이 정지된 불안정한 중증 오염 환자에게 완벽한 습식 제독이 끝날 때까지 기다리지 않고 오염 구역 내에서 즉각적으로 구명 처치를 병행하는 것',
      'C. 오염된 의료 기구를 사용하여 응급 처치를 시행하는 것',
      'D. 비의료진이 소생술을 시행하는 것',
    ],
    correct: 1,
    explanation: '더티 소생술은 혈압이 떨어지거나 호흡이 정지된 불안정한 중증 오염 환자의 경우, 완벽한 습식 제독이 끝날 때까지 구명 처치를 미룰 수 없을 때 오염 구역 내에서 혹은 제독이 진행되는 와중에 즉각적으로 심폐 소생술이나 기도 유지 등의 구명 처치를 병행하는 개념이다.'
  },

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

// ============================================
// NEW GAME MODE DATA
// ============================================

const ETHICS_DILEMMAS = [
  {
    id: 'ET-001',
    title: '인공호흡기 배분 — 세대 간 공정성',
    scenario: '대규모 호흡기 팬데믹 상황. 중환자실에 인공호흡기 1대만 남았고 두 환자가 동시에 필요로 합니다. 환자 A는 20세 대학생으로 기저 질환 없음. 환자 B는 70세 은퇴 의사로 지역사회에 크게 기여했으나 만성 심부전이 있습니다. 두 환자 모두 인공호흡기 없이는 생존이 불가능합니다.',
    options: [
      {
        id: 'a',
        text: '20세 환자에게 배분 (공리주의: 기대 수명과 생존 가능성 최대화)',
        framework: '공리주의(Utilitarianism)',
        pros: '기대 수명·QALY 극대화, 생존 가능성 높음',
        cons: '나이에 의한 차별, 기여도 무시'
      },
      {
        id: 'b',
        text: '70세 환자에게 배분 (덕윤리: 사회적 기여와 덕을 인정)',
        framework: '덕 윤리(Virtue Ethics)',
        pros: '사회적 공헌 인정',
        cons: '지속적 기여를 측정하는 기준의 불공정성'
      },
      {
        id: 'c',
        text: '생존 가능성 점수(SOFA 기반)로 결정하고 윤리위원회 검토',
        framework: '절차적 공정성(Procedural Justice)',
        pros: '투명하고 일관된 기준, 개인 편견 최소화',
        cons: '시간 소요, 긴급 상황에 부적합할 수 있음'
      },
      {
        id: 'd',
        text: '추첨으로 결정 (평등주의: 모든 생명은 동등)',
        framework: '평등주의(Egalitarianism)',
        pros: '완전한 평등, 차별 없음',
        cons: '의학적 근거 부재, 생존 가능성 무시'
      }
    ],
    noSingleAnswer: true,
    explanation: '이 딜레마는 재난 의료에서 가장 어려운 의사결정 중 하나입니다. 공리주의(최대 다수의 최대 이익), 의무론(생명의 동등한 가치), 덕 윤리(사회적 공헌), 절차적 공정성(투명한 기준) 등 다양한 윤리 프레임워크가 충돌합니다. 위기 기준(Crisis Standards)에서는 생존 가능성 기반 프로토콜(SOFA 등)을 사용하되, 윤리위원회의 감독과 투명한 절차가 필수입니다. 나이만을 근거로 한 배분은 대부분의 윤리 프레임워크에서 지지받지 못합니다.',
    ethicalPrinciples: ['자율성(Autonomy)', '선행(Beneficence)', '무해(Non-maleficence)', '공정(Justice)']
  },
  {
    id: 'ET-002',
    title: 'Crisis Standards of Care 전환 시점',
    scenario: '지역 병원 응급실장입니다. 대형 재난으로 환자가 급증하고 있습니다. 현재 중환자실 가동률 88%, 인공호흡기 70% 사용 중. 일부 직원은 "아직 위기가 아니다"라고 하고, 다른 직원은 "지금 당장 위기 기준으로 전환해야 한다"고 합니다. 당신의 결정은?',
    options: [
      {
        id: 'a',
        text: '아직 통상 기준 유지 — 자원이 남아있는 한 개인 최적 치료 제공',
        framework: '의무론적 접근',
        pros: '개별 환자 최선 이익 보호',
        cons: '자원 고갈 시 대비 없음, 갑작스러운 전환의 혼란'
      },
      {
        id: 'b',
        text: '즉시 위기 기준으로 전환 — 자원 배분 원칙 변경',
        framework: '공리주의적 접근',
        pros: '자원 보존, 대량 환자 대응 준비',
        cons: '일부 개별 환자 치료 질 저하, 법적 근거 필요'
      },
      {
        id: 'c',
        text: '비상 기준(Contingency)으로 전환하면서 지속 모니터링, 명확한 전환 기준 미리 수립',
        framework: '단계적·절차적 접근',
        pros: '유연한 대응, 투명한 기준, 조직 준비 가능',
        cons: '중간 단계 결정의 복잡성'
      },
      {
        id: 'd',
        text: '상급 기관(병원 이사회, 보건부)의 지시를 기다림',
        framework: '권한 위임',
        pros: '법적 보호, 일관된 지역 정책',
        cons: '현장 상황 반영 지연, 골든타임 놓칠 수 있음'
      }
    ],
    noSingleAnswer: true,
    explanation: 'Standards of Care 전환은 단순히 자원 부족이 시작될 때가 아니라, 명확한 기준(가동률, 인력, 예측 상황)을 미리 설정하고 투명하게 적용해야 합니다. 이상적으로는 통상→비상→위기 기준으로의 단계적 전환 기준을 사전 프로토콜화하고, 현장 의사와 윤리위원회가 공동으로 판단하는 구조가 최선입니다.',
    ethicalPrinciples: ['공정(Justice)', '선행(Beneficence)', '투명성(Transparency)', '책임성(Accountability)']
  },
  {
    id: 'ET-003',
    title: '감염병 환자 정보 공개 vs 개인정보 보호',
    scenario: 'MERS 유사 신종 감염병이 발생했습니다. 당신은 지역 보건소장입니다. 감염 환자가 방문한 의료기관 명단을 공개하면 감염 확산을 막을 수 있지만, 해당 병원은 막대한 경제적 피해와 낙인을 우려합니다. 환자 개인도 직장·가족 관계에서 심각한 불이익을 받을 수 있습니다. 어떻게 결정하겠습니까?',
    options: [
      {
        id: 'a',
        text: '병원명과 방문 날짜를 즉시 전면 공개 — 공중 보건 우선',
        framework: '공리주의 / 공중보건 윤리',
        pros: '자발적 격리 증가, 전파 차단, 신뢰 형성',
        cons: '낙인, 병원 경제 피해, 환자 프라이버시 침해'
      },
      {
        id: 'b',
        text: '환자 동의를 구하고 익명으로 역학 정보만 공개',
        framework: '자율성 존중 / 개인정보 보호',
        pros: '환자 권리 보호',
        cons: '익명 정보로는 접촉자 추적 불완전'
      },
      {
        id: 'c',
        text: '병원명은 공개하되 환자 개인 정보는 비공개, 접촉자 직접 통보',
        framework: '균형된 접근 / 비례성 원칙',
        pros: '공중보건 목표 달성 + 개인정보 최소 침해',
        cons: '접촉자 통보 체계의 현실적 한계'
      },
      {
        id: 'd',
        text: '중앙 보건부 결정을 기다리며 지역에서는 비공개 유지',
        framework: '위계적 의사결정',
        pros: '일관된 국가 정책',
        cons: '지역 대응 지연, MERS 사태 반복 위험'
      }
    ],
    noSingleAnswer: true,
    explanation: '2015년 MERS 사태에서 병원 명단 비공개가 공황과 신뢰 붕괴를 초래했습니다. 공중 보건 윤리에서는 "필요 최소 원칙(principle of least infringement)"에 따라 공중 보건 목표를 달성하는 데 필요한 최소한의 개인정보만 공개하도록 합니다. 대부분의 전문가는 병원명 공개는 공공의 이익에 부합하지만, 개인 식별 정보는 보호해야 한다고 봅니다.',
    ethicalPrinciples: ['자율성(Autonomy)', '공정(Justice)', '공공선(Common Good)', '비례성(Proportionality)']
  },
  {
    id: 'ET-004',
    title: '의료진 자기 보호 vs 환자 치료 의무',
    scenario: '에볼라 유형 고위험 바이러스 환자가 응급실에 도착했습니다. 적절한 PPE(Level A)가 현재 2세트밖에 없습니다. 응급팀 4명이 있고, 당신은 팀장입니다. 처치가 지연되면 환자 사망 가능성이 높습니다. PPE가 없는 팀원들은 치료에 참여를 거부할 권리가 있습니까?',
    options: [
      {
        id: 'a',
        text: 'PPE 보유 2명만 처치, 나머지는 PPE 추가 확보 및 지원 역할',
        framework: '비례적 위험 분담',
        pros: '팀원 안전 보호, 효율적 역할 분담',
        cons: '인력 부족으로 처치 질 저하 가능'
      },
      {
        id: 'b',
        text: '의료 전문직의 의무로 모든 팀원이 위험을 감수하고 처치',
        framework: '의무론적 직업 윤리',
        pros: '환자 최선 이익 보호',
        cons: '의료진 감염 위험, 가족 안전 위협, 장기적 인력 손실'
      },
      {
        id: 'c',
        text: '자원 의료진(자발적 참여자)만 처치에 투입, 강제 없음',
        framework: '자율성 존중',
        pros: '강제 없는 자발적 참여',
        cons: '자원자가 없으면 처치 불가'
      },
      {
        id: 'd',
        text: '환자를 격리 유지하고 PPE 확보 시까지 처치 지연',
        framework: '위험 최소화',
        pros: '팀원 안전 최대 보호',
        cons: '환자 상태 악화, 치료 의무 방기 논란'
      }
    ],
    noSingleAnswer: true,
    explanation: 'WHO와 의료윤리 전문가들은 의료진이 합리적인 보호 장비 없이 고위험 감염에 노출될 의무는 없다고 봅니다. 동시에 의료 전문직은 "수용 가능한 위험(acceptable risk)"을 감수하는 의무가 있습니다. 핵심은 기관이 적절한 PPE를 제공할 의무가 있고, 부족한 상황에서는 최대한의 보호 하에 최소 인원으로 처치하며 추가 자원을 신속히 확보하는 것입니다.',
    ethicalPrinciples: ['선행(Beneficence)', '무해(Non-maleficence)', '자율성(Autonomy)', '호혜성(Reciprocity)']
  },
  {
    id: 'ET-005',
    title: 'Triage 현장에서 가족 발견',
    scenario: '당신은 재난 현장 Triage 담당 의사입니다. BLACK으로 분류하려던 환자가 갑자기 당신의 가족임을 알았습니다. 의식 없음, 기도 개방 후 호흡 없음. Triage 프로토콜에 따르면 BLACK이지만, 당신은 개인적으로 더 많은 처치를 하고 싶습니다. 어떻게 행동하겠습니까?',
    options: [
      {
        id: 'a',
        text: '즉시 다른 의사에게 Triage를 넘기고 현장에서 물러남',
        framework: '이해충돌 회피 원칙',
        pros: '객관성 유지, 다른 환자에게 자원 집중',
        cons: '인간적 고통, 결정의 어려움'
      },
      {
        id: 'b',
        text: '프로토콜을 따라 BLACK 분류, 다른 환자에게 집중',
        framework: '의무론적 공정성',
        pros: '일관된 프로토콜, 다른 환자 공정',
        cons: '개인 감정과의 극심한 충돌'
      },
      {
        id: 'c',
        text: '가족이기 때문에 추가 소생 시도, 다른 환자 처치 잠시 중단',
        framework: '친밀 관계 우선주의',
        pros: '인간적 반응',
        cons: '다른 환자 불공정, 자원 낭비, 프로토콜 위반'
      },
      {
        id: 'd',
        text: '다른 의사에게 BLACK 여부 재확인 요청 후 프로토콜에 따름',
        framework: '절차적 재확인',
        pros: '객관성 유지 + 인간적 배려',
        cons: '추가 시간 소요'
      }
    ],
    noSingleAnswer: true,
    explanation: '재난 의료에서 가장 인간적으로 힘든 시나리오 중 하나입니다. 대부분의 재난 의료 윤리 지침은 이해충돌(conflict of interest) 상황에서 해당 의료진이 직접 판단하는 것을 피하고 다른 의료인에게 위임하도록 권고합니다. 이는 개인 감정으로 인한 판단 왜곡을 방지하여 다른 환자의 공정한 대우를 보호하기 위함입니다.',
    ethicalPrinciples: ['공정(Justice)', '이해충돌(Conflict of Interest)', '자율성', '의무(Duty)']
  },
  {
    id: 'ET-006',
    title: '자원 부족 시 외국인 노동자 치료 우선순위',
    scenario: '대형 공장 화재로 50명이 부상당했습니다. 그 중 20명이 비자 미등록 외국인 노동자입니다. 병원 자원이 부족하여 30명 분의 치료 자원밖에 없습니다. 지역 주민 일부는 "자국민 먼저"를 요구합니다. 의료팀 리더로서 어떻게 결정하겠습니까?',
    options: [
      {
        id: 'a',
        text: '자국민 우선 — 사회적 자원(세금)으로 운영되는 의료 시스템',
        framework: '국가주의/공동체주의',
        pros: '지역사회 지지 획득',
        cons: '의료 윤리와 인권 명백한 위반'
      },
      {
        id: 'b',
        text: '국적 무관, 의료적 중증도(Triage)만 기준으로 배분',
        framework: '의료 보편주의 / 인도주의 원칙',
        pros: '의료 윤리 준수, 생명 동등성 인정',
        cons: '정치적·사회적 압력'
      },
      {
        id: 'c',
        text: '자국민 우선이되 외국인 중증 환자는 예외 처리',
        framework: '절충적 접근',
        pros: '현실적 타협',
        cons: '기준의 임의성, 불투명한 원칙'
      },
      {
        id: 'd',
        text: '상급 기관 결정까지 대기',
        framework: '권한 위임',
        pros: '법적 보호',
        cons: '처치 지연으로 사망 위험'
      }
    ],
    noSingleAnswer: true,
    explanation: 'WHO, 국경없는의사회(MSF), 적십자 등 모든 국제 의료 인도주의 기준은 재난 의료에서 국적, 신분, 지불 능력에 관계없이 의료적 필요(medical need)만을 기준으로 치료해야 한다고 명시합니다. 국적에 따른 차별적 배분은 의료 윤리의 근본 원칙인 공정(Justice)과 선행(Beneficence)에 위배됩니다.',
    ethicalPrinciples: ['공정(Justice)', '선행(Beneficence)', '인간 존엄성', '보편성(Universality)']
  },
  {
    id: 'ET-007',
    title: '팬데믹 시 의료진 강제 동원 윤리',
    scenario: '심각한 팬데믹으로 의료 인력이 극도로 부족합니다. 정부는 의료 면허 보유자 전원을 강제 동원하는 법령을 발동했습니다. 은퇴한 70세 외과의사와 육아 중인 소아과 전문의가 동원 대상에 포함되었습니다. 이 정책은 윤리적으로 정당합니까?',
    options: [
      {
        id: 'a',
        text: '완전히 정당 — 재난 시 사회 연대를 위해 개인 희생은 불가피',
        framework: '공동체주의/공중보건 윤리',
        pros: '인력 최대 동원',
        cons: '개인 자율성 완전 무시, 위험 노출'
      },
      {
        id: 'b',
        text: '완전히 부당 — 자발적 참여만이 윤리적',
        framework: '자유주의적 자율성',
        pros: '개인 권리 최대 보호',
        cons: '충분한 인력 확보 불가'
      },
      {
        id: 'c',
        text: '제한적 정당 — 위험군(고령자, 영유아 양육 중) 제외, 건강한 현직 의료인 우선, 공정한 보상과 보호 제공 조건으로',
        framework: '비례성 원칙 / 호혜적 의무',
        pros: '인력 확보 + 취약군 보호 균형',
        cons: '기준 설정의 복잡성'
      },
      {
        id: 'd',
        text: '강제 동원 대신 파격적 인센티브로 자원 유도',
        framework: '자발적 인센티브',
        pros: '자율성 존중',
        cons: '신속한 인력 확보 불확실'
      }
    ],
    noSingleAnswer: true,
    explanation: '재난 시 의료 동원 윤리에서 "호혜적 의무(reciprocal obligation)" 개념이 중요합니다. 사회가 의료인에게 면허, 교육, 사회적 지위를 제공한 것에 대한 답례로 위기 시 일정한 위험을 감수할 의무가 있다는 것입니다. 단, 이 의무는 합리적 보호(PPE, 보험), 공정한 보상, 취약군 제외 등 조건이 충족될 때 정당화됩니다.',
    ethicalPrinciples: ['자율성(Autonomy)', '공정(Justice)', '호혜성(Reciprocity)', '비례성(Proportionality)']
  },
  {
    id: 'ET-008',
    title: '소아 vs 성인 인공호흡기 배분',
    scenario: '지진 재난 후 병원에 인공호흡기 1대만 남았습니다. 환자 A는 7세 아동으로 뇌 손상 없는 폐렴. 환자 B는 45세 성인으로 다발성 장기부전 초기이나 아직 회복 가능성 있음. 두 환자의 생존 가능성이 비슷할 때 어떻게 결정합니까?',
    options: [
      {
        id: 'a',
        text: '아동 우선 — 더 많은 미래 생존 기간(QALY 극대화)',
        framework: '공리주의 / QALY 기반',
        pros: '기대 생존 기간 최대화',
        cons: '나이 기반 차별 논란, 성인 생명 경시'
      },
      {
        id: 'b',
        text: '성인 우선 — 의료 자원에 더 많이 기여함(사회적 기여도)',
        framework: '사회적 기여도 기준',
        pros: '사회적 역할 인정',
        cons: '아동 권리 침해, 미래 기여 가능성 무시'
      },
      {
        id: 'c',
        text: '의학적 생존 가능성만 평가, 나이는 기준에서 제외',
        framework: '의학적 기준 우선',
        pros: '나이 차별 방지, 일관된 의료 기준',
        cons: '두 환자 생존 가능성이 같을 때 결정 기준 없음'
      },
      {
        id: 'd',
        text: '추첨 — 동등한 생존 가능성이면 무작위 배분',
        framework: '평등주의',
        pros: '완전한 공정성',
        cons: '의학적 차이 무시, 가족·사회 반발'
      }
    ],
    noSingleAnswer: true,
    explanation: '소아 vs 성인 자원 배분은 전 세계 생명윤리학자들 사이에서도 합의가 없는 어려운 문제입니다. 많은 위기 기준 프로토콜은 나이 자체를 배분 기준에서 제외하되, 생리적 생존 가능성 점수를 사용합니다. 소아는 성인과 다른 생리를 가지므로 별도 평가 기준(PELOD-2 등)을 사용하며, 나이에 의한 직접적 차별은 피하는 것이 국제적 추세입니다.',
    ethicalPrinciples: ['공정(Justice)', '공리주의', '아동 권리', '생명의 동등한 가치']
  },
  // ============================================
  // NEW ETHICS DILEMMAS (CBRN/Special Disaster)
  // ============================================
  {
    id: 'ETH-009',
    title: '신경작용제 무호흡 환자 — Expectant 분류의 윤리',
    scenario: '대량 신경작용제 노출 사고 현장. 50명 환자 중 5명이 무호흡 + 심폐정지 상태이며 Atropine 초기 투여에 무반응입니다. 의료진은 2명뿐이고, Atropine 재고 30회분으로 나머지 45명의 위중 환자를 치료해야 합니다. 심폐정지 환자를 Black(Expectant)으로 분류해야 합니까?',
    noSingleAnswer: true,
    options: [
      {
        id: 'a',
        text: '5명 전원 Black(Expectant) 분류 — 45명의 생존 가능 환자에 자원 집중',
        framework: '공리주의 / 위기 표준 의료(CSC)',
        pros: ['최대 다수의 생존 극대화', '제한된 해독제의 효율적 사용', 'CBRN MCI 가이드라인에 부합'],
        cons: ['일부 생존 가능 환자를 포기할 수 있음', '의료진의 도덕적 고통(moral distress)']
      },
      {
        id: 'b',
        text: '5명 전원에 대해 추가 Atropine 투여 시도 — 모든 생명은 동등',
        framework: '의무론적 윤리 / 생명 존엄성',
        pros: ['모든 생명에 동등한 기회 제공'],
        cons: ['30회분 해독제 고갈 시 45명 사망 위험', '자원 배분의 비효율성']
      },
      {
        id: 'c',
        text: '2회 추가 투여 후 무반응 시 Black 전환 — 단계적 접근',
        framework: '비례성 원칙 / 시한부 시도(Time-limited trial)',
        pros: ['추가 시도로 도덕적 정당성 확보', '자원 소모 제한적'],
        cons: ['추가 시도 시간 동안 다른 환자 치료 지연']
      },
      {
        id: 'd',
        text: '윤리위원회 긴급 소집 후 결정',
        framework: '절차적 공정성',
        pros: ['체계적이고 투명한 의사결정'],
        cons: ['현장에서 윤리위원회 소집 비현실적, 골든타임 소실']
      },
    ],
    discussion: 'CBRN 대량 사상자 상황에서 심폐정지 + 초기 해독제 무반응 환자의 Expectant 분류는 위기 표준 의료(Crisis Standards of Care)의 핵심적 적용 사례입니다. 평상시에는 CPR을 포기하지 않지만, MCI에서는 "최대 다수의 최선의 결과"를 위해 불가피한 결정일 수 있습니다. 모든 결정은 반드시 기록하고, 자원 여유 발생 시 재평가해야 합니다.'
  },
  {
    id: 'ETH-010',
    title: '방사능 오염 환자 치료 거부 — 의료진의 공포',
    scenario: '더티밤 폭발 후 방사능 오염 환자가 응급실에 도착했습니다. 제염이 완료되었으나, 일부 간호사들이 "방사능 공포"로 치료 참여를 거부하고 있습니다. 환자 상태는 출혈성 쇼크로 즉각 수술이 필요합니다. 수술팀 마취과 의사 1명도 참여를 주저하고 있습니다.',
    noSingleAnswer: true,
    options: [
      {
        id: 'a',
        text: '제염 완료 환자의 안전성을 과학적으로 설명하고 참여 독려',
        framework: '교육적 접근 / 위험 소통',
        pros: ['과학적 근거로 공포 해소', '자발적 참여 유도'],
        cons: ['공포가 즉시 해소되지 않을 수 있음', '시간 지연']
      },
      {
        id: 'b',
        text: '거부 의사를 존중하고 다른 의료진으로 대체',
        framework: '자율성 존중',
        pros: ['의료진 자율성 보호'],
        cons: ['대체 인력 부재 시 환자 사망', '팀 사기 저하']
      },
      {
        id: 'c',
        text: '의료 전문직의 의무로 참여를 명령하되, 추가 보호 장비 제공 및 노출 기록 약속',
        framework: '호혜적 의무 / 비례적 위험',
        pros: ['환자 생명 보호', '보호 조치로 위험 최소화'],
        cons: ['강제 명령의 윤리적 문제', '장기적 팀 관계 훼손']
      },
      {
        id: 'd',
        text: '자원 의료진만으로 팀 구성하여 수술 진행',
        framework: '자발적 참여 + 환자 우선',
        pros: ['자발적 참여로 팀 결속', '환자 치료 진행'],
        cons: ['인력 부족 시 수술 질 저하']
      },
    ],
    discussion: '방사능 공포(radiophobia)는 실제 방사선 위험보다 훨씬 큰 심리적 장벽입니다. 제염 완료 환자는 의료진에게 방사선 위험을 거의 주지 않습니다. 그러나 의료진의 공포를 무시하거나 강제하는 것은 장기적 팀 역량을 해칩니다. 최선의 접근은 사전 교육, 제염 완료 확인의 투명한 공유, 추가 보호 장비 제공, 그리고 노출 기록과 추적의 약속입니다.'
  },
  {
    id: 'ETH-011',
    title: '지진 매몰자 구출 순서 — 누구를 먼저 구할 것인가',
    scenario: '건물 붕괴 현장에서 동시에 2명의 매몰자가 발견되었습니다. 환자 A는 5세 아동으로 비교적 접근이 용이하나 4시간 이상 압박 상태. 환자 B는 35세 성인으로 접근이 어렵지만 압박 시간이 짧아(1시간) 압좌 증후군 위험이 낮습니다. 구조대는 1팀뿐입니다.',
    noSingleAnswer: true,
    options: [
      {
        id: 'a',
        text: '아동(A) 우선 구출 — 접근 용이 + 압좌 증후군 위험 긴급',
        framework: '의학적 긴급도 우선 / 소아 보호',
        pros: ['의학적으로 더 긴급한 환자 우선', '접근 용이성으로 효율적', '아동 보호 원칙'],
        cons: ['성인 환자의 접근이 더 어려워질 수 있음']
      },
      {
        id: 'b',
        text: '성인(B) 우선 구출 — 짧은 압박 시간으로 합병증 위험 낮음, 빠른 구출 가능',
        framework: '효율성 기반 접근',
        pros: ['신속한 구출로 1명 빠르게 안전 확보'],
        cons: ['아동의 압좌 증후군 진행 위험 증가']
      },
      {
        id: 'c',
        text: '의학적 긴급도(압박 시간, 활력징후) 기반으로 판단, 나이는 기준에서 제외',
        framework: '의학적 기준 최우선',
        pros: ['나이 차별 없는 객관적 기준'],
        cons: ['현장에서 정확한 의학적 평가가 어려울 수 있음']
      },
      {
        id: 'd',
        text: '구조대를 분할하여 동시 구출 시도',
        framework: '자원 분할',
        pros: ['두 환자 모두에게 기회 제공'],
        cons: ['1팀 분할 시 구출 역량 저하, 양쪽 모두 실패 위험']
      },
    ],
    discussion: '재난 구조에서 "누구를 먼저 구할 것인가"는 의학적 긴급도, 접근 가능성, 구출 성공 가능성을 종합적으로 판단해야 합니다. 일반적으로 의학적 긴급도(압좌 증후군 진행 위험)가 가장 중요한 기준이며, 접근 용이성은 구출 효율성에 영향을 줍니다. 나이 자체는 구출 순서의 기준이 될 수 없지만, 소아의 생리적 보상 능력과 압좌 합병증 패턴은 성인과 다르므로 별도 고려가 필요합니다.'
  },
  {
    id: 'ETH-012',
    title: '화상 환자 자원 배분 — 중증 화상 vs 중등도 화상 다수',
    scenario: '산업 폭발 사고로 화상센터에 병상 5개만 남았습니다. 환자 A는 80% TBSA 3도 화상의 40세 성인(생존율 <10%), 환자 B-F는 각각 20-30% TBSA 2도 화상(생존율 >80%)의 5명입니다. A 1명에게 집중 치료하면 B-F 중 2명은 화상센터 치료를 받지 못합니다.',
    noSingleAnswer: true,
    options: [
      {
        id: 'a',
        text: '환자 A에게 최선의 치료 시도 — 생존 가능성이 있는 한 치료 의무',
        framework: '의무론적 접근 / 생명 존엄성',
        pros: ['모든 생명에 최선을 다하는 의료 윤리'],
        cons: ['생존율 <10% 환자에 자원 집중으로 5명 중 2명 치료 불가']
      },
      {
        id: 'b',
        text: '환자 B-F 5명 우선 — 생존 가능성 극대화',
        framework: '공리주의 / QALY 극대화',
        pros: ['최대 다수의 생존', '제한된 자원의 효율적 사용'],
        cons: ['환자 A의 치료 기회 박탈', '의료진의 도덕적 고통']
      },
      {
        id: 'c',
        text: '환자 A에게 완화 치료(palliative care) 제공, B-F에게 화상센터 병상 배분',
        framework: '비례적 접근 / 완화 의료',
        pros: ['A에게도 인도적 치료 제공', '자원의 최적 배분'],
        cons: ['A에 대한 적극적 치료 포기에 대한 윤리적 부담']
      },
      {
        id: 'd',
        text: '외부 화상센터 전원을 시도하며 동시에 모든 환자 치료',
        framework: '자원 확장 시도',
        pros: ['모든 환자에게 기회 제공 노력'],
        cons: ['전원 시도 중 시간 소모, 현실적 가능성 불확실']
      },
    ],
    discussion: '중증 화상 자원 배분에서 생존 가능성(생존율)은 가장 중요한 의학적 기준입니다. 80% TBSA 3도 화상의 생존율이 <10%인 반면 20-30% TBSA 환자의 생존율은 >80%이므로, 위기 기준(CSC)에서는 후자에 자원을 우선 배분하는 것이 정당화됩니다. 그러나 환자 A에 대한 완화 치료(통증 관리, 인도적 돌봄)는 반드시 제공되어야 하며, "포기"가 아닌 "치료 목표의 전환"으로 프레이밍해야 합니다.'
  },

];

const LEADERSHIP_SCENARIOS = [
  {
    id: 'LS-001',
    title: '절대 안전 신화의 붕괴',
    situation: '당신은 대형 병원 의료원장입니다. 직원들은 "우리 병원은 절대 재난이 발생하지 않는다"는 안전 불감증이 팽배합니다. 최근 인근 병원에서 화재 사고가 발생했음에도 "우리는 다르다"는 반응이 대부분입니다. 오늘 병원 이사회에서 재난 대비 투자를 논의해야 합니다.',
    options: [
      { id: 'a', text: '이사회에 "우리 병원은 안전하다"고 보고, 재난 대비 투자 불필요하다고 주장', correct: false },
      { id: 'b', text: '인근 병원 사례를 구체적 데이터로 제시, "절대 안전이란 없다"는 현실을 직시하게 하고 단계적 투자 계획 제안', correct: true },
      { id: 'c', text: '이사회 결정을 기다리며 현 상태 유지', correct: false },
      { id: 'd', text: '직원들 스스로 안전의식이 생길 때까지 기다림', correct: false }
    ],
    bestChoice: 1,
    leadershipPrinciple: '통제 환상(Illusion of Control) 극복 — 현실 직시',
    explanation: '후쿠시마 원전 사고의 핵심 원인 중 하나는 "절대 안전 신화"였습니다. 위기 리더는 조직 내 안전 불감증("It won\'t happen to us")에 맞서 구체적 데이터와 사례로 현실을 직시하게 해야 합니다. 스톡데일 패러독스의 핵심처럼, 냉혹한 현실 인정이 진정한 위기 대비의 출발점입니다.'
  },
  {
    id: 'LS-002',
    title: '팬데믹 초기 — 투명한 소통의 딜레마',
    situation: '신종 감염병이 발생했습니다. 당신은 지역 공공병원 원장입니다. 아직 확진자 수가 적고 위험도가 불명확합니다. 직원들은 불안해하고, 지역 언론은 "병원이 정보를 숨기고 있다"고 보도하기 시작했습니다. 당신의 첫 번째 소통 전략은?',
    options: [
      { id: 'a', text: '"상황이 파악될 때까지 공식 발표 없음" — 정보 통제', correct: false },
      { id: 'b', text: '"걱정하지 않아도 됩니다, 모두 통제되고 있습니다" — 낙관적 메시지', correct: false },
      { id: 'c', text: '"현재 알려진 것과 모르는 것을 모두 투명하게 공개, 우리의 대응 조치 설명, 불확실성 인정"', correct: true },
      { id: 'd', text: '상급 기관 지시가 올 때까지 기다림', correct: false }
    ],
    bestChoice: 2,
    leadershipPrinciple: '신뢰의 속도 — 투명성과 적시성',
    explanation: 'MERS 사태에서 정보 비공개가 불신과 공황을 초래했습니다. 신뢰의 속도(Speed of Trust) 원칙: 투명성이 단기적으로는 불안을 증가시킬 수 있지만, 장기적으로 신뢰를 형성하여 대응 속도를 높입니다. WHO 위기 소통 원칙의 핵심은 "알려진 것, 모르는 것, 하고 있는 것"을 동시에 솔직히 전달하는 것입니다.'
  },
  {
    id: 'LS-003',
    title: '이태원 참사형 — 혼란 속 ICS 수립',
    situation: '대규모 군중 사고가 발생했습니다. 현장에 경찰, 소방, 응급의학과 의사, 자원봉사자 등이 뒤섞여 있고 각자 다른 지시를 내리고 있습니다. 당신은 현장에 도착한 응급의학 전문의입니다. 첫 5분 안에 무엇을 해야 합니까?',
    options: [
      { id: 'a', text: '즉시 가장 중증 환자 치료 시작', correct: false },
      { id: 'b', text: '경찰에게 지휘를 맡기고 의료 처치만 집중', correct: false },
      { id: 'c', text: '현장 지휘관 파악 또는 스스로 지정, 지휘소 설치, 의료 섹터 책임자 역할 명확히 하고 다른 팀과 통합 지휘 수립', correct: true },
      { id: 'd', text: '상황 파악을 위해 전체 현장 순찰 후 결정', correct: false }
    ],
    bestChoice: 2,
    leadershipPrinciple: '현장 지휘체계(ICS) — 혼란 속 질서 수립',
    explanation: '이태원 참사의 핵심 교훈: 초기 5분의 지휘체계 수립이 이후 전체 대응의 질을 결정합니다. 치료보다 조직화가 먼저입니다("Organize before you treat"). 의사가 반드시 전체 지휘관이 될 필요는 없지만, 의료 섹터의 명확한 지휘 구조와 다른 기관과의 통합 지휘소 수립이 필수입니다.'
  },
  {
    id: 'LS-004',
    title: '"Sucking Down" — 현장 목소리 경청',
    situation: '탄저균 우편물 테러 의심 사건이 발생했습니다. 당신은 공중보건국 국장입니다. 현장에서 일하는 우편 분류 직원들이 "이 증상이 탄저와 관련 있을 것 같다"고 보고했지만, 중간 관리자들은 "전문가가 아니라 무시해도 된다"고 했습니다. 어떻게 대응하겠습니까?',
    options: [
      { id: 'a', text: '전문가 의견만 신뢰, 현장 직원 보고 무시', correct: false },
      { id: 'b', text: '현장 직원 보고를 즉시 심각하게 받아들이고 전문팀 파견 및 직접 현장 확인', correct: true },
      { id: 'c', text: '추가 보고가 올 때까지 대기', correct: false },
      { id: 'd', text: '언론에 "조사 중"이라고 발표하고 결과 기다림', correct: false }
    ],
    bestChoice: 1,
    leadershipPrinciple: '"Sucking Down" — 현장 정보 중시와 조기 경보 체계',
    explanation: '2001년 미국 탄저균 우편 테러 당시, 초기 현장 우편 직원들의 증상 보고가 무시되었고 그 결과 사망자가 발생했습니다. "Sucking Down"은 조직 위계 구조에서 최전선(현장) 직원의 정보를 최고 의사결정자에게 직접 전달하는 문화입니다. 위기 리더는 현장의 "약한 신호(weak signals)"를 조기에 포착하는 시스템을 구축해야 합니다.'
  },
  {
    id: 'LS-005',
    title: 'MERS 병원 감염 — 정보공개 결정',
    situation: '당신의 병원에서 MERS 환자가 발생하여 50명의 의료진과 환자가 노출되었습니다. 병원장은 "공개하면 병원 문을 닫아야 할 수도 있다"며 비공개를 원합니다. 보건부는 아직 공개 여부를 결정하지 못했습니다. 당신은 감염관리 책임자로서 어떻게 행동하겠습니까?',
    options: [
      { id: 'a', text: '병원장 지시에 따라 비공개 유지', correct: false },
      { id: 'b', text: '노출자에게는 개별적으로 통보하되 공개 발표는 없음', correct: false },
      { id: 'c', text: '즉시 보건부에 강력히 공개 권고, 내부적으로 노출자 전원 통보 및 격리, 필요 시 언론 공개도 검토', correct: true },
      { id: 'd', text: '보건부 결정이 나올 때까지 노출자에게도 비공개', correct: false }
    ],
    bestChoice: 2,
    leadershipPrinciple: '위기 소통의 용기 — 투명성과 조직 이익의 충돌',
    explanation: '2015년 MERS에서 삼성서울병원의 정보 비공개 결정이 슈퍼전파로 이어졌습니다. 위기 리더십에서 조직 이익보다 공중 보건을 우선하는 용기 있는 결정이 장기적으로 조직 신뢰도를 보호합니다. WHO 위기 소통 원칙: 투명성은 단기 손해처럼 보여도 신뢰 자본을 쌓는 장기 투자입니다.'
  },
  {
    id: 'LS-006',
    title: '대형 재난 이후 AAR(사후 검토) 진행',
    situation: '대형 지진 대응이 완료되었습니다. 팀은 지쳐 있고 "잘 했다"는 안도감이 있지만, 몇 가지 대응 실패(통신 오류, 이송 혼란)가 있었습니다. 일부 관리자는 "모두 고생했는데 굳이 문제를 파헤칠 필요 있나?"라고 합니다. 당신은 팀장으로서 AAR을 어떻게 진행하겠습니까?',
    options: [
      { id: 'a', text: '팀 사기를 위해 AAR 생략, 성공 부분만 강조', correct: false },
      { id: 'b', text: '책임자를 찾는 목적으로 문제점만 집중 분석', correct: false },
      { id: 'c', text: '72시간 내 AAR 실시, 안전한 환경에서 성공·실패 모두 논의, 개인 책임이 아닌 시스템 개선 초점, 결과는 다음 훈련에 반영', correct: true },
      { id: 'd', text: '6개월 후 충분한 시간이 지나면 진행', correct: false }
    ],
    bestChoice: 2,
    leadershipPrinciple: 'AAR — 학습하는 조직 문화 형성',
    explanation: 'AAR(After Action Review)은 재난 후 가장 중요한 리더십 행동 중 하나입니다. 핵심 원칙: ① 72시간 이내 실시(기억이 생생할 때), ② 심리적 안전 환경에서 진행(책임 추궁 없음), ③ 성공과 실패 모두 논의, ④ 개인이 아닌 시스템에 초점. 학습하는 조직(Learning Organization)은 매 재난을 통해 더 강해집니다.'
  },
  // ============================================
  // NEW LEADERSHIP SCENARIOS (CBRN)
  // ============================================
  {
    id: 'LD-007',
    title: 'CBRN 현장 지휘관 — 구역 설정과 PPE 갈등',
    situation: 'CBRN 테러 현장에 의료 지휘관으로 도착했습니다. 아직 구역(Hot/Warm/Cold)이 설정되지 않았고, PPE가 부족한 상태에서 일부 의료진이 "환자가 죽어가는데 기다릴 수 없다"며 보호 장비 없이 Hot Zone에 진입하려 하고 있습니다. 경찰·소방·의료진 간 역할이 혼선되어 있습니다.',
    options: [
      { id: 'a', text: '의료진의 열정을 존중하여 Hot Zone 진입을 허용하되 최대한 빠르게 진행하도록 지시', correct: false, feedback: 'PPE 없이 진입한 의료진은 환자가 아닌 추가 환자가 됩니다. 현장 안전이 구조보다 우선합니다.' },
      { id: 'b', text: '즉시 Hot Zone 진입 금지 명령, 구역 설정, PPE 확보 후 단계적 진입, 경찰(통제)-소방(구조/제독)-의료(Triage/치료) 역할 명확히 배분', correct: true, feedback: '"현장 안전이 환자 구조보다 우선" — PPE 없는 의료진은 추가 환자. ICS 원칙에 따라 구역 설정과 역할 배분이 최우선입니다.' },
      { id: 'c', text: '전문 HAZMAT 팀 도착까지 모든 활동 중단', correct: false, feedback: '완전 중단은 골든타임을 놓칩니다. 안전한 범위 내에서 할 수 있는 것을 시작해야 합니다.' },
      { id: 'd', text: '가장 경험 많은 의사에게 모든 판단을 위임', correct: false, feedback: 'CBRN 대응은 의료만의 문제가 아닙니다. 다기관 통합 지휘가 필수입니다.' },
    ],
    bestChoice: 1,
    leadershipPrinciple: '현장 안전 우선 원칙 — "You cannot save them if you become one of them"',
    explanation: 'CBRN 현장에서 PPE 없는 진입은 의료진을 추가 환자로 만들어 대응 역량을 더욱 약화시킵니다. 도쿄 사린 테러(1995년)에서 PPE 없이 진입한 구조자 135명이 2차 오염되었습니다. 위기 리더십의 핵심은 "감정적 압박에 굴하지 않고 원칙을 지키는 것"입니다. ICS의 Safety Officer 역할을 즉시 지정하고, "안전 확보 → 구역 설정 → PPE 착용 → 단계적 진입" 순서를 엄수해야 합니다.'
  },
  {
    id: 'LD-008',
    title: '대량 화상 환자 — 화상센터 초과 수용 결정',
    situation: '산업 폭발 사고로 중증 화상 환자 18명이 발생했으나 지역 화상센터는 10병상뿐입니다. 화상센터 과장은 "10명까지만 수용 가능하다"고 합니다. 나머지 8명을 일반 병원으로 보내면 전문 화상 치료를 받지 못합니다. 의료 지휘관으로서 어떻게 결정하겠습니까?',
    options: [
      { id: 'a', text: '화상센터 수용 능력을 존중하여 10명만 입원, 나머지는 일반 병원 이송', correct: false, feedback: '일반 병원의 화상 치료 역량 보강 없이 이송하면 사망률이 상승합니다.' },
      { id: 'b', text: '흡입 손상 동반 환자를 화상센터 우선 배치, 나머지는 일반 병원 ICU + 화상센터의 원격 자문 체계 구축, 서지 역량(surge capacity) 활성화', correct: true, feedback: '가장 위중한 환자(흡입 손상)를 전문센터에, 나머지는 원격 자문으로 일반 병원의 역량을 보강하는 것이 최적 전략입니다.' },
      { id: 'c', text: '18명 전원 화상센터 수용 강제 — 위기 상황이므로 초과 수용 필수', correct: false, feedback: '10병상에 18명은 모든 환자의 치료 질을 저하시켜 전체 사망률을 높일 수 있습니다.' },
      { id: 'd', text: '원거리 화상센터로 8명 전원 이송', correct: false, feedback: '이송 시간 동안 환자 상태 악화 위험이 있습니다. 가까운 병원 역량 보강이 우선입니다.' },
    ],
    bestChoice: 1,
    leadershipPrinciple: '서지 역량(Surge Capacity) 관리 — 자원의 창의적 확장',
    explanation: '대량 특수 환자(화상, 화학 등) 발생 시 전문센터 수용 능력을 초과하는 것이 일반적입니다. 위기 리더십은 "있는 자원 안에서 최적화"하는 것입니다. 핵심 전략: ① 가장 전문 치료가 필요한 환자(흡입 손상, 전층 화상)를 전문센터에 우선 배치, ② 일반 병원 ICU에 원격 화상 전문의 자문 체계(tele-burn) 즉시 구축, ③ 화상센터의 비응급 환자 조기 퇴원으로 병상 확보, ④ 4S(Staff, Stuff, Space, Systems) 서지 전략 활성화.'
  },

];

const TEAMWORK_CHALLENGES = [
  {
    id: 'TW-001',
    title: '응급실 과밀 — SBAR 보고',
    scenario: '응급실 간호사입니다. 패혈증 의심 환자가 혈압 80/50, 열 39.5도, 의식 혼미 상태로 입원했습니다. 담당 레지던트에게 신속히 보고해야 합니다. 어떤 의사소통 도구를 사용해야 합니까?',
    clinicalContext: {
      patient: '64세 남성, 패혈증 의심',
      vitals: 'BP 80/50, HR 120, Temp 39.5°C, SpO2 92%',
      history: '당뇨, 요로감염 치료 중',
      urgency: '즉각 의사 개입 필요'
    },
    options: [
      { id: 'a', text: '"선생님, 606호 환자가 좀 안 좋아 보여요. 한번 봐주세요."', correct: false, tool: '비구조화 보고' },
      { id: 'b', text: 'SBAR: "Situation: 606호 패혈증 의심 환자 혈압 80/50으로 저하. Background: 64세 당뇨, 요로감염 치료 중. Assessment: 패혈성 쇼크 가능성. Recommendation: 즉시 내원 및 소생술 프로토콜 시작 요청"', correct: true, tool: 'SBAR' },
      { id: 'c', text: '차트에 기록만 하고 의사가 보기를 기다림', correct: false, tool: '수동적 대기' },
      { id: 'd', text: '다른 간호사에게 상황 설명하고 함께 판단 요청', correct: false, tool: '동료 상담' }
    ],
    bestChoice: 1,
    teamsteppsTool: 'SBAR (Situation-Background-Assessment-Recommendation)',
    explanation: 'SBAR는 의료팀 간 구조화된 의사소통 도구로, 특히 급박한 임상 상황에서 중요한 정보를 빠짐없이 전달할 수 있게 합니다. 비구조화 보고("좀 안 좋아 보여요")는 의사가 즉각적 위험을 인지하지 못하게 할 수 있습니다. 패혈성 쇼크는 골든타임이 있으므로 명확하고 빠른 SBAR 전달이 생명을 구합니다.'
  },
  {
    id: 'TW-002',
    title: '수술 중 위험 발견 — Two-Challenge Rule',
    scenario: '수술 중 레지던트가 수술 부위에 의심스러운 조직을 발견했습니다. 주치의에게 한 번 말했지만 "계속 해"라는 대답을 받았습니다. 레지던트는 이것이 혈관일 수 있다고 생각하지만 확신이 없습니다. 어떻게 해야 합니까?',
    clinicalContext: {
      situation: '복강경 수술 중 의심 조직 발견',
      concern: '주요 혈관 가능성',
      response: '주치의 첫 번째 우려 표명 무시됨',
      risk: '잘못 절제 시 대량 출혈'
    },
    options: [
      { id: 'a', text: '주치의 지시이므로 그대로 계속 진행', correct: false, tool: '지시 복종' },
      { id: 'b', text: '수술을 멈추고 수술실을 나감', correct: false, tool: '과도한 반응' },
      { id: 'c', text: 'Two-Challenge Rule: 두 번 강력히 우려를 표명 ("저는 이것이 혈관일 수 있다고 생각합니다. 처치 전 반드시 확인이 필요합니다"), 그래도 무시되면 상급자 호출', correct: true, tool: 'Two-Challenge Rule' },
      { id: 'd', text: '수술 후 차트에 우려 사항만 기록', correct: false, tool: '사후 기록' }
    ],
    bestChoice: 2,
    teamsteppsTool: 'Two-Challenge Rule (두 번 도전 규칙)',
    explanation: 'Two-Challenge Rule: 안전 우려가 무시될 때 최소 두 번 강력히 표명해야 하며, 두 번째도 무시되면 상급자 개입을 요청할 의무가 있습니다. 이는 위계적 의료 문화에서 하위 직급자가 안전 우려를 표명할 수 있게 하는 TeamSTEPPS 핵심 도구입니다. 수술 중 잘못된 복종이 의료 사고의 주요 원인 중 하나입니다.'
  },
  {
    id: 'TW-003',
    title: '대량 환자 도착 — Brief/Huddle/Debrief',
    scenario: '응급실 팀장입니다. 30분 후 대형 교통사고로 20명의 환자가 도착할 예정이라는 연락을 받았습니다. 현재 응급실은 정상 운영 중입니다. 팀원들에게 어떤 방식으로 준비를 지시하겠습니까?',
    clinicalContext: {
      notification: '30분 전 사전 통보',
      currentStatus: '응급실 정상 운영',
      incoming: '중증외상 약 20명 예상',
      available: '의사 3명, 간호사 6명'
    },
    options: [
      { id: 'a', text: '각자 알아서 준비 (개별 준비)', correct: false, tool: '개별 준비' },
      { id: 'b', text: '전체 Huddle 소집: 2분 내 상황 공유, 역할 배분, 우선순위 결정, 추가 인력 요청', correct: true, tool: 'Huddle' },
      { id: 'c', text: '환자 도착 후 상황 보고 조치', correct: false, tool: '사후 대응' },
      { id: 'd', text: '가장 경험 많은 의사에게 모든 결정 위임', correct: false, tool: '단독 리더십' }
    ],
    bestChoice: 1,
    teamsteppsTool: 'Huddle (신속 팀 회의)',
    explanation: 'TeamSTEPPS의 Huddle은 예상치 못한 상황 변화 시 신속히 팀을 집합하여 현황 공유, 역할 재배분, 계획 조정을 하는 도구입니다. 대량 환자 도착 전 2분 Huddle이 도착 후 혼란을 크게 줄입니다. Brief(사전 계획 공유) → Huddle(상황 변화 시 재조정) → Debrief(사후 검토)가 TeamSTEPPS의 구조화된 팀 소통 흐름입니다.'
  },
  {
    id: 'TW-004',
    title: '약물 오류 위험 — Closed-Loop Communication',
    scenario: '재난 현장 의사가 혼잡한 상황에서 간호사에게 "에피네프린 1mg 정맥주사 투여"를 구두로 지시했습니다. 주변 소음이 심하고 여러 팀원이 동시에 대화 중입니다. 간호사로서 어떻게 해야 합니까?',
    clinicalContext: {
      order: '에피네프린 1mg IV 투여',
      environment: '소음 심한 재난 현장',
      risk: '구두 지시 오인·오청 가능성',
      urgency: '즉각 투여 필요'
    },
    options: [
      { id: 'a', text: '즉시 에피네프린 준비하고 투여', correct: false, tool: '단방향 수신' },
      { id: 'b', text: '"에피네프린이요?"라고 되묻고 의사 확인 기다림', correct: false, tool: '불완전 확인' },
      { id: 'c', text: 'Closed-Loop: "에피네프린 1mg 정맥주사 확인했습니다" (Read-back) → 투여 후 "에피네프린 1mg 투여 완료했습니다" (Call-out)', correct: true, tool: 'Closed-Loop Communication' },
      { id: 'd', text: '차트에 지시 기록 후 다른 간호사에게 위임', correct: false, tool: '업무 위임' }
    ],
    bestChoice: 2,
    teamsteppsTool: 'Closed-Loop Communication (폐쇄형 의사소통)',
    explanation: 'Closed-Loop Communication: ① 발신자가 명확한 지시 → ② 수신자가 Read-back(복창) → ③ 발신자가 확인(Verify) → ④ 수행 후 Call-out(완료 보고). 재난 현장처럼 소음·혼란 환경에서 구두 지시 오청은 약물 오류의 주요 원인입니다. 복창(Read-back)만으로 약물 오류를 최대 70% 감소시킬 수 있다는 연구가 있습니다.'
  },
  {
    id: 'TW-005',
    title: '팀원 소진 발견 — 상호 지원(Mutual Support)',
    scenario: '72시간 재난 대응 후 팀원 중 한 명인 응급의학과 레지던트가 명백한 소진 징후(판단력 저하, 손 떨림, 집중력 감소)를 보이고 있습니다. 그는 "나는 괜찮아요"라고 말하며 계속 일하려 합니다. 당신은 팀장입니다. 어떻게 대응하겠습니까?',
    clinicalContext: {
      situation: '72시간 연속 재난 대응',
      signs: '손 떨림, 판단력 저하, 집중력 감소',
      selfReport: '"나는 괜찮아요"',
      risk: '소진 상태의 의사가 계속 진료 시 환자 안전 위협'
    },
    options: [
      { id: 'a', text: '"괜찮다"고 하니 계속 일하게 함', correct: false, tool: '방관' },
      { id: 'b', text: '공개적으로 "자네는 지금 너무 지쳤어"라고 말하고 강제 귀가', correct: false, tool: '공개적 지적' },
      { id: 'c', text: 'Task Assistance: 개인적으로 불러 "지금 충분히 힘든 상황이고, 잠깐 쉬는 것이 환자에게도 팀에게도 더 좋아. 내가 잠시 커버할게"라고 말하고 교대', correct: true, tool: 'Task Assistance / Mutual Support' },
      { id: 'd', text: '상황이 끝날 때까지 기다렸다가 사후에 이야기함', correct: false, tool: '사후 처리' }
    ],
    bestChoice: 2,
    teamsteppsTool: 'Task Assistance & Mutual Support (업무 지원 및 상호 지원)',
    explanation: 'TeamSTEPPS의 Mutual Support: 팀원의 과부하·소진을 능동적으로 파악하고 Task Assistance(업무 지원)를 자발적으로 제공합니다. 소진된 의사가 계속 진료하면 환자 안전이 위협받으므로, 팀장의 개입은 팀원 보호이자 환자 안전 행동입니다. 공개적 지적은 팀원의 자존심을 상하게 하고 저항을 유발하므로, 개인적이고 공감적인 접근이 효과적입니다.'
  },
  // ============================================
  // NEW TEAMWORK CHALLENGES (CBRN)
  // ============================================
  {
    id: 'TW-006',
    title: 'PPE 착용 환경 — 의사소통 장벽 극복',
    scenario: '화학 재난 현장에서 전 팀원이 PPE Level B를 착용하고 있습니다. 의사가 Triage 분류 결과를 발표했으나 간호사가 소음과 음성 왜곡으로 제대로 듣지 못해 잘못된 분류 태그(RED 대신 GREEN)를 붙였습니다. 환자 상태가 악화되어 오류가 발견되었습니다.',
    clinicalContext: {
      patient: '42세 남성, 신경작용제 노출 의심',
      vitals: 'RR 28, HR 110, SpO2 88%, 동공 축소',
      history: 'SLUDGEM 증상 진행 중',
      urgency: 'RED 분류 필요 — 즉각 해독제 투여',
    },
    options: [
      { id: 'a', text: '더 큰 소리로 분류 결과를 반복 발표', correct: false, tool: '볼륨 증가' },
      { id: 'b', text: 'Closed-Loop + 시각적 확인: Triage 색상을 구두 발표 + 손가락 수신호(사전 약속) + 태그 부착 후 시각적 확인(Read-back)', correct: true, tool: 'Closed-Loop + Visual Verification' },
      { id: 'c', text: '모든 분류를 의사가 직접 태그 부착', correct: false, tool: '단독 작업' },
      { id: 'd', text: 'PPE를 벗고 소통 후 다시 착용', correct: false, tool: 'PPE 해제 (위험)' },
    ],
    bestChoice: 1,
    teamsteppsTool: 'Closed-Loop Communication + Visual Verification (PPE 환경 적응)',
    explanation: 'PPE 착용 환경에서는 일반적인 구두 의사소통이 심각하게 제한됩니다. TeamSTEPPS의 Closed-Loop Communication을 PPE 환경에 적응시켜야 합니다: ① 사전 약속된 수신호 체계(손가락 1=RED, 2=YELLOW, 3=GREEN, 주먹=BLACK), ② 큰 목소리와 짧은 표현 사용, ③ 태그 부착 후 시각적 상호 확인(visual verification), ④ 팀 Huddle 시 Buddy 시스템(2인 1조)으로 오류 방지. 사전 훈련이 핵심입니다.'
  },
  {
    id: 'TW-007',
    title: '다기관 합동 대응 — CUS 단어 활용',
    scenario: '대형 지진 대응 현장에서 소방 구조대장이 "추가 붕괴 위험이 있지만 생존자 신호가 있으니 계속 구조하겠다"고 결정했습니다. 현장 의료팀장인 당신은 구조대원들의 안전이 심각하게 우려되지만, 다른 기관의 결정에 개입하기 어려운 상황입니다.',
    clinicalContext: {
      situation: '건물 추가 붕괴 위험 경고',
      concern: '구조대원 안전 위협',
      response: '소방 구조대장이 구조 계속 결정',
      risk: '추가 붕괴 시 구조대원 매몰 → 추가 대량 사상자',
    },
    options: [
      { id: 'a', text: '소방의 결정을 존중하고 의료팀은 대기', correct: false, tool: '수동적 수용' },
      { id: 'b', text: 'CUS 단어 사용: "I am Concerned about 추가 붕괴 위험, I am Uncomfortable with 현재 구조 계획, This is a Safety issue" — 통합 지휘소에서 공동 위험 평가 요청', correct: true, tool: 'CUS Words (Concerned-Uncomfortable-Safety)' },
      { id: 'c', text: '의료팀 독자적으로 구조 중단 명령', correct: false, tool: '월권 지시' },
      { id: 'd', text: '상급 기관에 보고하고 지시 대기', correct: false, tool: '상급 보고 대기' },
    ],
    bestChoice: 1,
    teamsteppsTool: 'CUS Words (Concerned-Uncomfortable-Safety issue)',
    explanation: 'TeamSTEPPS의 CUS Words는 안전 우려를 단계적으로 격상시키는 구조화된 도구입니다: ① "I am Concerned"(우려 표명), ② "I am Uncomfortable"(불편함 강조), ③ "This is a Safety issue"(안전 문제 선언 — 모든 활동 즉시 중단 요청). 다기관 합동 대응에서 의료팀이 다른 기관의 결정에 안전 우려를 제기할 때, CUS 단어는 감정적 충돌 없이 구조화된 방식으로 의견을 전달합니다. 통합 지휘소(Unified Command)에서의 공동 위험 평가가 최종 결정 방식입니다.'
  },

];
