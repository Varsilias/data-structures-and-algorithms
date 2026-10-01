import assert from "node:assert/strict";
import { MyBinaryMinHeap } from "../implementations/binary-min-heap";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new heap starts empty", () => {
  const heap = new MyBinaryMinHeap<number>();

  assert.equal(heap.length(), 0);
  assert.equal(heap.isEmpty(), true);
  assert.equal(heap.peek(), undefined);
  assert.deepEqual(heap.toArray(), []);
});

runTest("simple: insert keeps the minimum at the root", () => {
  const heap = new MyBinaryMinHeap<number>();

  for (const value of [5, 3, 8, 1, 4]) {
    heap.insert(value);
  }

  assert.equal(heap.length(), 5);
  assert.equal(heap.peek(), 1);
});

runTest("mildly absurd: repeated extract returns sorted order", () => {
  const heap = new MyBinaryMinHeap<number>();

  for (const value of [9, 1, 6, 3, 7, 2, 8]) {
    heap.insert(value);
  }

  const extracted: number[] = [];
  while (!heap.isEmpty()) {
    extracted.push(heap.extract() as number);
  }

  assert.deepEqual(extracted, [1, 2, 3, 6, 7, 8, 9]);
});
