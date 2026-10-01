import { BinarySearchTree } from "../interfaces/binary-search-tree";

export class MyBinarySearchTree<T> implements BinarySearchTree<T> {
  public length(): number {
    return 0;
  }

  public isEmpty(): boolean {
    return this.length() === 0;
  }

  public insert(_value: T): void {
    throw new Error("TODO: implement insert");
  }

  public contains(_value: T): boolean {
    return false;
  }

  public min(): T | undefined {
    return undefined;
  }

  public max(): T | undefined {
    return undefined;
  }

  public remove(_value: T): boolean {
    throw new Error("TODO: implement remove");
  }

  public inOrder(): T[] {
    return [];
  }

  public preOrder(): T[] {
    return [];
  }

  public postOrder(): T[] {
    return [];
  }

  public levelOrder(): T[] {
    return [];
  }

  public height(): number {
    return 0;
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }
}
