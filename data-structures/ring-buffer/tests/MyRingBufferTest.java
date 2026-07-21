import java.util.ArrayList;
import java.util.Arrays;
import java.util.Objects;

public final class MyRingBufferTest {
    public static void main(String[] args) {
        run("simple: new ring buffer starts empty", MyRingBufferTest::testNewBufferStartsEmpty);
        run("simple: enqueue fills the buffer and exposes front/rear",
                MyRingBufferTest::testEnqueueFillsBufferAndExposesFrontRear);
        run("simple: enqueue on a full buffer is rejected and leaves it untouched",
                MyRingBufferTest::testEnqueueOnFullBufferIsRejected);
        run("simple: dequeue returns items in FIFO order and frees a slot",
                MyRingBufferTest::testDequeueReturnsItemsInFifoOrder);
        run("simple: clear resets the buffer", MyRingBufferTest::testClearResetsTheBuffer);
        run("mildly absurd: repeated wraparound keeps contents correct across many cycles",
                MyRingBufferTest::testRepeatedWraparound);
        run("absurd: deterministic operation sequence matches a reference model",
                MyRingBufferTest::testDeterministicOperationSequenceMatchesReferenceModel);
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

    private static void testNewBufferStartsEmpty() {
        MyRingBuffer<Integer> buffer = new MyRingBuffer<>(3);

        assertEquals(0, buffer.length(), "length");
        assertEquals(3, buffer.capacity(), "capacity");
        assertEquals(true, buffer.isEmpty(), "isEmpty");
        assertEquals(false, buffer.isFull(), "isFull");
        assertEquals(null, buffer.front(), "front");
        assertEquals(null, buffer.rear(), "rear");
        assertArrayEquals(new Object[] {}, buffer.toArray(), "toArray");
    }

    private static void testEnqueueFillsBufferAndExposesFrontRear() {
        MyRingBuffer<Integer> buffer = new MyRingBuffer<>(3);

        assertEquals(true, buffer.enqueue(10), "enqueue 10");
        assertEquals(true, buffer.enqueue(20), "enqueue 20");
        assertEquals(true, buffer.enqueue(30), "enqueue 30");

        assertEquals(3, buffer.length(), "length");
        assertEquals(true, buffer.isFull(), "isFull");
        assertEquals(10, buffer.front(), "front");
        assertEquals(30, buffer.rear(), "rear");
        assertArrayEquals(new Object[] { 10, 20, 30 }, buffer.toArray(), "toArray");
    }

    private static void testEnqueueOnFullBufferIsRejected() {
        MyRingBuffer<Integer> buffer = new MyRingBuffer<>(2);

        buffer.enqueue(1);
        buffer.enqueue(2);

        assertEquals(false, buffer.enqueue(3), "enqueue on full buffer");
        assertEquals(2, buffer.length(), "length");
        assertArrayEquals(new Object[] { 1, 2 }, buffer.toArray(), "toArray");
    }

    private static void testDequeueReturnsItemsInFifoOrder() {
        MyRingBuffer<String> buffer = new MyRingBuffer<>(2);

        buffer.enqueue("a");
        buffer.enqueue("b");

        assertEquals("a", buffer.dequeue(), "first dequeue");
        assertEquals(false, buffer.isFull(), "isFull after dequeue");
        assertEquals("b", buffer.front(), "front");
        assertEquals("b", buffer.dequeue(), "second dequeue");
        assertEquals(null, buffer.dequeue(), "dequeue on empty buffer");
    }

    private static void testClearResetsTheBuffer() {
        MyRingBuffer<Integer> buffer = new MyRingBuffer<>(2);

        buffer.enqueue(1);
        buffer.enqueue(2);
        buffer.clear();

        assertEquals(0, buffer.length(), "length");
        assertEquals(true, buffer.isEmpty(), "isEmpty");
        assertEquals(null, buffer.dequeue(), "dequeue after clear");
    }

    private static void testRepeatedWraparound() {
        int capacity = 4;
        MyRingBuffer<Integer> buffer = new MyRingBuffer<>(capacity);
        ArrayList<Integer> reference = new ArrayList<>();

        for (int index = 1; index <= 60; index++) {
            boolean shouldEnqueue = reference.size() < capacity;
            boolean enqueued = buffer.enqueue(index);

            assertEquals(shouldEnqueue, enqueued, "enqueue success at index " + index);
            if (shouldEnqueue) {
                reference.add(index);
            }

            if (index % 3 == 0 && !reference.isEmpty()) {
                buffer.dequeue();
                reference.remove(0);
            }
        }

        assertArrayEquals(reference.toArray(), buffer.toArray(), "toArray");
        assertEquals(capacity, buffer.capacity(), "capacity stays fixed");
    }

    private static void testDeterministicOperationSequenceMatchesReferenceModel() {
        int capacity = 5;
        MyRingBuffer<Integer> buffer = new MyRingBuffer<>(capacity);
        ArrayList<Integer> reference = new ArrayList<>();

        for (int index = 1; index <= 200; index++) {
            boolean shouldEnqueue = reference.size() < capacity;
            boolean enqueued = buffer.enqueue(index);

            assertEquals(shouldEnqueue, enqueued, "enqueue success at index " + index);
            if (shouldEnqueue) {
                reference.add(index);
            }

            if (index % 3 == 0 && !reference.isEmpty()) {
                buffer.dequeue();
                reference.remove(0);
            }
            if (index % 7 == 0 && !reference.isEmpty()) {
                buffer.dequeue();
                reference.remove(0);
            }
        }

        assertArrayEquals(reference.toArray(), buffer.toArray(), "toArray");
        assertEquals(reference.size(), buffer.length(), "length");
        assertEquals(reference.get(0), buffer.front(), "front");
        assertEquals(reference.get(reference.size() - 1), buffer.rear(), "rear");
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
