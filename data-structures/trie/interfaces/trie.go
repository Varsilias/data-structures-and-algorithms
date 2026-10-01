package interfaces

type Trie interface {
	Size() int
	IsEmpty() bool
	Insert(word string)
	Contains(word string) bool
	StartsWith(prefix string) bool
	Remove(word string) bool
	WordsWithPrefix(prefix string) []string
	Clear()
}
