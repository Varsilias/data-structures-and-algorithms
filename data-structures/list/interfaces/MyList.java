public interface MyList<T> {
    int length();

    int capacity();

    boolean isEmpty();

    T get(int index);

    void set(int index, T value);

    void append(T value);

    void prepend(T value);

    void insert(int index, T value);

    T removeAt(int index);

    boolean remove(T value);

    boolean contains(T value);

    int indexOf(T value);

    void clear();

    Object[] toArray();
}
