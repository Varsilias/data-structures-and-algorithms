public final class MyGraphTest {
    public static void main(String[] args) {
        MyGraph<String> graph = new MyGraph<>();
        if (graph.vertexCount() != 0) throw new AssertionError("expected 0 vertices");
        if (graph.edgeCount() != 0) throw new AssertionError("expected 0 edges");
        graph.addEdge("A", "B");
    }
}
