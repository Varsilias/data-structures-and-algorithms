package implementations

import "dsa/data-structures/ring-buffer/interfaces"

type MyRingBuffer[T any] struct {
	initialCapacity int
	head            int
	tail            int
	currentLength   int
	container       []T
}

var _ interfaces.RingBuffer[int] = (*MyRingBuffer[int])(nil)

func NewMyRingBuffer[T any](initialCapacity int) *MyRingBuffer[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyRingBuffer[T]{
		initialCapacity: initialCapacity,
		container:       make([]T, initialCapacity),
		head:            0,
		tail:            0,
		currentLength:   0,
	}
}

func (b *MyRingBuffer[T]) Length() int {
	return b.currentLength
}

func (b *MyRingBuffer[T]) Capacity() int {
	return b.initialCapacity
}

func (b *MyRingBuffer[T]) IsEmpty() bool {
	return b.Length() <= 0
}

func (b *MyRingBuffer[T]) IsFull() bool {
	return b.Length() == b.Capacity()
}

func (b *MyRingBuffer[T]) Front() T {
	if b.IsEmpty() {
		panic("buffer is full")
	}

	return b.container[b.head]
}

func (b *MyRingBuffer[T]) Rear() T {
	if b.IsEmpty() {
		panic("buffer is full")
	}

	idx := (b.tail - 1 + b.Capacity()) % b.Capacity()
	return b.container[idx]
}

func (b *MyRingBuffer[T]) Enqueue(value T) bool {
	if b.IsFull() {
		return false
	}

	b.container[b.tail] = value
	b.currentLength++
	b.tail = (b.tail + 1) % b.Capacity()
	return true
}

func (b *MyRingBuffer[T]) Dequeue() T {
	if b.IsEmpty() {
		panic("dequeue: buffer is empty")
	}
	val := b.container[b.head]
	b.currentLength--
	b.head = (b.head + 1) % b.Capacity()

	return val
}

func (b *MyRingBuffer[T]) Clear() {
	b.currentLength = 0
	b.head = 0
	b.tail = 0
	b.container = nil
}

func (b *MyRingBuffer[T]) ToSlice() []T {
	rs := make([]T, 0, b.Length())

	for i := 0; i < b.Length(); i++ {
		idx := (b.head + i) % b.Capacity()
		rs = append(rs, b.container[idx])
	}

	return rs
}

func (b *MyRingBuffer[T]) InitialCapacity() int {
	return b.initialCapacity
}
