package implementations

import (
	"dsa/data-structures/hash-map/interfaces"
	"fmt"
)

type MapEntry[K comparable, V any] struct {
	Key   K
	Value V
	Next  *MapEntry[K, V]
}

type MyHashMap[K comparable, V any] struct {
	initialCapacity int
	currentCapacity int
	currentLength   int
	prime           int
	container       []*MapEntry[K, V]
}

var _ interfaces.HashMap[string, int] = (*MyHashMap[string, int])(nil)

func NewMyHashMap[K comparable, V any](initialCapacity int) *MyHashMap[K, V] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}
	return &MyHashMap[K, V]{
		initialCapacity: initialCapacity,
		currentCapacity: initialCapacity,
		currentLength:   0, // can choose to not initialise this as its value will be the zero value of ints
		prime:           31,
		container:       make([]*MapEntry[K, V], initialCapacity),
	}
}
func (m *MyHashMap[K, V]) Length() int {
	return m.currentLength
}
func (m *MyHashMap[K, V]) Capacity() int {
	return m.currentCapacity
}
func (m *MyHashMap[K, V]) IsEmpty() bool {
	return m.Length() == 0
}
func (m *MyHashMap[K, V]) Set(key K, value V) {
	m.ensureCapacity()
	hash := m.hash(key)
	bucket := m.container[hash]
	entry := m.newMapEntry(key, value)

	if bucket == nil {
		m.container[hash] = entry
		m.currentLength++
		return
	}

	head := bucket
	var prev *MapEntry[K, V]
	for head != nil {
		if head.Key == key {
			head.Value = value
			return
		}
		prev = head
		head = head.Next
	}

	if prev != nil {
		m.currentLength++
		prev.Next = entry
	}
}
func (m *MyHashMap[K, V]) Get(key K) V {
	var zero V
	hash := m.hash(key)
	bucket := m.container[hash]

	if bucket == nil {
		return zero
	}

	head := bucket
	for head != nil {
		if head.Key == key {
			return head.Value
		}
		head = head.Next
	}

	return zero
}
func (m *MyHashMap[K, V]) Has(key K) bool {
	hash := m.hash(key)
	bucket := m.container[hash]

	if bucket == nil {
		return false
	}

	head := bucket
	for head != nil {
		if head.Key == key {
			return true
		}
		head = head.Next
	}

	return false
}
func (m *MyHashMap[K, V]) Remove(key K) bool {
	hash := m.hash(key)
	bucket := m.container[hash]

	if bucket == nil {
		return false
	}

	head := bucket
	var prev *MapEntry[K, V]

	if head.Key == key {
		m.container[hash] = head.Next
		m.currentLength--
		return true
	}
	for head != nil {
		if head.Key == key {
			break
		}
		prev = head
		head = head.Next
	}

	if prev != nil && head != nil {
		m.currentLength--
		prev.Next = head.Next
		return true
	}

	return false
}
func (m *MyHashMap[K, V]) Keys() []K {
	keys := make([]K, 0, m.currentLength)

	container := m.container

	for _, bucket := range container {
		head := bucket
		for head != nil {
			keys = append(keys, head.Key)
			head = head.Next
		}
	}

	return keys
}
func (m *MyHashMap[K, V]) Values() []V {
	values := make([]V, 0, m.currentLength)

	container := m.container

	for _, bucket := range container {
		head := bucket
		for head != nil {
			values = append(values, head.Value)
			head = head.Next
		}
	}

	return values
}
func (m *MyHashMap[K, V]) Clear() {
	NewMyHashMap[K, V](2)
}

func (m *MyHashMap[K, V]) ensureCapacity() {
	threshold := (m.currentLength / m.currentCapacity) * 100
	if threshold >= 80 {
		ncp := m.currentCapacity * 2
		m.currentCapacity = ncp
		nco := make([]*MapEntry[K, V], m.currentCapacity)

		for _, bucket := range m.container {
			head := bucket
			for head != nil {
				nextNode := head.Next
				hash := m.hash(head.Key)
				head.Next = nco[hash]
				nco[hash] = head
				// if nco[hash] != nil {
				// 	h := nco[hash]
				// 	var p *MapEntry[K, V]
				// 	for h != nil {
				// 		p = h
				// 		h = h.Next
				// 	}
				// 	p.Next = head
				// } else {
				// 	nco[hash] = head
				// }
				head = nextNode
			}
		}

		m.container = nco
	}
}

func (m *MyHashMap[K, V]) hash(key K) int {
	str := fmt.Sprint(key)
	sum := 0

	for _, s := range str {
		sum += int(s)
	}

	return (sum * m.prime) % m.currentCapacity
}

func (m *MyHashMap[K, V]) newMapEntry(key K, value V) *MapEntry[K, V] {
	return &MapEntry[K, V]{Key: key, Value: value, Next: nil}
}
