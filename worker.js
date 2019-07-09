self.importScripts('https://unpkg.com/typescript@3.5.3/lib/typescript.js');

self.addEventListener('fetch', function(event) {
  event.respondWith(intercept(event.request));
});

async function intercept(request) {
  const response = await fetch(request);
  if (!request.url.endsWith('.ts') || !response.ok) {
    return response;
  }
  
  try {
    return new Response(ts.transpileModule(await response.text(), { compilerOptions: { target: 'esnext' } }).outputText, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        // Make the browser know this is now a JavaScript file
        'Content-Type': 'text/javascript',
      }
    });
  } catch (error) {
    return response;
  }
}
