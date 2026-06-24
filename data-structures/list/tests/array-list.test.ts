import assert from "node:assert/strict";
import { ArrayList } from "../implementations/array-list";

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

  for (let index = 0; index < 40; index += 1) {
    if (index % 3 === 0) {
      values.unshift(index);
    } else if (index % 3 === 1) {
      values.push(index);
    } else {
      values.splice(Math.floor(values.length / 2), 0, index);
    }
  }

  values.splice(5, 1);
  values.splice(0, 1);
  values.splice(values.length - 1, 1);

  return values;
}

runTest("simple: new list starts empty", () => {
  const list = new ArrayList<number>(2);

  assert.equal(list.length(), 0);
  assert.equal(list.capacity(), 2);
  assert.equal(list.isEmpty(), true);
  assert.deepEqual(list.toArray(), []);
});

runTest("simple: append and get preserve insertion order", () => {
  const list = new ArrayList<number>(2);

  list.append(10);
  list.append(20);
  list.append(30);


  assert.equal(list.length(), 3);
  assert.equal(list.get(0), 10);
  assert.equal(list.get(1), 20);
  assert.equal(list.get(2), 30);
  assert.deepEqual(list.toArray(), [10, 20, 30]);
});

runTest("simple: prepend and insert work at front middle and end", () => {
  const list = new ArrayList<string>(1);

  list.append("b");
  list.prepend("a");
  list.insert(2, "d");
  list.insert(2, "c");

  assert.deepEqual(list.toArray(), ["a", "b", "c", "d"]);
});

runTest("simple: set updates an existing value", () => {
  const list = new ArrayList<number>(2);

  list.append(1);
  list.append(2);
  list.set(1, 99);

  assert.equal(list.get(1), 99);
  assert.deepEqual(list.toArray(), [1, 99]);
});

runTest("simple: removeAt returns removed value and shifts left", () => {
  const list = new ArrayList<number>(2);

  list.append(4);
  list.append(5);
  list.append(6);
  list.append(7);

  assert.equal(list.removeAt(1), 5);
  assert.deepEqual(list.toArray(), [4, 6, 7]);
  assert.equal(list.length(), 3);
});

runTest("simple: remove deletes the first matching value only", () => {
  const list = new ArrayList<number>(2);

  list.append(8);
  list.append(9);
  list.append(8);

  assert.equal(list.remove(8), true);
  assert.deepEqual(list.toArray(), [9, 8]);
  assert.equal(list.remove(42), false);
});

runTest("simple: contains and indexOf report missing values correctly", () => {
  const list = new ArrayList<string>(2);

  list.append("red");
  list.append("blue");

  assert.equal(list.contains("red"), true);
  assert.equal(list.contains("green"), false);
  assert.equal(list.indexOf("blue"), 1);
  assert.equal(list.indexOf("green"), -1);
});

runTest("simple: clear resets the list", () => {
  const list = new ArrayList<number>(2);

  list.append(1);
  list.append(2);
  list.clear();

  assert.equal(list.length(), 0);
  assert.equal(list.isEmpty(), true);
  assert.deepEqual(list.toArray(), []);
});

runTest("mildly absurd: list grows beyond its starting capacity", () => {
  const list = new ArrayList<number>(1);

  for (let value = 0; value < 25; value += 1) {
    list.append(value);
  }

  assert.equal(list.length(), 25);
  assert.ok(list.capacity() >= 25);
  assert.equal(list.get(24), 24);
});

runTest("mildly absurd: alternating prepend append and remove keeps order stable", () => {
  const list = new ArrayList<number>(2);

  list.append(3);
  list.prepend(2);
  list.append(4);
  list.prepend(1);
  list.insert(2, 99);
  list.removeAt(2);
  list.remove(4);

  assert.deepEqual(list.toArray(), [1, 2, 3]);
});

runTest("absurd: deterministic operation sequence matches a reference model", () => {
  const list = new ArrayList<number>(2);
  const reference = createReferenceSequence();

  for (const value of reference) {
    list.append(value);
  }

  assert.deepEqual(list.toArray(), reference);
  assert.equal(list.length(), reference.length);
});
