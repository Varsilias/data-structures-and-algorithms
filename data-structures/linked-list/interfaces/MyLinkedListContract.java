public interface MyLinkedListContract<T> {
    int length();
    boolean isEmpty();
    T head();
    T tail();
    T get(int index);
    void append(T value);
    void prepend(T value);
    void insert(int index, T value);
    T removeAt(int index);
    boolean remove(T value);
    boolean contains(T value);
    int indexOf(T value);
    void reverse();
    void clear();
    Object[] toArray();
}
