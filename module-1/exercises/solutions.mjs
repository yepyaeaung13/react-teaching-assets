export function availableTitles(products) {
  return products.filter(product => product.stock > 0).map(product => product.title);
}
export function createCart() {
  let quantity = 0;
  return { add: () => ++quantity, read: () => quantity };
}
export function changeQuantity(state, id, quantity) {
  return { ...state, items: state.items.map(item => item.id === id ? { ...item, quantity } : item) };
}
export async function loadUser(url, fetchImpl = fetch) {
  const response = await fetchImpl(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data || !data.user || typeof data.user.name !== 'string') throw new Error('Unexpected user response');
  return data.user;
}
