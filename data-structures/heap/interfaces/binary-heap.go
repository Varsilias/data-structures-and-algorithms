package interfaces

type BinaryHeap[T comparable] interface {
	Length() int
	IsEmpty() bool
	Peek() T
	Insert(value T)
	Extract() T
	Clear()
	ToSlice() []T
}
