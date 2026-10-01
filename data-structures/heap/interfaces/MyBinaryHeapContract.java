public interface MyBinaryHeapContract<T> {
    int length();
    boolean isEmpty();
    T peek();
    void insert(T value);
    T extract();
    void clear();
    Object[] toArray();
}
