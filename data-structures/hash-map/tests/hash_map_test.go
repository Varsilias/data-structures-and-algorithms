package tests

import (
	"testing"

	"dsa/data-structures/hash-map/implementations"
)

func TestHashMapStartsEmpty(t *testing.T) {
	hashMap := implementations.NewMyHashMap[string, int](4)

	if got := hashMap.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}
	if got := hashMap.Capacity(); got != 4 {
		t.Fatalf("expected capacity 4, got %d", got)
	}
	if !hashMap.IsEmpty() {
		t.Fatal("expected map to be empty")
	}
}

func TestHashMapSetGetAndRemove(t *testing.T) {
	hashMap := implementations.NewMyHashMap[string, int](2)
	hashMap.Set("a", 1)
	hashMap.Set("b", 2)
	hashMap.Set("a", 9)

	if got := hashMap.Get("a"); got != 9 {
		t.Fatalf("expected 9, got %d", got)
	}
}
