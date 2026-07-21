package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/ring-buffer/implementations"
)

func TestRingBufferSimpleNewBufferStartsEmpty(t *testing.T) {
	buffer := implementations.NewMyRingBuffer[int](3)

	if got := buffer.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if got := buffer.Capacity(); got != 3 {
		t.Fatalf("expected capacity 3, got %d", got)
	}

	if !buffer.IsEmpty() {
		t.Fatal("expected buffer to be empty")
	}

	if buffer.IsFull() {
		t.Fatal("expected buffer to not be full")
	}

	if got := buffer.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestRingBufferSimpleEnqueueFillsBufferAndExposesFrontRear(t *testing.T) {
	buffer := implementations.NewMyRingBuffer[int](3)

	if !buffer.Enqueue(10) {
		t.Fatal("expected enqueue of 10 to succeed")
	}
	if !buffer.Enqueue(20) {
		t.Fatal("expected enqueue of 20 to succeed")
	}
	if !buffer.Enqueue(30) {
		t.Fatal("expected enqueue of 30 to succeed")
	}

	if got := buffer.Length(); got != 3 {
		t.Fatalf("expected length 3, got %d", got)
	}

	if !buffer.IsFull() {
		t.Fatal("expected buffer to be full")
	}

	if got := buffer.Front(); got != 10 {
		t.Fatalf("expected front 10, got %d", got)
	}

	if got := buffer.Rear(); got != 30 {
		t.Fatalf("expected rear 30, got %d", got)
	}

	if got := buffer.ToSlice(); !reflect.DeepEqual(got, []int{10, 20, 30}) {
		t.Fatalf("expected [10 20 30], got %v", got)
	}
}

func TestRingBufferSimpleEnqueueOnFullBufferIsRejected(t *testing.T) {
	buffer := implementations.NewMyRingBuffer[int](2)

	buffer.Enqueue(1)
	buffer.Enqueue(2)

	if buffer.Enqueue(3) {
		t.Fatal("expected enqueue on a full buffer to fail")
	}

	if got := buffer.Length(); got != 2 {
		t.Fatalf("expected length 2, got %d", got)
	}

	if got := buffer.ToSlice(); !reflect.DeepEqual(got, []int{1, 2}) {
		t.Fatalf("expected [1 2], got %v", got)
	}
}

func TestRingBufferSimpleDequeueReturnsItemsInFIFOOrder(t *testing.T) {
	buffer := implementations.NewMyRingBuffer[string](2)

	buffer.Enqueue("a")
	buffer.Enqueue("b")

	if got := buffer.Dequeue(); got != "a" {
		t.Fatalf("expected a, got %s", got)
	}

	if buffer.IsFull() {
		t.Fatal("expected buffer to not be full after dequeue")
	}

	if got := buffer.Front(); got != "b" {
		t.Fatalf("expected front b, got %s", got)
	}
}

func TestRingBufferSimpleClearResetsTheBuffer(t *testing.T) {
	buffer := implementations.NewMyRingBuffer[int](2)

	buffer.Enqueue(1)
	buffer.Enqueue(2)
	buffer.Clear()

	if got := buffer.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if !buffer.IsEmpty() {
		t.Fatal("expected buffer to be empty")
	}
}

func TestRingBufferMildlyAbsurdRepeatedWraparound(t *testing.T) {
	capacity := 4
	buffer := implementations.NewMyRingBuffer[int](capacity)
	reference := make([]int, 0)

	for index := 1; index <= 60; index++ {
		shouldEnqueue := len(reference) < capacity
		enqueued := buffer.Enqueue(index)

		if enqueued != shouldEnqueue {
			t.Fatalf("index %d: expected enqueue success=%v, got %v", index, shouldEnqueue, enqueued)
		}
		if shouldEnqueue {
			reference = append(reference, index)
		}

		if index%3 == 0 && len(reference) > 0 {
			buffer.Dequeue()
			reference = reference[1:]
		}
	}

	if got := buffer.ToSlice(); !reflect.DeepEqual(got, reference) {
		t.Fatalf("expected %v, got %v", reference, got)
	}

	if got := buffer.Capacity(); got != capacity {
		t.Fatalf("expected capacity to stay %d, got %d", capacity, got)
	}
}

func TestRingBufferAbsurdDeterministicOperationSequenceMatchesReferenceModel(t *testing.T) {
	capacity := 5
	buffer := implementations.NewMyRingBuffer[int](capacity)
	reference := make([]int, 0)

	for index := 1; index <= 200; index++ {
		shouldEnqueue := len(reference) < capacity
		enqueued := buffer.Enqueue(index)

		if enqueued != shouldEnqueue {
			t.Fatalf("index %d: expected enqueue success=%v, got %v", index, shouldEnqueue, enqueued)
		}
		if shouldEnqueue {
			reference = append(reference, index)
		}

		if index%3 == 0 && len(reference) > 0 {
			buffer.Dequeue()
			reference = reference[1:]
		}
		if index%7 == 0 && len(reference) > 0 {
			buffer.Dequeue()
			reference = reference[1:]
		}
	}

	if got := buffer.ToSlice(); !reflect.DeepEqual(got, reference) {
		t.Fatalf("expected %v, got %v", reference, got)
	}

	if got := buffer.Length(); got != len(reference) {
		t.Fatalf("expected length %d, got %d", len(reference), got)
	}
}
