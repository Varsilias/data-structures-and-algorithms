public class MyHashMap<K, V> implements MyHashMapContract<K, V> {
    private final int initialCapacity;

    public MyHashMap() { this(8); }
    public MyHashMap(int initialCapacity) {
        if (initialCapacity <= 0) throw new IllegalArgumentException("initialCapacity must be greater than zero");
        this.initialCapacity = initialCapacity;
    }

    public int length() { return 0; }
    public int capacity() { return initialCapacity; }
    public boolean isEmpty() { return length() == 0; }
    public void set(K key, V value) { throw new UnsupportedOperationException("TODO: implement set"); }
    public V get(K key) { return null; }
    public boolean has(K key) { return false; }
    public boolean remove(K key) { throw new UnsupportedOperationException("TODO: implement remove"); }
    public Object[] keys() { return new Object[] {}; }
    public Object[] values() { return new Object[] {}; }
    public Object[][] entries() { return new Object[][] {}; }
    public void clear() { throw new UnsupportedOperationException("TODO: implement clear"); }
}
