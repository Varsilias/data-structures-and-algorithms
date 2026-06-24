public class MyStack<T> implements MyStackContract<T> {
    private final int initialCapacity;

    public MyStack() {
        this(4);
    }

    public MyStack(int initialCapacity) {
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
    public T peek() {
        throw new UnsupportedOperationException("TODO: implement peek");
    }

    @Override
    public void push(T value) {
        throw new UnsupportedOperationException("TODO: implement push");
    }

    @Override
    public T pop() {
        throw new UnsupportedOperationException("TODO: implement pop");
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
