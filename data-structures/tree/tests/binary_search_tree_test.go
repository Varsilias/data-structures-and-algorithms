package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/tree/implementations"
)

func TestBinarySearchTreeStartsEmpty(t *testing.T) {
	tree := implementations.NewMyBinarySearchTree[int]()

	if got := tree.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}
	if !tree.IsEmpty() {
		t.Fatal("expected tree to be empty")
	}
	if got := tree.InOrder(); !reflect.DeepEqual(got, []int{}) {
		t.Fatalf("expected empty traversal, got %v", got)
	}
}

func TestBinarySearchTreeInsertAndTraversal(t *testing.T) {
	tree := implementations.NewMyBinarySearchTree[int]()
	for _, value := range []int{5, 3, 7, 2, 4, 6, 8} {
		tree.Insert(value)
	}
	if got := tree.InOrder(); !reflect.DeepEqual(got, []int{2, 3, 4, 5, 6, 7, 8}) {
		t.Fatalf("expected sorted traversal, got %v", got)
	}
}
