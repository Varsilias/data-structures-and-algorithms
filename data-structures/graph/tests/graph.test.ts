import assert from "node:assert/strict";
import { MyGraph } from "../implementations/graph";

function runTest(name: string, execute: () => void): void {
  try {
    execute();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("simple: new graph starts empty", () => {
  const graph = new MyGraph<string>();

  assert.equal(graph.vertexCount(), 0);
  assert.equal(graph.edgeCount(), 0);
  assert.deepEqual(graph.neighbors("missing"), []);
});

runTest("simple: addVertex and addEdge build adjacency", () => {
  const graph = new MyGraph<string>();

  graph.addVertex("A");
  graph.addVertex("B");
  graph.addEdge("A", "B");

  assert.equal(graph.vertexCount(), 2);
  assert.equal(graph.edgeCount(), 1);
  assert.equal(graph.hasVertex("A"), true);
  assert.equal(graph.hasEdge("A", "B"), true);
  assert.deepEqual(graph.neighbors("A"), ["B"]);
});

runTest("mildly absurd: bfs and dfs visit reachable vertices", () => {
  const graph = new MyGraph<string>();

  for (const [from, to] of [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"]]) {
    graph.addEdge(from, to);
  }

  assert.deepEqual(graph.breadthFirstSearch("A"), ["A", "B", "C", "D", "E"]);
  assert.deepEqual(graph.depthFirstSearch("A"), ["A", "B", "D", "C", "E"]);
});
