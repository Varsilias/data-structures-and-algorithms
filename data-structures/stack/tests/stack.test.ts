import assert from "node:assert/strict";
import { MyStack } from "../implementations/stack";

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
    if (index % 4 === 0) {
      values.pop();
    }
    if (index % 7 === 0) {
      values.push(index * 10);
    }
  }

  return values;
}

runTest("simple: new stack starts empty", () => {
  const stack = new MyStack<number>(2);

  assert.equal(stack.length(), 0);
  assert.equal(stack.capacity(), 2);
  assert.equal(stack.isEmpty(), true);
  assert.equal(stack.peek(), undefined);
  assert.deepEqual(stack.toArray(), []);
});

runTest("simple: push and peek expose the current top", () => {
  const stack = new MyStack<number>(2);

  stack.push(10);
  stack.push(20);
  stack.push(30);

  assert.equal(stack.length(), 3);
  assert.equal(stack.peek(), 30);
  assert.deepEqual(stack.toArray(), [10, 20, 30]);
});

runTest("simple: pop returns items in LIFO order", () => {
  const stack = new MyStack<string>(2);

  stack.push("a");
  stack.push("b");
  stack.push("c");

  assert.equal(stack.pop(), "c");
  assert.equal(stack.pop(), "b");
  assert.equal(stack.peek(), "a");
  assert.deepEqual(stack.toArray(), ["a"]);
});

runTest("simple: clear resets the stack", () => {
  const stack = new MyStack<number>(2);

  stack.push(1);
  stack.push(2);
  stack.clear();

  assert.equal(stack.length(), 0);
  assert.equal(stack.isEmpty(), true);
  assert.equal(stack.pop(), undefined);
});

runTest("mildly absurd: stack grows beyond initial capacity", () => {
  const stack = new MyStack<number>(1);

  for (let value = 0; value < 25; value += 1) {
    stack.push(value);
  }

  assert.equal(stack.length(), 25);
  assert.ok(stack.capacity() >= 25);
  assert.equal(stack.peek(), 24);
});

runTest("mildly absurd: alternating push and pop leaves the right survivors", () => {
  const stack = new MyStack<number>(2);

  stack.push(1);
  stack.push(2);
  stack.pop();
  stack.push(3);
  stack.push(4);
  stack.pop();
  stack.push(5);

  assert.deepEqual(stack.toArray(), [1, 3, 5]);
  assert.equal(stack.peek(), 5);
});

runTest("absurd: deterministic operation sequence matches a reference model", () => {
  const stack = new MyStack<number>(2);
  const reference = createReferenceSequence();

  for (const value of reference) {
    stack.push(value);
  }

  assert.deepEqual(stack.toArray(), reference);
  assert.equal(stack.length(), reference.length);
  assert.equal(stack.peek(), reference[reference.length - 1]);
});
