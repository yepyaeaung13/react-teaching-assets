export function renameUser(state, name) {
  return { ...state, user: { ...state.user, name } };
}
const before = { user: { name: 'Aye' }, cart: [{ id: 1, quantity: 1 }] };
const shallow = { ...before };
console.log(shallow.user === before.user); // true
const after = renameUser(before, 'Su');
console.log(before.user.name, after.user.name); // Aye Su
console.log(after === before, after.user === before.user, after.cart === before.cart); // false false true
const withQuantity = {
  ...before,
  cart: before.cart.map(item => item.id === 1 ? { ...item, quantity: 2 } : item),
};
console.log(before.cart[0].quantity, withQuantity.cart[0].quantity); // 1 2
// Copy only the changed paths; unchanged branches can share references.
