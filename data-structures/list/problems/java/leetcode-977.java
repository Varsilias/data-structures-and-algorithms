class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        int i = 0;
        int j = n - 1;

        int p = n - 1;

        while (j >= i) {
            int lSquare = nums[i] * nums[i];
            int rSquare = nums[j] * nums[j];
            if (lSquare > rSquare) {
                result[p] = lSquare;
                i++;
            } else {
                result[p] = rSquare;
            }
            p++;
        }

        return result;
    }
}