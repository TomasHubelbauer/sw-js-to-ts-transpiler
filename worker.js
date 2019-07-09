self.addEventListener('install', event => {
  console.log('install');
});

self.addEventListener('fetch', async event => {
  console.log('fetch', event.request.url);
  if (event.request.url.endsWith('.ts')) {
    event.respondWith(Promise.resolve(new Response(event.request.url), { headers: { 'Content-Type': 'application/javascript' }, status: 200 }));
  }
});
