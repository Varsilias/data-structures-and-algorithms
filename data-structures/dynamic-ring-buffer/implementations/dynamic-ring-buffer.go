package implementations

import "dsa/data-structures/dynamic-ring-buffer/interfaces"

type MyDynamicRingBuffer[T any] struct {
	initialCapacity int
}

var _ interfaces.DynamicRingBuffer[int] = (*MyDynamicRingBuffer[int])(nil)

func NewMyDynamicRingBuffer[T any](initialCapacity int) *MyDynamicRingBuffer[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyDynamicRingBuffer[T]{
		initialCapacity: initialCapacity,
	}
}

func (b *MyDynamicRingBuffer[T]) Length() int {
	panic("TODO: implement Length")
}

func (b *MyDynamicRingBuffer[T]) Capacity() int {
	panic("TODO: implement Capacity")
}

func (b *MyDynamicRingBuffer[T]) IsEmpty() bool {
	panic("TODO: implement IsEmpty")
}

func (b *MyDynamicRingBuffer[T]) IsFull() bool {
	panic("TODO: implement IsFull")
}

func (b *MyDynamicRingBuffer[T]) Front() T {
	panic("TODO: implement Front")
}

func (b *MyDynamicRingBuffer[T]) Rear() T {
	panic("TODO: implement Rear")
}

func (b *MyDynamicRingBuffer[T]) Enqueue(value T) bool {
	panic("TODO: implement Enqueue")
}

func (b *MyDynamicRingBuffer[T]) Dequeue() T {
	panic("TODO: implement Dequeue")
}

func (b *MyDynamicRingBuffer[T]) Clear() {
	panic("TODO: implement Clear")
}

func (b *MyDynamicRingBuffer[T]) ToSlice() []T {
	panic("TODO: implement ToSlice")
}

func (b *MyDynamicRingBuffer[T]) InitialCapacity() int {
	return b.initialCapacity
}
