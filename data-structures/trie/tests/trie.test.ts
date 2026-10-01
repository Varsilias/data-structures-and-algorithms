import assert from "node:assert/strict";
import { MyTrie } from "../implementations/trie";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new trie starts empty", () => {
  const trie = new MyTrie();

  assert.equal(trie.size(), 0);
  assert.equal(trie.isEmpty(), true);
  assert.equal(trie.contains("cat"), false);
  assert.equal(trie.startsWith("ca"), false);
});

runTest("simple: insert contains and startsWith distinguish words from prefixes", () => {
  const trie = new MyTrie();

  trie.insert("cat");
  trie.insert("car");
  trie.insert("cart");

  assert.equal(trie.size(), 3);
  assert.equal(trie.contains("car"), true);
  assert.equal(trie.contains("ca"), false);
  assert.equal(trie.startsWith("ca"), true);
  assert.deepEqual(trie.wordsWithPrefix("car"), ["car", "cart"]);
});

runTest("mildly absurd: remove keeps shared prefixes intact", () => {
  const trie = new MyTrie();

  for (const word of ["app", "apple", "apply", "apt"]) {
    trie.insert(word);
  }

  assert.equal(trie.remove("apple"), true);
  assert.equal(trie.contains("apple"), false);
  assert.equal(trie.contains("app"), true);
  assert.deepEqual(trie.wordsWithPrefix("app"), ["app", "apply"]);
});
