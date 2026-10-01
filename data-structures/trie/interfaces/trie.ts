export interface Trie {
  size(): number;
  isEmpty(): boolean;
  insert(word: string): void;
  contains(word: string): boolean;
  startsWith(prefix: string): boolean;
  remove(word: string): boolean;
  wordsWithPrefix(prefix: string): string[];
  clear(): void;
}
