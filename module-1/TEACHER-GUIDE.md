# Module 1 · Instructor guide

Audience: experienced developers preparing for React, TypeScript and Next.js. Teach reasoning and prediction, rather than a complete JavaScript syntax tour. Use products and carts throughout. Each lesson is one 90-minute class; dates can follow your current timetable.

## Before class

- Run `npm test` from this folder. Open the examples and `visual-lab.html` before 8:30 pm.
- Share the worksheet and starter file. Explain that TODO errors are intentional.
- Students need Node 22/24, an editor and a browser; no install or internet is required for the code exercises.
- For live classroom demonstrations, paste small JavaScript snippets only. ES-module imports and HTTP fixture demos run in the terminal, not in the portal's isolated JS coding panel.
- Have the lesson 1.2 YouTube video ready, but keep the offline trace available if the network fails. Select a useful excerpt in advance; do not assume a timestamp or video duration from these assets.

## Session 1 — Lesson 1.1

| Time | Activity | Evidence to look for |
| --- | --- | --- |
| 8:30–8:40 | Diagnostic: transform an array, explain a function returning a function | Identify gaps without repeating an entire beginner course |
| 8:40–8:55 | Named/default exports, imports, destructuring, arrow callbacks | Students can locate where a symbol comes from |
| 8:55–9:10 | Demo 01: filter → map and nullish defaults | Preserve zero; avoid accidental source mutation |
| 9:10–9:25 | Demo 02: closures and independent counters | Explain bindings versus captured snapshot values |
| 9:25–9:30 | Break | — |
| 9:30–9:45 | Demo 03: shallow-copy trap and nested immutable updates | Predict reference identities before running |
| 9:45–9:55 | Worksheet tasks 1–3 in pairs, then individual explanation | A working update that preserves previous state |
| 9:55–10:00 | Exit questions and next-class preparation | Explain the React connection in their own words |

### Speaking prompts and board notes

**Modules:** “A module explicitly publishes values. An importer asks for a named export by its exact name; the importer chooses the local name of a default export.” Show products.mjs beside demo 01. Use `./products.mjs`, including its extension in Node. Contrast `import { products }` with `import formatPrice`.

**Arrow functions:** “This short callback describes a transformation. The important question is its input and return value.” Write `item => ({ id: item.id })`, then remove the parentheses to show why a block body needs return. Explain lexical this briefly; do not use arrows as a replacement for every method.

**Defaults:** Predict `0 ?? 10` and `0 || 10`. Ask why zero stock, zero price or an empty string might be legitimate data. Destructuring defaults apply when a property is undefined; they do not replace null.

**Closures:** Draw two separate boxes, each with its own count. “A closure keeps access to its surrounding bindings after the outer call returns.” In demo 02, ask which binding `readSaved` reads. It is saved, initialized to 0, while read() reads count, now 2. Avoid saying all closures freeze old values.

**Immutability:** Write state → user and state → cart as references. A spread copies only the outer object. Predict `shallow.user === before.user` before running. Then copy the user branch. Ask why keeping the unchanged cart reference is useful rather than cloning everything.

**Bridge to React:** Each render supplies values to callbacks created during that render. Immutable updates make changes visible through new references. React's state snapshot model will be taught later; ordinary closure counters are not React state.

### Live mistakes worth demonstrating

1. Map with a block callback but no return: output contains undefined.
2. `const next = { ...state }; next.user.name = 'Su'`: old state changes too.
3. Reset count inside increment(): it never grows across calls.
4. Use || to default a zero price: fallback appears unexpectedly.

Exit check: a student should explain why next !== before, next.user !== before.user and next.cart === before.cart after a user-only update.

## Session 2 — Lesson 1.2

| Time | Activity | Evidence to look for |
| --- | --- | --- |
| 8:30–8:40 | Recap closures/references; predict a promise versus timer | Commit to an ordering before execution |
| 8:40–8:55 | Visual event-loop lab and selected video excerpt | Distinguish current synchronous work, microtasks and timer tasks |
| 8:55–9:10 | Demo 04: async function before and after await | Explain why F logs before C and D |
| 9:10–9:25 | Promise chains, async/await and try/catch | Returned promises are awaited or handled |
| 9:25–9:30 | Break | — |
| 9:30–9:45 | Demo 05/06: Fetch, response.ok and JSON contract | 404 is handled even though fetch resolves |
| 9:45–9:55 | Cancellation demo and worksheet task 4 | Suppress intentional cancellation without hiding real failures |
| 9:55–10:00 | Exit questions and challenge assignment | Explain the request → parse → validate → render path |

### Event-loop walkthrough

Run demo 04 only after students predict. Expected order: **A, B, F, C, D, E**.

1. A runs synchronously.
2. Scheduling the timer does not run its callback now.
3. The resolved promise schedules C as a microtask.
4. Calling work() executes B immediately until await suspends work(). Its continuation D is queued after C.
5. F runs before synchronous work yields.
6. Microtasks C and D run before the timer callback E.

“await pauses that async function. It does not create another JavaScript thread or make CPU-heavy code nonblocking.” A timer's zero delay is not an exact execution time. The visual lab is a finite teaching trace, not a complete browser or Node runtime simulator.

### Promise and HTTP mental model

Show `loadProducts(url).then(render).catch(showError)` beside `try { render(await loadProducts(url)); } catch (error) { showError(error); }`. Both must observe the promise's rejection. The caller owns UI state; the service owns HTTP parsing and contract checks.

Explain these separate outcomes:

| Outcome | What happens |
| --- | --- |
| HTTP 200 with valid body | Parse and return products |
| HTTP 404/500 | Fetch can resolve; response.ok check throws |
| Connection failure | Fetch rejects |
| Invalid JSON | response.json() rejects |
| Wrong JSON shape | Runtime contract check throws |
| Caller cancels | Rejection is intentional; ignore it only for that cancelled request |

Run the offline fake Fetch before a real API demonstration. Say explicitly: “This fixture controls the outcome; it is not contacting a server.” Students can change the fixture's status, delay or body to repeat failures reliably.

**Cancellation:** A component or search owner creates AbortController, passes signal to the service, then aborts when the request becomes obsolete. Abort does not undo backend work already committed. In a real search UI, also ensure only the latest active request can update state, particularly when a transport ignores cancellation.

### Homework and readiness for Module 2

Give students 30–45 minutes to finish the worksheet and test their own solution. Ask for a short explanation of one bug they fixed. They should be comfortable with modules, closures, object identity, promise rejection and HTTP status checks before introducing TypeScript contracts.

Assessment: accept working code plus explanation, not memorized output alone. Students may use a different implementation if it preserves the required behavior.
