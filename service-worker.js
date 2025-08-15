// キャッシュをインストールする
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open('delimate-cache').then(cache => {
            console.log('Service Worker: Caching Files');
            return cache.addAll([
                '/index.html',
                '/styles.css',
                '/app.js',
                '/icon.png'
            ]);
        })
    );
});

// アクティベートイベント
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
});

// フェッチリクエストのキャッシュ対応
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
