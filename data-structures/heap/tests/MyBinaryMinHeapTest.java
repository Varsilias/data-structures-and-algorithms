public final class MyBinaryMinHeapTest {
    public static void main(String[] args) {
        MyBinaryMinHeap<Integer> heap = new MyBinaryMinHeap<>();
        if (heap.length() != 0) throw new AssertionError("expected length 0");
        if (!heap.isEmpty()) throw new AssertionError("expected empty heap");
        heap.insert(1);
    }
}
