package interfaces

type Queue[T any] interface {
	Length() int
	Capacity() int
	IsEmpty() bool
	Peek() T
	Enqueue(value T)
	Dequeue() T
	Clear()
	ToSlice() []T
}
