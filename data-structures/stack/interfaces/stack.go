package interfaces

type Stack[T any] interface {
	Length() int
	Capacity() int
	IsEmpty() bool
	Peek() T
	Push(value T)
	Pop() T
	Clear()
	ToSlice() []T
}
