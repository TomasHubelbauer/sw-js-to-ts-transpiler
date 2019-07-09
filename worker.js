self.importScripts('https://unpkg.com/typescript@3.5.3/lib/typescript.js');

self.addEventListener('fetch', function(event) {
  event.respondWith(intercept(event.request));
});

async function intercept(request) {
  const response = await fetch(request);
  if (!response.ok || !request.url.endsWith('.ts') || !request.url.endsWith('.tsx')) {
    return response;
  }
  
  const text = await response.text();
  try {
    return new Response(ts.transpileModule(text, { compilerOptions: { target: 'esnext' } }).outputText, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        // Make the browser know this is now a JavaScript file
        'Content-Type': 'application/javascript',
      }
    });
  } catch (error) {
    return response;
  }
}
