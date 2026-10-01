import assert from "node:assert/strict";
import { MyLinkedList } from "../implementations/linked-list";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new linked list starts empty", () => {
  const list = new MyLinkedList<number>();

  assert.equal(list.length(), 0);
  assert.equal(list.isEmpty(), true);
  assert.equal(list.head(), undefined);
  assert.equal(list.tail(), undefined);
  assert.deepEqual(list.toArray(), []);
});

runTest("simple: append and prepend maintain head tail and order", () => {
  const list = new MyLinkedList<number>();

  list.append(2);
  list.append(3);
  list.prepend(1);

  assert.equal(list.length(), 3);
  assert.equal(list.head(), 1);
  assert.equal(list.tail(), 3);
  assert.deepEqual(list.toArray(), [1, 2, 3]);
});

runTest("simple: insert get and removeAt work at boundaries", () => {
  const list = new MyLinkedList<string>();

  list.append("a");
  list.append("c");
  list.insert(1, "b");
  list.insert(3, "d");

  assert.equal(list.get(2), "c");
  assert.equal(list.removeAt(1), "b");
  assert.deepEqual(list.toArray(), ["a", "c", "d"]);
});

runTest("mildly absurd: remove and reverse preserve the right survivors", () => {
  const list = new MyLinkedList<number>();

  for (let value = 1; value <= 6; value += 1) {
    list.append(value);
  }

  assert.equal(list.remove(3), true);
  assert.equal(list.remove(42), false);
  list.reverse();

  assert.deepEqual(list.toArray(), [6, 5, 4, 2, 1]);
  assert.equal(list.indexOf(4), 2);
  assert.equal(list.contains(3), false);
});
