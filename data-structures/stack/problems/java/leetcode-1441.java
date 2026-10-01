import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

class Solution {
    public List<String> buildArray(int[] target, int n) {
        List<String> ops = new ArrayList<>();
        Stack<Integer> stack = new Stack<>();

        for (int i = 1; i < n; i++) {
            if (stack.size() == target.length && Arrays.stream(target).allMatch(t -> stack.contains(t))) {
                return ops;
            }

            final int num = i;
            stack.push(num);
            ops.add("Push");
            boolean isMember = Arrays.stream(target).anyMatch(t -> stack.contains(num));
            if (!isMember) {
                stack.pop();
                ops.add("Pop");
            }
        }

        return ops;

    }
}