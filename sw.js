/* Service Worker - مساعد إدارة الدروس
 * - الصفحة الرئيسية: الشبكة أولًا (دايمًا آخر نسخة)، ولو مفيش نت تتفتح النسخة المحفوظة.
 * - الأيقونات والـ manifest: الكاش أولًا.
 * - خطوط Google: كاش مع تحديث في الخلفية.
 * - لا يلمس localStorage ولا IndexedDB نهائيًا، فالبيانات آمنة.
 * عند تعديل أي ملف: غيّر رقم VERSION تحت. */
const VERSION = 'v1';
const APP_CACHE = 'bassem-app-' + VERSION;
const FONT_CACHE = 'bassem-fonts-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './maskable-192.png',
  './maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== APP_CACHE && k !== FONT_CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // خطوط Google
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const fetching = fetch(req)
            .then((res) => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; })
            .catch(() => cached);
          return cached || fetching;
        })
      )
    );
    return;
  }

  // أي طلب خارجي تاني (واتساب وغيره): يعدّي عادي بدون تدخل
  if (url.origin !== self.location.origin) return;

  // فتح الصفحة: الشبكة أولًا
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(APP_CACHE).then((c) => c.put('./index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // باقي الملفات المحلية: الكاش أولًا مع تحديث بالخلفية
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetching = fetch(req)
        .then((res) => {
          if (res && res.ok) { const copy = res.clone(); caches.open(APP_CACHE).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => cached);
      return cached || fetching;
    })
  );
});
