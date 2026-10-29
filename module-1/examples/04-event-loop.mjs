export async function traceEventLoop() {
  const events = [];
  events.push('A: sync start');
  const timer = new Promise(resolve => {
    setTimeout(() => { events.push('E: timer task'); resolve(); }, 0);
  });
  Promise.resolve().then(() => events.push('C: promise microtask'));
  async function work() {
    events.push('B: async before await');
    await Promise.resolve();
    events.push('D: after await microtask');
  }
  void work();
  events.push('F: sync end');
  await timer;
  return events;
}
console.log((await traceEventLoop()).join('\n'));
// A, B, F, C, D, E. A zero-delay timer waits until the current work and queued microtasks finish.
// await pauses this async function, not the JavaScript thread. CPU-heavy synchronous work still blocks.
