import java.util.Arrays;
import java.util.Objects;

public final class MyHashMapTest {
    public static void main(String[] args) {
        run("simple: new hash map starts empty", MyHashMapTest::testNewHashMapStartsEmpty);
        run("simple: set get has and overwrite use key equality",
                MyHashMapTest::testSetGetHasAndOverwriteUseKeyEquality);
        run("simple: remove deletes only the requested key", MyHashMapTest::testRemoveDeletesOnlyTheRequestedKey);
        run("mildly absurd: many inserts survive resizing and collisions",
                MyHashMapTest::testManyInsertsSurviveResizingAndCollisions);
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

    private static void testNewHashMapStartsEmpty() {
        MyHashMap<String, Integer> map = new MyHashMap<>(4);

        assertEquals(0, map.length(), "length");
        assertEquals(4, map.capacity(), "capacity");
        assertEquals(true, map.isEmpty(), "isEmpty");
        assertDeepArrayEquals(new Object[][] {}, map.entries(), "entries");
    }

    private static void testSetGetHasAndOverwriteUseKeyEquality() {
        MyHashMap<String, Integer> map = new MyHashMap<>(4);

        map.set("red", 1);
        map.set("blue", 2);
        map.set("red", 9);

        assertEquals(2, map.length(), "length");
        assertEquals(9, map.get("red"), "get(red)");
        assertEquals(true, map.has("blue"), "has(blue)");
        assertEquals(false, map.has("green"), "has(green)");
    }

    private static void testRemoveDeletesOnlyTheRequestedKey() {
        MyHashMap<String, Integer> map = new MyHashMap<>(2);

        map.set("a", 1);
        map.set("b", 2);

        assertEquals(true, map.remove("a"), "remove(a)");
        assertEquals(false, map.remove("x"), "remove(x)");
        assertEquals(null, map.get("a"), "get(a)");
        assertDeepArrayEquals(new Object[][] { { "b", 2 } }, map.entries(), "entries");
    }

    private static void testManyInsertsSurviveResizingAndCollisions() {
        MyHashMap<String, Integer> map = new MyHashMap<>(2);

        for (int index = 0; index < 50; index++) {
            map.set("key-" + index, index);
        }

        assertEquals(50, map.length(), "length");
        assertEquals(0, map.get("key-0"), "get(key-0)");
        assertEquals(49, map.get("key-49"), "get(key-49)");
        assertEquals(true, map.capacity() >= 50, "capacity growth");
    }

    private static void assertEquals(Object expected, Object actual, String label) {
        if (!Objects.equals(expected, actual)) {
            throw new AssertionError(label + " expected " + expected + " but got " + actual);
        }
    }

    private static void assertDeepArrayEquals(Object[][] expected, Object[][] actual, String label) {
        if (!Arrays.deepEquals(expected, actual)) {
            throw new AssertionError(
                    label + " expected " + Arrays.deepToString(expected) + " but got " + Arrays.deepToString(actual));
        }
    }
}
