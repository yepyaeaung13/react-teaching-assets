import { test } from 'node:test';
import assert from 'node:assert/strict';
import { traceEventLoop } from './04-event-loop.mjs';
import { loadProducts } from './05-fetch-products.mjs';
import { fakeFetch } from './fake-fetch.mjs';
import { availableTitles,createCart,changeQuantity,loadUser } from '../exercises/solutions.mjs';
test('event loop preserves the predicted ordering', async () => {
  assert.deepEqual(await traceEventLoop(), ['A: sync start','B: async before await','F: sync end','C: promise microtask','D: after await microtask','E: timer task']);
});
test('product transforms do not mutate input and closure instances are independent', () => {
  const input = Object.freeze([Object.freeze({ title: 'Keyboard', stock: 1 }),Object.freeze({ title: 'Mouse', stock: 0 })]);
  assert.deepEqual(availableTitles(input), ['Keyboard']);const a=createCart(),b=createCart();a.add();a.add();assert.equal(a.read(),2);assert.equal(b.read(),0);
});
test('nested update preserves old state and shares unchanged branches', () => {
  const state={profile:{name:'Aye'},items:[{id:1,quantity:1},{id:2,quantity:3}]};
  state.items.forEach(Object.freeze);Object.freeze(state.items);Object.freeze(state);
  const next=changeQuantity(state,1,2);assert.equal(state.items[0].quantity,1);assert.equal(next.items[0].quantity,2);assert.notEqual(next.items,state.items);assert.equal(next.items[1],state.items[1]);assert.equal(next.profile,state.profile);
});
test('Fetch handles valid data, resolved HTTP errors, transport rejection and bad payloads', async () => {
  const products=[{id:1,title:'Keyboard',price:40}];assert.deepEqual(await loadProducts('fake',{fetchImpl:fakeFetch({body:{products}})}),products);
  await assert.rejects(loadProducts('fake',{fetchImpl:fakeFetch({status:404})}),/HTTP 404/);
  await assert.rejects(loadProducts('fake',{fetchImpl:fakeFetch({networkError:true})}),/Failed to fetch/);
  await assert.rejects(loadProducts('fake',{fetchImpl:fakeFetch({body:{products:[{id:1,title:'Keyboard',price:'40'}]}})}),/Unexpected/);
  await assert.rejects(loadProducts('fake',{fetchImpl:async()=>({ok:true,json:async()=>{throw new SyntaxError('Invalid JSON');}})}),/Invalid JSON/);
});
test('cancellation rejects both pending and already-aborted requests', async () => {
  const controller=new AbortController();const request=loadProducts('fake',{signal:controller.signal,fetchImpl:fakeFetch({delay:50})});controller.abort();await assert.rejects(request,{name:'AbortError'});
  await assert.rejects(loadProducts('fake',{signal:controller.signal,fetchImpl:fakeFetch()}),{name:'AbortError'});
});
test('user solution checks HTTP status and response shape', async () => {
  assert.deepEqual(await loadUser('fake',fakeFetch({body:{user:{name:'Aye'}}})),{name:'Aye'});
  await assert.rejects(loadUser('fake',fakeFetch({status:401})),/HTTP 401/);await assert.rejects(loadUser('fake',fakeFetch({body:{}})),/Unexpected/);
});
