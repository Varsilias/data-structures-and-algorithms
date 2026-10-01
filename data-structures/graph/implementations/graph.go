package implementations

import "dsa/data-structures/graph/interfaces"

type MyGraph[T comparable] struct{}

var _ interfaces.Graph[string] = (*MyGraph[string])(nil)

func NewMyGraph[T comparable]() *MyGraph[T]          { return &MyGraph[T]{} }
func (g *MyGraph[T]) VertexCount() int               { return 0 }
func (g *MyGraph[T]) EdgeCount() int                 { return 0 }
func (g *MyGraph[T]) AddVertex(value T)              { panic("TODO: implement AddVertex") }
func (g *MyGraph[T]) AddEdge(from T, to T)           { panic("TODO: implement AddEdge") }
func (g *MyGraph[T]) RemoveVertex(value T) bool      { panic("TODO: implement RemoveVertex") }
func (g *MyGraph[T]) RemoveEdge(from T, to T) bool   { panic("TODO: implement RemoveEdge") }
func (g *MyGraph[T]) HasVertex(value T) bool         { return false }
func (g *MyGraph[T]) HasEdge(from T, to T) bool      { return false }
func (g *MyGraph[T]) Neighbors(value T) []T          { return []T{} }
func (g *MyGraph[T]) BreadthFirstSearch(start T) []T { panic("TODO: implement BreadthFirstSearch") }
func (g *MyGraph[T]) DepthFirstSearch(start T) []T   { panic("TODO: implement DepthFirstSearch") }
func (g *MyGraph[T]) Clear()                         { panic("TODO: implement Clear") }
