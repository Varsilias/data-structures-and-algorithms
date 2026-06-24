import java.util.Arrays;
import java.util.Objects;

public final class MyArrayListTest {
    public static void main(String[] args) {
        run("simple: new list starts empty", MyArrayListTest::testNewListStartsEmpty);
        run("simple: append and get preserve insertion order", MyArrayListTest::testAppendAndGetPreserveInsertionOrder);
        run("simple: prepend and insert work at front middle and end",
                MyArrayListTest::testPrependAndInsertWorkAtFrontMiddleAndEnd);
        run("simple: set updates an existing value", MyArrayListTest::testSetUpdatesExistingValue);
        run("simple: removeAt returns removed value and shifts left",
                MyArrayListTest::testRemoveAtReturnsRemovedValueAndShiftsLeft);
        run("simple: remove deletes the first matching value only",
                MyArrayListTest::testRemoveDeletesTheFirstMatchingValueOnly);
        run("simple: contains and indexOf report missing values correctly",
                MyArrayListTest::testContainsAndIndexOfReportMissingValuesCorrectly);
        run("simple: clear resets the list", MyArrayListTest::testClearResetsTheList);
        run("mildly absurd: list grows beyond its starting capacity",
                MyArrayListTest::testGrowthBeyondStartingCapacity);
        run("mildly absurd: alternating prepend append and remove keeps order stable",
                MyArrayListTest::testAlternatingOperationsKeepOrderStable);
        run("absurd: deterministic operation sequence matches a reference model",
                MyArrayListTest::testDeterministicOperationSequenceMatchesReferenceModel);
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

    private static void testNewListStartsEmpty() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        assertEquals(0, list.length(), "length");
        assertEquals(2, list.capacity(), "capacity");
        assertEquals(true, list.isEmpty(), "isEmpty");
        assertArrayEquals(new Object[] {}, list.toArray(), "toArray");
    }

    private static void testAppendAndGetPreserveInsertionOrder() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        list.append(10);
        list.append(20);
        list.append(30);

        assertEquals(3, list.length(), "length");
        assertEquals(10, list.get(0), "first value");
        assertEquals(30, list.get(2), "last value");
        assertArrayEquals(new Object[] { 10, 20, 30 }, list.toArray(), "toArray");
    }

    private static void testPrependAndInsertWorkAtFrontMiddleAndEnd() {
        MyArrayList<String> list = new MyArrayList<>(1);

        list.append("b");
        list.prepend("a");
        list.insert(2, "d");
        list.insert(2, "c");

        assertArrayEquals(new Object[] { "a", "b", "c", "d" }, list.toArray(), "toArray");
    }

    private static void testSetUpdatesExistingValue() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        list.append(1);
        list.append(2);
        list.set(1, 99);

        assertEquals(99, list.get(1), "updated value");
        assertArrayEquals(new Object[] { 1, 99 }, list.toArray(), "toArray");
    }

    private static void testRemoveAtReturnsRemovedValueAndShiftsLeft() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        list.append(4);
        list.append(5);
        list.append(6);
        list.append(7);

        assertEquals(5, list.removeAt(1), "removed value");
        assertArrayEquals(new Object[] { 4, 6, 7 }, list.toArray(), "toArray");
    }

    private static void testRemoveDeletesTheFirstMatchingValueOnly() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        list.append(8);
        list.append(9);
        list.append(8);

        assertEquals(true, list.remove(8), "remove existing");
        assertArrayEquals(new Object[] { 9, 8 }, list.toArray(), "toArray");
        assertEquals(false, list.remove(42), "remove missing");
    }

    private static void testContainsAndIndexOfReportMissingValuesCorrectly() {
        MyArrayList<String> list = new MyArrayList<>(2);

        list.append("red");
        list.append("blue");

        assertEquals(true, list.contains("red"), "contains present");
        assertEquals(false, list.contains("green"), "contains missing");
        assertEquals(1, list.indexOf("blue"), "index present");
        assertEquals(-1, list.indexOf("green"), "index missing");
    }

    private static void testClearResetsTheList() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        list.append(1);
        list.append(2);
        list.clear();

        assertEquals(0, list.length(), "length");
        assertEquals(true, list.isEmpty(), "isEmpty");
        assertArrayEquals(new Object[] {}, list.toArray(), "toArray");
    }

    private static void testGrowthBeyondStartingCapacity() {
        MyArrayList<Integer> list = new MyArrayList<>(1);

        for (int value = 0; value < 25; value++) {
            list.append(value);
        }

        assertEquals(25, list.length(), "length");
        assertEquals(true, list.capacity() >= 25, "capacity growth");
        assertEquals(24, list.get(24), "tail value");
    }

    private static void testAlternatingOperationsKeepOrderStable() {
        MyArrayList<Integer> list = new MyArrayList<>(2);

        list.append(3);
        list.prepend(2);
        list.append(4);
        list.prepend(1);
        list.insert(2, 99);
        list.removeAt(2);
        list.remove(4);

        assertArrayEquals(new Object[] { 1, 2, 3 }, list.toArray(), "toArray");
    }

    private static void testDeterministicOperationSequenceMatchesReferenceModel() {
        MyArrayList<Integer> list = new MyArrayList<>(2);
        java.util.ArrayList<Integer> reference = createReferenceSequence();

        for (Integer value : reference) {
            list.append(value);
        }

        assertArrayEquals(reference.toArray(), list.toArray(), "toArray");
        assertEquals(reference.size(), list.length(), "length");
    }

    private static java.util.ArrayList<Integer> createReferenceSequence() {
        java.util.ArrayList<Integer> values = new java.util.ArrayList<>();

        for (int index = 0; index < 40; index++) {
            if (index % 3 == 0) {
                values.add(0, index);
            } else if (index % 3 == 1) {
                values.add(index);
            } else {
                values.add(values.size() / 2, index);
            }
        }

        values.remove(5);
        values.remove(0);
        values.remove(values.size() - 1);

        return values;
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
