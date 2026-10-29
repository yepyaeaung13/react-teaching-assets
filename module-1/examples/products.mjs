export const currency = 'USD';
export const products = [
  { id: 1, title: 'Keyboard', price: 40, stock: 3 },
  { id: 2, title: 'Mouse', price: 20, stock: 0 },
  { id: 3, title: 'Monitor', price: 180, stock: 2 },
];
export default function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
