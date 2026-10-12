package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/linked-list/implementations"
)

func TestLinkedListSimpleNewLinkedListStartsEmpty(t *testing.T) {
	list := implementations.NewMyLinkedList[int]()

	if got := list.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !list.IsEmpty() {
		t.Fatal("expected list to be empty")
	}

	if got := list.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestLinkedListSimpleAppendAndPrependMaintainHeadTailAndOrder(t *testing.T) {
	list := implementations.NewMyLinkedList[int]()

	list.Append(2)
	list.Append(3)
	list.Prepend(1)

	if got := list.Length(); got != 3 {
		t.Fatalf("expected length 3, got %d", got)
	}

	if got := list.Head(); got != 1 {
		t.Fatalf("expected head 1, got %d", got)
	}

	if got := list.Tail(); got != 3 {
		t.Fatalf("expected tail 3, got %d", got)
	}

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{1, 2, 3}) {
		t.Fatalf("expected [1 2 3], got %v", got)
	}
}

func TestLinkedListSimpleInsertGetAndRemoveAtWorkAtBoundaries(t *testing.T) {
	list := implementations.NewMyLinkedList[string]()

	list.Append("a")
	list.Append("c")
	list.Insert(1, "b")
	list.Insert(3, "d")

	if got := list.Get(2); got != "c" {
		t.Fatalf("expected c at index 2, got %s", got)
	}

	if got := list.RemoveAt(1); got != "b" {
		t.Fatalf("expected removeAt(1) to return b, got %s", got)
	}

	if got := list.ToSlice(); !reflect.DeepEqual(got, []string{"a", "c", "d"}) {
		t.Fatalf("expected [a c d], got %v", got)
	}
}

func TestLinkedListMildlyAbsurdRemoveAndReversePreserveTheRightSurvivors(t *testing.T) {
	list := implementations.NewMyLinkedList[int]()

	for value := 1; value <= 6; value++ {
		list.Append(value)
	}

	if !list.Remove(3) {
		t.Fatal("expected remove(3) to return true")
	}

	if list.Remove(42) {
		t.Fatal("expected remove(42) to return false")
	}

	list.Reverse()

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{6, 5, 4, 2, 1}) {
		t.Fatalf("expected [6 5 4 2 1], got %v", got)
	}

	if got := list.IndexOf(4); got != 2 {
		t.Fatalf("expected indexOf(4) to be 2, got %d", got)
	}

	if list.Contains(3) {
		t.Fatal("expected list not to contain 3")
	}
}
