package interfaces

type BinarySearchTree[T comparable] interface {
	Length() int
	IsEmpty() bool
	Insert(value T)
	Contains(value T) bool
	Min() T
	Max() T
	Remove(value T) bool
	InOrder() []T
	PreOrder() []T
	PostOrder() []T
	LevelOrder() []T
	Height() int
	Clear()
}
