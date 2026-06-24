package interfaces

type List[T comparable] interface {
	Length() int
	Capacity() int
	IsEmpty() bool
	Get(index int) T
	Set(index int, value T)
	Append(value T)
	Prepend(value T)
	Insert(index int, value T)
	RemoveAt(index int) T
	Remove(value T) bool
	Contains(value T) bool
	IndexOf(value T) int
	Clear()
	ToSlice() []T
}
