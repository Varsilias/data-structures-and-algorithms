public final class MyHashMapTest {
    public static void main(String[] args) {
        MyHashMap<String, Integer> map = new MyHashMap<>(4);
        if (map.length() != 0) throw new AssertionError("expected length 0");
        if (map.capacity() != 4) throw new AssertionError("expected capacity 4");
        if (!map.isEmpty()) throw new AssertionError("expected empty map");
        map.set("a", 1);
    }
}
