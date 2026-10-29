# Module 1 · Instructor answer key

Reference implementations: exercises/solutions.mjs. The tests run against those solutions by default, not the unfinished student file.

## Worksheet answers

1. `products.filter(p => p.stock > 0).map(p => p.title)`. Both operations return new arrays; this callback does not mutate product objects. A block callback without return produces undefined elements. An equivalent one-pass solution is acceptable.
2. A closure over quantity. After two additions to a, a.read() is 2 while b.read() is 0. The two factory calls create distinct lexical environments. add returns the incremented value.
3. Return an outer spread with items.map; spread the matching item and change quantity. For a changed item, outer identity, array identity and item identity differ; the old quantity stays unchanged. Non-target objects and profile remain shared. Our reference implementation still creates a new outer object and array for a missing ID; returning the original state for a no-op is also defensible if documented.
4. Check response.ok before parsing. Await JSON; validate data.user.name. Catch handles thrown errors/rejected promises, but an HTTP status error does not automatically make fetch reject. Network failure and invalid JSON are separate failure paths. In TypeScript later, type annotations do not replace this runtime validation.
5. A, B, F, C, D, E. B is synchronous before await. C and D are queued microtasks; their queue order in this example follows when they were scheduled. E is the timer task.
6. An aborted controller's signal remains aborted. Use a new controller for the next request. For the cancelled request, catch distinguishes intentional abort from a real failure. Do not return a fake success value that looks like valid empty data.

### Latest-request extension

```js
let latest = 0;
async function search(term) {
  const request = ++latest;
  try {
    const result = await service(term);
    if (request !== latest) return;
    render(result);
  } catch (error) {
    if (request !== latest) return;
    showError(error);
  }
}
```

service/render/showError above are explanatory placeholders. This guard prevents stale UI commits; AbortController can additionally stop obsolete client work. In a real owner cleanup, invalidate the latest request and abort outstanding work. Authentication, state stores and React effects are later lessons.

## Quick predictions

- `0 ?? 10` → 0; `0 || 10` → 10.
- Spread creates one new outer object and shares nested references unless copied explicitly.
- const prevents rebinding that variable; it does not freeze an object.
- Closures retain access to bindings. A separately captured value can behave as a snapshot; demo 02 makes that distinction explicit.

## Demo outputs

| Demo | Expected behavior |
| --- | --- |
| 01 | USD; Keyboard and Monitor cards; Aye/student; No email; 0 and 10; 1/Keyboard |
| 02 | 1, 2, 10, then 0 and 2 |
| 03 | true; Aye/Su; false/false/true; 1/2 |
| 04 | A, B, F, C, D, E |
| 06 | Keyboard product array; HTTP 404; Cancelled intentionally |

The offline visual event-loop lab uses labels A–F for the same sequence. Its queues deliberately omit runtime details unrelated to this small trace.

## Exit quiz

1 B · 2 B · 3 A · 4 B · 5 A and B · 6 B.

## Review rubric

Score each area 0–2: behavior, explanation, preservation of prior state, asynchronous failure handling, and readable code. 0 = missing; 1 = works with prompting/has a gap; 2 = independent and explained. Use the evidence to decide what to revisit; these ten points are a teaching checkpoint, not the entire certificate assessment.

Common corrections: do not teach closures as automatically frozen values; do not promise exact timer timing; do not treat every resolved fetch as successful HTTP; do not hide all caught errors as cancellations; do not confuse JavaScript const with immutability.
