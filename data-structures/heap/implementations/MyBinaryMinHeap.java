public class MyBinaryMinHeap<T> implements MyBinaryHeapContract<T> {
    public int length() { return 0; }
    public boolean isEmpty() { return length() == 0; }
    public T peek() { return null; }
    public void insert(T value) { throw new UnsupportedOperationException("TODO: implement insert"); }
    public T extract() { throw new UnsupportedOperationException("TODO: implement extract"); }
    public void clear() { throw new UnsupportedOperationException("TODO: implement clear"); }
    public Object[] toArray() { return new Object[] {}; }
}
