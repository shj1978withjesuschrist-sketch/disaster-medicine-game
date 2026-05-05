/* =====================================================================
   Phase C — Accessibility Helper
   - aria 자동 주입 (앱이 SPA라 dynamic 패치)
   - 색맹(CVD) 모드 토글
   - 키보드 단축키 ('?' 도움말, 'Esc' 모달 닫기)
   - 폰트 크기 토글
   ===================================================================== */
(function (global) {
  'use strict';

  const isEN = /disaster-medicine-game-en|\/en\//i.test(location.pathname) ||
               (document.documentElement.lang || '').toLowerCase().startsWith('en');

  const T = isEN ? {
    a11y_panel: 'Accessibility',
    cvd: 'Colorblind mode',
    fontL: 'Larger text',
    contrast: 'High contrast',
    motion: 'Reduce motion',
    keyboardHelp: 'Keyboard help',
    enter: 'Press Enter or Space to activate',
    skipNav: 'Skip to main content'
  } : {
    a11y_panel: '접근성 설정',
    cvd: '색약 친화 모드',
    fontL: '큰 글씨',
    contrast: '고대비',
    motion: '움직임 줄이기',
    keyboardHelp: '키보드 도움말',
    enter: 'Enter 또는 Space로 실행',
    skipNav: '본문 바로가기'
  };

  const STORAGE_KEY = 'a11y_prefs_v1';
  const prefs = (function () {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (_) { return {}; }
  })();

  function savePrefs() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (_) {}
    applyPrefs();
  }

  function applyPrefs() {
    const root = document.documentElement;
    root.classList.toggle('a11y-cvd', !!prefs.cvd);
    root.classList.toggle('a11y-large', !!prefs.fontL);
    root.classList.toggle('a11y-contrast', !!prefs.contrast);
    root.classList.toggle('a11y-no-motion', !!prefs.motion);
  }

  // Skip-link
  function injectSkipLink() {
    if (document.getElementById('a11y-skip')) return;
    const a = document.createElement('a');
    a.id = 'a11y-skip';
    a.href = '#app';
    a.textContent = T.skipNav;
    a.className = 'a11y-skip';
    document.body.insertBefore(a, document.body.firstChild);
  }

  // Inject panel button at top-right
  function injectPanel() {
    if (document.getElementById('a11y-fab')) return;
    const fab = document.createElement('button');
    fab.id = 'a11y-fab';
    fab.className = 'a11y-fab';
    fab.setAttribute('aria-label', T.a11y_panel);
    fab.setAttribute('title', T.a11y_panel);
    fab.innerHTML = '♿';
    fab.addEventListener('click', togglePanel);
    document.body.appendChild(fab);
  }

  function togglePanel() {
    let panel = document.getElementById('a11y-panel');
    if (panel) { panel.remove(); return; }
    panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.className = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', T.a11y_panel);
    panel.innerHTML = `
      <h3 style="margin:0 0 10px;font-size:1rem;color:#7aa6ff">♿ ${T.a11y_panel}</h3>
      <label class="a11y-row"><input type="checkbox" id="a11y-cvd" ${prefs.cvd ? 'checked' : ''}> ${T.cvd}</label>
      <label class="a11y-row"><input type="checkbox" id="a11y-fontL" ${prefs.fontL ? 'checked' : ''}> ${T.fontL}</label>
      <label class="a11y-row"><input type="checkbox" id="a11y-contrast" ${prefs.contrast ? 'checked' : ''}> ${T.contrast}</label>
      <label class="a11y-row"><input type="checkbox" id="a11y-motion" ${prefs.motion ? 'checked' : ''}> ${T.motion}</label>
      <hr style="border:0;border-top:1px solid #1f2a44;margin:10px 0">
      <div style="font-size:.85rem;color:#9bb0d0">
        <strong>${T.keyboardHelp}</strong><br>
        Tab/Shift+Tab — ${isEN ? 'navigate' : '이동'}<br>
        Enter/Space — ${isEN ? 'activate' : '실행'}<br>
        Esc — ${isEN ? 'close' : '닫기'}<br>
        ? — ${isEN ? 'this help' : '이 도움말'}
      </div>
    `;
    document.body.appendChild(panel);
    panel.querySelector('#a11y-cvd').addEventListener('change', e => { prefs.cvd = e.target.checked; savePrefs(); });
    panel.querySelector('#a11y-fontL').addEventListener('change', e => { prefs.fontL = e.target.checked; savePrefs(); });
    panel.querySelector('#a11y-contrast').addEventListener('change', e => { prefs.contrast = e.target.checked; savePrefs(); });
    panel.querySelector('#a11y-motion').addEventListener('change', e => { prefs.motion = e.target.checked; savePrefs(); });
  }

  // ----------- Auto-ARIA injector -----------
  // 게임이 SPA로 #app innerHTML을 다시 쓰므로 MutationObserver로 자동 보강
  function autoARIA(root) {
    root = root || document.body;

    // 모든 <button>이 aria-label 없으면 textContent로 부여
    root.querySelectorAll('button:not([aria-label])').forEach(b => {
      const txt = (b.textContent || '').trim().slice(0, 80);
      if (txt && txt.length < 60) b.setAttribute('aria-label', txt);
    });

    // 클릭 가능한 div에 role=button + tabindex
    root.querySelectorAll('[onclick]:not([role]):not(button):not(a)').forEach(el => {
      el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      // Enter/Space 키바인딩
      if (!el.__a11yKey) {
        el.__a11yKey = true;
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
          }
        });
      }
    });

    // 입력 필드 라벨 보강
    root.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(inp => {
      const ph = inp.placeholder;
      if (ph) inp.setAttribute('aria-label', ph);
    });

    // 메인 컨테이너 마킹
    const app = document.getElementById('app');
    if (app && !app.hasAttribute('role')) {
      app.setAttribute('role', 'main');
      app.setAttribute('aria-live', 'polite');
    }

    // 점수/HUD 영역에 aria-live
    root.querySelectorAll('.game-hud, [class*="score"]').forEach(s => {
      if (!s.hasAttribute('aria-live')) s.setAttribute('aria-live', 'polite');
    });

    // 트리아지 색상 카드/태그에 텍스트 라벨 패턴 보강
    root.querySelectorAll('.triage-tag, [class*="triage-"], [class*="tag-red"], [class*="tag-yellow"], [class*="tag-green"], [class*="tag-black"]').forEach(t => {
      if (t.dataset.a11yTagged) return;
      t.dataset.a11yTagged = '1';
      // 색맹 모드 시 패턴 표시용 hidden 텍스트
      if (!t.querySelector('.a11y-tag-text')) {
        const cls = t.className || '';
        let label = '';
        if (/red|immediate|즉시|적색/.test(cls + t.textContent)) label = isEN ? 'Red - Immediate' : '적색-즉시';
        else if (/yellow|delayed|지연|황색/.test(cls + t.textContent)) label = isEN ? 'Yellow - Delayed' : '황색-지연';
        else if (/green|minor|경증|녹색/.test(cls + t.textContent)) label = isEN ? 'Green - Minor' : '녹색-경증';
        else if (/black|deceased|사망|흑색/.test(cls + t.textContent)) label = isEN ? 'Black - Deceased' : '흑색-사망';
        if (label) t.setAttribute('aria-label', label);
      }
    });
  }

  // ----------- Esc 키 처리 — 모달 닫기 -----------
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const panel = document.getElementById('a11y-panel');
      if (panel) { panel.remove(); return; }
      // 일반 모달들
      const modals = document.querySelectorAll('.assess-modal, .privacy-modal, [class*="modal"]:not([hidden])');
      if (modals.length) {
        // 가장 최근 모달의 닫기 버튼 클릭 시도 또는 직접 제거
        const last = modals[modals.length - 1];
        const closeBtn = last.querySelector('[onclick*="close"], .close-btn, [aria-label*="lose"], [aria-label*="닫기"]');
        if (closeBtn) closeBtn.click();
      }
    }
    if (e.key === '?' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      togglePanel();
    }
  });

  // ----------- Init -----------
  function init() {
    applyPrefs();
    injectSkipLink();
    injectPanel();
    autoARIA(document.body);
    // SPA app 변경 감지
    const app = document.getElementById('app');
    if (app && window.MutationObserver) {
      const mo = new MutationObserver(function (muts) {
        // 디바운스: 마지막 변경 후 100ms
        if (mo._timer) clearTimeout(mo._timer);
        mo._timer = setTimeout(function () { autoARIA(app); }, 100);
      });
      mo.observe(app, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose
  global.A11y = {
    autoARIA: autoARIA,
    togglePanel: togglePanel,
    setPref: function (k, v) { prefs[k] = v; savePrefs(); },
    getPrefs: function () { return Object.assign({}, prefs); }
  };
})(window);
