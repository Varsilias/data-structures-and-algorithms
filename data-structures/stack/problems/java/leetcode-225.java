import java.util.LinkedList;
import java.util.Queue;

class MyStack {
    private Queue<Integer> queue;
    private Queue<Integer> temp;

    public MyStack() {
        this.queue = new LinkedList<>();
        this.temp = new LinkedList<>();
    }

    public void push(int x) {
        this.queue.add(x);
        while (!temp.isEmpty()) {
            queue.add(temp.poll());
        }
        Queue<Integer> tmp = this.queue;
        this.queue = this.temp;
        this.temp = tmp;
    }

    public int pop() {
        return temp.poll();
    }

    public int top() {
        return temp.peek();
    }

    public boolean empty() {
        return temp.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */