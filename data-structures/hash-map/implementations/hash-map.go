package implementations

import "dsa/data-structures/hash-map/interfaces"

type MyHashMap[K comparable, V any] struct{ initialCapacity int }

var _ interfaces.HashMap[string, int] = (*MyHashMap[string, int])(nil)

func NewMyHashMap[K comparable, V any](initialCapacity int) *MyHashMap[K, V] {
	if initialCapacity <= 0 {
		panic("initialCapacity must be greater than zero")
	}
	return &MyHashMap[K, V]{initialCapacity: initialCapacity}
}
func (m *MyHashMap[K, V]) Length() int        { return 0 }
func (m *MyHashMap[K, V]) Capacity() int      { return m.initialCapacity }
func (m *MyHashMap[K, V]) IsEmpty() bool      { return m.Length() == 0 }
func (m *MyHashMap[K, V]) Set(key K, value V) { panic("TODO: implement Set") }
func (m *MyHashMap[K, V]) Get(key K) V        { var zero V; return zero }
func (m *MyHashMap[K, V]) Has(key K) bool     { return false }
func (m *MyHashMap[K, V]) Remove(key K) bool  { panic("TODO: implement Remove") }
func (m *MyHashMap[K, V]) Keys() []K          { return []K{} }
func (m *MyHashMap[K, V]) Values() []V        { return []V{} }
func (m *MyHashMap[K, V]) Clear()             { panic("TODO: implement Clear") }
