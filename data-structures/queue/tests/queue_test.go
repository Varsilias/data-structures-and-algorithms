package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/queue/implementations"
)

func createQueueReferenceSequence() []int {
	values := make([]int, 0)

	for index := 1; index <= 50; index++ {
		values = append(values, index)
		if index%5 == 0 {
			values = values[1:]
		}
		if index%8 == 0 {
			values = append(values, index*10)
		}
	}

	return values
}

func TestQueueSimpleNewQueueStartsEmpty(t *testing.T) {
	queue := implementations.NewMyQueue[int](2)

	if got := queue.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if got := queue.Capacity(); got != 2 {
		t.Fatalf("expected capacity 2, got %d", got)
	}

	if !queue.IsEmpty() {
		t.Fatal("expected queue to be empty")
	}

	if got := queue.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestQueueSimpleEnqueueAndPeekExposeCurrentFront(t *testing.T) {
	queue := implementations.NewMyQueue[int](2)

	queue.Enqueue(10)
	queue.Enqueue(20)
	queue.Enqueue(30)

	if got := queue.Length(); got != 3 {
		t.Fatalf("expected length 3, got %d", got)
	}

	if got := queue.Peek(); got != 10 {
		t.Fatalf("expected front value 10, got %d", got)
	}

	if got := queue.ToSlice(); !reflect.DeepEqual(got, []int{10, 20, 30}) {
		t.Fatalf("expected [10 20 30], got %v", got)
	}
}

func TestQueueSimpleDequeueReturnsItemsInFIFOOrder(t *testing.T) {
	queue := implementations.NewMyQueue[string](2)

	queue.Enqueue("a")
	queue.Enqueue("b")
	queue.Enqueue("c")

	if got := queue.Dequeue(); got != "a" {
		t.Fatalf("expected a, got %s", got)
	}

	if got := queue.Dequeue(); got != "b" {
		t.Fatalf("expected b, got %s", got)
	}

	if got := queue.Peek(); got != "c" {
		t.Fatalf("expected c, got %s", got)
	}
}

func TestQueueSimpleClearResetsTheQueue(t *testing.T) {
	queue := implementations.NewMyQueue[int](2)

	queue.Enqueue(1)
	queue.Enqueue(2)
	queue.Clear()

	if got := queue.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !queue.IsEmpty() {
		t.Fatal("expected queue to be empty")
	}
}

func TestQueueMildlyAbsurdGrowthBeyondInitialCapacity(t *testing.T) {
	queue := implementations.NewMyQueue[int](1)

	for value := 0; value < 25; value++ {
		queue.Enqueue(value)
	}

	if got := queue.Length(); got != 25 {
		t.Fatalf("expected length 25, got %d", got)
	}

	if got := queue.Capacity(); got < 25 {
		t.Fatalf("expected capacity to grow beyond 25, got %d", got)
	}
}

func TestQueueMildlyAbsurdAlternatingEnqueueAndDequeueLeavesRightSurvivors(t *testing.T) {
	queue := implementations.NewMyQueue[int](2)

	queue.Enqueue(1)
	queue.Enqueue(2)
	queue.Dequeue()
	queue.Enqueue(3)
	queue.Enqueue(4)
	queue.Dequeue()
	queue.Enqueue(5)

	if got := queue.ToSlice(); !reflect.DeepEqual(got, []int{3, 4, 5}) {
		t.Fatalf("expected [3 4 5], got %v", got)
	}
}

func TestQueueAbsurdDeterministicOperationSequenceMatchesReferenceModel(t *testing.T) {
	queue := implementations.NewMyQueue[int](2)
	reference := createQueueReferenceSequence()

	for _, value := range reference {
		queue.Enqueue(value)
	}

	if got := queue.ToSlice(); !reflect.DeepEqual(got, reference) {
		t.Fatalf("expected %v, got %v", reference, got)
	}
}
