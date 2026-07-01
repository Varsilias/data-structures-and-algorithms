package problems

func productExceptSelf(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	ans[0] = 1

	prefix := 1
	for i := 1; i < n; i++ {
		t := nums[i-1] * prefix
		ans[i] = t
		prefix = t
	}

	suffix := 1
	for i := n - 2; i >= 0; i-- {
		t := nums[i+1] * suffix
		ans[i] = t * ans[i]
		suffix = t
	}
	return ans
}
