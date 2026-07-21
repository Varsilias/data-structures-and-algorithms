package interfaces

type DynamicRingBuffer[T any] interface {
	Length() int
	Capacity() int
	IsEmpty() bool
	IsFull() bool
	Front() T
	Rear() T
	Enqueue(value T) bool
	Dequeue() T
	Clear()
	ToSlice() []T
}
