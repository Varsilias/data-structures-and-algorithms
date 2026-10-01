public class MyGraph<T> implements MyGraphContract<T> {
    public int vertexCount() { return 0; }
    public int edgeCount() { return 0; }
    public void addVertex(T value) { throw new UnsupportedOperationException("TODO: implement addVertex"); }
    public void addEdge(T from, T to) { throw new UnsupportedOperationException("TODO: implement addEdge"); }
    public boolean removeVertex(T value) { throw new UnsupportedOperationException("TODO: implement removeVertex"); }
    public boolean removeEdge(T from, T to) { throw new UnsupportedOperationException("TODO: implement removeEdge"); }
    public boolean hasVertex(T value) { return false; }
    public boolean hasEdge(T from, T to) { return false; }
    public Object[] neighbors(T value) { return new Object[] {}; }
    public Object[] breadthFirstSearch(T start) { throw new UnsupportedOperationException("TODO: implement breadthFirstSearch"); }
    public Object[] depthFirstSearch(T start) { throw new UnsupportedOperationException("TODO: implement depthFirstSearch"); }
    public void clear() { throw new UnsupportedOperationException("TODO: implement clear"); }
}
