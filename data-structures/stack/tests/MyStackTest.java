import java.util.Arrays;
import java.util.Objects;

public final class MyStackTest {
    public static void main(String[] args) {
        run("simple: new stack starts empty", MyStackTest::testNewStackStartsEmpty);
        run("simple: push and peek expose the current top", MyStackTest::testPushAndPeekExposeCurrentTop);
        run("simple: pop returns items in LIFO order", MyStackTest::testPopReturnsItemsInLifoOrder);
        run("simple: clear resets the stack", MyStackTest::testClearResetsTheStack);
        run("mildly absurd: stack grows beyond initial capacity", MyStackTest::testGrowthBeyondInitialCapacity);
        run("mildly absurd: alternating push and pop leaves the right survivors",
                MyStackTest::testAlternatingPushAndPopLeavesRightSurvivors);
        run("absurd: deterministic operation sequence matches a reference model",
                MyStackTest::testDeterministicOperationSequenceMatchesReferenceModel);
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

    private static void testNewStackStartsEmpty() {
        MyStack<Integer> stack = new MyStack<>(2);

        assertEquals(0, stack.length(), "length");
        assertEquals(2, stack.capacity(), "capacity");
        assertEquals(true, stack.isEmpty(), "isEmpty");
        assertEquals(null, stack.peek(), "peek");
        assertArrayEquals(new Object[] {}, stack.toArray(), "toArray");
    }

    private static void testPushAndPeekExposeCurrentTop() {
        MyStack<Integer> stack = new MyStack<>(2);

        stack.push(10);
        stack.push(20);
        stack.push(30);

        assertEquals(3, stack.length(), "length");
        assertEquals(30, stack.peek(), "peek");
        assertArrayEquals(new Object[] { 10, 20, 30 }, stack.toArray(), "toArray");
    }

    private static void testPopReturnsItemsInLifoOrder() {
        MyStack<String> stack = new MyStack<>(2);

        stack.push("a");
        stack.push("b");
        stack.push("c");

        assertEquals("c", stack.pop(), "first pop");
        assertEquals("b", stack.pop(), "second pop");
        assertEquals("a", stack.peek(), "peek");
    }

    private static void testClearResetsTheStack() {
        MyStack<Integer> stack = new MyStack<>(2);

        stack.push(1);
        stack.push(2);
        stack.clear();

        assertEquals(0, stack.length(), "length");
        assertEquals(true, stack.isEmpty(), "isEmpty");
        assertEquals(null, stack.pop(), "pop");
    }

    private static void testGrowthBeyondInitialCapacity() {
        MyStack<Integer> stack = new MyStack<>(1);

        for (int value = 0; value < 25; value++) {
            stack.push(value);
        }

        assertEquals(25, stack.length(), "length");
        assertEquals(true, stack.capacity() >= 25, "capacity growth");
        assertEquals(24, stack.peek(), "peek");
    }

    private static void testAlternatingPushAndPopLeavesRightSurvivors() {
        MyStack<Integer> stack = new MyStack<>(2);

        stack.push(1);
        stack.push(2);
        stack.pop();
        stack.push(3);
        stack.push(4);
        stack.pop();
        stack.push(5);

        assertArrayEquals(new Object[] { 1, 3, 5 }, stack.toArray(), "toArray");
        assertEquals(5, stack.peek(), "peek");
    }

    private static void testDeterministicOperationSequenceMatchesReferenceModel() {
        MyStack<Integer> stack = new MyStack<>(2);
        java.util.ArrayList<Integer> reference = createStackReferenceSequence();

        for (Integer value : reference) {
            stack.push(value);
        }

        assertArrayEquals(reference.toArray(), stack.toArray(), "toArray");
        assertEquals(reference.size(), stack.length(), "length");
        assertEquals(reference.get(reference.size() - 1), stack.peek(), "peek");
    }

    private static java.util.ArrayList<Integer> createStackReferenceSequence() {
        java.util.ArrayList<Integer> values = new java.util.ArrayList<>();

        for (int index = 1; index <= 50; index++) {
            values.add(index);
            if (index % 4 == 0) {
                values.remove(values.size() - 1);
            }
            if (index % 7 == 0) {
                values.add(index * 10);
            }
        }

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
