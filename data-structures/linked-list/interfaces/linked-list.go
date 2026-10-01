package interfaces

type LinkedList[T comparable] interface {
	Length() int
	IsEmpty() bool
	Head() T
	Tail() T
	Get(index int) T
	Append(value T)
	Prepend(value T)
	Insert(index int, value T)
	RemoveAt(index int) T
	Remove(value T) bool
	Contains(value T) bool
	IndexOf(value T) int
	Reverse()
	Clear()
	ToSlice() []T
}
