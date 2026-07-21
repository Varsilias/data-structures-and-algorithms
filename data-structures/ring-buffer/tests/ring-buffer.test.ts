import assert from "node:assert/strict";
import { MyRingBuffer } from "../implementations/ring-buffer";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new ring buffer starts empty", () => {
  const buffer = new MyRingBuffer<number>(3);

  assert.equal(buffer.length(), 0);
  assert.equal(buffer.capacity(), 3);
  assert.equal(buffer.isEmpty(), true);
  assert.equal(buffer.isFull(), false);
  assert.equal(buffer.front(), undefined);
  assert.equal(buffer.rear(), undefined);
  assert.deepEqual(buffer.toArray(), []);
});

runTest("simple: enqueue fills the buffer and exposes front/rear", () => {
  const buffer = new MyRingBuffer<number>(3);

  assert.equal(buffer.enqueue(10), true);
  assert.equal(buffer.enqueue(20), true);
  assert.equal(buffer.enqueue(30), true);

  assert.equal(buffer.length(), 3);
  assert.equal(buffer.isFull(), true);
  assert.equal(buffer.front(), 10);
  assert.equal(buffer.rear(), 30);
  assert.deepEqual(buffer.toArray(), [10, 20, 30]);
});

runTest("simple: enqueue on a full buffer is rejected and leaves it untouched", () => {
  const buffer = new MyRingBuffer<number>(2);

  buffer.enqueue(1);
  buffer.enqueue(2);

  assert.equal(buffer.enqueue(3), false);
  assert.equal(buffer.length(), 2);
  assert.deepEqual(buffer.toArray(), [1, 2]);
});

runTest("simple: dequeue returns items in FIFO order and frees a slot", () => {
  const buffer = new MyRingBuffer<string>(2);

  buffer.enqueue("a");
  buffer.enqueue("b");

  assert.equal(buffer.dequeue(), "a");
  assert.equal(buffer.isFull(), false);
  assert.equal(buffer.front(), "b");
  assert.equal(buffer.dequeue(), "b");
  assert.equal(buffer.dequeue(), undefined);
});

runTest("simple: clear resets the buffer", () => {
  const buffer = new MyRingBuffer<number>(2);

  buffer.enqueue(1);
  buffer.enqueue(2);
  buffer.clear();

  assert.equal(buffer.length(), 0);
  assert.equal(buffer.isEmpty(), true);
  assert.equal(buffer.isFull(), false);
  assert.equal(buffer.dequeue(), undefined);
});

runTest("mildly absurd: repeated wraparound keeps contents correct across many cycles", () => {
  const capacity = 4;
  const buffer = new MyRingBuffer<number>(capacity);
  const reference: number[] = [];

  for (let index = 1; index <= 60; index += 1) {
    const shouldEnqueue = reference.length < capacity;
    const enqueued = buffer.enqueue(index);

    assert.equal(enqueued, shouldEnqueue);
    if (shouldEnqueue) {
      reference.push(index);
    }

    if (index % 3 === 0 && reference.length > 0) {
      buffer.dequeue();
      reference.shift();
    }
  }

  assert.deepEqual(buffer.toArray(), reference);
  assert.equal(buffer.capacity(), capacity);
});

runTest("absurd: deterministic operation sequence matches a reference model", () => {
  const capacity = 5;
  const buffer = new MyRingBuffer<number>(capacity);
  const reference: number[] = [];

  for (let index = 1; index <= 200; index += 1) {
    const shouldEnqueue = reference.length < capacity;
    const enqueued = buffer.enqueue(index);

    assert.equal(enqueued, shouldEnqueue);
    if (shouldEnqueue) {
      reference.push(index);
    }

    if (index % 3 === 0 && reference.length > 0) {
      buffer.dequeue();
      reference.shift();
    }
    if (index % 7 === 0 && reference.length > 0) {
      buffer.dequeue();
      reference.shift();
    }
  }

  assert.deepEqual(buffer.toArray(), reference);
  assert.equal(buffer.length(), reference.length);
  assert.equal(buffer.front(), reference[0]);
  assert.equal(buffer.rear(), reference[reference.length - 1]);
  assert.equal(buffer.capacity(), capacity);
});
