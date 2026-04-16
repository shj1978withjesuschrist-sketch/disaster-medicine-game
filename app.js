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

// ---- DATA TRACKING API ----
const TRACKING_API = (() => {
  const p = '__PORT_8000__';
  return p.startsWith('__') ? 'http://localhost:8000' : p;
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
    try {
      const deviceInfo = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
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
    if (!this.enabled || !this.sessionId) return;
    const timeTaken = Math.round((Date.now() - this.questionStartTime) / 1000);
    this.modeTotal++;
    if (isCorrect) this.modeCorrect++;
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
    if (!this.enabled || !this.sessionId) return;
    const timeSpent = Math.round((Date.now() - this.modeStartTime) / 1000);
    this.modeScore = score;
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
  G[key] = seconds;
  const id = key.replace('Timer', 'TimerId');
  clearInterval(G[id]);
  G[id] = setInterval(() => {
    G[key]--;
    if (onTick) onTick(G[key]);
    if (G[key] <= 5 && G[key] > 0) sfx('tick');
    if (G[key] <= 0) {
      clearInterval(G[id]);
      if (onEnd) onEnd();
    }
  }, 1000);
}

function stopTimer(key) {
  const id = key.replace('Timer', 'TimerId');
  clearInterval(G[id]);
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
        <p class="game-subtitle">순천향대학교 재난의학센터<br>인터랙티브 RPG 교육 시뮬레이터 v5</p>
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

  // Admin dashboard link
  $('admin-link-btn').addEventListener('click', () => {
    // Navigate to admin.html in the same deployed site
    const base = window.location.href.replace(/\/[^/]*$/, '/');
    window.open(base + 'admin.html', '_blank');
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
    preventableDeaths: 0
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
