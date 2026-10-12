import java.util.Arrays;
import java.util.Objects;

public final class MyLinkedListTest {
    public static void main(String[] args) {
        run("simple: new linked list starts empty", MyLinkedListTest::testNewLinkedListStartsEmpty);
        run("simple: append and prepend maintain head tail and order",
                MyLinkedListTest::testAppendAndPrependMaintainHeadTailAndOrder);
        run("simple: insert get and removeAt work at boundaries",
                MyLinkedListTest::testInsertGetAndRemoveAtWorkAtBoundaries);
        run("mildly absurd: remove and reverse preserve the right survivors",
                MyLinkedListTest::testRemoveAndReversePreserveTheRightSurvivors);
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

    private static void testNewLinkedListStartsEmpty() {
        MyLinkedList<Integer> list = new MyLinkedList<>();

        assertEquals(0, list.length(), "length");
        assertEquals(true, list.isEmpty(), "isEmpty");
        assertEquals(null, list.head(), "head");
        assertEquals(null, list.tail(), "tail");
        assertArrayEquals(new Object[] {}, list.toArray(), "toArray");
    }

    private static void testAppendAndPrependMaintainHeadTailAndOrder() {
        MyLinkedList<Integer> list = new MyLinkedList<>();

        list.append(2);
        list.append(3);
        list.prepend(1);

        assertEquals(3, list.length(), "length");
        assertEquals(1, list.head(), "head");
        assertEquals(3, list.tail(), "tail");
        assertArrayEquals(new Object[] { 1, 2, 3 }, list.toArray(), "toArray");
    }

    private static void testInsertGetAndRemoveAtWorkAtBoundaries() {
        MyLinkedList<String> list = new MyLinkedList<>();

        list.append("a");
        list.append("c");
        list.insert(1, "b");
        list.insert(3, "d");

        assertEquals("c", list.get(2), "get(2)");
        assertEquals("b", list.removeAt(1), "removeAt(1)");
        assertArrayEquals(new Object[] { "a", "c", "d" }, list.toArray(), "toArray");
    }

    private static void testRemoveAndReversePreserveTheRightSurvivors() {
        MyLinkedList<Integer> list = new MyLinkedList<>();

        for (int value = 1; value <= 6; value++) {
            list.append(value);
        }

        assertEquals(true, list.remove(3), "remove(3)");
        assertEquals(false, list.remove(42), "remove(42)");
        list.reverse();

        assertArrayEquals(new Object[] { 6, 5, 4, 2, 1 }, list.toArray(), "toArray");
        assertEquals(2, list.indexOf(4), "indexOf(4)");
        assertEquals(false, list.contains(3), "contains(3)");
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
