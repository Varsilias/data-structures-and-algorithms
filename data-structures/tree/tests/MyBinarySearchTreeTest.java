public final class MyBinarySearchTreeTest {
    public static void main(String[] args) {
        MyBinarySearchTree<Integer> tree = new MyBinarySearchTree<>();
        if (tree.length() != 0) throw new AssertionError("expected length 0");
        if (!tree.isEmpty()) throw new AssertionError("expected empty tree");
        tree.insert(5);
    }
}
