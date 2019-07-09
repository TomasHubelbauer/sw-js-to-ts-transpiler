# Service Worker TypeScript to JavaScript Transpiler

[**DEMO**](https://tomashubelbauer.github.io/sw-js-to-ts-transpiler)

This is a TypeScript to JavaScript on-the-fly transpiler service worker script.

To use it, place this code in your application:

`index.js`:
```js
const response = await fetch('https://tomashubelbauer.github.io/sw-js-to-ts-transpiler/worker.js');
const text = await response.text();
await navigator.serviceWorker.register('worker.js?' + btoa(text));
```

`worker.js`:
```js
eval(atob(self.location.search.substring(1)));
```

Any request to a TypeScript file will then be transpiled on the fly.
