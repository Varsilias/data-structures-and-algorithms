package implementations

import "dsa/data-structures/ring-buffer/interfaces"

type MyRingBuffer[T any] struct {
	initialCapacity int
}

var _ interfaces.RingBuffer[int] = (*MyRingBuffer[int])(nil)

func NewMyRingBuffer[T any](initialCapacity int) *MyRingBuffer[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyRingBuffer[T]{
		initialCapacity: initialCapacity,
	}
}

func (b *MyRingBuffer[T]) Length() int {
	panic("TODO: implement Length")
}

func (b *MyRingBuffer[T]) Capacity() int {
	panic("TODO: implement Capacity")
}

func (b *MyRingBuffer[T]) IsEmpty() bool {
	panic("TODO: implement IsEmpty")
}

func (b *MyRingBuffer[T]) IsFull() bool {
	panic("TODO: implement IsFull")
}

func (b *MyRingBuffer[T]) Front() T {
	panic("TODO: implement Front")
}

func (b *MyRingBuffer[T]) Rear() T {
	panic("TODO: implement Rear")
}

func (b *MyRingBuffer[T]) Enqueue(value T) bool {
	panic("TODO: implement Enqueue")
}

func (b *MyRingBuffer[T]) Dequeue() T {
	panic("TODO: implement Dequeue")
}

func (b *MyRingBuffer[T]) Clear() {
	panic("TODO: implement Clear")
}

func (b *MyRingBuffer[T]) ToSlice() []T {
	panic("TODO: implement ToSlice")
}

func (b *MyRingBuffer[T]) InitialCapacity() int {
	return b.initialCapacity
}
