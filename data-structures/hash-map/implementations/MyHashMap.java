
class MapEntry<K, V> {
    final K key;
    V value;
    MapEntry<K, V> next;

    public MapEntry(K key, V value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

public class MyHashMap<K, V> implements MyHashMapContract<K, V> {
    private final int initialCapacity;
    private final int PRIME = 31;
    private int currentCapacity;
    private int currentLength;
    private MapEntry<K, V>[] container;

    public MyHashMap() {
        this(8);
    }

    public MyHashMap(int initialCapacity) {
        if (initialCapacity <= 0)
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        this.initialCapacity = initialCapacity;
        this.currentCapacity = initialCapacity;
        this.currentLength = 0;
        this.container = (MapEntry<K, V>[]) new MapEntry[initialCapacity];
    }

    public int length() {
        return this.currentLength;
    }

    public int capacity() {
        return this.currentCapacity;
    }

    public boolean isEmpty() {
        return length() == 0;
    }

    public void set(K key, V value) {
        this.ensureCapacity();
        int hash = this.hash(key);
        MapEntry<K, V> bucket = this.container[hash];
        MapEntry<K, V> entry = new MapEntry<K, V>(key, value);

        if (bucket == null) {
            this.container[hash] = entry;
            this.currentLength++;
            return;
        }

        MapEntry<K, V> head = bucket;
        MapEntry<K, V> prev = null;

        while (head != null) {
            if (head.key == key) {
                head.value = value;
                return;
            }
            prev = head;
            head = head.next;
        }

        if (prev != null) {
            prev.next = entry;
            this.currentLength++;
        }

    }

    public V get(K key) {
        int hash = this.hash(key);
        MapEntry<K, V> bucket = this.container[hash];

        if (bucket == null) {
            return null;
        }

        MapEntry<K, V> head = bucket;
        while (head != null) {
            if (head.key.equals(key)) {
                return head.value;
            }
            head = head.next;
        }

        return null;
    }

    public boolean has(K key) {
        int hash = this.hash(key);
        MapEntry<K, V> bucket = this.container[hash];

        if (bucket == null) {
            return false;
        }

        MapEntry<K, V> head = bucket;
        while (head != null) {
            if (head.key.equals(key)) {
                return true;
            }
            head = head.next;
        }

        return false;
    }

    public boolean remove(K key) {
        int hash = this.hash(key);
        MapEntry<K, V> bucket = this.container[hash];

        if (bucket == null) {
            return false;
        }

        MapEntry<K, V> head = bucket;
        MapEntry<K, V> prev = null;

        if (head.key == key) {
            this.container[hash] = head.next;
            this.currentLength--;
            return true;
        }

        while (head != null) {
            if (head.key == key) {
                break;
            }

            prev = head;
            head = head.next;
        }

        if (prev != null && head != null) {
            prev.next = head.next;
            this.currentLength--;
            return true;
        }

        return false;
    }

    public K[] keys() {
        @SuppressWarnings("unchecked")
        K[] res = (K[]) new Object[this.currentLength];
        int idx = 0;
        for (MapEntry<K, V> bucket : this.container) {
            MapEntry<K, V> head = bucket;

            while (head != null) {
                res[idx] = head.key;
                idx++;
                head = head.next;
            }
        }
        return res;
    }

    public V[] values() {
        @SuppressWarnings("unchecked")
        V[] res = (V[]) new Object[this.currentLength];
        int idx = 0;
        for (MapEntry<K, V> bucket : this.container) {
            MapEntry<K, V> head = bucket;

            while (head != null) {
                res[idx] = head.value;
                idx++;
                head = head.next;
            }
        }
        return res;
    }

    public Object[][] entries() {
        Object[][] res = new Object[this.currentLength][];

        for (int i = 0; i < this.currentLength; i++) {
            int bucketLength = 0;
            MapEntry<K, V> bucket = this.container[i];
            while (bucket != null) {
                bucketLength++;
                bucket = bucket.next;
            }

            Object[] row = new Object[bucketLength * 2];
            bucket = this.container[i];
            int idx = 0;
            while (bucket != null) {
                row[idx] = bucket.key;
                row[idx + 1] = bucket.value;
                idx += 2;
                bucket = bucket.next;
            }

            res[i] = row;
        }
        return res;
    }

    public void clear() {
        this.currentCapacity = initialCapacity;
        this.currentLength = 0;
        this.container = (MapEntry<K, V>[]) new MapEntry[initialCapacity];
    }

    private void ensureCapacity() {
        int threshold = (int) (((double) this.currentLength / this.currentCapacity) * 100);

        if (threshold >= 80) {
            int newCapacity = this.currentCapacity * 2;
            MapEntry<K, V>[] newContainer = (MapEntry<K, V>[]) new MapEntry[newCapacity];
            // set this at this point so the hash
            // function picks the new value of the
            // "currentCapacity" variable
            this.currentCapacity = newCapacity;

            for (MapEntry<K, V> bucket : this.container) {
                MapEntry<K, V> head = bucket;
                while (head != null) {
                    MapEntry<K, V> nextNode = head.next;
                    int hash = this.hash(head.key);
                    head.next = newContainer[hash];
                    newContainer[hash] = head;
                    head = nextNode;
                }
            }

            this.container = newContainer;
        }
    }

    private int hash(K key) {
        String stringKey = String.valueOf(key);
        int sum = 0;

        for (int i = 0; i < stringKey.length(); i++) {
            sum += stringKey.codePointAt(i);
        }

        return (sum * this.PRIME) % this.currentCapacity;
    }
}
