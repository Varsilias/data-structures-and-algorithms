package implementations

import (
	"dsa/data-structures/queue/interfaces"
)

type MyQueue[T any] struct {
	initialCapacity int
	currentCapacity int
	currentLength   int
	head            int
	tail            int
	container       []T
}

var _ interfaces.Queue[int] = (*MyQueue[int])(nil)

func NewMyQueue[T any](initialCapacity int) *MyQueue[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyQueue[T]{
		initialCapacity: initialCapacity,
		container:       make([]T, initialCapacity),
		currentCapacity: initialCapacity,
		currentLength:   0,
		head:            0,
		tail:            0,
	}
}

func (q *MyQueue[T]) Length() int {
	return q.currentLength
}

func (q *MyQueue[T]) Capacity() int {
	return q.currentCapacity
}

func (q *MyQueue[T]) IsEmpty() bool {
	return q.Length() <= 0
}

func (q *MyQueue[T]) Peek() T {
	if q.IsEmpty() {
		panic("peek: queue is empty")
	}
	return q.container[q.head]
}

func (q *MyQueue[T]) Enqueue(value T) {
	q.ensureCapacity()
	q.container[q.tail] = value

	q.tail++
	q.currentLength++
}

func (q *MyQueue[T]) Dequeue() T {
	if q.IsEmpty() {
		panic("dequeue: queue is empty")
	}
	val := q.container[q.head]

	q.shift() // O(N)
	q.currentLength--
	q.tail--
	return val
}

func (q *MyQueue[T]) Clear() {
	q.container = nil
	q.currentLength = 0
	q.currentCapacity = 0
	q.head = 0
	q.tail = 0
}

func (q *MyQueue[T]) ToSlice() []T {
	rs := make([]T, 0, q.Length())

	for i := 0; i < q.Length(); i++ {
		rs = append(rs, q.container[i])
	}

	return rs
}

func (q *MyQueue[T]) InitialCapacity() int {
	return q.initialCapacity
}

func (q *MyQueue[T]) IsFull() bool {
	return q.Length() == q.Capacity()
}

func (q *MyQueue[T]) ensureCapacity() {
	if !q.IsFull() {
		return
	}

	newCap := q.currentCapacity * 2
	newCon := make([]T, newCap)

	for i := 0; i < q.Length(); i++ {
		newCon[i] = q.container[i]
	}
	// copy(newCon, q.container)

	q.currentCapacity = newCap
	q.container = newCon
}

func (q *MyQueue[T]) shift() {
	for i := 1; i < q.Length(); i++ {
		q.container[i-1] = q.container[i]
	}
}
