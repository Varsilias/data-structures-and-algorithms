import assert from "node:assert/strict";
import { MyHashMap } from "../implementations/hash-map";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new hash map starts empty", () => {
  const map = new MyHashMap<string, number>(4);

  assert.equal(map.length(), 0);
  assert.equal(map.capacity(), 4);
  assert.equal(map.isEmpty(), true);
  assert.deepEqual(map.entries(), []);
});

runTest("simple: set get has and overwrite use key equality", () => {
  const map = new MyHashMap<string, number>(4);

  map.set("red", 1);
  map.set("blue", 2);
  map.set("red", 9);

  assert.equal(map.length(), 2);
  assert.equal(map.get("red"), 9);
  assert.equal(map.has("blue"), true);
  assert.equal(map.has("green"), false);
});

runTest("simple: remove deletes only the requested key", () => {
  const map = new MyHashMap<string, number>(2);

  map.set("a", 1);
  map.set("b", 2);

  assert.equal(map.remove("a"), true);
  assert.equal(map.remove("x"), false);
  assert.equal(map.get("a"), undefined);
  assert.deepEqual(map.entries(), [["b", 2]]);
});

runTest("mildly absurd: many inserts survive resizing and collisions", () => {
  const map = new MyHashMap<string, number>(2);

  for (let index = 0; index < 50; index += 1) {
    map.set(`key-${index}`, index);
  }

  assert.equal(map.length(), 50);
  assert.equal(map.get("key-0"), 0);
  assert.equal(map.get("key-49"), 49);
  assert.ok(map.capacity() >= 50);
});
