
public class MyLinkedList<T> implements MyLinkedListContract<T> {
    public class Node<V> {
        public V value;
        public Node<V> next;
        public Node<V> prev;

        public Node(V value) {
            this.value = value;
        }
    }

    private int currentLength;
    private Node<T> front;
    private Node<T> back;

    public int length() {
        return currentLength;
    }

    public boolean isEmpty() {
        return length() == 0;
    }

    public T head() {
        if (front == null)
            return null;
        return front.value;
    }

    public T tail() {
        if (back == null)
            return null;
        return back.value;
    }

    public T get(int index) {
        if (index > this.length()) {
            throw new IllegalArgumentException("index is greater than list size");
        }

        Node<T> head = this.front;
        for (int i = 0; i < index; i++) {
            head = head.next;
        }
        if (head == null)
            return null;

        return head.value;
    }

    public void append(T value) {
        Node<T> node = new Node<T>(value);
        if (this.front == null) {
            this.front = node;
            this.back = node;
            currentLength++;
            return;
        }

        node.prev = this.back;
        if (this.back != null) {
            this.back.next = node;
            this.back = node;
        }

        this.currentLength++;
    }

    public void prepend(T value) {
        Node<T> node = new Node<T>(value);
        if (this.front == null) {
            this.front = node;
            this.back = node;
            this.back.prev = this.front;
            currentLength++;
            return;
        }

        node.next = this.front;
        if (this.front != null) {
            this.front.prev = node;
            this.front = node;
        }

        this.currentLength++;
    }

    public void insert(int index, T value) {
        int len = this.length();
        if (len <= 0) {
            this.append(value);
            return;
        }

        if (index == 0) {
            this.prepend(value);
            return;
        }

        Node<T> node = new Node<T>(value);

        Node<T> head = this.front;
        for (int i = 0; i < index - 1; i++) {
            head = head.next;
        }

        if (head == null)
            return;
        Node<T> nextNode = head.next;
        head.next = node;
        node.prev = head;
        node.next = nextNode;

        if (nextNode != null) {
            nextNode.prev = node;
        }

        this.currentLength++;
    }

    public T removeAt(int index) {
        int len = this.length();
        if (len < index || len <= 0) {
            throw new IllegalArgumentException("index to remove is not within list size range");
        }

        Node<T> head = this.front;
        for (int i = 0; i < index; i++) {
            head = head.next;
        }

        if (head == null)
            return null;
        Node<T> nextNode = head.next;
        Node<T> prevNode = head.prev;

        if (nextNode != null) {
            nextNode.prev = prevNode;
        }

        if (prevNode != null) {
            prevNode.next = nextNode;
        }

        this.currentLength--;
        return head.value;
    }

    public boolean remove(T value) {
        int len = this.length();
        if (len <= 0)
            return false;

        Node<T> head = this.front;
        while (head != null) {
            if (head.value == value)
                break;
            head = head.next;
        }

        if (head == null) {
            return false;
        }

        Node<T> nextNode = head.next;
        Node<T> prevNode = head.prev;

        if (nextNode != null) {
            nextNode.prev = prevNode;
        }

        if (prevNode != null) {
            prevNode.next = nextNode;
        }
        this.currentLength--;
        return true;

    }

    public boolean contains(T value) {
        int len = this.length();
        if (len <= 0)
            return false;

        Node<T> head = this.front;
        while (head != null) {
            if (head.value == value)
                break;
            head = head.next;
        }

        if (head == null) {
            return false;
        }

        return true;

    }

    public int indexOf(T value) {
        int idx = -1;

        Node<T> head = this.front;
        while (head != null) {
            idx++;
            if (head.value == value)
                break;
            head = head.next;
        }

        return idx;
    }

    public void reverse() {
        if (this.front == null || this.front == this.back) {
            return;
        }

        Node<T> current = this.front;
        Node<T> temp = null;

        while (current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;

            current = current.prev;
        }

        temp = this.front;
        this.front = this.back;
        this.back = temp;

    }

    public void clear() {
        this.currentLength = 0;
        this.front = null;
        this.back = null;
    }

    public T[] toArray() {
        T[] list = (T[]) new Object[this.length()];
        Node<T> head = this.front;
        int i = 0;
        while (head != null) {
            list[i] = head.value;
            head = head.next;
            i++;
        }

        return list;
    }
}
