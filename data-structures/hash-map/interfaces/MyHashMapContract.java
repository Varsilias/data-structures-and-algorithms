public interface MyHashMapContract<K, V> {
    int length();
    int capacity();
    boolean isEmpty();
    void set(K key, V value);
    V get(K key);
    boolean has(K key);
    boolean remove(K key);
    Object[] keys();
    Object[] values();
    Object[][] entries();
    void clear();
}
