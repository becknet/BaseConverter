const CACHE_NAME = 'base-converter-v1.2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Install event - cache only essential assets
self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing v1.2.0...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching essential assets only');
        // Only cache external dependencies, not our own files
        return cache.addAll([
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
        ]);
      })
      .then(function() {
        console.log('Service Worker: Essential assets cached, skipping waiting');
        return self.skipWaiting(); // Force immediate activation
      })
      .catch(function(error) {
        console.log('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activating v1.2.0...');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('Service Worker: Activated, claiming clients');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener('fetch', function(event) {
  // Skip non-http(s) requests like chrome-extension://
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  const url = new URL(event.request.url);
  const isOwnOrigin = url.origin === location.origin;
  const isHTMLRequest = event.request.destination === 'document' || 
                       event.request.headers.get('accept')?.includes('text/html');
  
  if (isOwnOrigin && isHTMLRequest) {
    // Network First strategy for HTML files (always get fresh content)
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Cache the fresh response
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(function() {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First strategy for assets (CSS, JS, images)
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Service Worker: Serving from cache', event.request.url);
            return response;
          }
          
          console.log('Service Worker: Fetching from network', event.request.url);
          return fetch(event.request).then(function(response) {
            // Cache successful responses
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          });
        })
        .catch(function(error) {
          console.log('Service Worker: Request failed', error);
          throw error;
        })
    );
  }
});

// Background sync (for future enhancements)
self.addEventListener('sync', function(event) {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background tasks here
      console.log('Service Worker: Performing background sync')
    );
  }
});

// Push notifications (for future enhancements)
self.addEventListener('push', function(event) {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Base Converter Benachrichtigung',
    icon: 'icon-192x192.png',
    badge: 'icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'App öffnen',
        icon: 'icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Schließen',
        icon: 'icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Base Converter', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle app shortcuts
self.addEventListener('message', function(event) {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});