package implementations

import "dsa/data-structures/tree/interfaces"

type MyBinarySearchTree[T comparable] struct{}

var _ interfaces.BinarySearchTree[int] = (*MyBinarySearchTree[int])(nil)

func NewMyBinarySearchTree[T comparable]() *MyBinarySearchTree[T] { return &MyBinarySearchTree[T]{} }
func (t *MyBinarySearchTree[T]) Length() int                      { return 0 }
func (t *MyBinarySearchTree[T]) IsEmpty() bool                    { return t.Length() == 0 }
func (t *MyBinarySearchTree[T]) Insert(value T)                   { panic("TODO: implement Insert") }
func (t *MyBinarySearchTree[T]) Contains(value T) bool            { return false }
func (t *MyBinarySearchTree[T]) Min() T                           { var zero T; return zero }
func (t *MyBinarySearchTree[T]) Max() T                           { var zero T; return zero }
func (t *MyBinarySearchTree[T]) Remove(value T) bool              { panic("TODO: implement Remove") }
func (t *MyBinarySearchTree[T]) InOrder() []T                     { return []T{} }
func (t *MyBinarySearchTree[T]) PreOrder() []T                    { return []T{} }
func (t *MyBinarySearchTree[T]) PostOrder() []T                   { return []T{} }
func (t *MyBinarySearchTree[T]) LevelOrder() []T                  { return []T{} }
func (t *MyBinarySearchTree[T]) Height() int                      { return 0 }
func (t *MyBinarySearchTree[T]) Clear()                           { panic("TODO: implement Clear") }
