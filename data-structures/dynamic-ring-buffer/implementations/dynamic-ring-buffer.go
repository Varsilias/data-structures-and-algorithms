package implementations

import "dsa/data-structures/dynamic-ring-buffer/interfaces"

type MyDynamicRingBuffer[T any] struct {
	initialCapacity int
	currentCapacity int
	currentLength   int
	head            int
	tail            int
	container       []T
}

var _ interfaces.DynamicRingBuffer[int] = (*MyDynamicRingBuffer[int])(nil)

func NewMyDynamicRingBuffer[T any](initialCapacity int) *MyDynamicRingBuffer[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	container := make([]T, initialCapacity)
	return &MyDynamicRingBuffer[T]{
		initialCapacity: initialCapacity,
		currentCapacity: initialCapacity,
		container:       container,

		// go's zero value will ultimately take care of these fields, but better to be explicit
		currentLength: 0,
		head:          0,
		tail:          0,
	}
}

func (b *MyDynamicRingBuffer[T]) Length() int {
	return b.currentLength
}

func (b *MyDynamicRingBuffer[T]) Capacity() int {
	return b.currentCapacity
}

func (b *MyDynamicRingBuffer[T]) IsEmpty() bool {
	return b.Length() <= 0
}

func (b *MyDynamicRingBuffer[T]) IsFull() bool {
	return b.Length() == b.Capacity()
}

func (b *MyDynamicRingBuffer[T]) Front() T {
	if b.IsEmpty() {
		panic("buffer is empty")
	}

	return b.container[b.head]
}

func (b *MyDynamicRingBuffer[T]) Rear() T {
	if b.IsEmpty() {
		panic("buffer is empty")
	}

	idx := (b.tail - 1 + b.Capacity()) % b.Capacity()
	return b.container[idx]
}

func (b *MyDynamicRingBuffer[T]) Enqueue(value T) bool {
	b.ensureCapacity()
	b.container[b.tail] = value
	b.currentLength++
	b.tail = (b.tail + 1) % b.Capacity()
	return true
}

func (b *MyDynamicRingBuffer[T]) Dequeue() T {
	if b.IsEmpty() {
		panic("buffer is empty")
	}

	val := b.container[b.head]
	b.head = (b.head + 1) % b.Capacity()
	b.currentLength--
	return val
}

func (b *MyDynamicRingBuffer[T]) Clear() {
	b.currentLength = 0
	b.head = 0
	b.tail = 0
	b.container = nil
}

func (b *MyDynamicRingBuffer[T]) ToSlice() []T {
	r := make([]T, 0, b.Length())

	for i := 0; i < b.Length(); i++ {
		idx := (b.head + i) % b.Capacity()
		v := b.container[idx]
		r = append(r, v)
	}

	return r
}

func (b *MyDynamicRingBuffer[T]) ensureCapacity() {
	if !b.IsFull() {
		return
	}

	newCap := b.currentCapacity * 2
	newCon := make([]T, newCap)

	for i := 0; i < b.Length(); i++ {
		idx := (b.head + i) % b.Capacity()
		v := b.container[idx]
		newCon[i] = v
	}

	b.head = 0
	b.tail = b.currentCapacity
	b.currentCapacity = newCap
	b.container = newCon

}

func (b *MyDynamicRingBuffer[T]) InitialCapacity() int {
	return b.initialCapacity
}
