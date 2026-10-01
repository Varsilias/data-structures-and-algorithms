export interface BinarySearchTree<T> {
  length(): number;
  isEmpty(): boolean;
  insert(value: T): void;
  contains(value: T): boolean;
  min(): T | undefined;
  max(): T | undefined;
  remove(value: T): boolean;
  inOrder(): T[];
  preOrder(): T[];
  postOrder(): T[];
  levelOrder(): T[];
  height(): number;
  clear(): void;
}
