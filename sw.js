// Офлайн: страницы сайта лежат в кэше телефона, KaTeX — тоже после первого открытия.
// Меняешь любой файл — подними номер версии, иначе телефон покажет старое.
const VERSIYA = 'ucheba-v5';
const STRANICY = [
  './',
  './index.html',
  './uroki/',
  './uroki/index.html',
  './uroki/bd-left-join-group-by.html',
  './uroki/bd-case-daty.html',
  './uroki/tv-nezavisimost.html',
  './uroki/sa-process.html',
  './uroki/sa-trebovaniya.html',
  './uroki/ach-nauchnaya-kommunikaciya.html',
  './matan/',
  './matan/index.html',
  './matan/baza.html',
  './povtorenie/',
  './povtorenie/index.html',
  './povtorenie/bd.html',
  './povtorenie/sa.html',
  './povtorenie/ach.html',
  './povtorenie/matan.html',
  './karta/',
  './karta/index.html',
  './assets/style.css',
  './assets/app.js',
  './assets/sroki.js',
  './assets/karta.js',
  './manifest.webmanifest',
  './icon.svg',
];
const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIYA).then(c => c.addAll(STRANICY)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(x => x !== VERSIYA).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (e.request.method !== 'GET') return;
  const svoy = url.startsWith(self.registration.scope);
  if (!svoy && !url.startsWith(KATEX)) return;

  // Сначала сеть (чтобы сроки и уроки были свежими), без сети — из кэша.
  e.respondWith(
    fetch(e.request)
      .then(otvet => {
        if (otvet.ok) {
          const kopiya = otvet.clone();
          caches.open(VERSIYA).then(c => c.put(e.request, kopiya));
        }
        return otvet;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then(v => v || caches.match('./index.html')))
  );
});
