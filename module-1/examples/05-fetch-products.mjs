export async function loadProducts(url, { signal, fetchImpl = fetch } = {}) {
  const response = await fetchImpl(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data || !Array.isArray(data.products) || data.products.some(product =>
    !product || !Number.isSafeInteger(product.id) || typeof product.title !== 'string' ||
    typeof product.price !== 'number' || !Number.isFinite(product.price))) {
    throw new Error('Unexpected products response');
  }
  return data.products;
}
// Cancellation is an intentional caller decision, not a successful empty result.
// Let callers decide which errors should appear in their UI.
