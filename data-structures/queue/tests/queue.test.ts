import assert from "node:assert/strict";
import { MyQueue } from "../implementations/queue";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

function createReferenceSequence(): number[] {
  const values: number[] = [];

  for (let index = 1; index <= 50; index += 1) {
    values.push(index);
    if (index % 5 === 0) {
      values.shift();
    }
    if (index % 8 === 0) {
      values.push(index * 10);
    }
  }

  return values;
}

runTest("simple: new queue starts empty", () => {
  const queue = new MyQueue<number>(2);

  assert.equal(queue.length(), 0);
  assert.equal(queue.capacity(), 2);
  assert.equal(queue.isEmpty(), true);
  assert.equal(queue.peek(), undefined);
  assert.deepEqual(queue.toArray(), []);
});

runTest("simple: enqueue and peek expose the current front", () => {
  const queue = new MyQueue<number>(2);

  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);

  assert.equal(queue.length(), 3);
  assert.equal(queue.peek(), 10);
  assert.deepEqual(queue.toArray(), [10, 20, 30]);
});

runTest("simple: dequeue returns items in FIFO order", () => {
  const queue = new MyQueue<string>(2);

  queue.enqueue("a");
  queue.enqueue("b");
  queue.enqueue("c");

  assert.equal(queue.dequeue(), "a");
  assert.equal(queue.dequeue(), "b");
  assert.equal(queue.peek(), "c");
  assert.deepEqual(queue.toArray(), ["c"]);
});

runTest("simple: clear resets the queue", () => {
  const queue = new MyQueue<number>(2);

  queue.enqueue(1);
  queue.enqueue(2);
  queue.clear();

  assert.equal(queue.length(), 0);
  assert.equal(queue.isEmpty(), true);
  assert.equal(queue.dequeue(), undefined);
});

runTest("mildly absurd: queue grows beyond initial capacity", () => {
  const queue = new MyQueue<number>(1);

  for (let value = 0; value < 25; value += 1) {
    queue.enqueue(value);
  }

  assert.equal(queue.length(), 25);
  assert.ok(queue.capacity() >= 25);
  assert.equal(queue.peek(), 0);
});

runTest("mildly absurd: alternating enqueue and dequeue leaves the right survivors", () => {
  const queue = new MyQueue<number>(2);

  queue.enqueue(1);
  queue.enqueue(2);
  queue.dequeue();
  queue.enqueue(3);
  queue.enqueue(4);
  queue.dequeue();
  queue.enqueue(5);

  assert.deepEqual(queue.toArray(), [3, 4, 5]);
  assert.equal(queue.peek(), 3);
});

runTest("absurd: deterministic operation sequence matches a reference model", () => {
  const queue = new MyQueue<number>(2);
  const reference = createReferenceSequence();

  for (const value of reference) {
    queue.enqueue(value);
  }

  assert.deepEqual(queue.toArray(), reference);
  assert.equal(queue.length(), reference.length);
  assert.equal(queue.peek(), reference[0]);
});
