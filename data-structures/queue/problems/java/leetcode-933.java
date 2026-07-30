import java.util.ArrayDeque;
import java.util.Queue;

class RecentCounter {
    private Queue<Integer> queue;
    private int tail;

    public RecentCounter() {
        this.queue = new ArrayDeque<Integer>();
        this.tail = 0;
    }

    public int ping(int t) {
        this.queue.add(t);
        this.tail = t;

        return this.calculateSum();
    }

    private int calculateSum() {
        if (this.queue.peek() == null) {
            return 0;
        }
        Integer last = this.tail;

        int searchSpace = last - 3000;
        while (searchSpace > this.queue.peek()) {
            this.queue.poll();
        }

        return this.queue.size();
    }
}