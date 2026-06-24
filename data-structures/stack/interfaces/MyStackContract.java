public interface MyStackContract<T> {
    int length();

    int capacity();

    boolean isEmpty();

    T peek();

    void push(T value);

    T pop();

    void clear();

    Object[] toArray();
}
