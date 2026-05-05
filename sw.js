/* =====================================================================
   Phase C — Service Worker for offline PWA
   Strategy: cache-first for static assets, network-first for API
   ===================================================================== */
const VERSION = 'dmsurvival-v2026.05.05-1';
const STATIC_CACHE = 'static-' + VERSION;
const RUNTIME_CACHE = 'runtime-' + VERSION;

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './accessibility.css',
  './data.js',
  './surge.js',
  './cbrne_game_content.js',
  './tactical_ctm_game_content.js',
  './campaign_mode.js',
  './hseep_game_content.js',
  './firebase_sync.js',
  './assessment.js',
  './a11y.js',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(STATIC_ASSETS).catch(() => {/* offline asset prefetch ok to fail */})
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Firebase / API: network-first
  if (
    /firebaseio|googleapis|firebasedatabase|firebaseinstallations|render\.com|\/api\//.test(url.href)
  ) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Same-origin / known CDN: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        // 오프라인 fallback: HTML 요청 시 index.html 반환
        if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// 메시지 — 강제 업데이트
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
