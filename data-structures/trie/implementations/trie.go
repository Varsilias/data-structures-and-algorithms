package implementations

import "dsa/data-structures/trie/interfaces"

type MyTrie struct{}

var _ interfaces.Trie = (*MyTrie)(nil)

func NewMyTrie() *MyTrie                        { return &MyTrie{} }
func (t *MyTrie) Size() int                     { return 0 }
func (t *MyTrie) IsEmpty() bool                 { return t.Size() == 0 }
func (t *MyTrie) Insert(word string)            { panic("TODO: implement Insert") }
func (t *MyTrie) Contains(word string) bool     { return false }
func (t *MyTrie) StartsWith(prefix string) bool { return false }
func (t *MyTrie) Remove(word string) bool       { panic("TODO: implement Remove") }
func (t *MyTrie) WordsWithPrefix(prefix string) []string {
	return []string{}
}
func (t *MyTrie) Clear() { panic("TODO: implement Clear") }
