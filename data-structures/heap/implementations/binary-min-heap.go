package implementations

import "dsa/data-structures/heap/interfaces"

type MyBinaryMinHeap[T comparable] struct{}

var _ interfaces.BinaryHeap[int] = (*MyBinaryMinHeap[int])(nil)

func NewMyBinaryMinHeap[T comparable]() *MyBinaryMinHeap[T] { return &MyBinaryMinHeap[T]{} }
func (h *MyBinaryMinHeap[T]) Length() int                   { return 0 }
func (h *MyBinaryMinHeap[T]) IsEmpty() bool                 { return h.Length() == 0 }
func (h *MyBinaryMinHeap[T]) Peek() T                       { var zero T; return zero }
func (h *MyBinaryMinHeap[T]) Insert(value T)                { panic("TODO: implement Insert") }
func (h *MyBinaryMinHeap[T]) Extract() T                    { panic("TODO: implement Extract") }
func (h *MyBinaryMinHeap[T]) Clear()                        { panic("TODO: implement Clear") }
func (h *MyBinaryMinHeap[T]) ToSlice() []T                  { return []T{} }
