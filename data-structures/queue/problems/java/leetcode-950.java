import java.util.Queue;
import java.util.ArrayDeque;
import java.util.Arrays;

class Solution {

    public int[] deckRevealedIncreasing(int[] deck) {
        int n = deck.length;
        Queue<Integer> queue = new ArrayDeque<Integer>();
        for (int i = 0; i < n; i++) {
            queue.add(i);
        }
        int[] res = new int[n];
        Arrays.sort(deck);

        for (int card : deck) {
            int idx = queue.remove();
            res[idx] = card;

            if (queue.size() > 0) {
                queue.add(queue.poll());
            }
        }
        return res;

    }
}