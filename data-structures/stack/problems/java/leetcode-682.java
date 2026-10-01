import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.Stack;

class Solution {
    public int calPoints(String[] operations) {
        int res = 0;
        Stack<Integer> st = new Stack<Integer>();

        for (String op : operations) {
            switch (op) {
                case "+":
                    int last = st.pop();
                    int sec = st.pop();
                    int tmp = last + sec;
                    st.addAll(Arrays.asList(sec, last, tmp));

                    break;
                case "C":
                    st.pop();
                    break;
                case "D":
                    int end = st.pop();
                    int tmpp = 2 * end;
                    st.addAll(Arrays.asList(end, tmpp));
                    break;
                default:
                    int num = Integer.parseInt(op);
                    st.add(num);
                    break;
            }
        }
        for (int num : st) {
            res += num;
        }
        return res;

    }
}

class Solution1 {
    public int calPoints(String[] operations) {
        Deque<Integer> st = new ArrayDeque<Integer>();

        for (String op : operations) {
            switch (op) {
                case "+":
                    int last = st.pop();
                    int sec = st.peek();
                    st.push(last);
                    st.push(last + sec);
                    break;
                case "C":
                    st.pop();
                    break;
                case "D":
                    st.push(st.peek() * 2);
                    break;
                default:
                    int num = Integer.parseInt(op);
                    st.push(num);
                    break;
            }
        }

        int res = 0;

        while (!st.isEmpty()) {
            res += st.pop();
        }
        return res;

    }
}