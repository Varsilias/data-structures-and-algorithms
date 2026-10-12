package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/trie/implementations"
)

func TestTrieSimpleNewTrieStartsEmpty(t *testing.T) {
	trie := implementations.NewMyTrie()

	if got := trie.Size(); got != 0 {
		t.Fatalf("expected size 0, got %d", got)
	}

	if !trie.IsEmpty() {
		t.Fatal("expected trie to be empty")
	}

	if trie.Contains("cat") {
		t.Fatal("expected empty trie not to contain cat")
	}

	if trie.StartsWith("ca") {
		t.Fatal("expected empty trie not to have prefix ca")
	}
}

func TestTrieSimpleInsertContainsAndStartsWithDistinguishWordsFromPrefixes(t *testing.T) {
	trie := implementations.NewMyTrie()

	trie.Insert("cat")
	trie.Insert("car")
	trie.Insert("cart")

	if got := trie.Size(); got != 3 {
		t.Fatalf("expected size 3, got %d", got)
	}

	if !trie.Contains("car") {
		t.Fatal("expected trie to contain car")
	}

	if trie.Contains("ca") {
		t.Fatal("expected trie not to contain ca as a word")
	}

	if !trie.StartsWith("ca") {
		t.Fatal("expected trie to have prefix ca")
	}

	if got := trie.WordsWithPrefix("car"); !reflect.DeepEqual(got, []string{"car", "cart"}) {
		t.Fatalf("expected [car cart], got %v", got)
	}
}

func TestTrieMildlyAbsurdRemoveKeepsSharedPrefixesIntact(t *testing.T) {
	trie := implementations.NewMyTrie()

	for _, word := range []string{"app", "apple", "apply", "apt"} {
		trie.Insert(word)
	}

	if !trie.Remove("apple") {
		t.Fatal("expected remove(apple) to return true")
	}

	if trie.Contains("apple") {
		t.Fatal("expected trie not to contain apple")
	}

	if !trie.Contains("app") {
		t.Fatal("expected trie to still contain app")
	}

	if got := trie.WordsWithPrefix("app"); !reflect.DeepEqual(got, []string{"app", "apply"}) {
		t.Fatalf("expected [app apply], got %v", got)
	}
}
