import { Graph } from "../interfaces/graph";

export class MyGraph<T> implements Graph<T> {
  public vertexCount(): number {
    return 0;
  }

  public edgeCount(): number {
    return 0;
  }

  public addVertex(_value: T): void {
    throw new Error("TODO: implement addVertex");
  }

  public addEdge(_from: T, _to: T): void {
    throw new Error("TODO: implement addEdge");
  }

  public removeVertex(_value: T): boolean {
    throw new Error("TODO: implement removeVertex");
  }

  public removeEdge(_from: T, _to: T): boolean {
    throw new Error("TODO: implement removeEdge");
  }

  public hasVertex(_value: T): boolean {
    return false;
  }

  public hasEdge(_from: T, _to: T): boolean {
    return false;
  }

  public neighbors(_value: T): T[] {
    return [];
  }

  public breadthFirstSearch(_start: T): T[] {
    throw new Error("TODO: implement breadthFirstSearch");
  }

  public depthFirstSearch(_start: T): T[] {
    throw new Error("TODO: implement depthFirstSearch");
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }
}
