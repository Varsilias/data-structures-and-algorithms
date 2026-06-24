package implementations

import (
	"dsa/data-structures/list/interfaces"
)

type ArrayList[T comparable] struct {
	initialCapacity     int
	currentIndex        int
	thresholdPercentage int
	container           []T
}

var _ interfaces.List[int] = (*ArrayList[int])(nil)

func NewArrayList[T comparable](initialCapacity int) *ArrayList[T] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}

	container := make([]T, initialCapacity)

	return &ArrayList[T]{
		initialCapacity:     initialCapacity,
		currentIndex:        0, // we could decide to not instantiate it, Golang has the concept of zero value
		thresholdPercentage: 80,
		container:           container,
	}
}

func (l *ArrayList[T]) Length() int {
	return l.currentIndex
}

func (l *ArrayList[T]) Capacity() int {
	return len(l.container)
}

func (l *ArrayList[T]) IsEmpty() bool {
	return l.Length() <= 0
}

func (l *ArrayList[T]) Get(index int) T {
	if index < 0 || index > l.Length() {
		panic("index is out of bound")
	}
	return l.container[index]
}

func (l *ArrayList[T]) Set(index int, value T) {
	if index < 0 || index > l.Length() {
		panic("index is out of bound")
	}
	l.container[index] = value
}

func (l *ArrayList[T]) Append(value T) {
	l.ensureCapacity()
	l.container[l.currentIndex] = value
	l.currentIndex++
}

func (l *ArrayList[T]) Prepend(value T) {
	l.ensureCapacity()
	for i := l.Length(); i > 0; i-- {
		l.container[i] = l.container[i-1]
	}
	l.container[0] = value
	l.currentIndex++
}

func (l *ArrayList[T]) Insert(index int, value T) { // ["A", "C", "D"] => "1", "B"
	if index < 0 {
		panic("index is out of bound")
	}
	l.ensureCapacity()
	for i := l.Length(); i > index; i-- {
		l.container[i] = l.container[i-1]
	}
	l.container[index] = value
	l.currentIndex++
}

func (l *ArrayList[T]) RemoveAt(index int) T {
	v := l.Get(index)
	if !l.Remove(v) {
		panic("value at index not found")

	}
	return v
}

func (l *ArrayList[T]) Remove(value T) bool { // ["4", "5", "6", "7"] => 5
	idx := l.IndexOf(value) // 1
	if idx < 0 {
		return false
	}

	c := make([]T, l.Length()-1) // c ["", "", ""]

	for i := 0; i < idx; i++ {
		c[i] = l.container[i]
	}
	for i := idx; i < l.Length()-1; i++ {
		c[i] = l.container[i+1]
	}

	l.container = c
	l.currentIndex--
	return true
}

func (l *ArrayList[T]) Contains(value T) bool {
	return l.IndexOf(value) >= 0
}

func (l *ArrayList[T]) IndexOf(value T) int {
	for i := range l.container {
		if l.container[i] == value {
			return i
		}
	}
	return -1
}

func (l *ArrayList[T]) Clear() {
	l.currentIndex = 0
	l.container = make([]T, 0)
}

func (l *ArrayList[T]) ToSlice() []T {
	s := make([]T, l.Length())
	for i := 0; i < l.Length(); i++ {
		s[i] = l.container[i]
	}
	return s
}

func (l *ArrayList[T]) InitialCapacity() int {
	return l.initialCapacity
}

func (l *ArrayList[T]) ensureCapacity() {
	percent := (l.Length() / l.Capacity()) * 100

	if percent >= l.thresholdPercentage {
		newCap := l.Capacity() * 2
		newContainer := make([]T, newCap)

		copy(newContainer, l.container)
		l.container = newContainer

		// for i := range l.container {
		// 	newContainer[i] = l.container[i]
		// }
	}
}
