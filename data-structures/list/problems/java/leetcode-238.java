class Solution {
    public int[] productExceptSelf(int[] nums) { // [1,2,3,4]
        int n = nums.length;
        int[] ans = new int[n];
        ans[0] = 1;

        int prefix = 1;
        for (int i = 1; i < n; i++) { // [1,1,2,6]
            int temp = prefix * nums[i - 1];
            ans[i] = temp;
            prefix = temp;
        }

        int suffix = 1;
        for (int j = n - 2; j >= 0; j--) {
            int temp = suffix * nums[j + 1];
            ans[j] = temp * ans[j];
            suffix = temp;
        }

        return ans;

    }
}