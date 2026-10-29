export function fakeFetch({ status = 200, body = { products: [] }, delay = 0, networkError = false } = {}) {
  return (_url, { signal } = {}) => new Promise((resolve, reject) => {
    let timer;
    const cleanup = () => signal?.removeEventListener('abort', abort);
    const abort = () => { clearTimeout(timer); cleanup(); reject(new DOMException('Request cancelled', 'AbortError')); };
    if (signal?.aborted) { abort(); return; }
    signal?.addEventListener('abort', abort, { once: true });
    timer = setTimeout(() => {
      cleanup();
      if (networkError) { reject(new TypeError('Failed to fetch')); return; }
      resolve({ ok: status >= 200 && status < 300, status, json: async () => structuredClone(body) });
    }, delay);
  });
}
