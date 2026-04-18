// ============================================
// DISASTER MEDICINE SURVIVAL GAME — V4
// Manga Character + Narrative Upgrade
// ============================================

// ---- CHARACTER SYSTEM ----
const CHARS = {
  mentor: {
    name: '김응급 교수',
    role: '멘토',
    emoji: '👨‍⚕️',
    color: 'var(--blue)',
    tagClass: 'mentor',
    greetings: [
      '자, 준비됐나? 실전이다!',
      '현장에서 1초가 생사를 가른다.',
      '차분하게, 하지만 신속하게!'
    ],
    correct: [
      '훌륭해! 바로 그거야!',
      '완벽한 판단이다!',
      '실전에서도 이렇게 하면 된다!',
      '프로의 판단력이군!'
    ],
    wrong: [
      '다시 생각해보자.',
      '현장에선 이 실수가 치명적이다.',
      '교과서를 다시 떠올려봐.',
      '아쉽다... 하지만 배움의 기회야.'
    ],
    hints: [
      '핵심 원칙을 떠올려봐.',
      '환자 상태를 다시 한번 확인해.',
      'ABC — 기도, 호흡, 순환이 기본이다.'
    ]
  },
  nurse: {
    name: '박하나 간호사',
    role: '보조',
    emoji: '👩‍⚕️',
    color: 'var(--green)',
    tagClass: 'nurse',
    support: [
      '바이탈 사인 확인했습니다!',
      '장비 준비 완료!',
      '환자 상태 모니터링 중입니다.',
      '수액 라인 확보했습니다!'
    ]
  },
  paramedic: {
    name: '이구급 대원',
    role: '현장대원',
    emoji: '🧑‍🚒',
    color: 'var(--orange)',
    tagClass: 'paramedic',
    reports: [
      '현장 도착! 상황 보고합니다!',
      '추가 환자 발견! 긴급 지원 요청!',
      '이송 준비 완료, 지시 대기 중!',
      '현장 안전 확인 완료!'
    ]
  },
  villain: {
    name: '재난',
    role: '적',
    emoji: '💀',
    color: 'var(--red)',
    tagClass: 'villain',
    taunts: [
      '너의 판단이 늦으면 환자가 죽는다...',
      '시간이 없다... 서둘러!',
      '이 재난을 감당할 수 있겠어?',
      '혼돈 속에서 살아남아 보시지...'
    ]
  },
  commander: {
    name: '최지휘 본부장',
    role: '지휘관',
    emoji: '🎖️',
    color: 'var(--purple)',
    tagClass: 'commander',
    orders: [
      '지휘본부 설치 완료! 작전 개시!',
      '자원 배분 결정이 필요합니다!',
      '기관 간 협조 체계 가동!',
      '대응 단계 격상합니다!'
    ]
  },
  patient: {
    name: '환자',
    role: '환자',
    emoji: '🤕',
    color: 'var(--yellow)',
    tagClass: 'patient',
    cries: [
      '살려주세요... 숨을 못 쉬겠어요...',
      '다리가... 움직일 수가 없어요...',
      '아이가 아직 안에 있어요!',
      '피가 멈추지 않아요!'
    ]
  }
};

function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Character dialogue builder
function charBubble(charKey, text, opts = {}) {
  const c = CHARS[charKey];
  const dir = opts.right ? 'right' : '';
  const bubbleClass = opts.urgent ? 'urgent' : opts.success ? 'success' : opts.warn ? 'warn' : '';
  const expression = opts.expression || '';
  return `
    <div class="char-container ${dir} anim-in" style="animation-delay:${opts.delay||0}ms">
      <div class="char-avatar-wrap">
        <div class="char-avatar" style="border-color:${c.color}">
          <span class="char-emoji">${c.emoji}</span>
          ${expression ? `<span class="char-expression">${expression}</span>` : ''}
        </div>
        <span class="char-name-tag ${c.tagClass}">${c.name}</span>
      </div>
      <div class="speech-bubble ${bubbleClass}">
        <div class="char-dialogue">${text}</div>
      </div>
    </div>`;
}

// Narrative panel builder
function narrativePanel(text, opts = {}) {
  const type = opts.type || 'danger';
  const tag = opts.tag || '상황 보고';
  const tagClass = opts.tagClass || 'emergency';
  const icon = opts.icon || '🚨';
  return `
    <div class="narrative-panel ${type} anim-in">
      <div class="narrative-header">
        <span class="narrative-icon">${icon}</span>
        <span class="narrative-tag ${tagClass}">${tag}</span>
      </div>
      <div class="narrative-text">${text}</div>
    </div>`;
}

// Achievement toast
function showAchievement(icon, text, sub) {
  const el = document.createElement('div');
  el.className = 'achievement-toast';
  el.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div>
      <div class="toast-text">${text}</div>
      ${sub ? `<div class="toast-sub">${sub}</div>` : ''}
    </div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ---- RPG CLASS SYSTEM ----
const CLASSES = {
  physician: {
    name: '응급의학전문의',
    icon: '🩺',
    desc: '퀴즈와 트리아지에서 +20% 점수 보너스',
    bonusModes: ['quiz', 'triage'],
    color: '#4fc3f7',
    passive: '진단 직감 — 퀴즈 시간 +3초'
  },
  commander: {
    name: '현장지휘관',
    icon: '🎖️',
    desc: 'MCI와 리더십에서 +20% 점수 보너스',
    bonusModes: ['mci', 'leadership'],
    color: '#ffca28',
    passive: '지휘 통솔 — MCI 시간 +5초'
  },
  specialist: {
    name: 'CBRNE 전문가',
    icon: '☢️',
    desc: 'CBRNE에서 +30% 점수 보너스',
    bonusModes: ['cbrne'],
    color: '#66bb6a',
    passive: '위험물 감지 — CBRNE 단서 표시'
  },
  nurse: {
    name: '재난간호사',
    icon: '💉',
    desc: '팀워크와 윤리에서 +20% 점수 보너스',
    bonusModes: ['teamwork', 'ethics'],
    color: '#f06292',
    passive: '팀 시너지 — 팀워크 힌트 표시'
  }
};

// ---- SKILL TREE ----
const SKILL_TREE = {
  clinical: {
    name: '임상 스킬',
    icon: '🏥',
    color: '#4fc3f7',
    skills: [
      { id: 'triage_speed', name: '신속 분류', desc: '트리아지 시간 +5초', level: 2, cost: 1 },
      { id: 'quiz_mastery', name: '지식 달인', desc: '퀴즈 시간 +5초', level: 4, cost: 2 },
      { id: 'diagnosis_pro', name: '진단의 신', desc: '정답 시 XP +50%', level: 7, cost: 3 }
    ]
  },
  command: {
    name: '지휘 스킬',
    icon: '⭐',
    color: '#ffca28',
    skills: [
      { id: 'quick_decide', name: '즉결 판단', desc: 'MCI 시간 +10초', level: 2, cost: 1 },
      { id: 'leader_aura', name: '리더 오라', desc: '리더십 점수 +25%', level: 4, cost: 2 },
      { id: 'commander_eye', name: '지휘관의 눈', desc: '전 모드 보너스 +10%', level: 7, cost: 3 }
    ]
  },
  response: {
    name: '대응 스킬',
    icon: '🛡️',
    color: '#66bb6a',
    skills: [
      { id: 'hazmat_sense', name: '위험물 감지', desc: 'CBRNE 점수 +25%', level: 2, cost: 1 },
      { id: 'ethics_insight', name: '윤리 통찰', desc: '윤리 XP +50%', level: 4, cost: 2 },
      { id: 'team_synergy', name: '팀 시너지', desc: '팀워크 점수 +30%', level: 7, cost: 3 }
    ]
  }
};

// ---- ACHIEVEMENT SYSTEM ----
const ACHIEVEMENTS = [
  // Combat
  { id: 'first_blood', name: '첫 정답', desc: '첫 번째 정답을 맞혀라', icon: '🎯', category: 'combat', check: g => g.totalCorrect >= 1 },
  { id: 'streak_5', name: '5연속 정답', desc: '5문제 연속 정답', icon: '🔥', category: 'combat', check: g => g.maxStreak >= 5 },
  { id: 'streak_10', name: '전설의 연속', desc: '10문제 연속 정답', icon: '⚡', category: 'combat', check: g => g.maxStreak >= 10 },
  { id: 'perfect_mode', name: '퍼펙트 클리어', desc: '한 모드에서 전문 정답', icon: '💎', category: 'combat', check: g => g.perfectModes > 0 },
  { id: 'score_1000', name: '천점 돌파', desc: '누적 1,000점 달성', icon: '🏅', category: 'combat', check: g => g.score >= 1000 },
  { id: 'score_3000', name: '레전드', desc: '누적 3,000점 달성', icon: '👑', category: 'combat', check: g => g.score >= 3000 },
  // Mastery
  { id: 'mode_master', name: '마스터 오브 올', desc: '모든 모드 완료', icon: '🌟', category: 'mastery', check: g => g.modesCompleted.size >= 7 },
  { id: 'boss_slayer', name: '보스 슬레이어', desc: '보스 라운드 S등급 클리어', icon: '🐉', category: 'mastery', check: g => g.bossGrade === 'S' },
  { id: 'speed_demon', name: '스피드 데몬', desc: '퀴즈 전문항 5초 이내 답변', icon: '⏱️', category: 'mastery', check: g => g.fastAnswers >= 15 },
  { id: 'triage_ace', name: '트리아지 에이스', desc: '트리아지 90% 이상 정확도', icon: '🚑', category: 'mastery', check: g => g.triageAccuracy >= 90 },
  // Explorer
  { id: 'explorer', name: '탐험가', desc: '3개 이상 모드 도전', icon: '🗺️', category: 'explorer', check: g => g.modesCompleted.size >= 3 },
  { id: 'class_chosen', name: '직업 선택', desc: '직업을 선택하라', icon: '🎭', category: 'explorer', check: g => !!g.playerClass },
  { id: 'skill_unlock', name: '스킬 각성', desc: '첫 스킬 해금', icon: '✨', category: 'explorer', check: g => g.unlockedSkills.length > 0 },
  { id: 'level_5', name: '숙련자', desc: '레벨 5 달성', icon: '📈', category: 'explorer', check: g => g.level >= 5 },
  { id: 'level_10', name: '베테랑', desc: '레벨 10 달성', icon: '🏆', category: 'explorer', check: g => g.level >= 10 },
  // EMERGO
  { id: 'emergo_clear', name: 'EMERGO 클리어', desc: 'EMERGO 체인 시나리오 완료', icon: '🏥', category: 'mastery', check: g => g.modesCompleted.has('emergo') },
  { id: 'zero_preventable', name: '제로 예방가능사망', desc: 'EMERGO에서 예방가능 사망 0명 달성', icon: '🛡️', category: 'legend', check: g => g.emergoZeroPD === true },
  // Legend
  { id: 'all_achieve', name: '컴플리트', desc: '모든 업적 달성', icon: '🎊', category: 'legend', check: g => g.earnedAchievements.length >= 16 },
];

// ---- STORY ACT SYSTEM ----
const STORY_ACTS = [
  {
    id: 'act1',
    title: 'ACT 1: 긴급 출동',
    subtitle: '재난 현장에 도착했다. 환자 분류부터 시작하라!',
    modes: ['triage', 'quiz'],
    cutscene: {
      mentor: '대규모 사고가 발생했다! 우선 환자 분류부터 시작하고, 재난의학 기초를 점검하자.',
      villain: '시간이 없다... 과연 네가 감당할 수 있을까?',
      bg: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 100%)'
    }
  },
  {
    id: 'act2',
    title: 'ACT 2: 현장 대응',
    subtitle: '특수 위협이 감지되었다. 전문 대응이 필요하다!',
    modes: ['cbrne', 'mci'],
    cutscene: {
      mentor: 'CBRNE 위협이 확인됐다! 특수 대응 프로토콜을 가동하고, 현장을 지휘하라!',
      villain: '화학물질이 퍼지고 있다... 사상자가 늘어나고 있어!',
      bg: 'linear-gradient(135deg, #0a1a0a 0%, #152d15 100%)'
    }
  },
  {
    id: 'act3',
    title: 'ACT 3: 팀 작전',
    subtitle: '팀을 이끌고 윤리적 결단을 내려라!',
    modes: ['ethics', 'leadership', 'teamwork'],
    cutscene: {
      mentor: '이제 팀을 지휘할 때다. 윤리적 판단과 리더십, 팀워크가 생사를 가른다!',
      villain: '혼돈이 깊어진다... 네 팀이 무너지길 기다리고 있지...',
      bg: 'linear-gradient(135deg, #0a0a1a 0%, #15152d 100%)'
    }
  },
  {
    id: 'final',
    title: 'FINAL: 최종 시험',
    subtitle: '모든 것을 걸고 최종 보스에 도전하라!',
    modes: ['boss'],
    cutscene: {
      mentor: '지금까지 배운 모든 것을 증명할 때가 왔다. 침착하게!',
      villain: '최종 시험이다... 여기서 끝장을 내주마!',
      bg: 'linear-gradient(135deg, #1a0a1a 0%, #2d152d 100%)'
    }
  }
];

// ---- LOCAL DATA STORE ----
const LocalStore = {
  _key: 'disaster_med_sessions',

  getSessions() {
    try { return JSON.parse(localStorage.getItem(this._key) || '[]'); }
    catch(e) { return []; }
  },

  saveSession(session) {
    const sessions = this.getSessions();
    sessions.push(session);
    // Keep last 500 sessions to avoid localStorage overflow
    if (sessions.length > 500) sessions.splice(0, sessions.length - 500);
    localStorage.setItem(this._key, JSON.stringify(sessions));
  },

  getCurrentSession() {
    try { return JSON.parse(sessionStorage.getItem('current_session') || 'null'); }
    catch(e) { return null; }
  },

  updateCurrentSession(data) {
    const current = this.getCurrentSession() || {
      nickname: '', started_at: new Date().toISOString(),
      modes: [], answers: [], device: 'unknown'
    };
    Object.assign(current, data);
    sessionStorage.setItem('current_session', JSON.stringify(current));
  },

  addAnswer(answer) {
    const current = this.getCurrentSession();
    if (!current) return;
    if (!current.answers) current.answers = [];
    current.answers.push(answer);
    sessionStorage.setItem('current_session', JSON.stringify(current));
  },

  addModeResult(result) {
    const current = this.getCurrentSession();
    if (!current) return;
    if (!current.modes) current.modes = [];
    current.modes.push(result);
    sessionStorage.setItem('current_session', JSON.stringify(current));
  },

  finishSession(summary) {
    const current = this.getCurrentSession();
    if (!current) return;
    Object.assign(current, summary, { ended_at: new Date().toISOString() });
    this.saveSession(current);
    sessionStorage.removeItem('current_session');
  }
};

// ---- DATA TRACKING API ----
const TRACKING_API = (() => {
  const p = '__PORT_8000__';
  if (!p.startsWith('__')) return p;
  const loc = window.location.href;
  const proxyMatch = loc.match(/^(https?:\/\/[^/]+\/sites\/proxy\/[^/]+)/);
  if (proxyMatch) return proxyMatch[1] + '/port/8000';
  if (loc.includes('github.io')) return 'https://disaster-med-backend.onrender.com';
  return 'http://localhost:8000';
})();

const Tracker = {
  sessionId: null,
  modeStartTime: 0,
  questionStartTime: 0,
  currentMode: '',
  modeCorrect: 0,
  modeTotal: 0,
  modeScore: 0,
  enabled: true,

  async startSession(nickname) {
    if (!this.enabled) return;
    const deviceInfo = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    LocalStore.updateCurrentSession({ nickname, started_at: new Date().toISOString(), device: deviceInfo, modes: [], answers: [] });
    try {
      const res = await fetch(`${TRACKING_API}/api/session/start`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nickname, device_info: deviceInfo })
      });
      if (res.ok) {
        const data = await res.json();
        this.sessionId = data.session_id;
      }
    } catch(e) { this.enabled = false; }
  },

  async endSession(totalScore, maxLevel, maxStreak, modesCompleted) {
    LocalStore.finishSession({ total_score: totalScore, max_level: maxLevel, max_streak: maxStreak, modes_completed: [...modesCompleted] });
    if (!this.enabled || !this.sessionId) return;
    try {
      await fetch(`${TRACKING_API}/api/session/end`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          session_id: this.sessionId,
          total_score: totalScore,
          max_level: maxLevel,
          max_streak: maxStreak,
          modes_completed: [...modesCompleted]
        })
      });
    } catch(e) {}
  },

  startMode(mode) {
    this.currentMode = mode;
    this.modeStartTime = Date.now();
    this.modeCorrect = 0;
    this.modeTotal = 0;
    this.modeScore = 0;
  },

  startQuestion() {
    this.questionStartTime = Date.now();
  },

  async recordAnswer(questionId, selectedAnswer, isCorrect) {
    const timeTaken = Math.round((Date.now() - this.questionStartTime) / 1000);
    this.modeTotal++;
    if (isCorrect) this.modeCorrect++;
    LocalStore.addAnswer({ mode: this.currentMode, question_id: String(questionId), selected: String(selectedAnswer), correct: isCorrect, time_sec: timeTaken, at: new Date().toISOString() });
    if (!this.enabled || !this.sessionId) return;
    try {
      await fetch(`${TRACKING_API}/api/question/response`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          session_id: this.sessionId,
          mode: this.currentMode,
          question_id: String(questionId),
          selected_answer: String(selectedAnswer),
          is_correct: isCorrect,
          time_taken_sec: timeTaken
        })
      });
    } catch(e) {}
  },

  async endMode(score) {
    const timeSpent = Math.round((Date.now() - this.modeStartTime) / 1000);
    this.modeScore = score;
    LocalStore.addModeResult({ mode: this.currentMode, score, correct: this.modeCorrect, total: this.modeTotal, time_sec: timeSpent, at: new Date().toISOString() });
    if (!this.enabled || !this.sessionId) return;
    try {
      await fetch(`${TRACKING_API}/api/mode/result`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          session_id: this.sessionId,
          mode: this.currentMode,
          score: score,
          total_questions: this.modeTotal,
          correct_answers: this.modeCorrect,
          time_spent_sec: timeSpent
        })
      });
    } catch(e) {}
  }
};

// ---- GAME STATE ----
const G = {
  nickname: '',
  score: 0,
  xp: 0,
  level: 1,
  streak: 0,
  maxStreak: 0,
  combo: 1,
  screen: 'intro',

  // Triage
  tPatientIdx: 0,
  tSelected: null,
  tResults: [],
  tTimer: 0,
  tTimerId: null,
  tTimePerPatient: 30,

  // Quiz
  qIdx: 0,
  qScore: 0,
  qAnswered: false,
  qTimer: 0,
  qTimerId: null,
  qTimePerQ: 20,

  // CBRNE
  cbIdx: 0,
  cbStep: 1,
  cbOrder: [],
  cbTimer: 0,
  cbTimerId: null,

  // MCI
  mciIdx: 0,
  mciScore: 0,
  mciTimer: 0,
  mciTimerId: null,

  // Boss round
  bossActive: false,
  bossQ: [],
  bossIdx: 0,
  bossScore: 0,
  bossTimer: 0,
  bossTimerId: null,

  // Ethics
  ethIdx: 0,
  ethScore: 0,
  ethTimer: 0,
  ethTimerId: null,
  ethAnswered: false,

  // Leadership
  leadIdx: 0,
  leadScore: 0,
  leadTimer: 0,
  leadTimerId: null,

  // Teamwork
  twIdx: 0,
  twScore: 0,
  twTimer: 0,
  twTimerId: null,

  // RPG
  playerClass: null,
  skillPoints: 0,
  unlockedSkills: [],
  earnedAchievements: [],
  totalCorrect: 0,
  perfectModes: 0,
  fastAnswers: 0,
  triageAccuracy: 0,
  bossGrade: null,
  currentAct: 0,
  storyMode: true,

  // Leaderboard
  leaderboard: [
    { name: '김의사', score: 2850 },
    { name: '이레지', score: 2400 },
    { name: '박간호', score: 2100 },
    { name: '최응급', score: 1800 },
    { name: '정구조', score: 1500 },
  ],

  // Modes completed
  modesCompleted: new Set(),

  // EMERGO
  emergo: null,
  emergoZeroPD: false
};

const $ = id => document.getElementById(id);
const app = $('app');

// ---- AUDIO ----
let audioCtx;
function sfx(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'correct') {
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.1);
      osc.frequency.setValueAtTime(784, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now); osc.stop(now + 0.4);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'tick') {
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now); osc.stop(now + 0.05);
    } else if (type === 'alert') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.1);
      osc.frequency.setValueAtTime(440, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'boss') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(200, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now); osc.stop(now + 0.5);
    } else if (type === 'levelup') {
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.12);
      osc.frequency.setValueAtTime(784, now + 0.24);
      osc.frequency.setValueAtTime(1047, now + 0.36);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.start(now); osc.stop(now + 0.6);
    }
  } catch (e) {}
}

// ---- SCORING ----
function addScore(pts) {
  const mode = G.screen;
  const classBonus = getClassBonus(mode);
  const skillBonus = getSkillBonus(mode);
  const actual = Math.round(pts * G.combo * classBonus * skillBonus);
  G.score += actual;
  return actual;
}

function addXP(amount) {
  // Skill bonus: diagnosis_pro gives +50% XP on correct
  if (G.unlockedSkills.includes('diagnosis_pro')) amount = Math.round(amount * 1.5);
  // Skill bonus: ethics_insight gives +50% XP in ethics mode
  if (G.screen === 'ethics' && G.unlockedSkills.includes('ethics_insight')) amount = Math.round(amount * 1.5);
  G.xp += amount;
  const oldLevel = G.level;
  G.level = Math.floor(G.xp / 200) + 1;
  if (G.level > oldLevel) {
    sfx('levelup');
    G.skillPoints += 1; // Grant skill point on level up
    showAchievement('⭐', `레벨 ${G.level} 달성!`, `스킬 포인트 +1 (보유: ${G.skillPoints})`);
    checkAchievements();
  }
}

function getLevel() { return G.level; }

function updateStreak(correct) {
  if (correct) {
    G.streak++;
    G.maxStreak = Math.max(G.maxStreak, G.streak);
    G.combo = Math.min(1 + G.streak * 0.1, 3);
    if (G.streak === 3) showAchievement('🔥', '3연속 정답!', '콤보 보너스 활성화');
    if (G.streak === 5) showAchievement('⚡', '5연속 정답!', '콤보 x1.5 달성!');
    if (G.streak === 10) showAchievement('💎', '10연속 정답!', '전설의 연속 정답!');
  } else {
    G.streak = 0;
    G.combo = 1;
  }
}

// ---- TIMER ----
function startCountdown(key, seconds, onTick, onEnd) {
  const idKey = key + '__intervalId';
  clearInterval(G[idKey]);
  G[key] = seconds;
  G[idKey] = setInterval(() => {
    G[key]--;
    if (onTick) onTick(G[key]);
    if (G[key] <= 5 && G[key] > 0) sfx('tick');
    if (G[key] <= 0) {
      clearInterval(G[idKey]);
      G[idKey] = null;
      if (onEnd) onEnd();
    }
  }, 1000);
}

function stopTimer(key) {
  const idKey = key + '__intervalId';
  clearInterval(G[idKey]);
  G[idKey] = null;
}

// ---- EFFECTS ----
function flashScreen(color) {
  app.classList.add(color === 'green' ? 'flash-green' : 'flash-red');
  setTimeout(() => app.classList.remove('flash-green', 'flash-red'), 500);
}

function shakeScreen() {
  app.classList.add('shake');
  setTimeout(() => app.classList.remove('shake'), 500);
}

