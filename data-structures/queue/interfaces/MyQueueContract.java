public interface MyQueueContract<T> {
    int length();

    int capacity();

    boolean isEmpty();

    T peek();

    void enqueue(T value);

    T dequeue();

    void clear();

    Object[] toArray();
}
