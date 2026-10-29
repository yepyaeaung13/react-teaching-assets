# Module 1 · Modern and Async JavaScript

Teaching assets for React, TypeScript & Next.js lessons **1.1 and 1.2**. Designed for experienced developers: two 90-minute sessions, 8:30–10:00 pm Myanmar time. These are JavaScript demonstrations; no React or TypeScript compilation is required.

## Start here

1. Open `visual-lab.html` in a browser. It works offline, including its examples; the optional YouTube link needs internet.
2. Open this folder in your editor. Use Node.js 22 or 24 for the terminal examples. No npm installation is needed.
3. Read `TEACHER-GUIDE.md`, then share `STUDENT-WORKSHEET.md`. Keep `ANSWER-KEY.md` until the exercises are finished.
4. Run `npm test` from this folder to verify the examples and reference solutions.

| Asset | Purpose |
| --- | --- |
| TEACHER-GUIDE.md | Two timed lesson plans, speaking prompts and debugging questions |
| STUDENT-WORKSHEET.md | Predict-first exercises, individual challenges and completion checklist |
| ANSWER-KEY.md | Expected outputs, explanations and quiz answers |
| visual-lab.html | Offline visual event-loop trace, closure counter and immutable-update comparison |
| examples/01-modern-javascript.mjs | Modules, named/default exports, destructuring, arrow functions and array transforms |
| examples/02-closures.mjs | Independent closure instances and live versus captured values |
| examples/03-immutable-data.mjs | Shallow-copy trap, nested updates and reference identity |
| examples/04-event-loop.mjs | Predictable synchronous, microtask and timer ordering |
| examples/05-fetch-products.mjs | Injectable Fetch service with status checking, validation and cancellation |
| examples/06-fetch-demo.mjs | Offline success, HTTP failure and cancellation demonstrations |
| exercises/ | Student starter and separate complete reference solution |

Commands: `npm run demo:modern`, `demo:closures`, `demo:immutable`, `demo:event-loop`, `demo:fetch`.

Lesson links: `/courses/react-typescript-nextjs/lessons/79` and `/courses/react-typescript-nextjs/lessons/80`.
Event-loop video: https://youtu.be/06oYUI-RDDY (already linked in lesson 1.2).

The Fetch demo uses an in-memory fake transport so classes work without internet. It is explicitly a teaching fixture, not a backend. To use a real endpoint, call `loadProducts('https://your-api.example/products')` with the appropriate API contract; browser requests also depend on the server's CORS configuration. The default response contract here is `{ products: [{ id, title, price }] }`.

No changes to the hosted course or its timetable are required to use this bundle. The teaching examples describe browser/Node behavior common to these small demonstrations; they do not cover every Node scheduling phase.
