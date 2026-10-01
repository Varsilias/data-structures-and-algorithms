public interface MyBinarySearchTreeContract<T> {
    int length();
    boolean isEmpty();
    void insert(T value);
    boolean contains(T value);
    T min();
    T max();
    boolean remove(T value);
    Object[] inOrder();
    Object[] preOrder();
    Object[] postOrder();
    Object[] levelOrder();
    int height();
    void clear();
}
