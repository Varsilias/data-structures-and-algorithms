public class MyLinkedList<T> implements MyLinkedListContract<T> {
    public int length() { return 0; }
    public boolean isEmpty() { return length() == 0; }
    public T head() { return null; }
    public T tail() { return null; }
    public T get(int index) { return null; }
    public void append(T value) { throw new UnsupportedOperationException("TODO: implement append"); }
    public void prepend(T value) { throw new UnsupportedOperationException("TODO: implement prepend"); }
    public void insert(int index, T value) { throw new UnsupportedOperationException("TODO: implement insert"); }
    public T removeAt(int index) { throw new UnsupportedOperationException("TODO: implement removeAt"); }
    public boolean remove(T value) { throw new UnsupportedOperationException("TODO: implement remove"); }
    public boolean contains(T value) { return false; }
    public int indexOf(T value) { return -1; }
    public void reverse() { throw new UnsupportedOperationException("TODO: implement reverse"); }
    public void clear() { throw new UnsupportedOperationException("TODO: implement clear"); }
    public Object[] toArray() { return new Object[] {}; }
}
