package tests

import (
	"testing"

	"dsa/data-structures/heap/implementations"
)

func TestBinaryMinHeapStartsEmpty(t *testing.T) {
	heap := implementations.NewMyBinaryMinHeap[int]()

	if got := heap.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}
	if !heap.IsEmpty() {
		t.Fatal("expected heap to be empty")
	}
}

func TestBinaryMinHeapExtractsSortedValues(t *testing.T) {
	heap := implementations.NewMyBinaryMinHeap[int]()
	for _, value := range []int{5, 3, 8, 1, 4} {
		heap.Insert(value)
	}
	if got := heap.Extract(); got != 1 {
		t.Fatalf("expected 1, got %d", got)
	}
}
