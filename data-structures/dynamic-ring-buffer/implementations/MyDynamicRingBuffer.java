import java.lang.reflect.Array;

public class MyDynamicRingBuffer<T> implements MyDynamicRingBufferContract<T> {
    private final int initialCapacity;
    private int currentCapacity;
    private T[] container;
    private int head;
    private int tail;
    private int currentLength;

    public MyDynamicRingBuffer() {
        this(4);
    }

    public MyDynamicRingBuffer(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        }

        this.initialCapacity = initialCapacity;
        this.currentCapacity = initialCapacity;
        this.container = (T[]) new Object[initialCapacity];
        this.head = 0;
        this.tail = 0;
        this.currentLength = 0;
    }

    @Override
    public int length() {
        return currentLength;
    }

    @Override
    public int capacity() {
        return this.currentCapacity;
    }

    @Override
    public boolean isEmpty() {
        return this.length() <= 0;
    }

    @Override
    public boolean isFull() {
        return this.capacity() == this.length();
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
        this.ensureCapacity();
        this.container[this.tail] = value;
        this.currentLength++;
        this.tail = (this.tail + 1) % this.capacity();
        return true;
    }

    @Override
    public T dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        T val = this.container[this.head];
        this.currentLength--;
        this.head = (this.head + 1) % this.capacity();

        return val;
    }

    @Override
    public void clear() {
        this.currentCapacity = this.initialCapacity();
        this.container = (T[]) new Object[initialCapacity];
        this.head = 0;
        this.tail = 0;
        this.currentLength = 0;
    }

    @Override
    public Object[] toArray() {
        Object[] result = (T[]) new Object[this.length()];

        for (int i = 0; i < this.length(); i++) {
            int idx = (this.head + i) % this.capacity();
            T val = this.container[idx];
            result[i] = val;
        }
        return result;
    }

    public int initialCapacity() {
        return initialCapacity;
    }

    private void ensureCapacity() {
        if (!this.isFull())
            return;

        int newCapacity = this.currentCapacity * 2;
        T[] newContainer = (T[]) new Object[newCapacity];

        // copy backing array
        for (int i = 0; i < this.length(); i++) {
            int currIdx = (this.head + i) % this.capacity();
            T v = this.container[currIdx];
            newContainer[i] = v;
        }

        this.head = 0;
        this.tail = this.currentCapacity;
        this.currentCapacity = newCapacity;
        this.container = newContainer;
    }
}
