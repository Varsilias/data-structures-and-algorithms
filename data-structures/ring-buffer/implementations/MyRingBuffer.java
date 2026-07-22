public class MyRingBuffer<T> implements MyRingBufferContract<T> {
    private final int initialCapacity;
    private int head;
    private int tail;
    private int currentLength;
    private T[] container;

    public MyRingBuffer() {
        this(4);
    }

    public MyRingBuffer(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        }

        this.initialCapacity = initialCapacity;
        this.container = (T[]) new Object[initialCapacity];
        this.currentLength = 0;
        this.head = 0;
        this.tail = 0;
    }

    @Override
    public int length() {
        return this.currentLength;
    }

    @Override
    public int capacity() {
        return this.initialCapacity;
    }

    @Override
    public boolean isEmpty() {
        return this.length() <= 0;
    }

    @Override
    public boolean isFull() {
        return this.length() == this.capacity();
    }

    @Override
    public T front() {
        if (this.isEmpty())
            return null;
        return this.container[this.head];
    }

    @Override
    public T rear() {
        if (this.isEmpty())
            return null;

        int idx = (this.tail - 1 + this.capacity()) % this.capacity();
        return this.container[idx];
    }

    @Override
    public boolean enqueue(T value) {
        if (this.isFull())
            return false;

        this.container[this.tail] = value;
        this.currentLength++;
        this.tail = (this.tail + 1) % this.capacity();
        return true;
    }

    @Override
    public T dequeue() {
        if (this.isEmpty())
            return null;

        T val = this.container[this.head];
        this.head = (this.head + 1) % this.capacity();
        this.currentLength--;
        return val;
    }

    @Override
    public void clear() {
        this.container = null;
        this.currentLength = 0;
        this.head = 0;
        this.tail = 0;
    }

    @Override
    public Object[] toArray() {
        T[] result = (T[]) new Object[this.length()];

        for (int i = 0; i < this.length(); i++) {
            int idx = (this.head + i) % this.capacity();
            result[i] = this.container[idx];
        }

        return result;
    }

    public int initialCapacity() {
        return initialCapacity;
    }
}
