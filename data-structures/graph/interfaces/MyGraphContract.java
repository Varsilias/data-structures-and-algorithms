public interface MyGraphContract<T> {
    int vertexCount();
    int edgeCount();
    void addVertex(T value);
    void addEdge(T from, T to);
    boolean removeVertex(T value);
    boolean removeEdge(T from, T to);
    boolean hasVertex(T value);
    boolean hasEdge(T from, T to);
    Object[] neighbors(T value);
    Object[] breadthFirstSearch(T start);
    Object[] depthFirstSearch(T start);
    void clear();
}
