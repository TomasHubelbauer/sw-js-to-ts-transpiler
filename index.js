self.addEventListener('install', event => {
  console.log('install');
});

self.addEventListener('fetch', async event => {
  console.log('fetch', event.request.url);
});
