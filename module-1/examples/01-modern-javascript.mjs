import formatPrice, { products, currency } from './products.mjs';
const toCard = ({ id, title, price }) => ({ id, label: `${title}: ${formatPrice(price)}` });
const available = products.filter(({ stock }) => stock > 0).map(toCard);
console.log(currency); // USD
console.log(available); // Keyboard: $40.00; Monitor: $180.00
const user = { name: 'Aye', settings: { theme: 'dark' } };
const { name, role = 'student' } = user;
console.log(name, role); // Aye student
console.log(user.profile?.email ?? 'No email'); // No email
console.log(0 ?? 10, 0 || 10); // 0 10
const { id, ...details } = products[0];
console.log(id, details.title); // 1 Keyboard
// Default values replace undefined, not null. Arrow callbacks do not bind their own this.
