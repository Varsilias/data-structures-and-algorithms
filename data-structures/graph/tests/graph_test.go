package tests

import (
	"reflect"
	"testing"

	"dsa/data-structures/graph/implementations"
)

func TestGraphSimpleNewGraphStartsEmpty(t *testing.T) {
	graph := implementations.NewMyGraph[string]()

	if got := graph.VertexCount(); got != 0 {
		t.Fatalf("expected 0 vertices, got %d", got)
	}

	if got := graph.EdgeCount(); got != 0 {
		t.Fatalf("expected 0 edges, got %d", got)
	}

	if got := graph.Neighbors("missing"); len(got) != 0 {
		t.Fatalf("expected no neighbors for missing vertex, got %v", got)
	}
}

func TestGraphSimpleAddVertexAndAddEdgeBuildAdjacency(t *testing.T) {
	graph := implementations.NewMyGraph[string]()

	graph.AddVertex("A")
	graph.AddVertex("B")
	graph.AddEdge("A", "B")

	if got := graph.VertexCount(); got != 2 {
		t.Fatalf("expected 2 vertices, got %d", got)
	}

	if got := graph.EdgeCount(); got != 1 {
		t.Fatalf("expected 1 edge, got %d", got)
	}

	if !graph.HasVertex("A") {
		t.Fatal("expected graph to have vertex A")
	}

	if !graph.HasEdge("A", "B") {
		t.Fatal("expected graph to have edge A -> B")
	}

	if got := graph.Neighbors("A"); !reflect.DeepEqual(got, []string{"B"}) {
		t.Fatalf("expected [B], got %v", got)
	}
}

func TestGraphMildlyAbsurdBfsAndDfsVisitReachableVertices(t *testing.T) {
	graph := implementations.NewMyGraph[string]()

	for _, edge := range [][2]string{{"A", "B"}, {"A", "C"}, {"B", "D"}, {"C", "E"}} {
		graph.AddEdge(edge[0], edge[1])
	}

	if got := graph.BreadthFirstSearch("A"); !reflect.DeepEqual(got, []string{"A", "B", "C", "D", "E"}) {
		t.Fatalf("expected BFS [A B C D E], got %v", got)
	}

	if got := graph.DepthFirstSearch("A"); !reflect.DeepEqual(got, []string{"A", "B", "D", "C", "E"}) {
		t.Fatalf("expected DFS [A B D C E], got %v", got)
	}
}
