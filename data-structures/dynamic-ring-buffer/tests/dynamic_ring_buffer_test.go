package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/dynamic-ring-buffer/implementations"
)

func TestDynamicRingBufferSimpleNewBufferStartsEmpty(t *testing.T) {
	buffer := implementations.NewMyDynamicRingBuffer[int](2)

	if got := buffer.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if got := buffer.Capacity(); got != 2 {
		t.Fatalf("expected capacity 2, got %d", got)
	}

	if !buffer.IsEmpty() {
		t.Fatal("expected buffer to be empty")
	}

	if got := buffer.ToSlice(); len(got) != 0 {
		t.Fatalf("expected empty slice, got %v", got)
	}
}

func TestDynamicRingBufferSimpleEnqueueAlwaysSucceeds(t *testing.T) {
	buffer := implementations.NewMyDynamicRingBuffer[int](2)

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

func TestDynamicRingBufferSimpleDequeueReturnsItemsInFIFOOrder(t *testing.T) {
	buffer := implementations.NewMyDynamicRingBuffer[string](2)

	buffer.Enqueue("a")
	buffer.Enqueue("b")
	buffer.Enqueue("c")

	if got := buffer.Dequeue(); got != "a" {
		t.Fatalf("expected a, got %s", got)
	}

	if got := buffer.Dequeue(); got != "b" {
		t.Fatalf("expected b, got %s", got)
	}

	if got := buffer.Front(); got != "c" {
		t.Fatalf("expected front c, got %s", got)
	}
}

func TestDynamicRingBufferSimpleClearResetsTheBuffer(t *testing.T) {
	buffer := implementations.NewMyDynamicRingBuffer[int](2)

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

func TestDynamicRingBufferMildlyAbsurdGrowthPreservesOrderWhenWrapped(t *testing.T) {
	buffer := implementations.NewMyDynamicRingBuffer[int](3)

	buffer.Enqueue(1)
	buffer.Enqueue(2)
	buffer.Enqueue(3)
	buffer.Dequeue()
	buffer.Enqueue(4)
	buffer.Enqueue(5)

	if got := buffer.ToSlice(); !reflect.DeepEqual(got, []int{2, 3, 4, 5}) {
		t.Fatalf("expected [2 3 4 5], got %v", got)
	}

	if got := buffer.Front(); got != 2 {
		t.Fatalf("expected front 2, got %d", got)
	}

	if got := buffer.Rear(); got != 5 {
		t.Fatalf("expected rear 5, got %d", got)
	}

	if got := buffer.Capacity(); got < 4 {
		t.Fatalf("expected capacity to grow to at least 4, got %d", got)
	}
}

func TestDynamicRingBufferAbsurdDeterministicOperationSequenceMatchesReferenceModel(t *testing.T) {
	buffer := implementations.NewMyDynamicRingBuffer[int](2)
	reference := make([]int, 0)

	for index := 1; index <= 80; index++ {
		buffer.Enqueue(index)
		reference = append(reference, index)

		if index%5 == 0 {
			buffer.Dequeue()
			reference = reference[1:]
		}

		if index%8 == 0 {
			buffer.Enqueue(index * 10)
			reference = append(reference, index*10)
		}
	}

	if got := buffer.ToSlice(); !reflect.DeepEqual(got, reference) {
		t.Fatalf("expected %v, got %v", reference, got)
	}

	if got := buffer.Length(); got != len(reference) {
		t.Fatalf("expected length %d, got %d", len(reference), got)
	}

	if got := buffer.Capacity(); got < len(reference) {
		t.Fatalf("expected capacity to be at least %d, got %d", len(reference), got)
	}
}
