import { Trie } from "../interfaces/trie";

export class MyTrie implements Trie {
  public size(): number {
    return 0;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public insert(_word: string): void {
    throw new Error("TODO: implement insert");
  }

  public contains(_word: string): boolean {
    return false;
  }

  public startsWith(_prefix: string): boolean {
    return false;
  }

  public remove(_word: string): boolean {
    throw new Error("TODO: implement remove");
  }

  public wordsWithPrefix(_prefix: string): string[] {
    return [];
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }
}
