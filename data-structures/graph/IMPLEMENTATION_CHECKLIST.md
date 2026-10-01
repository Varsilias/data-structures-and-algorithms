# Graph Checklist

Implement these in all three languages:

- `vertexCount`
- `edgeCount`
- `addVertex`
- `addEdge`
- `removeVertex`
- `removeEdge`
- `hasVertex`
- `hasEdge`
- `neighbors`
- `breadthFirstSearch`
- `depthFirstSearch`
- `clear`

Core invariants to preserve:

- adding an edge creates missing vertices or rejects them consistently
- duplicate edges do not inflate edge count
- removing a vertex removes every incident edge
- neighbor order is deterministic for tests
- BFS visits by queue order
- DFS visits by stack or recursive neighbor order

Test tiers:

- simple: add vertices, add edges, remove edges, and inspect neighbors
- mildly absurd: disconnected components and repeated duplicate edges
- absurd: traversal order checked on a fixed graph
