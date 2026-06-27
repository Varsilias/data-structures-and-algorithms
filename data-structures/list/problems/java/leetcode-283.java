class Solution {
    public void moveZeroes(int[] nums) {
        int p = 0;

        for (int i = 0; i < nums.length; i++) {
            int left = nums[p];
            int right = nums[i];

            if (right != 0) {
                nums[p] = right;
                nums[i] = left;
            }
        }
    }
}