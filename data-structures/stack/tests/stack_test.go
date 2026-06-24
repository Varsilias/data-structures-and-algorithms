package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/stack/implementations"
)

func createStackReferenceSequence() []int {
	values := make([]int, 0)

	for index := 1; index <= 50; index++ {
		values = append(values, index)
		if index%4 == 0 {
			values = values[:len(values)-1]
		}
		if index%7 == 0 {
			values = append(values, index*10)
		}
	}

	return values
}

func TestStackSimpleNewStackStartsEmpty(t *testing.T) {
	stack := implementations.NewMyStack[int](2)

	if got := stack.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if got := stack.Capacity(); got != 2 {
		t.Fatalf("expected capacity 2, got %d", got)
	}

	if !stack.IsEmpty() {
		t.Fatal("expected stack to be empty")
	}

	if got := stack.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestStackSimplePushAndPeekExposeCurrentTop(t *testing.T) {
	stack := implementations.NewMyStack[int](2)

	stack.Push(10)
	stack.Push(20)
	stack.Push(30)

	if got := stack.Length(); got != 3 {
		t.Fatalf("expected length 3, got %d", got)
	}

	if got := stack.Peek(); got != 30 {
		t.Fatalf("expected top value 30, got %d", got)
	}

	if got := stack.ToSlice(); !reflect.DeepEqual(got, []int{10, 20, 30}) {
		t.Fatalf("expected [10 20 30], got %v", got)
	}
}

func TestStackSimplePopReturnsItemsInLIFOOrder(t *testing.T) {
	stack := implementations.NewMyStack[string](2)

	stack.Push("a")
	stack.Push("b")
	stack.Push("c")

	if got := stack.Pop(); got != "c" {
		t.Fatalf("expected c, got %s", got)
	}

	if got := stack.Pop(); got != "b" {
		t.Fatalf("expected b, got %s", got)
	}

	if got := stack.Peek(); got != "a" {
		t.Fatalf("expected a, got %s", got)
	}
}

func TestStackSimpleClearResetsTheStack(t *testing.T) {
	stack := implementations.NewMyStack[int](2)

	stack.Push(1)
	stack.Push(2)
	stack.Clear()

	if got := stack.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !stack.IsEmpty() {
		t.Fatal("expected stack to be empty")
	}
}

func TestStackMildlyAbsurdGrowthBeyondInitialCapacity(t *testing.T) {
	stack := implementations.NewMyStack[int](1)

	for value := 0; value < 25; value++ {
		stack.Push(value)
	}

	if got := stack.Length(); got != 25 {
		t.Fatalf("expected length 25, got %d", got)
	}

	if got := stack.Capacity(); got < 25 {
		t.Fatalf("expected capacity to grow beyond 25, got %d", got)
	}
}

func TestStackMildlyAbsurdAlternatingPushAndPopLeavesRightSurvivors(t *testing.T) {
	stack := implementations.NewMyStack[int](2)

	stack.Push(1)
	stack.Push(2)
	stack.Pop()
	stack.Push(3)
	stack.Push(4)
	stack.Pop()
	stack.Push(5)

	if got := stack.ToSlice(); !reflect.DeepEqual(got, []int{1, 3, 5}) {
		t.Fatalf("expected [1 3 5], got %v", got)
	}
}

func TestStackAbsurdDeterministicOperationSequenceMatchesReferenceModel(t *testing.T) {
	stack := implementations.NewMyStack[int](2)
	reference := createStackReferenceSequence()

	for _, value := range reference {
		stack.Push(value)
	}

	if got := stack.ToSlice(); !reflect.DeepEqual(got, reference) {
		t.Fatalf("expected %v, got %v", reference, got)
	}
}
