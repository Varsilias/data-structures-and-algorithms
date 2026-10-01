package tests

import (
	"testing"

	"dsa/data-structures/trie/implementations"
)

func TestTrieStartsEmpty(t *testing.T) {
	trie := implementations.NewMyTrie()

	if got := trie.Size(); got != 0 {
		t.Fatalf("expected size 0, got %d", got)
	}
	if !trie.IsEmpty() {
		t.Fatal("expected trie to be empty")
	}
}

func TestTrieInsertContainsAndPrefix(t *testing.T) {
	trie := implementations.NewMyTrie()
	trie.Insert("cat")
	trie.Insert("car")

	if !trie.Contains("cat") {
		t.Fatal("expected trie to contain cat")
	}
}
