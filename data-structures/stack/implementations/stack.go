package implementations

import "dsa/data-structures/stack/interfaces"

type MyStack[T any] struct {
	initialCapacity int
	currentCapacity int
	currentLength   int
	container       []T
}

var _ interfaces.Stack[int] = (*MyStack[int])(nil)

func NewMyStack[T any](initialCapacity int) *MyStack[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	return &MyStack[T]{
		initialCapacity: initialCapacity,
		currentCapacity: initialCapacity,
		currentLength:   0,
		container:       make([]T, initialCapacity),
	}
}

func (s *MyStack[T]) Length() int {
	return s.currentLength
}

func (s *MyStack[T]) Capacity() int {
	return s.currentCapacity
}

func (s *MyStack[T]) IsEmpty() bool {
	return s.Length() <= 0
}

func (s *MyStack[T]) Peek() T {
	if s.IsEmpty() {
		panic("peek: stack is empty")
	}

	return s.container[s.currentLength-1]
}

func (s *MyStack[T]) Push(value T) {
	s.ensureCapacity()
	s.container[s.currentLength] = value
	s.currentLength++
}

func (s *MyStack[T]) Pop() T {
	if s.IsEmpty() {
		panic("pop: stack is empty")
	}

	val := s.container[s.currentLength-1]

	s.currentLength--
	return val
}

func (s *MyStack[T]) Clear() {
	s.currentLength = 0
	s.currentCapacity = s.initialCapacity
	s.container = make([]T, 0, s.initialCapacity)
}

func (s *MyStack[T]) ToSlice() []T {
	n := s.Length()
	res := make([]T, n)

	for i := 0; i < n; i++ {
		res[i] = s.container[i]
	}

	return res
}

func (s *MyStack[T]) InitialCapacity() int {
	return s.initialCapacity
}

func (s *MyStack[T]) ensureCapacity() {
	if s.Length() < s.Capacity() {
		return
	}

	capacity := s.currentCapacity * 2
	container := make([]T, capacity)

	for i := 0; i < s.Length(); i++ {
		container[i] = s.container[i]
	}

	s.currentCapacity = capacity
	s.container = container
}
