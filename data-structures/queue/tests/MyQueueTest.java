import java.util.Arrays;
import java.util.Objects;

public final class MyQueueTest {
    public static void main(String[] args) {
        run("simple: new queue starts empty", MyQueueTest::testNewQueueStartsEmpty);
        run("simple: enqueue and peek expose the current front", MyQueueTest::testEnqueueAndPeekExposeCurrentFront);
        run("simple: dequeue returns items in FIFO order", MyQueueTest::testDequeueReturnsItemsInFifoOrder);
        run("simple: clear resets the queue", MyQueueTest::testClearResetsTheQueue);
        run("mildly absurd: queue grows beyond initial capacity", MyQueueTest::testGrowthBeyondInitialCapacity);
        run("mildly absurd: alternating enqueue and dequeue leaves the right survivors",
                MyQueueTest::testAlternatingEnqueueAndDequeueLeavesRightSurvivors);
        run("absurd: deterministic operation sequence matches a reference model",
                MyQueueTest::testDeterministicOperationSequenceMatchesReferenceModel);
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

    private static void testNewQueueStartsEmpty() {
        MyQueue<Integer> queue = new MyQueue<>(2);

        assertEquals(0, queue.length(), "length");
        assertEquals(2, queue.capacity(), "capacity");
        assertEquals(true, queue.isEmpty(), "isEmpty");
        assertEquals(null, queue.peek(), "peek");
        assertArrayEquals(new Object[] {}, queue.toArray(), "toArray");
    }

    private static void testEnqueueAndPeekExposeCurrentFront() {
        MyQueue<Integer> queue = new MyQueue<>(2);

        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        assertEquals(3, queue.length(), "length");
        assertEquals(10, queue.peek(), "peek");
        assertArrayEquals(new Object[] { 10, 20, 30 }, queue.toArray(), "toArray");
    }

    private static void testDequeueReturnsItemsInFifoOrder() {
        MyQueue<String> queue = new MyQueue<>(2);

        queue.enqueue("a");
        queue.enqueue("b");
        queue.enqueue("c");

        assertEquals("a", queue.dequeue(), "first dequeue");
        assertEquals("b", queue.dequeue(), "second dequeue");
        assertEquals("c", queue.peek(), "peek");
    }

    private static void testClearResetsTheQueue() {
        MyQueue<Integer> queue = new MyQueue<>(2);

        queue.enqueue(1);
        queue.enqueue(2);
        queue.clear();

        assertEquals(0, queue.length(), "length");
        assertEquals(true, queue.isEmpty(), "isEmpty");
        assertEquals(null, queue.dequeue(), "dequeue");
    }

    private static void testGrowthBeyondInitialCapacity() {
        MyQueue<Integer> queue = new MyQueue<>(1);

        for (int value = 0; value < 25; value++) {
            queue.enqueue(value);
        }

        assertEquals(25, queue.length(), "length");
        assertEquals(true, queue.capacity() >= 25, "capacity growth");
        assertEquals(0, queue.peek(), "peek");
    }

    private static void testAlternatingEnqueueAndDequeueLeavesRightSurvivors() {
        MyQueue<Integer> queue = new MyQueue<>(2);

        queue.enqueue(1);
        queue.enqueue(2);
        queue.dequeue();
        queue.enqueue(3);
        queue.enqueue(4);
        queue.dequeue();
        queue.enqueue(5);

        assertArrayEquals(new Object[] { 3, 4, 5 }, queue.toArray(), "toArray");
        assertEquals(3, queue.peek(), "peek");
    }

    private static void testDeterministicOperationSequenceMatchesReferenceModel() {
        MyQueue<Integer> queue = new MyQueue<>(2);
        java.util.ArrayList<Integer> reference = createQueueReferenceSequence();

        for (Integer value : reference) {
            queue.enqueue(value);
        }

        assertArrayEquals(reference.toArray(), queue.toArray(), "toArray");
        assertEquals(reference.size(), queue.length(), "length");
        assertEquals(reference.get(0), queue.peek(), "peek");
    }

    private static java.util.ArrayList<Integer> createQueueReferenceSequence() {
        java.util.ArrayList<Integer> values = new java.util.ArrayList<>();

        for (int index = 1; index <= 50; index++) {
            values.add(index);
            if (index % 5 == 0) {
                values.remove(0);
            }
            if (index % 8 == 0) {
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
