import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

public final class MyBinaryMinHeapTest {
    public static void main(String[] args) {
        run("simple: new heap starts empty", MyBinaryMinHeapTest::testNewHeapStartsEmpty);
        run("simple: insert keeps the minimum at the root", MyBinaryMinHeapTest::testInsertKeepsTheMinimumAtTheRoot);
        run("mildly absurd: repeated extract returns sorted order",
                MyBinaryMinHeapTest::testRepeatedExtractReturnsSortedOrder);
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

    private static void testNewHeapStartsEmpty() {
        MyBinaryMinHeap<Integer> heap = new MyBinaryMinHeap<>();

        assertEquals(0, heap.length(), "length");
        assertEquals(true, heap.isEmpty(), "isEmpty");
        assertEquals(null, heap.peek(), "peek");
        assertArrayEquals(new Object[] {}, heap.toArray(), "toArray");
    }

    private static void testInsertKeepsTheMinimumAtTheRoot() {
        MyBinaryMinHeap<Integer> heap = new MyBinaryMinHeap<>();

        for (int value : new int[] { 5, 3, 8, 1, 4 }) {
            heap.insert(value);
        }

        assertEquals(5, heap.length(), "length");
        assertEquals(1, heap.peek(), "peek");
    }

    private static void testRepeatedExtractReturnsSortedOrder() {
        MyBinaryMinHeap<Integer> heap = new MyBinaryMinHeap<>();

        for (int value : new int[] { 9, 1, 6, 3, 7, 2, 8 }) {
            heap.insert(value);
        }

        ArrayList<Integer> extracted = new ArrayList<>();
        while (!heap.isEmpty()) {
            extracted.add(heap.extract());
        }

        assertArrayEquals(new Object[] { 1, 2, 3, 6, 7, 8, 9 }, extracted.toArray(), "extracted");
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
