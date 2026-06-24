package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/list/implementations"
)

func createReferenceSequence() []int {
	values := make([]int, 0)

	for index := range 40 {
		switch index % 3 {
		case 0:
			values = append([]int{index}, values...)
		case 1:
			values = append(values, index)
		default:
			insertAt := len(values) / 2
			values = append(values[:insertAt], append([]int{index}, values[insertAt:]...)...)
		}
	}

	values = append(values[:5], values[6:]...)
	values = values[1:]
	values = values[:len(values)-1]

	return values
}

func TestArrayListSimpleNewListStartsEmpty(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	if got := list.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if got := list.Capacity(); got != 2 {
		t.Fatalf("expected capacity 2, got %d", got)
	}

	if !list.IsEmpty() {
		t.Fatal("expected list to be empty")
	}

	if got := list.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestArrayListSimpleAppendAndGetPreserveInsertionOrder(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	list.Append(10)
	list.Append(20)
	list.Append(30)

	if got := list.Length(); got != 3 {
		t.Fatalf("expected length 3, got %d", got)
	}

	if got := list.Get(0); got != 10 {
		t.Fatalf("expected first element 10, got %d", got)
	}

	if got := list.Get(2); got != 30 {
		t.Fatalf("expected last element 30, got %d", got)
	}

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{10, 20, 30}) {
		t.Fatalf("expected [10 20 30], got %v", got)
	}
}

func TestArrayListSimplePrependAndInsertWorkAtFrontMiddleAndEnd(t *testing.T) {
	list := implementations.NewArrayList[string](1)

	list.Append("b")
	list.Prepend("a")
	list.Insert(2, "d")
	list.Insert(2, "c")

	if got := list.ToSlice(); !reflect.DeepEqual(got, []string{"a", "b", "c", "d"}) {
		t.Fatalf("expected [a b c d], got %v", got)
	}
}

func TestArrayListSimpleSetUpdatesExistingValue(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	list.Append(1)
	list.Append(2)
	list.Set(1, 99)

	if got := list.Get(1); got != 99 {
		t.Fatalf("expected value 99, got %d", got)
	}
}

func TestArrayListSimpleRemoveAtReturnsRemovedValueAndShiftsLeft(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	list.Append(4)
	list.Append(5)
	list.Append(6)
	list.Append(7)

	if got := list.RemoveAt(1); got != 5 {
		t.Fatalf("expected removed value 5, got %d", got)
	}

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{4, 6, 7}) {
		t.Fatalf("expected [4 6 7], got %v", got)
	}
}

func TestArrayListSimpleRemoveDeletesFirstMatchOnly(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	list.Append(8)
	list.Append(9)
	list.Append(8)

	if removed := list.Remove(8); !removed {
		t.Fatal("expected remove to return true")
	}

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{9, 8}) {
		t.Fatalf("expected [9 8], got %v", got)
	}

	if removed := list.Remove(42); removed {
		t.Fatal("expected remove to return false for missing value")
	}
}

func TestArrayListSimpleContainsAndIndexOfHandleMissingValues(t *testing.T) {
	list := implementations.NewArrayList[string](2)

	list.Append("red")
	list.Append("blue")

	if !list.Contains("red") {
		t.Fatal("expected red to be found")
	}

	if list.Contains("green") {
		t.Fatal("expected green to be missing")
	}

	if got := list.IndexOf("blue"); got != 1 {
		t.Fatalf("expected index 1, got %d", got)
	}

	if got := list.IndexOf("green"); got != -1 {
		t.Fatalf("expected index -1, got %d", got)
	}
}

func TestArrayListSimpleClearResetsTheList(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	list.Append(1)
	list.Append(2)
	list.Clear()

	if got := list.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !list.IsEmpty() {
		t.Fatal("expected list to be empty")
	}
}

func TestArrayListMildlyAbsurdGrowthBeyondStartingCapacity(t *testing.T) {
	list := implementations.NewArrayList[int](1)

	for value := 0; value < 25; value++ {
		list.Append(value)
	}

	if got := list.Length(); got != 25 {
		t.Fatalf("expected length 25, got %d", got)
	}

	if got := list.Capacity(); got < 25 {
		t.Fatalf("expected capacity to grow beyond 25, got %d", got)
	}
}

func TestArrayListMildlyAbsurdAlternatingOperationsKeepOrderStable(t *testing.T) {
	list := implementations.NewArrayList[int](2)

	list.Append(3)
	list.Prepend(2)
	list.Append(4)
	list.Prepend(1)
	list.Insert(2, 99)
	list.RemoveAt(2)
	list.Remove(4)

	if got := list.ToSlice(); !reflect.DeepEqual(got, []int{1, 2, 3}) {
		t.Fatalf("expected [1 2 3], got %v", got)
	}
}

func TestArrayListAbsurdDeterministicSequenceMatchesReferenceModel(t *testing.T) {
	list := implementations.NewArrayList[int](2)
	reference := createReferenceSequence()

	for _, value := range reference {
		list.Append(value)
	}

	if got := list.ToSlice(); !reflect.DeepEqual(got, reference) {
		t.Fatalf("expected %v, got %v", reference, got)
	}
}
