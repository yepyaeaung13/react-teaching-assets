import { loadProducts } from './05-fetch-products.mjs';
import { fakeFetch } from './fake-fetch.mjs';
const url = 'https://classroom.invalid/products'; // Fake transport below; no network request is made.
console.log(await loadProducts(url, { fetchImpl: fakeFetch({ body: { products: [{ id: 1, title: 'Keyboard', price: 40 }] } }) }));
try {
  await loadProducts(url, { fetchImpl: fakeFetch({ status: 404 }) });
} catch (error) { console.log(error.message); } // HTTP 404
const controller = new AbortController();
const pending = loadProducts(url, { signal: controller.signal, fetchImpl: fakeFetch({ delay: 50 }) });
controller.abort();
try { await pending; } catch (error) {
  if (controller.signal.aborted) console.log('Cancelled intentionally');
  else console.error(error);
}
