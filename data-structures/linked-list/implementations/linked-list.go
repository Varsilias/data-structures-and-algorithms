package implementations

import "dsa/data-structures/linked-list/interfaces"

type Node[T comparable] struct {
	value T
	next  *Node[T]
	prev  *Node[T]
}

type MyLinkedList[T comparable] struct {
	front  *Node[T]
	back   *Node[T]
	length int
}

var _ interfaces.LinkedList[int] = (*MyLinkedList[int])(nil)

func NewMyLinkedList[T comparable]() *MyLinkedList[T] { return &MyLinkedList[T]{} }
func (l *MyLinkedList[T]) Length() int {
	return l.length
}
func (l *MyLinkedList[T]) IsEmpty() bool {
	return l.Length() == 0
}
func (l *MyLinkedList[T]) Head() T {
	return l.front.value
}
func (l *MyLinkedList[T]) Tail() T {
	return l.back.value
}
func (l *MyLinkedList[T]) Get(index int) T {
	if index > l.Length() {
		panic("index is greater than list size")
	}

	head := l.front
	for range index {
		head = head.next
	}

	return head.value
}
func (l *MyLinkedList[T]) Append(value T) {
	node := &Node[T]{value: value} // next, prev == nil; Go's zero value
	if l.front == nil {
		l.front = node
		l.back = node
		l.length++
		return
	}

	// 1->2->3
	// insert 4
	node.prev = l.back

	if l.back != nil {
		l.back.next = node
		l.back = node
	}

	l.length++

}
func (l *MyLinkedList[T]) Prepend(value T) {
	node := &Node[T]{value: value}
	if l.front == nil {
		l.front = node
		l.back = node
		l.back.prev = l.front
		l.length++
		return
	}

	node.next = l.front
	if l.front != nil {
		l.front.prev = node
		l.front = node
	}

	l.length++
}
func (l *MyLinkedList[T]) Insert(index int, value T) {
	if index > l.Length() {
		panic("index is greater than list size")
	}

	n := l.Length()
	if n <= 0 {
		l.Append(value)
		return
	}

	if index == 0 {
		l.Prepend(value)
		return
	}

	node := &Node[T]{value: value}
	head := l.front
	for range index - 1 {
		head = head.next
	}

	if head == nil {
		return
	}

	nextNode := head.next
	head.next = node
	node.prev = head
	node.next = nextNode

	if nextNode != nil {
		nextNode.prev = node
	}

	l.length++

}
func (l *MyLinkedList[T]) RemoveAt(index int) T {
	n := l.Length()
	if n <= 0 || n < index {
		panic("index to remove is not within list size range")
	}

	head := l.front
	for range index {
		head = head.next
	}

	// should be handled some way. Maybe via reflection to create a zero value
	// if head == nil {
	// 	return head.value
	// }

	nextNode := head.next
	prevNode := head.prev

	if nextNode != nil {
		nextNode.prev = prevNode
	}

	if prevNode != nil {
		prevNode.next = nextNode
	}

	l.length--
	return head.value

}
func (l *MyLinkedList[T]) Remove(value T) bool {
	if contains := l.Contains(value); !contains {
		return false
	}

	head := l.front
	for head != nil {
		if head.value == value {
			break
		}

		head = head.next
	}

	nextNode := head.next
	prevNode := head.prev

	if nextNode != nil {
		nextNode.prev = prevNode
	}

	if prevNode != nil {
		prevNode.next = nextNode
	}

	l.length--
	return true
}
func (l *MyLinkedList[T]) Contains(value T) bool {
	head := l.front
	for head != nil {
		if head.value == value {
			break
		}
		head = head.next
	}

	if head == nil {
		return false
	}

	return true
}
func (l *MyLinkedList[T]) IndexOf(value T) int {
	idx := -1

	if n := l.Length(); n <= 0 {
		return idx
	}

	head := l.front
	for head != nil {
		idx++
		if head.value == value {
			break
		}
		head = head.next
	}

	return idx

}
func (l *MyLinkedList[T]) Reverse() {
	if l.front == nil || l.front == l.back {
		return
	}

	var curr = l.front
	var tmp *Node[T]

	for curr != nil {
		tmp = curr.prev
		curr.prev = curr.next
		curr.next = tmp

		curr = curr.prev
	}

	tmp = l.front
	l.front = l.back
	l.back = tmp
}
func (l *MyLinkedList[T]) Clear() {
	l = NewMyLinkedList[T]()
}
func (l *MyLinkedList[T]) ToSlice() []T {
	list := make([]T, 0, l.Length())

	head := l.front
	for head != nil {
		list = append(list, head.value)
		head = head.next
	}

	return list
}
