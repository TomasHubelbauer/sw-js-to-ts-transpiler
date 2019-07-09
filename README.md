# [Service Worker TypeScript to JavaScript Transpiler](https://tomashubelbauer.github.io/sw-js-to-ts-transpiler)

[**DEMO**](https://tomashubelbauer.github.io/sw-js-to-ts-transpiler-demo)

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

---

Any request to a TypeScript file will then be transpiled on the fly:

```js
const response = fetch('code.ts');
const text = await response.text();
// `text` is now the transpiled JavaScript!
```

```html
<script src="code.ts"></script>
<!-- The transpiled JavaScript is executed by the `script` tag! -->

<script src="code.ts" type="module"></script>
<!-- ESM scripts also go through the service worker 👌 -->
```
