// ============================================
// DISASTER MEDICINE SIMULATOR — APP
// ============================================

const APP = {
  currentScreen: 'intro',
  score: 0,
  xp: 0,
  currentPatientIndex: 0,
  selectedTriage: null,
  triageResults: [],
  timerInterval: null,
  timeElapsed: 0,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  mciDecisionIndex: 0,
  mciScore: 0,
  cbrneScenarioIndex: 0,
  cbrneStepOrder: [],
  cbrneCurrentStep: 1,

  // Sound effects (procedural)
  audioCtx: null,

  initAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  playSound(type) {
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    if (type === 'correct') {
      // Pleasant ascending chord
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.5);
      });
    } else if (type === 'wrong') {
      // Descending buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'alert') {
      [880, 660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.12);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.15);
      });
    } else if (type === 'complete') {
      // Victory fanfare
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.6);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.7);
      });
    }
  },

  // Timer
  startTimer() {
    this.timeElapsed = 0;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
      const timerEl = document.querySelector('.timer-display');
      if (timerEl) {
        const min = Math.floor(this.timeElapsed / 60);
        const sec = this.timeElapsed % 60;
        timerEl.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        if (this.timeElapsed > 120) timerEl.classList.add('urgent');
      }
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  },

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}분 ${sec}초`;
  },

  // Navigation
  navigate(screen) {
    this.currentScreen = screen;
    this.render();
  },

  // Render
  render() {
    const app = document.getElementById('app');
    switch (this.currentScreen) {
      case 'intro':
        app.innerHTML = this.renderIntro();
        break;
      case 'home':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderHome() + '</div>';
        break;
      case 'triage':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderTriage() + '</div>';
        break;
      case 'mci':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderMCI() + '</div>';
        break;
      case 'cbrne':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderCBRNE() + '</div>';
        break;
      case 'quiz':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderQuiz() + '</div>';
        break;
      case 'triage-results':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderTriageResults() + '</div>';
        break;
      case 'quiz-results':
        app.innerHTML = this.renderHeader() + '<div class="main-content">' + this.renderQuizResults() + '</div>';
        break;
    }
    this.bindEvents();
  },

  renderIntro() {
    return `
      <div class="intro-overlay" id="introOverlay">
        <div class="intro-content">
          <div class="intro-logo">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" stroke="#3b82f6" stroke-width="3" opacity="0.3"/>
              <circle cx="40" cy="40" r="28" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
              <path d="M40 20 L40 60 M25 40 L55 40" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
              <path d="M28 28 L52 52 M52 28 L28 52" stroke="#ef4444" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
            </svg>
          </div>
          <h1 class="intro-title">재난의학 시뮬레이터</h1>
          <p class="intro-sub">Disaster Medicine Interactive Training</p>
          <button class="start-btn" onclick="APP.startApp()">시뮬레이션 시작</button>
        </div>
      </div>
    `;
  },

  startApp() {
    this.initAudio();
    this.playSound('alert');
    const overlay = document.getElementById('introOverlay');
    if (overlay) overlay.classList.add('hidden');
    setTimeout(() => this.navigate('home'), 600);
  },

  renderHeader() {
    const tabs = [
      { id: 'home', label: '홈', icon: '🏠' },
      { id: 'triage', label: 'START Triage', icon: '🏥' },
      { id: 'mci', label: 'MCI 지휘', icon: '🚑' },
      { id: 'cbrne', label: 'CBRNE', icon: '☣️' },
      { id: 'quiz', label: '퀴즈', icon: '📝' }
    ];

    return `
      <header class="app-header">
        <div class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="15" stroke="#3b82f6" stroke-width="2" opacity="0.5"/>
              <path d="M18 8 L18 28 M10 18 L26 18" stroke="#3b82f6" stroke-width="3.5" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="logo-text">DisasterMed</span>
        </div>
        <nav class="nav-tabs">
          ${tabs.map(t => `
            <button class="nav-tab ${this.currentScreen === t.id || (this.currentScreen.startsWith(t.id)) ? 'active' : ''}"
              onclick="APP.handleNav('${t.id}')">
              <span class="tab-icon">${t.icon}</span>
              ${t.label}
            </button>
          `).join('')}
        </nav>
        <div class="header-stats">
          <div class="stat-badge">
            <span class="icon">⭐</span>
            <span>${this.xp} XP</span>
          </div>
          <div class="stat-badge">
            <span class="icon">🏆</span>
            <span>${this.score}</span>
          </div>
        </div>
      </header>
    `;
  },

  handleNav(screen) {
    this.playSound('click');
    if (screen === 'triage') {
      this.currentPatientIndex = 0;
      this.selectedTriage = null;
      this.triageResults = [];
      this.startTimer();
    }
    if (screen === 'quiz') {
      this.quizIndex = 0;
      this.quizScore = 0;
      this.quizAnswered = false;
    }
    if (screen === 'mci') {
      this.mciDecisionIndex = 0;
      this.mciScore = 0;
    }
    if (screen === 'cbrne') {
      this.cbrneCurrentStep = 1;
      this.cbrneStepOrder = [];
    }
    this.navigate(screen);
  },

  renderHome() {
    return `
      <div class="home-screen animate-in">
        <div class="hero-section">
          <h1 class="hero-title">
            인터랙티브<br><span class="gradient-text">재난의학 교육</span>
          </h1>
          <p class="hero-subtitle">
            START Triage 시뮬레이션, MCI 지휘 훈련, CBRNE 대응 프로토콜을 실전처럼 경험하세요
          </p>
        </div>
        <div class="module-grid stagger">
          <div class="module-card animate-slide" data-module="triage" onclick="APP.handleNav('triage')">
            <div class="card-icon">🏥</div>
            <h3>START Triage 시뮬레이터</h3>
            <p>대량 사상자 현장에서 10명의 환자를 신속하게 분류하세요. 실제 활력징후와 소견을 바탕으로 RED/YELLOW/GREEN/BLACK을 결정합니다.</p>
            <span class="card-tag">환자 10명 · 실시간 타이머</span>
          </div>
          <div class="module-card animate-slide" data-module="mci" onclick="APP.handleNav('mci')">
            <div class="card-icon">🚑</div>
            <h3>MCI 지휘 센터</h3>
            <p>지하철 충돌 사고 현장의 현장지휘관이 되어 자원 배분, 환자 이송 우선순위, ICS 수립 등 핵심 의사결정을 수행합니다.</p>
            <span class="card-tag">의사결정 시뮬레이션</span>
          </div>
          <div class="module-card animate-slide" data-module="cbrne" onclick="APP.handleNav('cbrne')">
            <div class="card-icon">☣️</div>
            <h3>CBRNE 대응 프로토콜</h3>
            <p>화학·생물·방사능 위협 시나리오별 대응 절차를 올바른 순서대로 실행하세요. 순서가 생사를 가릅니다.</p>
            <span class="card-tag">3가지 시나리오</span>
          </div>
          <div class="module-card animate-slide" data-module="quiz" onclick="APP.handleNav('quiz')">
            <div class="card-icon">📝</div>
            <h3>재난의학 퀴즈</h3>
            <p>START/SALT Triage, ICS, CBRNE 해독제, 폭발 손상, Surge Capacity 등 핵심 지식을 12문항으로 테스트합니다.</p>
            <span class="card-tag">12문항 · 즉시 피드백</span>
          </div>
        </div>
      </div>
    `;
  },

  // ============================================
  // TRIAGE MODULE
  // ============================================

  renderTriage() {
    const patients = SCENARIOS.triage.patients;
    if (this.currentPatientIndex >= patients.length) {
      this.stopTimer();
      this.currentScreen = 'triage-results';
      return this.renderTriageResults();
    }

    const patient = patients[this.currentPatientIndex];
    const counts = { red: 0, yellow: 0, green: 0, black: 0 };
    this.triageResults.forEach(r => counts[r.selected]++);

    return `
      <div class="triage-screen animate-in">
        <div class="triage-main">
          <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>
          <div class="scenario-banner">
            <div class="alert-icon">🚨</div>
            <div>
              <h2>${SCENARIOS.triage.title}</h2>
              <p>${SCENARIOS.triage.description}</p>
            </div>
          </div>

          <div class="patient-card">
            <div class="patient-header">
              <div class="patient-id">
                <div class="avatar">${patient.icon}</div>
                <div class="info">
                  <h3>${patient.name}</h3>
                  <span>${patient.age}세 · ${patient.gender}성</span>
                </div>
              </div>
              <span class="patient-number">${this.currentPatientIndex + 1} / ${patients.length}</span>
            </div>

            <div class="patient-body">
              <div class="vital-signs">
                ${Object.values(patient.vitals).map(v => `
                  <div class="vital-item ${v.status}">
                    <span class="vital-label">${v.label}</span>
                    <span class="vital-value">${v.value}</span>
                  </div>
                `).join('')}
              </div>

              <div class="assessment-section">
                <h4>현장 소견</h4>
                ${patient.findings.map(f => `
                  <div class="finding">
                    <span class="dot"></span>
                    <span>${f}</span>
                  </div>
                `).join('')}
              </div>

              <div class="triage-actions">
                <h4>Triage 분류를 선택하세요</h4>
                <div class="triage-buttons">
                  <button class="triage-btn ${this.selectedTriage === 'red' ? 'selected' : ''}"
                    data-triage="red" onclick="APP.selectTriage('red')">
                    <span class="btn-label">RED</span>
                    <span class="btn-sub">즉시</span>
                  </button>
                  <button class="triage-btn ${this.selectedTriage === 'yellow' ? 'selected' : ''}"
                    data-triage="yellow" onclick="APP.selectTriage('yellow')">
                    <span class="btn-label">YELLOW</span>
                    <span class="btn-sub">지연</span>
                  </button>
                  <button class="triage-btn ${this.selectedTriage === 'green' ? 'selected' : ''}"
                    data-triage="green" onclick="APP.selectTriage('green')">
                    <span class="btn-label">GREEN</span>
                    <span class="btn-sub">경상</span>
                  </button>
                  <button class="triage-btn ${this.selectedTriage === 'black' ? 'selected' : ''}"
                    data-triage="black" onclick="APP.selectTriage('black')">
                    <span class="btn-label">BLACK</span>
                    <span class="btn-sub">사망</span>
                  </button>
                </div>
                <button class="confirm-btn ${this.selectedTriage ? 'enabled' : ''}"
                  onclick="APP.confirmTriage()">
                  분류 확정
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="triage-sidebar">
          <div class="sidebar-panel">
            <h3>⏱ 경과 시간</h3>
            <div class="timer-display">00:00</div>
          </div>

          <div class="sidebar-panel">
            <h3>📊 분류 현황</h3>
            <div class="tag-counts">
              <div class="tag-count" data-color="red"><div class="tag-dot"></div>${counts.red}</div>
              <div class="tag-count" data-color="yellow"><div class="tag-dot"></div>${counts.yellow}</div>
              <div class="tag-count" data-color="green"><div class="tag-dot"></div>${counts.green}</div>
              <div class="tag-count" data-color="black"><div class="tag-dot"></div>${counts.black}</div>
            </div>
          </div>

          <div class="sidebar-panel">
            <h3>📋 점수</h3>
            <div class="score-grid">
              <div class="score-item">
                <div class="score-value">${this.triageResults.filter(r => r.correct).length}</div>
                <div class="score-label">정답</div>
              </div>
              <div class="score-item">
                <div class="score-value">${this.triageResults.filter(r => !r.correct).length}</div>
                <div class="score-label">오답</div>
              </div>
            </div>
          </div>

          <div class="sidebar-panel">
            <h3>📖 START 알고리즘</h3>
            <div class="algorithm-ref">
              ${START_STEPS.map(s => `
                <div class="algo-step">
                  <div class="step-num">${s.num}</div>
                  <div class="step-text">${s.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="feedback-overlay" id="feedbackOverlay">
        <div class="feedback-card" id="feedbackCard"></div>
      </div>
    `;
  },

  selectTriage(color) {
    this.playSound('click');
    this.selectedTriage = color;
    // Update button states
    document.querySelectorAll('.triage-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.triage === color);
    });
    document.querySelector('.confirm-btn').classList.add('enabled');
  },

  confirmTriage() {
    if (!this.selectedTriage) return;

    const patient = SCENARIOS.triage.patients[this.currentPatientIndex];
    const isCorrect = this.selectedTriage === patient.correctTriage;
    const points = isCorrect ? 100 : -20;

    this.triageResults.push({
      patient: patient.name,
      selected: this.selectedTriage,
      correct: isCorrect,
      answer: patient.correctTriage
    });

    if (isCorrect) {
      this.score += 100;
      this.xp += 25;
      this.playSound('correct');
    } else {
      this.playSound('wrong');
    }

    // Show feedback
    const overlay = document.getElementById('feedbackOverlay');
    const card = document.getElementById('feedbackCard');

    const triageNames = { red: 'RED (즉시)', yellow: 'YELLOW (지연)', green: 'GREEN (경상)', black: 'BLACK (사망/기대불가)' };

    card.innerHTML = `
      <div class="feedback-icon ${isCorrect ? 'correct' : 'incorrect'}">
        ${isCorrect ? '✓' : '✗'}
      </div>
      <h2>${isCorrect ? '정확합니다!' : '다시 생각해보세요'}</h2>
      ${!isCorrect ? `<p style="color:var(--triage-red); font-weight:600; margin-bottom:var(--space-2);">정답: ${triageNames[patient.correctTriage]}</p>` : ''}
      <p class="explanation">${patient.explanation}</p>
      <p class="points ${isCorrect ? 'positive' : 'negative'}">${isCorrect ? '+100' : '-20'} 점</p>
      <button class="next-btn" onclick="APP.nextPatient()">
        ${this.currentPatientIndex + 1 < SCENARIOS.triage.patients.length ? '다음 환자 →' : '결과 보기'}
      </button>
    `;

    overlay.classList.add('visible');
  },

  nextPatient() {
    document.getElementById('feedbackOverlay').classList.remove('visible');
    this.currentPatientIndex++;
    this.selectedTriage = null;
    setTimeout(() => this.render(), 300);
  },

  renderTriageResults() {
    this.stopTimer();
    const total = this.triageResults.length;
    const correct = this.triageResults.filter(r => r.correct).length;
    const pct = Math.round((correct / total) * 100);
    const grade = pct >= 90 ? 'excellent' : pct >= 70 ? 'good' : 'needs-work';
    const gradeText = pct >= 90 ? '우수 (Expert)' : pct >= 70 ? '양호 (Competent)' : '추가 훈련 필요';

    this.playSound('complete');

    return `
      <div class="results-screen animate-in">
        <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>
        <div class="results-score">
          <div class="big-score">${pct}%</div>
          <div class="score-subtitle">START Triage 정확도</div>
          <div class="grade-badge ${grade}">${gradeText}</div>
        </div>
        <div class="results-details">
          <div class="result-stat">
            <div class="stat-value" style="color:var(--triage-green)">${correct}</div>
            <div class="stat-label">정확한 분류</div>
          </div>
          <div class="result-stat">
            <div class="stat-value" style="color:var(--triage-red)">${total - correct}</div>
            <div class="stat-label">잘못된 분류</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">${this.formatTime(this.timeElapsed)}</div>
            <div class="stat-label">소요 시간</div>
          </div>
        </div>

        <div style="text-align:left; margin-bottom:var(--space-8);">
          <h3 style="font-family:var(--font-display); font-weight:700; margin-bottom:var(--space-4);">환자별 결과</h3>
          ${this.triageResults.map((r, i) => {
            const p = SCENARIOS.triage.patients[i];
            const triageColors = { red: 'var(--triage-red)', yellow: 'var(--triage-yellow)', green: 'var(--triage-green)', black: '#6b7280' };
            return `
              <div style="display:flex; align-items:center; gap:var(--space-3); padding:var(--space-3) 0; border-bottom:1px solid var(--color-border);">
                <span style="font-size:20px;">${p.icon}</span>
                <span style="flex:1; font-weight:500; font-size:var(--text-sm);">${p.name}</span>
                <span style="font-family:var(--font-mono); font-size:var(--text-xs); padding:2px 8px; border-radius:4px; background:${r.correct ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}; color:${r.correct ? 'var(--triage-green)' : 'var(--triage-red)'};">
                  ${r.selected.toUpperCase()} ${r.correct ? '✓' : '→ ' + r.answer.toUpperCase()}
                </span>
              </div>
            `;
          }).join('')}
        </div>

        <button class="restart-btn" onclick="APP.handleNav('triage')">다시 도전하기</button>
      </div>
    `;
  },

  // ============================================
  // MCI MODULE
  // ============================================

  renderMCI() {
    const scenario = MCI_SCENARIOS[0];
    const decision = scenario.decisions[this.mciDecisionIndex];

    if (this.mciDecisionIndex >= scenario.decisions.length) {
      return this.renderMCIResults();
    }

    return `
      <div class="mci-screen animate-in">
        <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>

        <div class="mci-header">
          <div>
            <h2>🚇 ${scenario.title}</h2>
            <p style="font-size:var(--text-sm); color:var(--color-text-muted); margin-top:var(--space-1);">${scenario.description}</p>
          </div>
        </div>

        <div class="mci-stats">
          <div class="mci-stat">
            <div class="stat-num">${scenario.totalPatients}</div>
            <div class="stat-label">총 환자</div>
          </div>
          <div class="mci-stat">
            <div class="stat-num" style="color:var(--triage-red)">${scenario.zones.red}</div>
            <div class="stat-label">RED</div>
          </div>
          <div class="mci-stat">
            <div class="stat-num" style="color:var(--triage-yellow)">${scenario.zones.yellow}</div>
            <div class="stat-label">YELLOW</div>
          </div>
          <div class="mci-stat">
            <div class="stat-num" style="color:var(--triage-green)">${scenario.zones.green}</div>
            <div class="stat-label">GREEN</div>
          </div>
          <div class="mci-stat">
            <div class="stat-num" style="color:#6b7280">${scenario.zones.black}</div>
            <div class="stat-label">BLACK</div>
          </div>
        </div>

        <div class="mci-grid">
          <div class="mci-panel">
            <h3>📋 가용 자원</h3>
            ${Object.entries(scenario.resources).map(([key, val]) => `
              <div class="resource-item">
                <span class="resource-name">${val.label}</span>
                <span style="font-family:var(--font-mono); font-weight:600; color:var(--color-primary);">${val.total}</span>
              </div>
            `).join('')}

            <div style="margin-top:var(--space-4);">
              <h3 style="font-family:var(--font-display); font-weight:700; font-size:var(--text-sm); margin-bottom:var(--space-3); text-transform:uppercase; letter-spacing:0.04em; color:var(--color-text-muted);">🗺️ 환자 배치 현황</h3>
              <div class="zone-map">
                <div class="zone-cell red-zone">RED<br>${scenario.zones.red}명</div>
                <div class="zone-cell yellow-zone">YELLOW<br>${scenario.zones.yellow}명</div>
                <div class="zone-cell green-zone">GREEN<br>${scenario.zones.green}명</div>
                <div class="zone-cell black-zone">BLACK<br>${scenario.zones.black}명</div>
              </div>
            </div>
          </div>

          <div class="mci-panel">
            <h3>⚡ 의사결정 ${this.mciDecisionIndex + 1}/${scenario.decisions.length}</h3>
            <div class="progress-bar" style="margin-bottom:var(--space-4);">
              <div class="progress-fill" style="width:${((this.mciDecisionIndex) / scenario.decisions.length) * 100}%"></div>
            </div>
            <p style="font-weight:600; font-size:var(--text-base); margin-bottom:var(--space-4); line-height:1.5;">${decision.question}</p>
            ${decision.options.map(opt => `
              <div class="decision-card" onclick="APP.selectMCIDecision('${opt.id}', ${opt.correct})">
                <h4>${opt.text}</h4>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="feedback-overlay" id="feedbackOverlay">
        <div class="feedback-card" id="feedbackCard"></div>
      </div>
    `;
  },

  selectMCIDecision(id, isCorrect) {
    const scenario = MCI_SCENARIOS[0];
    const decision = scenario.decisions[this.mciDecisionIndex];

    if (isCorrect) {
      this.mciScore++;
      this.score += 150;
      this.xp += 50;
      this.playSound('correct');
    } else {
      this.playSound('wrong');
    }

    // Highlight selected
    document.querySelectorAll('.decision-card').forEach(card => {
      card.style.pointerEvents = 'none';
    });

    const overlay = document.getElementById('feedbackOverlay');
    const card = document.getElementById('feedbackCard');

    card.innerHTML = `
      <div class="feedback-icon ${isCorrect ? 'correct' : 'incorrect'}">
        ${isCorrect ? '✓' : '✗'}
      </div>
      <h2>${isCorrect ? '올바른 판단입니다!' : '최적의 선택이 아닙니다'}</h2>
      <p class="explanation">${decision.explanation}</p>
      <p class="points ${isCorrect ? 'positive' : 'negative'}">${isCorrect ? '+150' : '+0'} 점</p>
      <button class="next-btn" onclick="APP.nextMCIDecision()">
        ${this.mciDecisionIndex + 1 < scenario.decisions.length ? '다음 상황 →' : '결과 보기'}
      </button>
    `;

    overlay.classList.add('visible');
  },

  nextMCIDecision() {
    document.getElementById('feedbackOverlay').classList.remove('visible');
    this.mciDecisionIndex++;
    setTimeout(() => this.render(), 300);
  },

  renderMCIResults() {
    const total = MCI_SCENARIOS[0].decisions.length;
    const pct = Math.round((this.mciScore / total) * 100);
    const grade = pct >= 90 ? 'excellent' : pct >= 60 ? 'good' : 'needs-work';
    const gradeText = pct >= 90 ? '우수 지휘관' : pct >= 60 ? '유능한 지휘관' : '추가 훈련 필요';

    this.playSound('complete');

    return `
      <div class="results-screen animate-in">
        <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>
        <div class="results-score">
          <div class="big-score">${this.mciScore}/${total}</div>
          <div class="score-subtitle">MCI 지휘 의사결정 정확도</div>
          <div class="grade-badge ${grade}">${gradeText}</div>
        </div>
        <div style="max-width:500px; margin:var(--space-6) auto; text-align:left;">
          <p style="font-size:var(--text-sm); color:var(--color-text-muted); line-height:1.7;">
            대량 사상자 사고(MCI) 지휘는 제한된 자원 하에서 최대한 많은 생명을 구하기 위한 의사결정의 연속입니다.
            ICS(사고지휘체계) 수립, 자원 분산 배치, 이송 우선순위 결정은 현장 지휘관의 핵심 역량입니다.
          </p>
        </div>
        <button class="restart-btn" onclick="APP.handleNav('mci')">다시 도전하기</button>
      </div>
    `;
  },

  // ============================================
  // CBRNE MODULE
  // ============================================

  renderCBRNE() {
    const scenario = CBRNE_SCENARIOS[this.cbrneScenarioIndex];
    const allCompleted = this.cbrneCurrentStep > scenario.steps.length;

    return `
      <div class="cbrne-screen animate-in">
        <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>

        <div class="scenario-selector">
          ${CBRNE_SCENARIOS.map((s, i) => `
            <button class="scenario-chip ${i === this.cbrneScenarioIndex ? 'active' : ''}"
              onclick="APP.switchCBRNE(${i})">
              ${s.icon} ${s.type}
            </button>
          `).join('')}
        </div>

        <div class="cbrne-scenario">
          <span class="threat-badge">${scenario.icon} ${scenario.type}</span>
          <h2>${scenario.title}</h2>
          <p class="scenario-desc">${scenario.description}</p>
        </div>

        ${allCompleted ? `
          <div style="text-align:center; padding:var(--space-8);">
            <div style="font-size:48px; margin-bottom:var(--space-4);">🎉</div>
            <h2 style="font-family:var(--font-display); font-weight:700; font-size:var(--text-xl); margin-bottom:var(--space-3);">
              프로토콜 완료!
            </h2>
            <p style="color:var(--color-text-muted); margin-bottom:var(--space-2);">
              ${scenario.steps.length}단계 대응 절차를 ${this.cbrneStepOrder.filter((s, i) => s === i + 1).length}/${scenario.steps.length} 정확하게 수행했습니다.
            </p>
            <p style="font-family:var(--font-mono); font-weight:700; font-size:var(--text-lg); color:var(--color-success); margin-bottom:var(--space-5);">
              +${this.cbrneStepOrder.filter((s, i) => s === i + 1).length * 80} XP
            </p>
            <button class="restart-btn" onclick="APP.switchCBRNE(${(this.cbrneScenarioIndex + 1) % CBRNE_SCENARIOS.length})">
              다음 시나리오 →
            </button>
          </div>
        ` : `
          <div style="margin-bottom:var(--space-3);">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${((this.cbrneCurrentStep - 1) / scenario.steps.length) * 100}%"></div>
            </div>
            <p style="font-size:var(--text-sm); color:var(--color-text-muted); margin-top:var(--space-2); text-align:center;">
              ${this.cbrneCurrentStep}단계 선택 중 — 올바른 대응 순서를 선택하세요
            </p>
          </div>
          <div class="cbrne-steps">
            ${scenario.steps.map(step => {
              const alreadyDone = this.cbrneStepOrder.includes(step.correct);
              const wasCorrectAt = this.cbrneStepOrder.indexOf(step.correct);
              const isCompleted = alreadyDone;
              const wasInCorrectPosition = wasCorrectAt !== -1 && wasCorrectAt + 1 === step.correct;
              return `
                <div class="cbrne-step ${isCompleted ? (wasInCorrectPosition ? 'completed' : 'wrong') : ''}"
                  onclick="${isCompleted ? '' : `APP.selectCBRNEStep(${step.correct})`}"
                  style="${isCompleted ? 'pointer-events:none; opacity:0.6;' : ''}">
                  <div class="step-order">${isCompleted ? (wasInCorrectPosition ? '✓' : '✗') : '?'}</div>
                  <h4>${step.title}</h4>
                  <p>${step.desc}</p>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  },

  switchCBRNE(index) {
    this.playSound('click');
    this.cbrneScenarioIndex = index;
    this.cbrneCurrentStep = 1;
    this.cbrneStepOrder = [];
    this.render();
  },

  selectCBRNEStep(stepCorrectValue) {
    const isCorrect = stepCorrectValue === this.cbrneCurrentStep;
    this.cbrneStepOrder.push(stepCorrectValue);

    if (isCorrect) {
      this.xp += 80;
      this.score += 80;
      this.playSound('correct');
    } else {
      this.playSound('wrong');
    }

    this.cbrneCurrentStep++;
    this.render();
  },

  // ============================================
  // QUIZ MODULE
  // ============================================

  renderQuiz() {
    if (this.quizIndex >= QUIZ_QUESTIONS.length) {
      this.currentScreen = 'quiz-results';
      return this.renderQuizResults();
    }

    const q = QUIZ_QUESTIONS[this.quizIndex];
    const letters = ['A', 'B', 'C', 'D'];

    return `
      <div class="quiz-screen animate-in">
        <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>

        <div class="quiz-progress">
          <span class="q-num">${this.quizIndex + 1} / ${QUIZ_QUESTIONS.length}</span>
          <div class="progress-bar" style="flex:1;">
            <div class="progress-fill" style="width:${(this.quizIndex / QUIZ_QUESTIONS.length) * 100}%"></div>
          </div>
          <span class="q-num" style="color:var(--color-success);">${this.quizScore}점</span>
        </div>

        <div class="quiz-card">
          <p class="question">${q.question}</p>
          <div class="quiz-options" id="quizOptions">
            ${q.options.map((opt, i) => `
              <button class="quiz-option" data-index="${i}"
                onclick="APP.answerQuiz(${i})">
                <span class="opt-letter">${letters[i]}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>
          <div id="quizExplanation"></div>
        </div>
      </div>
    `;
  },

  answerQuiz(index) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;

    const q = QUIZ_QUESTIONS[this.quizIndex];
    const isCorrect = index === q.correct;

    if (isCorrect) {
      this.quizScore += 100;
      this.score += 50;
      this.xp += 15;
      this.playSound('correct');
    } else {
      this.playSound('wrong');
    }

    // Update option styles
    document.querySelectorAll('.quiz-option').forEach((opt, i) => {
      if (i === q.correct) opt.classList.add('correct');
      if (i === index && !isCorrect) opt.classList.add('wrong');
      if (i === index) opt.classList.add('selected');
    });

    // Show explanation
    const expEl = document.getElementById('quizExplanation');
    expEl.innerHTML = `
      <div class="quiz-explanation" style="animation: fadeIn 0.3s ease both;">
        <p><strong>${isCorrect ? '✓ 정답!' : '✗ 오답'}</strong> — ${q.explanation}</p>
        <button class="next-btn" style="margin-top:var(--space-4); width:100%;"
          onclick="APP.nextQuiz()">
          ${this.quizIndex + 1 < QUIZ_QUESTIONS.length ? '다음 문제 →' : '결과 보기'}
        </button>
      </div>
    `;
  },

  nextQuiz() {
    this.quizIndex++;
    this.quizAnswered = false;
    this.render();
  },

  renderQuizResults() {
    const total = QUIZ_QUESTIONS.length;
    const correct = Math.round(this.quizScore / 100);
    const pct = Math.round((correct / total) * 100);
    const grade = pct >= 90 ? 'excellent' : pct >= 70 ? 'good' : 'needs-work';
    const gradeText = pct >= 90 ? '재난의학 전문가' : pct >= 70 ? '양호한 지식수준' : '복습이 필요합니다';

    this.playSound('complete');

    return `
      <div class="results-screen animate-in">
        <button class="back-btn" onclick="APP.handleNav('home')">← 홈으로</button>
        <div class="results-score">
          <div class="big-score">${pct}%</div>
          <div class="score-subtitle">재난의학 퀴즈 정답률</div>
          <div class="grade-badge ${grade}">${gradeText}</div>
        </div>
        <div class="results-details">
          <div class="result-stat">
            <div class="stat-value" style="color:var(--triage-green)">${correct}</div>
            <div class="stat-label">정답</div>
          </div>
          <div class="result-stat">
            <div class="stat-value" style="color:var(--triage-red)">${total - correct}</div>
            <div class="stat-label">오답</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">${this.quizScore}</div>
            <div class="stat-label">획득 점수</div>
          </div>
        </div>
        <button class="restart-btn" onclick="APP.handleNav('quiz')">다시 도전하기</button>
      </div>
    `;
  },

  // ============================================
  // EVENT BINDING
  // ============================================

  bindEvents() {
    // Keyboard shortcuts
    document.onkeydown = (e) => {
      if (this.currentScreen === 'triage') {
        if (e.key === '1') this.selectTriage('red');
        if (e.key === '2') this.selectTriage('yellow');
        if (e.key === '3') this.selectTriage('green');
        if (e.key === '4') this.selectTriage('black');
        if (e.key === 'Enter' && this.selectedTriage) this.confirmTriage();
      }
    };
  }
};

// Initialize
APP.render();
