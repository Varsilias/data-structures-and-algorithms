class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length <= 2) {
            return nums.length;
        }
        int p = 2;
        for (int i = 2; i < nums.length; i++) {
            if (nums[i] != nums[p - 2]) {
                int swappable = nums[p];
                nums[p] = nums[i]; // put the current found unique number in the next place that is replaceable as
                                   // expressed by the "P" needle
                nums[i] = swappable;
                p++;
            }
        }
        return p;
    }
}