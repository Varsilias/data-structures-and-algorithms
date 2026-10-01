package interfaces

type HashMap[K comparable, V any] interface {
	Length() int
	Capacity() int
	IsEmpty() bool
	Set(key K, value V)
	Get(key K) V
	Has(key K) bool
	Remove(key K) bool
	Keys() []K
	Values() []V
	Clear()
}
