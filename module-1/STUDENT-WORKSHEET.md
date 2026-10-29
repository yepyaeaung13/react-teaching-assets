# Module 1 · Student worksheet

Work in `exercises/student.mjs`. Start by predicting results, then run the relevant example. Keep your explanations beside your code. Do not open the answer key until your first attempt is complete.

## Lesson 1.1

### 1. Transform product data — 8 minutes

Implement availableTitles(products). Return an array of titles for stock > 0. Preserve the original array and its objects. With Keyboard stock 3, Mouse stock 0 and Monitor stock 2, expect `['Keyboard', 'Monitor']`.

Explain: Why filter before map? What happens if your map callback uses braces without return?

### 2. Encapsulate a cart counter — 8 minutes

Implement createCart(). Its private quantity starts at zero. add() increments and returns the new quantity; read() returns the current quantity. Two independently created carts must not share their quantity.

Predict before running: create a, create b, a.add(), a.add(), then read both. Explain which variable remains accessible after createCart returns.

### 3. Update nested state — 12 minutes

Implement changeQuantity(state, id, quantity). The state contains profile and an items array. Update only the matching item with an immutable update. Use valid nonnegative quantities for this exercise; validation is a separate concern.

Required checks:

- The original quantity is unchanged.
- The returned outer object, items array and changed item have new identities.
- Other items and profile keep their existing identities.

Do not solve this by serializing/cloning the entire state. What happens when no item matches? Explain whether your implementation still creates a new outer object and array.

### Quick prediction

1. What are `0 ?? 10` and `0 || 10`?
2. Does `{ ...old }` copy old.user too?
3. Does const prevent changes to an object's properties?
4. Does a closure always store a frozen snapshot?

## Lesson 1.2

### 4. Implement an HTTP service — 12 minutes

Implement loadUser(url, fetchImpl). Await the response, throw `Error('HTTP ' + status)` when response.ok is false, await JSON, validate that data.user.name is a string, and return data.user. Throw `Unexpected user response` for invalid shape.

Use fakeFetch from examples/fake-fetch.mjs to try:

- status 200, body `{ user: { name: 'Aye' } }`;
- status 401;
- status 200, body `{}`;
- networkError true.

Why is checking the status necessary when you already have catch?

### 5. Predict scheduling — 8 minutes

Read demo 04 without executing it. Write the six labels in order. Which lines run before the first await? Does a zero-delay timer run immediately? Then run the file and explain any difference from your prediction.

### 6. Cancel obsolete work — 10 minutes

Adapt demo 06 to start a slow request and immediately cancel it. Add a success log after awaiting the result; prove it does not execute for the cancelled request. Then run a second request with a NEW controller and show success. Aborted signals cannot be reused for a new active request.

Extension: request A is slow and request B is fast. Model a monotonically increasing request ID so only the latest request may commit a result. Explain why cancellation and a latest-request guard can serve different purposes.

## Exit quiz — choose one answer unless marked multiple

1. A shallow object spread copies: A every nested object; B the outer object; C no properties.
2. Two calls to a counter factory normally create: A one shared local count; B independent local counts; C global variables.
3. fetch receives HTTP 404. It usually: A resolves with a response whose ok is false; B rejects solely because of 404; C returns null.
4. await pauses: A the entire JavaScript thread; B the current async function; C all pending requests.
5. Multiple: which may reject? A fetch on network failure; B response.json() on invalid JSON; C every fetch receiving HTTP 500 automatically.
6. A cancelled request should: A always show a server error toast; B be distinguished from genuine failures; C clear all application data.

## Submit

Your completed student file, the predicted event-loop order, and a brief explanation of the mutation trap and HTTP error handling. Include one cancellation demonstration. Self-check: you can explain each result without relying on the answer key.

To verify your own code, temporarily change the solution import in examples/check.test.mjs from `../exercises/solutions.mjs` to `../exercises/student.mjs`, then run `npm test`. Keep the reference import unchanged in the teacher's original copy.
