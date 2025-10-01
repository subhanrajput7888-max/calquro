const CACHE_NAME = 'calquro-v1.0.0';
const STATIC_CACHE = 'calquro-static-v1.0.0';
const DYNAMIC_CACHE = 'calquro-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/tools.html',
  '/ai.html',
  '/blog.html',
  '/about.html',
  '/contact.html',
  '/css/style.css',
  '/manifest.json',
  '/tools/bmi-calculator.html',
  '/tools/age-calculator.html',
  '/tools/emi-calculator.html',
  '/tools/currency-converter.html',
  '/tools/percentage-calculator.html',
  'https://iili.io/KuC0mDQ.png'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch((error) => {
        console.error('[Service Worker] Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Cache successful responses
            const responseToCache = networkResponse.clone();
            
            // Determine which cache to use
            const shouldCacheInStatic = STATIC_FILES.some(file => 
              request.url.includes(file) || request.url.endsWith(file)
            );
            
            const cacheToUse = shouldCacheInStatic ? STATIC_CACHE : DYNAMIC_CACHE;
            
            caches.open(cacheToUse)
              .then((cache) => {
                console.log('[Service Worker] Caching new resource:', request.url);
                cache.put(request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Return a basic offline response for other requests
            return new Response('Offline', {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync operations here
      console.log('[Service Worker] Performing background sync')
    );
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: 'https://iili.io/KuC0mDQ.png',
    badge: 'https://iili.io/KuC0mDQ.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: 'https://iili.io/KuC0mDQ.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'https://iili.io/KuC0mDQ.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Calquro', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('[Service Worker] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Sync content in background
      console.log('[Service Worker] Syncing content')
    );
  }
});

// Share target handler (if app is set as share target)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname === '/share-target' && event.request.method === 'POST') {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        const sharedData = {
          title: formData.get('title'),
          text: formData.get('text'),
          url: formData.get('url')
        };
        
        // Handle shared data
        console.log('[Service Worker] Shared data received:', sharedData);
        
        // Redirect to app with shared data
        return Response.redirect('/?shared=true', 302);
      })()
    );
  }
});

console.log('[Service Worker] Service worker script loaded');