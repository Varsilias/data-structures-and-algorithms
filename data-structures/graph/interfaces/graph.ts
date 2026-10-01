export interface Graph<T> {
  vertexCount(): number;
  edgeCount(): number;
  addVertex(value: T): void;
  addEdge(from: T, to: T): void;
  removeVertex(value: T): boolean;
  removeEdge(from: T, to: T): boolean;
  hasVertex(value: T): boolean;
  hasEdge(from: T, to: T): boolean;
  neighbors(value: T): T[];
  breadthFirstSearch(start: T): T[];
  depthFirstSearch(start: T): T[];
  clear(): void;
}
