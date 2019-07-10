self.importScripts('https://unpkg.com/typescript@3.5.3/lib/typescript.js');

self.addEventListener('install', async () => {
  for (let client of await clients.matchAll()) {
    console.log('client', client);
  }
});

self.addEventListener('fetch', event => {
  event.respondWith(intercept(event.request));
});

async function intercept(request) {
  const response = await fetch(request);
  if (!response.ok || (!request.url.endsWith('.ts') && !request.url.endsWith('.tsx'))) {
    return response;
  }
  
  // TODO: Check if `result.diagnostics` is non-empty and if yes bail?
  try {
    const typescript = await response.text();
    const compilerOptions = { target: 'esnext', jsx: 'react' };
    const result = ts.transpileModule(text, { compilerOptions });
    const javascript = result.outputText;
    return new Response(javascript, {
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
