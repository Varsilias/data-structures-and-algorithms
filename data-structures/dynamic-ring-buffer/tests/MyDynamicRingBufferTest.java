import java.util.Arrays;
import java.util.Objects;

public final class MyDynamicRingBufferTest {
    public static void main(String[] args) {
        run("simple: new buffer starts empty", MyDynamicRingBufferTest::testNewBufferStartsEmpty);
        run("simple: enqueue always succeeds and exposes front/rear",
                MyDynamicRingBufferTest::testEnqueueAlwaysSucceeds);
        run("simple: dequeue returns items in FIFO order",
                MyDynamicRingBufferTest::testDequeueReturnsItemsInFifoOrder);
        run("simple: clear resets the buffer", MyDynamicRingBufferTest::testClearResetsTheBuffer);
        run("mildly absurd: growth preserves logical order when the buffer was wrapped",
                MyDynamicRingBufferTest::testGrowthPreservesOrderWhenWrapped);
        run("absurd: deterministic operation sequence matches a reference model",
                MyDynamicRingBufferTest::testDeterministicOperationSequenceMatchesReferenceModel);
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
        MyDynamicRingBuffer<Integer> buffer = new MyDynamicRingBuffer<>(2);

        assertEquals(0, buffer.length(), "length");
        assertEquals(2, buffer.capacity(), "capacity");
        assertEquals(true, buffer.isEmpty(), "isEmpty");
        assertEquals(null, buffer.front(), "front");
        assertEquals(null, buffer.rear(), "rear");
        assertArrayEquals(new Object[] {}, buffer.toArray(), "toArray");
    }

    private static void testEnqueueAlwaysSucceeds() {
        MyDynamicRingBuffer<Integer> buffer = new MyDynamicRingBuffer<>(2);

        assertEquals(true, buffer.enqueue(10), "enqueue 10");
        assertEquals(true, buffer.enqueue(20), "enqueue 20");
        assertEquals(true, buffer.enqueue(30), "enqueue 30");

        assertEquals(3, buffer.length(), "length");
        assertEquals(10, buffer.front(), "front");
        assertEquals(30, buffer.rear(), "rear");
        assertArrayEquals(new Object[] { 10, 20, 30 }, buffer.toArray(), "toArray");
    }

    private static void testDequeueReturnsItemsInFifoOrder() {
        MyDynamicRingBuffer<String> buffer = new MyDynamicRingBuffer<>(2);

        buffer.enqueue("a");
        buffer.enqueue("b");
        buffer.enqueue("c");

        assertEquals("a", buffer.dequeue(), "first dequeue");
        assertEquals("b", buffer.dequeue(), "second dequeue");
        assertEquals("c", buffer.front(), "front");
    }

    private static void testClearResetsTheBuffer() {
        MyDynamicRingBuffer<Integer> buffer = new MyDynamicRingBuffer<>(2);

        buffer.enqueue(1);
        buffer.enqueue(2);
        buffer.clear();

        assertEquals(0, buffer.length(), "length");
        assertEquals(true, buffer.isEmpty(), "isEmpty");
        assertEquals(null, buffer.dequeue(), "dequeue after clear");
    }

    private static void testGrowthPreservesOrderWhenWrapped() {
        MyDynamicRingBuffer<Integer> buffer = new MyDynamicRingBuffer<>(3);

        buffer.enqueue(1);
        buffer.enqueue(2);
        buffer.enqueue(3);
        buffer.dequeue();
        buffer.enqueue(4);
        buffer.enqueue(5);

        assertArrayEquals(new Object[] { 2, 3, 4, 5 }, buffer.toArray(), "toArray");
        assertEquals(2, buffer.front(), "front");
        assertEquals(5, buffer.rear(), "rear");
        assertEquals(true, buffer.capacity() >= 4, "capacity growth");
    }

    private static void testDeterministicOperationSequenceMatchesReferenceModel() {
        MyDynamicRingBuffer<Integer> buffer = new MyDynamicRingBuffer<>(2);
        java.util.ArrayList<Integer> reference = new java.util.ArrayList<>();

        for (int index = 1; index <= 80; index++) {
            buffer.enqueue(index);
            reference.add(index);

            if (index % 5 == 0) {
                buffer.dequeue();
                reference.remove(0);
            }

            if (index % 8 == 0) {
                buffer.enqueue(index * 10);
                reference.add(index * 10);
            }
        }

        assertArrayEquals(reference.toArray(), buffer.toArray(), "toArray");
        assertEquals(reference.size(), buffer.length(), "length");
        assertEquals(reference.get(0), buffer.front(), "front");
        assertEquals(reference.get(reference.size() - 1), buffer.rear(), "rear");
        assertEquals(true, buffer.capacity() >= reference.size(), "capacity growth");
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
