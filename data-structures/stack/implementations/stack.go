package implementations

import "dsa/data-structures/stack/interfaces"

type MyStack[T any] struct {
	initialCapacity int
}

var _ interfaces.Stack[int] = (*MyStack[int])(nil)

func NewMyStack[T any](initialCapacity int) *MyStack[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyStack[T]{
		initialCapacity: initialCapacity,
	}
}

func (s *MyStack[T]) Length() int {
	panic("TODO: implement Length")
}

func (s *MyStack[T]) Capacity() int {
	panic("TODO: implement Capacity")
}

func (s *MyStack[T]) IsEmpty() bool {
	panic("TODO: implement IsEmpty")
}

func (s *MyStack[T]) Peek() T {
	panic("TODO: implement Peek")
}

func (s *MyStack[T]) Push(value T) {
	panic("TODO: implement Push")
}

func (s *MyStack[T]) Pop() T {
	panic("TODO: implement Pop")
}

func (s *MyStack[T]) Clear() {
	panic("TODO: implement Clear")
}

func (s *MyStack[T]) ToSlice() []T {
	panic("TODO: implement ToSlice")
}

func (s *MyStack[T]) InitialCapacity() int {
	return s.initialCapacity
}
