public interface MyDynamicRingBufferContract<T> {
    int length();

    int capacity();

    boolean isEmpty();

    boolean isFull();

    T front();

    T rear();

    boolean enqueue(T value);

    T dequeue();

    void clear();

    Object[] toArray();
}
