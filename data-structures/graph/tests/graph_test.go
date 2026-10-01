package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/graph/implementations"
)

func TestGraphStartsEmpty(t *testing.T) {
	graph := implementations.NewMyGraph[string]()

	if got := graph.VertexCount(); got != 0 {
		t.Fatalf("expected 0 vertices, got %d", got)
	}
	if got := graph.EdgeCount(); got != 0 {
		t.Fatalf("expected 0 edges, got %d", got)
	}
}

func TestGraphAddEdgeAndSearch(t *testing.T) {
	graph := implementations.NewMyGraph[string]()
	graph.AddEdge("A", "B")
	graph.AddEdge("A", "C")

	if got := graph.Neighbors("A"); !reflect.DeepEqual(got, []string{"B", "C"}) {
		t.Fatalf("expected [B C], got %v", got)
	}
}
