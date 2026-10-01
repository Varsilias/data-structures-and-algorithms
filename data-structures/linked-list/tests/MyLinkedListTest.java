import java.util.Arrays;

public final class MyLinkedListTest {
    public static void main(String[] args) {
        MyLinkedList<Integer> list = new MyLinkedList<>();
        assertEquals(0, list.length(), "length");
        assertEquals(true, list.isEmpty(), "isEmpty");
        assertArrayEquals(new Object[] {}, list.toArray(), "toArray");
        list.append(1);
    }

    private static void assertEquals(Object expected, Object actual, String label) {
        if (!java.util.Objects.equals(expected, actual)) {
            throw new AssertionError(label + " expected " + expected + " but got " + actual);
        }
    }

    private static void assertArrayEquals(Object[] expected, Object[] actual, String label) {
        if (!Arrays.equals(expected, actual)) {
            throw new AssertionError(label + " expected " + Arrays.toString(expected) + " but got " + Arrays.toString(actual));
        }
    }
}
