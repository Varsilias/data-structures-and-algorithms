package implementations

import "dsa/data-structures/queue/interfaces"

type MyQueue[T any] struct {
	initialCapacity int
}

var _ interfaces.Queue[int] = (*MyQueue[int])(nil)

func NewMyQueue[T any](initialCapacity int) *MyQueue[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyQueue[T]{
		initialCapacity: initialCapacity,
	}
}

func (q *MyQueue[T]) Length() int {
	panic("TODO: implement Length")
}

func (q *MyQueue[T]) Capacity() int {
	panic("TODO: implement Capacity")
}

func (q *MyQueue[T]) IsEmpty() bool {
	panic("TODO: implement IsEmpty")
}

func (q *MyQueue[T]) Peek() T {
	panic("TODO: implement Peek")
}

func (q *MyQueue[T]) Enqueue(value T) {
	panic("TODO: implement Enqueue")
}

func (q *MyQueue[T]) Dequeue() T {
	panic("TODO: implement Dequeue")
}

func (q *MyQueue[T]) Clear() {
	panic("TODO: implement Clear")
}

func (q *MyQueue[T]) ToSlice() []T {
	panic("TODO: implement ToSlice")
}

func (q *MyQueue[T]) InitialCapacity() int {
	return q.initialCapacity
}
