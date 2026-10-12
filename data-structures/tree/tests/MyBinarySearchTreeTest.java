import java.util.Arrays;
import java.util.Objects;

public final class MyBinarySearchTreeTest {
    public static void main(String[] args) {
        run("simple: new tree starts empty", MyBinarySearchTreeTest::testNewTreeStartsEmpty);
        run("simple: insert contains min max and traversals work",
                MyBinarySearchTreeTest::testInsertContainsMinMaxAndTraversalsWork);
        run("mildly absurd: removing leaf one-child and two-child nodes keeps order",
                MyBinarySearchTreeTest::testRemovingLeafOneChildAndTwoChildNodesKeepsOrder);
    }

    private static void run(String name, Runnable test) {
        try {
            test.run();
            System.out.println("PASS " + name);
        } catch (RuntimeException error) {
            System.out.println("FAIL " + name);
            throw error;
        }
    }

    private static void testNewTreeStartsEmpty() {
        MyBinarySearchTree<Integer> tree = new MyBinarySearchTree<>();

        assertEquals(0, tree.length(), "length");
        assertEquals(true, tree.isEmpty(), "isEmpty");
        assertArrayEquals(new Object[] {}, tree.inOrder(), "inOrder");
        assertEquals(null, tree.min(), "min");
        assertEquals(null, tree.max(), "max");
    }

    private static void testInsertContainsMinMaxAndTraversalsWork() {
        MyBinarySearchTree<Integer> tree = new MyBinarySearchTree<>();

        for (int value : new int[] { 5, 3, 7, 2, 4, 6, 8 }) {
            tree.insert(value);
        }

        assertEquals(7, tree.length(), "length");
        assertEquals(true, tree.contains(4), "contains(4)");
        assertEquals(false, tree.contains(10), "contains(10)");
        assertEquals(2, tree.min(), "min");
        assertEquals(8, tree.max(), "max");
        assertArrayEquals(new Object[] { 2, 3, 4, 5, 6, 7, 8 }, tree.inOrder(), "inOrder");
        assertArrayEquals(new Object[] { 5, 3, 2, 4, 7, 6, 8 }, tree.preOrder(), "preOrder");
        assertArrayEquals(new Object[] { 2, 4, 3, 6, 8, 7, 5 }, tree.postOrder(), "postOrder");
        assertArrayEquals(new Object[] { 5, 3, 7, 2, 4, 6, 8 }, tree.levelOrder(), "levelOrder");
    }

    private static void testRemovingLeafOneChildAndTwoChildNodesKeepsOrder() {
        MyBinarySearchTree<Integer> tree = new MyBinarySearchTree<>();

        for (int value : new int[] { 5, 3, 7, 2, 4, 6, 8 }) {
            tree.insert(value);
        }

        assertEquals(true, tree.remove(2), "remove(2)");
        assertEquals(true, tree.remove(7), "remove(7)");
        assertEquals(false, tree.remove(42), "remove(42)");
        assertArrayEquals(new Object[] { 3, 4, 5, 6, 8 }, tree.inOrder(), "inOrder");
    }

    private static void assertEquals(Object expected, Object actual, String label) {
        if (!Objects.equals(expected, actual)) {
            throw new AssertionError(label + " expected " + expected + " but got " + actual);
        }
    }

    private static void assertArrayEquals(Object[] expected, Object[] actual, String label) {
        if (!Arrays.equals(expected, actual)) {
            throw new AssertionError(
                    label + " expected " + Arrays.toString(expected) + " but got " + Arrays.toString(actual));
        }
    }
}
