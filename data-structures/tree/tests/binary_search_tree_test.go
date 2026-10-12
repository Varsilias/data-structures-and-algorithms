package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/tree/implementations"
)

func TestBinarySearchTreeSimpleNewTreeStartsEmpty(t *testing.T) {
	tree := implementations.NewMyBinarySearchTree[int]()

	if got := tree.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !tree.IsEmpty() {
		t.Fatal("expected tree to be empty")
	}

	if got := tree.InOrder(); len(got) != 0 {
		t.Fatalf("expected empty traversal, got %v", got)
	}
}

func TestBinarySearchTreeSimpleInsertContainsMinMaxAndTraversalsWork(t *testing.T) {
	tree := implementations.NewMyBinarySearchTree[int]()

	for _, value := range []int{5, 3, 7, 2, 4, 6, 8} {
		tree.Insert(value)
	}

	if got := tree.Length(); got != 7 {
		t.Fatalf("expected length 7, got %d", got)
	}

	if !tree.Contains(4) {
		t.Fatal("expected tree to contain 4")
	}

	if tree.Contains(10) {
		t.Fatal("expected tree not to contain 10")
	}

	if got := tree.Min(); got != 2 {
		t.Fatalf("expected min 2, got %d", got)
	}

	if got := tree.Max(); got != 8 {
		t.Fatalf("expected max 8, got %d", got)
	}

	if got := tree.InOrder(); !reflect.DeepEqual(got, []int{2, 3, 4, 5, 6, 7, 8}) {
		t.Fatalf("expected in-order [2 3 4 5 6 7 8], got %v", got)
	}

	if got := tree.PreOrder(); !reflect.DeepEqual(got, []int{5, 3, 2, 4, 7, 6, 8}) {
		t.Fatalf("expected pre-order [5 3 2 4 7 6 8], got %v", got)
	}

	if got := tree.PostOrder(); !reflect.DeepEqual(got, []int{2, 4, 3, 6, 8, 7, 5}) {
		t.Fatalf("expected post-order [2 4 3 6 8 7 5], got %v", got)
	}

	if got := tree.LevelOrder(); !reflect.DeepEqual(got, []int{5, 3, 7, 2, 4, 6, 8}) {
		t.Fatalf("expected level-order [5 3 7 2 4 6 8], got %v", got)
	}
}

func TestBinarySearchTreeMildlyAbsurdRemovingLeafOneChildAndTwoChildNodesKeepsOrder(t *testing.T) {
	tree := implementations.NewMyBinarySearchTree[int]()

	for _, value := range []int{5, 3, 7, 2, 4, 6, 8} {
		tree.Insert(value)
	}

	if !tree.Remove(2) {
		t.Fatal("expected remove(2) to return true")
	}

	if !tree.Remove(7) {
		t.Fatal("expected remove(7) to return true")
	}

	if tree.Remove(42) {
		t.Fatal("expected remove(42) to return false")
	}

	if got := tree.InOrder(); !reflect.DeepEqual(got, []int{3, 4, 5, 6, 8}) {
		t.Fatalf("expected [3 4 5 6 8], got %v", got)
	}
}
