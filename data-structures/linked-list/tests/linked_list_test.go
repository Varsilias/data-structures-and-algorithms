package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/linked-list/implementations"
)

func TestLinkedListStartsEmpty(t *testing.T) {
	list := implementations.NewMyLinkedList[int]()

	if got := list.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}
	if !list.IsEmpty() {
		t.Fatal("expected list to be empty")
	}
	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{}) {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestLinkedListAppendPrependAndRemove(t *testing.T) {
	list := implementations.NewMyLinkedList[int]()

	list.Append(2)
	list.Append(3)
	list.Prepend(1)

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{1, 2, 3}) {
		t.Fatalf("expected [1 2 3], got %v", got)
	}
}
