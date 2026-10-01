import assert from "node:assert/strict";
import { MyBinarySearchTree } from "../implementations/binary-search-tree";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new tree starts empty", () => {
  const tree = new MyBinarySearchTree<number>();

  assert.equal(tree.length(), 0);
  assert.equal(tree.isEmpty(), true);
  assert.deepEqual(tree.inOrder(), []);
  assert.equal(tree.min(), undefined);
  assert.equal(tree.max(), undefined);
});

runTest("simple: insert contains min max and traversals work", () => {
  const tree = new MyBinarySearchTree<number>();

  for (const value of [5, 3, 7, 2, 4, 6, 8]) {
    tree.insert(value);
  }

  assert.equal(tree.length(), 7);
  assert.equal(tree.contains(4), true);
  assert.equal(tree.contains(10), false);
  assert.equal(tree.min(), 2);
  assert.equal(tree.max(), 8);
  assert.deepEqual(tree.inOrder(), [2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(tree.preOrder(), [5, 3, 2, 4, 7, 6, 8]);
  assert.deepEqual(tree.postOrder(), [2, 4, 3, 6, 8, 7, 5]);
  assert.deepEqual(tree.levelOrder(), [5, 3, 7, 2, 4, 6, 8]);
});

runTest("mildly absurd: removing leaf one-child and two-child nodes keeps order", () => {
  const tree = new MyBinarySearchTree<number>();

  for (const value of [5, 3, 7, 2, 4, 6, 8]) {
    tree.insert(value);
  }

  assert.equal(tree.remove(2), true);
  assert.equal(tree.remove(7), true);
  assert.equal(tree.remove(42), false);
  assert.deepEqual(tree.inOrder(), [3, 4, 5, 6, 8]);
});
