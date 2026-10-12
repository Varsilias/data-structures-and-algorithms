package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/heap/implementations"
)

func TestBinaryMinHeapSimpleNewHeapStartsEmpty(t *testing.T) {
	heap := implementations.NewMyBinaryMinHeap[int]()

	if got := heap.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !heap.IsEmpty() {
		t.Fatal("expected heap to be empty")
	}

	if got := heap.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestBinaryMinHeapSimpleInsertKeepsTheMinimumAtTheRoot(t *testing.T) {
	heap := implementations.NewMyBinaryMinHeap[int]()

	for _, value := range []int{5, 3, 8, 1, 4} {
		heap.Insert(value)
	}

	if got := heap.Length(); got != 5 {
		t.Fatalf("expected length 5, got %d", got)
	}

	if got := heap.Peek(); got != 1 {
		t.Fatalf("expected peek 1, got %d", got)
	}
}

func TestBinaryMinHeapMildlyAbsurdRepeatedExtractReturnsSortedOrder(t *testing.T) {
	heap := implementations.NewMyBinaryMinHeap[int]()

	for _, value := range []int{9, 1, 6, 3, 7, 2, 8} {
		heap.Insert(value)
	}

	extracted := make([]int, 0)
	for !heap.IsEmpty() {
		extracted = append(extracted, heap.Extract())
	}

	if !reflect.DeepEqual(extracted, []int{1, 2, 3, 6, 7, 8, 9}) {
		t.Fatalf("expected [1 2 3 6 7 8 9], got %v", extracted)
	}
}
