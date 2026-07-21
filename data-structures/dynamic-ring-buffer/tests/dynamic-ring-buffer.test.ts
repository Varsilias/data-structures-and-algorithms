import assert from "node:assert/strict";
import { MyDynamicRingBuffer } from "../implementations/dynamic-ring-buffer";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new buffer starts empty", () => {
  const buffer = new MyDynamicRingBuffer<number>(2);

  assert.equal(buffer.length(), 0);
  assert.equal(buffer.capacity(), 2);
  assert.equal(buffer.isEmpty(), true);
  assert.equal(buffer.isFull(), false);
  assert.equal(buffer.front(), undefined);
  assert.equal(buffer.rear(), undefined);
  assert.deepEqual(buffer.toArray(), []);
});

runTest("simple: enqueue always succeeds and exposes front/rear", () => {
  const buffer = new MyDynamicRingBuffer<number>(2);

  assert.equal(buffer.enqueue(10), true);
  assert.equal(buffer.enqueue(20), true);
  assert.equal(buffer.enqueue(30), true);

  assert.equal(buffer.length(), 3);
  assert.equal(buffer.front(), 10);
  assert.equal(buffer.rear(), 30);
  assert.deepEqual(buffer.toArray(), [10, 20, 30]);
});

runTest("simple: dequeue returns items in FIFO order", () => {
  const buffer = new MyDynamicRingBuffer<string>(2);

  buffer.enqueue("a");
  buffer.enqueue("b");
  buffer.enqueue("c");

  assert.equal(buffer.dequeue(), "a");
  assert.equal(buffer.dequeue(), "b");
  assert.equal(buffer.front(), "c");
  assert.deepEqual(buffer.toArray(), ["c"]);
});

runTest("simple: clear resets the buffer", () => {
  const buffer = new MyDynamicRingBuffer<number>(2);

  buffer.enqueue(1);
  buffer.enqueue(2);
  buffer.clear();

  assert.equal(buffer.length(), 0);
  assert.equal(buffer.isEmpty(), true);
  assert.equal(buffer.dequeue(), undefined);
});

runTest("mildly absurd: growth preserves logical order when the buffer was wrapped", () => {
  const buffer = new MyDynamicRingBuffer<number>(3);

  buffer.enqueue(1);
  buffer.enqueue(2);
  buffer.enqueue(3);
  buffer.dequeue();
  buffer.enqueue(4);
  buffer.enqueue(5);

  assert.deepEqual(buffer.toArray(), [2, 3, 4, 5]);
  assert.equal(buffer.front(), 2);
  assert.equal(buffer.rear(), 5);
  assert.ok(buffer.capacity() >= 4);
});

runTest("mildly absurd: growth keeps happening across many wrap-then-grow cycles", () => {
  const buffer = new MyDynamicRingBuffer<number>(1);
  const reference: number[] = [];

  for (let value = 0; value < 40; value += 1) {
    buffer.enqueue(value);
    reference.push(value);

    if (value % 4 === 0 && reference.length > 0) {
      buffer.dequeue();
      reference.shift();
    }
  }

  assert.deepEqual(buffer.toArray(), reference);
  assert.equal(buffer.length(), reference.length);
  assert.ok(buffer.capacity() >= reference.length);
});

runTest("absurd: deterministic operation sequence matches a reference model", () => {
  const buffer = new MyDynamicRingBuffer<number>(2);
  const reference: number[] = [];

  for (let index = 1; index <= 80; index += 1) {
    buffer.enqueue(index);
    reference.push(index);

    if (index % 5 === 0) {
      buffer.dequeue();
      reference.shift();
    }

    if (index % 8 === 0) {
      buffer.enqueue(index * 10);
      reference.push(index * 10);
    }
  }

  assert.deepEqual(buffer.toArray(), reference);
  assert.equal(buffer.length(), reference.length);
  assert.equal(buffer.front(), reference[0]);
  assert.equal(buffer.rear(), reference[reference.length - 1]);
  assert.ok(buffer.capacity() >= reference.length);
});
