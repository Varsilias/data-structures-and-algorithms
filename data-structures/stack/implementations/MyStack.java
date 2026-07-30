public class MyStack<T> implements MyStackContract<T> {
    private final int initialCapacity;
    private int currentCapacity;
    private int currentLength;
    private int head;
    private T[] container;

    public MyStack() {
        this(4);
    }

    public MyStack(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        }

        this.initialCapacity = initialCapacity;
        this.currentCapacity = initialCapacity;
        this.head = 0;
        this.currentLength = 0;
        this.container = (T[]) new Object[initialCapacity];

    }

    @Override
    public int length() {
        return currentLength;
    }

    @Override
    public int capacity() {
        return currentCapacity;
    }

    @Override
    public boolean isEmpty() {
        return length() <= 0;
    }

    @Override
    public T peek() {
        if (isEmpty())
            return null;
        return this.container[this.head - 1];
    }

    @Override
    public void push(T value) {
        this.ensureCapacity();
        this.container[this.head] = value;
        this.head++;
        this.currentLength++;
    }

    @Override
    public T pop() {
        if (isEmpty())
            return null;
        T val = this.container[this.head - 1];
        this.container[this.head - 1] = null;
        this.head--;
        this.currentLength--;
        return val;
    }

    @Override
    public void clear() {
        this.currentCapacity = 0;
        this.head = 0;
        this.currentLength = 0;
        this.container = (T[]) new Object[initialCapacity];
    }

    @Override
    public Object[] toArray() {
        Object[] res = new Object[this.length()];

        for (int i = 0; i < this.length(); i++) {
            res[i] = this.container[i];
        }

        return res;
    }

    public int initialCapacity() {
        return initialCapacity;
    }

    private void ensureCapacity() {
        if (this.length() < this.capacity())
            return;

        int capacity = this.capacity() * 2;
        T[] newContainer = (T[]) new Object[capacity];

        for (int i = 0; i < this.length(); i++) {
            newContainer[i] = this.container[i];
        }
        this.container = newContainer;
        this.currentCapacity = capacity;

    }
}
