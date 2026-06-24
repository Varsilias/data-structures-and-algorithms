
public class MyArrayList<T> implements MyList<T> {
    private final int initialCapacity;
    private int currentIndex;
    private T[] container;

    public MyArrayList() {
        this(4);
    }

    public MyArrayList(int initialCapacity) {
        if (initialCapacity <= 0) {
            throw new IllegalArgumentException("initialCapacity must be greater than zero");
        }

        this.initialCapacity = initialCapacity;
        this.container = (T[]) new Object[initialCapacity];
        this.currentIndex = 0;
    }

    @Override
    public int length() {
        return this.currentIndex;
    }

    @Override
    public int capacity() {
        return this.container.length;
    }

    @Override
    public boolean isEmpty() {
        return this.length() <= 0;
    }

    @Override
    public T get(int index) {
        if (index < 0 || index > this.length()) {
            throw new IllegalArgumentException("index is out of bound");
        }
        return this.container[index];
    }

    @Override
    public void set(int index, T value) {
        if (index < 0 || index > this.length()) {
            throw new IllegalArgumentException("index is out of bound");
        }
        this.container[index] = value;
    }

    @Override
    public void append(T value) {
        this.ensureCapacity();
        this.container[currentIndex] = value;
        this.currentIndex++;
    }

    @Override
    public void prepend(T value) {
        this.ensureCapacity();
        for (int i = this.length(); i > 0; i--) {
            this.container[i] = this.container[i - 1];
        }
        this.container[0] = value;
        this.currentIndex++;
    }

    @Override
    public void insert(int index, T value) {
        if (index < 0) {
            throw new IllegalArgumentException("index is out of bound");
        }
        this.ensureCapacity();
        for (int i = this.length(); i > index; i--) { // "A", "B", "C", "D"]
            this.container[i] = this.container[i - 1];

        }
        this.container[index] = value;
        this.currentIndex++;
    }

    @Override
    public T removeAt(int index) {
        T found = this.get(index);
        if (found == null) {
            return null;
        }
        if (!this.remove(found)) {
            return null;
        }

        return found;
    }

    @Override
    public boolean remove(T value) {
        int idx = this.indexOf(value);
        if (idx < 0) {
            return false;
        }

        T[] newContainer = (T[]) new Object[this.length() - 1];

        for (int i = 0; i < idx; i++) {
            newContainer[i] = this.container[i];
        }
        for (int i = idx; i < this.length() - 1; i++) {
            newContainer[i] = this.container[i + 1];
        }

        this.container = newContainer;
        this.currentIndex--;
        return true;
    }

    @Override
    public boolean contains(T value) {
        return this.indexOf(value) >= 0;
    }

    @Override
    public int indexOf(T value) {
        for (int i = 0; i < this.length(); i++) {
            if (this.container[i] == value) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public void clear() {
        this.currentIndex = 0;
        this.container = (T[]) new Object[4];
    }

    @Override
    public Object[] toArray() {
        T[] arr = (T[]) new Object[this.length()];
        for (int i = 0; i < this.length(); i++) {
            arr[i] = this.container[i];
        }

        return arr;
    }

    public int initialCapacity() {
        return initialCapacity;
    }

    private void ensureCapacity() {
        double percentage = (this.length() / this.capacity()) * 100;
        if (percentage >= 80) {
            int capacity = this.capacity() * 2;
            T[] newContainer = (T[]) new Object[capacity];

            for (int i = 0; i < this.length(); i++) {
                newContainer[i] = this.container[i];
            }
            this.container = newContainer;
        }
    }
}
