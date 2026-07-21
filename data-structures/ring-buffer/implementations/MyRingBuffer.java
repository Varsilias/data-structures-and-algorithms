public class MyRingBuffer<T> implements MyRingBufferContract<T> {
    private final int initialCapacity;

    public MyRingBuffer() {
        this(4);
    }

    public MyRingBuffer(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        }

        this.initialCapacity = initialCapacity;
    }

    @Override
    public int length() {
        throw new UnsupportedOperationException("TODO: implement length");
    }

    @Override
    public int capacity() {
        throw new UnsupportedOperationException("TODO: implement capacity");
    }

    @Override
    public boolean isEmpty() {
        throw new UnsupportedOperationException("TODO: implement isEmpty");
    }

    @Override
    public boolean isFull() {
        throw new UnsupportedOperationException("TODO: implement isFull");
    }

    @Override
    public T front() {
        throw new UnsupportedOperationException("TODO: implement front");
    }

    @Override
    public T rear() {
        throw new UnsupportedOperationException("TODO: implement rear");
    }

    @Override
    public boolean enqueue(T value) {
        throw new UnsupportedOperationException("TODO: implement enqueue");
    }

    @Override
    public T dequeue() {
        throw new UnsupportedOperationException("TODO: implement dequeue");
    }

    @Override
    public void clear() {
        throw new UnsupportedOperationException("TODO: implement clear");
    }

    @Override
    public Object[] toArray() {
        throw new UnsupportedOperationException("TODO: implement toArray");
    }

    public int initialCapacity() {
        return initialCapacity;
    }
}
