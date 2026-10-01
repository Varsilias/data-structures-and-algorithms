public class MyBinarySearchTree<T> implements MyBinarySearchTreeContract<T> {
    public int length() { return 0; }
    public boolean isEmpty() { return length() == 0; }
    public void insert(T value) { throw new UnsupportedOperationException("TODO: implement insert"); }
    public boolean contains(T value) { return false; }
    public T min() { return null; }
    public T max() { return null; }
    public boolean remove(T value) { throw new UnsupportedOperationException("TODO: implement remove"); }
    public Object[] inOrder() { return new Object[] {}; }
    public Object[] preOrder() { return new Object[] {}; }
    public Object[] postOrder() { return new Object[] {}; }
    public Object[] levelOrder() { return new Object[] {}; }
    public int height() { return 0; }
    public void clear() { throw new UnsupportedOperationException("TODO: implement clear"); }
}
