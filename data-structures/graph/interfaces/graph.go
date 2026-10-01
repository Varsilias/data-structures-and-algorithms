package interfaces

type Graph[T comparable] interface {
	VertexCount() int
	EdgeCount() int
	AddVertex(value T)
	AddEdge(from T, to T)
	RemoveVertex(value T) bool
	RemoveEdge(from T, to T) bool
	HasVertex(value T) bool
	HasEdge(from T, to T) bool
	Neighbors(value T) []T
	BreadthFirstSearch(start T) []T
	DepthFirstSearch(start T) []T
	Clear()
}
