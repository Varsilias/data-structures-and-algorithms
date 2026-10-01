package implementations

import "dsa/data-structures/linked-list/interfaces"

type MyLinkedList[T comparable] struct{}

var _ interfaces.LinkedList[int] = (*MyLinkedList[int])(nil)

func NewMyLinkedList[T comparable]() *MyLinkedList[T] { return &MyLinkedList[T]{} }
func (l *MyLinkedList[T]) Length() int                { return 0 }
func (l *MyLinkedList[T]) IsEmpty() bool              { return l.Length() == 0 }
func (l *MyLinkedList[T]) Head() T                    { var zero T; return zero }
func (l *MyLinkedList[T]) Tail() T                    { var zero T; return zero }
func (l *MyLinkedList[T]) Get(index int) T            { var zero T; return zero }
func (l *MyLinkedList[T]) Append(value T)             { panic("TODO: implement Append") }
func (l *MyLinkedList[T]) Prepend(value T)            { panic("TODO: implement Prepend") }
func (l *MyLinkedList[T]) Insert(index int, value T)  { panic("TODO: implement Insert") }
func (l *MyLinkedList[T]) RemoveAt(index int) T       { panic("TODO: implement RemoveAt") }
func (l *MyLinkedList[T]) Remove(value T) bool        { panic("TODO: implement Remove") }
func (l *MyLinkedList[T]) Contains(value T) bool      { return false }
func (l *MyLinkedList[T]) IndexOf(value T) int        { return -1 }
func (l *MyLinkedList[T]) Reverse()                   { panic("TODO: implement Reverse") }
func (l *MyLinkedList[T]) Clear()                     { panic("TODO: implement Clear") }
func (l *MyLinkedList[T]) ToSlice() []T               { return []T{} }
