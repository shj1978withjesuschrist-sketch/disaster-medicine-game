# 재난의학 서바이벌 (Disaster Medicine Survival)

Interactive disaster medicine training game — START triage, MCI command, CBRNE response, HSEEP exercises.

**Live**: https://shj1978withjesuschrist-sketch.github.io/disaster-medicine-game/
**English version**: https://shj1978withjesuschrist-sketch.github.io/disaster-medicine-game-en/

## Project structure

```
disaster-med-edu/
├── index.html, app.js, data.js, ...   # Game (legacy global-scope)
├── src/algorithms/                    # Pure ES Modules (testable)
│   ├── triage.js                      # START algorithm
│   ├── scoring.js                     # XP, level, streak
│   └── assessment-stats.js            # Cohen's d, NLG, pass rate
├── tests/                             # Vitest unit tests
├── api_server.py                      # FastAPI backend
├── manifest.json, sw.js, icons/       # PWA
└── capacitor.config.json              # Native app build
```

## Development

```bash
npm install         # one-time setup
npm test            # run unit tests (47 tests)
npm run test:watch  # watch mode
npm run test:coverage
npm run lint        # ESLint
npm run format      # Prettier auto-fix
npm run typecheck   # TypeScript via JSDoc
```

## CI

Every push to `main` runs:
1. **Test** — Vitest on Node 18 + 20
2. **Lint** — ESLint + Prettier
3. **Typecheck** — `tsc --noEmit` against JSDoc annotations

See `.github/workflows/ci.yml`.

## Phase history

- **Phase A** (2026-05-05): Security hardening — Firebase rules, JWT, bcrypt, DOMPurify
- **Phase B** (2026-05-05): Learning-outcome measurement — Pre/Post tests, Kirkpatrick L1-L3, xAPI/cmi5
- **Phase C** (2026-05-05): Accessibility + Mobile + PWA — ARIA, CVD palette, Service Worker, Capacitor
- **Phase D** (2026-05-05): Code modernization — ES Modules, Vitest, ESLint, GitHub Actions CI

## License

Apache-2.0 — Soonchunhyang University Disaster Medicine Center
