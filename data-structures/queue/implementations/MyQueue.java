import java.lang.reflect.Array;

public class MyQueue<T> implements MyQueueContract<T> {
    private final int initialCapacity;
    private int currentCapacity;
    private int head;
    private int tail;
    private int currentLength;
    private T[] container;

    public MyQueue() {
        this(4);
    }

    public MyQueue(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        }

        this.initialCapacity = initialCapacity;
        this.currentCapacity = initialCapacity;
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
        return this.currentCapacity;
    }

    @Override
    public boolean isEmpty() {
        return this.length() <= 0;
    }

    @Override
    public T peek() {
        if (this.isEmpty())
            return null;
        T value = this.container[this.head];
        return value;
    }

    @Override
    public void enqueue(T value) {
        this.ensureCapacity();
        this.container[this.tail] = value;

        this.tail++;
        this.currentLength++;
    }

    @Override
    public T dequeue() {
        if (this.isEmpty())
            return null;

        T value = this.container[this.head];

        for (int i = 1; i < this.length(); i++) {
            this.container[i - 1] = this.container[i];
        }
        this.currentLength--;
        this.tail--;
        return value;
    }

    @Override
    public void clear() {
        this.container = null;
        this.currentCapacity = 0;
        this.currentLength = 0;
        this.head = 0;
        this.tail = 0;
    }

    @Override
    public Object[] toArray() {
        T[] result = (T[]) new Object[this.length()];
        for (int i = 0; i < this.length(); i++) {
            result[i] = this.container[i];
        }

        return result;
    }

    private boolean isFull() {
        return this.length() == this.capacity();
    }

    private void ensureCapacity() {

        if (!this.isFull())
            return;

        int newCapacity = this.length() * 2;
        T[] newContainer = (T[]) new Object[newCapacity];

        for (int i = 0; i < this.length(); i++) {
            newContainer[i] = this.container[i];
        }

        this.container = newContainer;
        this.currentCapacity = newCapacity;
    }

    public int initialCapacity() {
        return initialCapacity;
    }
}