function showImpact(color) {
  const el = document.createElement('div');
  el.className = `impact-frame ${color || ''}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

function showSpeedLines() {
  let el = document.querySelector('.speed-lines');
  if (!el) {
    el = document.createElement('div');
    el.className = 'speed-lines';
    document.body.appendChild(el);
  }
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

function showDangerPulse(show) {
  let el = document.querySelector('.danger-pulse');
  if (show && !el) {
    el = document.createElement('div');
    el.className = 'danger-pulse';
    document.body.appendChild(el);
  } else if (!show && el) {
    el.remove();
  }
}

function confetti() {
  const colors = ['#ff3b5c','#00e676','#448aff','#ffca28','#b388ff','#00e5ff'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay = Math.random() * 0.5 + 's';
    el.style.animationDuration = (1 + Math.random()) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }
}

function spawnParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(p);
  }
}

// ---- RPG FUNCTIONS ----

function getClassBonus(mode) {
  if (!G.playerClass) return 1;
  const cls = CLASSES[G.playerClass];
  if (cls.bonusModes.includes(mode)) return 1.2;
  // Commander's Eye skill: +10% all modes
  if (G.unlockedSkills.includes('commander_eye')) return 1.1;
  return 1;
}

function getSkillBonus(mode) {
  let bonus = 1;
  if (mode === 'cbrne' && G.unlockedSkills.includes('hazmat_sense')) bonus *= 1.25;
  if (mode === 'leadership' && G.unlockedSkills.includes('leader_aura')) bonus *= 1.25;
  if (mode === 'teamwork' && G.unlockedSkills.includes('team_synergy')) bonus *= 1.3;
  return bonus;
}

function getTimerBonus(mode) {
  let extra = 0;
  if (mode === 'triage' && G.unlockedSkills.includes('triage_speed')) extra += 5;
  if (mode === 'quiz' && G.unlockedSkills.includes('quiz_mastery')) extra += 5;
  if (mode === 'mci' && G.unlockedSkills.includes('quick_decide')) extra += 10;
  if (G.playerClass === 'physician' && mode === 'quiz') extra += 3;
  if (G.playerClass === 'commander' && mode === 'mci') extra += 5;
  return extra;
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!G.earnedAchievements.includes(a.id) && a.check(G)) {
      G.earnedAchievements.push(a.id);
      sfx('levelup');
      showAchievement(a.icon, `업적 해금: ${a.name}`, a.desc);
      addXP(50);
      G.skillPoints++;
    }
  });
}

function renderClassSelect() {
  app.innerHTML = `
    <div class="screen class-select-screen">
      ${charBubble('mentor', `<strong>${G.nickname}</strong>, 재난 현장에서의 네 <em>역할</em>을 선택하라! 각 직업마다 고유한 능력이 있다.`)}
      <h2 class="class-title">🎭 직업 선택</h2>
      <div class="class-grid">
        ${Object.entries(CLASSES).map(([key, cls]) => `
          <button class="class-card" onclick="selectClass('${key}')" style="--class-color:${cls.color}">
            <div class="class-icon-big">${cls.icon}</div>
            <div class="class-name">${cls.name}</div>
            <div class="class-desc">${cls.desc}</div>
            <div class="class-passive">💠 ${cls.passive}</div>
          </button>
        `).join('')}
      </div>
      <button class="btn-outline skip-class" onclick="selectClass(null)">직업 없이 시작</button>
    </div>`;
}

function selectClass(cls) {
  G.playerClass = cls;
  if (cls) {
    sfx('levelup');
    showAchievement(CLASSES[cls].icon, `${CLASSES[cls].name} 선택!`, CLASSES[cls].passive);
    checkAchievements();
  }
  if (G.storyMode) {
    showCutscene(0);
  } else {
    G.screen = 'modes';
    render();
  }
}

function showCutscene(actIdx) {
  if (actIdx >= STORY_ACTS.length) { G.screen = 'modes'; render(); return; }
  G.currentAct = actIdx;
  const act = STORY_ACTS[actIdx];
  const cs = act.cutscene;

  app.innerHTML = `
    <div class="screen cutscene-screen" style="background:${cs.bg}">
      <div class="cut-act-label anim-in">${act.title}</div>
      <div class="cut-subtitle anim-in" style="animation-delay:300ms">${act.subtitle}</div>
      <div class="cut-dialogue-area">
        ${charBubble('mentor', cs.mentor, { delay: 600 })}
        ${charBubble('villain', cs.villain, { right: true, urgent: true, delay: 1000, expression: '😈' })}
      </div>
      <div class="cut-modes-preview anim-in" style="animation-delay:1400ms">
        ${act.modes.map(m => {
          const mode = [{ key: 'triage', icon: '🚑', t: 'Triage' }, { key: 'cbrne', icon: '☢️', t: 'CBRNE' },
            { key: 'mci', icon: '🏥', t: 'MCI' }, { key: 'quiz', icon: '📋', t: '퀴즈' },
            { key: 'ethics', icon: '⚖️', t: '윤리' }, { key: 'leadership', icon: '🎖️', t: '리더십' },
            { key: 'teamwork', icon: '🤝', t: '팀워크' }, { key: 'boss', icon: '👹', t: '보스' }]
            .find(x => x.key === m);
          return `<span class="cut-mode-chip">${mode?.icon || ''} ${mode?.t || m}</span>`;
        }).join('')}
      </div>
      <button class="btn-primary cut-start anim-in" style="animation-delay:1800ms" onclick="startAct(${actIdx})">
        작전 개시 →
      </button>
    </div>`;
  sfx('alert');
}

function startAct(actIdx) {
  G.currentAct = actIdx;
  G.screen = 'modes';
  render();
}

function advanceStoryAct() {
  if (!G.storyMode) return;
  const act = STORY_ACTS[G.currentAct];
  if (!act) return;
  const allDone = act.modes.every(m => G.modesCompleted.has(m));
  if (allDone && G.currentAct < STORY_ACTS.length - 1) {
    G.currentAct++;
    // Show cutscene for next act after a short delay
    setTimeout(() => {
      sfx('alert');
      showAchievement('🎬', `${STORY_ACTS[G.currentAct].title} 해금!`, '새로운 스토리가 펼쳐진다!');
    }, 500);
  }
}

function renderSkillTree() {
  const branches = Object.entries(SKILL_TREE);
  app.innerHTML = `
    <div class="screen skilltree-screen">
      <div class="st-header">
        <button class="btn-outline" onclick="G.screen='modes';render();">← 돌아가기</button>
        <h2>🌲 스킬 트리</h2>
        <div class="sp-display">⭐ 스킬 포인트: <strong>${G.skillPoints}</strong></div>
      </div>
      <div class="st-branches">
        ${branches.map(([key, branch]) => `
          <div class="st-branch" style="--branch-color:${branch.color}">
            <div class="st-branch-header">${branch.icon} ${branch.name}</div>
            ${branch.skills.map(skill => {
              const unlocked = G.unlockedSkills.includes(skill.id);
              const canUnlock = !unlocked && G.level >= skill.level && G.skillPoints >= skill.cost;
              const locked = !unlocked && !canUnlock;
              return `
                <div class="st-skill ${unlocked ? 'unlocked' : ''} ${locked ? 'locked' : ''} ${canUnlock ? 'available' : ''}">
                  <div class="st-skill-name">${skill.name}</div>
                  <div class="st-skill-desc">${skill.desc}</div>
                  <div class="st-skill-req">Lv.${skill.level} · ${skill.cost}SP</div>
                  ${canUnlock ? `<button class="st-unlock-btn" onclick="unlockSkill('${skill.id}','${key}',${skill.cost})">  해금</button>` : ''}
                  ${unlocked ? '<span class="st-check">✅</span>' : ''}
                </div>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
    </div>`;
}

function unlockSkill(skillId, branch, cost) {
  if (G.skillPoints < cost || G.unlockedSkills.includes(skillId)) return;
  G.skillPoints -= cost;
  G.unlockedSkills.push(skillId);
  sfx('levelup');
  showAchievement('✨', '스킬 해금!', SKILL_TREE[branch].skills.find(s => s.id === skillId)?.name);
  checkAchievements();
  renderSkillTree();
}

function renderAchievements() {
  const categories = { combat: '🗡️ 전투', mastery: '🏅 마스터리', explorer: '🗺️ 탐험', legend: '👑 전설' };
  app.innerHTML = `
    <div class="screen achieve-screen">
      <div class="st-header">
        <button class="btn-outline" onclick="G.screen='modes';render();">← 돌아가기</button>
        <h2>🏆 업적</h2>
        <div class="sp-display">${G.earnedAchievements.length} / ${ACHIEVEMENTS.length}</div>
      </div>
      ${Object.entries(categories).map(([cat, label]) => `
        <div class="achieve-cat">
          <h3>${label}</h3>
          <div class="achieve-grid">
            ${ACHIEVEMENTS.filter(a => a.category === cat).map(a => {
              const earned = G.earnedAchievements.includes(a.id);
              return `
                <div class="achieve-card ${earned ? 'earned' : 'locked'}">
                  <div class="achieve-icon">${earned ? a.icon : '🔒'}</div>
                  <div class="achieve-name">${a.name}</div>
                  <div class="achieve-desc">${a.desc}</div>
                </div>`;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>`;
}

// ---- RENDER FUNCTIONS ----

function render() {
  const s = G.screen;
  if (s === 'intro') renderIntro();
  else if (s === 'classSelect') renderClassSelect();
  else if (s === 'cutscene') showCutscene(G.currentAct);
  else if (s === 'skilltree') renderSkillTree();
  else if (s === 'achievements') renderAchievements();
  else if (s === 'modes') renderModeSelect();
  else if (s === 'triage') renderTriage();
  else if (s === 'quiz') renderQuiz();
  else if (s === 'cbrne') renderCBRNE();
  else if (s === 'mci') renderMCI();
  else if (s === 'ethics') renderEthics();
  else if (s === 'leadership') renderLeadership();
  else if (s === 'teamwork') renderTeamwork();
  else if (s === 'boss') renderBoss();
  else if (s === 'emergoSelect') renderEmergoSelect();
  else if (s === 'emergo') renderEmergoPhase();
  else if (s === 'emergoResults') {} // already rendered
  else if (s === 'results') renderResults();
  else if (s === 'cbrneAdv') renderCBRNEAdv();
  else if (s === 'cbrneAdvScenario') renderCBRNEAdvScenario();
  else if (s === 'cbrneAdvBoss') renderCBRNEAdvBoss();
  else if (s === 'tactical') renderTactical();
  else if (s === 'tacticalScenario') renderTacticalScenario();
  else if (s === 'tacticalBoss') renderTacticalBoss();
  else if (s === 'ctm') renderCTM();
  else if (s === 'ctmScenario') renderCTMScenario();
  else if (s === 'ctmBoss') renderCTMBoss();
}

// ---- INLINE ADMIN DASHBOARD ----
function renderInlineAdmin() {
  const MODE_LABELS = {
    triage: 'START Triage',
    cbrne: 'CBRNE 대응',
    mci: 'MCI 지휘관',
    quiz: '재난의학 퀴즈',
    ethics: '윤리적 딥렉마',
    leadership: '리더십 챌린지',
    teamwork: '팀워크 미션',
    cbrneAdv: 'CBRNE 심화',
    tactical: '전술의학',
    ctm: '대테러의학',
    hseep: 'HSEEP 훈련 설계',
    boss: '보스 도전',
    emergo: 'EMERGO 시나리오'
  };

  // Remove existing overlay if present
  const existing = document.getElementById('admin-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;overflow-y:auto;font-family:system-ui,sans-serif;';

  // State
  let adminLoggedIn = false;
  let currentTab = 0;
  let sortCol = null;
  let sortAsc = true;
  let searchQuery = '';
  let selectedSession = null;

  function fmt(dt) {
    if (!dt) return '-';
    try { return new Date(dt).toLocaleString('ko-KR'); } catch(e) { return dt; }
  }

  function renderOverlay() {
    overlay.innerHTML = '';

    // Header bar
    const header = document.createElement('div');
    header.style.cssText = 'width:100%;max-width:1200px;display:flex;justify-content:space-between;align-items:center;padding:12px 16px;box-sizing:border-box;';
    header.innerHTML = '<span style="color:#a78bfa;font-weight:bold;font-size:18px">🛡️ 리얼타임 관리자 대시보드</span>';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ 닫기';
    closeBtn.style.cssText = 'background:#e74c3c;color:#fff;border:none;padding:8px 18px;border-radius:8px;font-size:14px;cursor:pointer;font-weight:bold;';
    closeBtn.addEventListener('click', () => overlay.remove());
    header.appendChild(closeBtn);
    overlay.appendChild(header);

    const main = document.createElement('div');
    main.style.cssText = 'width:100%;max-width:1200px;flex:1;padding:0 16px 32px;box-sizing:border-box;';
    overlay.appendChild(main);

    if (!adminLoggedIn) {
      renderLoginScreen(main);
    } else {
      renderDashboard(main);
    }
  }

  function renderLoginScreen(container) {
    container.innerHTML = '';
    const card = document.createElement('div');
    card.style.cssText = 'background:#1a1a2e;border-radius:16px;padding:48px;max-width:400px;margin:80px auto;text-align:center;border:1px solid #2d2d4e;';
    card.innerHTML = '<div style="font-size:48px;margin-bottom:16px">🔐</div>' +
      '<h2 style="color:#e0e0ff;margin:0 0 8px">관리자 로그인</h2>' +
      '<p style="color:#888;margin:0 0 24px;font-size:14px">비밀번호를 입력하세요</p>';
    const pwInput = document.createElement('input');
    pwInput.type = 'password';
    pwInput.placeholder = '비밀번호';
    pwInput.style.cssText = 'width:100%;padding:12px 16px;border-radius:8px;border:1px solid #3d3d5e;background:#0f0f23;color:#e0e0ff;font-size:15px;box-sizing:border-box;margin-bottom:12px;outline:none;';
    const errMsg = document.createElement('p');
    errMsg.style.cssText = 'color:#e74c3c;font-size:13px;margin:0 0 12px;display:none;';
    errMsg.textContent = '비밀번호가 맞지 않습니다.';
    const loginBtn = document.createElement('button');
    loginBtn.textContent = '로그인';
    loginBtn.style.cssText = 'width:100%;padding:12px;border-radius:8px;border:none;background:#7c3aed;color:#fff;font-size:15px;font-weight:bold;cursor:pointer;';
    function tryLogin() {
      if (pwInput.value === 'disaster2026!') {
        adminLoggedIn = true;
        renderOverlay();
      } else {
        errMsg.style.display = 'block';
        pwInput.value = '';
        pwInput.focus();
      }
    }
    loginBtn.addEventListener('click', tryLogin);
    pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
    card.appendChild(pwInput);
    card.appendChild(errMsg);
    card.appendChild(loginBtn);
    container.appendChild(card);
    setTimeout(() => pwInput.focus(), 50);
  }

  function renderDashboard(container) {
    const sessions = LocalStore.getSessions();

    container.innerHTML = '';

    // Stats row
    const totalSessions = sessions.length;
    const uniqueNicks = new Set(sessions.map(s => s.nickname)).size;
    const avgScore = totalSessions ? Math.round(sessions.reduce((a, s) => a + (s.total_score || 0), 0) / totalSessions) : 0;
    const modeCount = {};
    sessions.forEach(s => (s.modes || []).forEach(m => { modeCount[m.mode] = (modeCount[m.mode] || 0) + 1; }));
    const topMode = Object.entries(modeCount).sort((a, b) => b[1] - a[1])[0];
    const mobileCnt = sessions.filter(s => s.device === 'mobile').length;
    const desktopCnt = totalSessions - mobileCnt;

    // Tabs
    const tabs = ['📊 개요', '👥 학생 목록', '📈 모드별 분석', '🔍 상세 데이터'];
    const tabBar = document.createElement('div');
    tabBar.style.cssText = 'display:flex;gap:8px;margin-bottom:20px;border-bottom:1px solid #2d2d4e;padding-bottom:0;';
    tabs.forEach((t, i) => {
      const tb = document.createElement('button');
      tb.textContent = t;
      tb.style.cssText = 'padding:10px 18px;border:none;border-radius:8px 8px 0 0;font-size:14px;font-weight:bold;cursor:pointer;transition:all 0.15s;' +
        (currentTab === i ? 'background:#7c3aed;color:#fff;' : 'background:#1a1a2e;color:#888;');
      tb.addEventListener('click', () => { currentTab = i; searchQuery = ''; sortCol = null; selectedSession = null; renderDashboard(container); });
      tabBar.appendChild(tb);
    });
    container.appendChild(tabBar);

    // Export + logout row
    const actionRow = document.createElement('div');
    actionRow.style.cssText = 'display:flex;gap:8px;justify-content:flex-end;margin-bottom:16px;';
    const csvBtn = document.createElement('button');
    csvBtn.textContent = '📥 CSV 내보내기';
    csvBtn.style.cssText = 'padding:8px 16px;background:#059669;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:bold;cursor:pointer;';
    csvBtn.addEventListener('click', () => exportCSV(sessions));
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = '🚪 로그아웃';
    logoutBtn.style.cssText = 'padding:8px 16px;background:#374151;color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;';
    logoutBtn.addEventListener('click', () => { adminLoggedIn = false; renderOverlay(); });
    actionRow.appendChild(csvBtn);
    actionRow.appendChild(logoutBtn);
    container.appendChild(actionRow);

    if (currentTab === 0) renderTabOverview(container, sessions, { totalSessions, uniqueNicks, avgScore, topMode, mobileCnt, desktopCnt });
    else if (currentTab === 1) renderTabStudents(container, sessions);
    else if (currentTab === 2) renderTabModes(container, sessions);
    else if (currentTab === 3) renderTabDetail(container, sessions);
  }

  function card(content, extra) {
    const d = document.createElement('div');
    d.style.cssText = 'background:#1a1a2e;border-radius:12px;padding:20px;border:1px solid #2d2d4e;' + (extra || '');
    d.innerHTML = content;
    return d;
  }

  function statCard(label, value, color) {
    return card(
      '<div style="color:#888;font-size:12px;margin-bottom:6px">' + label + '</div>' +
      '<div style="font-size:28px;font-weight:bold;color:' + (color || '#a78bfa') + '">' + value + '</div>',
      'flex:1;min-width:140px;'
    );
  }

  function makeTable(headers, rows, opts) {
    opts = opts || {};
    const wrap = document.createElement('div');
    wrap.style.cssText = 'overflow-x:auto;';
    const tbl = document.createElement('table');
    tbl.style.cssText = 'width:100%;border-collapse:collapse;font-size:13px;';
    const thead = document.createElement('thead');
    const hrow = document.createElement('tr');
    headers.forEach((h, i) => {
      const th = document.createElement('th');
      th.textContent = h.label;
      th.style.cssText = 'padding:10px 12px;text-align:left;color:#a78bfa;font-weight:bold;background:#12122a;border-bottom:2px solid #2d2d4e;white-space:nowrap;' +
        (opts.sortable ? 'cursor:pointer;user-select:none;' : '');
      if (opts.sortable) {
        th.addEventListener('click', () => {
          if (sortCol === i) sortAsc = !sortAsc;
          else { sortCol = i; sortAsc = true; }
          opts.onSort();
        });
        if (sortCol === i) th.textContent += sortAsc ? ' ▲' : ' ▼';
      }
      hrow.appendChild(th);
    });
    thead.appendChild(hrow);
    tbl.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach((row, ri) => {
      const tr = document.createElement('tr');
      tr.style.cssText = 'background:' + (ri % 2 === 0 ? '#0f0f23' : '#1a1a2e') + ';';
      if (opts.onRowClick) {
        tr.style.cursor = 'pointer';
        tr.addEventListener('mouseenter', () => { tr.style.background = '#2d1b69'; });
        tr.addEventListener('mouseleave', () => { tr.style.background = ri % 2 === 0 ? '#0f0f23' : '#1a1a2e'; });
        tr.addEventListener('click', () => opts.onRowClick(row, ri));
      }
      row.forEach(cell => {
        const td = document.createElement('td');
        td.style.cssText = 'padding:8px 12px;color:#e0e0ff;border-bottom:1px solid #1e1e3e;';
        if (typeof cell === 'object' && cell !== null && cell.__html) td.innerHTML = cell.__html;
        else td.textContent = cell === null || cell === undefined ? '-' : String(cell);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    wrap.appendChild(tbl);
    return wrap;
  }

  function renderTabOverview(container, sessions, stats) {
    // Stat cards
    const statsRow = document.createElement('div');
    statsRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px;';
    statsRow.appendChild(statCard('전체 세션', stats.totalSessions, '#60a5fa'));
    statsRow.appendChild(statCard('유니크 닉네임', stats.uniqueNicks, '#34d399'));
    statsRow.appendChild(statCard('평균 점수', stats.avgScore, '#fbbf24'));
    statsRow.appendChild(statCard('인기 모드', stats.topMode ? (MODE_LABELS[stats.topMode[0]] || stats.topMode[0]) : '-', '#f472b6'));
    statsRow.appendChild(statCard('모바일', stats.mobileCnt, '#a78bfa'));
    statsRow.appendChild(statCard('데스크탑', stats.desktopCnt, '#a78bfa'));
    container.appendChild(statsRow);

    // Recent 10 sessions table
    const h = document.createElement('h3');
    h.style.cssText = 'color:#e0e0ff;margin:0 0 12px;';
    h.textContent = '친근 10개 세션';
    container.appendChild(h);

    const recent = sessions.slice(-10).reverse();
    const headers = [
      { label: '닉네임' }, { label: '시작' }, { label: '완료' },
      { label: '점수' }, { label: '레벨' }, { label: '연속정답' }, { label: '기기' }
    ];
    const rows = recent.map(s => [
      s.nickname || '-', fmt(s.started_at), fmt(s.ended_at),
      s.total_score || 0, s.max_level || '-', s.max_streak || 0, s.device || '-'
    ]);
    container.appendChild(makeTable(headers, rows));
  }

  function renderTabStudents(container, sessions) {
    // Search
    const searchRow = document.createElement('div');
    searchRow.style.cssText = 'margin-bottom:14px;display:flex;gap:8px;align-items:center;';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '닉네임 검색...';
    searchInput.value = searchQuery;
    searchInput.style.cssText = 'padding:8px 12px;border-radius:8px;border:1px solid #3d3d5e;background:#0f0f23;color:#e0e0ff;font-size:14px;width:240px;outline:none;';
    searchInput.addEventListener('input', () => { searchQuery = searchInput.value; renderTabStudents(container, sessions); });
    searchRow.appendChild(searchInput);
    const countEl = document.createElement('span');
    countEl.style.cssText = 'color:#888;font-size:13px;';
    searchRow.appendChild(countEl);
    container.appendChild(searchRow);

    const headers = [
      { label: '닉네임' }, { label: '접속 시간' }, { label: '성요시간' },
      { label: '점수' }, { label: '레벨' }, { label: '연속 정답' }, { label: '완료 모드' }, { label: '기기' }
    ];

    let filtered = sessions.filter(s => !searchQuery || (s.nickname || '').toLowerCase().includes(searchQuery.toLowerCase()));

    if (sortCol !== null) {
      const colIdx = sortCol;
      filtered = [...filtered].sort((a, b) => {
        const vals = [
          [a.nickname, b.nickname],
          [a.started_at, b.started_at],
          [a.ended_at, b.ended_at],
          [a.total_score || 0, b.total_score || 0],
          [a.max_level || 0, b.max_level || 0],
          [a.max_streak || 0, b.max_streak || 0],
          [(a.modes_completed || []).length, (b.modes_completed || []).length],
          [a.device, b.device]
        ];
        const [av, bv] = vals[colIdx] || [0, 0];
        if (av < bv) return sortAsc ? -1 : 1;
        if (av > bv) return sortAsc ? 1 : -1;
        return 0;
      });
    }

    countEl.textContent = filtered.length + '명';

    const rows = filtered.map(s => [
      s.nickname || '-',
      fmt(s.started_at),
      fmt(s.ended_at),
      s.total_score || 0,
      s.max_level || '-',
      s.max_streak || 0,
      (s.modes_completed || []).map(m => MODE_LABELS[m] || m).join(', ') || '-',
      s.device || '-'
    ]);

    const tbl = makeTable(headers, rows, {
      sortable: true,
      onSort: () => renderTabStudents(container, sessions)
    });
    container.appendChild(tbl);
  }

  function renderTabModes(container, sessions) {
    // Aggregate per mode
    const modeStats = {};
    sessions.forEach(s => {
      (s.modes || []).forEach(m => {
        if (!modeStats[m.mode]) modeStats[m.mode] = { count: 0, totalScore: 0, totalCorrect: 0, totalQuestions: 0, totalTime: 0 };
        const ms = modeStats[m.mode];
        ms.count++;
        ms.totalScore += m.score || 0;
        ms.totalCorrect += m.correct || 0;
        ms.totalQuestions += m.total || 0;
        ms.totalTime += m.time_sec || 0;
      });
    });

    const headers = [
      { label: '모드' }, { label: '참여 횟수' }, { label: '평균 점수' },
      { label: '평균 정답률' }, { label: '평균 소요시간(s)' }
    ];

    const rows = Object.entries(modeStats)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([mode, ms]) => [
        MODE_LABELS[mode] || mode,
        ms.count,
        Math.round(ms.totalScore / ms.count),
        ms.totalQuestions ? Math.round(ms.totalCorrect / ms.totalQuestions * 100) + '%' : '-',
        Math.round(ms.totalTime / ms.count)
      ]);

    if (rows.length === 0) {
      const p = document.createElement('p');
      p.style.cssText = 'color:#888;text-align:center;padding:40px;';
      p.textContent = '아직 모드 데이터가 없습니다.';
      container.appendChild(p);
    } else {
      container.appendChild(makeTable(headers, rows));
    }
  }

  function renderTabDetail(container, sessions) {
    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;gap:12px;margin-bottom:16px;align-items:center;flex-wrap:wrap;';

    const label = document.createElement('label');
    label.textContent = '세션 선택: ';
    label.style.cssText = 'color:#e0e0ff;font-size:14px;';
    const sel = document.createElement('select');
    sel.style.cssText = 'padding:8px 12px;border-radius:8px;border:1px solid #3d3d5e;background:#0f0f23;color:#e0e0ff;font-size:13px;max-width:360px;';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '세션을 선택하세요...';
    sel.appendChild(placeholder);

    const reversed = sessions.slice().reverse();
    reversed.forEach((s, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = (s.nickname || '익명') + ' — ' + fmt(s.started_at) + ' (' + (s.total_score || 0) + '점)';
      sel.appendChild(opt);
    });

    if (selectedSession !== null) sel.value = selectedSession;

    sel.addEventListener('change', () => {
      selectedSession = sel.value === '' ? null : parseInt(sel.value);
      renderTabDetail(container, sessions);
    });

    topRow.appendChild(label);
    topRow.appendChild(sel);
    container.appendChild(topRow);

    if (selectedSession === null) {
      const p = document.createElement('p');
      p.style.cssText = 'color:#888;text-align:center;padding:40px;';
      p.textContent = '위에서 세션을 선택하세요.';
      container.appendChild(p);
      return;
    }

    const s = reversed[selectedSession];
    if (!s) return;

    const info = document.createElement('div');
    info.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;';
    info.appendChild(statCard('닉네임', s.nickname || '-', '#60a5fa'));
    info.appendChild(statCard('점수', s.total_score || 0, '#fbbf24'));
    info.appendChild(statCard('기기', s.device || '-', '#34d399'));
    info.appendChild(statCard('답변 수', (s.answers || []).length, '#f472b6'));
    container.appendChild(info);

    const answers = s.answers || [];
    if (answers.length === 0) {
      const p = document.createElement('p');
      p.style.cssText = 'color:#888;text-align:center;padding:20px;';
      p.textContent = '이 세션에 답변 데이터가 없습니다.';
      container.appendChild(p);
    } else {
      const aHeaders = [
        { label: '모드' }, { label: '문제 ID' }, { label: '선택 답반' },
        { label: '정답 여부' }, { label: '소요 시간(s)' }, { label: '시간' }
      ];
      const aRows = answers.map(a => [
        MODE_LABELS[a.mode] || a.mode || '-',
        a.question_id || '-',
        a.selected || '-',
        { __html: a.correct ? '<span style="color:#34d399;font-weight:bold">✅ 정답</span>' : '<span style="color:#f87171;font-weight:bold">❌ 오답</span>' },
        a.time_sec !== undefined ? a.time_sec : '-',
        fmt(a.at)
      ]);
      container.appendChild(makeTable(aHeaders, aRows));
    }
  }

  function exportCSV(sessions) {
    if (!sessions.length) { alert('내보낼 데이터가 없습니다.'); return; }
    const rows = [['nickname', 'started_at', 'ended_at', 'total_score', 'max_level', 'max_streak', 'device', 'modes_completed', 'num_answers']];
    sessions.forEach(s => rows.push([
      s.nickname || '',
      s.started_at || '',
      s.ended_at || '',
      s.total_score || 0,
      s.max_level || '',
      s.max_streak || 0,
      s.device || '',
      (s.modes_completed || []).join('|'),
      (s.answers || []).length
    ]));
    const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'disaster_med_sessions_' + new Date().toISOString().slice(0,10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  document.body.appendChild(overlay);
  renderOverlay();
}

// ---- INTRO ----
function renderIntro() {
  const deployUrl = window.location.href;
  app.innerHTML = `
    <div class="screen intro-screen">
      <div class="intro-top">
        <div class="game-logo">
          <div class="pulse-ring"></div>
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#ff3b5c" stroke-width="3"/>
            <path d="M50 25 L50 55" stroke="#ff3b5c" stroke-width="4" stroke-linecap="round"/>
            <path d="M35 40 L50 55 L65 40" stroke="#ff3b5c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="50" cy="70" r="4" fill="#ff3b5c"/>
          </svg>
        </div>
        <h1 class="game-title">재난의학<br><span class="em">서바이벌</span></h1>
        <p class="game-subtitle">신재난의학 아카데미 유한책임회사<br>인터랙티브 RPG 교육 시뮬레이터 v5</p>
      </div>
      <div class="qr-section" id="qr-section"></div>
      <div class="nick-input-wrap">
        <input class="nick-input" id="nick" placeholder="닉네임 입력" maxlength="8" autocomplete="off"/>
      </div>
      <button class="enter-btn" id="enter-btn" disabled>출동 준비 완료 🚑</button>
      <div class="badge-row">
        <span class="mini-badge">🎮 RPG 시스템</span>
        <span class="mini-badge">🌲 스킬트리</span>
        <span class="mini-badge">🏆 업적</span>
        <span class="mini-badge">👹 보스</span>
      </div>
      <div class="admin-link-wrap">
        <button class="admin-link-btn" id="admin-link-btn">🔐 관리자</button>
      </div>
      <div class="game-footer-credit">
        <p>© 2026 신재난의학 아카데미 유한책임회사. All rights reserved.</p>
        <p>교육 운영: 순천향대학교 재난의학센터</p>
      </div>
    </div>`;

  // QR code
  try {
    const qrDiv = $('qr-section');
    if (typeof qrcode !== 'undefined' && deployUrl.startsWith('http')) {
      const qr = qrcode(0, 'M');
      qr.addData(deployUrl);
      qr.make();
      const size = qr.getModuleCount();
      let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
      svg += `<rect width="${size}" height="${size}" fill="#0e1118"/>`;
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
          if (qr.isDark(r, c))
            svg += `<rect x="${c}" y="${r}" width="1" height="1" fill="#eef0f6"/>`;
      svg += '</svg>';
      qrDiv.innerHTML = `<div class="qr-box">${svg}</div><span class="qr-label">QR 스캔으로 모바일 접속</span>`;
    }
  } catch (e) {}

  // Nick input
  const nickInput = $('nick');
  const enterBtn = $('enter-btn');
  nickInput.addEventListener('input', () => {
    enterBtn.disabled = nickInput.value.trim().length < 1;
  });
  nickInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && nickInput.value.trim()) startGame();
  });
  enterBtn.addEventListener('click', startGame);

  // Admin dashboard link — inline admin overlay
  $('admin-link-btn').addEventListener('click', () => {
    renderInlineAdmin();
  });

  setTimeout(() => nickInput.focus(), 300);
  spawnParticles();
}

function startGame() {
  const nick = $('nick').value.trim();
  if (!nick) return;
  G.nickname = nick;
  G.score = 0;
  G.xp = 0;
  G.level = 1;
  G.streak = 0;
  G.maxStreak = 0;
  G.combo = 1;
  G.modesCompleted = new Set();
  // Reset RPG state
  G.playerClass = null;
  G.skillPoints = 0;
  G.unlockedSkills = [];
  G.earnedAchievements = [];
  G.totalCorrect = 0;
  G.perfectModes = 0;
  G.fastAnswers = 0;
  G.triageAccuracy = 0;
  G.bossGrade = null;
  G.currentAct = 0;
  G.storyMode = true;
  sfx('alert');
  Tracker.startSession(nick);
  // RPG: go to class select first
  G.screen = 'classSelect';
  render();
}

// ---- HUD ----
function renderHUD(timerKey) {
  const timerVal = G[timerKey] || 0;
  const urgentClass = timerVal <= 5 ? 'urgent' : '';
  const classInfo = G.playerClass ? CLASSES[G.playerClass] : null;
  return `
    <div class="game-hud">
      <div class="hud-left">
        <div class="hud-avatar">${classInfo ? classInfo.icon : G.nickname.charAt(0)}</div>
        <span class="hud-name">${G.nickname}</span>
        ${classInfo ? `<span class="hud-class-badge" style="background:${classInfo.color}22;color:${classInfo.color}">${classInfo.name}</span>` : ''}
      </div>
      <div class="hud-center">
        <div class="hud-stat"><span class="icon">⭐</span>${G.score}</div>
        <div class="hud-stat"><span class="icon">🎯</span>Lv.${G.level}</div>
        ${G.streak >= 2 ? `<span class="streak-badge">🔥${G.streak}연속</span>` : ''}
      </div>
      <div class="hud-right">
        <div class="hud-timer ${urgentClass}" id="timer-display">${timerVal}s</div>
      </div>
    </div>
    <div class="xp-progress-bar">
      <div class="xp-fill" style="width:${(G.xp % 200) / 200 * 100}%"></div>
    </div>`;
}

function updateTimerDisplay(val) {
  const el = document.getElementById('timer-display');
  if (el) {
    el.textContent = val + 's';
    el.className = 'hud-timer' + (val <= 5 ? ' urgent' : '');
  }
}

// ---- MODE SELECT ----
function renderModeSelect() {
  const modes = [
    { key: 'triage', icon: '🚑', title: 'START Triage', desc: '대량 사상자 현장에서 환자를 신속 분류하라', tag: '현장 분류', color: 'red' },
    { key: 'cbrne', icon: '☢️', title: 'CBRNE 대응', desc: '화학·생물·방사능·핵·폭발물 위협 대처', tag: '특수재난', color: 'purple' },
    { key: 'mci', icon: '🏥', title: 'MCI 지휘관', desc: '다수사상자사고 현장 지휘 및 자원 배분', tag: '현장지휘', color: 'yellow' },
    { key: 'quiz', icon: '📋', title: '재난의학 퀴즈', desc: '재난의학 핵심 지식을 시험하라', tag: '지식 평가', color: 'green' },
    { key: 'ethics', icon: '⚖️', title: '윤리적 딜레마', desc: '재난 상황의 극한 윤리적 결정을 내려라', tag: '의료윤리', color: 'cyan' },
    { key: 'leadership', icon: '🎖️', title: '리더십 챌린지', desc: '위기 상황에서 팀을 이끌어라', tag: '리더십', color: 'purple' },
    { key: 'teamwork', icon: '🤝', title: '팀워크 미션', desc: '다학제 팀과 협력하여 환자를 구출하라', tag: '팀 협력', color: 'amber' },
    { key: 'cbrneAdv', icon: '☣️', title: 'CBRNE 심화', desc: 'CBRNE 5대 위협 전문 퀴즈 & 시나리오', tag: 'CBRNE 전문', color: 'orange' },
    { key: 'tactical', icon: '🎯', title: '전술의학', desc: 'TCCC/TECC 전술 현장 응급의료', tag: '전술의학', color: 'green' },
    { key: 'ctm', icon: '🛡️', title: '대테러의학', desc: '대테러 의학 전문 지식과 대응', tag: 'CTM', color: 'red' },
    { key: 'hseep', icon: '📋', title: 'HSEEP 훈련 설계', desc: 'FEMA HSEEP 기반 재난 훈련 설계 마스터', tag: 'HSEEP', color: 'blue' },
  ];

  const lb = [...G.leaderboard];
  const playerEntry = lb.find(e => e.name === G.nickname);
  if (!playerEntry && G.score > 0) lb.push({ name: G.nickname, score: G.score });
  else if (playerEntry) playerEntry.score = Math.max(playerEntry.score, G.score);
  lb.sort((a, b) => b.score - a.score);
  const top5 = lb.slice(0, 5);

  const classInfo = G.playerClass ? CLASSES[G.playerClass] : null;
  const act = STORY_ACTS[G.currentAct] || STORY_ACTS[0];
  const actModes = act.modes;

  // Check which modes get class bonus
  function getModeBonus(modeKey) {
    if (!classInfo) return '';
    if (classInfo.bonusModes.includes(modeKey)) return `<span class="mode-bonus-tag">+${modeKey === 'cbrne' ? '30' : '20'}% ${classInfo.icon}</span>`;
    return '';
  }

  app.innerHTML = `
    <div class="game-hud">
      <div class="hud-left">
        <div class="hud-avatar">${classInfo ? classInfo.icon : G.nickname.charAt(0)}</div>
        <span class="hud-name">${G.nickname}</span>
        ${classInfo ? `<span class="hud-class-badge" style="background:${classInfo.color}22;color:${classInfo.color}">${classInfo.name}</span>` : ''}
      </div>
      <div class="hud-center">
        <div class="hud-stat"><span class="icon">⭐</span>${G.score}</div>
        <div class="hud-stat"><span class="icon">🎯</span>Lv.${G.level}</div>
      </div>
      <div class="hud-right"></div>
    </div>
    <div class="xp-progress-bar"><div class="xp-fill" style="width:${(G.xp % 200) / 200 * 100}%"></div></div>
    <div class="screen mode-screen">
      <div class="rpg-nav-bar">
        <button class="rpg-nav-btn" onclick="G.screen='skilltree';render();">🌲 스킬트리 ${G.skillPoints > 0 ? `<span class="sp-dot">${G.skillPoints}</span>` : ''}</button>
        <button class="rpg-nav-btn" onclick="G.screen='achievements';render();">🏆 업적 <span class="achieve-count">${G.earnedAchievements.length}/${ACHIEVEMENTS.length}</span></button>
      </div>

      <div class="story-act-banner anim-in">
        <div class="act-label">${act.title}</div>
        <div class="act-subtitle">${act.subtitle}</div>
        <div class="act-progress">
          ${STORY_ACTS.map((a, i) => `<span class="act-dot ${i < G.currentAct ? 'done' : ''} ${i === G.currentAct ? 'current' : ''}">${i+1}</span>`).join('')}
        </div>
      </div>

      <div class="mode-header">
        ${charBubble('mentor', `<strong>${G.nickname}</strong>${classInfo ? ` (${classInfo.icon} ${classInfo.name})` : ''}, 어떤 미션에 도전하겠나? 모든 미션을 완수하면 <em>보스 라운드</em>가 해금된다!`)}
      </div>
      <div class="mode-grid stagger">
        ${modes.map(m => {
          const isActMode = actModes.includes(m.key);
          return `
          <button class="mode-card ${isActMode ? 'act-highlight' : ''}" data-mode="${m.key}" onclick="enterMode('${m.key}')">
            <div class="mode-icon">${m.icon}</div>
            <div class="mode-info">
              <h3>${m.title} ${G.modesCompleted.has(m.key) ? '✅' : ''}</h3>
              <p>${m.desc}</p>
              <div class="mode-tag-row">
                <span class="mode-tag">${m.tag}</span>
                ${getModeBonus(m.key)}
                ${isActMode ? '<span class="act-mode-tag">🎬 현재 ACT</span>' : ''}
              </div>
            </div>
          </button>`;
        }).join('')}
        <button class="mode-card emergo-card" data-mode="emergo" onclick="G.screen='emergoSelect';render();">
          <div class="mode-icon">🏥</div>
          <div class="mode-info">
            <h3>EMERGO 체인 ${G.modesCompleted.has('emergo') ? '✅' : '🆕'}</h3>
            <p>현장→CCP→이송→병원 — 연속 체인 시나리오</p>
            <div class="mode-tag-row">
              <span class="mode-tag">전체 대응</span>
              <span class="mode-tag emergo-tag">EMERGO</span>
            </div>
          </div>
        </button>
        <button class="mode-card boss-card" data-mode="boss" onclick="enterMode('boss')" ${G.modesCompleted.size < 3 ? 'style="opacity:0.4;pointer-events:none"' : ''}>
          <div class="mode-icon">👹</div>
          <div class="mode-info">
            <h3>보스 라운드 ${G.modesCompleted.size < 3 ? '🔒' : '🔓'}</h3>
            <p>${G.modesCompleted.size < 3 ? `미션 ${3 - G.modesCompleted.size}개 더 완수 필요` : '최종 보스에 도전하라!'}</p>
            <span class="mode-tag">최종 도전</span>
          </div>
        </button>
      </div>
      <div class="leaderboard-section anim-in">
        <h3>🏆 리더보드</h3>
        ${top5.map((e, i) => `
          <div class="lb-row">
            <div class="lb-rank ${i===0?'gold':i===1?'silver':i===2?'bronze':'normal'}">${i+1}</div>
            <div class="lb-name ${e.name===G.nickname?'me':''}">${e.name}</div>
            <div class="lb-score">${e.score}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function enterMode(mode) {
  G.screen = mode;
  Tracker.startMode(mode);
  if (mode === 'triage') { G.tPatientIdx = 0; G.tResults = []; G.tSelected = null; }
  if (mode === 'quiz') { G.qIdx = 0; G.qScore = 0; G.qAnswered = false; }
  if (mode === 'cbrne') { G.cbIdx = 0; G.cbStep = 1; G.cbOrder = []; }
  if (mode === 'mci') { G.mciIdx = 0; G.mciScore = 0; G._mciDecIdx = 0; }
  if (mode === 'ethics') { G.ethIdx = 0; G.ethScore = 0; G.ethAnswered = false; }
  if (mode === 'leadership') { G.leadIdx = 0; G.leadScore = 0; }
  if (mode === 'teamwork') { G.twIdx = 0; G.twScore = 0; }
  if (mode === 'boss') {
    const pool = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    G.bossQ = pool.slice(0, 10);
    G.bossIdx = 0; G.bossScore = 0; G.bossActive = true;
  }
  if (mode === 'cbrneAdv') {
    const content = window.CBRNE_CONTENT;
    if (!content) { alert('CBRNE 콘텐츠 로딩 실패'); return; }
    const allQ = Object.values(content.questions).flat();
    G.advQ = [...allQ].sort(() => Math.random() - 0.5).slice(0, 15);
    G.advIdx = 0; G.advScore = 0; G.advAnswered = false;
  }
  if (mode === 'tactical') {
    const content = window.TACTICAL_CTM_CONTENT;
    if (!content) { alert('전술의학 콘텐츠 로딩 실패'); return; }
    G.tacQ = [...content.tacticalQuestions].sort(() => Math.random() - 0.5).slice(0, 15);
    G.tacIdx = 0; G.tacScore = 0; G.tacAnswered = false;
  }
  if (mode === 'ctm') {
    const content = window.TACTICAL_CTM_CONTENT;
    if (!content) { alert('대테러의학 콘텐츠 로딩 실패'); return; }
    G.ctmQ = [...content.ctmQuestions].sort(() => Math.random() - 0.5).slice(0, 15);
    G.ctmIdx = 0; G.ctmScore = 0; G.ctmAnswered = false;
  }
  Tracker.startQuestion();
  render();
}

// ---- TRIAGE ----
function renderTriage() {
  const patients = SCENARIOS.triage.patients;
  const p = patients[G.tPatientIdx];
  if (!p) { showTriageResults(); return; }

  const vitKeys = Object.keys(p.vitals);
  const patientDialogue = rnd(CHARS.patient.cries);
  const mentorLine = G.tPatientIdx === 0
    ? '첫 환자다! START Triage 알고리즘을 떠올려. <strong>호흡 → 순환 → 의식</strong> 순서로 평가하자!'
    : rnd(CHARS.mentor.hints);

  app.innerHTML = `
    ${renderHUD('tTimer')}
    <div class="screen triage-game">
      <div class="siren-bar"></div>
      ${narrativePanel(SCENARIOS.triage.description, { type: 'danger', tag: '긴급 상황', tagClass: 'emergency', icon: '🚨' })}
      ${charBubble('patient', patientDialogue, { right: true, urgent: true, expression: '😰' })}
      ${charBubble('mentor', mentorLine, { delay: 200 })}

      <div class="patient-card dramatic-reveal">
        <div class="patient-top">
          <div class="patient-avatar-info">
            <div class="patient-avatar">${p.icon}</div>
            <div>
              <div class="patient-name">${p.name}</div>
              <div class="patient-meta">${p.age}세 · ${p.gender}</div>
            </div>
          </div>
          <div class="patient-counter">${G.tPatientIdx + 1} / ${patients.length}</div>
        </div>
        <div class="vitals-grid">
          ${vitKeys.map(k => {
            const v = p.vitals[k];
            return `<div class="vital-box ${v.status}">
              <div class="vital-label">${v.label}</div>
              <div class="vital-val">${v.value}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="findings">
          <h4>현장 소견</h4>
          ${p.findings.map(f => `<div class="finding-row"><div class="finding-dot"></div><span>${f}</span></div>`).join('')}
        </div>
        <div class="triage-action-area">
          <h4>START Triage 분류</h4>
          <div class="triage-btns">
            ${[
              { t: 'red', label: 'RED', sub: '즉시(긴급)' },
              { t: 'yellow', label: 'YELLOW', sub: '지연(응급)' },
              { t: 'green', label: 'GREEN', sub: '경미(비응급)' },
              { t: 'black', label: 'BLACK', sub: '사망/기대불가' }
            ].map(b => `
              <button class="t-btn ${G.tSelected === b.t ? 'selected' : ''}" data-t="${b.t}" onclick="selectTriage('${b.t}')">
                <span class="t-label">${b.label}</span>
                <span class="t-sub">${b.sub}</span>
              </button>
            `).join('')}
          </div>
          <button class="go-btn ${G.tSelected ? 'ready' : ''}" onclick="confirmTriage()">분류 확정 →</button>
        </div>
      </div>
    </div>`;

  showDangerPulse(true);
  startCountdown('tTimer', G.tTimePerPatient + getTimerBonus('triage'), updateTimerDisplay, () => {
    // Time up - auto wrong
    G.tResults.push({ patient: p, chosen: 'timeout', correct: p.correctTriage });
    updateStreak(false);
    G.tPatientIdx++;
    G.tSelected = null;
    render();
  });
}

function selectTriage(color) {
  G.tSelected = color;
  document.querySelectorAll('.t-btn').forEach(b => b.classList.toggle('selected', b.dataset.t === color));
  document.querySelector('.go-btn').classList.add('ready');
  sfx('tick');
}

function confirmTriage() {
  if (!G.tSelected) return;
  stopTimer('tTimer');
  const p = SCENARIOS.triage.patients[G.tPatientIdx];
  const correct = G.tSelected === p.correctTriage;

  if (correct) {
    sfx('correct');
    flashScreen('green');
    showImpact('green');
    const pts = addScore(100);
    addXP(30);
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    showImpact();
    addScore(-20);
    updateStreak(false);
  }
  checkAchievements();

  // Track answer
  Tracker.recordAnswer(`triage_${G.tPatientIdx}`, G.tSelected, correct);

  G.tResults.push({ patient: p, chosen: G.tSelected, correct: p.correctTriage });
  showSpeedLines();

  // Show feedback with character
  showTriageFeedback(p, correct);
}

function showTriageFeedback(p, correct) {
  const mentorLine = correct ? rnd(CHARS.mentor.correct) : rnd(CHARS.mentor.wrong);
  const triageLabels = { red: 'RED(즉시)', yellow: 'YELLOW(지연)', green: 'GREEN(경미)', black: 'BLACK(사망)' };

  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '✅' : '❌'}</div>
      <h2>${correct ? '정확한 분류!' : '오분류!'}</h2>
      ${!correct ? `<div class="fb-answer">정답: ${triageLabels[p.correctTriage]}</div>` : ''}
      <div class="fb-char-section">
        <div class="fb-char-avatar">${CHARS.mentor.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${CHARS.mentor.name}:</strong> ${mentorLine}<br><br>${p.explanation}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+100' : '-20'}</div>
      ${G.streak >= 2 ? `<div class="fb-combo">🔥 ${G.streak}연속! 콤보 x${G.combo.toFixed(1)}</div>` : ''}
      <button class="fb-next" onclick="nextTriagePatient()">다음 환자 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextTriagePatient() {
  document.querySelector('.feedback-layer')?.remove();
  G.tPatientIdx++;
  G.tSelected = null;
  Tracker.startQuestion();
  showDangerPulse(false);
  render();
}

function showTriageResults() {
  showDangerPulse(false);
  stopTimer('tTimer');
  G.modesCompleted.add('triage');
  const total = G.tResults.length;
  const correct = G.tResults.filter(r => r.chosen === r.correct).length;
  const pct = Math.round((correct / total) * 100);
  G.triageAccuracy = pct;
  // Track perfect mode
  if (pct === 100 && total > 0) G.perfectModes++;
  checkAchievements();
  // Advance story act if all act modes completed
  advanceStoryAct();
  showModeResults('START Triage', pct, correct, total, '🚑');
}

// ---- QUIZ ----
function renderQuiz() {
  const total = Math.min(QUIZ_QUESTIONS.length, 15);
  const q = QUIZ_QUESTIONS[G.qIdx];
  if (!q || G.qIdx >= total) { showQuizResults(); return; }

  const mentorLine = G.qIdx === 0
    ? '재난의학의 핵심 지식을 테스트하겠다. 신중하게 선택해!'
    : G.qAnswered ? '' : rnd(CHARS.mentor.hints);

  app.innerHTML = `
    ${renderHUD('qTimer')}
    <div class="screen quiz-game">
      ${G.qIdx === 0 ? charBubble('mentor', mentorLine) : ''}
      <div class="quiz-progress-bar">
        <span class="quiz-pbar-num">${G.qIdx + 1}/${total}</span>
        <div class="pbar-track"><div class="pbar-fill" style="width:${((G.qIdx) / total) * 100}%"></div></div>
      </div>
      <div class="quiz-q-card anim-in">
        <div class="quiz-q-text">${q.question}</div>
        <div class="quiz-opts">
          ${q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let cls = '';
            if (G.qAnswered) {
              if (i === q.correct) cls = 'correct';
              else if (i === G._quizSelected && i !== q.correct) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerQuiz(${i})" ${G.qAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.qAnswered ? `
          <div class="quiz-explanation">${q.explanation || ''}</div>
          <button class="quiz-next-btn" onclick="nextQuiz()">다음 문제 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.qAnswered) {
    startCountdown('qTimer', G.qTimePerQ + getTimerBonus('quiz'), updateTimerDisplay, () => {
      G.qAnswered = true;
      G._quizSelected = -1;
      updateStreak(false);
      sfx('wrong');
      shakeScreen();
      render();
    });
  }
}

function answerQuiz(idx) {
  if (G.qAnswered) return;
  G.qAnswered = true;
  G._quizSelected = idx;
  stopTimer('qTimer');

  const q = QUIZ_QUESTIONS[G.qIdx];
  const correct = idx === q.correct;

  // Track answer
  Tracker.recordAnswer(`quiz_${G.qIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    const timeBonus = Math.max(0, G.qTimer * 5);
    addScore(100 + timeBonus);
    addXP(25);
    G.qScore++;
    updateStreak(true);
    G.totalCorrect++;
    // Track fast answers for Speed Demon achievement
    const timeTaken = (G.qTimePerQ + getTimerBonus('quiz')) - G.qTimer;
    if (timeTaken <= 5) G.fastAnswers++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-10);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextQuiz() {
  G.qIdx++;
  G.qAnswered = false;
  G._quizSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showQuizResults() {
  stopTimer('qTimer');
  G.modesCompleted.add('quiz');
  const total = Math.min(QUIZ_QUESTIONS.length, 15);
  const pct = Math.round((G.qScore / total) * 100);
  if (pct === 100 && total > 0) G.perfectModes++;
  checkAchievements();
  advanceStoryAct();
  showModeResults('재난의학 퀴즈', pct, G.qScore, total, '📋');
}

// ---- CBRNE ----
function renderCBRNE() {
  const scenarios = CBRNE_SCENARIOS;
  const sc = scenarios[G.cbIdx];
  if (!sc) { showCBRNEResults(); return; }

  const steps = sc.steps;
  // Build correct order from step.correct values (1-indexed)
  const sortedByCorrect = [...steps].sort((a, b) => a.correct - b.correct);
  const correctOrderIds = sortedByCorrect.map(s => steps.indexOf(s));

  const villainLine = rnd(CHARS.villain.taunts);
  const mentorLine = G.cbStep === 1
    ? `<strong>${sc.type}</strong> 위협이다! 올바른 대응 순서를 선택해!`
    : `다음 단계를 선택해. 순서가 중요하다!`;

  app.innerHTML = `
    ${renderHUD('cbTimer')}
    <div class="screen cbrne-game">
      <div class="cbrne-tabs">
        ${scenarios.map((s, i) => `<button class="cbrne-tab ${i === G.cbIdx ? 'active' : ''}">${s.type}</button>`).join('')}
      </div>

      ${charBubble('villain', villainLine, { right: true, urgent: true, expression: '😈' })}
      ${charBubble('mentor', mentorLine, { delay: 200 })}

      <div class="cbrne-brief anim-in">
        <span class="threat-tag">${sc.icon || '☢️'} ${sc.type} 위협</span>
        <h2>${sc.title}</h2>
        <p>${sc.description}</p>
      </div>

      <div class="cbrne-progress-text">대응 단계 ${G.cbStep} / ${steps.length}</div>

      <div class="cbrne-steps stagger">
        ${steps.map((step, i) => {
          const orderIdx = G.cbOrder.indexOf(i);
          const done = orderIdx !== -1;
          const isCorrect = done && (i === correctOrderIds[orderIdx]);
          return `<button class="cb-step ${done ? 'done' : ''} ${done ? (isCorrect ? 'ok' : 'nope') : ''}"
            onclick="pickCBRNEStep(${i})" ${done ? 'disabled' : ''}>
            <div class="cb-num">${done ? (orderIdx + 1) : (i + 1)}</div>
            <div>
              <h4>${step.title}</h4>
              <p>${step.desc}</p>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>`;

  if (G.cbOrder.length === 0) {
    startCountdown('cbTimer', 60 + getTimerBonus('cbrne'), updateTimerDisplay, () => {
      finishCBRNEScenario();
    });
  }
}

function pickCBRNEStep(idx) {
  const sc = CBRNE_SCENARIOS[G.cbIdx];
  const steps = sc.steps;
  const sortedByCorrect = [...steps].sort((a, b) => a.correct - b.correct);
  const correctOrderIds = sortedByCorrect.map(s => steps.indexOf(s));

  G.cbOrder.push(idx);
  G.cbStep++;

  const expectedIdx = correctOrderIds[G.cbOrder.length - 1];
  const correct = idx === expectedIdx;

  // Track answer
  Tracker.recordAnswer(`cbrne_${G.cbIdx}_step${G.cbOrder.length}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(50);
    addXP(15);
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    updateStreak(false);
  }
  checkAchievements();

  if (G.cbOrder.length >= sc.steps.length) {
    finishCBRNEScenario();
  } else {
    render();
  }
}

function finishCBRNEScenario() {
  stopTimer('cbTimer');
  G.cbIdx++;
  G.cbStep = 1;
  G.cbOrder = [];
  if (G.cbIdx >= CBRNE_SCENARIOS.length) {
    G.modesCompleted.add('cbrne');
    showModeResults('CBRNE 대응', null, null, null, '☢️');
  } else {
    Tracker.startQuestion();
    render();
  }
}

function showCBRNEResults() {
  G.modesCompleted.add('cbrne');
  advanceStoryAct();
  showModeResults('CBRNE 대응', null, null, null, '☢️');
}

// ---- MCI ----
// MCI state tracks both scenario index and decision index within scenario
function renderMCI() {
  const scenarios = MCI_SCENARIOS;
  if (!G._mciDecIdx) G._mciDecIdx = 0;
  const sc = scenarios[G.mciIdx];
  if (!sc) { showMCIResults(); return; }

  const dec = sc.decisions[G._mciDecIdx];
  if (!dec) {
    // Move to next scenario
    G.mciIdx++;
    G._mciDecIdx = 0;
    render();
    return;
  }

  const commanderLine = G.mciIdx === 0 && G._mciDecIdx === 0
    ? '지휘본부 설치 완료! 자원 배분과 의사결정이 핵심이다. <strong>현장지휘관</strong>으로서 최선의 판단을 내려라!'
    : rnd(CHARS.commander.orders);

  const paramedicLine = rnd(CHARS.paramedic.reports);
  const zones = sc.zones || {};

  app.innerHTML = `
    ${renderHUD('mciTimer')}
    <div class="screen mci-game">
      ${charBubble('commander', commanderLine, { delay: 0 })}
      ${charBubble('paramedic', paramedicLine, { right: true, delay: 150, expression: '🫡' })}

      ${narrativePanel(`<strong>${sc.title}</strong><br>${sc.description}`, { type: 'warning', tag: '현장 상황', tagClass: 'situation', icon: '🏥' })}

      <div class="mci-stats-row">
        <div class="mci-stat-chip"><div class="num" style="color:var(--red)">${zones.red || '?'}</div><div class="lbl">RED</div></div>
        <div class="mci-stat-chip"><div class="num" style="color:var(--yellow)">${zones.yellow || '?'}</div><div class="lbl">YELLOW</div></div>
        <div class="mci-stat-chip"><div class="num" style="color:var(--green)">${zones.green || '?'}</div><div class="lbl">GREEN</div></div>
        <div class="mci-stat-chip"><div class="num">${sc.totalPatients || '?'}</div><div class="lbl">총원</div></div>
      </div>

      <div class="mci-q-card anim-in">
        <div class="q-label">의사결정 ${G._mciDecIdx + 1}/${sc.decisions.length}</div>
        <div class="q-text">${dec.question}</div>
        <div class="mci-opts stagger">
          ${dec.options.map((opt, i) => `
            <button class="mci-opt" onclick="answerMCI(${i})">${opt.text}</button>
          `).join('')}
        </div>
      </div>
    </div>`;

  startCountdown('mciTimer', 45 + getTimerBonus('mci'), updateTimerDisplay, () => {
    updateStreak(false);
    sfx('wrong');
    G._mciDecIdx++;
    if (G._mciDecIdx >= sc.decisions.length) { G.mciIdx++; G._mciDecIdx = 0; }
    render();
  });
}

function answerMCI(idx) {
  stopTimer('mciTimer');
  const sc = MCI_SCENARIOS[G.mciIdx];
  const dec = sc.decisions[G._mciDecIdx];
  const chosen = dec.options[idx];
  const correct = chosen.correct;

  // Track answer
  Tracker.recordAnswer(`mci_${G.mciIdx}_dec${G._mciDecIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(150);
    addXP(40);
    G.mciScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-30);
    updateStreak(false);
  }
  checkAchievements();

  // Show feedback
  const mentorLine = correct ? rnd(CHARS.mentor.correct) : rnd(CHARS.mentor.wrong);
  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '✅' : '❌'}</div>
      <h2>${correct ? '적절한 지휘!' : '재고 필요!'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${CHARS.mentor.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${CHARS.mentor.name}:</strong> ${mentorLine}<br><br>${dec.explanation || ''}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+150' : '-30'}</div>
      <button class="fb-next" onclick="nextMCI()">다음 상황 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextMCI() {
  document.querySelector('.feedback-layer')?.remove();
  const sc = MCI_SCENARIOS[G.mciIdx];
  G._mciDecIdx++;
  if (!sc || G._mciDecIdx >= sc.decisions.length) {
    G.mciIdx++;
    G._mciDecIdx = 0;
  }
  Tracker.startQuestion();
  render();
}

function showMCIResults() {
  stopTimer('mciTimer');
  G.modesCompleted.add('mci');
  const totalDecisions = MCI_SCENARIOS.reduce((sum, s) => sum + s.decisions.length, 0);
  const pct = Math.round((G.mciScore / Math.max(totalDecisions, 1)) * 100);
  if (pct === 100 && totalDecisions > 0) G.perfectModes++;
  checkAchievements();
  advanceStoryAct();
  showModeResults('MCI 지휘관', pct, G.mciScore, totalDecisions, '🏥');
}

// ---- ETHICS ----
function renderEthics() {
  const dilemmas = ETHICS_DILEMMAS;
  const d = dilemmas[G.ethIdx];
  if (!d) { showEthicsResults(); return; }

  const mentorLine = G.ethIdx === 0
    ? '재난 상황에서는 <strong>평시와 다른 윤리적 기준</strong>이 적용된다. 최선의 판단을 내려봐.'
    : '다음 딜레마다. 정답은 없지만, 더 나은 선택은 있다.';

  app.innerHTML = `
    ${renderHUD('ethTimer')}
    <div class="screen ethics-game">
      ${charBubble('mentor', mentorLine, { delay: 0 })}

      ${narrativePanel(`<strong>${d.title}</strong>`, { type: 'info', tag: '윤리적 딜레마', tagClass: 'mission', icon: '⚖️' })}

      <div class="dilemma-card anim-in">
        <div class="dilemma-label" style="color:var(--cyan)">상황 ${G.ethIdx + 1} / ${dilemmas.length}</div>
        <div class="dilemma-text">${d.scenario}</div>
        ${d.ethicalPrinciples ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:12px">관련 원칙: ${d.ethicalPrinciples.join(', ')}</div>` : ''}
        <div class="dilemma-opts stagger">
          ${d.options.map((opt, i) => {
            let cls = '';
            if (G.ethAnswered) {
              cls = 'ok'; // All ethics options are valid perspectives
            }
            return `<button class="dilemma-opt ${cls}" onclick="answerEthics(${i})" ${G.ethAnswered ? 'disabled' : ''}>
              ${opt.text}
            </button>`;
          }).join('')}
        </div>
        ${G.ethAnswered ? `
          <div class="quiz-explanation">
            ${G._ethFeedback || ''}
            ${d.explanation ? `<br><br>${d.explanation}` : ''}
          </div>
          <button class="quiz-next-btn" onclick="nextEthics()">다음 딜레마 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.ethAnswered) {
    startCountdown('ethTimer', 40 + getTimerBonus('ethics'), updateTimerDisplay, () => {
      G.ethAnswered = true;
      G._ethFeedback = '시간 초과! 재난 상황에서는 신속한 결정이 필요합니다.';
      updateStreak(false);
      sfx('wrong');
      render();
    });
  }
}

function answerEthics(idx) {
  if (G.ethAnswered) return;
  G.ethAnswered = true;
  stopTimer('ethTimer');

  const d = ETHICS_DILEMMAS[G.ethIdx];
  const chosen = d.options[idx];

  // Track answer (ethics has no wrong answer, always true)
  Tracker.recordAnswer(`ethics_${G.ethIdx}`, String(idx), true);

  // Ethics dilemmas have no single "score" — treat all answers as valid learning
  // Give points for engaging with the dilemma
  sfx('correct');
  flashScreen('green');
  addScore(80);
  addXP(35);
  G.ethScore++;
  updateStreak(true);
  G.totalCorrect++;
  checkAchievements();

  // Build feedback from pros/cons if available
  let feedback = '';
  if (chosen.framework) feedback += `<strong>윤리 프레임워크:</strong> ${chosen.framework}<br>`;
  if (chosen.pros) feedback += `<strong>장점:</strong> ${chosen.pros}<br>`;
  if (chosen.cons) feedback += `<strong>단점:</strong> ${chosen.cons}`;
  if (chosen.explanation) feedback = chosen.explanation;
  G._ethFeedback = feedback || '선택에 따른 결과를 분석해보세요.';

  render();
}

function nextEthics() {
  G.ethIdx++;
  G.ethAnswered = false;
  G._ethFeedback = '';
  Tracker.startQuestion();
  render();
}

function showEthicsResults() {
  stopTimer('ethTimer');
  G.modesCompleted.add('ethics');
  const total = ETHICS_DILEMMAS.length;
  const pct = Math.round((G.ethScore / total) * 100);
  checkAchievements();
  advanceStoryAct();
  showModeResults('윤리적 딜레마', pct, G.ethScore, total, '⚖️');
}

// ---- LEADERSHIP ----
function renderLeadership() {
  const scenarios = LEADERSHIP_SCENARIOS;
  const sc = scenarios[G.leadIdx];
  if (!sc) { showLeadershipResults(); return; }

  const commanderLine = G.leadIdx === 0
    ? '위기 상황에서 <strong>리더의 결정</strong>이 팀 전체의 운명을 좌우한다. 준비됐나?'
    : rnd(CHARS.commander.orders);

  app.innerHTML = `
    ${renderHUD('leadTimer')}
    <div class="screen leadership-game">
      ${charBubble('commander', commanderLine, { delay: 0 })}

      ${narrativePanel(`<strong>${sc.title}</strong>`, { type: 'purple', tag: '리더십 상황', tagClass: 'mission', icon: '🎖️' })}

      <div class="dilemma-card anim-in">
        <div class="dilemma-label" style="color:var(--purple)">상황 ${G.leadIdx + 1} / ${scenarios.length}</div>
        <div class="dilemma-text">${sc.situation}</div>
        ${sc.leadershipPrinciple ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:12px">리더십 원칙: ${sc.leadershipPrinciple}</div>` : ''}
        <div class="dilemma-opts stagger">
          ${sc.options.map((opt, i) => `
            <button class="dilemma-opt" onclick="answerLeadership(${i})">${opt.text}</button>
          `).join('')}
        </div>
      </div>
    </div>`;

  startCountdown('leadTimer', 35 + getTimerBonus('leadership'), updateTimerDisplay, () => {
    updateStreak(false);
    sfx('wrong');
    G.leadIdx++;
    render();
  });
}

function answerLeadership(idx) {
  stopTimer('leadTimer');
  const sc = LEADERSHIP_SCENARIOS[G.leadIdx];
  const chosen = sc.options[idx];
  const correct = chosen.correct;

  // Track answer
  Tracker.recordAnswer(`leadership_${G.leadIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(120);
    addXP(35);
    G.leadScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-15);
    updateStreak(false);
  }
  checkAchievements();

  const mentorLine = correct ? rnd(CHARS.mentor.correct) : rnd(CHARS.mentor.wrong);
  const explanation = chosen.explanation || sc.explanation || '';

  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '✅' : '❌'}</div>
      <h2>${correct ? '뛰어난 리더십!' : '다시 생각해보세요'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${CHARS.commander.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${CHARS.commander.name}:</strong> ${mentorLine}<br><br>${explanation}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+120' : '-15'}</div>
      <button class="fb-next" onclick="nextLeadership()">다음 상황 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextLeadership() {
  document.querySelector('.feedback-layer')?.remove();
  G.leadIdx++;
  Tracker.startQuestion();
  render();
}

function showLeadershipResults() {
  stopTimer('leadTimer');
  G.modesCompleted.add('leadership');
  const total = LEADERSHIP_SCENARIOS.length;
  const pct = Math.round((G.leadScore / total) * 100);
  if (pct === 100 && total > 0) G.perfectModes++;
  checkAchievements();
  advanceStoryAct();
  showModeResults('리더십 챌린지', pct, G.leadScore, total, '🎖️');
}

// ---- TEAMWORK ----
function renderTeamwork() {
  const challenges = TEAMWORK_CHALLENGES;
  const ch = challenges[G.twIdx];
  if (!ch) { showTeamworkResults(); return; }

  const nurseReport = rnd(CHARS.nurse.support);
  const mentorLine = G.twIdx === 0
    ? '재난 대응은 <strong>팀워크</strong>가 핵심이다! 각 팀원의 역할을 이해하고 최적의 협력을 이끌어내자!'
    : '다음 팀 미션이다. 누가 어떤 역할을 맡아야 할까?';

  app.innerHTML = `
    ${renderHUD('twTimer')}
    <div class="screen teamwork-game">
      ${charBubble('mentor', mentorLine, { delay: 0 })}
      ${charBubble('nurse', nurseReport, { right: true, delay: 150, expression: '💪' })}

      ${narrativePanel(`<strong>${ch.title}</strong>`, { type: 'warning', tag: '팀 미션', tagClass: 'alert', icon: '🤝' })}

      <div class="dilemma-card anim-in">
        <div class="dilemma-label" style="color:var(--amber)">미션 ${G.twIdx + 1} / ${challenges.length}</div>
        <div class="dilemma-text">${ch.scenario}</div>
        ${ch.clinicalContext ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:12px">임상 상황: ${typeof ch.clinicalContext === 'object' ? Object.entries(ch.clinicalContext).map(([k,v]) => `<strong>${k}:</strong> ${v}`).join(' · ') : ch.clinicalContext}</div>` : ''}
        <div class="dilemma-opts stagger">
          ${ch.options.map((opt, i) => `
            <button class="dilemma-opt" onclick="answerTeamwork(${i})">${opt.text}</button>
          `).join('')}
        </div>
      </div>
    </div>`;

  startCountdown('twTimer', 35 + getTimerBonus('teamwork'), updateTimerDisplay, () => {
    updateStreak(false);
    sfx('wrong');
    G.twIdx++;
    render();
  });
}

function answerTeamwork(idx) {
  stopTimer('twTimer');
  const ch = TEAMWORK_CHALLENGES[G.twIdx];
  const chosen = ch.options[idx];
  const correct = chosen.correct;

  // Track answer
  Tracker.recordAnswer(`teamwork_${G.twIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(120);
    addXP(35);
    G.twScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-15);
    updateStreak(false);
  }
  checkAchievements();

  const mentorLine = correct ? rnd(CHARS.mentor.correct) : rnd(CHARS.mentor.wrong);
  const toolInfo = chosen.tool || ch.teamsteppsTool || '';
  const explanation = chosen.explanation || ch.explanation || '';

  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '✅' : '❌'}</div>
      <h2>${correct ? '완벽한 팀워크!' : '팀 조율 필요!'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${CHARS.nurse.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${CHARS.nurse.name}:</strong> ${mentorLine}<br><br>${explanation}
          ${toolInfo ? `<br><br>💡 <strong>활용 도구:</strong> ${toolInfo}` : ''}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+120' : '-15'}</div>
      <button class="fb-next" onclick="nextTeamwork()">다음 미션 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextTeamwork() {
  document.querySelector('.feedback-layer')?.remove();
  G.twIdx++;
  Tracker.startQuestion();
  render();
}

function showTeamworkResults() {
  stopTimer('twTimer');
  G.modesCompleted.add('teamwork');
  const total = TEAMWORK_CHALLENGES.length;
  const pct = Math.round((G.twScore / total) * 100);
  if (pct === 100 && total > 0) G.perfectModes++;
  checkAchievements();
  advanceStoryAct();
  showModeResults('팀워크 미션', pct, G.twScore, total, '🤝');
}

// ---- BOSS ROUND ----
function renderBoss() {
  const q = G.bossQ[G.bossIdx];
  if (!q || G.bossIdx >= G.bossQ.length) { showBossResults(); return; }

  const villainLine = G.bossIdx === 0
    ? '최종 시험이다... 지금까지 배운 모든 것을 증명해 보아라!'
    : rnd(CHARS.villain.taunts);
  const mentorLine = '침착하게! 지금까지 훈련한 대로 하면 된다!';

  app.innerHTML = `
    ${renderHUD('bossTimer')}
    <div class="screen quiz-game">
      <div class="boss-banner heartbeat-effect">
        <h2>👹 BOSS ROUND</h2>
        <p>최종 도전 — ${G.bossIdx + 1} / ${G.bossQ.length}</p>
      </div>

      ${charBubble('villain', villainLine, { right: true, urgent: true, expression: '👿', delay: 0 })}
      ${charBubble('mentor', mentorLine, { delay: 200 })}

      <div class="quiz-q-card anim-in">
        <div class="quiz-q-text">${q.question}</div>
        <div class="quiz-opts">
          ${q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return `<button class="q-opt" onclick="answerBoss(${i})">
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>`;

  showDangerPulse(true);
  startCountdown('bossTimer', 15 + getTimerBonus('boss'), updateTimerDisplay, () => {
    sfx('wrong');
    shakeScreen();
    updateStreak(false);
    G.bossIdx++;
    render();
  });
}

function answerBoss(idx) {
  stopTimer('bossTimer');
  const q = G.bossQ[G.bossIdx];
  const correct = idx === q.correct;

  // Track answer
  Tracker.recordAnswer(`boss_${G.bossIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    showImpact('green');
    addScore(200);
    addXP(50);
    G.bossScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    showImpact();
    addScore(-50);
    updateStreak(false);
  }
  checkAchievements();

  showSpeedLines();

  const mentorLine = correct ? rnd(CHARS.mentor.correct) : rnd(CHARS.mentor.wrong);
  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '🏆' : '💀'}</div>
      <h2>${correct ? '보스 공략 성공!' : '보스 반격!'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${correct ? CHARS.mentor.emoji : CHARS.villain.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${correct ? CHARS.mentor.name : CHARS.villain.name}:</strong> ${correct ? mentorLine : '이 정도로는 부족하다...'}
          <br><br>${q.explanation || ''}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+200' : '-50'}</div>
      <button class="fb-next" onclick="nextBoss()">다음 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextBoss() {
  document.querySelector('.feedback-layer')?.remove();
  G.bossIdx++;
  Tracker.startQuestion();
  render();
}

function showBossResults() {
  showDangerPulse(false);
  stopTimer('bossTimer');
  G.bossActive = false;
  const total = G.bossQ.length;
  const pct = Math.round((G.bossScore / total) * 100);
  G.bossGrade = getGrade(pct);
  checkAchievements();
  showModeResults('보스 라운드', pct, G.bossScore, total, '👹');
}

// ---- RESULTS (shared) ----
function showModeResults(title, pct, correct, total, icon) {
  // Update leaderboard
  const existing = G.leaderboard.find(e => e.name === G.nickname);
  if (existing) existing.score = Math.max(existing.score, G.score);
  else G.leaderboard.push({ name: G.nickname, score: G.score });
  G.leaderboard.sort((a, b) => b.score - a.score);

  const grade = (pct === null) ? getGradeByScore() : getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';

  // Track mode completion
  Tracker.endMode(correct || G.score);
  Tracker.endSession(G.score, G.level, G.maxStreak, G.modesCompleted);

  const mentorLine = grade === 'S' ? '전설적인 실력이다! 현장에서도 최고의 의사가 될 거야!'
    : grade === 'A' ? '훌륭한 성적이다! 실전에서도 충분히 활약할 수 있어!'
    : grade === 'B' ? '나쁘지 않아. 조금만 더 공부하면 완벽해질 거야.'
    : '기초부터 다시 다지자. 포기하지 마!';

  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', mentorLine, { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">${icon}</div>
      <div class="result-sub">${title} 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      ${pct !== null ? `
        <div class="result-stats anim-in">
          <div class="r-stat"><div class="val">${correct}/${total}</div><div class="lbl">정답</div></div>
          <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
          <div class="r-stat"><div class="val">${G.maxStreak}</div><div class="lbl">최대 연속</div></div>
        </div>
      ` : `
        <div class="result-stats anim-in">
          <div class="r-stat"><div class="val">${G.score}</div><div class="lbl">총점</div></div>
          <div class="r-stat"><div class="val">Lv.${G.level}</div><div class="lbl">레벨</div></div>
          <div class="r-stat"><div class="val">${G.maxStreak}</div><div class="lbl">최대 연속</div></div>
        </div>
      `}
      <div class="xp-bar-wrap anim-in">
        <div class="xp-bar-label"><span>XP</span><span>${G.xp} / ${G.level * 200}</span></div>
        <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${Math.min(100, (G.xp % 200) / 200 * 100)}%"></div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="G.screen='modes';render();">미션 선택 🏠</button>
        <button class="btn-outline" onclick="enterMode('${G.screen}')">재도전 🔄</button>
      </div>
    </div>`;

  G.screen = 'results';
}

function getGrade(pct) {
  if (pct >= 90) return 'S';
  if (pct >= 75) return 'A';
  if (pct >= 50) return 'B';
  return 'C';
}

function getGradeByScore() {
  if (G.score >= 2000) return 'S';
  if (G.score >= 1200) return 'A';
  if (G.score >= 600) return 'B';
  return 'C';
}

// =============================================
// EMERGO CHAIN MODE — 연속 체인 시나리오
// =============================================

function renderEmergoSelect() {
  app.innerHTML = `
    <div class="screen emergo-screen">
      ${renderHUD('emergo')}
      <div class="emergo-header anim-in">
        <div class="emergo-badge">🏥 EMERGO</div>
        <h2>연속 체인 시나리오</h2>
        <p>현장에서 병원까지 — 전체 재난 대응 체인을 경험하세요</p>
      </div>
      <div class="emergo-scenario-list stagger">
        ${EMERGO_CHAIN_SCENARIOS.map((sc, i) => `
          <button class="emergo-scenario-card" onclick="startEmergoChain(${i})">
            <div class="esc-icon">${sc.phases[0].icon}</div>
            <div class="esc-info">
              <h3>${sc.title}</h3>
              <p>${sc.description}</p>
              <div class="esc-meta">
                <span class="esc-tag">👤 ${sc.totalPatients}명</span>
                <span class="esc-tag">📍 ${sc.phases.length}단계</span>
                <span class="esc-tag">⏱ ${sc.phases.reduce((s,p)=>s+p.timeLimit,0)}초</span>
              </div>
            </div>
          </button>
        `).join('')}
      </div>
      <button class="btn-outline" style="margin-top:20px" onclick="G.screen='modes';render();">← 미션 선택</button>
    </div>`;
}

function startEmergoChain(scenarioIdx) {
  const sc = EMERGO_CHAIN_SCENARIOS[scenarioIdx];
  G.emergo = {
    scenarioIdx,
    scenario: sc,
    patients: sc.patientIds.map(id => {
      const p = EMERGO_PATIENTS.find(ep => ep.id === id);
      return { ...p, currentTriage: null, sortCategory: null, treated: false, treatMinute: null, interventionsDone: [], assignedResource: null, transported: false, transportOrder: 0, edStabilized: false, outcome: null };
    }),
    phaseIdx: 0,
    decisions: {},
    resources: {},
    gameMinute: 0,
    phaseScore: 0,
    totalScore: 0,
    sieveResults: [],
    transportQueue: [],
    preventableDeaths: 0,
    // Phase 내부 상태 초기화
    _sieveIdx: 0,
    _sieveCorrect: 0,
    _sieveTimerStarted: false,
    _sortIdx: 0,
    _sortCorrect: 0,
    _sortTimerStarted: false,
    _treatPhase: false,
    _treatCurrent: 0,
    _treatAssignments: {},
    _deconQueue: null,
    _deconDone: null,
    _deconSlots: 0,
    _transportOrder: null,
    _ambulancesAvail: null,
    _edProcessed: null
  };
  G.screen = 'emergo';
  Tracker.startMode('emergo_chain');
  Tracker.startQuestion();
  renderEmergoPhase();
}

function renderEmergoPhase() {
  const em = G.emergo;
  if (!em || !em.scenario) { G.screen = 'modes'; render(); return; }
  const phase = em.scenario.phases[em.phaseIdx];
  if (!phase) { showEmergoFinalResults(); return; }

  if (phase.task === 'sieve_triage') renderEmergoSieve(phase);
  else if (phase.task === 'sort_and_treat') renderEmergoSort(phase);
  else if (phase.task === 'decontamination') renderEmergoDecontam(phase);
  else if (phase.task === 'transport_priority') renderEmergoTransport(phase);
  else if (phase.task === 'ed_management') renderEmergoED(phase);
  else { showEmergoFinalResults(); }
}

// ---- PHASE 1: Sieve Triage ----
function renderEmergoSieve(phase) {
  const em = G.emergo;
  if (em._sieveIdx == null) em._sieveIdx = 0;
  if (em._sieveCorrect == null) em._sieveCorrect = 0;

  const patients = em.patients;
  const currentP = patients[em._sieveIdx];

  if (!currentP || em._sieveIdx >= patients.length) {
    // Sieve 완료 → 타이머 정지 후 다음 단계
    stopTimer('emergo_sieve');
    em.phaseScore = Math.round((em._sieveCorrect / patients.length) * 100);
    addScore(em._sieveCorrect * 150);
    addXP(em._sieveCorrect * 30);
    em.phaseIdx++;
    em._sieveIdx = 0;
    showEmergoPhaseTransition();
    return;
  }

  const timeKey = 'emergo_sieve';
  // 타이머는 첫 렌더링에서만 시작 (환자마다 리셋 방지)
  if (em._sieveIdx === 0 && !em._sieveTimerStarted) {
    em._sieveTimerStarted = true;
    startCountdown(timeKey, phase.timeLimit, null, () => {
      // Time's up — auto-advance remaining as wrong
      for (let i = em._sieveIdx; i < patients.length; i++) {
        patients[i].currentTriage = 'yellow'; // default
      }
      em.phaseScore = Math.round((em._sieveCorrect / patients.length) * 100);
      addScore(em._sieveCorrect * 150);
      addXP(em._sieveCorrect * 30);
      em.phaseIdx++;
      em._sieveIdx = 0;
      showEmergoPhaseTransition();
    });
  }

  const progress = `${em._sieveIdx + 1}/${patients.length}`;
  const sieveHint = phase.hint || '';

  app.innerHTML = `
    <div class="screen emergo-play-screen">
      ${renderHUD(timeKey)}
      <div class="emergo-phase-bar">
        <span class="phase-icon">${phase.icon}</span>
        <span class="phase-name">${phase.name}</span>
        <span class="phase-progress">${progress}</span>
      </div>

      <div class="emergo-patient-card anim-in">
        <div class="epc-header">
          <span class="epc-icon">${currentP.icon}</span>
          <div class="epc-info">
            <strong>${currentP.name}</strong> (${currentP.age}세, ${currentP.gender})
            <div class="epc-appearance">${currentP.appearance}</div>
          </div>
          <span class="epc-id">${currentP.id}</span>
        </div>

        <div class="epc-vitals">
          <div class="epc-vital"><span class="v-label">보행</span><span class="v-val ${currentP.walking?'good':'bad'}">${currentP.walking?'가능':'불가'}</span></div>
          <div class="epc-vital"><span class="v-label">호흡</span><span class="v-val ${currentP.sieve.breathing?'':'bad'}">${currentP.sieve.breathing?'있음':'없음'}</span></div>
          ${currentP.sieve.breathing ? `
            <div class="epc-vital"><span class="v-label">호흡수</span><span class="v-val ${currentP.sieve.respRate>30||currentP.sieve.respRate<10?'bad':''}">${currentP.sieve.respRate}회/분</span></div>
            <div class="epc-vital"><span class="v-label">Cap Refill</span><span class="v-val ${currentP.sieve.capRefill>2?'bad':''}">${currentP.sieve.capRefill}초</span></div>
          ` : `
            <div class="epc-vital"><span class="v-label">기도개방후</span><span class="v-val ${currentP.sieve.afterAirway?'warn':'bad'}">${currentP.sieve.afterAirway?'호흡 회복':'호흡 없음'}</span></div>
          `}
        </div>

        <div class="epc-injuries">
          ${currentP.injuries.map(inj => `<div class="epc-injury">• ${inj}</div>`).join('')}
        </div>
      </div>

      <div class="emergo-triage-buttons anim-in">
        <button class="etb red" onclick="emergoSieveAnswer('red')">🔴 즉시 (RED)</button>
        <button class="etb yellow" onclick="emergoSieveAnswer('yellow')">🟡 긴급 (YELLOW)</button>
        <button class="etb green" onclick="emergoSieveAnswer('green')">🟢 지연 (GREEN)</button>
        <button class="etb black" onclick="emergoSieveAnswer('black')">⚫ 사망 (BLACK)</button>
      </div>

      <div class="emergo-hint">
        <details><summary>💡 Sieve 알고리즘 힌트</summary><p>${sieveHint}</p></details>
      </div>
    </div>`;
}

function emergoSieveAnswer(answer) {
  const em = G.emergo;
  const p = em.patients[em._sieveIdx];
  const correct = p.correctSieve;
  p.currentTriage = answer;

  const isCorrect = answer === correct;
  if (isCorrect) {
    em._sieveCorrect++;
    G.streak++;
    if (G.streak > G.maxStreak) G.maxStreak = G.streak;
    showImpact('#10b981');
  } else {
    G.streak = 0;
    showImpact('#ef4444');
  }

  G.totalCorrect++;
  checkAchievements();

  // Brief feedback
  const fb = document.createElement('div');
  fb.className = `emergo-feedback ${isCorrect ? 'correct' : 'wrong'} anim-in`;
  fb.innerHTML = `${isCorrect ? '✅ 정확!' : `❌ ${correct.toUpperCase()}`} — ${p.name}`;
  document.querySelector('.emergo-play-screen')?.appendChild(fb);

  setTimeout(() => {
    em._sieveIdx++;
    renderEmergoSieve(em.scenario.phases[em.phaseIdx]);
  }, 800);
}

// ---- PHASE 2: Sort & Treat ----
function renderEmergoSort(phase) {
  const em = G.emergo;
  // Only non-black patients continue
  const activePatients = em.patients.filter(p => p.currentTriage !== 'black');
  if (em._sortIdx == null) em._sortIdx = 0;
  if (em._sortCorrect == null) em._sortCorrect = 0;
  if (!em._treatPhase) em._treatPhase = false;

  // Phase A: Sort classification
  if (!em._treatPhase) {
    const currentP = activePatients[em._sortIdx];
    if (!currentP || em._sortIdx >= activePatients.length) {
      // Sort 완료 → 타이머 정지 후 처치 배분 단계
      stopTimer('emergo_sort');
      em._treatPhase = true;
      em._sortIdx = 0;
      renderEmergoTreat(phase);
      return;
    }

    const trts = sortScore(currentP);
    const expectedSort = sortCategory(currentP);

    const timeKey = 'emergo_sort';
    // 타이머는 첫 렌더링에서만 시작
    if (em._sortIdx === 0 && !em._sortTimerStarted) {
      em._sortTimerStarted = true;
      startCountdown(timeKey, phase.timeLimit, null, () => {
        em._treatPhase = true;
        renderEmergoTreat(phase);
      });
    }

    app.innerHTML = `
      <div class="screen emergo-play-screen">
        ${renderHUD(timeKey)}
        <div class="emergo-phase-bar">
          <span class="phase-icon">${phase.icon}</span>
          <span class="phase-name">${phase.name} — Sort 분류</span>
          <span class="phase-progress">${em._sortIdx + 1}/${activePatients.length}</span>
        </div>

        <div class="emergo-patient-card anim-in">
          <div class="epc-header">
            <span class="epc-icon">${currentP.icon}</span>
            <div class="epc-info">
              <strong>${currentP.name}</strong> (${currentP.age}세)
              <div class="epc-appearance">Sieve: ${currentP.currentTriage?.toUpperCase()}</div>
            </div>
          </div>
          <div class="epc-vitals sort-vitals">
            <div class="epc-vital"><span class="v-label">GCS</span><span class="v-val">${currentP.sort.gcs}</span></div>
            <div class="epc-vital"><span class="v-label">호흡수</span><span class="v-val">${currentP.sort.respRate}/분</span></div>
            <div class="epc-vital"><span class="v-label">수축기BP</span><span class="v-val">${currentP.sort.systolicBP}</span></div>
            <div class="epc-vital"><span class="v-label">TRTS</span><span class="v-val">${trts}/12</span></div>
          </div>
          <div class="epc-injuries">
            ${currentP.injuries.map(inj => `<div class="epc-injury">• ${inj}</div>`).join('')}
          </div>
        </div>

        <div class="emergo-sort-buttons anim-in">
          <button class="etb t1" onclick="emergoSortAnswer('T1')">🔴 T1 (즉시)</button>
          <button class="etb t2" onclick="emergoSortAnswer('T2')">🟡 T2 (긴급)</button>
          <button class="etb t3" onclick="emergoSortAnswer('T3')">🟢 T3 (지연)</button>
        </div>

        <div class="emergo-hint">
          <details><summary>💡 Sort (TRTS) 힌트</summary><p>${phase.hint}</p></details>
        </div>
      </div>`;
  }
}

function emergoSortAnswer(answer) {
  const em = G.emergo;
  const activePatients = em.patients.filter(p => p.currentTriage !== 'black');
  const p = activePatients[em._sortIdx];
  const expected = sortCategory(p);
  p.sortCategory = answer;

  const isCorrect = answer === expected;
  if (isCorrect) { em._sortCorrect++; G.streak++; if (G.streak > G.maxStreak) G.maxStreak = G.streak; showImpact('#10b981'); }
  else { G.streak = 0; showImpact('#ef4444'); }
  G.totalCorrect++;
  checkAchievements();

  setTimeout(() => {
    em._sortIdx++;
    renderEmergoSort(em.scenario.phases[em.phaseIdx]);
  }, 600);
}

// ---- PHASE 2B: Treatment Assignment ----
function renderEmergoTreat(phase) {
  const em = G.emergo;
  const t1Patients = em.patients.filter(p => (p.sortCategory === 'T1' || p.currentTriage === 'red') && p.currentTriage !== 'black');
  const t2Patients = em.patients.filter(p => (p.sortCategory === 'T2' || p.currentTriage === 'yellow') && p.currentTriage !== 'black' && p.sortCategory !== 'T1');

  // Available resources for treatment
  const res = phase.availableResources;
  if (!em._treatAssignments) em._treatAssignments = {};
  if (!em._treatCurrent) em._treatCurrent = 0;

  const criticalPatients = [...t1Patients, ...t2Patients];
  const currentP = criticalPatients[em._treatCurrent];

  if (!currentP || em._treatCurrent >= criticalPatients.length) {
    // Treatment done → calculate and advance
    let treatScore = 0;
    criticalPatients.forEach(p => {
      const assigned = em._treatAssignments[p.id] || [];
      const needed = p.neededInterventions || [];
      const overlap = assigned.filter(a => needed.includes(a));
      const accuracy = needed.length > 0 ? overlap.length / needed.length : 0;
      p.treated = accuracy >= 0.5;
      p.treatMinute = em.gameMinute;
      if (p.treated) treatScore += 200;
    });
    addScore(treatScore + em._sortCorrect * 100);
    addXP(treatScore / 5 + em._sortCorrect * 20);
    em.phaseIdx++;
    em._sortIdx = 0; em._sortCorrect = 0; em._treatPhase = false;
    em._treatCurrent = 0; em._treatAssignments = {};
    showEmergoPhaseTransition();
    return;
  }

  const needed = currentP.neededInterventions || [];
  const available = needed.map(key => INTERVENTIONS[key]).filter(Boolean);
  // Also add some distractors
  const allKeys = Object.keys(INTERVENTIONS);
  const distractors = allKeys.filter(k => !needed.includes(k)).sort(() => Math.random()-0.5).slice(0,3);
  const options = [...needed, ...distractors].sort(() => Math.random()-0.5);

  const assigned = em._treatAssignments[currentP.id] || [];

  app.innerHTML = `
    <div class="screen emergo-play-screen">
      ${renderHUD('emergo_sort')}
      <div class="emergo-phase-bar">
        <span class="phase-icon">💊</span>
        <span class="phase-name">처치 배분</span>
        <span class="phase-progress">${em._treatCurrent + 1}/${criticalPatients.length}</span>
      </div>

      <div class="emergo-patient-card mini anim-in">
        <div class="epc-header">
          <span class="epc-icon">${currentP.icon}</span>
          <div class="epc-info">
            <strong>${currentP.name}</strong> — ${currentP.sortCategory || currentP.currentTriage?.toUpperCase()}
            <div class="epc-appearance">${currentP.injuries[0]}</div>
          </div>
          <div class="epc-timer-warn">
            ⏱ 미처치시 ${currentP.deterioration.untreatedMinutes}분 → ${currentP.deterioration.outcome === 'death' ? '💀 사망' : '⚠️ 악화'}
          </div>
        </div>
      </div>

      <div class="emergo-treat-grid anim-in">
        <p class="treat-instruction">필요한 처치를 선택하세요 (복수 선택):</p>
        <div class="treat-options">
          ${options.map(key => {
            const iv = INTERVENTIONS[key];
            if (!iv) return '';
            const isSelected = assigned.includes(key);
            return `<button class="treat-btn ${isSelected ? 'selected' : ''}" onclick="toggleEmergoTreat('${currentP.id}','${key}')">
              <span class="tb-icon">${iv.icon}</span>
              <span class="tb-name">${iv.name}</span>
              <span class="tb-time">${iv.timeIdeal}분</span>
            </button>`;
          }).join('')}
        </div>
      </div>

      <button class="btn-primary" style="margin-top:16px" onclick="confirmEmergoTreat()">확인 →</button>
    </div>`;
}

function toggleEmergoTreat(patientId, interventionKey) {
  const em = G.emergo;
  if (!em._treatAssignments[patientId]) em._treatAssignments[patientId] = [];
  const arr = em._treatAssignments[patientId];
  const idx = arr.indexOf(interventionKey);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(interventionKey);
  renderEmergoTreat(em.scenario.phases[em.phaseIdx]);
}

function confirmEmergoTreat() {
  const em = G.emergo;
  em._treatCurrent++;
  renderEmergoTreat(em.scenario.phases[em.phaseIdx]);
}

// ---- PHASE 3: Decontamination (CBRNE scenarios) ----
function renderEmergoDecontam(phase) {
  const em = G.emergo;
  const activePatients = em.patients.filter(p => p.currentTriage !== 'black');
  if (!em._deconQueue) {
    // Sort by severity — T1 first
    em._deconQueue = [...activePatients].sort((a, b) => {
      const order = { red: 0, yellow: 1, green: 2 };
      return (order[a.currentTriage] || 2) - (order[b.currentTriage] || 2);
    });
    em._deconDone = [];
    em._deconSlots = phase.decontamStations || 2;
  }

  const remaining = em._deconQueue.filter(p => !em._deconDone.includes(p.id));

  if (remaining.length === 0) {
    // All decontaminated
    addScore(em._deconDone.length * 100);
    addXP(em._deconDone.length * 15);
    em.phaseIdx++;
    em._deconQueue = null; em._deconDone = null;
    showEmergoPhaseTransition();
    return;
  }

  // Player picks priority order
  app.innerHTML = `
    <div class="screen emergo-play-screen">
      ${renderHUD('emergo_sort')}
      <div class="emergo-phase-bar">
        <span class="phase-icon">${phase.icon}</span>
        <span class="phase-name">${phase.name}</span>
        <span class="phase-progress">${em._deconDone.length}/${activePatients.length} 완료</span>
      </div>

      <div class="emergo-decon-info anim-in">
        <p>🚿 제독소 <strong>${em._deconSlots}</strong>개소 | 환자당 <strong>${phase.decontamTimePerPatient}분</strong> 소요</p>
        <p>다음 제독할 환자를 선택하세요 (중증 우선):</p>
      </div>

      <div class="emergo-decon-list anim-in">
        ${remaining.map(p => `
          <button class="decon-patient-btn" onclick="emergoDeconSelect('${p.id}')">
            <span class="dp-icon">${p.icon}</span>
            <span class="dp-name">${p.name}</span>
            <span class="dp-triage triage-${p.currentTriage}">${p.currentTriage?.toUpperCase()}</span>
            <span class="dp-injury">${p.injuries[0]}</span>
          </button>
        `).join('')}
      </div>
    </div>`;
}

function emergoDeconSelect(patientId) {
  const em = G.emergo;
  em._deconDone.push(patientId);
  em.gameMinute += (em.scenario.phases[em.phaseIdx].decontamTimePerPatient || 5);
  renderEmergoDecontam(em.scenario.phases[em.phaseIdx]);
}

// ---- PHASE: Transport Priority ----
function renderEmergoTransport(phase) {
  const em = G.emergo;
  const treatedPatients = em.patients.filter(p => p.currentTriage !== 'black' && p.currentTriage !== 'green');

  if (!em._transportOrder) em._transportOrder = [];
  if (!em._ambulancesAvail) em._ambulancesAvail = phase.ambulances || 3;

  const remaining = treatedPatients.filter(p => !em._transportOrder.includes(p.id));

  if (remaining.length === 0 || em._ambulancesAvail <= 0) {
    // Transport done
    let tScore = 0;
    em._transportOrder.forEach((pid, idx) => {
      const p = em.patients.find(pp => pp.id === pid);
      if (p) {
        p.transported = true;
        p.transportOrder = idx + 1;
        // Bonus for correct priority (T1 first)
        if (p.sortCategory === 'T1' && idx < 4) tScore += 200;
        else if (p.sortCategory === 'T2') tScore += 100;
      }
    });
    addScore(tScore);
    addXP(tScore / 5);
    em.phaseIdx++;
    em._transportOrder = null; em._ambulancesAvail = null;
    showEmergoPhaseTransition();
    return;
  }

  app.innerHTML = `
    <div class="screen emergo-play-screen">
      ${renderHUD('emergo_sort')}
      <div class="emergo-phase-bar">
        <span class="phase-icon">${phase.icon}</span>
        <span class="phase-name">${phase.name}</span>
        <span class="phase-progress">🚑 ${em._ambulancesAvail}대 남음</span>
      </div>

      <div class="emergo-transport-info anim-in">
        <p>이송 순서를 결정하세요. 구급차 <strong>${em._ambulancesAvail}</strong>대, 왕복 ${phase.transportTimeMin}-${phase.transportTimeMax}분</p>
        <p>이송 완료: ${em._transportOrder.length}명</p>
      </div>

      <div class="emergo-transport-list anim-in">
        ${remaining.map(p => `
          <button class="transport-patient-btn" onclick="emergoTransportSelect('${p.id}')">
            <span class="tp-icon">${p.icon}</span>
            <span class="tp-name">${p.name}</span>
            <span class="tp-triage triage-${p.currentTriage}">${p.sortCategory || p.currentTriage?.toUpperCase()}</span>
            <span class="tp-injury">${p.injuries[0]}</span>
            <span class="tp-urgency">⏱ ${p.deterioration.untreatedMinutes}분</span>
          </button>
        `).join('')}
      </div>
    </div>`;
}

function emergoTransportSelect(patientId) {
  const em = G.emergo;
  const phase = em.scenario.phases[em.phaseIdx];
  em._transportOrder.push(patientId);
  em._ambulancesAvail--;
  em.gameMinute += Math.round((phase.transportTimeMin + phase.transportTimeMax) / 2);

  // Return ambulance after round trip
  setTimeout(() => {
    if (em._ambulancesAvail !== null) em._ambulancesAvail++;
  }, 0);

  renderEmergoTransport(phase);
}

// ---- PHASE: ED Management ----
function renderEmergoED(phase) {
  const em = G.emergo;
  const arrivedPatients = em.patients.filter(p => p.transported);

  if (!em._edProcessed) em._edProcessed = [];
  const remaining = arrivedPatients.filter(p => !em._edProcessed.includes(p.id));

  if (remaining.length === 0) {
    // ED phase done
    addScore(em._edProcessed.length * 150);
    addXP(em._edProcessed.length * 25);
    em.phaseIdx++;
    showEmergoPhaseTransition();
    return;
  }

  const currentP = remaining[0];
  const edActions = [
    { key: 'stabilize', label: '안정화 처치', icon: '💉', desc: '수액/수혈/모니터링으로 안정화' },
    { key: 'surgery', label: '응급 수술', icon: '🔪', desc: `수술 소요: ${currentP.surgeryTime}분` },
    { key: 'icu', label: 'ICU 입원', icon: '🏥', desc: '중환자실 집중 치료' },
    { key: 'ward', label: '일반 병동', icon: '🛏️', desc: '일반 병동 관찰' },
    { key: 'observe', label: '경과 관찰', icon: '👁️', desc: '추가 검사 후 결정' }
  ];

  app.innerHTML = `
    <div class="screen emergo-play-screen">
      ${renderHUD('emergo_sort')}
      <div class="emergo-phase-bar">
        <span class="phase-icon">${phase.icon}</span>
        <span class="phase-name">${phase.name}</span>
        <span class="phase-progress">${em._edProcessed.length + 1}/${arrivedPatients.length}</span>
      </div>

      <div class="emergo-patient-card anim-in">
        <div class="epc-header">
          <span class="epc-icon">${currentP.icon}</span>
          <div class="epc-info">
            <strong>${currentP.name}</strong> — ${currentP.sortCategory}
            <div class="epc-appearance">${currentP.injuries.join(', ')}</div>
          </div>
        </div>
        <div class="epc-vitals sort-vitals">
          <div class="epc-vital"><span class="v-label">BP</span><span class="v-val">${currentP.sort.systolicBP}</span></div>
          <div class="epc-vital"><span class="v-label">GCS</span><span class="v-val">${currentP.sort.gcs}</span></div>
          <div class="epc-vital"><span class="v-label">수술필요</span><span class="v-val">${currentP.surgeryTime > 0 ? '예 ('+currentP.surgeryTime+'분)' : '아니오'}</span></div>
          <div class="epc-vital"><span class="v-label">ICU</span><span class="v-val">${currentP.icuRequired ? '필요' : '불필요'}</span></div>
        </div>
      </div>

      <div class="emergo-ed-actions anim-in">
        <p>이 환자에 대한 다음 조치를 선택하세요:</p>
        ${edActions.map(a => `
          <button class="ed-action-btn" onclick="emergoEdDecision('${currentP.id}','${a.key}')">
            <span class="ea-icon">${a.icon}</span>
            <div class="ea-info"><strong>${a.label}</strong><span>${a.desc}</span></div>
          </button>
        `).join('')}
      </div>
    </div>`;
}

function emergoEdDecision(patientId, action) {
  const em = G.emergo;
  const p = em.patients.find(pp => pp.id === patientId);
  if (!p) return;

  // Score based on appropriateness
  let bonus = 0;
  if (action === 'surgery' && p.surgeryTime > 0) bonus = 200;
  else if (action === 'icu' && p.icuRequired) bonus = 200;
  else if (action === 'stabilize' && p.sortCategory === 'T1') bonus = 150;
  else if (action === 'ward' && !p.icuRequired && p.surgeryTime === 0) bonus = 150;
  else if (action === 'observe' && p.sortCategory === 'T3') bonus = 100;
  else bonus = 50; // partial credit

  p.edStabilized = true;
  addScore(bonus);
  em._edProcessed.push(patientId);
  renderEmergoED(em.scenario.phases[em.phaseIdx]);
}

// ---- Phase Transition ----
function showEmergoPhaseTransition() {
  const em = G.emergo;
  if (!em || !em.scenario) { G.screen = 'modes'; render(); return; }

  // 모든 EMERGO 타이머 정지
  stopTimer('emergo_sieve');
  stopTimer('emergo_sort');

  const nextPhase = em.scenario.phases[em.phaseIdx];
  const prevPhase = em.scenario.phases[em.phaseIdx - 1];

  if (!nextPhase) {
    showEmergoFinalResults();
    return;
  }

  app.innerHTML = `
    <div class="screen emergo-transition-screen">
      <div class="emergo-phase-complete anim-in">
        <div class="epc-check">✅</div>
        <h2>${prevPhase?.name || ''} 완료!</h2>
      </div>
      <div class="emergo-next-phase anim-in">
        <div class="enp-icon">${nextPhase.icon}</div>
        <h3>다음: ${nextPhase.name}</h3>
        <p>${nextPhase.description}</p>
        ${nextPhase.availableResources ? `
          <div class="enp-resources">
            ${Object.entries(nextPhase.availableResources).map(([k, v]) => {
              const rt = RESOURCE_TYPES[k];
              return `<span class="enp-res">${rt ? rt.icon : ''} ${rt ? rt.name : k} ×${v}</span>`;
            }).join('')}
          </div>
        ` : ''}
      </div>
      <button class="btn-primary anim-in" onclick="renderEmergoPhase()">진행 →</button>
    </div>`;
}

// ---- Final Results ----
function showEmergoFinalResults() {
  const em = G.emergo;
  if (!em) { G.screen = 'modes'; render(); return; }

  // Stop all EMERGO timers
  stopTimer('emergo_sieve');
  stopTimer('emergo_sort');

  // Calculate preventable deaths
  let preventable = 0, totalDeaths = 0, survived = 0;
  em.patients.forEach(p => {
    if (!p.deterioration) { survived++; return; }
    if (p.deterioration.outcome === 'dead' || p.deterioration.treatedOutcome === 'dead') {
      totalDeaths++;
      return;
    }
    if (!p.treated && p.deterioration.outcome === 'death') {
      totalDeaths++;
      preventable++;
    } else {
      survived++;
    }
  });

  const totalPatients = em.patients.length;
  const survivalRate = Math.round((survived / totalPatients) * 100);
  const grade = preventable === 0 ? 'S' : preventable <= 1 ? 'A' : preventable <= 2 ? 'B' : 'C';

  // RPG integration
  G.modesCompleted.add('emergo');
  if (preventable === 0) G.emergoZeroPD = true;
  advanceStoryAct('emergo');
  addScore(preventable === 0 ? 2000 : 1000);
  addXP(300 - preventable * 50);
  checkAchievements();

  try { Tracker.endMode(survived); } catch(e) { console.warn('Tracker error:', e); }

  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  if (grade === 'S' || grade === 'A') { try { confetti(); } catch(e) {} }

  app.innerHTML = `
    <div class="screen emergo-results-screen">
      <div class="emergo-results-header anim-in">
        <div class="er-badge">🏥 EMERGO CHAIN 완료</div>
        <h2>${em.scenario.title}</h2>
      </div>

      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>

      <div class="emergo-result-stats anim-in">
        <div class="ers-card">
          <div class="ers-val">${survived}</div>
          <div class="ers-label">생존</div>
          <div class="ers-icon">💚</div>
        </div>
        <div class="ers-card death">
          <div class="ers-val">${totalDeaths}</div>
          <div class="ers-label">사망</div>
          <div class="ers-icon">💀</div>
        </div>
        <div class="ers-card ${preventable > 0 ? 'warn' : 'good'}">
          <div class="ers-val">${preventable}</div>
          <div class="ers-label">예방가능 사망</div>
          <div class="ers-icon">${preventable > 0 ? '⚠️' : '✅'}</div>
        </div>
        <div class="ers-card">
          <div class="ers-val">${survivalRate}%</div>
          <div class="ers-label">생존율</div>
          <div class="ers-icon">📊</div>
        </div>
      </div>

      <div class="emergo-patient-outcomes anim-in">
        <h3>환자별 결과</h3>
        <div class="epo-list">
          ${em.patients.map(p => {
            const det = p.deterioration || {};
            const isDead = det.outcome === 'dead' || det.treatedOutcome === 'dead' || (!p.treated && det.outcome === 'death');
            const icon = isDead ? '💀' : p.treated ? '💚' : '⚠️';
            return `<div class="epo-row ${isDead ? 'dead' : 'alive'}">
              <span>${p.icon || '👤'}</span>
              <span>${p.name || 'Unknown'}</span>
              <span class="epo-triage triage-${p.currentTriage || 'yellow'}">${(p.currentTriage || '?').toUpperCase()}</span>
              <span>${icon}</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="emergo-debrief anim-in">
        <h3>📋 디브리핑</h3>
        <div class="debrief-text">
          ${preventable === 0 ? '모든 구할 수 있는 환자를 살렸습니다. 현장에서 병원까지 완벽한 체인이었습니다.' :
            preventable === 1 ? '거의 완벽했습니다. 1명의 예방가능 사망이 있었습니다. 시간 관리나 이송 우선순위를 재점검하세요.' :
            `${preventable}명의 예방가능 사망이 발생했습니다. 중증 환자의 빠른 처치와 이송이 핵심입니다.`}
        </div>
      </div>

      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="G.screen='modes';render();">미션 선택 🏠</button>
        <button class="btn-outline" onclick="G.screen='emergoSelect';render();">다른 시나리오 🔄</button>
      </div>
    </div>`;

  G.screen = 'emergoResults';
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  render();
});

// ============================================
// NEW GAME MODES: CBRNE심화 / 전술의학 / 대테러의학
// ============================================

// ---- HELPER: flatten CBRNE questions ----
function getCBRNEFlatQuestions() {
  const content = window.CBRNE_CONTENT;
  if (!content) return [];
  return Object.values(content.questions).flat();
}

// ============================================
// CBRNE 심화 QUIZ
// ============================================
function renderCBRNEAdv() {
  const total = (G.advQ || []).length;
  const q = (G.advQ || [])[G.advIdx];
  if (!q || G.advIdx >= total) { showCBRNEAdvHub(); return; }

  const mentorLine = G.advIdx === 0
    ? 'CBRNE 5대 위협 전문 퀴즈다! 화학·생물·방사능·핵·폭발물 지식을 테스트한다.'
    : G.advAnswered ? '' : rnd(CHARS.mentor.hints);

  app.innerHTML = `
    ${renderHUD('advTimer')}
    <div class="screen quiz-game">
      ${G.advIdx === 0 ? charBubble('mentor', mentorLine) : ''}
      <div class="quiz-progress-bar">
        <span class="quiz-pbar-num">${G.advIdx + 1}/${total}</span>
        <div class="pbar-track"><div class="pbar-fill" style="width:${(G.advIdx / total) * 100}%"></div></div>
      </div>
      <div class="quiz-q-card anim-in">
        ${q.category ? `<div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:6px">☣️ ${q.category.toUpperCase()}</div>` : ''}
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">
          ${q.o.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let cls = '';
            if (G.advAnswered) {
              if (i === q.a) cls = 'correct';
              else if (i === G._advSelected && i !== q.a) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerCBRNEAdv(${i})" ${G.advAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.advAnswered ? `
          <div class="quiz-explanation">${q.exp || ''}</div>
          <button class="quiz-next-btn" onclick="nextCBRNEAdv()">다음 문제 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.advAnswered) {
    startCountdown('advTimer', 20 + getTimerBonus('cbrneAdv'), updateTimerDisplay, () => {
      G.advAnswered = true;
      G._advSelected = -1;
      updateStreak(false);
      sfx('wrong');
      shakeScreen();
      render();
    });
  }
}

function answerCBRNEAdv(idx) {
  if (G.advAnswered) return;
  G.advAnswered = true;
  G._advSelected = idx;
  stopTimer('advTimer');

  const q = G.advQ[G.advIdx];
  const correct = idx === q.a;

  Tracker.recordAnswer(`cbrneAdv_${G.advIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    const timeBonus = Math.max(0, G.advTimer * 5);
    addScore(100 + timeBonus);
    addXP(25);
    G.advScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-10);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextCBRNEAdv() {
  G.advIdx++;
  G.advAnswered = false;
  G._advSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showCBRNEAdvHub() {
  stopTimer('advTimer');
  G.modesCompleted.add('cbrneAdv');
  const total = (G.advQ || []).length;
  const pct = Math.round(((G.advScore || 0) / Math.max(total, 1)) * 100);
  if (pct === 100 && total > 0) G.perfectModes++;
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  Tracker.endMode(G.advScore || 0);
  checkAchievements();
  advanceStoryAct();
  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', grade === 'S' || grade === 'A' ? '적보식별! CBRNE 전문가다!' : '기초를 다지고 다시 도전해바!', { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">☣️</div>
      <div class="result-sub">CBRNE 심화 퀴즈 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.advScore || 0}/${total}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.maxStreak}</div><div class="lbl">최대 연속</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="enterMode('cbrneAdv')">🔄 퀴즈 재도전</button>
        <button class="btn-outline" onclick="startCBRNEAdvScenario()">📖 시나리오 모드</button>
        <button class="btn-outline" onclick="startCBRNEAdvBoss()">👹 보스전</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

function startCBRNEAdvScenario() {
  const content = window.CBRNE_CONTENT;
  if (!content || !content.scenarios || content.scenarios.length === 0) {
    alert('CBRNE 시나리오를 읽을 수 없습니다.'); return;
  }
  G.advScenIdx = 0;
  G.advScenStepIdx = 0;
  G.advScenScore = 0;
  G.advScenAnswered = false;
  G.screen = 'cbrneAdvScenario';
  Tracker.startMode('cbrneAdvScenario');
  render();
}

function startCBRNEAdvBoss() {
  const content = window.CBRNE_CONTENT;
  if (!content || !content.bossBattles || content.bossBattles.length === 0) {
    alert('CBRNE 보스를 로드할 수 없습니다.'); return;
  }
  const boss = content.bossBattles[Math.floor(Math.random() * content.bossBattles.length)];
  // Flatten all phase questions into a single pool
  const phaseQs = boss.phases.flatMap(ph => {
    // Phase questions can be objects with q/o/a/exp or questionIds (references)
    if (ph.questions && Array.isArray(ph.questions)) return ph.questions;
    if (ph.questionIds && Array.isArray(ph.questionIds)) {
      return ph.questionIds.map(id => content.getQuestionById ? content.getQuestionById(id) : null).filter(Boolean);
    }
    return [];
  });
  G.advBoss = boss;
  G.advBossQ = phaseQs.length > 0 ? phaseQs.slice(0, 10) : [];
  G.advBossIdx = 0;
  G.advBossHp = boss.maxHp;
  G.advBossPlayerHp = 100;
  G.advBossScore = 0;
  G.screen = 'cbrneAdvBoss';
  Tracker.startMode('cbrneAdvBoss');
  render();
}

// ============================================
// CBRNE 심화 시나리오
// ============================================
function renderCBRNEAdvScenario() {
  const content = window.CBRNE_CONTENT;
  if (!content) { G.screen = 'modes'; render(); return; }
  const scenarios = content.scenarios;
  if (!scenarios || scenarios.length === 0) { G.screen = 'modes'; render(); return; }
  if (G.advScenIdx >= scenarios.length) { showCBRNEAdvScenarioResults(); return; }

  const sc = scenarios[G.advScenIdx];
  const steps = sc.steps || [];
  if (G.advScenStepIdx >= steps.length) {
    G.advScenIdx++;
    G.advScenStepIdx = 0;
    G.advScenAnswered = false;
    if (G.advScenIdx >= scenarios.length) { showCBRNEAdvScenarioResults(); return; }
    render(); return;
  }

  const step = steps[G.advScenStepIdx];

  app.innerHTML = `
    ${renderHUD('advScenTimer')}
    <div class="screen quiz-game">
      ${narrativePanel(`📍 <strong>${sc.title}</strong><br>단계 ${G.advScenStepIdx + 1}/${steps.length}`, { type: 'danger', tag: 'CBRNE 시나리오', tagClass: 'emergency', icon: '☣️' })}
      <div class="quiz-q-card anim-in" style="margin-top:12px">
        <div class="quiz-q-text" style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">${step.narrative || ''}</div>
        <div class="quiz-q-text"><strong>${step.question || ''}</strong></div>
        <div class="quiz-opts">
          ${(step.options || []).map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let cls = '';
            if (G.advScenAnswered) {
              if (opt.correct) cls = 'correct';
              else if (i === G._advScenSelected && !opt.correct) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerCBRNEAdvScenario(${i})" ${G.advScenAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt.text}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.advScenAnswered ? `
          <div class="quiz-explanation">${(step.options[G._advScenSelected] || {}).feedback || ''}</div>
          <button class="quiz-next-btn" onclick="nextCBRNEAdvScenario()">다음 단계 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.advScenAnswered) {
    startCountdown('advScenTimer', 30, updateTimerDisplay, () => {
      G.advScenAnswered = true;
      G._advScenSelected = -1;
      updateStreak(false);
      sfx('wrong');
      render();
    });
  }
}

function answerCBRNEAdvScenario(idx) {
  if (G.advScenAnswered) return;
  G.advScenAnswered = true;
  G._advScenSelected = idx;
  stopTimer('advScenTimer');

  const sc = window.CBRNE_CONTENT.scenarios[G.advScenIdx];
  const step = sc.steps[G.advScenStepIdx];
  const opt = step.options[idx];
  const correct = opt && opt.correct;

  Tracker.recordAnswer(`cbrneAdvScen_${G.advScenIdx}_${G.advScenStepIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(150);
    addXP(step.xp || 40);
    G.advScenScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-20);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextCBRNEAdvScenario() {
  G.advScenStepIdx++;
  G.advScenAnswered = false;
  G._advScenSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showCBRNEAdvScenarioResults() {
  stopTimer('advScenTimer');
  G.modesCompleted.add('cbrneAdvScenario');
  const scenarios = window.CBRNE_CONTENT.scenarios;
  const totalSteps = scenarios.reduce((sum, sc) => sum + (sc.steps || []).length, 0);
  const pct = Math.round(((G.advScenScore || 0) / Math.max(totalSteps, 1)) * 100);
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  Tracker.endMode(G.advScenScore || 0);
  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', grade === 'S' || grade === 'A' ? 'CBRNE 현장 대응을 완벽히 수행했다!' : '시나리오를 다시 통해 팀장을 벌쳐교!', { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">📖</div>
      <div class="result-sub">CBRNE 시나리오 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.advScenScore || 0}/${totalSteps}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.score}</div><div class="lbl">총점</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="startCBRNEAdvScenario()">🔄 시나리오 재도전</button>
        <button class="btn-outline" onclick="startCBRNEAdvBoss()">👹 보스전</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

// ============================================
// CBRNE 심화 보스전
// ============================================
function renderCBRNEAdvBoss() {
  const boss = G.advBoss;
  if (!boss) { G.screen = 'cbrneAdv'; render(); return; }
  const q = (G.advBossQ || [])[G.advBossIdx];
  if (!q || G.advBossIdx >= (G.advBossQ || []).length) { showCBRNEAdvBossResults(); return; }

  const hpPct = Math.round(((G.advBossHp || 0) / (boss.maxHp || 100)) * 100);
  const playerHpPct = G.advBossPlayerHp || 0;

  app.innerHTML = `
    ${renderHUD('advBossTimer')}
    <div class="screen quiz-game">
      <div class="boss-banner heartbeat-effect" style="background:linear-gradient(135deg,#1a0a0a,#2d0a0a)">
        <h2>${boss.emoji || '👹'} ${boss.name}</h2>
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:8px">
          <span style="font-size:0.8rem;color:var(--text-muted)">보스 HP</span>
          <div style="flex:1;background:#333;border-radius:4px;height:10px;max-width:200px">
            <div style="width:${hpPct}%;background:var(--red);height:10px;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.85rem;color:var(--red)">${G.advBossHp}/${boss.maxHp}</span>
        </div>
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:4px">
          <span style="font-size:0.8rem;color:var(--text-muted)">내 HP</span>
          <div style="flex:1;background:#333;border-radius:4px;height:8px;max-width:200px">
            <div style="width:${playerHpPct}%;background:var(--green);height:8px;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.85rem;color:var(--green)">${playerHpPct}</span>
        </div>
        <p style="font-size:0.75rem;margin-top:4px">문제 ${G.advBossIdx + 1} / ${(G.advBossQ || []).length}</p>
      </div>
      ${charBubble('villain', rnd(CHARS.villain.taunts), { right: true, urgent: true, expression: '👿', delay: 0 })}
      <div class="quiz-q-card anim-in">
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">
          ${(q.o || []).map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return `<button class="q-opt" onclick="answerCBRNEAdvBoss(${i})">
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>`;

  showDangerPulse(true);
  startCountdown('advBossTimer', 15, updateTimerDisplay, () => {
    sfx('wrong');
    shakeScreen();
    updateStreak(false);
    G.advBossPlayerHp = Math.max(0, (G.advBossPlayerHp || 100) - 20);
    G.advBossIdx++;
    if (G.advBossPlayerHp <= 0) { showCBRNEAdvBossResults(); return; }
    render();
  });
}

function answerCBRNEAdvBoss(idx) {
  stopTimer('advBossTimer');
  const q = G.advBossQ[G.advBossIdx];
  const correct = idx === q.a;

  Tracker.recordAnswer(`cbrneAdvBoss_${G.advBossIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    showImpact('green');
    addScore(250);
    addXP(60);
    G.advBossScore++;
    updateStreak(true);
    G.totalCorrect++;
    const dmg = Math.floor((G.advBoss.maxHp || 100) / Math.max((G.advBossQ || []).length, 1));
    G.advBossHp = Math.max(0, (G.advBossHp || 0) - dmg);
  } else {
    sfx('wrong');
    shakeScreen();
    showImpact();
    addScore(-50);
    updateStreak(false);
    G.advBossPlayerHp = Math.max(0, (G.advBossPlayerHp || 100) - 15);
  }
  checkAchievements();
  showSpeedLines();

  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '🏆' : '💀'}</div>
      <h2>${correct ? '보스에 피해!' : '보스 반격!'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${correct ? CHARS.mentor.emoji : CHARS.villain.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${correct ? CHARS.mentor.name : CHARS.villain.name}:</strong>
          ${correct ? rnd(CHARS.mentor.correct) : '이력으로는 부족하다...'}
          ${q.exp ? `<br><br>${q.exp}` : ''}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+250' : '-50'}</div>
      <button class="fb-next" onclick="nextCBRNEAdvBoss()">다음 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextCBRNEAdvBoss() {
  document.querySelector('.feedback-layer')?.remove();
  G.advBossIdx++;
  if (G.advBossPlayerHp <= 0 || G.advBossHp <= 0) { showCBRNEAdvBossResults(); return; }
  Tracker.startQuestion();
  render();
}

function showCBRNEAdvBossResults() {
  showDangerPulse(false);
  stopTimer('advBossTimer');
  const total = (G.advBossQ || []).length;
  const pct = Math.round(((G.advBossScore || 0) / Math.max(total, 1)) * 100);
  const win = (G.advBossHp || 0) <= 0 || pct >= 70;
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  G.bossGrade = grade;
  Tracker.endMode(G.advBossScore || 0);
  checkAchievements();
  if (win) { confetti(); addXP(300); addScore(500); }

  app.innerHTML = `
    <div class="screen results-screen">
      <div class="result-big anim-in">${win ? '🏆' : '💀'}</div>
      <div class="result-sub">${win ? G.advBoss.name + ' 토볌!' : '보스에게 패배...'}</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      ${win && G.advBoss.reward ? `<div class="quiz-explanation" style="margin:12px 0">🏅 보상: ${G.advBoss.reward.title || ''} +${G.advBoss.reward.xp || 0} XP</div>` : ''}
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.advBossScore || 0}/${total}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.advBossHp}</div><div class="lbl">보스 남은 HP</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="startCBRNEAdvBoss()">🔄 보스 재도전</button>
        <button class="btn-outline" onclick="enterMode('cbrneAdv')">☣️ CBRNE 퀴즈</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

// ============================================
// 전술의학 QUIZ
// ============================================
function renderTactical() {
  const total = (G.tacQ || []).length;
  const q = (G.tacQ || [])[G.tacIdx];
  if (!q || G.tacIdx >= total) { showTacticalHub(); return; }

  const mentorLine = G.tacIdx === 0
    ? 'TCCC/TECC 전술 현장 응급의료 실력을 테스트한다! MARCH 프로토콜과 전술 대응을 직접 적용하라!'
    : G.tacAnswered ? '' : rnd(CHARS.mentor.hints);

  app.innerHTML = `
    ${renderHUD('tacTimer')}
    <div class="screen quiz-game">
      ${G.tacIdx === 0 ? charBubble('mentor', mentorLine) : ''}
      <div class="quiz-progress-bar">
        <span class="quiz-pbar-num">${G.tacIdx + 1}/${total}</span>
        <div class="pbar-track"><div class="pbar-fill" style="width:${(G.tacIdx / total) * 100}%"></div></div>
      </div>
      <div class="quiz-q-card anim-in">
        ${q.category ? `<div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:6px">🎯 ${q.category.toUpperCase()}</div>` : ''}
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">
          ${(q.o || []).map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let cls = '';
            if (G.tacAnswered) {
              if (i === q.a) cls = 'correct';
              else if (i === G._tacSelected && i !== q.a) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerTactical(${i})" ${G.tacAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.tacAnswered ? `
          <div class="quiz-explanation">${q.exp || ''}</div>
          <button class="quiz-next-btn" onclick="nextTactical()">다음 문제 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.tacAnswered) {
    startCountdown('tacTimer', 20 + getTimerBonus('tactical'), updateTimerDisplay, () => {
      G.tacAnswered = true;
      G._tacSelected = -1;
      updateStreak(false);
      sfx('wrong');
      shakeScreen();
      render();
    });
  }
}

function answerTactical(idx) {
  if (G.tacAnswered) return;
  G.tacAnswered = true;
  G._tacSelected = idx;
  stopTimer('tacTimer');

  const q = G.tacQ[G.tacIdx];
  const correct = idx === q.a;

  Tracker.recordAnswer(`tactical_q_${G.tacIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    const timeBonus = Math.max(0, G.tacTimer * 5);
    addScore(100 + timeBonus);
    addXP(25);
    G.tacScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-10);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextTactical() {
  G.tacIdx++;
  G.tacAnswered = false;
  G._tacSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showTacticalHub() {
  stopTimer('tacTimer');
  G.modesCompleted.add('tactical');
  const total = (G.tacQ || []).length;
  const pct = Math.round(((G.tacScore || 0) / Math.max(total, 1)) * 100);
  if (pct === 100 && total > 0) G.perfectModes++;
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  Tracker.endMode(G.tacScore || 0);
  checkAchievements();
  advanceStoryAct();
  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', grade === 'S' || grade === 'A' ? '전술 현장의 에이스! TCCC 마스터!' : '기초를 다지고 다시 도전해바!', { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">🎯</div>
      <div class="result-sub">전술의학 퀴즈 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.tacScore || 0}/${total}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.maxStreak}</div><div class="lbl">최대 연속</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="enterMode('tactical')">🔄 퀴즈 재도전</button>
        <button class="btn-outline" onclick="startTacticalScenario()">📖 시나리오 모드</button>
        <button class="btn-outline" onclick="startTacticalBoss()">👹 보스전</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

function startTacticalScenario() {
  const content = window.TACTICAL_CTM_CONTENT;
  if (!content || !content.tacticalScenarios || content.tacticalScenarios.length === 0) {
    alert('전술의학 시나리오를 로드할 수 없습니다.'); return;
  }
  G.tacScenIdx = 0;
  G.tacScenStepIdx = 0;
  G.tacScenScore = 0;
  G.tacScenAnswered = false;
  G.screen = 'tacticalScenario';
  Tracker.startMode('tacticalScenario');
  render();
}

function startTacticalBoss() {
  const content = window.TACTICAL_CTM_CONTENT;
  if (!content || !content.bossBattles || content.bossBattles.length === 0) {
    alert('전술 보스를 로드할 수 없습니다.'); return;
  }
  const tacticalBosses = content.bossBattles.filter(b => b.category === 'tactical');
  const bossPool = tacticalBosses.length > 0 ? tacticalBosses : content.bossBattles;
  const boss = bossPool[Math.floor(Math.random() * bossPool.length)];
  const phaseQs = boss.phases.flatMap(ph => ph.questions || []);
  G.tacBoss = boss;
  G.tacBossQ = phaseQs.slice(0, 10);
  G.tacBossIdx = 0;
  G.tacBossHp = boss.maxHp;
  G.tacBossPlayerHp = 100;
  G.tacBossScore = 0;
  G.screen = 'tacticalBoss';
  Tracker.startMode('tacticalBoss');
  render();
}

// ============================================
// 전술의학 시나리오
// ============================================
function renderTacticalScenario() {
  const content = window.TACTICAL_CTM_CONTENT;
  if (!content) { G.screen = 'modes'; render(); return; }
  const scenarios = content.tacticalScenarios;
  if (!scenarios || scenarios.length === 0) { G.screen = 'modes'; render(); return; }
  if (G.tacScenIdx >= scenarios.length) { showTacticalScenarioResults(); return; }

  const sc = scenarios[G.tacScenIdx];
  const steps = sc.steps || [];
  if (G.tacScenStepIdx >= steps.length) {
    G.tacScenIdx++;
    G.tacScenStepIdx = 0;
    G.tacScenAnswered = false;
    if (G.tacScenIdx >= scenarios.length) { showTacticalScenarioResults(); return; }
    render(); return;
  }

  const step = steps[G.tacScenStepIdx];
  const choices = step.choices || step.options || [];

  app.innerHTML = `
    ${renderHUD('tacScenTimer')}
    <div class="screen quiz-game">
      ${narrativePanel(`🎯 <strong>${sc.title}</strong><br>단계 ${G.tacScenStepIdx + 1}/${steps.length}`, { type: 'danger', tag: '전술의학 시나리오', tagClass: 'emergency', icon: '🎯' })}
      <div class="quiz-q-card anim-in" style="margin-top:12px">
        <div class="quiz-q-text" style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">${step.situation || step.narrative || ''}</div>
        <div class="quiz-q-text"><strong>${step.question || ''}</strong></div>
        <div class="quiz-opts">
          ${choices.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const optText = opt.text || '';
            const isCorrect = (opt.correct === true) || (typeof step.correctChoice !== 'undefined' && i === step.correctChoice) || (opt.outcome === 'good');
            let cls = '';
            if (G.tacScenAnswered) {
              if (isCorrect) cls = 'correct';
              else if (i === G._tacScenSelected && !isCorrect) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerTacticalScenario(${i})" ${G.tacScenAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${optText}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.tacScenAnswered ? `
          <div class="quiz-explanation">${(choices[G._tacScenSelected] || {}).feedback || ''}</div>
          ${step.medicalInfo ? `<div class="quiz-explanation" style="border-left-color:var(--blue)">💡 ${step.medicalInfo}</div>` : ''}
          <button class="quiz-next-btn" onclick="nextTacticalScenario()">다음 단계 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.tacScenAnswered) {
    startCountdown('tacScenTimer', 30, updateTimerDisplay, () => {
      G.tacScenAnswered = true;
      G._tacScenSelected = -1;
      updateStreak(false);
      sfx('wrong');
      render();
    });
  }
}

function answerTacticalScenario(idx) {
  if (G.tacScenAnswered) return;
  G.tacScenAnswered = true;
  G._tacScenSelected = idx;
  stopTimer('tacScenTimer');

  const sc = window.TACTICAL_CTM_CONTENT.tacticalScenarios[G.tacScenIdx];
  const step = sc.steps[G.tacScenStepIdx];
  const choices = step.choices || step.options || [];
  const opt = choices[idx];
  const correct = opt && (opt.correct === true || (typeof step.correctChoice !== 'undefined' && idx === step.correctChoice) || opt.outcome === 'good');

  Tracker.recordAnswer(`tacScen_${G.tacScenIdx}_${G.tacScenStepIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(150);
    addXP(40);
    G.tacScenScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-20);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextTacticalScenario() {
  G.tacScenStepIdx++;
  G.tacScenAnswered = false;
  G._tacScenSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showTacticalScenarioResults() {
  stopTimer('tacScenTimer');
  G.modesCompleted.add('tacticalScenario');
  const scenarios = window.TACTICAL_CTM_CONTENT.tacticalScenarios;
  const totalSteps = scenarios.reduce((sum, sc) => sum + (sc.steps || []).length, 0);
  const pct = Math.round(((G.tacScenScore || 0) / Math.max(totalSteps, 1)) * 100);
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  Tracker.endMode(G.tacScenScore || 0);
  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', grade === 'S' || grade === 'A' ? '전술 현장을 완밤하게 장악했다!' : '마음을 다지고 다시 도전해바!', { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">📖</div>
      <div class="result-sub">전술의학 시나리오 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.tacScenScore || 0}/${totalSteps}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.score}</div><div class="lbl">총점</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="startTacticalScenario()">🔄 시나리오 재도전</button>
        <button class="btn-outline" onclick="startTacticalBoss()">👹 보스전</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

// ============================================
// 전술의학 보스전
// ============================================
function renderTacticalBoss() {
  const boss = G.tacBoss;
  if (!boss) { G.screen = 'tactical'; render(); return; }
  const q = (G.tacBossQ || [])[G.tacBossIdx];
  if (!q || G.tacBossIdx >= (G.tacBossQ || []).length) { showTacticalBossResults(); return; }

  const hpPct = Math.round(((G.tacBossHp || 0) / (boss.maxHp || 100)) * 100);
  const playerHpPct = G.tacBossPlayerHp || 0;

  app.innerHTML = `
    ${renderHUD('tacBossTimer')}
    <div class="screen quiz-game">
      <div class="boss-banner heartbeat-effect" style="background:linear-gradient(135deg,#0a1a0a,#0a2d0a)">
        <h2>${boss.emoji || '🎯'} ${boss.name}</h2>
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:8px">
          <span style="font-size:0.8rem;color:var(--text-muted)">보스 HP</span>
          <div style="flex:1;background:#333;border-radius:4px;height:10px;max-width:200px">
            <div style="width:${hpPct}%;background:var(--red);height:10px;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.85rem;color:var(--red)">${G.tacBossHp}/${boss.maxHp}</span>
        </div>
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:4px">
          <span style="font-size:0.8rem;color:var(--text-muted)">내 HP</span>
          <div style="flex:1;background:#333;border-radius:4px;height:8px;max-width:200px">
            <div style="width:${playerHpPct}%;background:var(--green);height:8px;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.85rem;color:var(--green)">${playerHpPct}</span>
        </div>
        <p style="font-size:0.75rem;margin-top:4px">문제 ${G.tacBossIdx + 1} / ${(G.tacBossQ || []).length}</p>
      </div>
      ${charBubble('villain', rnd(CHARS.villain.taunts), { right: true, urgent: true, expression: '👿', delay: 0 })}
      <div class="quiz-q-card anim-in">
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">
          ${(q.o || []).map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return `<button class="q-opt" onclick="answerTacticalBoss(${i})">
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>`;

  showDangerPulse(true);
  startCountdown('tacBossTimer', 15, updateTimerDisplay, () => {
    sfx('wrong');
    shakeScreen();
    updateStreak(false);
    G.tacBossPlayerHp = Math.max(0, (G.tacBossPlayerHp || 100) - 20);
    G.tacBossIdx++;
    if (G.tacBossPlayerHp <= 0) { showTacticalBossResults(); return; }
    render();
  });
}

function answerTacticalBoss(idx) {
  stopTimer('tacBossTimer');
  const q = G.tacBossQ[G.tacBossIdx];
  const correct = idx === q.a;

  Tracker.recordAnswer(`tacBoss_${G.tacBossIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    showImpact('green');
    addScore(250);
    addXP(60);
    G.tacBossScore++;
    updateStreak(true);
    G.totalCorrect++;
    const dmg = Math.floor((G.tacBoss.maxHp || 100) / Math.max((G.tacBossQ || []).length, 1));
    G.tacBossHp = Math.max(0, (G.tacBossHp || 0) - dmg);
  } else {
    sfx('wrong');
    shakeScreen();
    showImpact();
    addScore(-50);
    updateStreak(false);
    G.tacBossPlayerHp = Math.max(0, (G.tacBossPlayerHp || 100) - 15);
  }
  checkAchievements();
  showSpeedLines();

  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '🏆' : '💀'}</div>
      <h2>${correct ? '보스에 피해!' : '보스 반격!'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${correct ? CHARS.mentor.emoji : CHARS.villain.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${correct ? CHARS.mentor.name : CHARS.villain.name}:</strong>
          ${correct ? rnd(CHARS.mentor.correct) : '이력으로는 부족하다...'}
          ${q.exp ? `<br><br>${q.exp}` : ''}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+250' : '-50'}</div>
      <button class="fb-next" onclick="nextTacticalBoss()">다음 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextTacticalBoss() {
  document.querySelector('.feedback-layer')?.remove();
  G.tacBossIdx++;
  if (G.tacBossPlayerHp <= 0 || G.tacBossHp <= 0) { showTacticalBossResults(); return; }
  Tracker.startQuestion();
  render();
}

function showTacticalBossResults() {
  showDangerPulse(false);
  stopTimer('tacBossTimer');
  const total = (G.tacBossQ || []).length;
  const pct = Math.round(((G.tacBossScore || 0) / Math.max(total, 1)) * 100);
  const win = (G.tacBossHp || 0) <= 0 || pct >= 70;
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  G.bossGrade = grade;
  Tracker.endMode(G.tacBossScore || 0);
  checkAchievements();
  if (win) { confetti(); addXP(300); addScore(500); }

  app.innerHTML = `
    <div class="screen results-screen">
      <div class="result-big anim-in">${win ? '🏆' : '💀'}</div>
      <div class="result-sub">${win ? G.tacBoss.name + ' 토볌!' : '보스에게 패배...'}</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      ${win && G.tacBoss.reward ? `<div class="quiz-explanation" style="margin:12px 0">🏅 보상: ${G.tacBoss.reward.badge || ''}</div>` : ''}
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.tacBossScore || 0}/${total}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.tacBossHp}</div><div class="lbl">보스 남은 HP</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="startTacticalBoss()">🔄 보스 재도전</button>
        <button class="btn-outline" onclick="enterMode('tactical')">🎯 전술의학 퀴즈</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

// ============================================
// 대테러의학 QUIZ
// ============================================
function renderCTM() {
  const total = (G.ctmQ || []).length;
  const q = (G.ctmQ || [])[G.ctmIdx];
  if (!q || G.ctmIdx >= total) { showCTMHub(); return; }

  const mentorLine = G.ctmIdx === 0
    ? '대테러 의학(CTM) 전문 퀴즈다! 테러 위협 식별, CBRN 대응, 호스피털 보호까지 전부 적용하라!'
    : G.ctmAnswered ? '' : rnd(CHARS.mentor.hints);

  app.innerHTML = `
    ${renderHUD('ctmTimer')}
    <div class="screen quiz-game">
      ${G.ctmIdx === 0 ? charBubble('mentor', mentorLine) : ''}
      <div class="quiz-progress-bar">
        <span class="quiz-pbar-num">${G.ctmIdx + 1}/${total}</span>
        <div class="pbar-track"><div class="pbar-fill" style="width:${(G.ctmIdx / total) * 100}%"></div></div>
      </div>
      <div class="quiz-q-card anim-in">
        ${q.category ? `<div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:6px">🛡️ ${q.category.toUpperCase()}</div>` : ''}
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">
          ${(q.o || []).map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let cls = '';
            if (G.ctmAnswered) {
              if (i === q.a) cls = 'correct';
              else if (i === G._ctmSelected && i !== q.a) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerCTM(${i})" ${G.ctmAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.ctmAnswered ? `
          <div class="quiz-explanation">${q.exp || ''}</div>
          <button class="quiz-next-btn" onclick="nextCTM()">다음 문제 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.ctmAnswered) {
    startCountdown('ctmTimer', 20 + getTimerBonus('ctm'), updateTimerDisplay, () => {
      G.ctmAnswered = true;
      G._ctmSelected = -1;
      updateStreak(false);
      sfx('wrong');
      shakeScreen();
      render();
    });
  }
}

function answerCTM(idx) {
  if (G.ctmAnswered) return;
  G.ctmAnswered = true;
  G._ctmSelected = idx;
  stopTimer('ctmTimer');

  const q = G.ctmQ[G.ctmIdx];
  const correct = idx === q.a;

  Tracker.recordAnswer(`ctm_q_${G.ctmIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    const timeBonus = Math.max(0, G.ctmTimer * 5);
    addScore(100 + timeBonus);
    addXP(25);
    G.ctmScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-10);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextCTM() {
  G.ctmIdx++;
  G.ctmAnswered = false;
  G._ctmSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showCTMHub() {
  stopTimer('ctmTimer');
  G.modesCompleted.add('ctm');
  const total = (G.ctmQ || []).length;
  const pct = Math.round(((G.ctmScore || 0) / Math.max(total, 1)) * 100);
  if (pct === 100 && total > 0) G.perfectModes++;
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  Tracker.endMode(G.ctmScore || 0);
  checkAchievements();
  advanceStoryAct();
  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', grade === 'S' || grade === 'A' ? '대테러의학 전문가다! 탁월하다!' : '기초를 다지고 다시 도전해바!', { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">🛡️</div>
      <div class="result-sub">대테러의학 퀴즈 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.ctmScore || 0}/${total}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.maxStreak}</div><div class="lbl">최대 연속</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="enterMode('ctm')">🔄 퀴즈 재도전</button>
        <button class="btn-outline" onclick="startCTMScenario()">📖 시나리오 모드</button>
        <button class="btn-outline" onclick="startCTMBoss()">👹 보스전</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

function startCTMScenario() {
  const content = window.TACTICAL_CTM_CONTENT;
  if (!content || !content.ctmScenarios || content.ctmScenarios.length === 0) {
    alert('대테러의학 시나리오를 로드할 수 없습니다.'); return;
  }
  G.ctmScenIdx = 0;
  G.ctmScenStepIdx = 0;
  G.ctmScenScore = 0;
  G.ctmScenAnswered = false;
  G.screen = 'ctmScenario';
  Tracker.startMode('ctmScenario');
  render();
}

function startCTMBoss() {
  const content = window.TACTICAL_CTM_CONTENT;
  if (!content || !content.bossBattles || content.bossBattles.length === 0) {
    alert('CTM 보스를 로드할 수 없습니다.'); return;
  }
  const ctmBosses = content.bossBattles.filter(b => b.category === 'ctm' || b.category === 'counter_terrorism');
  const bossPool = ctmBosses.length > 0 ? ctmBosses : content.bossBattles;
  const boss = bossPool[Math.floor(Math.random() * bossPool.length)];
  const phaseQs = boss.phases.flatMap(ph => ph.questions || []);
  G.ctmBoss = boss;
  G.ctmBossQ = phaseQs.slice(0, 10);
  G.ctmBossIdx = 0;
  G.ctmBossHp = boss.maxHp;
  G.ctmBossPlayerHp = 100;
  G.ctmBossScore = 0;
  G.screen = 'ctmBoss';
  Tracker.startMode('ctmBoss');
  render();
}

// ============================================
// 대테러의학 시나리오
// ============================================
function renderCTMScenario() {
  const content = window.TACTICAL_CTM_CONTENT;
  if (!content) { G.screen = 'modes'; render(); return; }
  const scenarios = content.ctmScenarios;
  if (!scenarios || scenarios.length === 0) { G.screen = 'modes'; render(); return; }
  if (G.ctmScenIdx >= scenarios.length) { showCTMScenarioResults(); return; }

  const sc = scenarios[G.ctmScenIdx];
  const steps = sc.steps || [];
  if (G.ctmScenStepIdx >= steps.length) {
    G.ctmScenIdx++;
    G.ctmScenStepIdx = 0;
    G.ctmScenAnswered = false;
    if (G.ctmScenIdx >= scenarios.length) { showCTMScenarioResults(); return; }
    render(); return;
  }

  const step = steps[G.ctmScenStepIdx];
  const choices = step.choices || step.options || [];

  app.innerHTML = `
    ${renderHUD('ctmScenTimer')}
    <div class="screen quiz-game">
      ${narrativePanel(`🛡️ <strong>${sc.title}</strong><br>단계 ${G.ctmScenStepIdx + 1}/${steps.length}`, { type: 'danger', tag: '대테러의학 시나리오', tagClass: 'emergency', icon: '🛡️' })}
      <div class="quiz-q-card anim-in" style="margin-top:12px">
        <div class="quiz-q-text" style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">${step.situation || step.narrative || ''}</div>
        <div class="quiz-q-text"><strong>${step.question || ''}</strong></div>
        <div class="quiz-opts">
          ${choices.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const optText = opt.text || '';
            const isCorrect = (opt.correct === true) || (typeof step.correctChoice !== 'undefined' && i === step.correctChoice) || (opt.outcome === 'good');
            let cls = '';
            if (G.ctmScenAnswered) {
              if (isCorrect) cls = 'correct';
              else if (i === G._ctmScenSelected && !isCorrect) cls = 'wrong';
            }
            return `<button class="q-opt ${cls}" onclick="answerCTMScenario(${i})" ${G.ctmScenAnswered ? 'disabled' : ''}>
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${optText}</span>
            </button>`;
          }).join('')}
        </div>
        ${G.ctmScenAnswered ? `
          <div class="quiz-explanation">${(choices[G._ctmScenSelected] || {}).feedback || ''}</div>
          ${step.medicalInfo ? `<div class="quiz-explanation" style="border-left-color:var(--blue)">💡 ${step.medicalInfo}</div>` : ''}
          <button class="quiz-next-btn" onclick="nextCTMScenario()">다음 단계 →</button>
        ` : ''}
      </div>
    </div>`;

  if (!G.ctmScenAnswered) {
    startCountdown('ctmScenTimer', 30, updateTimerDisplay, () => {
      G.ctmScenAnswered = true;
      G._ctmScenSelected = -1;
      updateStreak(false);
      sfx('wrong');
      render();
    });
  }
}

function answerCTMScenario(idx) {
  if (G.ctmScenAnswered) return;
  G.ctmScenAnswered = true;
  G._ctmScenSelected = idx;
  stopTimer('ctmScenTimer');

  const sc = window.TACTICAL_CTM_CONTENT.ctmScenarios[G.ctmScenIdx];
  const step = sc.steps[G.ctmScenStepIdx];
  const choices = step.choices || step.options || [];
  const opt = choices[idx];
  const correct = opt && (opt.correct === true || (typeof step.correctChoice !== 'undefined' && idx === step.correctChoice) || opt.outcome === 'good');

  Tracker.recordAnswer(`ctmScen_${G.ctmScenIdx}_${G.ctmScenStepIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    addScore(150);
    addXP(40);
    G.ctmScenScore++;
    updateStreak(true);
    G.totalCorrect++;
  } else {
    sfx('wrong');
    shakeScreen();
    addScore(-20);
    updateStreak(false);
  }
  checkAchievements();
  render();
}

function nextCTMScenario() {
  G.ctmScenStepIdx++;
  G.ctmScenAnswered = false;
  G._ctmScenSelected = undefined;
  Tracker.startQuestion();
  render();
}

function showCTMScenarioResults() {
  stopTimer('ctmScenTimer');
  G.modesCompleted.add('ctmScenario');
  const scenarios = window.TACTICAL_CTM_CONTENT.ctmScenarios;
  const totalSteps = scenarios.reduce((sum, sc) => sum + (sc.steps || []).length, 0);
  const pct = Math.round(((G.ctmScenScore || 0) / Math.max(totalSteps, 1)) * 100);
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  Tracker.endMode(G.ctmScenScore || 0);
  if (grade === 'S' || grade === 'A') confetti();

  app.innerHTML = `
    <div class="screen results-screen">
      ${charBubble('mentor', grade === 'S' || grade === 'A' ? '대테러 위기를 완뱲하게 것내다!' : '마음을 다지고 다시 도전해바!', { success: grade === 'S' || grade === 'A' })}
      <div class="result-big anim-in">📖</div>
      <div class="result-sub">대테러의학 시나리오 완료!</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.ctmScenScore || 0}/${totalSteps}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.score}</div><div class="lbl">총점</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="startCTMScenario()">🔄 시나리오 재도전</button>
        <button class="btn-outline" onclick="startCTMBoss()">👹 보스전</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}

// ============================================
// 대테러의학 보스전
// ============================================
function renderCTMBoss() {
  const boss = G.ctmBoss;
  if (!boss) { G.screen = 'ctm'; render(); return; }
  const q = (G.ctmBossQ || [])[G.ctmBossIdx];
  if (!q || G.ctmBossIdx >= (G.ctmBossQ || []).length) { showCTMBossResults(); return; }

  const hpPct = Math.round(((G.ctmBossHp || 0) / (boss.maxHp || 100)) * 100);
  const playerHpPct = G.ctmBossPlayerHp || 0;

  app.innerHTML = `
    ${renderHUD('ctmBossTimer')}
    <div class="screen quiz-game">
      <div class="boss-banner heartbeat-effect" style="background:linear-gradient(135deg,#1a0a0a,#0a0a1a)">
        <h2>${boss.emoji || '🛡️'} ${boss.name}</h2>
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:8px">
          <span style="font-size:0.8rem;color:var(--text-muted)">보스 HP</span>
          <div style="flex:1;background:#333;border-radius:4px;height:10px;max-width:200px">
            <div style="width:${hpPct}%;background:var(--red);height:10px;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.85rem;color:var(--red)">${G.ctmBossHp}/${boss.maxHp}</span>
        </div>
        <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:4px">
          <span style="font-size:0.8rem;color:var(--text-muted)">내 HP</span>
          <div style="flex:1;background:#333;border-radius:4px;height:8px;max-width:200px">
            <div style="width:${playerHpPct}%;background:var(--green);height:8px;border-radius:4px;transition:width 0.3s"></div>
          </div>
          <span style="font-size:0.85rem;color:var(--green)">${playerHpPct}</span>
        </div>
        <p style="font-size:0.75rem;margin-top:4px">문제 ${G.ctmBossIdx + 1} / ${(G.ctmBossQ || []).length}</p>
      </div>
      ${charBubble('villain', rnd(CHARS.villain.taunts), { right: true, urgent: true, expression: '👿', delay: 0 })}
      <div class="quiz-q-card anim-in">
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-opts">
          ${(q.o || []).map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            return `<button class="q-opt" onclick="answerCTMBoss(${i})">
              <span class="q-letter">${letter}</span>
              <span class="q-opt-text">${opt}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </div>`;

  showDangerPulse(true);
  startCountdown('ctmBossTimer', 15, updateTimerDisplay, () => {
    sfx('wrong');
    shakeScreen();
    updateStreak(false);
    G.ctmBossPlayerHp = Math.max(0, (G.ctmBossPlayerHp || 100) - 20);
    G.ctmBossIdx++;
    if (G.ctmBossPlayerHp <= 0) { showCTMBossResults(); return; }
    render();
  });
}

function answerCTMBoss(idx) {
  stopTimer('ctmBossTimer');
  const q = G.ctmBossQ[G.ctmBossIdx];
  const correct = idx === q.a;

  Tracker.recordAnswer(`ctmBoss_${G.ctmBossIdx}`, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    showImpact('green');
    addScore(250);
    addXP(60);
    G.ctmBossScore++;
    updateStreak(true);
    G.totalCorrect++;
    const dmg = Math.floor((G.ctmBoss.maxHp || 100) / Math.max((G.ctmBossQ || []).length, 1));
    G.ctmBossHp = Math.max(0, (G.ctmBossHp || 0) - dmg);
  } else {
    sfx('wrong');
    shakeScreen();
    showImpact();
    addScore(-50);
    updateStreak(false);
    G.ctmBossPlayerHp = Math.max(0, (G.ctmBossPlayerHp || 100) - 15);
  }
  checkAchievements();
  showSpeedLines();

  const fbLayer = document.createElement('div');
  fbLayer.className = 'feedback-layer show';
  fbLayer.innerHTML = `
    <div class="fb-card">
      <div class="fb-icon ${correct ? 'correct' : 'wrong'}">${correct ? '🏆' : '💀'}</div>
      <h2>${correct ? '보스에 피해!' : '보스 반격!'}</h2>
      <div class="fb-char-section">
        <div class="fb-char-avatar">${correct ? CHARS.mentor.emoji : CHARS.villain.emoji}</div>
        <div class="fb-char-dialogue">
          <strong>${correct ? CHARS.mentor.name : CHARS.villain.name}:</strong>
          ${correct ? rnd(CHARS.mentor.correct) : '이력으로는 부족하다...'}
          ${q.exp ? `<br><br>${q.exp}` : ''}
        </div>
      </div>
      <div class="fb-points ${correct ? 'plus' : 'minus'}">${correct ? '+250' : '-50'}</div>
      <button class="fb-next" onclick="nextCTMBoss()">다음 →</button>
    </div>`;
  document.body.appendChild(fbLayer);
}

function nextCTMBoss() {
  document.querySelector('.feedback-layer')?.remove();
  G.ctmBossIdx++;
  if (G.ctmBossPlayerHp <= 0 || G.ctmBossHp <= 0) { showCTMBossResults(); return; }
  Tracker.startQuestion();
  render();
}

function showCTMBossResults() {
  showDangerPulse(false);
  stopTimer('ctmBossTimer');
  const total = (G.ctmBossQ || []).length;
  const pct = Math.round(((G.ctmBossScore || 0) / Math.max(total, 1)) * 100);
  const win = (G.ctmBossHp || 0) <= 0 || pct >= 70;
  const grade = getGrade(pct);
  const gradeClass = grade === 'S' ? 's' : grade === 'A' ? 'a' : grade === 'B' ? 'b' : 'c';
  G.bossGrade = grade;
  Tracker.endMode(G.ctmBossScore || 0);
  checkAchievements();
  if (win) { confetti(); addXP(300); addScore(500); }

  app.innerHTML = `
    <div class="screen results-screen">
      <div class="result-big anim-in">${win ? '🏆' : '💀'}</div>
      <div class="result-sub">${win ? G.ctmBoss.name + ' 토볌!' : '보스에게 패배...'}</div>
      <div class="result-grade ${gradeClass} anim-in">등급: ${grade}</div>
      ${win && G.ctmBoss.reward ? `<div class="quiz-explanation" style="margin:12px 0">🏅 보상: ${G.ctmBoss.reward.badge || ''}</div>` : ''}
      <div class="result-stats anim-in">
        <div class="r-stat"><div class="val">${G.ctmBossScore || 0}/${total}</div><div class="lbl">정답</div></div>
        <div class="r-stat"><div class="val">${pct}%</div><div class="lbl">정확도</div></div>
        <div class="r-stat"><div class="val">${G.ctmBossHp}</div><div class="lbl">보스 남은 HP</div></div>
      </div>
      <div class="result-actions anim-in">
        <button class="btn-primary" onclick="startCTMBoss()">🔄 보스 재도전</button>
        <button class="btn-outline" onclick="enterMode('ctm')">🛡️ 대테러의학 퀴즈</button>
        <button class="btn-outline" onclick="G.screen='modes';render();">🏠 미션 선택</button>
      </div>
    </div>`;
  G.screen = 'results';
}
// ============================================
// END OF NEW GAME MODES
// ============================================

// ============================================
// JRPG CAMPAIGN ENGINE
// Zelda / Final Fantasy Style JRPG
// ============================================

// ---- PATCH: render() ----
// Monkey-patch render to add campaign screens
(function() {
  var _origRender = render;
  render = function() {
    var s = G.screen;
    if (s === 'hseepMenu') renderHSEEPMenu();
    else if (s === 'hseepQuiz') renderHSEEPQuiz();
    else if (s === 'hseepScenario') renderHSEEPScenario();
    else if (s === 'hseepTemplate') renderHSEEPTemplate();
    else if (s === 'hseepCampaign') renderHSEEPCampaignMap();
    else if (s === 'hseepCampaignChapter') renderHSEEPCampaignChapter();
    else if (s === 'hseepCampaignResult') renderHSEEPCampaignResult();
    else if (s === 'campaign') renderCampaignWorldMap();
    else if (s === 'campaignRole') renderCampaignRoleSelect();
    else if (s === 'campaignChapters') renderCampaignChapterMap();
    else if (s === 'campaignCinematic') renderCampaignCinematic();
    else if (s === 'campaignBriefing') renderCampaignBriefing();
    else if (s === 'campaignBattle') renderCampaignBattle();
    else if (s === 'campaignResult') renderCampaignChapterResult();
    else if (s === 'campaignComplete') renderCampaignComplete();
    else _origRender();
  };
})();

// ---- PATCH: enterMode() to handle campaign and HSEEP ----
(function() {
  var _origEnter = enterMode;
  enterMode = function(mode) {
    if (mode === 'hseep') {
      G.screen = 'hseepMenu';
      G.hseepState = G.hseepState || {};
      G.hseepScenarioState = G.hseepScenarioState || {};
      G.hseepTemplateState = G.hseepTemplateState || {};
      G.hseepCampaignState = G.hseepCampaignState || { currentChapter: 1, questionIndex: 0, score: 0, chaptersCompleted: [] };
      Tracker.startMode('hseep');
      render();
      return;
    }
    if (mode === 'campaign') {
      G.screen = 'campaign';
      G.campaignState = G.campaignState || { selectedCampaign: null, selectedRole: null };
      G.campaignProgress = G.campaignProgress || {};
      Tracker.startMode('campaign');
      render();
      return;
    }
    _origEnter(mode);
  };
})();

// ---- PATCH: renderModeSelect to inject campaign card ----
(function() {
  var _origModeSelect = renderModeSelect;
  renderModeSelect = function() {
    _origModeSelect();
    // Insert campaign card into the mode grid after rendering
    var grid = document.querySelector('.mode-grid');
    if (grid && !document.querySelector('[data-mode="campaign"]')) {
      var card = document.createElement('button');
      card.className = 'mode-card';
      card.setAttribute('data-mode', 'campaign');
      card.style.cssText = 'border-color:rgba(255,215,0,0.35);background:linear-gradient(135deg,rgba(255,215,0,0.08),rgba(255,140,0,0.05));';
      card.innerHTML = `
        <div class="mode-icon">⚔️</div>
        <div class="mode-info">
          <h3>캠페인 모드 ${G.campaignProgress && Object.keys(G.campaignProgress).length > 0 ? '▶' : '🆕'}</h3>
          <p>젤다/FF 스타일 스토리텔링 RPG — 재난의 세계를 정복하라</p>
          <div class="mode-tag-row">
            <span class="mode-tag" style="background:rgba(255,215,0,0.15);color:#ffd700">JRPG</span>
          </div>
        </div>`;
      card.onclick = function() { enterMode('campaign'); };
      grid.insertBefore(card, grid.firstChild);
    }
  };
})();

// ============================================
// CAMPAIGN HELPER FUNCTIONS
// ============================================

function getCampaignData() {
  return window.CAMPAIGN_MODE;
}

function getCampaignById(id) {
  var data = getCampaignData();
  if (!data) return null;
  return (data.campaigns || []).find(function(c) { return c.id === id; });
}

function getCampaignChapterData(campaignId, chapterIndex) {
  var campaign = getCampaignById(campaignId);
  if (!campaign) return null;
  return (campaign.chapters || [])[chapterIndex] || null;
}

function getCampaignProgress() {
  G.campaignProgress = G.campaignProgress || {};
  return G.campaignProgress;
}

function saveCampaignProgress() {
  // Progress lives in G.campaignProgress (session-persistent)
  // Structure: { campaignId: { chaptersCompleted: [0,1,2], bestScore: 1200, started: true } }
}

function getCampaignCompletedChapters(campaignId) {
  var prog = getCampaignProgress();
  if (!prog[campaignId]) return [];
  return prog[campaignId].chaptersCompleted || [];
}

function isCampaignUnlocked(campaignId) {
  var data = getCampaignData();
  if (!data) return false;
  var campaigns = data.campaigns || [];
  var idx = campaigns.findIndex(function(c) { return c.id === campaignId; });
  if (idx === 0) return true; // First campaign always unlocked
  if (idx < 0) return false;
  // Previous campaign must have at least 3 chapters done
  var prevId = campaigns[idx - 1].id;
  var prevDone = getCampaignCompletedChapters(prevId);
  return prevDone.length >= 3;
}

function isCampaignCompleted(campaignId) {
  var campaign = getCampaignById(campaignId);
  if (!campaign) return false;
  var done = getCampaignCompletedChapters(campaignId);
  return done.length >= (campaign.chapters || []).length;
}

function calculateBattleDamage(correct, role, difficulty) {
  if (correct) {
    // Enemy takes damage: base 15-30 based on difficulty
    var base = difficulty === 'hard' ? 30 : difficulty === 'medium' ? 22 : 15;
    return base + Math.floor(Math.random() * 8);
  } else {
    // Player takes damage: base 10-20
    var base = difficulty === 'hard' ? 20 : difficulty === 'medium' ? 15 : 10;
    return base + Math.floor(Math.random() * 6);
  }
}

function checkRoleBonus(roleId, challenge) {
  var data = getCampaignData();
  if (!data) return false;
  var role = (data.roles || []).find(function(r) { return r.id === roleId; });
  if (!role || !challenge) return false;
  var bonuses = role.bonuses || {};
  var qType = (challenge.type || '').toLowerCase();
  // Check if question type matches any role bonus category
  return Object.keys(bonuses).some(function(k) {
    return qType.indexOf(k) >= 0 || (challenge.id || '').indexOf(k) >= 0;
  });
}

function levelUpCheck() {
  if (!G.campaign) return false;
  var data = getCampaignData();
  var milestones = data ? (data.milestones || []) : [];
  var oldLevel = G.campaign.level || 1;
  var xp = G.campaign.xp || 0;
  // XP thresholds: 500, 1500, 3000, 5000, 8000
  var thresholds = [0, 500, 1500, 3000, 5000, 8000];
  var newLevel = 1;
  for (var i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) { newLevel = i + 1; break; }
  }
  newLevel = Math.min(newLevel, 6);
  if (newLevel > oldLevel) {
    G.campaign.level = newLevel;
    var milestone = milestones[newLevel - 1];
    return milestone ? milestone.title : '레벨 ' + newLevel;
  }
  return false;
}

function useItem(itemId) {
  if (!G.campaign) return false;
  var items = G.campaign.items || [];
  var idx = items.findIndex(function(i) { return i === itemId; });
  if (idx < 0) return false;
  items.splice(idx, 1);
  G.campaign.items = items;

  // Apply item effect
  if (itemId === 'medkit') {
    var heal = Math.floor((G.campaign.maxHp || 100) * 0.25);
    G.campaign.hp = Math.min(G.campaign.maxHp || 100, (G.campaign.hp || 0) + heal);
    showAchievement('🩹', '구급키트 사용!', 'HP +' + heal);
  } else if (itemId === 'hint') {
    G.campaign.hintActive = true;
    showAchievement('💡', '힌트 사용!', '오답 하나를 제거합니다');
  } else if (itemId === 'shield') {
    G.campaign.shieldActive = true;
    showAchievement('🛡️', '방호복 장착!', '다음 오답 HP 손실 면제');
  } else if (itemId === 'doubleXP') {
    G.campaign.doubleXPCount = 3;
    showAchievement('⭐', '2배 경험치!', '다음 3문제 XP 2배');
  } else if (itemId === 'timefreeze') {
    G.campaign.timeFreezeActive = true;
    showAchievement('⏸️', '시간 정지!', '타이머 연장');
  } else if (itemId === 'antidote') {
    G.campaign.antidoteReady = true;
    showAchievement('💉', '해독제 준비!', 'HP 0 시 자동 부활');
  }
  return true;
}

function renderCampaignPlayerHUD() {
  if (!G.campaign) return '';
  var c = G.campaign;
  var data = getCampaignData();
  var roles = data ? (data.roles || []) : [];
  var role = roles.find(function(r) { return r.id === c.role; }) || {};
  var maxHp = c.maxHp || 100;
  var hp = Math.max(0, c.hp || 0);
  var hpPct = Math.round((hp / maxHp) * 100);
  var xpForLevel = [500, 1000, 1500, 2000, 3000, 8000];
  var levelIdx = Math.min((c.level || 1) - 1, xpForLevel.length - 1);
  var xpThisLevel = levelIdx > 0 ? [0,500,1500,3000,5000,8000][levelIdx] : 0;
  var xpNext = xpForLevel[levelIdx] || 8000;
  var xpPct = Math.round(Math.min(100, ((c.xp - xpThisLevel) / (xpNext - xpThisLevel + 1)) * 100));

  // Items in HUD (show up to 4)
  var itemSlots = [];
  var itemData = data ? (data.items || []) : [];
  var ownedItems = c.items || [];
  for (var i = 0; i < 4; i++) {
    var iid = ownedItems[i];
    if (iid) {
      var itemDef = itemData.find(function(d) { return d.id === iid; }) || {};
      var icon = iid === 'hint' ? '💡' : iid === 'medkit' ? '🩹' : iid === 'timefreeze' ? '⏸️' : iid === 'shield' ? '🛡️' : iid === 'doubleXP' ? '⭐' : iid === 'antidote' ? '💉' : '📦';
      itemSlots.push('<div class="hud-item" data-item-id="' + iid + '" title="' + (itemDef.desc || '') + '">' + icon + '</div>');
    } else {
      itemSlots.push('<div class="hud-item empty">·</div>');
    }
  }

  var data2 = getCampaignData();
  var milestones = data2 ? (data2.milestones || []) : [];
  var milestone = milestones[(c.level || 1) - 1] || {};

  return `<div class="player-hud">
    <div class="hud-avatar">${role.emoji || '👤'}</div>
    <div class="hud-info">
      <div class="hud-name">${role.name || '대원'}</div>
      <div class="hud-title">${milestone.title || 'Lv.' + (c.level || 1)}</div>
    </div>
    <div class="hud-bars">
      <div class="hud-bar">
        <span class="bar-label">HP</span>
        <div class="bar-track"><div class="bar-fill hp" style="width:${hpPct}%"></div></div>
        <span class="bar-value">${hp}/${maxHp}</span>
      </div>
      <div class="hud-bar">
        <span class="bar-label">XP</span>
        <div class="bar-track"><div class="bar-fill xp" style="width:${xpPct}%"></div></div>
        <span class="bar-value">${c.xp || 0}</span>
      </div>
    </div>
    <div class="hud-items">${itemSlots.join('')}</div>
    <div class="hud-level">
      <div class="lv-num">${c.level || 1}</div>
      <div class="lv-label">LV</div>
    </div>
  </div>`;
}

function useCampaignItem(itemId) {
  if (useItem(itemId)) {
    render();
  }
}

// Helper: bind HUD item click listeners (called after each campaign screen render)
function bindCampaignHUDItems() {
  document.querySelectorAll('.hud-item[data-item-id]').forEach(function(el) {
    el.addEventListener('click', function() {
      var itemId = this.getAttribute('data-item-id');
      if (itemId) useCampaignItem(itemId);
    });
  });
}

// ============================================
// 1. WORLD MAP
// ============================================
function renderCampaignWorldMap() {
  var data = getCampaignData();
  if (!data) {
    app.innerHTML = '<div style="padding:40px;text-align:center;color:#ff3b5c">캠페인 데이터 로딩 실패</div>';
    return;
  }
  var campaigns = data.campaigns || [];
  var prog = getCampaignProgress();

  var nodes = campaigns.map(function(c, idx) {
    var unlocked = isCampaignUnlocked(c.id);
    var completed = isCampaignCompleted(c.id);
    var done = getCampaignCompletedChapters(c.id);
    var total = (c.chapters || []).length;
    var pct = total > 0 ? Math.round((done.length / total) * 100) : 0;
    var cls = completed ? 'completed' : !unlocked ? 'locked' : '';
    var color = c.cardColor || '#ffd700';
    return `<div class="campaign-node ${cls}" style="--node-color:${color}" data-campaign-id="${c.id}" data-unlocked="${unlocked}">
      <div class="node-icon">${c.icon || '⚔️'}</div>
      <div class="node-title">${(c.title || '').replace(/^.+?\s/, '')}</div>
      <div class="node-subtitle">${c.subtitle || ''}</div>
      <div class="node-meta">
        <span class="node-difficulty">${c.difficulty || '★☆☆☆☆'}</span>
        <span>${c.difficultyLabel || ''}</span>
        <span>⏱ ${c.estimatedTime || '45분'}</span>
      </div>
      ${total > 0 ? `<div class="node-progress">
        <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:#6b7080;margin-bottom:4px">
          <span>진행도</span><span>${done.length}/${total} 챕터</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>` : ''}
      ${!unlocked ? '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2rem">🔒</div>' : ''}
    </div>`;
  }).join('');

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="world-map">
      <button class="back-btn" id="campaignBackToModes">← 미션 선택으로</button>
      <div class="world-map-title">⚔️ 재난 대응 세계</div>
      <div class="world-map-subtitle">캠페인을 선택하여 재난 현장으로 출동하라</div>
      <div class="campaign-nodes">${nodes}</div>
    </div>
  </div>`;

  // Event delegation for campaign node clicks
  var backToModesBtn = document.getElementById('campaignBackToModes');
  if (backToModesBtn) backToModesBtn.addEventListener('click', function() { G.screen='modes'; render(); });

  document.querySelectorAll('.campaign-node').forEach(function(node) {
    node.addEventListener('click', function() {
      var cid = this.getAttribute('data-campaign-id');
      var unlocked = this.getAttribute('data-unlocked') === 'true';
      if (unlocked) {
        selectCampaign(cid);
      } else {
        showAchievement('🔒','잠긴 캠페인','이전 캠페인을 3챕터 이상 완료하세요');
      }
    });
  });
}

function selectCampaign(campaignId) {
  G.campaignState = G.campaignState || {};
  G.campaignState.selectedCampaign = campaignId;
  G.screen = 'campaignRole';
  render();
}

// ============================================
// 2. ROLE SELECTION
// ============================================
function renderCampaignRoleSelect() {
  var data = getCampaignData();
  if (!data) return;
  var roles = data.roles || [];
  var campaignId = (G.campaignState || {}).selectedCampaign;
  var campaign = getCampaignById(campaignId);
  var selectedRole = (G.campaignState || {}).selectedRole;

  var roleCards = roles.map(function(r) {
    var sel = selectedRole === r.id ? 'selected' : '';
    return `<div class="role-card ${sel}" data-role-id="${r.id}">
      <div class="role-emoji">${r.emoji}</div>
      <div class="role-name">${r.name}</div>
      <div class="role-desc">${r.desc}</div>
      <div class="role-special">✨ ${r.special}</div>
    </div>`;
  }).join('');

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="role-select">
      <button class="back-btn" id="roleBackBtn">← 월드맵으로</button>
      <div class="role-select-title">직업 선택</div>
      <div class="role-select-subtitle">${campaign ? campaign.title : ''} — 어떤 역할로 도전하겠습니까?</div>
      <div class="role-grid">${roleCards}</div>
      <button class="role-confirm-btn" id="roleConfirmBtn"
        ${selectedRole ? '' : 'disabled'}>
        ${selectedRole ? '출동 준비 완료!' : '직업을 선택하세요'}
      </button>
    </div>
  </div>`;

  // Event listeners
  document.getElementById('roleBackBtn').addEventListener('click', function() { G.screen='campaign'; render(); });
  document.getElementById('roleConfirmBtn').addEventListener('click', function() { if (!this.disabled) confirmCampaignRole(); });
  document.querySelectorAll('.role-card').forEach(function(card) {
    card.addEventListener('click', function() { selectCampaignRole(this.getAttribute('data-role-id')); });
  });
}

function selectCampaignRole(roleId) {
  G.campaignState = G.campaignState || {};
  G.campaignState.selectedRole = roleId;
  render();
}

function confirmCampaignRole() {
  var state = G.campaignState || {};
  if (!state.selectedRole || !state.selectedCampaign) return;

  // Initialize campaign state
  G.campaign = {
    id: state.selectedCampaign,
    role: state.selectedRole,
    currentChapter: 0,
    hp: 100,
    maxHp: 100,
    xp: 0,
    level: 1,
    items: ['hint', 'medkit'], // Starting items
    score: 0,
    chaptersCompleted: [],
    startedAt: Date.now(),
    totalCorrect: 0,
    totalAnswered: 0
  };

  G.screen = 'campaignChapters';
  render();
}

// ============================================
// 3. CHAPTER MAP
// ============================================
function renderCampaignChapterMap() {
  var c = G.campaign;
  if (!c) { G.screen = 'campaign'; render(); return; }

  var campaign = getCampaignById(c.id);
  if (!campaign) { G.screen = 'campaign'; render(); return; }

  var chapters = campaign.chapters || [];
  var completedChapters = c.chaptersCompleted || [];

  var chapterNodes = chapters.map(function(ch, idx) {
    var isDone = completedChapters.indexOf(idx) >= 0;
    var isActive = idx === c.currentChapter;
    var isLocked = !isDone && idx > c.currentChapter;
    var cls = isDone ? 'completed' : isActive ? 'active' : isLocked ? 'locked' : '';
    var numClass = isDone ? 'completed' : isActive ? 'active' : 'locked';
    var statusText = isDone ? '✅ 완료' : isActive ? '▶ 현재' : '🔒';
    var clickable = (!isLocked || isDone);

    return `<div class="chapter-node ${cls}" ${clickable ? 'data-chapter-idx="' + idx + '"' : ''}>
      <div class="ch-number ${numClass}">${idx + 1}</div>
      <div class="ch-info">
        <div class="ch-title">${ch.title || 'Chapter ' + (idx + 1)}</div>
        <div class="ch-subtitle">${ch.subtitle || ch.levelTitle || ''}</div>
      </div>
      <div class="ch-status">${statusText}</div>
    </div>`;
  }).join('');

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="chapter-map">
      <button class="back-btn" id="chapterBackToWorld">← 월드맵으로</button>
      <div class="chapter-map-header">
        <div class="campaign-icon">${campaign.icon || '⚔️'}</div>
        <h2>${campaign.title || ''}</h2>
        <p style="color:#8b8fa3;font-size:0.8rem">${campaign.subtitle || ''}</p>
      </div>
      <div class="chapter-path">${chapterNodes}</div>
    </div>
    ${renderCampaignPlayerHUD()}
  </div>`;

  // Event listeners for chapter map
  var chBackBtn = document.getElementById('chapterBackToWorld');
  if (chBackBtn) chBackBtn.addEventListener('click', function() { G.screen='campaign'; render(); });
  document.querySelectorAll('.chapter-node[data-chapter-idx]').forEach(function(node) {
    node.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-chapter-idx'));
      if (!isNaN(idx)) enterCampaignChapter(idx);
    });
  });
  bindCampaignHUDItems();
}

function enterCampaignChapter(chapterIdx) {
  if (!G.campaign) return;
  G.campaign.currentChapter = chapterIdx;
  G.campaign.currentCinematicSeen = false;
  G.screen = 'campaignCinematic';
  render();
}

// ============================================
// 4. CINEMATIC
// ============================================
function renderCampaignCinematic() {
  var c = G.campaign;
  if (!c) { G.screen = 'campaign'; render(); return; }

  var chapter = getCampaignChapterData(c.id, c.currentChapter);
  if (!chapter) { G.screen = 'campaignBriefing'; render(); return; }

  var cin = chapter.cinematic || {};
  var roleDialogue = (cin.roleDialogue || {})[c.role] || '';
  var data = getCampaignData();
  var roles = data ? (data.roles || []) : [];
  var role = roles.find(function(r) { return r.id === c.role; }) || {};

  var dialogueHtml = roleDialogue ? `
    <div class="cinematic-dialogue">
      <div class="speaker">${role.emoji || ''} ${role.name || ''}</div>
      <div class="speech">${roleDialogue}</div>
    </div>` : '';

  var atmosphereHtml = cin.atmosphere ? `
    <div style="text-align:center;font-size:0.8rem;color:#6b7080;font-style:italic;margin-bottom:16px">
      🌫️ ${cin.atmosphere}
    </div>` : '';

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="cinematic">
      <div class="cinematic-chapter-tag">Chapter ${c.currentChapter + 1}</div>
      <div class="cinematic-title">${chapter.title || ''}</div>
      ${atmosphereHtml}
      <div class="cinematic-text">${cin.text || ''}</div>
      ${dialogueHtml}
      <button class="cinematic-continue" id="cinematicContinueBtn">계속 ▶</button>
    </div>
    ${renderCampaignPlayerHUD()}
  </div>`;

  var cinContBtn = document.getElementById('cinematicContinueBtn');
  if (cinContBtn) cinContBtn.addEventListener('click', function() { G.screen='campaignBriefing'; render(); });
  bindCampaignHUDItems();
}

// ============================================
// 5. BRIEFING
// ============================================
function renderCampaignBriefing() {
  var c = G.campaign;
  if (!c) { G.screen = 'campaign'; render(); return; }

  var chapter = getCampaignChapterData(c.id, c.currentChapter);
  if (!chapter) { G.screen = 'campaignChapters'; render(); return; }

  var br = chapter.briefing || {};
  var hazards = (br.hazards || []).map(function(h) { return '<li>' + h + '</li>'; }).join('');
  var resources = (br.resources || []).map(function(r) { return '<li style="margin:2px 0">' + r + '</li>'; }).join('');

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="briefing">
      <button class="back-btn" id="briefingBackBtn">← 시네마틱으로</button>
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:0.75rem;color:#448aff;letter-spacing:2px;text-transform:uppercase">임무 브리핑</div>
        <div style="font-size:1.2rem;font-weight:700;color:#eef0f6;margin-top:4px">${chapter.title || ''}</div>
      </div>
      <div class="briefing-card">
        <h3>🎯 상황 보고</h3>
        <div class="briefing-item"><span class="label">상황</span><span class="value" style="max-width:60%;text-align:right">${br.situation || ''}</span></div>
        ${br.patientCount ? '<div class="briefing-item"><span class="label">환자 수</span><span class="value">' + br.patientCount + '</span></div>' : ''}
        ${br.time ? '<div class="briefing-item"><span class="label">시각</span><span class="value">' + br.time + '</span></div>' : ''}
        <div class="briefing-item" style="border:none"><span class="label">목표</span><span class="value" style="max-width:60%;text-align:right;color:#ffd700">${br.objective || ''}</span></div>
      </div>
      ${hazards ? `<div class="briefing-card">
        <h3>⚠️ 위험 요소</h3>
        <ul class="briefing-list">${hazards}</ul>
      </div>` : ''}
      ${resources ? `<div class="briefing-card">
        <h3>🚒 사용 가능 자원</h3>
        <ul style="list-style:none">${resources}</ul>
      </div>` : ''}
      <button class="briefing-start-btn" id="briefingStartBtn">⚔️ 작전 시작!</button>
    </div>
    ${renderCampaignPlayerHUD()}
  </div>`;

  var brBackBtn = document.getElementById('briefingBackBtn');
  if (brBackBtn) brBackBtn.addEventListener('click', function() { G.screen='campaignCinematic'; render(); });
  var brStartBtn = document.getElementById('briefingStartBtn');
  if (brStartBtn) brStartBtn.addEventListener('click', function() { startCampaignBattle(); });
  bindCampaignHUDItems();
}

// ============================================
// 6. BATTLE (CORE FF-STYLE GAMEPLAY)
// ============================================
function startCampaignBattle() {
  var c = G.campaign;
  if (!c) return;
  var chapter = getCampaignChapterData(c.id, c.currentChapter);
  if (!chapter) return;

  // Initialize battle state
  var questions = chapter.challenges || [];
  c.battleQuestions = questions.slice(); // copy
  c.currentQuestion = 0;
  c.chapterScore = 0;
  c.chapterCorrect = 0;
  c.chapterXpGained = 0;
  c.battleStartTime = Date.now();
  c.answered = false;
  c.selectedAnswer = null;

  // Enemy HP = number of questions * 20
  c.enemyHp = questions.length * 20;
  c.enemyMaxHp = c.enemyHp;

  // Restore player HP for new chapter (not carried over)
  // Actually HP carries — that's the challenge!

  G.screen = 'campaignBattle';
  Tracker.startMode('campaign_' + c.id + '_ch' + c.currentChapter);
  render();
}

function renderCampaignBattle() {
  var c = G.campaign;
  if (!c) { G.screen = 'campaign'; render(); return; }

  var questions = c.battleQuestions || [];
  var qIdx = c.currentQuestion || 0;

  if (qIdx >= questions.length) {
    showCampaignChapterResult(true);
    return;
  }

  var q = questions[qIdx];
  var answered = c.answered || false;
  var selected = c.selectedAnswer;

  var campaign = getCampaignById(c.id);
  var chapter = getCampaignChapterData(c.id, c.currentChapter);

  // Enemy sprite based on campaign
  var enemyEmojis = {
    urban_fire: '🔥', earthquake: '🌍', chemical: '☣️', flood: '🌊',
    mass_casualty: '💀', nuclear: '☢️'
  };
  var enemyEmoji = enemyEmojis[c.id] || (campaign ? campaign.icon : '💀') || '👹';
  var enemyName = campaign ? campaign.title.replace(/^.+?\s/, '') + ' 위기' : '재난';

  var hpPct = Math.round(((c.hp || 0) / (c.maxHp || 100)) * 100);
  var enemyHpPct = Math.round(((c.enemyHp || 0) / (c.enemyMaxHp || 1)) * 100);

  var labels = ['A', 'B', 'C', 'D'];
  var options = (q.o || []);

  // Hint: hide one wrong answer
  var hiddenIdx = -1;
  if (c.hintActive && !answered) {
    // Find a wrong answer to hide
    for (var hi = 0; hi < options.length; hi++) {
      if (hi !== q.a) { hiddenIdx = hi; break; }
    }
    c.hintActive = false;
  }

  var optionHtml = options.map(function(opt, i) {
    if (i === hiddenIdx) return ''; // Hidden by hint
    var cls = '';
    if (answered) {
      if (i === q.a) cls = 'correct';
      else if (i === selected) cls = 'wrong';
    }
    var disabledAttr = answered ? 'disabled' : '';
    return `<button class="battle-option ${cls}" ${disabledAttr} data-battle-answer="${i}">
      <span class="opt-label">${labels[i]}</span>
      <span>${opt}</span>
    </button>`;
  }).join('');

  var explanationHtml = '';
  if (answered && q.exp) {
    var isCorrect = selected === q.a;
    explanationHtml = `<div style="background:rgba(${isCorrect?'0,230,118':'255,59,92'},0.08);border:1px solid rgba(${isCorrect?'0,230,118':'255,59,92'},0.3);border-radius:8px;padding:12px;margin-top:8px;font-size:0.8rem;color:#c8cad8;line-height:1.6">
      <strong style="color:${isCorrect?'#00e676':'#ff3b5c'}">${isCorrect?'✅ 정답!':'❌ 오답!'}</strong><br>${q.exp}
    </div>`;
  }

  var roleBonusHtml = '';
  if (answered && selected === q.a && q.roleBonus && q.roleBonus[c.role]) {
    roleBonusHtml = `<div style="background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.3);border-radius:8px;padding:8px;margin-top:6px;font-size:0.75rem;color:#ffd700">
      ⭐ ${q.roleBonus[c.role]}
    </div>`;
  }

  var nextBtn = '';
  if (answered) {
    nextBtn = `<button id="battleNextBtn" style="display:block;width:100%;margin-top:12px;padding:12px;background:linear-gradient(135deg,#448aff,#b388ff);color:#fff;font-weight:700;border:none;border-radius:8px;cursor:pointer;font-size:0.9rem">
      ${qIdx + 1 >= questions.length ? '챕터 결과 보기 →' : '다음 질문 →'}
    </button>`;
  }

  // Item use hint
  var doubleXPIndicator = (c.doubleXPCount || 0) > 0 ? `<span style="color:#ffd700;font-size:0.75rem">⭐ 2배 XP (${c.doubleXPCount}회 남음)</span>` : '';
  var shieldIndicator = c.shieldActive ? `<span style="color:#b388ff;font-size:0.75rem">🛡️ 방호복 발동 중</span>` : '';

  // Narrative for scenario type
  var narrativeHtml = '';
  if (q.narrative) {
    narrativeHtml = `<div style="background:rgba(68,138,255,0.05);border:1px solid rgba(68,138,255,0.2);border-radius:8px;padding:12px;margin-bottom:12px;font-size:0.85rem;color:#c8cad8;line-height:1.6;white-space:pre-line">${q.narrative}</div>`;
  }

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="battle-screen">
      <!-- Enemy -->
      <div class="battle-enemy">
        <div class="enemy-sprite" id="enemySprite">${enemyEmoji}</div>
        <div class="enemy-name">${enemyName}</div>
        <div style="font-size:0.7rem;color:#6b7080;margin-bottom:4px">문제 ${qIdx + 1} / ${questions.length}</div>
        <div class="battle-hp-bar">
          <div class="battle-hp-fill enemy" id="enemyHpFill" style="width:${enemyHpPct}%"></div>
        </div>
        <div style="font-size:0.7rem;color:#ff3b5c">적 HP: ${c.enemyHp}/${c.enemyMaxHp}</div>
      </div>

      <!-- Question -->
      <div class="battle-question">
        <div class="q-category">${q.type || 'QUIZ'} ${doubleXPIndicator} ${shieldIndicator}</div>
        ${narrativeHtml}
        <div class="q-text">${q.q}</div>
      </div>

      <!-- Options -->
      <div class="battle-options">${optionHtml}</div>

      ${explanationHtml}
      ${roleBonusHtml}
      ${nextBtn}
    </div>
    ${renderCampaignPlayerHUD()}
  </div>`;

  // Event listeners for battle
  document.querySelectorAll('[data-battle-answer]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-battle-answer'));
      if (!isNaN(idx)) answerCampaignBattle(idx);
    });
  });
  var battleNextBtn = document.getElementById('battleNextBtn');
  if (battleNextBtn) battleNextBtn.addEventListener('click', function() { nextCampaignQuestion(); });
  bindCampaignHUDItems();
}

function answerCampaignBattle(idx) {
  var c = G.campaign;
  if (!c || c.answered) return;

  var q = (c.battleQuestions || [])[c.currentQuestion || 0];
  if (!q) return;

  c.answered = true;
  c.selectedAnswer = idx;
  c.totalAnswered = (c.totalAnswered || 0) + 1;

  var correct = idx === q.a;
  var difficulty = q.difficulty || 'medium';

  Tracker.recordAnswer('campaign_' + c.id + '_q' + c.currentQuestion, String(idx), correct);

  if (correct) {
    sfx('correct');
    flashScreen('green');
    c.totalCorrect = (c.totalCorrect || 0) + 1;
    c.chapterCorrect = (c.chapterCorrect || 0) + 1;

    // XP calculation
    var baseXP = q.xp || 100;
    var roleBonus = checkRoleBonus(c.role, q);
    var multiplier = (c.doubleXPCount || 0) > 0 ? 2 : 1;
    if (roleBonus) multiplier *= 1.5;
    var xpGained = Math.round(baseXP * multiplier);

    c.xp = (c.xp || 0) + xpGained;
    c.chapterXpGained = (c.chapterXpGained || 0) + xpGained;
    c.chapterScore = (c.chapterScore || 0) + (q.xp || 100);

    if ((c.doubleXPCount || 0) > 0) c.doubleXPCount--;

    // Enemy takes damage
    var dmg = calculateBattleDamage(true, c.role, difficulty);
    c.enemyHp = Math.max(0, (c.enemyHp || 0) - dmg);

    addScore(q.xp || 100);
    addXP(xpGained);
    updateStreak(true);

    // Animate enemy hit
    setTimeout(function() {
      var sprite = document.getElementById('enemySprite');
      if (sprite) sprite.style.animation = 'enemyHit 0.5s ease, enemyFloat 3s ease-in-out infinite 0.5s';
      var fill = document.getElementById('enemyHpFill');
      if (fill) {
        var pct = Math.round(((c.enemyHp || 0) / (c.enemyMaxHp || 1)) * 100);
        fill.style.width = pct + '%';
      }
    }, 100);

    // Level up check
    var lvUp = levelUpCheck();
    if (lvUp) {
      showAchievement('🌟', '레벨 업!', lvUp + ' 달성!');
    }

  } else {
    sfx('wrong');

    if (c.shieldActive) {
      c.shieldActive = false;
      showAchievement('🛡️', '방호복 발동!', 'HP 손실 면제');
    } else {
      var dmg = calculateBattleDamage(false, c.role, difficulty);
      c.hp = Math.max(0, (c.hp || 0) - dmg);
      shakeScreen();

      // Antidote: auto-revive at near-death
      if (c.hp <= 0 && c.antidoteReady) {
        c.hp = Math.floor((c.maxHp || 100) * 0.1);
        c.antidoteReady = false;
        showAchievement('💉', '해독제 발동!', 'HP 10%로 부활!');
      }
    }
    updateStreak(false);
    addScore(-20);
  }

  checkAchievements();
  render();

  // Player death check after render
  if ((c.hp || 0) <= 0) {
    setTimeout(function() {
      showCampaignChapterResult(false);
    }, 1500);
  }
}

function nextCampaignQuestion() {
  var c = G.campaign;
  if (!c) return;
  c.currentQuestion = (c.currentQuestion || 0) + 1;
  c.answered = false;
  c.selectedAnswer = null;

  var questions = c.battleQuestions || [];
  if (c.currentQuestion >= questions.length) {
    showCampaignChapterResult(true);
    return;
  }

  Tracker.startQuestion();
  render();
}

// ============================================
// 7. CHAPTER RESULT
// ============================================
function showCampaignChapterResult(success) {
  var c = G.campaign;
  if (!c) return;
  c.lastResultSuccess = success;

  if (success) {
    // Mark chapter as completed
    if (c.chaptersCompleted.indexOf(c.currentChapter) < 0) {
      c.chaptersCompleted.push(c.currentChapter);
    }

    // Save to global progress
    var prog = getCampaignProgress();
    if (!prog[c.id]) prog[c.id] = { chaptersCompleted: [], bestScore: 0 };
    if (prog[c.id].chaptersCompleted.indexOf(c.currentChapter) < 0) {
      prog[c.id].chaptersCompleted.push(c.currentChapter);
    }
    prog[c.id].bestScore = Math.max(prog[c.id].bestScore || 0, c.score || 0);
    saveCampaignProgress();

    // Check if this was the last chapter
    var campaign = getCampaignById(c.id);
    var totalChapters = campaign ? (campaign.chapters || []).length : 6;
    if (c.chaptersCompleted.length >= totalChapters) {
      G.screen = 'campaignComplete';
      Tracker.endMode(c.chapterScore || 0);
      render();
      return;
    }

    // Earn a random item reward
    var rewardItems = ['hint', 'medkit', 'timefreeze', 'shield', 'doubleXP'];
    var rewardItem = rewardItems[Math.floor(Math.random() * rewardItems.length)];
    c.lastRewardItem = rewardItem;
    if ((c.items || []).length < 8) {
      c.items = c.items || [];
      c.items.push(rewardItem);
    }

    confetti();
    addXP(200);
  }

  Tracker.endMode(c.chapterScore || 0);
  G.screen = 'campaignResult';
  render();
}

function renderCampaignChapterResult() {
  var c = G.campaign;
  if (!c) { G.screen = 'campaign'; render(); return; }

  var success = c.lastResultSuccess;
  var chapter = getCampaignChapterData(c.id, c.currentChapter);
  var totalQ = (c.battleQuestions || []).length;
  var correct = c.chapterCorrect || 0;
  var accuracy = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
  var elapsed = Math.round(((Date.now() - (c.battleStartTime || Date.now())) / 1000));
  var minutes = Math.floor(elapsed / 60);
  var seconds = elapsed % 60;

  var icon = success ? '🏆' : '💀';
  var title = success ? '챕터 완료!' : '임무 실패...';
  var titleColor = success ? '#ffd700' : '#ff3b5c';

  // Success narrative
  var narrativeText = success
    ? '임무를 성공적으로 완수했습니다. 훌륭한 대응이었습니다.\n현장에서의 신속한 판단이 많은 생명을 구했습니다.'
    : '임무 중 HP가 소진되었습니다. 재난 현장에서의 의료 대응은 험난합니다.\n다시 도전하여 더 나은 결과를 만들어보세요.';

  var data = getCampaignData();
  var itemData = data ? (data.items || []) : [];
  var rewardItemId = c.lastRewardItem;
  var rewardItemDef = rewardItemId ? itemData.find(function(d) { return d.id === rewardItemId; }) : null;

  var lvUp = levelUpCheck();
  var levelUpHtml = lvUp ? `<div class="level-up-banner">
    <h3>🌟 레벨 업!</h3>
    <p>${lvUp} 칭호를 획득했습니다!</p>
  </div>` : '';

  var rewardsHtml = success && rewardItemDef ? `
    <div class="result-rewards">
      <h3>🎁 챕터 보상</h3>
      <div class="reward-item">📦 아이템 획득: ${rewardItemDef.name}</div>
      <div class="reward-item">✨ XP +${c.chapterXpGained || 0}</div>
      <div class="reward-item">⭐ 점수 +${c.chapterScore || 0}</div>
    </div>` : '';

  var nextChapter = c.currentChapter + 1;
  var campaign = getCampaignById(c.id);
  var hasNextChapter = campaign && nextChapter < (campaign.chapters || []).length;

  var actionBtns = success
    ? `${hasNextChapter ? `<button id="resultNextChapter" data-next-chapter="${nextChapter}" style="display:block;width:100%;margin-bottom:8px;padding:14px;background:linear-gradient(135deg,#ffd700,#ff8c00);color:#000;font-weight:700;border:none;border-radius:12px;cursor:pointer">다음 챕터 →</button>` : ''}
       <button id="resultToChapterMap" style="display:block;width:100%;padding:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#eef0f6;border:none;border-radius:12px;cursor:pointer">챕터 맵으로</button>`
    : `<button id="resultRetry" style="display:block;width:100%;margin-bottom:8px;padding:14px;background:linear-gradient(135deg,#ff3b5c,#ff1744);color:#fff;font-weight:700;border:none;border-radius:12px;cursor:pointer">🔄 재도전</button>
       <button id="resultToChapterMap" style="display:block;width:100%;padding:12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:#eef0f6;border:none;border-radius:12px;cursor:pointer">챕터 맵으로</button>`;

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="chapter-result">
      <div class="result-icon">${icon}</div>
      <h2 style="color:${titleColor}">${title}</h2>
      <p style="color:#8b8fa3;font-size:0.85rem">${chapter ? chapter.title : ''}</p>
      <div class="result-narrative">${narrativeText}</div>
      <div class="result-stats">
        <div class="result-stat">
          <div class="rs-value" style="color:#ffd700">${correct}/${totalQ}</div>
          <div class="rs-label">정답</div>
        </div>
        <div class="result-stat">
          <div class="rs-value" style="color:${accuracy >= 70 ? '#00e676' : '#ff3b5c'}">${accuracy}%</div>
          <div class="rs-label">정확도</div>
        </div>
        <div class="result-stat">
          <div class="rs-value" style="color:#448aff">${minutes}:${seconds < 10 ? '0' + seconds : seconds}</div>
          <div class="rs-label">소요 시간</div>
        </div>
      </div>
      ${levelUpHtml}
      ${rewardsHtml}
      <div style="margin-top:16px">${actionBtns}</div>
    </div>
    ${renderCampaignPlayerHUD()}
  </div>`;

  // Event listeners for chapter result
  var nextChBtn = document.getElementById('resultNextChapter');
  if (nextChBtn) nextChBtn.addEventListener('click', function() {
    var nc = parseInt(this.getAttribute('data-next-chapter'));
    if (!isNaN(nc)) enterCampaignChapter(nc);
  });
  var retryBtn = document.getElementById('resultRetry');
  if (retryBtn) retryBtn.addEventListener('click', function() { startCampaignBattle(); });
  var toChMapBtn = document.getElementById('resultToChapterMap');
  if (toChMapBtn) toChMapBtn.addEventListener('click', function() { G.screen='campaignChapters'; render(); });
  bindCampaignHUDItems();
}

// ============================================
// 8. CAMPAIGN COMPLETE
// ============================================
function renderCampaignComplete() {
  var c = G.campaign;
  if (!c) { G.screen = 'campaign'; render(); return; }

  var campaign = getCampaignById(c.id);
  var data = getCampaignData();
  var roles = data ? (data.roles || []) : [];
  var role = roles.find(function(r) { return r.id === c.role; }) || {};

  var totalQ = (c.battleQuestions || []).length;
  var correct = c.totalCorrect || 0;
  var totalAnswered = c.totalAnswered || 1;
  var accuracy = Math.round((correct / Math.max(totalAnswered, 1)) * 100);
  var elapsed = Math.round(((Date.now() - (c.startedAt || Date.now())) / 60000));
  var finalTitle = role.maxTitle || '재난 대응 전문가';
  var badge = campaign ? (campaign.completionBadge || '🏆 캠페인 완료') : '🏆 캠페인 완료';

  confetti();
  addXP(500);
  addScore(1000);

  app.innerHTML = `<div class="campaign-screen-wrap">
    <div class="campaign-complete">
      <div class="trophy">🏆</div>
      <h1>캠페인 완료!</h1>
      <div class="final-title">${badge}</div>
      <div style="font-size:1.1rem;color:#eef0f6;margin-bottom:8px">${finalTitle}</div>
      <div style="font-size:0.85rem;color:#8b8fa3;margin-bottom:24px">${role.name || ''} ${role.emoji || ''}</div>

      <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.2);border-radius:12px;padding:20px;margin-bottom:20px">
        <div style="font-size:0.8rem;color:#ffd700;margin-bottom:12px;letter-spacing:1px">캠페인 통계</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          <div style="text-align:center">
            <div style="font-size:1.3rem;font-weight:700;color:#00e676">${accuracy}%</div>
            <div style="font-size:0.7rem;color:#8b8fa3">정확도</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.3rem;font-weight:700;color:#ffd700">Lv.${c.level || 1}</div>
            <div style="font-size:0.7rem;color:#8b8fa3">최종 레벨</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.3rem;font-weight:700;color:#448aff">${elapsed}분</div>
            <div style="font-size:0.7rem;color:#8b8fa3">플레이 시간</div>
          </div>
        </div>
      </div>

      <div style="background:linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,140,0,0.05));border:1px solid rgba(255,215,0,0.3);border-radius:16px;padding:20px;margin-bottom:24px">
        <div style="font-size:2rem;margin-bottom:8px">${role.emoji || '⭐'}</div>
        <div style="font-size:0.85rem;color:#c8cad8;line-height:1.7">${role.flavor || '탁월한 재난 대응 능력을 증명했습니다.'}</div>
      </div>

      <button id="completeToWorld" style="display:block;width:100%;margin-bottom:8px;padding:14px;background:linear-gradient(135deg,#ffd700,#ff8c00);color:#000;font-weight:700;border:none;border-radius:12px;cursor:pointer;font-size:1rem">
        🌍 월드맵으로
      </button>
      <button id="completeToModes" style="display:block;width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:12px;cursor:pointer">
        🏠 미션 선택으로
      </button>
    </div>
  </div>`;

  G.screen = 'campaignComplete';
  G.modesCompleted.add('campaign_' + (c.id || ''));

  var toWorldBtn = document.getElementById('completeToWorld');
  if (toWorldBtn) toWorldBtn.addEventListener('click', function() { G.screen='campaign'; render(); });
  var toModesBtn = document.getElementById('completeToModes');
  if (toModesBtn) toModesBtn.addEventListener('click', function() { G.screen='modes'; render(); });
}

// ============================================
// END OF JRPG CAMPAIGN ENGINE
// ============================================

// ============================================
// HSEEP 훈련 설계 모듈
// FEMA HSEEP 기반 재난 훈련 설계 마스터
// ============================================

// ---- 유틸리티: HSEEP 퀴즈 문제 ID로 조회 ----
function hseepGetQuestionById(id) {
  var q = HSEEP_QUIZ_QUESTIONS;
  if (!q) return null;
  var cats = Object.values(q);
  for (var i = 0; i < cats.length; i++) {
    var found = cats[i].find(function(item) { return item.id === id; });
    if (found) return found;
  }
  return null;
}

// ============================================
// STEP 4A: renderHSEEPMenu()
// ============================================
function renderHSEEPMenu() {
  var app = $('app');
  app.innerHTML = `
    <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:2.8rem;margin-bottom:8px">📋</div>
        <h2 style="font-size:1.4rem;font-weight:700;color:#e8eaf6;margin:0 0 6px">HSEEP 훈련 설계</h2>
        <p style="font-size:0.85rem;color:#8b8fa3;margin:0">FEMA HSEEP 기반 재난 훈련 설계 마스터</p>
      </div>

      <div id="hseepMenuGrid" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">

        <button class="hseep-menu-card" id="hseepBtnQuiz"
          style="background:linear-gradient(135deg,rgba(33,150,243,0.15),rgba(0,188,212,0.08));border:1px solid rgba(33,150,243,0.35);border-radius:16px;padding:18px 20px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:center;gap:16px;transition:all 0.2s">
          <div style="font-size:2rem;flex-shrink:0">📝</div>
          <div>
            <div style="font-size:1rem;font-weight:700;margin-bottom:4px">HSEEP 퀴즈</div>
            <div style="font-size:0.8rem;color:#8b8fa3">135문제 — 8개 카테고리</div>
            <div style="margin-top:6px"><span style="background:rgba(33,150,243,0.2);color:#42a5f5;font-size:0.7rem;padding:2px 8px;border-radius:20px">퀴즈</span></div>
          </div>
        </button>

        <button class="hseep-menu-card" id="hseepBtnScenario"
          style="background:linear-gradient(135deg,rgba(76,175,80,0.15),rgba(139,195,74,0.08));border:1px solid rgba(76,175,80,0.35);border-radius:16px;padding:18px 20px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:center;gap:16px;transition:all 0.2s">
          <div style="font-size:2rem;flex-shrink:0">🏗️</div>
          <div>
            <div style="font-size:1rem;font-weight:700;margin-bottom:4px">훈련 설계 실습</div>
            <div style="font-size:0.8rem;color:#8b8fa3">8개 시나리오로 실제 훈련 제작</div>
            <div style="margin-top:6px"><span style="background:rgba(76,175,80,0.2);color:#66bb6a;font-size:0.7rem;padding:2px 8px;border-radius:20px">실습</span></div>
          </div>
        </button>

        <button class="hseep-menu-card" id="hseepBtnTemplate"
          style="background:linear-gradient(135deg,rgba(156,39,176,0.15),rgba(233,30,99,0.08));border:1px solid rgba(156,39,176,0.35);border-radius:16px;padding:18px 20px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:center;gap:16px;transition:all 0.2s">
          <div style="font-size:2rem;flex-shrink:0">📄</div>
          <div>
            <div style="font-size:1rem;font-weight:700;margin-bottom:4px">템플릿 빌더</div>
            <div style="font-size:0.8rem;color:#8b8fa3">SitMan / ExPlan / MSEL / EEG / AAR 작성</div>
            <div style="margin-top:6px"><span style="background:rgba(156,39,176,0.2);color:#ce93d8;font-size:0.7rem;padding:2px 8px;border-radius:20px">문서</span></div>
          </div>
        </button>

        <button class="hseep-menu-card" id="hseepBtnCampaign"
          style="background:linear-gradient(135deg,rgba(255,152,0,0.15),rgba(255,193,7,0.08));border:1px solid rgba(255,152,0,0.35);border-radius:16px;padding:18px 20px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:center;gap:16px;transition:all 0.2s">
          <div style="font-size:2rem;flex-shrink:0">⚔️</div>
          <div>
            <div style="font-size:1rem;font-weight:700;margin-bottom:4px">HSEEP 캠페인</div>
            <div style="font-size:0.8rem;color:#8b8fa3">10챕터 RPG 모드 — 입문자에서 마스터로</div>
            <div style="margin-top:6px"><span style="background:rgba(255,152,0,0.2);color:#ffb74d;font-size:0.7rem;padding:2px 8px;border-radius:20px">RPG</span></div>
          </div>
        </button>

      </div>

      <button id="hseepBackBtn"
        style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:12px;cursor:pointer;font-size:0.9rem">
        ← 미션 선택
      </button>
    </div>`;

  document.getElementById('hseepBtnQuiz').addEventListener('click', function() {
    G.hseepState = { phase: 'categorySelect', category: null, questionIndex: 0, score: 0, total: 0, answered: false };
    G.screen = 'hseepQuiz';
    render();
  });
  document.getElementById('hseepBtnScenario').addEventListener('click', function() {
    G.hseepScenarioState = { phase: 'list', scenarioIndex: 0, stepIndex: 0, score: 0, answered: false };
    G.screen = 'hseepScenario';
    render();
  });
  document.getElementById('hseepBtnTemplate').addEventListener('click', function() {
    G.hseepTemplateState = { phase: 'list', templateKey: null, sectionIndex: 0, answered: false };
    G.screen = 'hseepTemplate';
    render();
  });
  document.getElementById('hseepBtnCampaign').addEventListener('click', function() {
    G.hseepCampaignState = G.hseepCampaignState || { currentChapter: 1, questionIndex: 0, score: 0, chaptersCompleted: [] };
    G.screen = 'hseepCampaign';
    render();
  });
  document.getElementById('hseepBackBtn').addEventListener('click', function() {
    G.screen = 'modes';
    render();
  });
}

// ============================================
// STEP 4B: renderHSEEPQuiz()
// ============================================
function renderHSEEPQuiz() {
  var app = $('app');
  var qs = HSEEP_QUIZ_QUESTIONS;
  var state = G.hseepState;

  if (!qs) {
    app.innerHTML = '<div class="screen" style="padding:20px;text-align:center"><p style="color:#ef5350">HSEEP 퀴즈 데이터를 불러올 수 없습니다.</p><button id="hseepQuizErrBack" style="padding:10px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:10px;cursor:pointer">← 메뉴로</button></div>';
    document.getElementById('hseepQuizErrBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
    return;
  }

  // Category selection
  if (!state || state.phase === 'categorySelect') {
    var catMeta = {
      doctrine:           { name: 'HSEEP 기본 교리',              icon: '📖', color: '#42a5f5' },
      exercise_types:     { name: '7가지 훈련 유형',              icon: '🎯', color: '#66bb6a' },
      design_development: { name: '설계·개발',                    icon: '🏗️', color: '#ab47bc' },
      conduct:            { name: '훈련 실행',                    icon: '▶️', color: '#ff7043' },
      evaluation:         { name: '평가 방법론',                  icon: '📊', color: '#26c6da' },
      improvement:        { name: '개선 계획',                    icon: '🔧', color: '#ffca28' },
      documents:          { name: '핵심 문서·템플릿',             icon: '📄', color: '#ec407a' },
      core_capabilities:  { name: '국가 준비 목표 32개 핵심 역량', icon: '🏛️', color: '#78909c' }
    };

    var cardsHtml = Object.keys(qs).map(function(key) {
      var m = catMeta[key] || { name: key, icon: '❓', color: '#90a4ae' };
      var count = qs[key].length;
      return '<button class="hseep-cat-btn" data-cat="' + key + '" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 16px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:center;gap:12px;transition:all 0.2s;width:100%">' +
        '<span style="font-size:1.5rem">' + m.icon + '</span>' +
        '<div style="flex:1"><div style="font-weight:600;font-size:0.9rem">' + m.name + '</div><div style="font-size:0.75rem;color:#8b8fa3">' + count + '문제</div></div>' +
        '<span style="font-size:0.75rem;padding:3px 10px;border-radius:20px;background:rgba(255,255,255,0.08);color:' + m.color + '">시작 →</span>' +
        '</button>';
    }).join('');

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <button id="hseepQuizBack" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#8b8fa3;cursor:pointer">←</button>
          <div>
            <div style="font-size:1rem;font-weight:700;color:#e8eaf6">📝 HSEEP 퀴즈</div>
            <div style="font-size:0.75rem;color:#8b8fa3">카테고리 선택</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">${cardsHtml}</div>
      </div>`;

    document.getElementById('hseepQuizBack').addEventListener('click', function() {
      G.screen = 'hseepMenu'; render();
    });
    document.querySelectorAll('.hseep-cat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var cat = btn.getAttribute('data-cat');
        var questions = qs[cat] || [];
        var shuffled = questions.slice().sort(function() { return Math.random() - 0.5; });
        G.hseepState = { phase: 'quiz', category: cat, questions: shuffled, questionIndex: 0, score: 0, total: shuffled.length, answered: false, selected: -1 };
        Tracker.startMode('hseep_quiz');
        render();
      });
    });
    return;
  }

  // Active quiz
  if (state.phase === 'quiz') {
    var questions = state.questions || [];
    if (state.questionIndex >= questions.length) {
      // Results
      var pct = Math.round((state.score / Math.max(state.total, 1)) * 100);
      var grade = getGrade(pct);
      var gradeColor = grade === 'S' ? '#ffd700' : grade === 'A' ? '#66bb6a' : grade === 'B' ? '#42a5f5' : '#ef5350';
      app.innerHTML = `
        <div class="screen results-screen" style="padding:20px;max-width:480px;margin:0 auto">
          <div style="text-align:center;margin-bottom:24px">
            <div style="font-size:3rem;margin-bottom:8px">📋</div>
            <div style="font-size:0.85rem;color:#8b8fa3;margin-bottom:8px">HSEEP 퀴즈 완료</div>
            <div style="font-size:3rem;font-weight:900;color:${gradeColor}">${grade}</div>
          </div>
          <div class="result-stats anim-in" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
            <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:14px">
              <div style="font-size:1.4rem;font-weight:700;color:#e8eaf6">${state.score}/${state.total}</div>
              <div style="font-size:0.7rem;color:#8b8fa3">정답</div>
            </div>
            <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:14px">
              <div style="font-size:1.4rem;font-weight:700;color:#e8eaf6">${pct}%</div>
              <div style="font-size:0.7rem;color:#8b8fa3">정확도</div>
            </div>
            <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:12px;padding:14px">
              <div style="font-size:1.4rem;font-weight:700;color:#e8eaf6">${state.total}</div>
              <div style="font-size:0.7rem;color:#8b8fa3">총 문제</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button id="hseepQuizRetry" style="padding:14px;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;border:none;border-radius:12px;cursor:pointer;font-size:0.95rem;font-weight:600">🔄 같은 카테고리 재도전</button>
            <button id="hseepQuizOther" style="padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:12px;cursor:pointer">다른 카테고리 선택</button>
            <button id="hseepQuizMenu" style="padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#6b6f82;border-radius:12px;cursor:pointer">← HSEEP 메뉴</button>
          </div>
        </div>`;
      G.score = (G.score || 0) + state.score * 10;
      Tracker.endMode(state.score);
      if (grade === 'S' || grade === 'A') { try { confetti(); } catch(e) {} }

      document.getElementById('hseepQuizRetry').addEventListener('click', function() {
        var cat = state.category;
        var questions2 = (HSEEP_QUIZ_QUESTIONS[cat] || []).slice().sort(function() { return Math.random() - 0.5; });
        G.hseepState = { phase: 'quiz', category: cat, questions: questions2, questionIndex: 0, score: 0, total: questions2.length, answered: false, selected: -1 };
        Tracker.startMode('hseep_quiz');
        render();
      });
      document.getElementById('hseepQuizOther').addEventListener('click', function() {
        G.hseepState = { phase: 'categorySelect' };
        G.screen = 'hseepQuiz'; render();
      });
      document.getElementById('hseepQuizMenu').addEventListener('click', function() {
        G.screen = 'hseepMenu'; render();
      });
      return;
    }

    var q = questions[state.questionIndex];
    var progress = state.questionIndex + 1;
    var progressPct = Math.round((progress / state.total) * 100);

    var optsHtml = (q.o || q.options || []).map(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var cls = '';
      var style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);';
      if (state.answered) {
        if (i === (q.a !== undefined ? q.a : q.answer)) {
          style = 'background:rgba(76,175,80,0.2);border:1px solid rgba(76,175,80,0.5);';
        } else if (i === state.selected && i !== (q.a !== undefined ? q.a : q.answer)) {
          style = 'background:rgba(244,67,54,0.2);border:1px solid rgba(244,67,54,0.5);';
        }
      }
      var optText = typeof opt === 'object' ? opt.text : opt;
      return '<button class="hseep-opt" data-idx="' + i + '" ' + (state.answered ? 'disabled' : '') + ' style="width:100%;' + style + 'border-radius:10px;padding:12px 14px;text-align:left;cursor:' + (state.answered ? 'default' : 'pointer') + ';color:#e8eaf6;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">' +
        '<span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:2px 7px;font-size:0.8rem;font-weight:700;flex-shrink:0">' + letter + '</span>' +
        '<span style="font-size:0.88rem;line-height:1.5">' + optText + '</span>' +
        '</button>';
    }).join('');

    var expHtml = state.answered ? `
      <div style="background:rgba(33,150,243,0.1);border:1px solid rgba(33,150,243,0.3);border-radius:10px;padding:14px;margin-top:12px;font-size:0.83rem;color:#90caf9;line-height:1.6">
        💡 ${q.exp || q.explanation || ''}
      </div>
      <button id="hseepQuizNext" style="width:100%;margin-top:12px;padding:14px;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;border:none;border-radius:12px;cursor:pointer;font-size:0.95rem;font-weight:600">
        ${state.questionIndex + 1 >= state.total ? '결과 보기 ✓' : '다음 문제 →'}
      </button>` : '';

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <button id="hseepQuizExit" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:5px 10px;color:#8b8fa3;cursor:pointer;font-size:0.8rem">✕ 종료</button>
          <span style="font-size:0.8rem;color:#8b8fa3">${progress} / ${state.total}</span>
          <span style="font-size:0.8rem;color:#66bb6a">정답: ${state.score}</span>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:6px;margin-bottom:16px;overflow:hidden">
          <div style="background:linear-gradient(90deg,#1565c0,#42a5f5);height:100%;width:${progressPct}%;transition:width 0.3s"></div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;margin-bottom:14px">
          <div style="font-size:0.75rem;color:#42a5f5;margin-bottom:8px">📋 ${q.category || state.category || ''}</div>
          <div style="font-size:0.95rem;font-weight:600;color:#e8eaf6;line-height:1.6">${q.q || q.question || ''}</div>
        </div>
        <div>${optsHtml}</div>
        ${expHtml}
      </div>`;

    document.getElementById('hseepQuizExit').addEventListener('click', function() {
      G.hseepState = { phase: 'categorySelect' };
      G.screen = 'hseepQuiz'; render();
    });

    if (!state.answered) {
      document.querySelectorAll('.hseep-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (state.answered) return;
          var idx = parseInt(btn.getAttribute('data-idx'));
          state.selected = idx;
          state.answered = true;
          var correct = q.a !== undefined ? q.a : q.answer;
          if (idx === correct) {
            state.score++;
            try { sfx('correct'); } catch(e) {}
          } else {
            try { sfx('wrong'); } catch(e) {}
          }
          render();
        });
      });
    } else {
      var nextBtn = document.getElementById('hseepQuizNext');
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          state.questionIndex++;
          state.answered = false;
          state.selected = -1;
          render();
        });
      }
    }
  }
}

// ============================================
// STEP 4C: renderHSEEPScenario()
// ============================================
function renderHSEEPScenario() {
  var app = $('app');
  var scenarios = HSEEP_SCENARIOS;
  var state = G.hseepScenarioState;

  if (!scenarios || scenarios.length === 0) {
    app.innerHTML = '<div class="screen" style="padding:20px;text-align:center"><p style="color:#ef5350">시나리오 데이터를 불러올 수 없습니다.</p><button id="hseepScenBack" style="padding:10px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:10px;cursor:pointer">← 메뉴로</button></div>';
    document.getElementById('hseepScenBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
    return;
  }

  if (!state || state.phase === 'list') {
    var diffColor = { easy: '#66bb6a', normal: '#42a5f5', hard: '#ef5350', 'very_hard': '#ab47bc' };
    var listHtml = scenarios.map(function(sc, i) {
      var dc = diffColor[sc.difficulty] || '#90a4ae';
      return '<button class="hseep-sc-btn" data-idx="' + i + '" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 16px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:center;gap:12px;width:100%;margin-bottom:8px">' +
        '<div style="flex:1">' +
          '<div style="font-weight:600;font-size:0.9rem;margin-bottom:3px">' + sc.title + '</div>' +
          '<div style="font-size:0.75rem;color:#8b8fa3;margin-bottom:6px">' + sc.subtitle + '</div>' +
          '<div style="display:flex;gap:6px">' +
            '<span style="font-size:0.7rem;padding:2px 8px;border-radius:20px;background:rgba(255,255,255,0.08);color:' + dc + '">' + sc.difficulty + '</span>' +
            '<span style="font-size:0.7rem;padding:2px 8px;border-radius:20px;background:rgba(255,255,255,0.06);color:#8b8fa3">' + sc.exerciseType + '</span>' +
            '<span style="font-size:0.7rem;padding:2px 8px;border-radius:20px;background:rgba(255,255,255,0.06);color:#8b8fa3">⚡ ' + sc.totalXP + 'XP</span>' +
          '</div>' +
        '</div>' +
        '<span style="color:#42a5f5;font-size:1.2rem">›</span>' +
        '</button>';
    }).join('');

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <button id="hseepScenBack" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#8b8fa3;cursor:pointer">←</button>
          <div>
            <div style="font-size:1rem;font-weight:700;color:#e8eaf6">🏗️ 훈련 설계 실습</div>
            <div style="font-size:0.75rem;color:#8b8fa3">시나리오를 선택하세요</div>
          </div>
        </div>
        <div>${listHtml}</div>
      </div>`;

    document.getElementById('hseepScenBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
    document.querySelectorAll('.hseep-sc-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(btn.getAttribute('data-idx'));
        G.hseepScenarioState = { phase: 'step', scenarioIndex: idx, stepIndex: 0, score: 0, answered: false, selected: -1, built: [] };
        Tracker.startMode('hseep_scenario');
        render();
      });
    });
    return;
  }

  if (state.phase === 'step') {
    var sc = scenarios[state.scenarioIndex];
    if (!sc) { G.hseepScenarioState = { phase: 'list' }; render(); return; }
    var steps = sc.steps || [];

    if (state.stepIndex >= steps.length) {
      // Final product
      var totalXP = sc.totalXP || 0;
      var scorePct = Math.round((state.score / Math.max(steps.length, 1)) * 100);
      var earnedXP = Math.round(totalXP * (state.score / Math.max(steps.length, 1)));
      G.score = (G.score || 0) + earnedXP;
      Tracker.endMode(state.score);

      var builtHtml = (state.built || []).map(function(item) {
        return '<div style="background:rgba(76,175,80,0.08);border:1px solid rgba(76,175,80,0.25);border-radius:8px;padding:8px 12px;font-size:0.78rem;color:#a5d6a7;line-height:1.5;margin-bottom:6px">✓ ' + item + '</div>';
      }).join('');

      app.innerHTML = `
        <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
          <div style="text-align:center;margin-bottom:20px">
            <div style="font-size:2.5rem;margin-bottom:8px">🏗️</div>
            <div style="font-size:1.2rem;font-weight:700;color:#e8eaf6;margin-bottom:4px">${sc.completionBadge || sc.title}</div>
            <div style="font-size:0.85rem;color:#66bb6a">+${earnedXP} XP 획득</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;margin-bottom:16px">
            <div style="font-size:0.8rem;font-weight:600;color:#8b8fa3;margin-bottom:10px">완성된 훈련 패키지</div>
            <div style="font-size:0.85rem;color:#e8eaf6;font-weight:600;margin-bottom:10px">${sc.finalProduct || ''}</div>
            ${builtHtml}
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button id="hseepScenRetry" style="padding:13px;background:linear-gradient(135deg,rgba(76,175,80,0.3),rgba(76,175,80,0.2));border:1px solid rgba(76,175,80,0.4);color:#66bb6a;border-radius:12px;cursor:pointer;font-weight:600">🔄 재도전</button>
            <button id="hseepScenList" style="padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:12px;cursor:pointer">다른 시나리오</button>
            <button id="hseepScenMenu" style="padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:#6b6f82;border-radius:12px;cursor:pointer">← HSEEP 메뉴</button>
          </div>
        </div>`;

      document.getElementById('hseepScenRetry').addEventListener('click', function() {
        G.hseepScenarioState = { phase: 'step', scenarioIndex: state.scenarioIndex, stepIndex: 0, score: 0, answered: false, selected: -1, built: [] };
        Tracker.startMode('hseep_scenario');
        render();
      });
      document.getElementById('hseepScenList').addEventListener('click', function() {
        G.hseepScenarioState = { phase: 'list' }; render();
      });
      document.getElementById('hseepScenMenu').addEventListener('click', function() {
        G.screen = 'hseepMenu'; render();
      });
      return;
    }

    var step = steps[state.stepIndex];
    var stepNum = state.stepIndex + 1;
    var progressPct = Math.round((stepNum / steps.length) * 100);

    var optsHtml2 = (step.options || []).map(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);';
      if (state.answered) {
        if (i === step.correct) {
          style = 'background:rgba(76,175,80,0.2);border:1px solid rgba(76,175,80,0.5);';
        } else if (i === state.selected && i !== step.correct) {
          style = 'background:rgba(244,67,54,0.2);border:1px solid rgba(244,67,54,0.5);';
        }
      }
      return '<button class="hseep-sc-opt" data-idx="' + i + '" ' + (state.answered ? 'disabled' : '') +
        ' style="width:100%;' + style + 'border-radius:10px;padding:12px 14px;text-align:left;cursor:' + (state.answered ? 'default' : 'pointer') + ';color:#e8eaf6;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">' +
        '<span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:2px 7px;font-size:0.8rem;font-weight:700;flex-shrink:0">' + letter + '</span>' +
        '<span style="font-size:0.88rem;line-height:1.5">' + opt + '</span>' +
        '</button>';
    }).join('');

    var scExpHtml = state.answered ? `
      <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.3);border-radius:10px;padding:12px;margin-top:12px;font-size:0.82rem;color:#a5d6a7;line-height:1.6">
        ✅ ${step.feedback || ''}
      </div>
      <div style="background:rgba(33,150,243,0.08);border:1px solid rgba(33,150,243,0.2);border-radius:8px;padding:10px 12px;margin-top:8px;font-size:0.78rem;color:#90caf9;line-height:1.5">
        📝 ${step.templateOutput || ''}
      </div>
      <button id="hseepScNext" style="width:100%;margin-top:12px;padding:13px;background:linear-gradient(135deg,rgba(76,175,80,0.3),rgba(76,175,80,0.2));border:1px solid rgba(76,175,80,0.4);color:#66bb6a;border-radius:12px;cursor:pointer;font-weight:600">
        ${state.stepIndex + 1 >= steps.length ? '최종 결과 보기 ✓' : '다음 단계 →'}
      </button>` : '';

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <button id="hseepScExit" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:5px 10px;color:#8b8fa3;cursor:pointer;font-size:0.8rem">✕ 종료</button>
          <span style="font-size:0.8rem;color:#8b8fa3">단계 ${stepNum} / ${steps.length}</span>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:6px;margin-bottom:16px;overflow:hidden">
          <div style="background:linear-gradient(90deg,#2e7d32,#66bb6a);height:100%;width:${progressPct}%;transition:width 0.3s"></div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:12px">
          <div style="font-size:0.75rem;font-weight:600;color:#66bb6a;margin-bottom:6px">${step.phase || ''}</div>
          <div style="font-size:0.9rem;font-weight:600;color:#e8eaf6;line-height:1.6">${step.prompt || ''}</div>
        </div>
        <div>${optsHtml2}</div>
        ${scExpHtml}
      </div>`;

    document.getElementById('hseepScExit').addEventListener('click', function() {
      G.hseepScenarioState = { phase: 'list' }; render();
    });

    if (!state.answered) {
      document.querySelectorAll('.hseep-sc-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (state.answered) return;
          var idx = parseInt(btn.getAttribute('data-idx'));
          state.selected = idx;
          state.answered = true;
          if (idx === step.correct) {
            state.score++;
            try { sfx('correct'); } catch(e) {}
          } else {
            try { sfx('wrong'); } catch(e) {}
          }
          render();
        });
      });
    } else {
      var nextBtn2 = document.getElementById('hseepScNext');
      if (nextBtn2) {
        nextBtn2.addEventListener('click', function() {
          if (step.templateOutput) {
            state.built = state.built || [];
            state.built.push(step.templateOutput);
          }
          state.stepIndex++;
          state.answered = false;
          state.selected = -1;
          render();
        });
      }
    }
  }
}

// ============================================
// STEP 4D: renderHSEEPTemplate()
// ============================================
function renderHSEEPTemplate() {
  var app = $('app');
  var templates = HSEEP_TEMPLATES;
  var state = G.hseepTemplateState;

  if (!templates) {
    app.innerHTML = '<div class="screen" style="padding:20px;text-align:center"><p style="color:#ef5350">템플릿 데이터를 불러올 수 없습니다.</p><button id="hseepTplBack" style="padding:10px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:10px;cursor:pointer">← 메뉴로</button></div>';
    document.getElementById('hseepTplBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
    return;
  }

  if (!state || state.phase === 'list') {
    var tplMeta = {
      sitman:  { icon: '📘', color: '#42a5f5' },
      explan:  { icon: '📗', color: '#66bb6a' },
      msel:    { icon: '📙', color: '#ffca28' },
      eeg:     { icon: '📕', color: '#ef5350' },
      aar_ip:  { icon: '📔', color: '#ab47bc' }
    };

    var tplListHtml = Object.keys(templates).map(function(key) {
      var tpl = templates[key];
      var meta = tplMeta[key] || { icon: '📄', color: '#90a4ae' };
      var secCount = (tpl.sections || []).length;
      return '<button class="hseep-tpl-btn" data-key="' + key + '" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 16px;text-align:left;cursor:pointer;color:#e8eaf6;display:flex;align-items:flex-start;gap:14px;width:100%;margin-bottom:8px">' +
        '<span style="font-size:1.8rem;flex-shrink:0">' + meta.icon + '</span>' +
        '<div style="flex:1">' +
          '<div style="font-weight:700;font-size:0.9rem;color:' + meta.color + ';margin-bottom:3px">' + tpl.name + '</div>' +
          '<div style="font-size:0.75rem;color:#8b8fa3;margin-bottom:6px;line-height:1.4">' + tpl.description + '</div>' +
          '<div style="font-size:0.7rem;color:#6b6f82">' + secCount + '개 섹션 · ' + (tpl.usedFor || []).join(', ') + '</div>' +
        '</div>' +
        '</button>';
    }).join('');

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <button id="hseepTplBack" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#8b8fa3;cursor:pointer">←</button>
          <div>
            <div style="font-size:1rem;font-weight:700;color:#e8eaf6">📄 템플릿 빌더</div>
            <div style="font-size:0.75rem;color:#8b8fa3">HSEEP 공식 문서 작성법 마스터</div>
          </div>
        </div>
        <div>${tplListHtml}</div>
      </div>`;

    document.getElementById('hseepTplBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
    document.querySelectorAll('.hseep-tpl-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var key = btn.getAttribute('data-key');
        G.hseepTemplateState = { phase: 'section', templateKey: key, sectionIndex: 0, answered: false, selected: -1, built: [] };
        Tracker.startMode('hseep_template');
        render();
      });
    });
    return;
  }

  if (state.phase === 'section') {
    var tpl = templates[state.templateKey];
    if (!tpl) { G.hseepTemplateState = { phase: 'list' }; render(); return; }
    var sections = tpl.sections || [];

    if (state.sectionIndex >= sections.length) {
      // Template complete
      var builtHtml2 = (state.built || []).map(function(item) {
        return '<div style="background:rgba(33,150,243,0.08);border-left:3px solid #1565c0;padding:8px 12px;margin-bottom:8px;border-radius:0 8px 8px 0;font-size:0.78rem;color:#90caf9;line-height:1.5">' + item + '</div>';
      }).join('');

      app.innerHTML = `
        <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
          <div style="text-align:center;margin-bottom:20px">
            <div style="font-size:2.5rem;margin-bottom:8px">📄</div>
            <div style="font-size:1.1rem;font-weight:700;color:#e8eaf6;margin-bottom:4px">${tpl.name} 완성!</div>
            <div style="font-size:0.82rem;color:#8b8fa3">💡 ${tpl.tipText || ''}</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;margin-bottom:16px">
            <div style="font-size:0.8rem;font-weight:600;color:#8b8fa3;margin-bottom:10px">작성된 템플릿</div>
            ${builtHtml2}
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button id="hseepTplRetry" style="padding:13px;background:linear-gradient(135deg,rgba(156,39,176,0.3),rgba(156,39,176,0.2));border:1px solid rgba(156,39,176,0.4);color:#ce93d8;border-radius:12px;cursor:pointer;font-weight:600">🔄 다시 작성</button>
            <button id="hseepTplOther" style="padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:12px;cursor:pointer">다른 템플릿</button>
            <button id="hseepTplMenu" style="padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:#6b6f82;border-radius:12px;cursor:pointer">← HSEEP 메뉴</button>
          </div>
        </div>`;

      G.score = (G.score || 0) + (sections.length * 15);
      Tracker.endMode(sections.length);
      document.getElementById('hseepTplRetry').addEventListener('click', function() {
        G.hseepTemplateState = { phase: 'section', templateKey: state.templateKey, sectionIndex: 0, answered: false, selected: -1, built: [] };
        render();
      });
      document.getElementById('hseepTplOther').addEventListener('click', function() {
        G.hseepTemplateState = { phase: 'list' }; render();
      });
      document.getElementById('hseepTplMenu').addEventListener('click', function() {
        G.screen = 'hseepMenu'; render();
      });
      return;
    }

    var sec = sections[state.sectionIndex];
    var secNum = state.sectionIndex + 1;
    var progressPct2 = Math.round((secNum / sections.length) * 100);

    // Built so far
    var builtSoFar = (state.built || []).map(function(item, i) {
      return '<div style="border-left:3px solid #1565c0;padding:4px 10px;margin-bottom:4px;font-size:0.75rem;color:#90caf9;opacity:0.8">' + item + '</div>';
    }).join('');

    if (sec.type === 'info') {
      // Just info + example
      app.innerHTML = `
        <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <button id="hseepTplExit" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:5px 10px;color:#8b8fa3;cursor:pointer;font-size:0.8rem">✕</button>
            <span style="font-size:0.8rem;color:#8b8fa3">${secNum} / ${sections.length}</span>
          </div>
          <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:4px;margin-bottom:16px;overflow:hidden">
            <div style="background:linear-gradient(90deg,#6a1b9a,#ab47bc);height:100%;width:${progressPct2}%;transition:width 0.3s"></div>
          </div>
          <div style="margin-bottom:12px">
            <div style="font-size:0.75rem;font-weight:700;color:#ab47bc;margin-bottom:6px">${sec.label || ''}</div>
            <div style="background:rgba(156,39,176,0.08);border:1px solid rgba(156,39,176,0.25);border-radius:10px;padding:14px;font-size:0.85rem;color:#e8eaf6;line-height:1.7">${sec.content || ''}</div>
          </div>
          ${sec.templateExample ? `
          <div style="background:rgba(33,150,243,0.06);border:1px solid rgba(33,150,243,0.2);border-radius:10px;padding:12px;font-size:0.78rem;color:#90caf9;line-height:1.6;white-space:pre-line;margin-bottom:16px">📝 예시:<br>${sec.templateExample}</div>` : ''}
          <button id="hseepTplNext" style="width:100%;padding:13px;background:linear-gradient(135deg,rgba(156,39,176,0.3),rgba(156,39,176,0.2));border:1px solid rgba(156,39,176,0.4);color:#ce93d8;border-radius:12px;cursor:pointer;font-weight:600">
            ${secNum >= sections.length ? '완성! ✓' : '다음 섹션 →'}
          </button>
        </div>`;

      document.getElementById('hseepTplExit').addEventListener('click', function() {
        G.hseepTemplateState = { phase: 'list' }; render();
      });
      document.getElementById('hseepTplNext').addEventListener('click', function() {
        if (sec.templateExample) {
          state.built = state.built || [];
          state.built.push(sec.label + ': ' + (sec.templateExample || '').substring(0, 80) + '...');
        }
        state.sectionIndex++;
        state.answered = false;
        state.selected = -1;
        render();
      });
      return;
    }

    // Quiz section
    var secOptsHtml = (sec.options || []).map(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);';
      if (state.answered) {
        if (i === sec.correct) {
          style = 'background:rgba(76,175,80,0.2);border:1px solid rgba(76,175,80,0.5);';
        } else if (i === state.selected && i !== sec.correct) {
          style = 'background:rgba(244,67,54,0.2);border:1px solid rgba(244,67,54,0.5);';
        }
      }
      return '<button class="hseep-tpl-opt" data-idx="' + i + '" ' + (state.answered ? 'disabled' : '') +
        ' style="width:100%;' + style + 'border-radius:10px;padding:12px 14px;text-align:left;cursor:' + (state.answered ? 'default' : 'pointer') + ';color:#e8eaf6;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">' +
        '<span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:2px 7px;font-size:0.8rem;font-weight:700;flex-shrink:0">' + letter + '</span>' +
        '<span style="font-size:0.88rem;line-height:1.5">' + opt + '</span>' +
        '</button>';
    }).join('');

    var tplExpHtml = state.answered ? `
      <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.3);border-radius:10px;padding:12px;margin-top:10px;font-size:0.82rem;color:#a5d6a7;line-height:1.6">
        💡 ${sec.feedback || ''}
      </div>
      ${sec.templateExample ? `<div style="background:rgba(33,150,243,0.06);border:1px solid rgba(33,150,243,0.2);border-radius:8px;padding:10px 12px;margin-top:8px;font-size:0.76rem;color:#90caf9;line-height:1.5;white-space:pre-line">📝 템플릿 예시:<br>${sec.templateExample}</div>` : ''}
      <button id="hseepTplNext" style="width:100%;margin-top:12px;padding:13px;background:linear-gradient(135deg,rgba(156,39,176,0.3),rgba(156,39,176,0.2));border:1px solid rgba(156,39,176,0.4);color:#ce93d8;border-radius:12px;cursor:pointer;font-weight:600">
        ${secNum >= sections.length ? '완성! ✓' : '다음 섹션 →'}
      </button>` : '';

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <button id="hseepTplExit" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:5px 10px;color:#8b8fa3;cursor:pointer;font-size:0.8rem">✕</button>
          <span style="font-size:0.8rem;color:#8b8fa3">${secNum} / ${sections.length}</span>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:4px;margin-bottom:16px;overflow:hidden">
          <div style="background:linear-gradient(90deg,#6a1b9a,#ab47bc);height:100%;width:${progressPct2}%;transition:width 0.3s"></div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;margin-bottom:12px">
          <div style="font-size:0.75rem;font-weight:700;color:#ab47bc;margin-bottom:6px">${sec.label || ''}</div>
          <div style="font-size:0.9rem;color:#e8eaf6;line-height:1.6;font-weight:600">${sec.question || ''}</div>
        </div>
        ${builtSoFar ? `<div style="background:rgba(21,101,192,0.08);border:1px solid rgba(21,101,192,0.2);border-radius:10px;padding:10px 12px;margin-bottom:12px"><div style="font-size:0.7rem;color:#42a5f5;margin-bottom:6px">📋 작성 중인 ${tpl.name}</div>${builtSoFar}</div>` : ''}
        <div>${secOptsHtml}</div>
        ${tplExpHtml}
      </div>`;

    document.getElementById('hseepTplExit').addEventListener('click', function() {
      G.hseepTemplateState = { phase: 'list' }; render();
    });

    if (!state.answered) {
      document.querySelectorAll('.hseep-tpl-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (state.answered) return;
          var idx = parseInt(btn.getAttribute('data-idx'));
          state.selected = idx;
          state.answered = true;
          if (idx === sec.correct) {
            try { sfx('correct'); } catch(e) {}
          } else {
            try { sfx('wrong'); } catch(e) {}
          }
          render();
        });
      });
    } else {
      var tplNextBtn = document.getElementById('hseepTplNext');
      if (tplNextBtn) {
        tplNextBtn.addEventListener('click', function() {
          if (sec.templateExample) {
            state.built = state.built || [];
            state.built.push(sec.label + ': ' + (sec.templateExample || '').substring(0, 80) + '...');
          }
          state.sectionIndex++;
          state.answered = false;
          state.selected = -1;
          render();
        });
      }
    }
  }
}

// ============================================
// STEP 4E: renderHSEEPCampaignMap()
// ============================================
function renderHSEEPCampaignMap() {
  var app = $('app');
  var campaign = HSEEP_CAMPAIGN;
  if (!campaign) {
    app.innerHTML = '<div class="screen" style="padding:20px;text-align:center"><p style="color:#ef5350">캠페인 데이터를 불러올 수 없습니다.</p><button id="hseepCampBack" style="padding:10px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:10px;cursor:pointer">← 메뉴로</button></div>';
    document.getElementById('hseepCampBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
    return;
  }

  var state = G.hseepCampaignState;
  var completed = state.chaptersCompleted || [];
  var totalXPEarned = state.totalXP || 0;
  var chapters = campaign.chapters || [];

  // Find current milestone
  var milestones = campaign.milestones || [];
  var curMilestone = milestones[0];
  for (var mi = milestones.length - 1; mi >= 0; mi--) {
    if (totalXPEarned >= milestones[mi].minXP) { curMilestone = milestones[mi]; break; }
  }

  var chapHtml = chapters.map(function(ch, i) {
    var isCompleted = completed.indexOf(ch.id) >= 0;
    var isUnlocked = ch.id === 1 || completed.indexOf(ch.id - 1) >= 0;
    var isCurrent = !isCompleted && isUnlocked;
    var borderColor = isCompleted ? 'rgba(255,215,0,0.5)' : isCurrent ? 'rgba(33,150,243,0.5)' : 'rgba(255,255,255,0.08)';
    var bg = isCompleted ? 'linear-gradient(135deg,rgba(255,215,0,0.12),rgba(255,140,0,0.06))'
           : isCurrent ? 'linear-gradient(135deg,rgba(33,150,243,0.12),rgba(0,188,212,0.06))'
           : 'rgba(255,255,255,0.02)';
    var statusIcon = isCompleted ? '✅' : isCurrent ? '▶️' : '🔒';
    var cursorStyle = isUnlocked ? 'pointer' : 'not-allowed';

    return '<button class="hseep-ch-btn" data-chid="' + ch.id + '" ' + (!isUnlocked ? 'disabled' : '') +
      ' style="background:' + bg + ';border:1px solid ' + borderColor + ';border-radius:12px;padding:14px 16px;text-align:left;cursor:' + cursorStyle + ';color:#e8eaf6;display:flex;align-items:center;gap:12px;width:100%;margin-bottom:8px">' +
      '<div style="font-size:1.8rem;flex-shrink:0">' + statusIcon + '</div>' +
      '<div style="flex:1">' +
        '<div style="font-size:0.75rem;color:#8b8fa3;margin-bottom:2px">제' + ch.id + '장</div>' +
        '<div style="font-weight:700;font-size:0.9rem;margin-bottom:2px;color:' + (isUnlocked ? '#e8eaf6' : '#6b6f82') + '">' + ch.title.replace('제' + ch.id + '장: ', '') + '</div>' +
        '<div style="font-size:0.75rem;color:' + (isUnlocked ? '#8b8fa3' : '#4a4e60') + '">' + ch.subtitle + '</div>' +
      '</div>' +
      '<div style="font-size:0.75rem;color:#8b8fa3;text-align:right;flex-shrink:0">XP<br>' + ch.xpGoal + '</div>' +
      '</button>';
  }).join('');

  app.innerHTML = `
    <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <button id="hseepCampBack" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:6px 12px;color:#8b8fa3;cursor:pointer">←</button>
        <div style="flex:1">
          <div style="font-size:1rem;font-weight:700;color:#e8eaf6">⚔️ HSEEP 캠페인</div>
          <div style="font-size:0.75rem;color:#8b8fa3">${campaign.subtitle}</div>
        </div>
      </div>
      <div style="background:linear-gradient(135deg,rgba(255,152,0,0.12),rgba(255,193,7,0.06));border:1px solid rgba(255,152,0,0.3);border-radius:12px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:0.75rem;color:#8b8fa3">현재 등급</div>
          <div style="font-weight:700;color:#ffb74d">${curMilestone ? curMilestone.title : '-'}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:0.75rem;color:#8b8fa3">총 XP</div>
          <div style="font-weight:700;color:#ffd700">${totalXPEarned}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:0.75rem;color:#8b8fa3">완료</div>
          <div style="font-weight:700;color:#66bb6a">${completed.length}/10</div>
        </div>
      </div>
      <div>${chapHtml}</div>
    </div>`;

  document.getElementById('hseepCampBack').addEventListener('click', function() { G.screen='hseepMenu'; render(); });
  document.querySelectorAll('.hseep-ch-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var chId = parseInt(btn.getAttribute('data-chid'));
      var ch = chapters.find(function(c) { return c.id === chId; });
      if (!ch) return;
      var isUnlocked = chId === 1 || completed.indexOf(chId - 1) >= 0;
      if (!isUnlocked) return;
      state.currentChapter = chId;
      state.questionIndex = 0;
      state.chapterScore = 0;
      state.phase = 'cinematic';
      G.screen = 'hseepCampaignChapter';
      render();
    });
  });
}

// ============================================
// STEP 4F: renderHSEEPCampaignChapter()
// ============================================
function renderHSEEPCampaignChapter() {
  var app = $('app');
  var campaign = HSEEP_CAMPAIGN;
  var state = G.hseepCampaignState;
  if (!campaign || !state) { G.screen = 'hseepCampaign'; render(); return; }

  var chapters = campaign.chapters || [];
  var ch = chapters.find(function(c) { return c.id === state.currentChapter; });
  if (!ch) { G.screen = 'hseepCampaign'; render(); return; }

  // Phase: cinematic
  if (!state.phase || state.phase === 'cinematic') {
    var cinText = (ch.cinematic && ch.cinematic.text) ? ch.cinematic.text.replace(/\n/g, '<br>') : '';
    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;justify-content:center">
        <div style="text-align:center;margin-bottom:20px">
          <div style="font-size:0.8rem;font-weight:600;color:#ffb74d;letter-spacing:2px;margin-bottom:8px">CHAPTER ${ch.id}</div>
          <div style="font-size:1.3rem;font-weight:700;color:#e8eaf6;margin-bottom:4px">${ch.title}</div>
          <div style="font-size:0.85rem;color:#8b8fa3">${ch.subtitle}</div>
        </div>
        <div style="background:rgba(255,152,0,0.06);border:1px solid rgba(255,152,0,0.2);border-radius:16px;padding:20px;margin-bottom:20px">
          <div style="font-size:0.85rem;color:#c8cad8;line-height:2">${cinText}</div>
          <div style="font-size:0.75rem;color:#6b6f82;margin-top:12px;font-style:italic">${(ch.cinematic && ch.cinematic.atmosphere) || ''}</div>
        </div>
        <button id="hseepCinContinue" style="width:100%;padding:14px;background:linear-gradient(135deg,rgba(255,152,0,0.3),rgba(255,193,7,0.2));border:1px solid rgba(255,152,0,0.4);color:#ffb74d;border-radius:12px;cursor:pointer;font-weight:700;font-size:1rem">
          브리핑 → 
        </button>
        <button id="hseepCinSkip" style="width:100%;margin-top:8px;padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:#4a4e60;border-radius:10px;cursor:pointer;font-size:0.8rem">
          챕터 맵으로 돌아가기
        </button>
      </div>`;

    document.getElementById('hseepCinContinue').addEventListener('click', function() {
      state.phase = 'briefing';
      render();
    });
    document.getElementById('hseepCinSkip').addEventListener('click', function() {
      G.screen = 'hseepCampaign'; render();
    });
    return;
  }

  // Phase: briefing
  if (state.phase === 'briefing') {
    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:0.75rem;color:#42a5f5;font-weight:600;letter-spacing:1px">임무 브리핑</div>
          <div style="font-size:1.1rem;font-weight:700;color:#e8eaf6;margin-top:4px">${ch.title}</div>
        </div>
        <div style="background:rgba(33,150,243,0.08);border:1px solid rgba(33,150,243,0.25);border-radius:14px;padding:18px;margin-bottom:20px">
          <div style="font-size:0.88rem;color:#c8cad8;line-height:1.8">${ch.briefing || ''}</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-around">
          <div style="text-align:center">
            <div style="font-size:0.7rem;color:#8b8fa3">목표 XP</div>
            <div style="font-weight:700;color:#ffd700">${ch.xpGoal}</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:0.7rem;color:#8b8fa3">문제 수</div>
            <div style="font-weight:700;color:#42a5f5">${(ch.questions || []).length}</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:0.7rem;color:#8b8fa3">제한 시간</div>
            <div style="font-weight:700;color:#ff7043">${ch.timeLimit || 40}분</div>
          </div>
        </div>
        <button id="hseepBriefStart" style="width:100%;padding:14px;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;border:none;border-radius:12px;cursor:pointer;font-weight:700;font-size:1rem">
          훈련 시작 ▶
        </button>
      </div>`;

    document.getElementById('hseepBriefStart').addEventListener('click', function() {
      // Resolve question IDs
      var questionIds = ch.questions || [];
      var resolved = questionIds.map(function(id) {
        return hseepGetQuestionById(id);
      }).filter(Boolean);
      if (resolved.length === 0) {
        // No questions found, skip to boss
        state.phase = 'boss';
        render();
        return;
      }
      state.resolvedQuestions = resolved;
      state.questionIndex = 0;
      state.chapterScore = 0;
      state.phase = 'questions';
      Tracker.startMode('hseep_campaign_ch' + ch.id);
      render();
    });
    return;
  }

  // Phase: questions
  if (state.phase === 'questions') {
    var questions = state.resolvedQuestions || [];
    if (state.questionIndex >= questions.length) {
      state.phase = 'boss';
      render();
      return;
    }

    var q = questions[state.questionIndex];
    var progress = state.questionIndex + 1;
    var progressPct = Math.round((progress / questions.length) * 100);

    var optsHtml = (q.o || []).map(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);';
      if (state.answered) {
        if (i === q.a) {
          style = 'background:rgba(76,175,80,0.2);border:1px solid rgba(76,175,80,0.5);';
        } else if (i === state.selected && i !== q.a) {
          style = 'background:rgba(244,67,54,0.2);border:1px solid rgba(244,67,54,0.5);';
        }
      }
      return '<button class="hseep-camp-opt" data-idx="' + i + '" ' + (state.answered ? 'disabled' : '') +
        ' style="width:100%;' + style + 'border-radius:10px;padding:12px 14px;text-align:left;cursor:' + (state.answered ? 'default' : 'pointer') + ';color:#e8eaf6;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">' +
        '<span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:2px 7px;font-size:0.8rem;font-weight:700;flex-shrink:0">' + letter + '</span>' +
        '<span style="font-size:0.88rem;line-height:1.5">' + opt + '</span>' +
        '</button>';
    }).join('');

    var expHtml2 = state.answered ? `
      <div style="background:rgba(33,150,243,0.1);border:1px solid rgba(33,150,243,0.3);border-radius:10px;padding:14px;margin-top:12px;font-size:0.82rem;color:#90caf9;line-height:1.6">
        💡 ${q.exp || ''}
      </div>
      <button id="hseepCampNext" style="width:100%;margin-top:12px;padding:13px;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;border:none;border-radius:12px;cursor:pointer;font-weight:600">
        ${state.questionIndex + 1 >= questions.length ? '보스 도전 →' : '다음 문제 →'}
      </button>` : '';

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="font-size:0.8rem;color:#ffb74d;font-weight:600">CH.${ch.id} — ${ch.levelTitle}</div>
          <div style="font-size:0.8rem;color:#8b8fa3">${progress}/${questions.length}</div>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:6px;margin-bottom:16px;overflow:hidden">
          <div style="background:linear-gradient(90deg,#e65100,#ffb74d);height:100%;width:${progressPct}%;transition:width 0.3s"></div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;margin-bottom:14px">
          <div style="font-size:0.95rem;font-weight:600;color:#e8eaf6;line-height:1.6">${q.q || ''}</div>
        </div>
        <div>${optsHtml}</div>
        ${expHtml2}
      </div>`;

    if (!state.answered) {
      document.querySelectorAll('.hseep-camp-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (state.answered) return;
          var idx = parseInt(btn.getAttribute('data-idx'));
          state.selected = idx;
          state.answered = true;
          if (idx === q.a) {
            state.chapterScore = (state.chapterScore || 0) + 1;
            try { sfx('correct'); } catch(e) {}
          } else {
            try { sfx('wrong'); } catch(e) {}
          }
          render();
        });
      });
    } else {
      var campNext = document.getElementById('hseepCampNext');
      if (campNext) {
        campNext.addEventListener('click', function() {
          state.questionIndex++;
          state.answered = false;
          state.selected = -1;
          render();
        });
      }
    }
    return;
  }

  // Phase: boss
  if (state.phase === 'boss') {
    var boss = ch.boss;
    if (!boss) { state.phase = 'result'; render(); return; }
    var bq = boss.question || {};

    var bOptsHtml = (bq.o || []).map(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var style = 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);';
      if (state.bossAnswered) {
        if (i === bq.a) {
          style = 'background:rgba(76,175,80,0.2);border:1px solid rgba(76,175,80,0.5);';
        } else if (i === state.bossSelected && i !== bq.a) {
          style = 'background:rgba(244,67,54,0.2);border:1px solid rgba(244,67,54,0.5);';
        }
      }
      return '<button class="hseep-boss-opt" data-idx="' + i + '" ' + (state.bossAnswered ? 'disabled' : '') +
        ' style="width:100%;' + style + 'border-radius:10px;padding:12px 14px;text-align:left;cursor:' + (state.bossAnswered ? 'default' : 'pointer') + ';color:#e8eaf6;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">' +
        '<span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:2px 7px;font-size:0.8rem;font-weight:700;flex-shrink:0">' + letter + '</span>' +
        '<span style="font-size:0.88rem;line-height:1.5">' + opt + '</span>' +
        '</button>';
    }).join('');

    var bExpHtml = state.bossAnswered ? `
      <div style="background:rgba(255,152,0,0.1);border:1px solid rgba(255,152,0,0.3);border-radius:10px;padding:12px;margin-top:10px;font-size:0.82rem;color:#ffcc80;line-height:1.6">
        💡 ${bq.exp || ''}
      </div>
      <div style="background:rgba(76,175,80,0.08);border:1px solid rgba(76,175,80,0.2);border-radius:10px;padding:12px;margin-top:8px;font-size:0.82rem;color:#a5d6a7;line-height:1.6">
        🏆 ${boss.reward || '챕터 완료!'}
      </div>
      <button id="hseepBossResult" style="width:100%;margin-top:12px;padding:14px;background:linear-gradient(135deg,rgba(255,152,0,0.3),rgba(255,193,7,0.2));border:1px solid rgba(255,152,0,0.4);color:#ffb74d;border-radius:12px;cursor:pointer;font-weight:700;font-size:1rem">
        결과 확인 →
      </button>` : '';

    app.innerHTML = `
      <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:2rem;margin-bottom:6px">⚔️</div>
          <div style="font-size:0.8rem;font-weight:700;color:#ff7043;letter-spacing:1px;margin-bottom:4px">보스 도전</div>
          <div style="font-size:1rem;font-weight:700;color:#e8eaf6">${boss.title || ''}</div>
        </div>
        <div style="background:rgba(255,69,0,0.08);border:1px solid rgba(255,69,0,0.25);border-radius:12px;padding:14px;margin-bottom:14px">
          <div style="font-size:0.85rem;color:#ffccbc;line-height:1.7;font-style:italic">"${boss.narrative || ''}"</div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;margin-bottom:12px">
          <div style="font-size:0.9rem;font-weight:600;color:#e8eaf6;line-height:1.6">${bq.q || ''}</div>
        </div>
        <div>${bOptsHtml}</div>
        ${bExpHtml}
      </div>`;

    if (!state.bossAnswered) {
      document.querySelectorAll('.hseep-boss-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (state.bossAnswered) return;
          var idx = parseInt(btn.getAttribute('data-idx'));
          state.bossSelected = idx;
          state.bossAnswered = true;
          if (idx === bq.a) {
            state.bossCorrect = true;
            try { sfx('correct'); } catch(e) {}
          } else {
            state.bossCorrect = false;
            try { sfx('wrong'); } catch(e) {}
          }
          render();
        });
      });
    } else {
      var bossResBtn = document.getElementById('hseepBossResult');
      if (bossResBtn) {
        bossResBtn.addEventListener('click', function() {
          state.phase = 'result';
          render();
        });
      }
    }
    return;
  }

  // Phase: result → redirect to result screen
  if (state.phase === 'result') {
    G.screen = 'hseepCampaignResult';
    render();
  }
}

// ============================================
// STEP 4G: renderHSEEPCampaignResult()
// ============================================
function renderHSEEPCampaignResult() {
  var app = $('app');
  var campaign = HSEEP_CAMPAIGN;
  var state = G.hseepCampaignState;
  if (!campaign || !state) { G.screen = 'hseepCampaign'; render(); return; }

  var chapters = campaign.chapters || [];
  var ch = chapters.find(function(c) { return c.id === state.currentChapter; });
  if (!ch) { G.screen = 'hseepCampaign'; render(); return; }

  var questionCount = (state.resolvedQuestions || []).length;
  var chScore = state.chapterScore || 0;
  var bossBonus = (state.bossCorrect) ? (ch.boss && ch.boss.question && ch.boss.question.xp ? ch.boss.question.xp : 200) : 0;
  var baseXP = Math.round((chScore / Math.max(questionCount, 1)) * (ch.xpGoal || 600));
  var totalEarned = baseXP + bossBonus;
  var pct = Math.round((chScore / Math.max(questionCount, 1)) * 100);
  var grade = getGrade(pct);
  var gradeColor = grade === 'S' ? '#ffd700' : grade === 'A' ? '#66bb6a' : grade === 'B' ? '#42a5f5' : '#ef5350';

  // Mark chapter as completed
  state.chaptersCompleted = state.chaptersCompleted || [];
  if (state.chaptersCompleted.indexOf(ch.id) < 0) {
    state.chaptersCompleted.push(ch.id);
    state.totalXP = (state.totalXP || 0) + totalEarned;
    G.score = (G.score || 0) + totalEarned;
    G.xp = (G.xp || 0) + totalEarned;
    Tracker.endMode(chScore);
    if (grade === 'S' || grade === 'A') { try { confetti(); } catch(e) {} }
  }

  // Find milestone for current XP
  var milestones = campaign.milestones || [];
  var curMilestone = milestones[0];
  var nextMilestone = null;
  for (var mi = milestones.length - 1; mi >= 0; mi--) {
    if ((state.totalXP || 0) >= milestones[mi].minXP) { curMilestone = milestones[mi]; nextMilestone = milestones[mi + 1] || null; break; }
  }

  var nextInfo = nextMilestone ? `
    <div style="font-size:0.75rem;color:#8b8fa3">다음 단계: <strong style="color:#42a5f5">${nextMilestone.title}</strong> (${nextMilestone.minXP} XP)</div>` : `
    <div style="font-size:0.75rem;color:#ffd700">🏆 최고 단계 달성!</div>`;

  app.innerHTML = `
    <div class="screen" style="padding:20px;max-width:480px;margin:0 auto">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:2.5rem;margin-bottom:8px">🏆</div>
        <div style="font-size:0.8rem;font-weight:600;color:#ffb74d;letter-spacing:1px">CHAPTER ${ch.id} 완료</div>
        <div style="font-size:1.2rem;font-weight:700;color:#e8eaf6;margin:6px 0">${ch.levelTitle}</div>
        <div style="font-size:3rem;font-weight:900;color:${gradeColor}">${grade}</div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:10px;padding:12px">
          <div style="font-size:1.2rem;font-weight:700;color:#e8eaf6">${chScore}/${questionCount}</div>
          <div style="font-size:0.7rem;color:#8b8fa3">정답</div>
        </div>
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:10px;padding:12px">
          <div style="font-size:1.2rem;font-weight:700;color:#ffd700">+${totalEarned}</div>
          <div style="font-size:0.7rem;color:#8b8fa3">XP 획득</div>
        </div>
        <div style="text-align:center;background:rgba(255,255,255,0.04);border-radius:10px;padding:12px">
          <div style="font-size:1.2rem;font-weight:700;color:${state.bossCorrect ? '#66bb6a' : '#ef5350'}">${state.bossCorrect ? '✅' : '✗'}</div>
          <div style="font-size:0.7rem;color:#8b8fa3">보스 도전</div>
        </div>
      </div>

      <div style="background:linear-gradient(135deg,rgba(255,152,0,0.1),rgba(255,193,7,0.05));border:1px solid rgba(255,152,0,0.25);border-radius:12px;padding:14px;margin-bottom:16px">
        <div style="font-size:0.75rem;color:#8b8fa3;margin-bottom:4px">현재 등급</div>
        <div style="font-weight:700;color:#ffb74d;margin-bottom:4px">${curMilestone ? curMilestone.title : '-'}</div>
        <div style="font-size:0.8rem;color:#c8cad8;margin-bottom:6px">${curMilestone ? curMilestone.desc : ''}</div>
        ${nextInfo}
        <div style="background:rgba(255,255,255,0.06);border-radius:4px;height:6px;margin-top:10px;overflow:hidden">
          <div style="background:linear-gradient(90deg,#e65100,#ffd700);height:100%;width:${Math.min(100, Math.round(((state.totalXP || 0) - (curMilestone ? curMilestone.minXP : 0)) / Math.max(1, (nextMilestone ? nextMilestone.minXP : curMilestone ? curMilestone.minXP : 1) - (curMilestone ? curMilestone.minXP : 0)) * 100))}%;transition:width 0.3s"></div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        ${state.chaptersCompleted.length < 10 ? '<button id="hseepResNext" style="padding:14px;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;border:none;border-radius:12px;cursor:pointer;font-weight:700">다음 챕터 →</button>' : '<div style="text-align:center;padding:14px;background:linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,140,0,0.1));border:1px solid rgba(255,215,0,0.4);border-radius:12px;font-weight:700;color:#ffd700">🏆 HSEEP 마스터 달성!</div>'}
        <button id="hseepResMap" style="padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#8b8fa3;border-radius:12px;cursor:pointer">챕터 맵으로</button>
        <button id="hseepResMenu" style="padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:#4a4e60;border-radius:12px;cursor:pointer">← HSEEP 메뉴</button>
      </div>
    </div>`;

  var nextBtn3 = document.getElementById('hseepResNext');
  if (nextBtn3) {
    nextBtn3.addEventListener('click', function() {
      var nextChId = ch.id + 1;
      var nextCh = chapters.find(function(c) { return c.id === nextChId; });
      if (nextCh) {
        state.currentChapter = nextChId;
        state.questionIndex = 0;
        state.chapterScore = 0;
        state.bossAnswered = false;
        state.bossCorrect = false;
        state.bossSelected = -1;
        state.answered = false;
        state.selected = -1;
        state.phase = 'cinematic';
        G.screen = 'hseepCampaignChapter';
        render();
      } else {
        G.screen = 'hseepCampaign'; render();
      }
    });
  }
  document.getElementById('hseepResMap').addEventListener('click', function() {
    G.screen = 'hseepCampaign'; render();
  });
  document.getElementById('hseepResMenu').addEventListener('click', function() {
    G.screen = 'hseepMenu'; render();
  });
}

// ============================================
// END OF HSEEP MODULE
// ============================================
