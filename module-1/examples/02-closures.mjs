export function createCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    read: () => count,
    snapshot: () => { const saved = count; return () => saved; },
  };
}
const first = createCounter();
const second = createCounter(10);
const readSaved = first.snapshot();
console.log(first.increment()); // 1
console.log(first.increment()); // 2
console.log(second.read()); // 10: independent lexical environment
console.log(readSaved(), first.read()); // 0 2: captured saved value vs live count
// A closure retains access to bindings; it does not automatically freeze a snapshot.
